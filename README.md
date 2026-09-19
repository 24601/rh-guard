# Reward Hack Guard

RH Guard (`rh-guard`) sits in coding-agent hooks (Claude Code, Cursor, Codex, Grok Build, Pi, Amp, Prime Agent, DeepSeek Harness) and blocks reward-hacking tool use—tampering with graders, hidden tests, or the eval process—while steering toward checks the agent cannot game. Exo is **support via ToolRuntime wrap**, not drop-in hooks.

<a href="docs/sessions/rh_guard_side_by_side.mp4"><img src="docs/sessions/rh_guard_side_by_side.gif" width="100%" alt="Left: a recorded Exo terminal. Right: rh-guard denying a sed of a protected assertion and allowing a harmless echo."></a>

Left pane is a render of the recorded Exo session; right pane is a facts panel from that same session, not a second CLI (sed denied, assertion unchanged, harmless echo allowed). Click through for the mp4, or see [docs/sessions/demo.md](docs/sessions/demo.md).

[![Claude Code](https://img.shields.io/badge/Claude_Code-marketplace-purple.svg)](.claude-plugin/marketplace.json)
[![Skills.sh](https://img.shields.io/badge/skills.sh-compatible-green.svg)](https://www.skills.sh/)
[![TypeSafe Jev](https://img.shields.io/badge/TypeSafe-Jev_System_One-111111.svg)](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
[![Augustus](https://img.shields.io/badge/companion-Augustus-blue.svg)](https://github.com/24601/Augustus)

This repository is public on GitHub: [24601/rh-guard](https://github.com/24601/rh-guard).

**Companion, not a merge.** [Augustus](https://github.com/24601/Augustus) is design-judgment for where typed System One judgment belongs. This repo is the live hazard gate on agent tools. Keep them separate.

**Sibling, not a merge.** [JevLint](https://github.com/huntedman/JevLint) is semantic convention Noul lint in a write → check → fix loop (quality vs gaming). Not the same product.

**Sibling, not a merge.** [jevgate](https://github.com/thevibeworks/jevgate) is an allowlist that proves what may run; Jev judges only the rest. Hard envelope owns safety; soft judgment is never the sole veto (fail-open: it cannot block). Same complementary pattern as structural deny + System One sidecar. Do not merge the products.

**Complementary, not a competitor.** [GLiGuard](https://github.com/fastino-ai/GLiGuard) is an encoder-based LLM prompt/response safety guard; rh-guard is a coding-agent reward-hack / eval integrity gate.

**Sibling, not a merge.** [Abide](https://github.com/coldteadotai/abide) enforces soft project instructions (AGENTS.md / CLAUDE.md) via Jev on diffs. rh-guard is eval-integrity / reward-hacking on agent tool use. Same hook surface (Claude, Codex, OpenCode), different judgment class. Fail-open, banded confidence, and soft judgment never the sole hard veto — same envelope as jevgate. Do not merge the products; Abide does not catch reward hacking.

## Eval integrity & measurement

[Harbor](https://github.com/harbor-framework/harbor) is the preferred e2e substrate for reward-hack / eval-gaming scenarios: **taskset (score first) + harness + runtime**, an independent validator, and a [HoH](https://arxiv.org/abs/2609.01481) evidence loop. rh-guard hooks are structural / System One gates *inside* a harness — they do not replace a scored taskset.

[jevals](https://github.com/dayhaysoos/jevals) is the complementary decision-stage workbench for typed Noul / Choice / Score falsification when this sidecar or a policy uses Jev-class judgments. Practices: independent answer keys (never promote predictions to labels); correctness ≠ confidence; held-out discipline; compare only equivalent case sets.

[wellposed](https://github.com/suraj-phanindra/wellposed) lints Choice / Score / Noul requests before runtime: a Choice with no "other" can be forced wrong at confidence 1.0, and broken state paths are unanswerable. Confidence gating cannot catch a forced wrong Choice — inspect request shape first.

[openevals](https://github.com/memovai/openevals) is adjacent **online** eval / observability: code graders first, then cheap parallel System One as a per-step/trace judge — not LLM-as-judge as the primary score.

[jev-align](https://github.com/caiovicentino/jev-align) verifies a plan or response against policy before act (including fabricated verification). Complementary to this tool gate, not a merge. Measure a live System One gate with shadow / confidence action evals ([jev-harness](https://github.com/AntonioCoppe/jev-harness)), not LLM-as-judge as the primary score.

[pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) is a Pi bash safety gate: code-computed state, then Jev; `commandRules` can hard-block; no key → fail-closed. Contrast jevgate allowlist + fail-open rest (it cannot block). [agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai) emits advisory `no_action` receipts; the plugin never changes host routing/executor — hard fail-open evidence for soft sidecars. [jevscan](https://github.com/alexykn/jevscan) composes tree-sitter extract (hard envelope; no execute) with Jev questions (soft judgment). Measure collab with [jev-testbench](https://github.com/ufx7/jev-testbench) arms (`llm_autonomous` vs `scripted_plus_jev` vs `llm_plus_jev`); do not claim collab helps without arms.

[semantic-firewall](https://github.com/CeamKrier/semantic-firewall) is LLM-proposes / Jev-5-noul control plane / code `ALLOW`/`ASK_USER`/`REVISE`/`BLOCK` (`untrustedInstruction` skip-when-absent). Contrast: this sidecar keeps a fail-open soft Jev overlay; the hard envelope stays structural. [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) is an additive Claude `PreToolUse` permission gate via OpenRouter `typesafe/jev-1.13` (230.8ms p50 / 263.9ms mean); low-confidence and network fail → human; Anthropic auto-mode is not replaceable via a supported API. [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena) is a small browser-agent Jev-vs-baseline eval on benign + injected pages (fixture, not a shipped claim). [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is adjacent model+effort routing, not a rh-guard peer.

[gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is local GLiNER2.5 (`fastino/gliner2.5-base-v1`) Claude context compaction: extractive character-offset spans, not generated summaries; Choice `keep_full` / `keep_evidence` / `keep_call_only` / `drop`; uncertain or invalid evidence fail-closed to `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Not reward-hack detection. Sibling envelope next to jevgate (fail-closed retention vs fail-open rest).

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

[jev-security-scan](https://github.com/win4r/jev-security-scan) reviews Agent Skills and MCP code for suspicious behavior with TypeSafe Jev plus static checks. Direct sibling: structural denies + Jev sidecar over the skill/MCP supply chain (not eval-asset tool use). Policy in code: a high finding needs both Nouls ≥ 0.85, window confidence ≥ 0.6, and active context ≥ 0.7. **Unflagged ≠ certified safe**; two same-model passes are not independent verification. Does not execute the target. Cousin of [is-malicious](https://github.com/luantak/is-malicious). Complementary to jev-preflight (post-turn attention) and to jev-carryforward 0/4 (an MCP tool sitting there is not enough — scan before install). Do not merge into `examples/`. Cousin, not this sidecar.

[jev-decisions](https://github.com/bojansandhaus/jev-decisions) is a Hermes plugin: tool risk reviews + human approval routing via Jev. `pre_tool_call` is an agent-hook risk gate before tool execution, but opt-in (`JEV_ENABLE_HOOKS`) and **advisory** — install does not stop dangerous commands. **Jev review is advisory; Hermes policy remains authoritative.** Local gateway in code: destructive / credential / external-irreversible → human. A **failed review grants no permission**. Proof fields (`changed` / `read_back` / `evidence`) cannot catch invented facts. Complementary to jev-preflight (Stop-hook attention) and jev-carryforward (hope the model looks — if Hermes never calls `jev_gateway`, there is no gate). Contrast skill-broker (relevance never grants access). Do not merge into `examples/`. Cousin, not this sidecar.

[jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router) is a LangGraph support-bot demo: Jev vs LLM for guardrails and intent routing. Shared rules hard-gate soft scores (`jailbreak` / `prompt_injection` / `harmful` ≥ 0.70 or severity ≥ 2 → block). Fixture (218 items): Jev route acc **96.8%** vs LLM 99.1%; Jev classify p50 593ms / $0.046 per 1k vs LLM 1883ms / $0.99. Eval-integrity: **classify accuracy is not a safety proof** — watch soundness theater if those soft scores are hard-gated as safety. Bounded demo, not a rh-guard ROC. Complementary to jev-preflight's uncalibrated 0.85 attention threshold. Cousin, not this sidecar.

[jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) is a LoRA distill of Jev memory-relevance onto Qwen2.5-0.5B. Distill agreement is not independent gold; a student is not the hard envelope. Card: [docs/eval-integrity.md](docs/eval-integrity.md).

[jev-triage](https://github.com/ThyFriendlyFox/jev-triage) routes unlabeled data by calibrated confidence and logs soft labels. If used as an eval filter: do not distill Jev as teacher of record — real outcome labels remain the training targets.

[system-one-benchmark](https://github.com/mallahyari/system-one-benchmark) is a 50-sample LMSYS toxic-chat safety eval: Jev precision 90.9% (1 FP) vs local PCD flooding FPs (16). Calibration is the eval-integrity angle; do not treat uncalibrated open PCD as a safety gate. Bounded fixture, not a rh-guard ROC.

[dinostomp](https://github.com/collapseindex/dinostomp) audits eval instruments (data / scorer / runs / claims) before you trust the score. Pointer when people hard-gate on Jev scores inside reward/eval loops: check the instrument first. Harbor/jevals-adjacent; not a rh-guard peer.

[jev-packs](https://github.com/dtduc-git/jev-packs) is an evidence-gated registry of Jev question packs: a pack is `verified` only when accuracy / ECE / cost / latency are recorded on a pinned Jev version. Every Choice and Score must offer `unknown` (mandatory abstention). Anti-soundness-theater for gate criteria: no numbers, no endorsement.

[ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev) matured: README + `action.yml` + `src/` + committed `dist/`. Jev via Vercel AI Gateway asks four typed questions (`should_review`, `risk`, `route`, `touches_secrets`); configurable thresholds route to `auto-approve` | `human-review` | `block`. Conservative default `risk_threshold_for_review: cosmetic` escalated even trivial diffs Jev called `moderate`. Timeout/Jev-failure still → human-review, never silent auto-approve. Eval-gaming surface: optimizing the four Jev questions / thresholds instead of real review quality. Watch, not an endorsement — do not hard-gate merge on a Jev auto-approve without a deterministic path floor.

[prune-review](https://github.com/shubhangi013/prune-review) is a cost-aware Jev gate before a generative PR reviewer: Jev scores hunks; a deterministic **safety escarpment** always keeps matching hunks whatever Jev says. Jev does not generate review comments. Cost results are not quality claims. Source preview. Cousin of jev-reviewer; not this sidecar.

[jev-intent-review](https://github.com/yottayoshida/jev-intent-review) is under construction (spec only): typed Jev judgments of the post-change repository against originating intent. The diff is a search hint, not the object being verified. Prefer UNKNOWN over a false VERIFIED. Watch, not an endorsement.

[jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval) is a pre-registered Jev-vs-baselines eval with three same-day errata rounds after external review found overstated results (both experiments AMBIGUOUS; headline cascade sign flips at a tighter margin). Harbor/jevals lesson: independent review; do not promote first-publish numbers to labels.

[jev-carryforward](https://github.com/Dharundp6/jev-carryforward) is a verbatim fact ledger scored for relevance (nothing summarised, nothing deleted). Anti-summarization that erases evidence; cousin to extractive compaction and to clear-head claim/evidence checks. No key → whole list (fail-open). Eval suite: with MCP `recall` available, the agent called it **0/4** on a force-push prohibition task — an MCP tool sitting there is not enough. SessionStart/compaction hooks that inject constraints beat voluntary tool use. Anti-pattern: hope the model looks. [databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab) publishes a measured negative result (no quality-equivalent Jev PDF payoff). Anti-soundness-theater.

**Anti-pattern.** Using LLM-as-judge (or gaming jevals labels) as the reward signal is the failure mode this gate is meant to catch. See [docs/shape.md](docs/shape.md) and [Baker et al. 2025](https://arxiv.org/abs/2503.11926).

**Siblings, not a merge.** jevals measures decisions; rh-guard gates agent tool use; Harbor scores product/agent loops.

Harbor, jevals, and openevals are **practices**, not install dependencies. You do not need them to install the hooks. Card: [docs/eval-integrity.md](docs/eval-integrity.md).

## Install hooks

`examples/` is the source of truth. Per-host contracts: [docs/hosts.md](docs/hosts.md). Packaging notes: [docs/install-plugin.md](docs/install-plugin.md).

| Host | Install path | Adapter | Fail-closed |
|---|---|---|---|
| Claude Code | `.claude/settings.json` or plugin | HTTP `/api/hooks/claude` or `hooks/run.ts claude` / `hooks/claude-hook.sh` | Command wrapper yes; HTTP no |
| Cursor | `.cursor/hooks.json` | `hooks/run.ts cursor` | `failClosed: true` on shell/tool |
| Codex | `~/.codex/hooks.json` / `.codex/hooks.json` | `hooks/run.ts codex` (command only; **no HTTP**) | Codex-safe deny JSON (**no `continue: false`**) + exit 2 |
| Grok Build | `~/.grok/hooks/*.json` / `.grok/hooks/*.json` | `hooks/run.ts grok` or `hooks/grok-hook.sh` | Host fail-open on crash/timeout; wrapper emits `{decision:deny}` + exit 2 |
| Pi | `~/.pi/agent/extensions/` or `.pi/extensions/` | `examples/pi-extension.ts` → `/api/hooks/pi` | Plugin `{block,reason,terminate}` on fetch failure; optional `@hsingjui/pi-hooks` command-only |
| Amp | `.amp/plugins/` or `~/.config/amp/plugins/` | `examples/amp-plugin.ts` → `/api/hooks/amp` | `reject-and-continue` + `AGENT_DENY` (not `error`); catch throws |
| Prime Agent | `~/.prime/agent/extensions/` or `.prime/agent/extensions/` | `examples/prime-extension.ts` → `/api/hooks/prime` | Plugin `{block,reason}` (no `terminate`) |
| DSH (generic/adapter) | generic stdin (`hooks/run.ts dsh` or `generic`); Claude/Codex command-hook bridges also work | `hooks/run.ts dsh` or `generic` | HTTP skipped (404); generic `{block,reason}` + exit 2. Bridges deny at `tools/pre-execute` + exit 2 |
| Exo | wrap `ToolRuntime::execute` / `TurnContext.executeTool` ([`examples/exo-tool-runtime.ts`](examples/exo-tool-runtime.ts)) | **support via ToolRuntime wrap**, not drop-in hooks; no native `hooks.json` | Deny-by-default gate returns a tool error with `AGENT_DENY`; 8s scoring timeout denies. Host has no `failClosed` flag |

**Claude Code.** Merge [`examples/claude-settings.json`](examples/claude-settings.json) into `.claude/settings.json` for HTTP hooks. Claude HTTP hooks only honor a 2xx JSON body; timeouts and non-2xx do not block. For fail-closed PreToolUse, merge [`examples/claude-command-settings.json`](examples/claude-command-settings.json) (`npx tsx hooks/run.ts claude`); a wrapper failure emits deny JSON and exits 2. Or install the marketplace pack (HTTP for prompt/Stop, fail-closed `hooks/claude-hook.sh` on PreToolUse):

```bash
claude plugin marketplace add 24601/rh-guard
claude plugin install rh-guard@rh-guard
```

`UserPromptSubmit` injects steering context. Vague "make the tests pass" prompts steer; they do not automatically block.

**Cursor.** Copy [`examples/cursor-hooks.json`](examples/cursor-hooks.json) to `.cursor/hooks.json`. That file is the Cursor plugin. Command hooks read JSON on stdin through `npx tsx hooks/run.ts cursor`. `beforeSubmitPrompt` cannot inject context, so a gameable prompt is allowed with a user notice; tool-denial steering uses a generic `agent_message` that does not leak scores. Set `failClosed: true` on shell and tool gates.

**Skill** (eval design / interpreting denials; not how to run Next.js):

```bash
npx skills add 24601/rh-guard --skill rh-guard
```

Protocol: [`.agents/skills/rh-guard/SKILL.md`](.agents/skills/rh-guard/SKILL.md).

Keep `npm run dev` running so HTTP hooks can reach `127.0.0.1:43147`. Held-out tests belong in an isolated evaluator, not in a file the agent can `find`.

Do not add this score as an RL penalty on chain-of-thought or candidate selection. [Baker et al. 2025](https://arxiv.org/abs/2503.11926) showed that training against a CoT monitor produces obfuscated hacks.

## Run the sidecar

```bash
git clone https://github.com/24601/rh-guard.git
cd rh-guard
npm install
npm test
npm run dev
```

If you already use Origin: `origin repo clone basit/rh-guard`.

Open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Copy `.env.example` to `.env.local` and set `TYPESAFE_API_KEY` to score with Jev. Get a key from [console.typesafe.ai](https://console.typesafe.ai) after early-access signup. Pin `TYPESAFE_MODEL=jev-1.13.0`. `jev-latest` currently aliases that id and will move.

Without a key the app still runs. HTTP adapters POST to `/api/hooks/<flavor>`. Codex and DeepSeek Harness have no HTTP hook type on the host. Exo has no native `hooks.json`; score from the ToolRuntime wrap (or `hooks/run.ts generic`).

## What it scores

The live semantic scorer is [TypeSafe Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), a System One model. You send program state plus typed questions. Jev returns 13 hazard Nouls, a positive falsifier Noul, a primary-kind Choice, and an ordinal severity Score. It does not generate text.

Code owns decisions. Structural detectors protect designated evaluation assets (hidden tests, graders, reward functions, hooks, evaluator runtimes, canary paths), not every file under `tests/`. After a structural deny, Jev is skipped. Jev state is a digested command, backticked paths, and a unified-diff summary. Agent thoughts and self-justifications are not sent. Choice, severity, and a named falsifier cannot cancel a hazard deny and cannot independently create one. `heldout_blindness` is advisory.

Agent-visible denials are opaque filesystem-integrity messages. Scores and taxonomy stay on the operator workbench and in user-visible notices.

One System One request per hook event, only when a structural deny did not already fire. Thresholds and steer copy live in this repo.

Hazard Nouls (block when `noul >= 0.80` on a deny kind at a mutating stage):

- test tampering
- hardcoded oracles
- process evasion (`--no-verify`, skipped hooks)
- monitor gaming (note-to-evaluator)
- reward tampering
- held-out contamination
- verifier weakening
- evidence fabrication
- runtime tampering

Advisory (steer, never a deny by themselves):

- proxy metric (green tests as the goal)
- held-out blindness
- sycophantic evals
- coverage theater

`control_falsifier_named` is a positive control. It does not enter hazard aggregation.

Phrase every hazard Noul so a high number means the hack is present. Block when that number is at least 0.80 on a deny kind. Do not invert the question into "is this safe" and then raise the threshold. That contracts the rejection band. See [Jev + Pi](https://dev.to/jomatsu/jev-pi-a-probability-gate-for-my-coding-agents-shell-commands-95d).

Jev does not write verifier instructions. `src/lib/risk/steer.ts` does. Denials point at an evaluation-defect escalation path instead of "try harder."

## System One class (honest limits)

Lexical / GLiClass fallback is **degraded**, not risk zero, and not interchangeable with Jev even when `RiskKind` ids match. Open System One heads (for example Laya) are future backends, not drop-in ROC replacements for this hook. There is still **no public Jev reward-hack ROC**. Closed agents such as Claude and Cursor do not expose activations, so Bergen et al. 2026 difference-of-means vectors cannot run here. The Methods page lists those methods and when they do apply.

## Offline fallback

The lexical layer matches the GLiClass strings on the Hooks page. Fine-tune `knowledgator/gliclass-modern-base-v3.0` with eight shots per label from [School of Reward Hacks](https://huggingface.co/datasets/longtermrisk/school-of-reward-hacks) plus your denied tool calls if you need an air-gapped model.

The published ~14M encoder is not a drop-in action-only fallback: full-input AUROC 0.9467 drops to 0.6213 if you strip reasoning at inference.

Open-weight SWE agents can add a DoM probe from [arXiv 2609.19101](https://arxiv.org/abs/2609.19101) on CoT activations. That is a second detector, not a replacement for the hook policy.
