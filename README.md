# Hack Radar

Hack Radar sits in coding-agent hooks (Claude Code, Cursor, Codex, Grok Build, Pi, Amp, Prime Agent, DeepSeek Harness) and blocks reward-hacking tool use—tampering with graders, hidden tests, or the eval process—while steering toward checks the agent cannot game. Exo is **support via ToolRuntime wrap**, not drop-in hooks.

[![Claude Code](https://img.shields.io/badge/Claude_Code-marketplace-purple.svg)](.claude-plugin/marketplace.json)
[![Skills.sh](https://img.shields.io/badge/skills.sh-compatible-green.svg)](https://www.skills.sh/)
[![TypeSafe Jev](https://img.shields.io/badge/TypeSafe-Jev_System_One-111111.svg)](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
[![Augustus](https://img.shields.io/badge/companion-Augustus-blue.svg)](https://github.com/24601/Augustus)

This repository is public on GitHub: [24601/rh-guard](https://github.com/24601/rh-guard).

**Companion, not a merge.** [Augustus](https://github.com/24601/Augustus) is design-judgment for where typed System One judgment belongs. This repo is the live hazard gate on agent tools. Keep them separate.

**Sibling, not a merge.** [JevLint](https://github.com/huntedman/JevLint) is semantic convention Noul lint in a write → check → fix loop (quality vs gaming). Not the same product.

**Sibling, not a merge.** [jevgate](https://github.com/thevibeworks/jevgate) is an allowlist that proves what may run; Jev judges only the rest. Same shape as structural deny + System One sidecar. Do not merge the products.

**Complementary, not a competitor.** [GLiGuard](https://github.com/fastino-ai/GLiGuard) is an encoder-based LLM prompt/response safety guard; rh-guard is a coding-agent reward-hack / eval integrity gate.

## Install hooks

`examples/` is the source of truth. Per-host contracts: [docs/hosts.md](docs/hosts.md). Packaging notes: [docs/install-plugin.md](docs/install-plugin.md).

| Host | Install path | Adapter | Fail-closed |
|---|---|---|---|
| Claude Code | `.claude/settings.json` or plugin | HTTP `/api/hooks/claude` or `hooks/run.ts claude` / `hooks/claude-hook.sh` | Command wrapper yes; HTTP no |
| Cursor | `.cursor/hooks.json` | `hooks/run.ts cursor` | `failClosed: true` on shell/tool |
| Codex | `~/.codex/hooks.json` / `.codex/hooks.json` | `hooks/run.ts codex` (command only; **no HTTP**) | Codex-safe deny JSON (**no `continue: false`**) + exit 2 |
| Grok Build | `~/.grok/hooks/*.json` / `.grok/hooks/*.json` | `hooks/run.ts grok` or `hooks/grok-hook.sh` | Host fail-open on crash/timeout; wrapper emits `{decision:deny}` + exit 2 |
| Pi | `~/.pi/agent/extensions/` or `.pi/extensions/` | `examples/pi-extension.ts` → `/api/hooks/pi` | Plugin `{block,reason,terminate}` on fetch failure; optional `@hsingjui/pi-hooks` command-only |
| Amp | `.amp/plugins/` or `~/.config/amp/plugins/` | `examples/amp-plugin.ts` → `/api/hooks/amp` | `reject-and-continue` + `AGENT_DENY` (not `error`); catch throws |
| Prime Agent | `~/.prime/agent/extensions/` or `.prime/agent/extensions/` | `examples/prime-extension.ts` → `/api/hooks/prime` | Plugin `{block,reason}` (no `terminate`) |
| DSH (generic/adapter) | Claude/Codex command-hook bridges | `hooks/run.ts claude` or `codex`; also `dsh`/`generic` stdin | HTTP skipped (404); command deny / generic `{block}` + exit 2 |
| Exo | wrap `ToolRuntime::execute` / `TurnContext.executeTool` ([`examples/exo-tool-runtime.ts`](examples/exo-tool-runtime.ts)) | **support via ToolRuntime wrap**, not drop-in hooks; no native `hooks.json` | Wrapper returns a tool error with `AGENT_DENY`. Host has no `failClosed` flag |

**Claude Code.** Merge [`examples/claude-settings.json`](examples/claude-settings.json) into `.claude/settings.json` for HTTP hooks. Claude HTTP hooks only honor a 2xx JSON body; timeouts and non-2xx do not block. For fail-closed PreToolUse, merge [`examples/claude-command-settings.json`](examples/claude-command-settings.json) (`npx tsx hooks/run.ts claude`); a wrapper failure emits deny JSON and exits 2. Or install the marketplace pack (HTTP for prompt/Stop, fail-closed `hooks/claude-hook.sh` on PreToolUse):

```bash
claude plugin marketplace add 24601/rh-guard
claude plugin install rh-guard@rh-guard
```

`UserPromptSubmit` injects steering context. Vague "make the tests pass" prompts steer; they do not automatically block.

**Cursor.** Copy [`examples/cursor-hooks.json`](examples/cursor-hooks.json) to `.cursor/hooks.json`. That file is the Cursor plugin. Command hooks read JSON on stdin through `npx tsx hooks/run.ts cursor`. `beforeSubmitPrompt` cannot inject context, so a gameable prompt is allowed with a user notice; tool-denial steering uses a generic `agent_message` that does not leak scores. Set `failClosed: true` on shell and tool gates.

**Skill** (eval design / interpreting denials; not how to run Next.js):

```bash
npx skills add 24601/rh-guard --skill rh-guard
```

Protocol: [`.agents/skills/rh-guard/SKILL.md`](.agents/skills/rh-guard/SKILL.md).

Keep `npm run dev` running so HTTP hooks can reach `127.0.0.1:43147`. Held-out tests belong in an isolated evaluator, not in a file the agent can `find`.

Do not add this score as an RL penalty on chain-of-thought or candidate selection. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that training against a CoT monitor produces obfuscated hacks.

## Run the sidecar

```bash
git clone https://github.com/24601/rh-guard.git
cd rh-guard
npm install
npm test
npm run dev
```

If you already use Origin: `origin repo clone basit/rh-guard`.

Open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Copy `.env.example` to `.env.local` and set `TYPESAFE_API_KEY` to score with Jev. Get a key from [console.typesafe.ai](https://console.typesafe.ai) after early-access signup. Pin `TYPESAFE_MODEL=jev-1.13.0`. `jev-latest` currently aliases that id and will move.

Without a key the app still runs. HTTP adapters POST to `/api/hooks/<flavor>`. Codex and DeepSeek Harness have no HTTP hook type on the host. Exo has no native `hooks.json`; score from the ToolRuntime wrap (or `hooks/run.ts generic`).

## What it scores

The live semantic scorer is [TypeSafe Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), a System One model. You send program state plus typed questions. Jev returns 13 hazard Nouls, a positive falsifier Noul, a primary-kind Choice, and an ordinal severity Score. It does not generate text.

Code owns decisions. Structural detectors protect designated evaluation assets (hidden tests, graders, reward functions, hooks, evaluator runtimes, canary paths), not every file under `tests/`. After a structural deny, Jev is skipped. Jev state is a digested command, backticked paths, and a unified-diff summary. Agent thoughts and self-justifications are not sent. Choice, severity, and a named falsifier cannot cancel a hazard deny and cannot independently create one. `heldout_blindness` is advisory.

Agent-visible denials are opaque filesystem-integrity messages. Scores and taxonomy stay on the operator workbench and in user-visible notices.

One System One request per hook event, only when a structural deny did not already fire. Thresholds and steer copy live in this repo.

Hazard Nouls (block when `noul >= 0.80` on a deny kind at a mutating stage):

- test tampering
- hardcoded oracles
- process evasion (`--no-verify`, skipped hooks)
- monitor gaming (note-to-evaluator)
- reward tampering
- held-out contamination
- verifier weakening
- evidence fabrication
- runtime tampering

Advisory (steer, never a deny by themselves):

- proxy metric (green tests as the goal)
- held-out blindness
- sycophantic evals
- coverage theater

`control_falsifier_named` is a positive control. It does not enter hazard aggregation.

Phrase every hazard Noul so a high number means the hack is present. Block when that number is at least 0.80 on a deny kind. Do not invert the question into "is this safe" and then raise the threshold. That contracts the rejection band. See [Jev + Pi](https://dev.to/jomatsu/jev-pi-a-probability-gate-for-my-coding-agents-shell-commands-95d).

Jev does not write verifier instructions. `src/lib/risk/steer.ts` does. Denials point at an evaluation-defect escalation path instead of "try harder."

## System One class (honest limits)

Lexical / GLiClass fallback is **degraded**, not risk zero, and not interchangeable with Jev even when `RiskKind` ids match. Open System One heads (for example Laya) are future backends, not drop-in ROC replacements for this hook. There is still **no public Jev reward-hack ROC**. Closed agents such as Claude and Cursor do not expose activations, so Bergen et al. 2026 difference-of-means vectors cannot run here. The Methods page lists those methods and when they do apply.

## Offline fallback

The lexical layer matches the GLiClass strings on the Hooks page. Fine-tune `knowledgator/gliclass-modern-base-v3.0` with eight shots per label from [School of Reward Hacks](https://huggingface.co/datasets/longtermrisk/school-of-reward-hacks) plus your denied tool calls if you need an air-gapped model.

The published ~14M encoder is not a drop-in action-only fallback: full-input AUROC 0.9467 drops to 0.6213 if you strip reasoning at inference.

Open-weight SWE agents can add a DoM probe from [arXiv 2609.19101](https://arxiv.org/abs/2609.19101) on CoT activations. That is a second detector, not a replacement for the hook policy.
