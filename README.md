# Hack Radar

Score coding-agent prompts and trajectories for reward-hacking risk. Then steer the user or the agent toward an eval the agent cannot game by editing tests.

This is a local scorer plus hook sidecar. It is not a white-box probe. Closed agents such as Claude and Cursor do not expose activations, so Bergen et al. 2026 difference-of-means vectors cannot run here. The Methods page lists those methods and when they do apply.

## Run it

```bash
npm install
npm test
npm run dev
```

Open [http://127.0.0.1:43147](http://127.0.0.1:43147). The scorer runs in the browser. Hooks POST to `/api/hooks/claude` and `/api/hooks/cursor`.

## What it scores

A typed label set, the same strings you would pass to [GLiClass](https://github.com/Knowledgator/GLiClass):

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

Structural detectors fire on tool calls and patches. A lexical zero-shot layer fills prompt-level gaps. Swap the lexical layer for `knowledgator/gliclass-base-v3.0` later without changing labels. Fine-tune on [School of Reward Hacks](https://huggingface.co/datasets/longtermrisk/school-of-reward-hacks) plus your own traces. Eight examples per label is the GLiClass few-shot recipe.

## Install hooks

Keep `npm run dev` running.

**Claude Code.** Merge `examples/claude-settings.json` into `.claude/settings.json`. `UserPromptSubmit` injects steering context. `PreToolUse` denies test-file writes, assertion sed, and `--no-verify`. Claude HTTP hooks only honor a 2xx JSON body. A status code alone does not block.

**Cursor.** Copy `examples/cursor-hooks.json` to `.cursor/hooks.json`. Command hooks read JSON on stdin through `npx tsx hooks/run.ts cursor`. `beforeSubmitPrompt` cannot inject context, so a gameable prompt is blocked with a user message instead. Set `failClosed: true` on shell and tool gates. Held-out tests belong in CI or the hook process, not in a file the agent can `find`.

Do not add this score as an RL penalty on chain-of-thought. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that training against a CoT monitor produces obfuscated hacks.

## Train a real GLiClass later

1. Keep the labels on the Hooks page.
2. Collect traces with `cheat_method` from School of Reward Hacks plus your denied tool calls.
3. Fine-tune `knowledgator/gliclass-modern-base-v3.0` with eight shots per label.
4. Point `POST /api/score` at that process. The domain types do not change.

Open-weight SWE agents can add a DoM probe from [arXiv 2609.19101](https://arxiv.org/abs/2609.19101) on CoT activations. That is a second detector, not a replacement for the hook policy.
