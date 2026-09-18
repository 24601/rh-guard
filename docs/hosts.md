# Host adapters

Hack Radar scores every host through the same `scoreEvent` path. Adapters
only change install location and the deny JSON the host understands.
`examples/` is the source of truth. Agent-visible text is always
`AGENT_DENY` (opaque filesystem-integrity copy). Scores stay on the operator
workbench.

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
the host**; the sidecar route still exists for tests (`hooks/run.ts` is the
install path). Exo has **no native hooks.json** and no host HTTP hook type;
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
fail-open (non-2xx / timeout do not block).

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
in the plugin.

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
`TurnContext.executeTool` before `shell` / mutating tools. The wrapper
POSTs to `/api/hooks/exo` or `/api/hooks/generic` (same `{ block, reason? }`
JSON) or calls `scoreEvent` in-process. Deny by returning a tool error
`{ ok: false, error: AGENT_DENY }` — never scores. Fail-closed is whatever
the wrapper does; the Exo host has no hook `failClosed` flag.

Keep generic stdin (`hooks/run.ts generic` / `exo`) if Exo later adds
hooks. Optional gate for agent-created tools under `.exo/agent-tools/`:
[`examples/exo-agent-tools-gate.ts`](../examples/exo-agent-tools-gate.ts).

See [`examples/exo-tool-runtime.ts`](../examples/exo-tool-runtime.ts) and
[`examples/exo-tool-runtime.rs`](../examples/exo-tool-runtime.rs).
