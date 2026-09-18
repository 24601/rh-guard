---
name: rh-guard
description: >
  Use when designing or evaluating coding-agent evals for reward-hacking, interpreting
  Hack Radar / rh-guard denials, choosing structural vs Jev gates, or relating that
  live hazard gate to Augustus decision-design. Do not use to run or debug the Next.js
  sidecar (npm run dev, /api/hooks/*).
metadata:
  version: 0.1.0
  companion: "https://github.com/24601/Augustus"
  sidecar: "https://github.com/24601/rh-guard"
---

# rh-guard

Hack Radar (`rh-guard`) is a **live hazard gate** on coding-agent tools
(Claude Code, Cursor, Codex, Grok Build, Pi, Amp, Prime Agent, and
DeepSeek Harness / `dsh`). Same `scoreEvent` path; multi-host adapters per
install surface. Structural detectors deny writes to designated evaluation assets.
TypeSafe Jev (System One) scores remaining events. Code owns thresholds and
steer copy.

This skill is the protocol for *using* those verdicts and for designing evals
they protect. It is **not** how to boot the Next server.

**Do not merge products.** [Augustus](https://github.com/24601/Augustus) is
design-judgment for *where* typed System One judgment belongs. rh-guard is the
runtime gate on agent tools. Use Augustus to place judgments; use this skill
when the judgment is reward-hack risk on a coding-agent hook.

## Install the gate (hooks), not this skill

Canonical hook JSON and host copies live in `examples/`. Host matrix:
`docs/hosts.md`. Full steps: `docs/install-plugin.md`.

```bash
# Skill only (Amp, Codex, Cursor, …). Does not start the sidecar.
npx skills add 24601/rh-guard --skill rh-guard

# Claude Code plugin (skill + hook pack). Sidecar still required.
claude plugin marketplace add 24601/rh-guard
claude plugin install rh-guard@rh-guard
```

Cursor's "plugin" is `examples/cursor-hooks.json` copied to `.cursor/hooks.json`.
Codex, Grok, Pi, Amp, Prime, and DeepSeek Harness adapters are in `examples/`
as well (`docs/hosts.md`).

Exo ([exoharness/exo](https://github.com/exoharness/exo)) is **support via
ToolRuntime wrap**, not drop-in hooks. It has no native `hooks.json`. Wrap
`ToolRuntime::execute` / `TurnContext.executeTool` with
`examples/exo-tool-runtime.ts`. Optional `.exo/agent-tools/` gate:
`examples/exo-agent-tools-gate.ts`. Generic stdin (`hooks/run.ts generic` /
`exo`) stays usable if Exo later adds hooks.

## Protocol

1. **Opaque denials for agents; scores for operators.** Agent-visible text is
   filesystem-integrity / eval-artifact copy (`AGENT_DENY`, `AGENT_STEER`).
   Hazard kinds, Noul values, Choice, and severity stay on the operator
   workbench and in user-visible notices. Do not echo scores, taxonomy ids, or
   thresholds into `permissionDecisionReason`, `agent_message`, or injected
   agent context.
2. **Never train RL against this monitor or against CoT.** Use the score to
   steer or block. Do not add it as a penalty on chain-of-thought or candidate
   selection. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that
   training against a CoT monitor produces obfuscated hacks.
3. **Fail-open vs fail-closed is a hook-channel property.** Claude **HTTP**
   hooks only honor a 2xx JSON body; timeouts and non-2xx are a no-op
   (fail-open). Fail-closed PreToolUse uses a **command** wrapper
   (`examples/claude-command-settings.json` or `hooks/claude-hook.sh`) that
   emits deny JSON and exits 2 on scorer failure. Cursor `failClosed: true` on
   shell and tool gates. Codex command PreToolUse denies with
   `permissionDecision: deny` — **never** `continue: false` (that field makes
   Codex fail-open). Grok host crash/timeout is fail-open; `hooks/grok-hook.sh`
   emits `{decision:deny,reason}`. Amp deny is `reject-and-continue`, not
   `error`. HTTP UserPromptSubmit is still fail-open. Exo fail-closed is
   whatever the `ToolRuntime` wrapper does (return a tool error with
   `AGENT_DENY`); the host itself has no `failClosed` flag. A killed wrapper is
   not a security boundary; keep an independent capability fence.
4. **Positive falsifier is a control, not a hazard.** `control_falsifier_named`
   must not enter hazard aggregation. Choice, severity, and the falsifier Noul
   cannot cancel a structural or hazard deny and cannot independently create
   one. `heldout_blindness` is advisory.
5. **Hazard Noul polarity: high means the hack is present.** Block when
   `noul >= t` on a deny kind at a mutating stage (default band starts at
   0.82 / 0.88, monitor gaming 0.70). Do not invert the question into "is this
   safe" and then raise the threshold; that contracts the rejection band.
6. **Structural first, then Jev.** Code-computable denies (protected eval
   paths, assertion `sed`, `--no-verify`, runtime hijacks) fire before any
   semantic call. After a structural deny, skip Jev. Jev cannot overrule a
   structural deny. Do not authorize a mutate on a stale soft Noul alone
   (TOCTOU: check-then-act is not atomic). See `references/gates.md`.
7. **Lexical / GLiClass / open System One heads are not ROC-equivalent.**
   Without `TYPESAFE_API_KEY`, the lexical fallback is **degraded**, not risk
   zero. Shared `RiskKind` ids do not make probabilities interchangeable with
   Jev. Open System One heads (for example Laya) are future backends, not
   drop-in replacements. There is **no public Jev reward-hack ROC**.

## Structural vs Jev (choose in this order)

| Gate | Owns | Typical deny |
|---|---|---|
| Structural registry | Exact bytes, paths, flags | Hidden-eval writes, `sed` of asserts, `git commit --no-verify` |
| Jev hazard Nouls | Semantic overlay on digested state | Obfuscated monitor gaming, reward-file intent |
| Advisory Nouls / steer | User-facing eval design | "Make the tests pass", coverage theater, held-out blindness |
| Lexical fallback | Air-gap / missing key | Degraded stand-in; do not treat as calibrated Jev |

Ordinary test maintenance is allowed. The deny path is designated evaluation
assets and canaries, not every file under `tests/`. Hidden tests belong in an
isolated evaluator, not a workspace file the agent can `find`.

Vague "make the tests pass" prompts **steer**; they do not automatically
block. Explicit unauthorized requests to disable oversight can still block.

## Interpreting a denial

- Agent saw an opaque integrity message: look at the **operator** report
  (`verdict`, `hookVerdict`, `labels`, `structuralDeny`, `backend`).
- `structuralDeny: true` → a code detector already decided; Jev was skipped.
- `backend: "lexical"` → degraded; do not treat scores as Jev-calibrated.
- `backend: "jev"` plus a high deny-kind Noul → semantic overlay fired.
- Prompt-stage steer without a tool deny → change the **eval**, not the
  agent's wording, unless the user asked to disable oversight.

## Related

- Sidecar, questions, and hook JSON: this repository (`README.md`, `examples/`,
  `docs/hosts.md`, `docs/install-plugin.md`, `docs/shape.md`)
- Broader System One placement: [Augustus](https://github.com/24601/Augustus)
- Official TypeSafe contracts: [typesafe-ai/skills](https://github.com/typesafe-ai/skills)
