# Shape

## Problem

Closed coding agents expose prompts, tool calls, and traces, not residual-stream activations. A DoM probe cannot sit in a Claude or Cursor hook.

TypeSafe Jev is a System One model. It takes unstructured state and returns typed probabilistic decisions. It is the live semantic scorer. It is not a GLiNER-style token classifier and it does not generate steer text.

## Usage (caller's view)

Score a prompt with the lexical fallback (tests, no API key):

```ts
import { score } from "@/lib/risk";
score({ stage: "prompt", prompt });
```

Score a hook event (Jev when TYPESAFE_API_KEY is set):

```ts
import { parseHookEvent, scoreEvent, toClaudeOutput } from "@/lib/risk";
const parsed = parseHookEvent(JSON.parse(stdin));
const report = await scoreEvent(parsed.input);
process.stdout.write(JSON.stringify(toClaudeOutput(parsed.event, report)));
```

Callers consume `verdict`, `labels`, `evidence`, `backend`, `steer.moves`. They do not import detectors or the TypeSafe client.

## Shape

`RiskKind` is a closed union. A `ScoreReport` is the only output. Structural detectors are a registry of `{ kind, stages, weight, match }`. Jev questions are a registry of Nouls keyed by the same kinds, plus a primary Choice and a severity Score. Validation of TypeSafe JSON lives at the HTTP boundary. `neuralFromJev` is a pure function.

## Synthesis decision

Two sketches.

A. Jev-only scorer. Drop regex. Every decision is a Noul. Matches TypeSafe's marketing. Fails closed-model hooks when the key is missing, when Jev is waitlisted, and on adversarial state that talks the model off a path deny. Jev 1.13 jaggedness says adversarial content can steer answers. Code can compute `sed` of an assertion and `--no-verify` exactly.

B. Structural fail-closed registry, then one Jev request for the semantic overlay, then lexical GLiClass-shaped labels if the key is missing or the call fails. Steer copy stays in code. Jev cannot overrule a structural deny. Hazard Nouls are phrased so a high number means the hack is present. Block when `noul >= 0.78` on a deny kind. Do not use the inverted `p <= 1 - t` band from safety-phrased gates.

B is the base. The TypeSafe guardrails cookbook and the Pi `pi-jev-auto-mode` gate both keep rules first. Graft from A is the question catalog and the 2s timeout.

## Tradeoffs accepted

We accept a lexical false-positive rate when no TypeSafe key is set.

We accept 70 to 650ms on Jev hook calls. That is inside Claude's UserPromptSubmit budget and inside typical PreToolUse patience. It is slower than regex.

We accept that DoM, SAE, Grift, and TRACE are documented rather than implemented. They need weights, gradients, or resampling this process does not have.

We accept denying test-file writes even when the user asked to fix a bad test. The steer path is to stop and ask, not to patch the eval.

## Alternatives considered

LLM-as-judge on every tool call. Higher recall on obfuscated CoT, too slow for PreToolUse, and Baker et al. 2025 show it collapses if you train against it.

White-box only. Wins on open SWE agents, cannot see Claude or Cursor.

GLiClass as the only neural head. Fine for air-gapped boxes. Wrong default now that Jev exists as a 70 to 500ms typed decision model.

## Open questions and risks

Jev has no published ROC on School of Reward Hacks or Terminal-Wrench. Calibration on support tickets is not a claim about SWE hacks.

Should prompt-stage `block` ever fire for "make tests pass", or only steer?

Where should hidden tests live so a cloud agent cannot write them?

## Next implementation step

Calibrate the Noul thresholds on a held-out coding-agent trace set once a TypeSafe key is available. Pin `jev-1.13.0`.
