# Shape

## Problem

Closed coding agents expose prompts, tool calls, and traces, not residual-stream activations. A detector that only works as a DoM probe cannot sit in a Claude or Cursor hook. The public surface still has to match a later GLiClass or 14M encoder so the labels do not churn.

## Usage (caller's view)

Score a prompt:

```ts
import { score } from "@/lib/risk";
score({ stage: "prompt", prompt });
```

Hook:

```ts
const parsed = parseHookEvent(JSON.parse(stdin));
const report = score(parsed.input);
process.stdout.write(JSON.stringify(toClaudeOutput(parsed.event, report)));
```

Callers consume `verdict`, `labels`, `evidence`, and `steer.moves`. They do not import detectors.

## Shape

`RiskKind` is a closed union. A `ScoreReport` is the only output. Detectors are a registry of `{ kind, stages, weight, match }`. Validation lives at the HTTP and stdin parse. Scoring is a pure function.

The public surface is `score`, `parseHookEvent`, and the two hook adapters. Detector IDs, regexes, and phrase lists stay inside `src/lib/risk`.

## Synthesis decision

Two sketches.

A. Python GLiClass sidecar as the only scorer. Accurate later, unusable until a model download, and slow for PreToolUse.

B. Typed registry plus lexical labels with the GLiClass strings frozen. Hooks work on CPU now. The neural model becomes a drop-in for the lexical layer.

B is the base. Graft from A is the label catalog and the few-shot training note.

## Tradeoffs accepted

We accept a lexical false-positive rate on prompt overlap in exchange for a hook that runs without a GPU.

We accept that DoM, SAE, Grift, and TRACE are documented rather than implemented. They need weights, gradients, or resampling this process does not have.

We accept denying test-file writes even when the user asked to fix a bad test. The steer path is to stop and ask, not to patch the eval.

## Alternatives considered

LLM-as-judge on every tool call. Higher recall on obfuscated CoT, too slow for PreToolUse, and Baker et al. 2025 show it collapses if you train against it.

White-box only. Wins on open SWE agents, cannot see Claude or Cursor.

## Open questions and risks

Should prompt-stage `block` ever fire for "make tests pass", or only steer?

Where should hidden tests live so a cloud agent cannot write them?

## Next implementation step

Write `score()` against the fixture traces in `examples.ts` and keep those verdicts literal.
