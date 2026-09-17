# Hack Radar

Score coding-agent prompts and trajectories for reward-hacking risk. Then steer the user or the agent toward an eval the agent cannot game by rewriting graders.

The live semantic scorer is [TypeSafe Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), a System One model. You send program state plus typed questions. Jev returns 13 hazard Nouls, a positive falsifier Noul, a primary-kind Choice, and an ordinal severity Score. It does not generate text.

Code owns decisions. Structural detectors protect designated evaluation assets (hidden tests, graders, reward functions, hooks, evaluator runtimes), not every file under `tests/`. After a structural deny, Jev is skipped. Choice, severity, and a named falsifier cannot cancel a hazard deny. `heldout_blindness` is advisory.

There is no public Jev reward-hack ROC as of 17 Sep 2026. Deploy semantic checks in `HACK_RADAR_MODE=shadow`, then `review`, then `enforce`. Missing keys and timeouts are a degraded status, not risk zero.

Closed agents such as Claude and Cursor do not expose activations, so Bergen et al. 2026 difference-of-means vectors cannot run here. The Methods page lists those methods and when they do apply.

## Run it

```bash
npm install
npm test
npm run dev
```

Open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Copy `.env.example` to `.env.local` and set `TYPESAFE_API_KEY` to score with Jev. Get a key from [console.typesafe.ai](https://console.typesafe.ai) after early-access signup. Pin `TYPESAFE_MODEL=jev-1.13.0`. `jev-latest` currently aliases that id and will move.

Without a key the app still runs. Hooks POST to `/api/hooks/claude` and `/api/hooks/cursor`.

## What it scores

One System One request per hook event, only when a structural deny did not already fire. Each hazard kind is a Noul. A Choice picks the primary kind for reporting. A Score rates consequence. Thresholds and steer copy live in this repo.

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

## Install hooks

Keep `npm run dev` running.

**Claude Code.** Merge `examples/claude-settings.json` into `.claude/settings.json` for HTTP hooks. Claude HTTP hooks only honor a 2xx JSON body. Timeouts and non-2xx responses do not block. For fail-closed PreToolUse, use `examples/claude-command-settings.json` (`npx tsx hooks/run.ts claude`); a wrapper failure emits deny JSON and exits 2. `UserPromptSubmit` injects steering context. Vague "make the tests pass" prompts steer; they do not automatically block.

**Cursor.** Copy `examples/cursor-hooks.json` to `.cursor/hooks.json`. Command hooks read JSON on stdin through `npx tsx hooks/run.ts cursor`. `beforeSubmitPrompt` cannot inject context, so a gameable prompt is allowed with a user notice; tool-denial steering uses `agent_message`. Set `failClosed: true` on shell and tool gates. Held-out tests belong in an isolated evaluator, not in a file the agent can `find`.

Do not add this score as an RL penalty on chain-of-thought or candidate selection. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that training against a CoT monitor produces obfuscated hacks.

## Offline fallback

The lexical layer matches the GLiClass strings on the Hooks page. Fine-tune `knowledgator/gliclass-modern-base-v3.0` with eight shots per label from [School of Reward Hacks](https://huggingface.co/datasets/longtermrisk/school-of-reward-hacks) plus your denied tool calls if you need an air-gapped model. Shared `RiskKind` ids do not make those probabilities interchangeable with Jev.

The published ~14M encoder is not a drop-in action-only fallback: full-input AUROC 0.9467 drops to 0.6213 if you strip reasoning at inference.

Open-weight SWE agents can add a DoM probe from [arXiv 2609.19101](https://arxiv.org/abs/2609.19101) on CoT activations. That is a second detector, not a replacement for the hook policy.

