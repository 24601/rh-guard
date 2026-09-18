# Install the hook pack

`examples/` is the source of truth for Claude and Cursor hook JSON. This
document packages those files plus `hooks/run.ts` (and the fail-closed HTTP
adapter) as the install unit. The Next workbench is optional once hooks can
reach the scorer.

Hack Radar is **not** [Augustus](https://github.com/24601/Augustus). Augustus
places typed System One judgments. This pack is the live hazard gate on agent
tools.

## 1. Sidecar (required for live scoring)

From a clone of [24601/rh-guard](https://github.com/24601/rh-guard):

```bash
git clone https://github.com/24601/rh-guard.git
cd rh-guard
npm install
cp .env.example .env.local   # set TYPESAFE_API_KEY for Jev
npm run dev                  # 127.0.0.1:43147
```

Without a key the process still listens. Structural denies still fire.
Lexical / GLiClass-shaped scoring is degraded, not risk zero.

## 2. Claude Code

### Project settings (copy from examples/)

- HTTP-only (prompt + Stop + PreToolUse): merge
  [`examples/claude-settings.json`](../examples/claude-settings.json) into
  `.claude/settings.json`.
- Fail-closed PreToolUse: merge
  [`examples/claude-command-settings.json`](../examples/claude-command-settings.json)
  instead. The command `npx tsx hooks/run.ts claude` must run with this repo
  as the working tree (or otherwise resolve `hooks/run.ts` and `src/`).

Claude HTTP hooks only honor a 2xx JSON body. Timeouts and non-2xx do not
block.

### Plugin marketplace (skill + hook pack)

```bash
claude plugin marketplace add 24601/rh-guard
claude plugin install rh-guard@rh-guard
```

Layout:

| Path | Role |
|---|---|
| `.claude-plugin/marketplace.json` | Marketplace catalog |
| `.claude-plugin/plugin.json` | Plugin manifest (points at the skill + `hooks/hooks.json`) |
| `hooks/hooks.json` | Claude plugin hook config (same events/matcher/URL as `examples/`) |
| `hooks/claude-hook.sh` | Fail-closed PreToolUse: POST stdin to the sidecar, deny + exit 2 on failure |
| `hooks/run.ts` | In-repo command scorer used by `examples/claude-command-settings.json` |
| `.agents/skills/rh-guard/SKILL.md` | Protocol skill (not the server) |

`hooks/hooks.json` uses HTTP for `UserPromptSubmit` and `Stop` (fail-open if
the sidecar is down) and `hooks/claude-hook.sh` for `PreToolUse` (fail-closed).
Override the sidecar URL with `HACK_RADAR_URL` if you do not bind
`127.0.0.1:43147`.

Keep the sidecar running. The plugin does not start Next.js.

## 3. Cursor (hooks.json is the plugin)

There is no Cursor marketplace equivalent. Copy
[`examples/cursor-hooks.json`](../examples/cursor-hooks.json) to
`.cursor/hooks.json`.

```bash
cp examples/cursor-hooks.json /path/to/your-project/.cursor/hooks.json
```

Command hooks read JSON on stdin via `npx tsx hooks/run.ts cursor`. That
command must resolve this repo (cloud agents run project hooks from the repo
root; use a checkout or submodule of rh-guard, or change the command to an
absolute path).

Set `failClosed: true` on shell and tool gates, as in the example.
`beforeSubmitPrompt` cannot inject context: a gameable prompt is allowed with
a user notice. Tool-denial steering uses a generic `agent_message` that does
not leak scores.

## 4. Companion skill (any skills-compatible agent)

```bash
npx skills add 24601/rh-guard --skill rh-guard
```

Use the skill to design evals, interpret denials, and choose gates. Do not
use it as a runbook for `next dev`.

## 5. What not to do

- Do not train RL against this monitor or against chain-of-thought.
- Do not put hidden tests in a workspace file the agent can edit.
- Do not treat lexical scores as a Jev ROC.
- Do not merge this pack into Augustus or vice versa.
