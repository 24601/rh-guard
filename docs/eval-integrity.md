# Eval integrity & measurement

Harbor, jevals, and openevals are **practices**, not install dependencies.
Installing RH Guard hooks does not require those packages.

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

[wellposed](https://github.com/suraj-phanindra/wellposed) lints Choice / Score / Noul requests before runtime. A Choice with no "other" can be forced wrong at confidence 1.0; broken backtick paths are unanswerable. Confidence gating cannot catch a forced wrong Choice — inspect request shape first.

## Online eval (adjacent)

[openevals](https://github.com/memovai/openevals) is Harbor/jevals-adjacent **online** eval / observability. Code graders first, then cheap parallel System One (Jev) per-step and trace questions written back to Langfuse/OTLP. Composite and pass rules live in code; human annotation calibrates whether those questions can be trusted. Parallel judge for traces — not the primary task score and not LLM-as-judge as the reward.

[typesafe-jev-tools](https://github.com/wotai-dev/typesafe-jev-tools) is an adjacent abstention / VOI meta-gate: ask "does this decision need a model?" before calling one. Code first, then maybe System One; never LLM-as-judge as the reward. It never blocks.

## Gate watch (adjacent)

[jev-align](https://github.com/caiovicentino/jev-align) verifies a plan or response against policy before act (including fabricated verification). Complementary to this sidecar's tool gate, not a merge.

[jev-harness](https://github.com/AntonioCoppe/jev-harness) is a measurement pattern: shadow mode, confidence gates, and evals that assert on the action, not free text — so you can see when a System One gate is being gamed vs calibrated. Contrast with LLM-as-judge as the primary score.

[jev-pref](https://github.com/doeixd/jev-pref) encodes AGENTS.md prefs as a Jev linter. Watch preference-theater: prefs that are not independently enforceable (tests, types, structural detectors) are not a substitute for this gate. [Abide](https://github.com/coldteadotai/abide) is the productized sibling for those same soft instruction files (compile / calibrate / tune / replay / Claude / Codex / OpenCode hooks). Complementary to this reward-hack gate, not a merge.

Watch, not an endorsement: [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) is a distilled memory-relevance student of teacher Jev (LoRA on Qwen2.5-0.5B). Agreement with teacher labels is not independent gold; a student gate can overfit teacher quirks (distill → gate integrity). A local student is a candidate path when cloud Jev is unreachable; the published card fails open on errors. Soft judgments stay fail-open here; a student is not the hard envelope.

[jev-triage](https://github.com/ThyFriendlyFox/jev-triage) is an active-learning filter: high confidence accepts a Jev label; middling queues an expensive teacher; low / near-boundary queues a human. It logs soft labels (full distributions, not argmax). If used as an eval filter: do not distill Jev as teacher of record — its ~68% ceiling compounds errors; real outcome labels remain the training targets. Complements jev-gate-student-b (distill ≠ independent gold).

[is-malicious](https://github.com/luantak/is-malicious) is a complementary codebase covert-behavior scanner (listed on awesome-jev); rh-guard is a coding-agent reward-hack / eval integrity gate.

[pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) is a Pi bash safety gate: code-computed state, then Jev; `commandRules` can hard-block; missing `TYPESAFE_API_KEY` fails closed. Contrast jevgate: allowlist then Jev on the rest, fail-open (it cannot block). Same structural-first shape, opposite envelope default. Sibling, not this reward-hack sidecar.

[agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai) emits advisory `no_action` semantic receipts. The plugin never changes host routing/executor (or model policy). Missing credentials, SDK, or service failures stay no-action — hard fail-open evidence for soft sidecars.

[jevscan](https://github.com/alexykn/jevscan) composes tree-sitter extract (hard envelope; no execute) with independent Jev questions (soft judgment). Same layering as structural deny then System One here; quality scanner, not a reward-hack gate.

[jev-testbench](https://github.com/ufx7/jev-testbench) collab harness measures `llm_autonomous` vs `scripted_plus_jev` vs `llm_plus_jev` (Wilson intervals, McNemar; Jev is not a peer arm). Do not claim collab helps without arms.

[semantic-firewall](https://github.com/CeamKrier/semantic-firewall) is a PoC split: LLM = proposal engine; Jev = semantic control plane (5 noul: `goalAlignment`, `authorization`, `sideEffect`, `untrustedInstruction`, `evidenceSufficient`); code = authority (`ALLOW` / `ASK_USER` / `REVISE` / `BLOCK`). Deterministic policy thresholds; eval corpus + stability + LLM-as-policy baseline. `untrustedInstruction` is skip-when-absent (code skips it when there is no untrusted content). Contrast this sidecar: fail-open soft Jev overlay; the hard envelope stays structural. Soft-semantic + code authority is not a substitute for structural deny.

[claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) is an additive Claude Code `PreToolUse` permission gate via OpenRouter `typesafe/jev-1.13` (measured 230.8ms p50 / 263.9ms mean on their 18-case fixture). Low-confidence → ask; network fail → human. Anthropic's auto-mode classifier is not replaceable via a supported API — measurable extra gate, not a drop-in for that classifier. Latency/cost vs LLM-as-judge is the useful framing; do not claim the agent is 93% faster.

[jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena) is a small real browser-agent safety eval: Jev vs a mini-model baseline on benign + injected local Playwright pages. Fixture, not production proof; they do not ship sample benchmark numbers. Eval-integrity / gaming surface: independent cases, not self-reported safety.

[jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is a model+effort router (read-only MCP). Adjacent routing surface, not a safety gate and not a rh-guard peer.

[gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is local GLiNER2.5 (`fastino/gliner2.5-base-v1`) Claude context compaction, not a prose summarizer and not reward-hack detection. Extractive character-offset spans; Choice `keep_full` / `keep_evidence` / `keep_call_only` / `drop`. Uncertain or invalid evidence fail-closed to `keep_full`. Hard shell/mutation policy overrides the soft model. Public default `shadowMode` true (analyze + log, no history replace until explicitly false). Sibling envelope next to jevgate (opposite default: fail-closed retention vs fail-open rest). Encoder family with GLiGuard; different job.

[latch](https://github.com/CaseReed/latch) is a CI merge-gate: code clusters failures by signature; Jev labels each cause; code owns `Gate: PASS` (infra) vs `Gate: BLOCK` (real). `ignore_as_infra` requires `env_cascade` plus an explicit network fingerprint; Jev cannot ignore on its own. `--gate` exits 1 on a real failure; the reporter never fails Playwright. Eval-integrity / flaky-test gaming: treating a real failure as noise is the pattern this counters. Cousin, not this sidecar.

[clear-head](https://github.com/VladyslavHontar/clear-head) is a Claude Stop hook: factual claims vs session evidence (`CONTRADICTED` / `UNSUPPORTED`). Blocks on contradiction or unsupported with no relevant evidence. Low `JEV_FIRM` logs but never blocks. Anti-done-without-reading / reward-hack cousin. Not a merge.

[jev-marshal](https://github.com/LightningK0ala/jev-marshal) is named as repository rules for pull requests, enforced by Jev. Empty public tree at capture; watch, not an endorsement.

[if-ai](https://github.com/Victor-Casado/if-ai) is a GitHub Action for plain-English PR condition checks (Jev Choice + required `min-confidence`). False, low-confidence, timeout, or API error fail the check; making it a merge block is a required-check choice. Cousin, not this sidecar.

[wakegate](https://github.com/shitianfang/wakegate) is a fail-open wake gate: skip a wakeup only when Jev answers and puts less than 0.2 on wake; error, no key, unsure, skip-limit, and user-message all wake. Contrast pi-jev-approver fail-closed. Not a reward-hack detector.

[omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) is an oh-my-pi plugin: TypeSafe Jev classifies gated tool calls as `safe` / `ask` / `unsafe`; low confidence → ask; classifier failure defers to omp's own approval (fail-open). Sibling to the Pi `pi-jev-auto-mode` gate. Do not merge into `examples/pi-extension.ts`.

[omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) is an Oh My Pi / pi-coding-agent host adapter: `jev_acceptance_gate` (acceptance gating before declaring done) and `jev_route` (subagent topology / model tier). Fail-open, never fail-catch: missing key, timeout, non-2xx, or malformed answer allows the action and logs confidence 0. Out-of-set choices are discarded, not type-asserted into a lie. Gate-host adapter cousin of omp-auto-mode. Do not merge into `examples/pi-extension.ts`.

[omp-greenlight](https://github.com/SemetricLabs/omp-greenlight) is a measured OMP approval-gate (1,013 real tool calls; 140-row labelled corpus). Presets trade prompt-removal vs unsafe auto-approve: default **0/94** unsafe (conservative 0, permissive 1, aggressive 7). The operator owns the risk dial; the plugin never tunes its own threshold (a self-adjusting safety bar cannot be audited by the person accepting the risk). Graded allow, not hard deny — composes with omp-jev-extensions fail-open. Permission ≠ probability: `allow` above the bar suppresses the prompt; everything else still asks a human. Sits beside the host's deny rules, never above them. Not a sandbox. Cousin, not this sidecar.

[construct-auto-classifier](https://github.com/godspede/construct-auto-classifier) is an effect-based shell PreToolUse gate for OpenCode and Google Antigravity (`agy`). Structural fast-deny / fast-allow first; then Jev Choice plus nine independent risk Nouls (`data_loss`, `secrets`, `remote_code`, `security_control`, `offensive`, `shared_state`, `git_plumbing`, `system_state`, `connections`). Allow only if the choice is `allow` at `jev.minConfidence` (0.6) or higher and every risk is below `jev.riskThreshold` (0.7). A missing answer, a low-confidence answer, a high risk, or a failed call are all denies. The bar is **0 dangerous** commands allowed. Certification (18–19 Sep 2026): main 113 + blind 82, five passes, 975 decisions per model; Jev 0 dangerous allowed / 100% caught / 99.5% correct; chat LLMs all leaked (16–104 dangerous allowed). The blind set was written by Qwen3.5 397B from a plain-English policy, never used for tuning, and frozen before any model ran ([certification report](https://famelos.com/jev/auto-classifier-certification/)). Operator owns minConfidence/riskThreshold — same dial as omp-greenlight (never self-tuning). Privilege Is Not a Verdict: `sudo` changes blast radius, not whether the command is benign. Pair with [dinostomp](https://github.com/collapseindex/dinostomp) before hard-gating on those scores. Two gates cannot share one prompt. OpenCode/agy adapters are not this pack; do not merge into `examples/`. Cousin, not this sidecar. Hunch: keyword privilege filters are reward-hackable (`sudo` ≠ dangerous); effect semantics resist surface gaming.

[toolgate](https://github.com/fdemir/toolgate) is a pre-execution tool-call gate: `allow` / `block` / `review` before the executor runs. Guard error or timeout stops the call (fail-safe), distinct from a model decision. Distinct from [ndolinschi/toolgate](https://github.com/ndolinschi/toolgate) (awesomejev demo: allow / ask_human / deny). AI SDK + LangGraph adapters. Eval CLI is `given → expected → actual`; only `given` reaches Jev; labels stay local; the CLI never executes scenario tools. Jev is a probabilistic check, not an authorization system. Cousin, not this sidecar.

[jev-reviewer](https://github.com/egma-ai/jev-reviewer) is a local PR overlay: Jev assigns P0/P1/P2 attention priorities (P0 expanded; P1/P2 collapsed). Attention is not a correctness verdict; never equate P0 with "blocked as unsafe". Policy: P0 is attention, not a bug claim; P2 is never proof of correctness; uncertain/incomplete never lands on P2. `alwaysReviewPaths` is a deterministic P0 override (structural attention, not a deny). Anti-soundness-theater / soft-judgment UX for gates. Cousin, not this sidecar.

[safe-sh](https://github.com/EpicEric/safe-sh) is static shell analysis with Jev: tree-sitter bash chunks, then Scores; high score plus `--error-on` confidence exits 1; the wrapper never executes the script. Contrast [toolgate](https://github.com/fdemir/toolgate): fail-safe pre-exec `allow` / `block` / `review` (error/timeout stops the call). Same extract-then-Jev layering as jevscan. Gate-adjacent; not a reward-hack detector.

[interlock](https://github.com/somoore/interlock) is a capability kernel for untrusted agents. Jev (or a bundled System One stand-in) is a sensor; policy in ordinary code decides `allow` / `ask` / `block`. Deterministic detectors first (C2, reverse shell, canaries, paths). Placeholders and canaries only: secrets never enter the agent; any canary use is a catch. The action space is closed, so the kernel cannot emit an unlisted string. Explicit critique of post-hoc "is this dangerous?" firewalls that score a tool call after the LLM already decided, with real secrets still in scope. 38-case regression suite (attacks, benign, hard negatives); not a blind paper — wire Jev and run held-out attacks before trusting a number. Positive pattern: hard envelope owns safety. Anti-pattern: soundness theater / soft judgment hard-gated as safety. Cousin, not this sidecar.

[port-cleanup](https://github.com/epiphany-dynamics/port-cleanup) is a gate UX exemplar for irreversible actions: Jev recommends Stop / Keep / Your decision from local evidence; the human confirms the exact list; shields (executable + project + port set) override Jev; identity re-check before SIGTERM (UID/path/start-identity/cwd/shield/endpoints, and again immediately before signalling). Displayed explanations are app-owned text mapped from typed responses, not raw model prose. Kill recs need confidence ≥ 0.8 and supported provenance; otherwise "Your decision". Never auto-kills. TOCTOU cousin: no atomic pidfd-style checked kill. Cousin, not this sidecar.

[jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane) is a typed control plane around a probabilistic agent: closed ontology, then deterministic rules, then allow-listed tools; DSPy drafts wording only after route and action are fixed. Fraud/security (intent or lexical signals) force `SECURITY_ESCALATE` even when the classifier predicts a routine intent. The LLM cannot add a route, change the selected action, or invoke an unapproved tool. Same shape as structural-first here. Cousin, not this sidecar.

[jev-arena](https://github.com/meetr1912/jev-arena) is a calibration arena for native Jev probabilities (noul/choice/score; Brier, log loss, ECE). A live `jev-1.13.0` run is systematically overconfident in the low bins (near-perfect in the high bins). Do not treat native probabilities as truth without Harbor-style measurement. Not a reward-hack ROC for this sidecar.

[slo-router](https://github.com/zeeshan8281/slo-router) is an OpenAI-compatible proxy that can put Jev 1.13 on the routing hot path, with fail-open to deterministic local features (`lexical_fallback` / `slo_no_jev`) when the key is absent, times out, or returns invalid. A live OpenRouter Decisions run on their bundled fixture (19 Sep 2026, [live-jev-analysis](https://github.com/zeeshan8281/slo-router/blob/main/results/live-jev-analysis.md)): SLO no-Jev p95 **77.93 ms** vs SLO+Jev **490.38 ms** (~6.3×); same routes and accuracy. Their engineering conclusion: keep Jev off the synchronous path for this workload unless a larger real-model dataset justifies the tail. An exactness signal raises the quality floor; it never overrides context or capability checks. If no backend is feasible, the API returns 503 with per-backend reasons instead of silently violating the contract. Adjacent routing/latency cousin, not a rh-guard peer. Hunch: hard-gating latency-sensitive control on a decision model without a measured fallback is itself a reliability/eval failure mode — agents will learn to skip or stub the gate. Controllers must keep capability/context checks non-overridable by exactness signals.

[cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode) is a Command Code auto-permission plugin: host permission check first, then `beforeToolCall` screens every selected tool. Independent Jev questions; policy `decide` in code (`allow` / `deny` / `escalate`). `within_scope ≤ 0.25` is out of scope (deny). Escalation always goes to a human, never back to the model. Default `auto-fail-closed` true (unreachable screener blocks). Prefilter is tiny (bare read-only commands). Jev is a sensor; policy in code owns the verdict. Do not merge into `examples/`. Cousin of omp-auto-mode, not this sidecar.

[firehose-judge](https://github.com/ragelink/firehose-judge) is typed Jev on the Bluesky firehose, held in a Cloudflare Durable Object. Eight questions per sampled post; anything the model would not commit to slides into a "needs a human" lane. `nsfw` is dropped server-side (never a displayed judgment). Review thresholds live in `src/jev.ts` (scores get a lower bar than choices). Uncertain → human, not a hard-gated soft veto. Cousin, not this sidecar.

[jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade) is decide → policy → LLM leftover: one backend answers typed questions; ordinary Python policy routes `auto` / `review` / `llm`; a generative model drafts only leftover text. A Noul at 0.5 means "cannot tell", not "somewhat" — never rounded. A Score with confidence 0.0 is a flat distribution — never acted on. `injection_suspected` always force-review, even with an LLM configured. Contrast soundness theater (soft judgment hard-gated as safety): this is an actual force-review lane. Cousin, not this sidecar.

[waymode](https://github.com/mossburgh/waymode) matured: the host keeps permissions, validation, and handlers; Jev decides over typed actions on the live UI; evals keep retained evidence. Waymode validates the decision and live action handle; it does not grant access. Jev confidence grants no permission. Sensor ≠ verdict. Bounded development evidence, not a claim that every app becomes self-driving. Cousin, not this sidecar.

[skill-broker](https://github.com/adamjralph/skill-broker) is a Hermes skill-intervention outline (project-definition stage). Deterministic code owns authority, limits, and routing; Jev judges relevance only and never grants access. Candidates are inputs to judgment, not grants. Router failure must never broaden access. Anti-pattern: letting System One confidence expand the allowed skill set. Same permission boundary as waymode (skill-routing as soft label, not a capability grant). Cousin, not this sidecar.

[jev-lens](https://github.com/rashedInt32/jev-lens) is an advisory Claude Code Stop hook that answers "do I need to look?": it never blocks Claude, never edits files, and never says green unless it is sure (`JEV_LENS_GREEN` 0.9). Shadow mode first. Attention / VOI, not authority — when you need a gate, keep this separate from skill-broker (relevance never grants access) and construct-auto-classifier (effect-based allow/deny). Cousin of [jev-reviewer](https://github.com/egma-ai/jev-reviewer) (attention ≠ correctness) and [typesafe-jev-tools](https://github.com/wotai-dev/typesafe-jev-tools) (abstention/VOI that never blocks). Not a merge. Hunch: collapsing attention/VOI and authority invites gaming the green light.

[system-one-benchmark](https://github.com/mallahyari/system-one-benchmark) is a 50-sample LMSYS toxic-chat safety eval: Jev (`jev-1.13.0`) precision 90.9% (1 FP) vs local open PCD flooding FPs (16 of 50 at 36.0% precision). Jev Brier 0.1096 vs PCD 0.3884 (uncalibrated). Calibration is the eval-integrity angle; do not treat uncalibrated open PCD as a safety gate. Bounded fixture, not a rh-guard ROC and not a shipped claim.

[dinostomp](https://github.com/collapseindex/dinostomp) is a local-first eval-instrument audit: data defects, misleading scorers, run records, and unsupported claims, before you trust the score. Pointer when people hard-gate on Jev scores inside reward/eval loops: check the instrument first. Harbor/jevals-adjacent (independent evidence, not self-reported labels). Not a rh-guard peer and not a substitute for this sidecar's structural deny.

[jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval) is a pre-registered independent Jev-vs-baselines eval. Three same-day errata rounds after external review found overstated results (calibration language, mixed samples, missing cross-fit accuracies, and a threshold-margin sensitivity that flips the sign of the headline cascade result). Both experiments returned AMBIGUOUS. Harbor/jevals lesson: independent review; do not promote first-publish numbers to labels; do not cite the withdrawn framing. Not a rh-guard peer and not a ROC for this sidecar.

[jev-carryforward](https://github.com/Dharundp6/jev-carryforward) is a verbatim fact ledger scored for relevance: `record` saves the original words; `recall` ranks them; nothing summarised, nothing deleted. Constraints and corrections always return in full (Jev never votes on a rule). No key / scorer down → whole list (fail-open). Claim/evidence cousin to clear-head and to gliner25-compaction extractive spans (anti-summarization that erases evidence). Not a reward-hack detector.

[databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab) publishes a measured negative result: no quality-equivalent, end-to-end Jev PDF payoff demonstrated. Typed output is not truth; missing evidence must remain unknown. Anti-soundness-theater / honest eval culture. Cousin, not this sidecar.

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

[jevgate](https://github.com/thevibeworks/jevgate) is an allowlist that proves what may run; Jev judges only the rest. Hard envelope owns safety; soft judgment is never the sole veto (fail-open: it cannot block). Complementary to this sidecar's structural deny + Jev overlay. [JevLint](https://github.com/huntedman/JevLint)
is semantic convention Noul lint in a write → check → fix loop (quality,
not gaming). [GLiGuard](https://github.com/fastino-ai/GLiGuard) is an
encoder-based LLM prompt/response safety guard; rh-guard is a coding-agent
reward-hack / eval integrity gate.

[Abide](https://github.com/coldteadotai/abide) enforces soft project
instructions (AGENTS.md / CLAUDE.md) via Jev on diffs — not reward hacking.
Shared patterns: multi-host hooks, fail-open (no key/network → edit
proceeds), banded confidence (repair / note / silence), and soft judgment
never the sole hard veto. Its `replay` plus independent review (flagged
edits/turns confirmed or not; flags are not labels) is Harbor/jevals-adjacent
measurement discipline, not a claim that Abide measures reward hacking.
