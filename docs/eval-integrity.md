# Eval integrity & measurement

Harbor, jevals, and openevals are **practices**, not install dependencies.
Installing Hack Radar hooks does not require those packages.

## Harbor (e2e substrate)

[Harbor](https://github.com/harbor-framework/harbor) is the preferred
end-to-end substrate for reward-hack / eval-gaming scenarios:

1. **Taskset (score first).** Instruction, tests, and reward live on the
   task. The score is not the agent's self-report and not a hook Noul.
2. **Harness.** The agent loop that attempts the task. rh-guard hooks are
   structural / System One gates *inside* this loop. They do not replace a scored taskset.
3. **Runtime.** Isolated sandbox (Docker, Daytona, …). Hidden tests belong
   here or in the validator, not in a workspace file the agent can `find`.

Grade with an **independent validator** — Harbor's
[separate verifier](https://docs.harborframework.com/core-concepts/tasks/separate-verifier.md)
in a container the agent does not share. Carry results through a
**HoH evidence loop**
([Harness-of-Harness](https://arxiv.org/abs/2609.01481)): plan, implement,
independently verify. Only QA evidence feeds the next iteration; the
implementer's own tests are not ground truth.

## jevals (decision-stage workbench)

[jevals](https://github.com/dayhaysoos/jevals) is the complementary
workbench for typed Noul / Choice / Score falsification when this sidecar
or a policy uses Jev-class judgments. It measures decisions; it is not the
product loop and not the tool gate.

Practices (from the jevals skill):

- **Independent answer keys.** Derive expected answers from criteria and
  case evidence *before* running. Never promote predictions to labels.
- **Correctness ≠ confidence.** A high Noul or Choice confidence is not a
  correct label. Score confidence is separate from error / tolerance.
- **Held-out discipline.** Reserve independently reviewed cases before
  examining predictions. Tune on development examples; claim on a separate
  held-out Jeval with equivalent questions.
- **Compare only equivalent case sets.** Matching names are not enough.
  Comparable runs keep question IDs/types, Choice labels or Score rubric,
  case states, and reviewed keys. Changing the answer key changes the
  experiment.

## Online eval (adjacent)

[openevals](https://github.com/memovai/openevals) is Harbor/jevals-adjacent **online** eval / observability. Code graders first, then cheap parallel System One (Jev) per-step and trace questions written back to Langfuse/OTLP. Composite and pass rules live in code; human annotation calibrates whether those questions can be trusted. Parallel judge for traces — not the primary task score and not LLM-as-judge as the reward.

[typesafe-jev-tools](https://github.com/wotai-dev/typesafe-jev-tools) is an adjacent abstention / VOI meta-gate: ask "does this decision need a model?" before calling one. Code first, then maybe System One; never LLM-as-judge as the reward. It never blocks.

## Gate watch (adjacent)

[jev-align](https://github.com/caiovicentino/jev-align) verifies a plan or response against policy before act (including fabricated verification). Complementary to this sidecar's tool gate, not a merge.

[jev-harness](https://github.com/AntonioCoppe/jev-harness) is a measurement pattern: shadow mode, confidence gates, and evals that assert on the action, not free text — so you can see when a System One gate is being gamed vs calibrated. Contrast with LLM-as-judge as the primary score.

[jev-pref](https://github.com/doeixd/jev-pref) encodes AGENTS.md prefs as a Jev linter. Watch preference-theater: prefs that are not independently enforceable (tests, types, structural detectors) are not a substitute for this gate.

Watch, not an endorsement: [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) is a distilled memory-relevance student of teacher Jev. Agreement with teacher labels is not independent gold; a student gate can overfit teacher quirks (distill → gate integrity).

[is-malicious](https://github.com/luantak/is-malicious) is a complementary codebase covert-behavior scanner (listed on awesome-jev); rh-guard is a coding-agent reward-hack / eval integrity gate.

## Anti-pattern

Using **LLM-as-judge** (or gaming jevals labels) as the reward signal is
the failure mode rh-guard is meant to catch — reward tampering, monitor
gaming, and training against the monitor. See
[docs/shape.md](shape.md) (LLM-as-judge as an alternative considered) and
[Baker et al. 2025](https://arxiv.org/abs/2503.11926): pressure on a CoT
monitor produces obfuscated hacks. Do not put this sidecar's score, a
jevals accuracy number, or an LLM judge into the RL reward.

## Siblings, not a merge

jevals measures decisions; rh-guard gates agent tool use; Harbor scores product/agent loops.

[jevgate](https://github.com/thevibeworks/jevgate) is an allowlist that
proves what may run; Jev judges only the rest. [JevLint](https://github.com/huntedman/JevLint)
is semantic convention Noul lint in a write → check → fix loop (quality,
not gaming). [GLiGuard](https://github.com/fastino-ai/GLiGuard) is an
encoder-based LLM prompt/response safety guard; rh-guard is a coding-agent
reward-hack / eval integrity gate.
