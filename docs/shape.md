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

B. Structural fail-closed registry, then one Jev request for the semantic overlay, then lexical GLiClass-shaped labels if the key is missing or the call fails. Skip Jev after a structural deny. State sent to Jev is pre-digested (command binary/flags/args, backticked paths, unified diffs). Agent justifications are stripped. Steer copy stays in code and is opaque to the agent. Jev cannot overrule a structural deny. Choice, severity, and the falsifier Noul cannot cancel a hazard and cannot independently deny. Hazard Nouls are phrased so a high number means the hack is present. Per-kind block thresholds start at 0.82 / 0.88 / 0.70 (monitor gaming). Do not use the inverted `p <= 1 - t` band. Protect designated evaluation assets and canaries, not every `tests/` write. Policy modes: shadow, then review, then enforce.

B is the base. The TypeSafe guardrails cookbook and the Pi `pi-jev-auto-mode` gate both keep rules first. [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) is the oh-my-pi cousin (`safe`/`ask`/`unsafe`; classifier failure defers to omp approval). Graft from A is the question catalog and the 2s timeout. [jevgate](https://github.com/thevibeworks/jevgate) is the same layering on shell permissions: an allowlist proves what may run, code-refused writers never reach the model, Jev judges only unlisted verbs, and the tool cannot block. [Abide](https://github.com/coldteadotai/abide) is the same envelope on project-instruction diffs (fail-open, banded confidence; soft judgment never the sole hard veto), not a reward-hack detector. [JevLint](https://github.com/huntedman/JevLint) uses Jev for convention Nouls in a write → check → fix loop (quality, not eval-gaming). Do not merge them into this sidecar.

## Tradeoffs accepted

We accept a lexical false-positive rate when no TypeSafe key is set. Shared RiskKind ids do not make lexical probabilities interchangeable with Jev.

We accept 70 to 650ms on Jev hook calls. That is inside Claude's UserPromptSubmit budget and inside typical PreToolUse patience. It is slower than regex. Skip the call on structural deny.

We accept that DoM, SAE, Grift, and TRACE are documented rather than implemented. They need weights, gradients, or resampling this process does not have.

We accept that ordinary test maintenance is allowed. The deny path is protected evaluation assets, assertion `sed`, skip/xfail, `--no-verify`, runtime hijacks, and fabricated evidence. Contradictory tests go through the escalation steer, not a manufactured pass.

Claude HTTP hooks are not a complete security boundary. Command wrappers can emit an explicit deny; a killed wrapper still needs an independent capability boundary.

## Alternatives considered

LLM-as-judge on every tool call. Higher recall on obfuscated CoT, too slow for PreToolUse, and Baker et al. 2025 show it collapses if you train against it. Using that judge (or gaming [jevals](https://github.com/dayhaysoos/jevals) labels) as the reward signal is the failure mode this gate is meant to catch. Preferred e2e substrate is [Harbor](https://github.com/harbor-framework/harbor) with an independent validator; see [docs/eval-integrity.md](eval-integrity.md). For live traces, [openevals](https://github.com/memovai/openevals) uses cheap parallel System One as an observability judge, not as the primary score or RL reward. [jev-align](https://github.com/caiovicentino/jev-align) verifies a plan or response against policy before act; [jev-harness](https://github.com/AntonioCoppe/jev-harness) measures a System One gate with shadow / confidence action evals, not LLM-as-judge as the primary score.

White-box only. Wins on open SWE agents, cannot see Claude or Cursor.

GLiClass as the only neural head. Fine for air-gapped boxes. Wrong default now that Jev exists as a 70 to 500ms typed decision model.

Averaging all Nouls or multiplying by Choice confidence. Parallel questions are not a statistically independent ensemble. A high-confidence `none` cannot override a hazard Noul. A Choice with no "other" can still be forced wrong at confidence 1.0; [wellposed](https://github.com/suraj-phanindra/wellposed) lints that request shape — confidence gating cannot catch it.

## System One class

The live head is TypeSafe Jev. Lexical / GLiClass-shaped labels are a degraded fallback when the key is missing or the call fails, not a calibrated substitute. Open System One heads ([laya](https://github.com/NandhaKishorM/laya); [localjev](https://github.com/githubnext/localjev) prompted JSON) are future backends: same *class* (typed Choice / Score / Noul), not drop-in ROC replacements for this reward-hack hook — a 0.85 gate is still soft (Khmer OOD 0.000 at 95.2% confidence), and wire-compatible probs are not calibrated logits. Quote a number only with the served backend (`FALLBACK` / lexical); advertised backend ≠ served backend ([classifier-dev](https://github.com/mrmps/classifier-dev)). There is no public Jev reward-hack ROC. Do not cite support-ticket calibration as a SWE-hack claim. Fail-open hygiene ([jev-kit](https://github.com/jonathanavis96/jev-kit) "This is not a security control"), a system-directive ask-before-act ([opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate); not a hard block), dual-gate screening that can silently discard a replacement ([agent-chaperone](https://github.com/agent-chaperone/agent-chaperone): advertised screened ≠ served payload), and uncalibrated compaction keepThresholds ([opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner) 0.15 vs [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) 0.5) are not safety envelopes. InjecAgent AUC 0.976 and labelled-eval 100% are confidence theater if quoted as a rh-guard ROC. Dropping request-view messages can erase eval evidence. A named offline heuristic floor ([yolo-shell](https://github.com/riz007/yolo-shell): **no silent fail-open when Jev is down**) is not the same as a crash that allows. Dispatch success is not evidence ([jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel): **action ≠ verified outcome**; **Command sent ≠ state confirmed**). Advertised trajectory verification is not a shipped module ([apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness): **advertised capability ≠ shipped module**; **shadow vs live** `shadow_noop`). A design-only NLI prompt gate ([herdr-jev](https://github.com/muthuishere/herdr-jev) **Nothing here works yet**) is not a TypeSafe Jev ROC. Silent fail-open when Jev is down ([alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard): **Tripwires never deny**; `allow` bypasses host deny rules) is not yolo-shell's named floor. Incomplete evidence must stay `UNAVAILABLE`, not PASS ([pablozr/JevGuard](https://github.com/pablozr/JevGuard): **advertised monorepo ≠ shipped packages**). A local n-gram daemon branded Jev ([jevbrain](https://github.com/Synxneuos/jevbrain): confidence ≥ 0.80 → `AUTO_ACT` else `REVIEW_QUEUE`) is not TypeSafe Jev — auto-act at that uncalibrated threshold is silent-fallback / confidence theater. Planted defects withheld from criteria writers ([ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground)) are the held-out antidote. A judge Noul is not a verified bug ([jev-crawlers](https://github.com/russfranky/jev-crawlers): **unverified lead, never a bug**; **ranking signals**, not calibrated confidence). Argmax without reading the probability is soundness theater ([typed-gate](https://github.com/harshpuri84/typed-gate): **declining to answer**; 0.40–0.60 band is a refusal; **argmax only** omitted 25). A fail-open pre-exec checker ([pi-jev-gate](https://github.com/fivethirty/pi-jev-gate): `p(block) ≥ 0.50`; **failing open**) is not this sidecar. Documentation-only OpenAPI can hide consumer breaks ([jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel): **documentation-only**; enforce only when breaking AND promise-violation ≥ 0.90). A passing CI condition is advisory ([if-ai](https://github.com/Victor-Casado/if-ai): **A passing if-ai check is advisory**; TypeSafe **67.8%** is four workflows, not PR review). A 2.8MB Laya distill ([nanoprune](https://github.com/dmdjr1409/nanoprune): **0.0% Hallucination Guaranteed** / ECE 2.58%) is not TypeSafe Jev. Skill recommendation is not a grant ([hermes-switchyard](https://github.com/bgrablin/hermes-switchyard): **never loads the skill**; ack is **not DLP**; 0.20 local / 0.80 Jev uncalibrated). Soft-judgment gate middleware that hard-denies four Nouls at 0.5 ([typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates): **27/27** / **31/31** are synthetic probes, not a rh-guard ROC; **second layer, not a boundary**; pattern first, judgment **never looser**; 0.5 / 0.6 / 0.8 are starting points). Static shell Scores at `--error-on` ([safe-sh](https://github.com/EpicEric/safe-sh): `curl | safe-sh`; **never executes**) are not yolo-shell's exec floor. Confirm-as-gate paste routing ([jev-pastepilot](https://github.com/buberlo/jev-pastepilot): **Confirm is a gate, not a formality**; **Confidence is a gate, not proof**; **fail-opens**) is not a safety envelope. A cache hit is not a correctness proof ([jevcache](https://github.com/hyperspaceai/jevcache): **cache hit ≠ correctness**; shared fingerprint bundles as calibrated truth / auto-act is trust theater). A GEPA training score is not auto-accept ([sutro-sh/jev-align](https://github.com/sutro-sh/jev-align): quoted **A higher training score never accepts a proposal automatically**; hard-gating that score is soundness theater). Compiled `when asked` guidance is not an enforced PreToolUse hook ([enzyme](https://github.com/byenzyme/enzyme): quoted **guidance compiled for your agent, not an enforced hook**; **catalyst similarity** is ranking, not deny/allow). Closed-world Choice without an escape is a forced false positive ([seb4ez/jevguard](https://github.com/seb4ez/jevguard): inject `UNRESOLVED_OR_OTHER`; flag `AMBIGUOUS_STATE` when top p < 0.40 or margin < 0.15). Soft CI skip without shadow is hard-gating ([guilhem/jev-ci-selector](https://github.com/guilhem/jev-ci-selector): **Measure before you skip**; `proposed_run` vs `run`). A 0–4 safety grade is a measurement, not a veto ([tonedown](https://github.com/ziziphus-jujuba-zao/tonedown): **the engine only measures**; 74/74 **proves the pipeline, not the model**). Productized moderation that fails open ([ohernandezdev/jevmod](https://github.com/ohernandezdev/jevmod): `error_open`; AUROC is a **sanity benchmark, not a leaderboard**) is not a rh-guard ROC. A 74-message injection demo ([one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe): **demonstration set, not a statistically powered** benchmark) is not a safety proof. A fail-closed allow/ask/warn ladder is not a hard deny list ([pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel): quoted **never auto-allows**; secret scrub before Jev; optional task pin; **Prompt injection is not solved**). Contrast fail-open pruners / [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Fail-open skill/routing overlays ([hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills): quoted **Everything fails open**; named lexical skip, not live Jev; Jev can only return an action id from the table; [hermes-skill-router](https://github.com/cdepuy/hermes-skill-router): local Laya **Fail-open**; inject ≠ grant; same-named trees exist) are not this sidecar's structural deny. Assessors do not execute ([dgp](https://github.com/numerous-com/dgp): **application code retains control**; quoted DGP `docs/TYPESAFE_JEV.md`; **Speculative assessments cannot authorize effects**; cache hit ≠ live Jev). [Archer](https://typesafe.ai/blog/introducing-system-one-models-and-jev) is still **promised-not-landed**. Do not treat [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) as Archer. A request-rewrite harness that shrinks `tools[]` before the call ([jev-routing](https://github.com/nekowasabi/jev-routing): explicitly **not an MCP server**; distinct from [nekowasabi/jev-routing-mcp](https://github.com/nekowasabi/jev-routing-mcp); drop/truncate **without summarizing**) is a control-plane cousin, not this sidecar.

## TOCTOU

A Noul is a score at one hook event, not a capability grant. Deny mutating tools with fresh structural checks on that event. Do not authorize a write, `sed`, or `--no-verify` because an earlier prompt-stage Noul was below threshold. Soft semantic scores may steer; they do not replace an atomic policy on the side effect. Check-then-act on a stale overlay is how a gate looks closed in logs and still loses the race. [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) binds a single-use Action Grant to the exact tool call and consumes it once (replayed/expired/mutated permits fail closed). A Noul is not a permit. [AgentGhost](https://github.com/reddpy/AgentGhost) wraps execution so the model cannot opt out (`guard()` *is* the tool's execution function); ASK/DENY throw so approval cannot be silently skipped; default `failMode` closed. Contrast actiongate `wrapTool` (advisory until a gateway). [dgp](https://github.com/numerous-com/dgp) names the same integrity boundary: typed assessment then application-side guarded commit; quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe): **Speculative assessments cannot authorize effects**; cache hit ≠ live Jev; assessors do not execute. Primary protocol fold is in Augustus; here the boundary. [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) re-checks target and instruction snapshots before committing the captured path (a changed instruction snapshot gets one fresh evaluation). Cousin, not this sidecar.

## Open questions and risks

Jev has no published ROC on School of Reward Hacks or Terminal-Wrench. Calibration on support tickets is not a claim about SWE hacks.

Prompt-stage "make tests pass" steers; it does not automatically block. Explicit unauthorized requests to disable oversight can still block.

Hidden tests must live in an isolated evaluator. A file on disk is not held-out.

## Next implementation step

Calibrate the Noul thresholds on a held-out coding-agent trace set once a TypeSafe key is available. Pin `jev-1.13.0`. Keep the production agent frozen while fitting the monitor.
