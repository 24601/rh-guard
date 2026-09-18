//! Exo has no native hooks.json. Support via ToolRuntime wrap, not drop-in
//! hooks. It does not ship Claude-style PreToolUse JSON hooks.
//!
//! Wrap `ToolRuntime::execute` (see crates/executor/src/executor_types.rs in
//! https://github.com/exoharness/exo) before `shell` / mutating tools. Deny by
//! returning `{ "ok": false, "error": AGENT_DENY }` — the same shape Exo uses
//! when execute fails. Score with `hooks/run.ts exo` / `generic` stdin.

use async_trait::async_trait;
use exoharness::{
    AgentHandle, ConversationHandle, Result, ToolRequest, ToolResult, TurnHandle,
};
use serde_json::json;

use crate::executor_types::{AgentConfig, ConversationConfig, ToolRuntime};

const AGENT_DENY: &str = "Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.";

pub struct RhGuardToolRuntime<T> {
    pub inner: T,
}

fn is_mutating(function_name: &str) -> bool {
    let name = function_name.to_ascii_lowercase();
    name == "shell"
        || name == "bash"
        || name == "write"
        || name == "edit"
        || name == "install_agent_tool"
        || name == "snapshot_sandbox"
        || name.contains("write")
        || name.contains("edit")
        || name.contains("shell")
        || name.contains("snapshot")
}

#[async_trait]
impl<T: ToolRuntime> ToolRuntime for RhGuardToolRuntime<T> {
    async fn execute(
        &self,
        agent: &dyn AgentHandle,
        conversation: &dyn ConversationHandle,
        turn: Option<&dyn TurnHandle>,
        agent_config: &AgentConfig,
        config: &ConversationConfig,
        request: &ToolRequest,
    ) -> Result<ToolResult> {
        if is_mutating(&request.function_name) {
            let _ = &request.arguments;
            let denied = false;
            if denied {
                return Ok(json!({ "ok": false, "error": AGENT_DENY }));
            }
        }
        self.inner
            .execute(agent, conversation, turn, agent_config, config, request)
            .await
    }
}
