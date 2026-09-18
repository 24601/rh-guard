//! Exo has no native hooks.json. Support via ToolRuntime wrap, not drop-in
//! hooks. It does not ship Claude-style PreToolUse JSON hooks.
//!
//! Wrap `ToolRuntime::execute` (see crates/executor/src/executor_types.rs in
//! https://github.com/exoharness/exo) before every tool outside the verified
//! read-only surface — `shell`, `manage_tool`, `rebuild_and_restart_exo`,
//! `rewind_sandbox`, adapter enable/disable, and agent-created tools. Score
//! with HTTP `POST /api/hooks/exo` (or `/api/hooks/generic`) `{ block, reason }`,
//! or stdin `hooks/run.ts exo`. Deny by returning
//! `{ "ok": false, "error": AGENT_DENY }` — the same shape Exo uses when
//! execute fails. Fail-closed is this wrapper's tool error; the host has no
//! hook failClosed flag. Keep generic stdin if Exo later adds hooks.
//!
//! This file is a sketch: copy into an executor crate. No `@exo` / crate dep
//! from rh-guard. Structural types match exoharness (`ToolRuntime`,
//! `ToolRequest.function_name`, `AgentHandle`, …).

use std::env;
use std::io::Write;
use std::process::{Command, Stdio};

use async_trait::async_trait;
use exoharness::{
    AgentHandle, ConversationHandle, Result, ToolRequest, ToolResult, TurnHandle,
};
use serde_json::{json, Value};

use crate::executor_types::{AgentConfig, ConversationConfig, ToolRuntime};

const AGENT_DENY: &str = "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

const DEFAULT_EXO_HOOK_URL: &str = "http://127.0.0.1:43147/api/hooks/exo";

/// Same budget as the Pi, Amp, Prime, and Grok wrappers. A hang is a deny.
const SIDECAR_TIMEOUT_SECS: &str = "8";

/// Read-only tools on exoharness/exo main (`crates/executor/src/harness_tool.rs`
/// dispatch plus the TypeScript harness built-in, adapter, and skill tools).
/// Everything else is gated, including agent-created tools from
/// `.exo/agent-tools/`. Exo ships no `bash`, `write`, or `edit` tool.
const READ_ONLY_TOOLS: &[&str] = &[
    "inspect_tools",
    "list_adapters",
    "list_adapter_events",
    "list_conversation_events",
    "list_scheduled_tasks",
    "list_sandbox_snapshots",
    "get_sandbox_status",
    "list_skills",
    "read_skill_file",
    "web_search",
    "web_fetch",
];

pub struct RhGuardToolRuntime<T> {
    pub inner: T,
    pub sidecar_url: String,
}

impl<T> RhGuardToolRuntime<T> {
    pub fn wrap(inner: T) -> Self {
        Self {
            inner,
            sidecar_url: env::var("HACK_RADAR_EXO_URL").unwrap_or_else(|_| {
                env::var("HACK_RADAR_URL")
                    .map(|base| format!("{}/api/hooks/exo", base.trim_end_matches('/')))
                    .unwrap_or_else(|_| DEFAULT_EXO_HOOK_URL.to_string())
            }),
        }
    }
}

/// Deny-by-default: gate every tool except the verified read-only surface.
/// `shell`, `manage_tool`, `install_agent_tool`, `uninstall_agent_tool`,
/// `rebuild_and_restart_exo`, `snapshot_sandbox`, `rewind_sandbox`, the
/// scheduler verbs, and adapter enable/disable/create/delete all fall through
/// to the gate without being named.
fn is_gated(function_name: &str) -> bool {
    let name = function_name.to_ascii_lowercase();
    !READ_ONLY_TOOLS.contains(&name.as_str())
}

fn denied_tool_result() -> ToolResult {
    json!({ "ok": false, "error": AGENT_DENY })
}

fn parse_generic_block(body: &Value) -> bool {
    body.get("block").and_then(Value::as_bool).unwrap_or(false)
}

/// POST an Exo `ToolRequest` to `/api/hooks/exo`. `None` means the sidecar
/// call failed — callers fail-closed (deny). Replace curl with reqwest in-crate.
fn score_via_http(url: &str, request: &ToolRequest) -> Option<bool> {
    let payload = json!({
        "event": "tool_call",
        "functionName": request.function_name,
        "arguments": request.arguments,
    });
    let mut child = Command::new("curl")
        .args([
            "-sS",
            "-f",
            "--max-time",
            SIDECAR_TIMEOUT_SECS,
            "-X",
            "POST",
            "-H",
            "content-type: application/json",
            "--data-binary",
            "@-",
            url,
        ])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .ok()?;
    child
        .stdin
        .as_mut()?
        .write_all(payload.to_string().as_bytes())
        .ok()?;
    let output = child.wait_with_output().ok()?;
    if !output.status.success() {
        return None;
    }
    let body: Value = serde_json::from_slice(&output.stdout).ok()?;
    Some(parse_generic_block(&body))
}

#[async_trait]
impl<T> ToolRuntime for RhGuardToolRuntime<T>
where
    T: ToolRuntime + Send + Sync,
{
    async fn prepare_conversation(
        &self,
        agent: &dyn AgentHandle,
        conversation: &dyn ConversationHandle,
        agent_config: &AgentConfig,
        config: &ConversationConfig,
    ) -> Result<()> {
        self.inner
            .prepare_conversation(agent, conversation, agent_config, config)
            .await
    }

    async fn execute(
        &self,
        agent: &dyn AgentHandle,
        conversation: &dyn ConversationHandle,
        turn: Option<&dyn TurnHandle>,
        agent_config: &AgentConfig,
        config: &ConversationConfig,
        request: &ToolRequest,
    ) -> Result<ToolResult> {
        if is_gated(&request.function_name) {
            let denied = match score_via_http(&self.sidecar_url, request) {
                Some(block) => block,
                None => true,
            };
            if denied {
                return Ok(denied_tool_result());
            }
        }
        self.inner
            .execute(agent, conversation, turn, agent_config, config, request)
            .await
    }
}
