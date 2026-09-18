# Host adapters

RH Guard scores every host through the same `scoreEvent` path. Adapters
only change install location and the deny JSON the host understands.
`examples/` is the source of truth. Agent-visible text is always
`AGENT_DENY` (opaque filesystem-integrity copy). Scores stay on the operator
workbench.

**Sibling, not a merge.** [jevgate](https://github.com/thevibeworks/jevgate)
uses the same shape: an allowlist proves what may run; Jev judges only the
rest. Hard envelope owns safety; soft judgment is never the sole veto
(fail-open: it cannot block). rh-guard's structural deny is that first gate;
the System One sidecar is the rest. Do not merge the products.

[GLiGuard](https://github.com/fastino-ai/GLiGuard) is an encoder-based LLM
prompt/response safety guard; rh-guard is a coding-agent reward-hack / eval
integrity gate (complementary, not a competitor). [gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is the same encoder family (GLiNER2.5) on Claude context compaction, not prompt/response safety and not reward-hack detection. Extractive character-offset spans, not generated summaries; uncertain → fail-closed `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Sibling envelope next to jevgate (opposite default).

**Sibling, not a merge.** [Abide](https://github.com/coldteadotai/abide)
also ships Claude / Codex / OpenCode hooks, but it scores project-instruction
rules on diffs, not reward-hack hazard. Its hooks fail-open (exit 0; no key
→ edit proceeds). Soft Jev verdicts are banded (repair / note / silence);
they are not a hard veto. Do not merge adapters; Abide does not catch
reward hacking.

`hooks/run.ts <flavor>` reads JSON on stdin. Flavors:

| argv | Output shape |
|---|---|
| `claude` | Claude Code hook JSON |
| `cursor` | Cursor `hooks.json` JSON |
| `grok` | `{ decision: "deny", reason }` (not Claude JSON) |
| `generic` | `{ block, reason? }`; exit 2 on block |
| `codex` | Claude-like `hookSpecificOutput.permissionDecision` (Codex-safe; no `continue`) |
| `dsh` | alias of `generic` (DeepSeek Harness stdin / adapter) |
| `exo` | alias of `generic` (no native hooks; wrap `ToolRuntime.execute`) |
| `pi` / `prime` / `amp` | host plugin JSON; prefer the TypeScript copies in `examples/` |

HTTP sidecar: `POST /api/hooks/<flavor>` (Next.js 16 dynamic `params` is a
Promise). Claude and Cursor URLs stay `/api/hooks/claude` and
`/api/hooks/cursor`. Codex and DeepSeek Harness have **no HTTP hook type on
the host**; `POST /api/hooks/codex` and `/api/hooks/dsh` return 404. Use
`hooks/run.ts`. Exo has **no native hooks.json** and no host HTTP hook type;
the sidecar still serves `POST /api/hooks/exo` (alias of generic
`{ block, reason? }`) for the `ToolRuntime` wrap. Pi, Prime, and Amp reach
HTTP from the copied plugin.

## Generic stdin schema

Input (any one of these is enough; Claude / Cursor / Grok payloads also parse):

```json
{
  "event": "tool_call",
  "tool": "Bash",
  "input": { "command": "…" },
  "path": "tests/test_foo.py",
  "prompt": "",
  "transcript": ""
}
```

Aliases: `tool_name` / `toolName` for `tool`; `tool_input` / `toolInput` for
`input`; Exo `functionName` / `arguments`. See
[`examples/generic-event.json`](../examples/generic-event.json).

Output: `{ "block": true, "reason": "…" }` or `{ "block": false }`. Exit 2
on block.

```bash
npx tsx hooks/run.ts generic < examples/generic-event.json
npx tsx hooks/run.ts dsh < examples/generic-event.json
npx tsx hooks/run.ts exo < examples/generic-event.json
```

## Host notes

### Claude Code

Merge [`examples/claude-settings.json`](../examples/claude-settings.json)
(HTTP) or [`examples/claude-command-settings.json`](../examples/claude-command-settings.json)
(fail-closed PreToolUse). Plugin pack: `hooks/claude-hook.sh`. HTTP is
fail-open (non-2xx / timeout do not block). Sibling permission gate (not this copy): [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) — OpenRouter `typesafe/jev-1.13` PreToolUse (230.8ms p50 / 263.9ms mean); low-confidence and network fail → human. Additive; Anthropic auto-mode is not replaceable via a supported API.

### Cursor

Copy [`examples/cursor-hooks.json`](../examples/cursor-hooks.json) to
`.cursor/hooks.json`. Command stdin. Set `failClosed: true` on shell and
tool gates.

### Codex (OpenAI Codex CLI)

Command PreToolUse only: `~/.codex/hooks.json` or `.codex/hooks.json`.
Copy [`examples/codex-hooks.json`](../examples/codex-hooks.json). There is
**no HTTP hook type**.

Deny with `hookSpecificOutput.permissionDecision: "deny"` plus a non-empty
`permissionDecisionReason`. Exit 2 with that JSON.

**Do not send `continue: false` on Codex PreToolUse.** Unsupported fields
mark the hook as failed and Codex **continues the tool** (fail-open).
`failClosedClaudeOutput()` is the Claude wrapper and includes `continue:
false`; Codex uses `failClosedCodexOutput()` instead.

### Grok Build

`~/.grok/hooks/*.json` or `.grok/hooks/*.json`. PreToolUse is the only
blocking event. Command or HTTP. Deny shape is `{ "decision": "deny",
"reason": "…" }` — not Claude JSON. Exit 0 allows; exit 2 denies. Crash,
timeout, and malformed output are **fail-open** on the host
([docs](https://docs.x.ai/build/features/hooks)).

[`examples/grok-hooks.json`](../examples/grok-hooks.json) runs
`npx tsx hooks/run.ts grok`. Prefer [`hooks/grok-hook.sh`](../hooks/grok-hook.sh)
when you need fail-closed: it POSTs to `/api/hooks/grok` and always emits
an explicit deny JSON + exit 2 if the sidecar is down.

### Pi

Copy [`examples/pi-extension.ts`](../examples/pi-extension.ts) to
`~/.pi/agent/extensions/` (global) or `.pi/extensions/` (project). The
extension listens on `tool_call` and returns `{ block: true, reason,
terminate: true }` (Pi supports `terminate`). It calls HTTP `/api/hooks/pi`
(or stdin `hooks/run.ts pi` for tests). On sidecar failure it fail-closes
in the plugin. Sibling Pi bash gate (not this copy): [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) — code-computed state then Jev; `commandRules` can hard-block; no key → fail-closed. Contrast jevgate allowlist + fail-open rest. oh-my-pi cousin (not this copy): [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) — `safe`/`ask`/`unsafe`; classifier failure defers to omp approval (fail-open). Do not merge into `examples/pi-extension.ts`.

Optional Claude-compatible settings via `@hsingjui/pi-hooks` (command
handlers only; HTTP / prompt / agent types are not supported): merge
[`examples/pi-hooks-settings.json`](../examples/pi-hooks-settings.json)
into `.pi/settings.json` or `~/.pi/agent/settings.json`. Matchers use Pi's
lowercase tool names (`bash|edit|write`).

### Amp

Copy [`examples/amp-plugin.ts`](../examples/amp-plugin.ts) to
`.amp/plugins/` or `~/.config/amp/plugins/`. `amp.on("tool.call")` returns
`allow` or `reject-and-continue` with `AGENT_DENY`. Thrown plugin errors
are ignored by Amp (fail-open), so the copy catches and returns
`reject-and-continue`. Do not use `action: "error"` as a deny.
HTTP `/api/hooks/amp` is how copies score. In-repo you may import
`scoreEvent` at the top of the module instead of `fetch`.
[Plugin API](https://ampcode.com/docs/plugin-api).

### Prime Agent

Copy [`examples/prime-extension.ts`](../examples/prime-extension.ts) to
`~/.prime/agent/extensions/` or `.prime/agent/extensions/`. Same
`{ block, reason }` shape as Pi. Prime docs do **not** include `terminate`.

### DSH (generic/adapter)

This is the real [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(Basit / DarwinX). Its Claude Code and Codex **command-hook** bridges run
unmodified `hooks/run.ts claude` or `codex` at `tools/pre-execute`. HTTP
hook types are skipped. There is no separate drop-in DSH `hooks.json`.

`tools/pre-execute` is the pre-tool gate, so both adapters map it onto
`PreToolUse`: the Claude bridge answers with `permissionDecision: "deny"`
(`hookEventName: "PreToolUse"`) and the Codex bridge with its Codex-safe deny
JSON. Both **exit 2** on a deny for this event, because the bridge only fails
closed on a non-zero exit. Claude Code's own `PreToolUse` still exits 0 with
the deny JSON, which is what that host expects.

For a host-neutral stdin adapter use `hooks/run.ts dsh` (alias of
`generic`) with [`examples/generic-event.json`](../examples/generic-event.json).
Native typed plugins listen on `tools/pre-execute` and return
`PreToolDecision` `{ kind: "deny", reason }` — that is DSH's own API, not
a fake product we invented.

### Exo (ToolRuntime wrap, not drop-in hooks)

[Exo](https://github.com/exoharness/exo) has **no native hooks.json**.
This is **support via ToolRuntime wrap**, not drop-in hooks. Wrap
`ToolRuntime::execute` (Rust trait in
`crates/executor/src/executor_types.rs`) and TypeScript
`TurnContext.executeTool`. The wrapper
POSTs to `/api/hooks/exo` or `/api/hooks/generic` (same `{ block, reason? }`
JSON) or calls `scoreEvent` in-process. Deny by returning a tool error
`{ ok: false, error: AGENT_DENY }` — never leak scores. Fail-closed is whatever
the wrapper does; the Exo host has no hook `failClosed` flag. Scoring is
bounded at 8s (`AbortSignal.timeout` / `curl --max-time 8`) and a timeout is a
deny, same as the Pi, Amp, Prime, and Grok wrappers. Opaque copy:

`Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.`

The gate is **deny-by-default**: every tool is scored except a verified
read-only exemption (`inspect_tools`, `list_adapters`, `list_adapter_events`,
`list_conversation_events`, `list_scheduled_tasks`, `list_sandbox_snapshots`,
`get_sandbox_status`, `list_skills`, `read_skill_file`, `web_search`,
`web_fetch`). That covers the mutating verbs Exo ships — `shell`,
`manage_tool`, `install_agent_tool`, `uninstall_agent_tool`,
`rebuild_and_restart_exo`, `snapshot_sandbox`, `rewind_sandbox`, the scheduler
verbs, and adapter create/enable/disable/delete/send — and agent-created tools
from `.exo/agent-tools/`, whose names are not known ahead of time. Exo ships no
`bash`, `write`, or `edit` tool; do not gate Claude-shaped names. Names are
from `crates/executor/src/harness_tool.rs` plus the TypeScript harness built-in,
adapter, sandbox, scheduler, and skill tools on
[exoharness/exo](https://github.com/exoharness/exo) `main`.

Keep generic stdin (`hooks/run.ts generic` / `exo`) if Exo later adds
hooks. Optional gate for agent-created tools under `.exo/agent-tools/`:
[`examples/exo-agent-tools-gate.ts`](../examples/exo-agent-tools-gate.ts).

See [`examples/exo-tool-runtime.ts`](../examples/exo-tool-runtime.ts) and
[`examples/exo-tool-runtime.rs`](../examples/exo-tool-runtime.rs).
