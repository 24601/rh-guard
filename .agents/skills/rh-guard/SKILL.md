---
name: rh-guard
description: >
  Use when designing or evaluating coding-agent evals for reward-hacking, interpreting
  Reward Hack Guard / RH Guard (`rh-guard`) denials, choosing structural vs Jev gates, or relating that
  live hazard gate to Augustus decision-design. Do not use to run or debug the Next.js
  sidecar (npm run dev, /api/hooks/*).
metadata:
  version: 0.1.0
  companion: "https://github.com/24601/Augustus"
  sidecar: "https://github.com/24601/rh-guard"
---

# rh-guard

Reward Hack Guard (`rh-guard`, RH Guard) is a **live hazard gate** on coding-agent tools
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
[JevLint](https://github.com/huntedman/JevLint) is semantic convention lint
(plain-English plugins, file-level Nouls) in a write → check → fix loop—
quality, not gaming.

[jevgate](https://github.com/thevibeworks/jevgate) is a sibling Bash gate: an
allowlist proves what may run; writers, wrappers, and credential-shaped
input are refused in code and never sent to the model; Jev judges only
unlisted verbs; it cannot block (unsure → the agent's own permission
prompt). Hard envelope owns safety; soft judgment is never the sole veto.
Same shape as structural deny + System One sidecar here. Different
job (permission prompts vs reward-hack denials). Do not merge them.

[GLiGuard](https://github.com/fastino-ai/GLiGuard) is an encoder-based LLM
prompt/response safety guard; rh-guard is a coding-agent reward-hack / eval
integrity gate (complementary, not a competitor).

[Abide](https://github.com/coldteadotai/abide) is a sibling product: soft
project-instruction enforcement via Jev on diffs (AGENTS.md / CLAUDE.md).
rh-guard is eval-integrity / reward-hacking. Same multi-host hook surface
(Claude / Codex / OpenCode), fail-open, banded confidence; soft judgment
is never the sole hard veto (same envelope as jevgate). Do not merge them.
Abide does not catch reward hacking.

## Eval integrity & measurement

[Harbor](https://github.com/harbor-framework/harbor) is the preferred e2e
substrate for reward-hack / eval-gaming scenarios: **taskset (score first)
+ harness + runtime**, an independent validator, and a
[HoH](https://arxiv.org/abs/2609.01481) evidence loop. These hooks are
structural / System One gates *inside* a harness — they do not replace a scored taskset.

[jevals](https://github.com/dayhaysoos/jevals) is the complementary
decision-stage workbench for typed Noul / Choice / Score falsification when
the sidecar or a policy uses Jev-class judgments. Practices: independent answer keys
(never promote predictions to labels); correctness ≠
confidence; held-out discipline; compare only equivalent case sets.

[openevals](https://github.com/memovai/openevals) is adjacent online eval / observability: cheap parallel System One as a trace judge (code graders first), not LLM-as-judge as the primary score.

[jev-align](https://github.com/caiovicentino/jev-align) verifies a plan or response against policy before act (including fabricated verification). Complementary to these tool gates, not a merge.

[wellposed](https://github.com/suraj-phanindra/wellposed) lints Choice / Score / Noul requests before runtime: a Choice with no "other" can be forced wrong at confidence 1.0. Confidence gating cannot catch a forced wrong Choice — inspect request shape first.

[pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) is a Pi bash safety gate (code state then Jev; `commandRules` can hard-block; no key → fail-closed). Contrast jevgate allowlist + fail-open rest. [agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai) is advisory `no_action` receipts; the plugin never changes host routing/executor (hard fail-open evidence for soft sidecars). [jevscan](https://github.com/alexykn/jevscan) composes tree-sitter extract with Jev questions (hard envelope vs soft judgment). Measure collab with [jev-testbench](https://github.com/ufx7/jev-testbench) arms (`llm_autonomous` vs `scripted_plus_jev` vs `llm_plus_jev`); do not claim collab helps without arms.

[semantic-firewall](https://github.com/CeamKrier/semantic-firewall) is LLM-proposes / Jev 5-noul control plane / code `ALLOW`/`ASK_USER`/`REVISE`/`BLOCK` (`untrustedInstruction` skip-when-absent). Contrast: fail-open soft Jev overlay here; the hard envelope stays structural. [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) is an additive Claude `PreToolUse` permission gate via OpenRouter `typesafe/jev-1.13` (230.8ms p50 / 263.9ms mean); low-confidence and network fail → human. [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena) is a small browser-agent Jev-vs-baseline eval on benign + injected pages. [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is adjacent model+effort routing, not a rh-guard peer.

[gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is local GLiNER2.5 (`fastino/gliner2.5-base-v1`) Claude context compaction: extractive character-offset spans, not generated summaries; Choice `keep_full`/`keep_evidence`/`keep_call_only`/`drop`; uncertain/invalid → fail-closed `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Not reward-hack detection. Sibling envelope next to jevgate (fail-closed retention vs fail-open rest).

[jev-compactor](https://github.com/edwardyen724-g/jev-compactor) is framework-agnostic verbatim compaction plus safety gating: **Jev judges relevance. Code decides structure.** Destructive commands and thrashing loops are caught in the same pass; a regex floor in code flags `rm -rf` / `DROP TABLE` / `curl | sh` whatever Jev later says. Companion to the slo-router lesson: keep a deterministic floor under Jev. Not a rh-guard peer.

[latch](https://github.com/CaseReed/latch) is a CI merge-gate: code clusters failures, Jev labels each cause, code owns `Gate: PASS` (infra) vs `Gate: BLOCK` (real). `ignore_as_infra` requires an explicit network fingerprint; Jev cannot ignore on its own. Eval-integrity cousin — treating real failures as noise is the gaming angle it counters. [clear-head](https://github.com/VladyslavHontar/clear-head) is a Claude Stop hook that checks claims against session evidence (`CONTRADICTED` / `UNSUPPORTED`); anti-done-without-reading.

[jev-marshal](https://github.com/LightningK0ala/jev-marshal) is named PR policy rules enforced by Jev (empty public tree at capture). [if-ai](https://github.com/Victor-Casado/if-ai) is plain-English PR condition checks (Jev Choice + min-confidence; Action fails on false/low-confidence/error; required-check is optional). [wakegate](https://github.com/shitianfang/wakegate) is a fail-open wake gate (skip only when Jev answers and p < 0.2; error/no-key/unsure wake). Contrast pi-jev-approver fail-closed. [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) is an oh-my-pi `safe`/`ask`/`unsafe` classifier; classifier failure defers to omp approval (fail-open). Cousins, not runtime deps.

[toolgate](https://github.com/fdemir/toolgate) is a pre-execution tool-call gate (`allow` / `block` / `review`); guard error or timeout stops the call (fail-safe). Distinct from [ndolinschi/toolgate](https://github.com/ndolinschi/toolgate). AI SDK + LangGraph adapters and a `given → expected → actual` eval CLI (only `given` reaches Jev). Cousin, not this sidecar.

[jev-reviewer](https://github.com/egma-ai/jev-reviewer) is a local PR overlay: Jev assigns P0/P1/P2 attention priorities (P0 expanded; P1/P2 collapsed). Attention is not a correctness verdict; never equate P0 with "blocked as unsafe". Anti-soundness-theater / soft-judgment UX for gates.

[safe-sh](https://github.com/EpicEric/safe-sh) is static shell analysis with Jev (tree-sitter bash chunks; never executes). Contrast [toolgate](https://github.com/fdemir/toolgate) fail-safe pre-exec. Gate-adjacent; not a reward-hack detector.

[interlock](https://github.com/somoore/interlock) is a capability kernel for untrusted agents: Jev is a sensor; policy in code decides `allow` / `ask` / `block`. Canaries + closed action space; secrets never enter the agent. Critique of post-hoc "is this dangerous?" firewalls with real secrets still in scope. 38-case regression suite (not a blind paper). Positive pattern: hard envelope first. Anti-pattern: soundness theater / soft judgment hard-gated as safety.

[port-cleanup](https://github.com/epiphany-dynamics/port-cleanup) is a gate UX exemplar: evidence-backed, human-confirmed irreversible actions; shields override Jev; identity re-check before SIGTERM; app-owned explanation text, not model prose. Never auto-kills.

[jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane) routes into a closed ontology; fraud/security force a human path even when the classifier predicts routine. After the control plane fixes the action, the LLM cannot add routes or tools.

[jev-arena](https://github.com/meetr1912/jev-arena) measures native Jev probabilities (Brier/ECE). A live run is overconfident in the low bins. Do not treat native probabilities as truth without Harbor-style measurement. Not a reward-hack ROC.

[jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas) is a jagged hold-vs-break map of Jev with real API receipts. **type-safe ≠ correct**: a typed answer space cannot go off-menu, but that is not a correctness guarantee (DAIR Emotion: mean confidence 0.819 vs 48% accuracy). Holds when the answer is in `state`; breaks — often confidently — when it needs unsupplied knowledge. Receipts first. Eval-integrity cousin, not a rh-guard peer.

[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration) measures OOD ECE against its noise floor. In-domain benches look calibrated; on an unknowable org-rule label, accuracy 44.7% with mean stated probability 0.74 (ECE 4.4× the noise floor). **AUC ≠ ECE** — ranking is not calibration; pairs with [does-jev-confidence-mean-anything](https://github.com/Adilmp/does-jev-confidence-mean-anything). Do not threshold Jev as a probability without a local ECE check.

[how-sure-is-jev](https://github.com/adarc8/how-sure-is-jev) (`jevsure`) maps Jev probabilities to sureness bands CERTAIN / CONFIDENT / LEANING / TORN / CLUELESS. Choice confidence == max_prob (the most generous metric). Thresholds are opinions, not physics. Good abstention UX; gaming risk if agents optimize the sureness metric rather than task truth. Pair with jev-ood-calibration / ECE noise floor (contrast only). Cousin, not this sidecar.

[slo-router](https://github.com/zeeshan8281/slo-router) puts Jev 1.13 semantic features on an OpenAI-compatible routing hot path, with fail-open to deterministic local features. A live OpenRouter run preserved the same routes and accuracy as `slo_no_jev` but raised p95 from 77.93 ms to 490.38 ms (~6.3×). An exactness signal raises the quality floor; it never overrides context or capability checks. Infeasible routing returns 503 instead of a silent contract violation. Not a rh-guard peer. Hunch: hard-gating latency-sensitive control on a decision model without a measured fallback is itself a reliability/eval failure mode — agents will learn to skip or stub the gate.

[cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode) is a Command Code auto-permission gate: Jev screens every tool call at `beforeToolCall` (after the host permission check); policy `decide` in code (`allow` / `deny` / `escalate`). `within_scope ≤ 0.25` is out of scope (deny). Escalation always goes to a human, never back to the model. Default `auto-fail-closed` true. Tiny read-only prefilter. Do not merge into `examples/`. Cousin of omp-auto-mode, not this sidecar.

[omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) is an Oh My Pi / pi-coding-agent adapter: `jev_acceptance_gate` before declaring done, plus `jev_route` subagent topology. Fail-open, never fail-catch (unavailable Jev allows the action at confidence 0). Gate-host adapter cousin of omp-auto-mode. Do not merge into `examples/pi-extension.ts`.

[omp-greenlight](https://github.com/SemetricLabs/omp-greenlight) is a measured OMP approval-gate: presets trade prompt-removal vs unsafe auto-approve (default 0/94 unsafe). The operator owns the risk dial; the plugin never tunes its own threshold. Graded allow, not hard deny — composes with omp-jev-extensions fail-open. Permission ≠ probability. Cousin, not this sidecar.

[construct-auto-classifier](https://github.com/godspede/construct-auto-classifier) is an effect-based OpenCode / Antigravity (`agy`) shell PreToolUse gate: structural fast-deny/fast-allow first, then Jev Choice plus nine independent risk Nouls (`data_loss`, `secrets`, `remote_code`, …). Allow only if the choice is `allow` at `jev.minConfidence` (0.6) and every risk is below `jev.riskThreshold` (0.7). Missing, low-confidence, high-risk, or a failed call all deny. Certified **0 dangerous** commands allowed for Jev (main 113 + blind 82, five passes, 975 decisions); chat LLMs all leaked. Operator owns minConfidence/riskThreshold (same dial as omp-greenlight). Privilege Is Not a Verdict (`sudo` is blast radius, not a deny). Pair with [dinostomp](https://github.com/collapseindex/dinostomp) before hard-gating on those scores. Do not merge into `examples/`. Cousin, not this sidecar. Hunch: keyword privilege filters are reward-hackable (`sudo` ≠ dangerous); effect semantics resist surface gaming.

[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) is runtime authorization for tool calls before side effects: deterministic policy + RBAC + schemas + amount/limit checks own `ALLOW` / `REVIEW` / `BLOCK`. TypeSafe Jev (OpenRouter) supplies semantic evidence (intent match, scope expand, sensitive exposure). **Jev supplies evidence. Code owns authority.** A positive model score never overrides a deterministic security failure. **Schema-valid ≠ intent-matched.** Early public MVP with an explicit [threat model](https://github.com/omkarghugarkar007/actiongate-jev/blob/main/docs/threat-model.md): ActionGate decides; the app owns execution and credentials. Compose with construct-auto-classifier (effect-based shell) and jev-lens (attention≠authority, never blocks). Do not treat Jev ALLOW as a safety proof. Cousin, not this sidecar.

[turnstile](https://github.com/zyphr-labs/turnstile) is an agent action guardrail: deterministic policy + Jev semantic checks + receipts with threshold replay. Same doctrine as actiongate-jev: Jev supplies evidence; code owns `allow` / `review` / `deny`. **Jev never grants authority that policy denied.** Missing goal, disabled Jev, timeout, or invalid response → review. Experimental alpha; Claude observe-mode default; not an OS sandbox. Do not merge `turnstile-hooks.json` into `examples/`. Cousin, not this sidecar.

[jev-labs](https://github.com/copyleftdev/jev-labs) wraps a probabilistic oracle in a formal consensus kernel (TLA+ → AsyncAPI → Rust). Pharmacy-sim golden 1,080 rounds: **wrong=0**; under severe chaos 314 correct / 46 escalated / **0 wrong** (accuracy 0.834–0.903). **Never confidently wrong.** The invariant is escalate-not-guess: the kernel may escalate, and it may never return a confident wrong verdict. A stability gate excludes votes whose margin sits inside the measured noise floor (identity 0.042). Anti-pattern: treating TLA+/model-check theater as proof the soft judge is safe without an exception path. TLC 1,049,750 states / 0 errors proves the protocol, not that the oracle is never wrong. Scope: synthetic pharmacy, not clinical. Limitation: underdetermined records escalated 86/120 and decided 34 split both ways — the stability gate is not an answerability check. Cousin, not this sidecar.

[seal](https://github.com/Reasonofmoon/seal) is an advance gate plus a visible coverage ledger (`auto` | `code` | `human` | `escalate`). No seal, no advance. Effects stay locked while escalations remain open. **Hiding escalations is a product lie.** **schema-valid ≠ semantically correct** (pairs with jev-capability-atlas jaggedness / ActionGate Schema-valid ≠ intent-matched — contrast only). **mint ≠ product brain**. Zero runtime Python deps. Cousin, not this sidecar.

[firehose-judge](https://github.com/ragelink/firehose-judge) puts typed Jev judgment on the Bluesky firehose (Cloudflare Durable Objects). Uncertain answers route to a "needs a human" lane; nsfw is dropped server-side. Jev is a sensor, not a verdict.

[jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade) is decide → policy → LLM leftover: Jev answers typed questions; Python policy routes `auto` / `review` / `llm`. A Noul at 0.5 means "cannot tell" (never rounded); a Score with confidence 0.0 is never acted on; `injection_suspected` always force-review even with an LLM configured. Force-review is a real lane, not soundness theater.

[waymode](https://github.com/mossburgh/waymode) lets an app keep host permissions, validation, and handlers; Jev decides over typed actions on the live UI with retained evidence. Jev confidence grants no permission (sensor ≠ verdict). Cousin, not this sidecar.

[skill-broker](https://github.com/adamjralph/skill-broker) is a Hermes skill-intervention outline: deterministic authority; Jev judges relevance only and never grants access. Jev relevance ≠ authority — the model never grants. Direct sibling to [turnstile](https://github.com/zyphr-labs/turnstile) (evidence ≠ authority). Anti-pattern: letting System One confidence expand the allowed skill set. Same permission boundary as waymode. Cousin, not this sidecar.

[jev-lens](https://github.com/rashedInt32/jev-lens) is an advisory Claude Stop hook that answers "do I need to look?": it never blocks, never edits, and never says green unless it is sure (`JEV_LENS_GREEN` 0.9). Shadow mode first. Attention/VOI, not authority — keep it separate from skill-broker / construct-auto-classifier when you need a gate. Cousin of jev-reviewer; not a merge. Hunch: collapsing attention and authority invites gaming the green light.

[jev-preflight](https://github.com/muse0509/jev-preflight) is a Claude Code Stop-hook: UserPromptSubmit snapshots a private Git baseline; Stop sends a redacted turn diff to Jev on eight risk axes. Assist mode: high risk asks at most one reinspect, then finishes. Fail-open (no key / timeout / invalid / oversized skip evaluation). Default **0.85 threshold is uncalibrated**. Scores direct attention, not proof of defects; not a merge blocker. Pattern: escalate-attention ≠ hard block. Soft gate that can be gamed by ignoring the reinspect. Do not merge into `examples/`. Cousin of jev-lens; not this sidecar.

[jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) is a LoRA distill of Jev memory-relevance onto Qwen2.5-0.5B. Distill agreement is not independent gold; a student is not the hard envelope. Card: `docs/eval-integrity.md`.

[jev-triage](https://github.com/ThyFriendlyFox/jev-triage) routes unlabeled data by calibrated confidence and logs soft labels. If used as an eval filter: do not distill Jev as teacher of record — real outcome labels remain the training targets.

[system-one-benchmark](https://github.com/mallahyari/system-one-benchmark) is a 50-sample LMSYS toxic-chat safety eval: Jev precision 90.9% (1 FP) vs local PCD flooding FPs (16). Calibration is the eval-integrity angle; do not treat uncalibrated open PCD as a safety gate. Bounded fixture, not a rh-guard ROC.

[dinostomp](https://github.com/collapseindex/dinostomp) audits eval instruments (data / scorer / runs / claims) before you trust the score. Pointer when people hard-gate on Jev scores inside reward/eval loops: check the instrument first. Harbor/jevals-adjacent; not a rh-guard peer.

[jev-packs](https://github.com/dtduc-git/jev-packs) is an evidence-gated registry of Jev question packs: a pack is `verified` only when accuracy / ECE / cost / latency are recorded on a pinned Jev version. Every Choice and Score must offer `unknown` (mandatory abstention). Anti-soundness-theater for gate criteria: no numbers, no endorsement.

[ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev) matured: README + `action.yml` + `src/` + committed `dist/`. Jev via Vercel AI Gateway asks four typed questions (`should_review`, `risk`, `route`, `touches_secrets`); configurable thresholds route to `auto-approve` | `human-review` | `block`. Conservative default `risk_threshold_for_review: cosmetic` escalated even trivial diffs Jev called `moderate`. Timeout/Jev-failure still → human-review, never silent auto-approve. Eval-gaming surface: optimizing the four Jev questions / thresholds instead of real review quality. Watch, not an endorsement — do not hard-gate merge on a Jev auto-approve without a deterministic path floor.

[prune-review](https://github.com/shubhangi013/prune-review) is a cost-aware Jev gate before a generative PR reviewer: Jev scores hunks; a deterministic **safety escarpment** always keeps matching hunks whatever Jev says. Jev does not generate review comments. Cost results are not quality claims. Source preview. Cousin of jev-reviewer; not this sidecar.

[jev-intent-review](https://github.com/yottayoshida/jev-intent-review) is under construction (spec only): typed Jev judgments of the post-change repository against originating intent. The diff is a search hint, not the object being verified. Prefer UNKNOWN over a false VERIFIED. Watch, not an endorsement.

[jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval) is a pre-registered Jev-vs-baselines eval with three same-day errata rounds after external review found overstated results (both experiments AMBIGUOUS; headline cascade sign flips at a tighter margin). Harbor/jevals lesson: independent review; do not promote first-publish numbers to labels.

[jev-carryforward](https://github.com/Dharundp6/jev-carryforward) is a verbatim fact ledger scored for relevance (nothing summarised, nothing deleted). Anti-summarization that erases evidence; cousin to extractive compaction and to clear-head claim/evidence checks. No key → whole list (fail-open). Eval suite: with MCP `recall` available, the agent called it **0/4** on a force-push prohibition task — an MCP tool sitting there is not enough. SessionStart/compaction hooks that inject constraints beat voluntary tool use. Anti-pattern: hope the model looks. [databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab) publishes a measured negative result (no quality-equivalent Jev PDF payoff). Anti-soundness-theater.

[Abide](https://github.com/coldteadotai/abide)'s `replay` plus independent
review (flagged edits/turns confirmed or not; flags are not labels) is
Harbor/jevals-adjacent measurement discipline. It measures soft project-rule
catches, not reward hacking.

**Anti-pattern.** Using LLM-as-judge (or gaming jevals labels) as the
reward signal is the failure mode this gate is meant to catch. See
`docs/shape.md` and Baker et al. 2025.

**Siblings, not a merge.** jevals measures decisions; rh-guard gates agent
tool use; Harbor scores product/agent loops.

Harbor, jevals, and openevals are **practices**, not install dependencies. You do not
need them to install the hooks. Card: `docs/eval-integrity.md`.

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
`examples/exo-tool-runtime.ts`. The gate is deny-by-default with a read-only
exemption, so `shell`, `manage_tool`, `rebuild_and_restart_exo`,
`rewind_sandbox`, adapter enable/disable, and agent-created tools are all
scored; Exo ships no `bash` / `write` / `edit`. Optional `.exo/agent-tools/`
gate: `examples/exo-agent-tools-gate.ts`. Generic stdin (`hooks/run.ts generic` /
`exo`) stays usable if Exo later adds hooks.

DeepSeek Harness runs the unmodified Claude and Codex command hooks at
`tools/pre-execute`. Both adapters treat that as `PreToolUse` and exit 2 on a
deny so the bridge fails closed.

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
   `AGENT_DENY`, including on the 8s scoring timeout); the host itself has no
   `failClosed` flag. A killed wrapper is
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
   (TOCTOU: check-then-act is not atomic). Same shape as
   [jevgate](https://github.com/thevibeworks/jevgate) (allowlist proves what
   may run; Jev judges only the rest)—sibling, not a merge. See
   `references/gates.md`.
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
  `docs/hosts.md`, `docs/install-plugin.md`, `docs/shape.md`,
  `docs/eval-integrity.md`)
- Broader System One placement: [Augustus](https://github.com/24601/Augustus)
- Semantic convention lint (quality vs gaming): [JevLint](https://github.com/huntedman/JevLint)
- Shell allowlist, then Jev on the rest: [jevgate](https://github.com/thevibeworks/jevgate)
- Encoder LLM prompt/response safety (complementary): [GLiGuard](https://github.com/fastino-ai/GLiGuard)
- Extractive Claude context compaction (fail-closed `keep_full`; not reward-hack): [gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction)
- Verbatim compaction + safety gating (regex floor under Jev): [jev-compactor](https://github.com/edwardyen724-g/jev-compactor)
- Decision-stage Jev workbench: [jevals](https://github.com/dayhaysoos/jevals)
- E2e agent eval substrate: [Harbor](https://github.com/harbor-framework/harbor)
- Online eval / observability (cheap parallel System One, not primary score): [openevals](https://github.com/memovai/openevals)
- Verify plan/response vs policy before act: [jev-align](https://github.com/caiovicentino/jev-align)
- Shadow / confidence action evals for a System One gate: [jev-harness](https://github.com/AntonioCoppe/jev-harness)
- Request-shape lint (forced wrong Choice at confidence 1.0): [wellposed](https://github.com/suraj-phanindra/wellposed)
- Soft project-instruction Jev on diffs (not reward hacking): [Abide](https://github.com/coldteadotai/abide)
- Pi bash safety gate (code state then Jev; can hard-block / fail-closed): [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver)
- Advisory `no_action` receipts (plugin never changes host routing/executor): [agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai)
- tree-sitter extract then Jev questions: [jevscan](https://github.com/alexykn/jevscan)
- Collab arms (`llm_autonomous` vs `scripted_plus_jev` vs `llm_plus_jev`): [jev-testbench](https://github.com/ufx7/jev-testbench)
- LLM-proposes / Jev-noul / code authority PoC: [semantic-firewall](https://github.com/CeamKrier/semantic-firewall)
- Additive Claude PreToolUse permission gate (OpenRouter Jev): [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev)
- Browser-agent Jev-vs-baseline eval (benign + injected): [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena)
- Model+effort router (not a safety gate): [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router)
- CI merge-gate (infra `Gate: PASS` vs real `Gate: BLOCK`): [latch](https://github.com/CaseReed/latch)
- Stop-hook claims vs session evidence (`CONTRADICTED` / `UNSUPPORTED`): [clear-head](https://github.com/VladyslavHontar/clear-head)
- PR policy rules enforced by Jev (watch): [jev-marshal](https://github.com/LightningK0ala/jev-marshal)
- Fail-open wake gate (skip only if Jev answers and p < 0.2): [wakegate](https://github.com/shitianfang/wakegate)
- Plain-English PR condition checks: [if-ai](https://github.com/Victor-Casado/if-ai)
- oh-my-pi `safe`/`ask`/`unsafe` classifier: [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode)
- OMP/pi acceptance gating + subagent routing (fail-open): [omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions)
- Measured OMP approval-gate (graded allow; default 0/94 unsafe; operator owns the risk dial): [omp-greenlight](https://github.com/SemetricLabs/omp-greenlight)
- Effect-based OpenCode/agy shell gate (Privilege Is Not a Verdict; 0 dangerous allowed for Jev): [construct-auto-classifier](https://github.com/godspede/construct-auto-classifier)
- Runtime tool authorization (Jev supplies evidence. Code owns authority; Schema-valid ≠ intent-matched): [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev)
- Agent action guardrail (Jev never grants authority that policy denied; threshold replay): [turnstile](https://github.com/zyphr-labs/turnstile)
- Formal consensus around a probabilistic oracle (Never confidently wrong; escalate-not-guess): [jev-labs](https://github.com/copyleftdev/jev-labs)
- Advance gate + coverage ledger (Hiding escalations is a product lie; mint ≠ product brain): [seal](https://github.com/Reasonofmoon/seal)
- Pre-execution tool-call gate (`allow` / `block` / `review`; fail-safe): [toolgate](https://github.com/fdemir/toolgate)
- Attention-priority PR overlay (P0 expand; never "blocked as unsafe"): [jev-reviewer](https://github.com/egma-ai/jev-reviewer)
- Static shell analysis with Jev (never executes): [safe-sh](https://github.com/EpicEric/safe-sh)
- Capability kernel (Jev sensor; policy in code; canaries; secrets never enter the agent): [interlock](https://github.com/somoore/interlock)
- Gate UX (human-confirmed irreversible stop; shields; app-owned copy): [port-cleanup](https://github.com/epiphany-dynamics/port-cleanup)
- Fraud/security force human path; LLM cannot add routes/tools after the plane: [jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane)
- Native-probability calibration (overconfident in low bins): [jev-arena](https://github.com/meetr1912/jev-arena)
- Jagged hold-vs-break map (type-safe ≠ correct; receipts first): [jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas)
- OOD ECE / noise floor (AUC ≠ ECE): [jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration)
- Sureness bands from probs (CERTAIN…CLUELESS; gaming the sureness metric ≠ task truth): [how-sure-is-jev](https://github.com/adarc8/how-sure-is-jev)
- Routing hot path (77.93→490.38 ms p95; exactness never overrides context/capability): [slo-router](https://github.com/zeeshan8281/slo-router)
- Command Code auto-permission (`beforeToolCall`; out of scope deny; escalate to a human): [cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode)
- Firehose typed judgment (uncertain → "needs a human"): [firehose-judge](https://github.com/ragelink/firehose-judge)
- decide → policy → LLM leftover (`injection_suspected` force-review): [jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade)
- Host permissions + typed actions + retained evidence; Jev confidence grants no permission: [waymode](https://github.com/mossburgh/waymode)
- Skill-routing as soft label, never grants access; Jev relevance ≠ authority (sibling to turnstile): [skill-broker](https://github.com/adamjralph/skill-broker)
- Advisory Stop hook (never blocks; never says green unless sure): [jev-lens](https://github.com/rashedInt32/jev-lens)
- Claude Stop-hook (eight risk axes; one reinspect; 0.85 threshold is uncalibrated; escalate-attention ≠ hard block): [jev-preflight](https://github.com/muse0509/jev-preflight)
- LoRA distill of Jev memory-relevance (student is not the hard envelope): [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b)
- Soft-label eval filter (do not distill Jev as teacher of record): [jev-triage](https://github.com/ThyFriendlyFox/jev-triage)
- toxic-chat safety eval (Jev 90.9% precision / 1 FP; do not treat uncalibrated PCD as a safety gate): [system-one-benchmark](https://github.com/mallahyari/system-one-benchmark)
- Eval-instrument audit (check the instrument first): [dinostomp](https://github.com/collapseindex/dinostomp)
- Evidence-gated question packs (mandatory `unknown`; no numbers, no endorsement): [jev-packs](https://github.com/dtduc-git/jev-packs)
- CI PR-triage gate (`should_review` / `risk` / `route` / `touches_secrets`; threshold gaming surface; watch): [ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev)
- Cost-aware Jev gate before generative PR review (safety escarpment): [prune-review](https://github.com/shubhangi013/prune-review)
- PR vs originating intent (diff is a search hint; watch): [jev-intent-review](https://github.com/yottayoshida/jev-intent-review)
- Pre-registered eval + same-day errata (claim vs evidence): [jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval)
- Verbatim fact ledger scored for relevance (0/4 recall; hope the model looks): [jev-carryforward](https://github.com/Dharundp6/jev-carryforward)
- Measured negative result (no quality-equivalent Jev PDF payoff): [databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab)
- Official TypeSafe contracts: [typesafe-ai/skills](https://github.com/typesafe-ai/skills)
