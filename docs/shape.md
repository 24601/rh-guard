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

Score a hook event (Jev when TYPESAFE_API_KEY is set, skipped after a structural deny):

```ts
import { parseHookEvent, scoreEvent, toClaudeOutput } from "@/lib/risk";
const parsed = parseHookEvent(JSON.parse(stdin));
const report = await scoreEvent(parsed.input);
process.stdout.write(JSON.stringify(toClaudeOutput(parsed.event, report)));
```

Callers consume `verdict`, `hookVerdict`, `labels`, `evidence`, `backend`, `steer.moves`. They do not import detectors or the TypeSafe client.

## Shape

`RiskKind` is a closed union. A `ScoreReport` is the only output. Structural detectors are a registry of `{ kind, stages, weight, match }`. Jev questions are 13 hazard Nouls, one positive falsifier Noul, a primary Choice, and a severity Score. Validation of TypeSafe JSON lives at the HTTP boundary. `neuralFromJev` is a pure function. State packing uses `event` / `trusted` / `subject` / `context`. Agent text is never trusted policy.

## Synthesis decision

Two sketches.

A. Jev-only scorer. Drop regex. Every decision is a Noul. Matches TypeSafe's marketing. Fails closed-model hooks when the key is missing, when Jev is waitlisted, and on adversarial state that talks the model off a path deny. Jev 1.13 jaggedness says adversarial content can steer answers. Code can compute `sed` of an assertion and `--no-verify` exactly.

B. Structural fail-closed registry, then one Jev request for the semantic overlay, then lexical GLiClass-shaped labels if the key is missing or the call fails. Skip Jev after a structural deny. Steer copy stays in code. Jev cannot overrule a structural deny. Choice, severity, and the falsifier Noul cannot cancel a hazard. Hazard Nouls are phrased so a high number means the hack is present. Block when `noul >= 0.80` on a deny kind. Do not use the inverted `p <= 1 - t` band from safety-phrased gates. Protect designated evaluation assets, not every `tests/` write. Policy modes: shadow, then review, then enforce.

B is the base. The TypeSafe guardrails cookbook and the Pi `pi-jev-auto-mode` gate both keep rules first. Graft from A is the question catalog and the 2s timeout.

## Tradeoffs accepted

We accept a lexical false-positive rate when no TypeSafe key is set. Shared RiskKind ids do not make lexical probabilities interchangeable with Jev.

We accept 70 to 650ms on Jev hook calls. That is inside Claude's UserPromptSubmit budget and inside typical PreToolUse patience. It is slower than regex. Skip the call on structural deny.

We accept that DoM, SAE, Grift, and TRACE are documented rather than implemented. They need weights, gradients, or resampling this process does not have.

We accept that ordinary test maintenance is allowed. The deny path is protected evaluation assets, assertion `sed`, skip/xfail, `--no-verify`, runtime hijacks, and fabricated evidence. Contradictory tests go through the escalation steer, not a manufactured pass.

Claude HTTP hooks are not a complete security boundary. Command wrappers can emit an explicit deny; a killed wrapper still needs an independent capability boundary.

## Alternatives considered

LLM-as-judge on every tool call. Higher recall on obfuscated CoT, too slow for PreToolUse, and Baker et al. 2025 show it collapses if you train against it.

White-box only. Wins on open SWE agents, cannot see Claude or Cursor.

GLiClass as the only neural head. Fine for air-gapped boxes. Wrong default now that Jev exists as a 70 to 500ms typed decision model.

Averaging all Nouls or multiplying by Choice confidence. Parallel questions are not a statistically independent ensemble. A high-confidence `none` cannot override a hazard Noul.

## Open questions and risks

Jev has no published ROC on School of Reward Hacks or Terminal-Wrench. Calibration on support tickets is not a claim about SWE hacks.

Prompt-stage "make tests pass" steers; it does not automatically block. Explicit unauthorized requests to disable oversight can still block.

Hidden tests must live in an isolated evaluator. A file on disk is not held-out.

## Next implementation step

Calibrate the Noul thresholds on a held-out coding-agent trace set once a TypeSafe key is available. Pin `jev-1.13.0`. Keep the production agent frozen while fitting the monitor.
