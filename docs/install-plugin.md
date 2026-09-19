# Install the hook pack

`examples/` is the source of truth for every host adapter. This document
packages those files plus `hooks/run.ts` (and the fail-closed HTTP wrappers)
as the install unit. Per-host deny JSON and honest limits:
[docs/hosts.md](hosts.md). The Next workbench is optional once hooks can
reach the scorer.

RH Guard is **not** [Augustus](https://github.com/24601/Augustus). Augustus
places typed System One judgments. This pack is the live hazard gate on agent
tools. It is also **not** [jevgate](https://github.com/thevibeworks/jevgate):
an allowlist proves what may run, Jev judges only the rest, and the tool
cannot block. Same layering as structural deny + sidecar, different job.

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
| `hooks/run.ts` | In-repo command scorer (`claude` / `cursor` / `grok` / `generic`; aliases `codex`, `dsh`, `exo`) |
| `hooks/grok-hook.sh` | Fail-closed Grok PreToolUse (host is fail-open on crash/timeout) |
| `.agents/skills/rh-guard/SKILL.md` | Protocol skill (not the server) |

`hooks/hooks.json` uses HTTP for `UserPromptSubmit` and `Stop` (fail-open if
the sidecar is down) and `hooks/claude-hook.sh` for `PreToolUse` (fail-closed).
Override the sidecar URL with `RH_GUARD_URL` if you do not bind
`127.0.0.1:43147` (`HACK_RADAR_URL` is still accepted).

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

## 4. Other hosts (same scorer)

Copy the file in `examples/` for that host. Details: [docs/hosts.md](hosts.md).

| Host | Copy |
|---|---|
| Codex | [`examples/codex-hooks.json`](../examples/codex-hooks.json) → `~/.codex/hooks.json` or `.codex/hooks.json`. Command PreToolUse only. |
| Grok Build | [`examples/grok-hooks.json`](../examples/grok-hooks.json) → `~/.grok/hooks/` or `.grok/hooks/`. Prefer `hooks/grok-hook.sh` for fail-closed. |
| Pi | [`examples/pi-extension.ts`](../examples/pi-extension.ts) → `~/.pi/agent/extensions/` or `.pi/extensions/`. Optional command settings: [`examples/pi-hooks-settings.json`](../examples/pi-hooks-settings.json) with `@hsingjui/pi-hooks` (no HTTP). |
| Amp | [`examples/amp-plugin.ts`](../examples/amp-plugin.ts) → `.amp/plugins/` or `~/.config/amp/plugins/`. |
| Prime Agent | [`examples/prime-extension.ts`](../examples/prime-extension.ts) → `~/.prime/agent/extensions/` or `.prime/agent/extensions/`. |
| dsh | DeepSeek Harness **generic stdin**: `hooks/run.ts dsh` or `generic` with [`examples/generic-event.json`](../examples/generic-event.json). HTTP skipped (404). Claude/Codex **command-hook** bridges at `tools/pre-execute` also work. |
| Exo | **support via ToolRuntime wrap**, not drop-in hooks; no native `hooks.json`. [`examples/exo-tool-runtime.ts`](../examples/exo-tool-runtime.ts) / `.rs`. Optional `.exo/agent-tools/` gate: [`examples/exo-agent-tools-gate.ts`](../examples/exo-agent-tools-gate.ts). |

Pi / Amp / Prime copies are self-contained (duplicated `AGENT_DENY` + `fetch`) so they run outside this repo. They POST to `/api/hooks/<flavor>`; keep the sidecar running.

## 5. Companion skill (any skills-compatible agent)

```bash
npx skills add 24601/rh-guard --skill rh-guard
```

Use the skill to design evals, interpret denials, and choose gates. Do not
use it as a runbook for `next dev`.

## 6. What not to do

- Do not train RL against this monitor or against chain-of-thought.
- Do not put hidden tests in a workspace file the agent can edit.
- Do not treat lexical scores as a Jev ROC.
- Do not treat [Harbor](https://github.com/harbor-framework/harbor), [jevals](https://github.com/dayhaysoos/jevals), or [openevals](https://github.com/memovai/openevals) as required to install the hooks (practices, not install dependencies). See [eval-integrity.md](eval-integrity.md).
- Do not treat [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver), [agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai), [jevscan](https://github.com/alexykn/jevscan), [jev-testbench](https://github.com/ufx7/jev-testbench), [semantic-firewall](https://github.com/CeamKrier/semantic-firewall), [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev), [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena), [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router), [gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction), [jev-compactor](https://github.com/edwardyen724-g/jev-compactor), [latch](https://github.com/CaseReed/latch), [clear-head](https://github.com/VladyslavHontar/clear-head), [jev-marshal](https://github.com/LightningK0ala/jev-marshal), [wakegate](https://github.com/shitianfang/wakegate), [if-ai](https://github.com/Victor-Casado/if-ai), [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode), [omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions), [omp-greenlight](https://github.com/SemetricLabs/omp-greenlight), [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed), [toolgate](https://github.com/fdemir/toolgate), [jev-reviewer](https://github.com/egma-ai/jev-reviewer), [safe-sh](https://github.com/EpicEric/safe-sh), [interlock](https://github.com/somoore/interlock), [port-cleanup](https://github.com/epiphany-dynamics/port-cleanup), [jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane), [jev-arena](https://github.com/meetr1912/jev-arena), [cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode), [firehose-judge](https://github.com/ragelink/firehose-judge), [jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade), [waymode](https://github.com/mossburgh/waymode), [skill-broker](https://github.com/adamjralph/skill-broker), [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b), [jev-triage](https://github.com/ThyFriendlyFox/jev-triage), [jev-curate](https://github.com/ThyFriendlyFox/jev-curate), [system-one-benchmark](https://github.com/mallahyari/system-one-benchmark), [dinostomp](https://github.com/collapseindex/dinostomp), [construct-auto-classifier](https://github.com/godspede/construct-auto-classifier), [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev), [AgentGhost](https://github.com/reddpy/AgentGhost), [slo-router](https://github.com/zeeshan8281/slo-router), [jev-lens](https://github.com/rashedInt32/jev-lens), [jev-packs](https://github.com/dtduc-git/jev-packs), [ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev), [jev-pr-review](https://github.com/ohernandezdev/jev-pr-review), [turnstile](https://github.com/zyphr-labs/turnstile), [jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas), [jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration), [prune-review](https://github.com/shubhangi013/prune-review), [jev-intent-review](https://github.com/yottayoshida/jev-intent-review), [jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval), [jev-carryforward](https://github.com/Dharundp6/jev-carryforward), [jev-labs](https://github.com/copyleftdev/jev-labs), [seal](https://github.com/Reasonofmoon/seal), [how-sure-is-jev](https://github.com/adarc8/how-sure-is-jev), [jev-preflight](https://github.com/muse0509/jev-preflight), [jev-security-scan](https://github.com/win4r/jev-security-scan), [jev-decisions](https://github.com/bojansandhaus/jev-decisions), [jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router), [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard), [pi-jev-control](https://github.com/goodruizhan/pi-jev-control), [jev-use](https://github.com/shitianfang/jev-use), [jevex](https://github.com/jimmyhealer/jevex), [jev-sift](https://github.com/kbhuw/jev-sift), [commitjev](https://github.com/yodablocks/commitjev), [jev-runway](https://github.com/IPECTER/jev-runway), [pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact), [hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev), [jev-routing](https://github.com/nekowasabi/jev-routing), [classifier-dev](https://github.com/mrmps/classifier-dev), [jev-gate](https://github.com/totally-tim/jev-gate), [claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden), [jev-kit](https://github.com/jonathanavis96/jev-kit), [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone), [opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate), [opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner), [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction), [localjev](https://github.com/githubnext/localjev), [laya](https://github.com/NandhaKishorM/laya), or [databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab) as install dependencies (sibling notes; no runtime deps).
- Do not merge this pack into Augustus, [JevLint](https://github.com/huntedman/JevLint), [jevgate](https://github.com/thevibeworks/jevgate), or [Abide](https://github.com/coldteadotai/abide) (or vice versa). Abide is soft project-instruction Jev on diffs, not a reward-hack detector. Do not merge [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver), [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard), [pi-jev-control](https://github.com/goodruizhan/pi-jev-control), [jev-use](https://github.com/shitianfang/jev-use), or [pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact) into `examples/pi-extension.ts`. Do not merge [claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden) `warden.js`, [jev-kit](https://github.com/jonathanavis96/jev-kit), [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone), [opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate), [opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner), [jev-gate](https://github.com/totally-tim/jev-gate), or [AgentGhost](https://github.com/reddpy/AgentGhost) into `examples/`.
- Do not send `continue: false` on Codex PreToolUse (Codex fails the hook and continues the tool).
- Do not deny Amp with `action: "error"` or by throwing (Amp ignores thrown plugin errors).
- Do not reuse Claude stdout for Grok (`{decision:deny,reason}` only).
- Do not treat Exo as drop-in hooks; wrap `ToolRuntime.execute` / `executeTool`.
- Do not invent `exo-hooks.json`; Exo has no native hook file.
