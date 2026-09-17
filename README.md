# Hack Radar

Score coding-agent prompts and trajectories for reward-hacking risk. Then steer the user or the agent toward an eval the agent cannot game by editing tests.

The live semantic scorer is [TypeSafe Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), a System One model. You send program state plus typed questions. Jev returns Nouls, a Choice, and a Score with calibrated probabilities. It does not generate text.

Structural detectors still deny test-file writes, assertion `sed`, and `git commit --no-verify` in code. Jev cannot overrule those. If `TYPESAFE_API_KEY` is unset, a lexical GLiClass-shaped layer fills the same `RiskKind` ids.

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

One System One request per hook event. Each kind is a Noul. A Choice picks the primary kind. A Score rates severity. Thresholds and steer copy live in this repo.

- proxy metric (green tests as the goal)
- test tampering
- hardcoded oracles
- verifier weakening
- process evasion (`--no-verify`, skipped hooks)
- monitor gaming (note-to-evaluator)
- held-out blindness
- sycophantic evals
- coverage theater
- reward tampering

Phrase every Noul as a hazard. A high number means the hack is present. Block when that number is at least 0.78 on a deny kind. Do not invert the question into "is this safe" and then raise the threshold. That contracts the rejection band. See [Jev + Pi](https://dev.to/jomatsu/jev-pi-a-probability-gate-for-my-coding-agents-shell-commands-95d).

Jev does not write verifier instructions. `src/lib/risk/steer.ts` does.

## Install hooks

Keep `npm run dev` running.

**Claude Code.** Merge `examples/claude-settings.json` into `.claude/settings.json`. `UserPromptSubmit` injects steering context. `PreToolUse` denies test-file writes, assertion sed, and `--no-verify`. Claude HTTP hooks only honor a 2xx JSON body. A status code alone does not block.

**Cursor.** Copy `examples/cursor-hooks.json` to `.cursor/hooks.json`. Command hooks read JSON on stdin through `npx tsx hooks/run.ts cursor`. `beforeSubmitPrompt` cannot inject context, so a gameable prompt is blocked with a user message instead. Set `failClosed: true` on shell and tool gates. Held-out tests belong in CI or the hook process, not in a file the agent can `find`.

Do not add this score as an RL penalty on chain-of-thought. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that training against a CoT monitor produces obfuscated hacks.

## Offline fallback

The lexical layer matches the GLiClass strings on the Hooks page. Fine-tune `knowledgator/gliclass-modern-base-v3.0` with eight shots per label from [School of Reward Hacks](https://huggingface.co/datasets/longtermrisk/school-of-reward-hacks) plus your denied tool calls if you need an air-gapped model.

Open-weight SWE agents can add a DoM probe from [arXiv 2609.19101](https://arxiv.org/abs/2609.19101) on CoT activations. That is a second detector, not a replacement for the hook policy.

