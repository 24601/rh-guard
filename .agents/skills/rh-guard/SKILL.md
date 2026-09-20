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
quality, not gaming. Distinct from [mizchi/jev-lint](https://github.com/mizchi/jev-lint)
(name/comment/test truth-of-contract; findings are candidates, not verdicts).

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

[semantic-firewall](https://github.com/CeamKrier/semantic-firewall) is LLM-proposes / Jev 5-noul control plane / code `ALLOW`/`ASK_USER`/`REVISE`/`BLOCK` (`untrustedInstruction` skip-when-absent). Contrast: fail-open soft Jev overlay here; the hard envelope stays structural. [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) is an additive Claude `PreToolUse` permission gate via OpenRouter `typesafe/jev-1.13` (230.8ms p50 / 263.9ms mean / 459.2ms p95; 90 live decisions on their synthetic 18-case fixture); quoted **0 dangerous allowed** on that fixture; low-confidence and network fail → human; quoted **adds a 264 ms hop rather than removing one**; default 0.85 uncalibrated; Anthropic auto-mode is not replaceable via a supported API. Latency/cost vs LLM-as-judge is the useful framing; do not claim the agent is 93% faster. [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena) is a small browser-agent Jev-vs-baseline eval on benign + injected pages. [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is adjacent model+effort routing, not a rh-guard peer.

[gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is local GLiNER2.5 (`fastino/gliner2.5-base-v1`) Claude context compaction: extractive character-offset spans, not generated summaries; Choice `keep_full`/`keep_evidence`/`keep_call_only`/`drop`; uncertain/invalid → fail-closed `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Not reward-hack detection. Sibling envelope next to jevgate (fail-closed retention vs fail-open rest).

[jev-compactor](https://github.com/edwardyen724-g/jev-compactor) is framework-agnostic verbatim compaction plus safety gating: **Jev judges relevance. Code decides structure.** Destructive commands and thrashing loops are caught in the same pass; a regex floor in code flags `rm -rf` / `DROP TABLE` / `curl | sh` whatever Jev later says. Companion to the slo-router lesson: keep a deterministic floor under Jev. Not a rh-guard peer.

[latch](https://github.com/CaseReed/latch) is a CI merge-gate: code clusters failures, Jev labels each cause, code owns `Gate: PASS` (infra) vs `Gate: BLOCK` (real). `ignore_as_infra` requires an explicit network fingerprint; Jev cannot ignore on its own. Eval-integrity cousin — treating real failures as noise is the gaming angle it counters. [clear-head](https://github.com/VladyslavHontar/clear-head) is a Claude Stop hook that checks claims against session evidence (`CONTRADICTED` / `UNSUPPORTED`); anti-done-without-reading.

[jev-marshal](https://github.com/LightningK0ala/jev-marshal) is named PR policy rules enforced by Jev (empty public tree at capture). [if-ai](https://github.com/Victor-Casado/if-ai) is plain-English PR condition checks (Jev Choice + min-confidence; Action fails on false/low-confidence/error; required-check is optional). Quoted README: **A passing if-ai check is advisory.** TypeSafe **67.8%** is four workflows, not PR review. [wakegate](https://github.com/shitianfang/wakegate) is a fail-open wake gate (skip only when Jev answers and p < 0.2; error/no-key/unsure wake). Contrast pi-jev-approver fail-closed. [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) is an oh-my-pi `safe`/`ask`/`unsafe` classifier; classifier failure defers to omp approval (fail-open). Cousins, not runtime deps.

[toolgate](https://github.com/fdemir/toolgate) is a pre-execution tool-call gate (`allow` / `block` / `review`); guard error or timeout stops the call (fail-safe). Distinct from [ndolinschi/toolgate](https://github.com/ndolinschi/toolgate). AI SDK + LangGraph adapters and a `given → expected → actual` eval CLI (only `given` reaches Jev). Cousin, not this sidecar.

[jev-reviewer](https://github.com/egma-ai/jev-reviewer) is a local PR overlay: Jev assigns P0/P1/P2 attention priorities (P0 expanded; P1/P2 collapsed). Attention is not a correctness verdict; never equate P0 with "blocked as unsafe". Anti-soundness-theater / soft-judgment UX for gates.

[safe-sh](https://github.com/EpicEric/safe-sh) is static shell analysis with Jev (tree-sitter bash chunks; never executes). README: replace `sh`/`bash` with `safe-sh` (`curl … | safe-sh`); `--warn-on` / `--error-on` own the hard exit. Scores include credential/exfil-shaped questions; high score plus `--error-on` confidence exits 1 — shell/secrets judgment **before** a hard deny, still not execution. Contrast [yolo-shell](https://github.com/riz007/yolo-shell) (exec interceptor + local floor) and [toolgate](https://github.com/fdemir/toolgate) fail-safe pre-exec. Weakened-test review lives on [typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates), not here. Gate-adjacent; not a reward-hack detector.

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

[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) is runtime authorization for tool calls before side effects: deterministic policy + RBAC + schemas + amount/limit checks own `ALLOW` / `REVIEW` / `BLOCK`. TypeSafe Jev (OpenRouter) supplies semantic evidence (intent match, scope expand, sensitive exposure). **Jev supplies evidence. Code owns authority.** A positive model score never overrides a deterministic security failure. **Schema-valid ≠ intent-matched.** Enforced `ALLOW` issues a signed, short-lived **single-use Action Grant** bound to the exact tool call (tenant, agent, user/session, tool, operation, arguments, risk, policy); consumption atomically rejects replayed, expired, mutated, and unknown permits. A Noul is not a permit. Early public MVP with an explicit [threat model](https://github.com/omkarghugarkar007/actiongate-jev/blob/main/docs/threat-model.md): ActionGate decides; the app owns execution and credentials; SDK `wrapTool` is advisory until a gateway or credential broker makes bypass impossible. Compose with construct-auto-classifier (effect-based shell) and jev-lens (attention≠authority, never blocks). Do not treat Jev ALLOW as a safety proof. No Claude/Cursor hook pack — `wrapTool` is not `hooks.json`; do not merge into `examples/`. Cousin, not this sidecar.

[AgentGhost](https://github.com/reddpy/AgentGhost) (`npm @agentghost/sdk`, MIT) is intent-aware `ALLOW` / `ASK` / `DENY` wrap around tool execution. Deterministic rules first; TypeSafe Jev judge; `ASK`/`DENY` throw so an approval cannot be silently skipped; default `failMode: "closed"` denies when the judge errors. README: "The model never decides whether AgentGhost runs. AgentGhost *is* the tool's execution function." Adapters: Vercel AI SDK / LangChain / OpenAI. Contrast actiongate `wrapTool` (advisory until a gateway) and [jev-use](https://github.com/shitianfang/jev-use) (`jev_gate` fails open). Positive envelope: the wrap *is* the execute path — the model cannot opt out of a tool it only reaches through `guard()`. Residual: Jev `ALLOW` is still soft; do not treat it as a safety proof. README: "AgentGhost protects tools whose execution you control. Provider-hosted tools that run entirely inside OpenAI / Anthropic are out of reach; MCP is planned as a proxy." Heuristic: unguarded `tools` passed to `generateText`; `AGENTGHOST_AUTO_APPROVE=1`; `failMode` flipped open; wrap the model can skip. Do not merge into `examples/`. Cousin of actiongate / pi-jev-guard / jev-use / toolgate, not this sidecar.

[turnstile](https://github.com/zyphr-labs/turnstile) is an agent action guardrail: deterministic policy + Jev semantic checks + receipts with threshold replay. Same doctrine as actiongate-jev: Jev supplies evidence; code owns `allow` / `review` / `deny`. **Jev never grants authority that policy denied.** Missing goal, disabled Jev, timeout, or invalid response → review. Experimental alpha; Claude observe-mode default; not an OS sandbox. Do not merge `turnstile-hooks.json` into `examples/`. Cousin, not this sidecar.

[pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) persists user constraints across tool calls and context compaction and checks every side-effecting call against what the user said (anti instruction-drift / reward-hack). TypeSafe Jev powered: Jev never writes policy; code owns the ledger and the block. Constraints rebuild from the session after compaction (no Jev on reload). Shadow by default; fail-open on Jev error/timeout. Complementary to jev-carryforward 0/4: injecting persisted constraints beats hoping the model looks. Do not merge into `examples/pi-extension.ts`. Cousin of pi-jev-approver / omp-auto-mode, not this sidecar.

[pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) is a Pi `edit`/`write` content-judge against Markdown rules via TypeSafe Jev (Abide-shaped; not this reward-hack sidecar). Default **informative** mode reports without blocking; **enforcement** blocks before write. A malformed selected config fails closed (no silent fallback). In enforce, `onUnavailable` defaults to `block`; `onUncertain` defaults to `warn`. Default `violationThreshold` 0.85 is uncalibrated — treating that soft score as a hard gate is soundness theater. Only this process's `edit`/`write` are covered; shell, custom tools, and other agents bypass. Informative first; evaluate representative edits before relying on enforcement. Do not merge into `examples/pi-extension.ts`. Cousin of pi-heed / actiongate / Abide, not this sidecar.

[pi-jev-control](https://github.com/goodruizhan/pi-jev-control) is a Pi **control plane** (task/model routing, tool gating, retry, skill/memory, review, GUI), not a content-judge. Tool Gate: deterministic safe/dangerous rules + Jev for uncertain operations. No key → Jev features unavailable (graceful degradation). GUI: confidence below threshold → `unknown`, never force-click. Differs from pi-jev-guard (content vs Markdown rules), pi-heed (constraint ledger), and hermes-jev-router (Hermes model-route / skip-main-model, not Pi tool authorization). Control-plane vs content-judge. Do not merge into `examples/`. Cousin of jev-dspy-control-plane / omp-jev-extensions, not this sidecar.

[jev-use](https://github.com/shitianfang/jev-use) `jev_gate` is an optional PreToolUse risk check (deny/ask only, **fails open**). Install does not enable the gate. It only ever tightens: `deny` → deny, unsure → ask, `allow` → silent so the host permission flow decides. "Treat confidence calibration as a training claim." Quoted README gate fixture (2026-09-19): 6 safe + 6 dangerous, **12/12 correct**, p50 199 ms — not a rh-guard ROC. Vercel gateway has no confidence field (margin fallback; that backend's default threshold 0.4). Anything Jev can't decide returns `escalate: true`. Handoff-family sibling of wakegate; fold the gate/escalation angle only. Do not merge into `examples/`. Cousin of claude-code-jev / jev-decisions, not this sidecar.

[jevex](https://github.com/jimmyhealer/jevex) is an MCP VOI admission tool: `codebase_investigate` returns the files/lines a coding agent should read. TypeSafe Jev ranks a shortlist; README: "jevex only answers **what to read**." Fixture packet includes `"status": "sufficient"`. `--no-jev` is a lexical ablation (no key, not the product). README does not document fail-open vs fail-closed on Jev error. Cousin of [jev-sift](https://github.com/kbhuw/jev-sift) (classify first, read selectively; errors/truncation are not evidence an item is irrelevant) and jev-carryforward 0/4 (an MCP tool sitting there is not enough). Soft-score-as-hard-gate risk: treating the shortlist as the only files that exist — hidden eval assets stay unread. Do not merge into `examples/`. Cousin, not this sidecar.

[commitjev](https://github.com/yodablocks/commitjev) is a Jev-gated commit-msg hook: message-vs-diff, single-purpose, undisclosed change. Calibration-first (`calibrate.py`); README: run it "with cases of your own before trusting the thresholds on a codebase that matters." The hook "blocks only on a warning: not being able to check a commit is not a reason to refuse it" (fail-open on check failure). Code owns thresholds (Noul 0.65; middle band is "review", never rounded). Six regex checks never reach the model. Variance can straddle the threshold. Calibrate / shadow before a hard push block. Cousin of jev-pr-review. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-runway](https://github.com/IPECTER/jev-runway) is a Codex proxy described as "A Jev-powered proxy for Codex that reduces token usage and frees up context space." Public tree at capture is LICENSE only (no README). Host-adapter / control-plane cousin of slo-router / jev-routing. Watch; do not invent how it authorizes or skips model work. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact) is Pi `session_before_compact` verbatim compaction: Jev keep/drop tool calls; survivors stay word for word. Keep-windows and pins (images, invoked skills, unresolved errors, git/file mutations) apply **before** Jev. Fail-open to Pi's built-in LLM summarizer on off / no key / HTTP error / `< minReduction` (default 25%). Contrast gliner25 fail-closed `keep_full`. Default `keepThreshold` 0.5 is uncalibrated — treating that noul as a hard delete is soundness theater; dropped calls are gone for good. Complementary to pi-heed / jev-carryforward 0/4 (constraints/memory surviving compaction). Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) is a Hermes host adapter (plugin ID `jev-router`): turn classification, conservative tool shaping, risk_gate approvals, optional coding verification. Default `mode: shadow`. **It cannot grant permission**; `approve` means request a human; it never returns `allow`. Native Hermes blocks take precedence. Missing key/SDK: plugin inactive, Hermes unchanged. Timeouts/malformed: Jev abstains. Contrast [jev-decisions](https://github.com/bojansandhaus/jev-decisions) (advisory reviews; `JEV_ENABLE_HOOKS`) and hermes-jev-router (model-route / skip-main-model, not this risk gate). Same-named [Mrmimee/hermes-plugin-jev](https://github.com/Mrmimee/hermes-plugin-jev) is a tool plugin (Agnes Flash), not a hook adapter. Distinct from [ajensenwaud/hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin) (`jev_check` / `jev_route` / `jev_score` / `jev_evaluate` tools the agent must call). Do not merge into `examples/`. Cousin, not this sidecar.

[jev-routing](https://github.com/nekowasabi/jev-routing) is a single Go binary harness (explicitly **not an MCP server**) for Claude Code / Codex / Grok Build / Cursor Agent CLI / Devin CLI. Request rewrite: (a) drop/truncate tool results like [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) **without summarizing**, (b) ask Jev Choice(next tool)+Noul(done) in parallel, (c) shrink `tools[]` to **1 schema** (zero if respond), (d) strip thinking/reasoning. Integrity/control-plane pattern for agent loops: the catalog the model sees is rewritten *before* the call. Host PreToolUse cannot strip the catalog (after the model has seen every schema). Default `JEV_ROUTING_MODE=filter`; `forced` only when a verified real Jev answer exists — local scoring alone does not force. No key → on-device classifier (named degraded backend, same lesson as `backend: "lexical"`). `claude mcp add` leaves the catalog in place. Distinct from [nekowasabi/jev-routing-mcp](https://github.com/nekowasabi/jev-routing-mcp) (named predecessor in their README; MCP add leaves `tools[]` in place). Advisory filter vs hard `forced` route. Cousin of slo-router / [pi-jev-control](https://github.com/goodruizhan/pi-jev-control). Do not merge into `examples/`. Cousin, not this sidecar.

[classifier-dev](https://github.com/mrmps/classifier-dev) is an eval-integrity cousin: a public classifier that now serves TypeSafe Jev, with LLM chains as fallback. Upstream delisted `inclusionai/ling-2.6-flash`; backup `ibm-granite/granite-4.0-h-micro` served for weeks at F1 **0.546** while docs advertised ~0.800 — "Nothing in the deployed numbers said so" (measured 2026-09-17, `eval/README.md`). The digest now marks `FALLBACK`; `eval/bench.py` scores a candidate offline before it ships. **advertised backend ≠ served backend.** **Undeclared fallback = eval integrity failure**; advertised score ≠ live model. Require digest/`FALLBACK` markers before quoting eval numbers; do not hard-gate on soft confidence from an undeclared fallback (same degraded-backend lesson as `backend: "lexical"` here). Heuristic: a quoted F1 without the served model id is soundness theater. Cousin of dinostomp / jev-baselines-eval. Not a rh-guard peer.

[jev-gate](https://github.com/totally-tim/jev-gate) is a calibrated PR-review gate (GitHub Action + local CLI + OpenCode plugin) powered by TypeSafe Jev. Seven typed concern questions; gated Nouls default 0.60. Distinct from [jevgate](https://github.com/thevibeworks/jevgate) (allowlist) and [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) (distill). README: defaults are starting points — calibrate on your diffs before trusting a gate; `--no-gate` keeps the exit code at 0. Risk: treating a calibrated soft Noul as a **hard merge gate** without workload calibration / human override = confidence theater. Card: **soft-score-as-hard-rank**; require calibration evidence + an escape hatch. Cousin of jev-pr-review (shadow until calibrated) / ci-gatekeeper / commitjev. Not [choxos/jev-reviewer](https://github.com/choxos/jev-reviewer) (human-verified quotes ≠ soft auto-accept) and not [egma-ai/jev-reviewer](https://github.com/egma-ai/jev-reviewer) (attention ≠ correctness). Do not merge into `examples/`. Cousin, not this sidecar.

[claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden) is a real-time quality gate / Art Director Warden for Claude Code via Jev 1.13. `PreToolUse` on Write/Edit/MultiEdit: quality ≥ 80% → exit 0; else exit 2 (hard process intercept) and inject diagnostics. Same family as agent PreToolUse hooks: **soft judgment hard-blocking agent actions**. Card: **attention≠verdict** / **warden-as-hard-gate**. Document when a warden should escalate vs block: taste/quality → reinspect (jev-lens / jev-preflight); eval-asset mutate → structural deny. Contrast rh-guard (structural first; soft never the sole veto) and hermes-plugin-jev (cannot grant permission). Do not merge `warden.js` into `examples/`. Cousin of claude-code-jev / jev-preflight / construct-auto-classifier, not this sidecar.

[jev-kit](https://github.com/jonathanavis96/jev-kit) is a Claude Code PreToolUse **Airlock** (tool-call guard) plus optional Belay. Code pre-filter first; Jev only for the ambiguous half; fail-open on error / timeout / no key. Deny needs confidence ≥ 0.8 and margin ≥ 0.4. Shadow first, then enforce. Quoted README: **"This is not a security control."** Cost/hygiene guard that fails open by design — not a safety envelope. Distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard). Gaming: `[airlock-ok: <reason>]` override stamp; loop protection never denies the same call twice in ten minutes. Measured 2026-09-19: deny-capable labelled eval **100%** / zero false denies; A/B **zero denies** over 30 sessions (backstop, not a tax) — not a rh-guard ROC. Belay: finished with no passing check → send back to verify (anti-done-without-reading / eval-gaming cousin of clear-head). Compaction installer is opt-in and sends unredacted tool I/O (~25k tokens); never auto-installed. Treating fail-open hygiene Jev as a hard safety envelope is confidence theater. Fold the tool-call guard + Belay angle only, not the rest of the kit. Do not merge into `examples/`. Cousin of claude-code-jev / cmdc-auto-mode / construct-auto-classifier, not this sidecar.

[agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) is an MCP proxy plus Claude hooks that screens tool calls **before they run** and results **before the agent reads them** (dual-gate eval-integrity / injection cousin). Deterministic allow/deny + Jev; shadow default; enforce holds for a human `approve`; `strict` stops when a screen could not run. Never auto-approves. Not a sandbox; not a guarantee; adaptive attacks get through. Post-result withholds content that `instructs_reader`. InjecAgent AUC **0.976** (2026-09-19) is not a safety proof. Eval-integrity residual: a replacement that does not match the tool's output shape is **discarded without complaint** while the original reaches the model (advertised screened ≠ served payload; silent FALLBACK cousin). First advertised tool list is not screened for injection; user-inlined files skip hooks. Do not merge into `examples/`. Cousin of jev-agent-safety-arena / semantic-firewall / jev-security-scan / actiongate, not this sidecar.

[opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate) is an OpenCode `context` hook: four Nouls (`is_work_request` / `ambiguous` / `missing_user_info` / `scope_unclear`); code thresholds (`isWorkThreshold` 0.5 / `dimensionThreshold` 0.75) inject a system directive to ask 1–3 clarifying questions and **not start tool calls this turn**. Fail-open (timeout/error skip; 3 failures → 5 min pause). **The gate is a system directive, not a hard block** — pair with tool permissions for enforcement. Ask-before-act calibrated product pattern. Gaming: the agent can ignore the directive (hope the model looks / jev-carryforward 0/4). Treating that soft inject as a safety veto is confidence theater / hard-gating soft judgment. Do not merge into `examples/`. Cousin of jev-preflight / hermes-plugin-jev / jev-lens, not this sidecar.

[opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner) is an OpenCode port of [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) via the `context` hook (OpenCode has no `session.compact`). Keep/truncate/drop applies to the **request view**; persisted history is never modified. Default `keepThreshold` **0.15** vs upstream **0.5** (0.5 drops nearly every unpinned call). Measured 2026-09-19 on a 530-message session: 257 judged, 257 `drop_call`, `removedMessages` **282**, 1,135 ms. Fail-open. Cached per `tool_use_id` for the session. Vendor-harness fan-out of compaction gates. Eval-integrity: dropping results can erase evidence (constraints, hidden eval, injection traces) — complementary to pi-heed / jev-carryforward 0/4. Treating 0.5 as "the right threshold" is confidence theater. Do not merge into `examples/`. Cousin of pi-jev-compact / gliner25-compaction / jev-compactor, not this sidecar.

[yolo-shell](https://github.com/riz007/yolo-shell) is a destructive-shell interceptor: local fast-path (~2ms / 178ns in-process) for allowlisted read/navigate commands, then TypeSafe Jev (`is_destructive` noul at 0.5, `risk_score` 1–10, `action` Choice `allow_immediately` | `warn_and_confirm` | `block_completely`) with a client-enforced 200ms deadline. Timeout / offline / no key → 40-rule deterministic local engine — **no silent fail-open when Jev is down** (named degraded backend, same lesson as `backend: "lexical"`). Context-aware (cwd, git branch, `AWS_PROFILE` / `KUBE_CONTEXT`). Secrets scrubbed. Zsh/Bash/Fish hooks. Residual: unexpected hook exit codes are treated as allow (crash fail-open); `yolo ` prefix and `YOLO_BYPASS=1` skip the gate. Treating the Jev `action` Choice as the sole safety veto without the local floor is soundness theater / hard-gating soft judgment. Contrast [jevgate](https://github.com/thevibeworks/jevgate) (allowlist then Jev; fail-open rest), [construct-auto-classifier](https://github.com/godspede/construct-auto-classifier), [safe-sh](https://github.com/EpicEric/safe-sh) (never executes). Do not merge zsh/bash/fish hooks into `examples/`. Cousin, not this sidecar.

[jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel) is a safety boundary for AI-assisted Home Assistant: Jev recommends; Sentinel policy; HA acts; Sentinel **reads state back**. **Command sent ≠ state confirmed.** **action ≠ verified outcome.** Review service is shadow (typed recommendation + event; does not silently operate a device). Jev cannot authorize itself. Allowlisted reversible actions only; sensitive behind approval. Unavailable device → uncertain, never success. Same author as [jev-decisions](https://github.com/bojansandhaus/jev-decisions). Not a coding-agent hook pack. Cousin of jev-decisions / actiongate / turnstile / jev-align (fabricated verification). Anti-pattern: treating dispatch success as evidence. Attention ≠ verdict — a recommendation is not a confirmed outcome. Do not merge into `examples/`. Cousin, not this sidecar.

[herdr-jev](https://github.com/muthuishere/herdr-jev) is a prompt gate for Herdr agents via [openjev](https://huggingface.co/AlexWortega/openjev) NLI (entailment / contradiction / neutral). Soft permission/gate: Herdr has no `UserPromptSubmit` intercept, so herdr-jev **owns** the prompt path — classify, then allow / warn / rewrite / block before `agent.prompt`. Inference is an HTTP client of `openjev serve`, not in-repo. Quoted README: **Status: design. Nothing here works yet.** Watch; do not invent working mechanics. Distinct from TypeSafe Jev (NLI cross-encoder ≠ System One ROC). Cousin of claude-code-jev / opencode-intent-gate. Do not merge into `examples/`. Thin card.

[apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness) (`npm @aipersona/agent-harness`) is a rebrand of [jev-harness](https://github.com/AntonioCoppe/jev-harness) (`src/` tree SHA identical at capture). README advertises confidence-gated policy routing, shadow mode, and **trajectory verification**; `docs/architecture.md` still titles itself jev-harness (© Antonio Coppe); public `src/` has no trajectory module. Eval-integrity: **advertised capability ≠ shipped module**; **shadow vs live** is the real pattern (`action === shadow_noop`; `intendedAction` records what would have run). Example `confidenceThreshold: 0.85` is uncalibrated (same 0.85 theater as laya / jev-preflight). Policy in the harness maps typed verdicts to verbs; Jev does not execute. Fold shadow / confidence-gate / advertised-vs-shipped only — not recipes (alert filter, model router, compaction). Treating 0.85 auto-act or README trajectory claims as a safety proof is confidence theater / hard-gating soft judgment. Cousin of jev-harness / jev-pr-review (shadow until calibrated) / hermes-plugin-jev (shadow default). Do not merge into `examples/`. Cousin, not this sidecar.

[alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer) is a Claude Code plugin (renamed from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard) because [leepokai/jev-guard](https://github.com/leepokai/jev-guard) already existed). `PreToolUse` **three judges** (shell / edits / MCP) plus a `PostToolUse` injection sentinel. Shell: `p(read_only / reversible_write / destructive)` plus five risk Nouls. Modes `dry` (default) / `guard` (deny only; never widens) / `on` (allow and deny). `JEV_BOUNCER_MODE`. Quoted README: **Your rules win.** Claude Code checks its own deny rules before honoring a hook's `allow`. Quoted: in `on` mode an `allow` skips the auto-mode classifier — **use `guard` if you want the classifier to see everything**. Quoted SECURITY.md: **Not a security boundary.** **Fail-open** default (`fail=ask` never fail-to-allow). **Tripwires never deny** — they only block auto-allow (regex floor: 500-issue bench, 21 hard-zero misses). Deny needs `p(danger) ≥ 0.95` and a hard-stop risk ≥ 0.95. Pin `jev-1.13.0`. Project `.jev-bouncer.json` can tighten, never loosen. Author-labelled eval: **0/148** dangerous shell auto-allowed, **0/16** dangerous edits, **0/17** side-effect MCP, **17/17** injections; p50 **936 ms** — labels are the author's; thresholds chosen on the same rows; **not a rh-guard ROC**. Distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard), [pablozr/JevGuard](https://github.com/pablozr/JevGuard), [seb4ez/jevguard](https://github.com/seb4ez/jevguard), and [codebam/jev-guardrails](https://github.com/codebam/jev-guardrails). Contrast [yolo-shell](https://github.com/riz007/yolo-shell) (named degraded backend) and [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) (withhold, not warn). Treating those 0.95 Nouls as a hard safety veto without the tripwire floor is soundness theater / hard-gating soft judgment. Do not merge `bouncer.py` into `examples/`. Cousin of claude-code-jev / construct-auto-classifier / yolo-shell / jev-kit, not this sidecar.

[pablozr/JevGuard](https://github.com/pablozr/JevGuard) is a semantic policy engine: after an agent turn, Jev on an **attributed** diff + a local deterministic gate → `PASS` / `WARN` / `FAIL`. Not a linter, generator, or prose reviewer. Incomplete / oversized / blocked evidence → `UNAVAILABLE` — it never turns incomplete evidence into a reassuring verdict. V0.1 observe-only (never alters agent context or blocks). Status: design-to-MVP; public tree at capture is docs + README (no `packages/` scaffold). Eval-integrity: **advertised monorepo ≠ shipped packages**. Distinct from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard) and [leepokai/jev-guard](https://github.com/leepokai/jev-guard). Policy-integrity cousin of Abide (Jev on diffs), not reward-hack. Treating observe-mode `PASS` as a merge gate is soundness theater. Watch; do not invent working OpenCode mechanics. Do not merge into `examples/`. Cousin, not this sidecar.

[ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground) is synthetic cases for measuring whether a `verify-criteria` check actually catches things. Every case starts as an issue written **before** any code exists. Some implementations carry a planted defect; which ones, and what the defect is, is **deliberately not in this repo** — a session writing criteria must not be able to read the answer. Quoted README: "Nothing here is real software. Do not depend on it." CODEOWNERS: review is the gate that keeps a machine-authored (including planted-defect) change from landing unseen. Eval-integrity / soundness-theater antidote: independent keys, held-out defects, never promote predictions to labels. Cousin of [dinostomp](https://github.com/collapseindex/dinostomp) / Harbor separate verifier / jevals. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevbrain](https://github.com/Synxneuos/jevbrain) (`Jev Brain`) is a local <1ms decision daemon: confidence ≥ 0.80 → `AUTO_ACT`, else `REVIEW_QUEUE`. Attention firewall / coding-agent Warden (`GREEN` / `YELLOW` / `RED`). **Not TypeSafe Jev** — routing is n-gram / keyword-anchor overlap; the Warden is regex. Name collision with Jev. Uncalibrated 0.80 AUTO_ACT is confidence theater (same 0.8x recipe as laya 0.85). Silent-fallback risk if mis-calibrated: a high keyword-margin auto-acts without a human. Fold the attention-firewall / AUTO_ACT / silent-fallback angle only — not inbox / X / mobile-runner recipes. Whitepaper N=10k 95.2% token-cut is not a rh-guard ROC. Distinct from [claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden). Do not merge into `examples/`. Cousin of jev-lens / slo-router / localjev, not this sidecar.

[jev-crawlers](https://github.com/russfranky/jev-crawlers) puts judge then verify nodes on recursive bug-discovery crawlers (`crawl-judge` then `crawl-verify`). The verifier builds a falsifiable artifact and checks grounding. Anything that fails is an **unverified lead, never a bug**. v0 verification is grounding, not execution. Quoted README: **Jev probabilities are ranking signals, not calibrated bug confidence**; routing follows the risk score, never a raw boolean; the review queue is the primary sink. n=12 labelled fixture is a start, not proof. Cousin of [jev-align](https://github.com/caiovicentino/jev-align) (fabricated verification) / dinostomp / Harbor independent validator. Fold the verify-path / ranking-not-calibration / unverified-lead angle only. Do not merge into `examples/`. Cousin, not this sidecar.

[typed-gate](https://github.com/harshpuri84/typed-gate) is a pattern for using a System One model without throwing away the number it gives you. Code finds candidates; Jev returns a Choice and a Noul; **code decides** ACCEPT vs REVIEW (`typed_gate/gate.py`). Quoted README: a yes/no probability near 0.5 is the model **declining to answer**. It is not a weak yes. The 0.40–0.60 band is a refusal to commit. Synthetic 100 freight docs / 1,100 field decisions (19 Sep 2026): **Jev + gate** 0 wrong / 0 omitted (117 review) vs **argmax only** 0 wrong / 25 omitted. Quoted: **Correctness is a tie.** Distinct from [jev-gate](https://github.com/totally-tim/jev-gate) (PR-review Nouls). Anti-pattern: hard-argmax "safety theater" / treating 0.51 as a yes. Fold the probability≠argmax / band-as-refusal angle only. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) is Jev-gated auto mode for Pi: before `bash` / `write` / `edit` (and custom tools) execute, OpenRouter Decisions reviews the call. Local read-only allowlist (`read`) skips Jev. Block if `choice === "block"` **or** `p(block) ≥ 0.50`. Binary: it either runs or it doesn't. **Fail-open:** checker error or unreachable → the agent keeps running (`Jev gate error (failing open)`). `/checker` can disable the gate. Intent-aware: the current task is in `state`. Distinct from [jevgate](https://github.com/thevibeworks/jevgate), [jev-gate](https://github.com/totally-tim/jev-gate), [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) (fail-closed), [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard), and [pi-jev-control](https://github.com/goodruizhan/pi-jev-control). Contrast this sidecar (structural first; soft never the sole veto) and [jev-use](https://github.com/shitianfang/jev-use) (`jev_gate` fails open, only ever tightens). Treating `p(block) ≥ 0.50` as a hard safety envelope without the local allowlist is soundness theater. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel) catches consumer-visible API changes hiding in **documentation-only** OpenAPI edits. Deterministic structural checks first; TypeSafe Jev evaluates bounded semantic questions on changed prose. Quoted README: **JEV never writes a review or changes a specification.** Advisory mode is the default. Enforce: a semantic break blocks only when both the `breaking` probability **and** promise-violation probability cross `--block-threshold` (default **0.90**). API errors fail closed in enforcement and request review in advisory. Quoted: do not enable enforcement until questions and thresholds have been evaluated on representative changes from your own APIs. CI/policy-integrity cousin of [if-ai](https://github.com/Victor-Casado/if-ai) / [latch](https://github.com/CaseReed/latch). Detection: treating a docs-only OpenAPI PR as harmless; hard-gating uncalibrated 0.90 as a merge veto. Do not merge into `examples/`. Cousin, not this sidecar.

[nanoprune](https://github.com/dmdjr1409/nanoprune) is a **2.8MB** local System One decision & RAG pruner (2-layer encoder distilled from **Laya** 421M). Not TypeSafe Jev. Cheap front gate before expensive System Two: prune / choice / score on CPU in ~1.3–2.4 ms. Quoted badges: **0.0% Hallucination Guaranteed**; table ECE 2.58%. That guarantee is soundness theater — a tiny distill is not a hallucination proof, and ECE on their bench is not a rh-guard ROC. Pair with [laya](https://github.com/NandhaKishorM/laya) (0.85 still soft; Khmer OOD 0.000 at 95.2% confidence) and [jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration). Distinct from [prune-review](https://github.com/shubhangi013/prune-review). Fold the cheap calibrated deny/allow-before-System-Two angle only — not the medical search app. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-switchyard](https://github.com/bgrablin/hermes-switchyard) is a Hermes plugin: Jev-powered advisory skill selection and policy-constrained mode switches. Quoted README: it **never loads the skill**, never silently changes the active model, and does not claim a recommendation is correct. Automatic hosted routing stays **fail-closed** unless the host supplies a typed per-turn egress envelope. Quoted: a persistent `public_or_sanitized_data_ack` **does not scan or redact data, grant permission to share it, or bypass other controls** — **not DLP** and not automatic authorization. Local token-overlap threshold **0.20** and Jev skill-choice / needs / winning-probability thresholds **0.80** are uncalibrated abstention policy (quoted routing.py: calibration for correctness is not independently established). Sibling of [skill-broker](https://github.com/adamjralph/skill-broker) (relevance never grants access). Distinct from [hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev). Fold the skill/policy / permission-integrity angle only — not CUA / computer-use. Anti-pattern: treating a skill recommendation or ack flag as a grant. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates) is LangChain / Deep Agents middleware: typed Jev judgments where a regex, word list, or prompt line was standing in for *reading*. `ToolGateMiddleware` wraps `execute` with four independent Nouls (`database_write`, `production`, `destructive`, `secrets`). One answer ≥ `threshold` (0.5) and the command does not run; the agent gets an error `ToolMessage` and must report the step as **HELD**. Quoted: **Closed when TypeSafe is unreachable** (`fail_closed=True`); only `{role, command}` is sent, never the conversation. Distinct from `langchain-typesafe` `AutoModeMiddleware` (last 30 messages; whether the *user* authorised the call). Quoted: **the pattern runs first and its answer stands; the judgment is asked about what the pattern let through** — **never looser**. `SpecReviewMiddleware` judges changed existing specs — assertion **inverted**, **retargeted**, **weakened**, test **disabled**. Quoted measured on `jev-1.13.0` (synthetic): toolgate probe **27/27**, judgments **31/31** — not a rh-guard ROC. Quoted: treat **0.5 / 0.6 / 0.8 as starting points**; **This is a second layer, not a boundary.** Soft-judgment gate middleware; do not treat 0.5 as a safety envelope. Distinct from [fdemir/toolgate](https://github.com/fdemir/toolgate). Do not merge into `examples/`. Cousin, not this sidecar.

[jev-pastepilot](https://github.com/buberlo/jev-pastepilot) (`PastePilot`) is a paste-to-action launcher: allowlisted tools, preview, then Confirm. Quoted README: **Confirm is a gate, not a formality.** **Pasted text is untrusted data. It cannot grant new permissions.** Optional live Jev: a Choice for the allowlisted action, a Noul for injection/suspicion, a Noul for emptiness/clarity, and a Score for fit; **code combines those answers**. Quoted: **Confidence is a gate, not proof** — high (default ≥ 0.75) may keep a select; low (default < 0.45) abstains to the manual tools. Missing key / timeout / 429 → **fail-opens**. Quoted: **Do not treat this README, a vendor claim, or a confidence score as a measured accuracy result.** Not an autonomous agent (no browsing, no shell, no silent writes). Fold paste/injection/confirm-gate only — not Share Sheet. Treating 0.75 as a safety proof is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[jevcache](https://github.com/hyperspaceai/jevcache) is a local-first decision ledger for Jev-class models: fingerprint `(model, schema, state)` after redact/canonicalize, then `recall` (ledger-only) or `decide` (recall then backend). `publish`/`add` share fingerprints+answers, never raw state. **cache hit ≠ correctness.** Shared fingerprint bundles are trust theater if treated as calibrated truth / auto-act. Distinct from Hyperspace KV attention cache. Not a PreToolUse gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sutro-sh/jev-align](https://github.com/sutro-sh/jev-align) (`jeva`) is a GEPA loop that aligns TypeSafe Jev with human labels (uncertain rows + audit sample; human accept/reject/rewind). Distinct from [caiovicentino/jev-align](https://github.com/caiovicentino/jev-align) (policy verify before act). Quoted README: **A higher training score never accepts a proposal automatically.** Positive envelope. Anti-pattern cousin if someone hard-gates on the GEPA training score. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[enzyme](https://github.com/byenzyme/enzyme) is a local-first compile step for Markdown knowledge bases: temporally grounded sampling → **catalysts** (questions as semantic routes). `enzyme compile` is an explicit OpenRouter Decisions op (`ENZYME_JEV_MODEL`, default `typesafe/jev-1.13`). Quoted README: `when asked` is **guidance compiled for your agent, not an enforced hook.** Not a PreToolUse wrap. **catalyst similarity** scores are ranking, not deny/allow — do not hard-gate them as a safety veto. Fold compiled-guidance ≠ hook / similarity≠deny only — not PKM recipes. Thin card. Do not merge into `examples/`. Cousin of [jevex](https://github.com/jimmyhealer/jevex) / [jev-sift](https://github.com/kbhuw/jev-sift), not this sidecar.

[jevguard](https://github.com/seb4ez/jevguard) is a production integrity runtime around TypeSafe Jev: closed-world escape injection, certainty/margin calibration, volatile-field masking, zero-token SHA-256 cache, and episodic SQLite memory. Quoted README: categorical Choice without a fallback **forces a false positive**; the runtime injects `UNRESOLVED_OR_OTHER`. Quoted: top probability below 0.40 or first/second margin below 0.15 → `AMBIGUOUS_STATE`. Distinct from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard), [pablozr/JevGuard](https://github.com/pablozr/JevGuard), and [leepokai/jev-guard](https://github.com/leepokai/jev-guard). Distinct from [jevcache](https://github.com/hyperspaceai/jevcache) (decision ledger) — this SHA-256 cache is still not a correctness proof. Pairs with [wellposed](https://github.com/suraj-phanindra/wellposed) (Choice with no "other" can be forced wrong at 1.0) and [typed-gate](https://github.com/harshpuri84/typed-gate) (argmax near 0.5 is declining to answer). Anti-pattern: closed-world false positives without an escape; argmax on a flat distribution without a margin check. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-ci-selector](https://github.com/guilhem/jev-ci-selector) is CI task selection: a pure policy engine (`always` / `force_paths` / dependencies) plus Jev on optional tasks. Quoted README: **Keep your workflows. Start in shadow mode. Measure before you skip.** Default `shadow`: every task still runs; the report records `proposed_run` vs `run`. Timeout, API problem, invalid response, fork PRs, and catalog/workflow changes keep all tasks. `enforce` is explicit opt-in. Initial `skip_below: 0.05` is an experiment, not an error-rate guarantee. Soft judgment must not hard-skip checks. Cousin of [latch](https://github.com/CaseReed/latch) / [if-ai](https://github.com/Victor-Casado/if-ai) / [jev-pr-review](https://github.com/ohernandezdev/jev-pr-review). Anti-pattern: treating a Jev skip plan as a safety envelope without shadow soak. Do not merge into `examples/`. Cousin, not this sidecar.

[tonedown](https://github.com/ziziphus-jujuba-zao/tonedown) is multilingual text safety grading 0–4 plus category probabilities; a moderation API and userscripts turn them into pass/review/block or show/blur/hide. Quoted README: **Platforms pick a policy, users pick a level, the engine only measures.** Golden set of 74 comments/danmaku in 11 languages (2026-09-19): **74 / 74** exact. Quoted: **A set this small proves the pipeline, not the model.** Offline lexicon fallback. Not a coding-agent hook pack. Cousin of [GLiGuard](https://github.com/fastino-ai/GLiGuard) / [system-one-benchmark](https://github.com/mallahyari/system-one-benchmark) / [jevmod](https://github.com/ohernandezdev/jevmod). Treating 74/74 as a rh-guard ROC or hard-gating the 0–4 score as safety is confidence theater. Fold grading / policy-in-code only — not danmaku recipes. Do not merge into `examples/`. Cousin, not this sidecar.

[jevmod](https://github.com/ohernandezdev/jevmod) is productized community moderation: category probabilities plus plain-English rules; the operator owns thresholds and actions. Flag-only by default. Quoted README: **Fails open:** if Jev is unreachable, messages are left alone (`reason="error_open"`). Self-harm is flag-only by design. BENCHMARK.md (2026-09-18, 2,531 messages): OpenAI eval AUROC harassment **0.930**, nsfw **0.982**, selfharm **0.992**, minors **0.977**. Quoted: **2,531 messages across three public sets is a sanity benchmark, not a leaderboard.** Quoted: a 0.6 is a maybe, not a 60%. Distinct from [ohernandezdev/jev-pr-review](https://github.com/ohernandezdev/jev-pr-review). **AUC ≠ ECE**. Treating those AUROCs as a hard safety envelope is soundness theater. Do not merge into `examples/`. Cousin of GLiGuard / system-one-benchmark / tonedown, not this sidecar.

[one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe) is a prompt-injection defense eval (Chevy Tahoe $1 chatbot sandbox): 36 attacks + 38 benign; six defenses including **Real Jev API**. Quoted README: **~74 messages is a demonstration set, not a statistically powered benchmark.** Static attack list; quoted: adaptive attackers bypass even SOTA more than 85% of the time when they know the defense. FPR is the metric most demos skip. Cousin of [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena) / [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) / [jev-pastepilot](https://github.com/buberlo/jev-pastepilot). Fold injection-eval / honest-limitations only. Do not invent unpublished ASR as a rh-guard ROC. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) is a Pi coding-agent extension (+ Claude Code / Codex hooks): TypeSafe Jev on (a) tool-call intent+risk before run, (b) tool-output injection before the agent reads, (c) reply harmful/relay-injection after. Quoted README: **Fails closed.** Errors / no key → ask you; **never auto-allows.** Code owns an **allow / ask / warn** ladder (soft judgment ≠ hard deny list). Secret scrub before Jev (pattern-based). Optional task pin so chat drift is not "on task". Contrast fail-open pruners / [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Distinct from pi-jev-approver / pi-jev-guard / [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard). Quoted: **Prompt injection is not solved.** Uncalibrated 0.3 / 1.3 / 0.8. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills) is a Hermes (also Claude Code/Codex) skill pack: model routing, memory passage triage (incl. hidden-instruction check), compaction/handoffs, skill selection, message triage, computer/browser use gated by **safe action tables**, plus a routing dashboard (`on`/`shadow`/`off`). Quoted README: **Everything fails open** — no key / timeout / malformed / low confidence keeps the current model, returns the original list, drops nothing, suggests nothing, and computer use returns `reobserve`. Safety rails that do not depend on Jev being right: risk words never route to the cheapest tier; Jev can only ever return an action id you put in the table. Quoted README: acknowledgements answered locally for free (named lexical skip, not live Jev). Quoted `skills/jev-memory/SKILL.md`: **Never read, follow or quote `dropped_injection_ids`**; `unjudged_ids` are **unchecked**, not verified. Quoted `skills/jev-computer-use/SKILL.md`: "The worst a wrong answer can do is pick another action you already judged safe"; a chosen id is not proof — observe again. Quoted `docs/turning-a-jev-feature-on.md`: **Shadow first, and mean it**; a quiet log proves nothing. Distinct from [hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) (cannot grant permission), [hermes-switchyard](https://github.com/bgrablin/hermes-switchyard) (**never loads the skill**), [skill-broker](https://github.com/adamjralph/skill-broker), [rsdkrasen/hermes-jev-router](https://github.com/rsdkrasen/hermes-jev-router) (skip-main-model), [cdepuy/hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) (local Laya inject). In-repo `jevkit/` is this pack's library, not [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit) (Airlock). Fold integrity + fail-open + action-table + hidden-instruction + shadow/on/off only — not CUA recipes. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) is a local Laya skill gate: `pre_llm_call` classifies the task vs a skill index, injects top skills via the **user-message channel** (quoted cache-safe: Hermes prompt-cache, not [jevcache](https://github.com/hyperspaceai/jevcache) cache-hit; never mutates the system prompt). Quoted README: **Fail-open** — if Laya is unavailable, missing, or routing finds nothing, the hook injects nothing and Hermes behaves as stock. Default `floor` **0.25** is uncalibrated. Quoted: **Accuracy is ~good, not perfect**; it is never worse than stock (fail-open), but it can pick a plausible-but-not-ideal skill. Contrast [hermes-switchyard](https://github.com/bgrablin/hermes-switchyard) (**never loads the skill**) — this plugin *does* inject SKILL.md excerpts as "ACTIVE guidance". Same-named [xXLODXx/hermes-skill-router](https://github.com/xXLODXx/hermes-skill-router), [LLM-Architects/hermes-skill-router](https://github.com/LLM-Architects/hermes-skill-router), [bkutasi/hermes-skill-router](https://github.com/bkutasi/hermes-skill-router), [MKI13/hermes-skill-router](https://github.com/MKI13/hermes-skill-router) — this card is cdepuy's local Laya inject. Local-econ fail-open cousin of API Jev routers ([jev-routing](https://github.com/nekowasabi/jev-routing) / [hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills)). Pair with [laya](https://github.com/NandhaKishorM/laya) (0.85 still soft; Khmer OOD). Treating a 0.25 inject as a grant or as a safety veto is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[dgp](https://github.com/numerous-com/dgp) (Decision Graph Protocol) is typed assessment then application-side **guarded commit/authorization** before effects; receipts. Quoted README: an agent assesses the choices while **application code retains control of permissions and effects**. Assessors do not execute side effects. Quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe): **Speculative assessments cannot authorize effects**; using cached computation requires equivalence checks and a fresh live assessment (cache hit ≠ live Jev). Demo: the model's publication recommendation does not publish. Host retains authority regardless of the assessor. Primary protocol fold is in [Augustus](https://github.com/24601/Augustus); here capture the integrity boundary only (same shape as actiongate / turnstile: Jev supplies evidence, code owns authority). Not a coding-agent hook pack. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate) is a Hermes Agent **fail-closed** tool-call policy gate: Jev classifies side-effecting / paid / external tools with argument redaction; read-only and obvious safe terminal commands pass without a network call; outage / malformed / uncertain → Hermes existing approval (fail closed into ASK, not allow). Quoted README: ambiguous multi-step requests get an advisory route hint through `pre_llm_call` (not fail-closed approval). Quoted README: **Let Jev inspect the risky calls. Keep Hermes in control.** Quoted: **This is a safety layer, not an autonomous permission slip.** Quoted: Hermes hardline blocks, normal authorization, and human approval remain authoritative. Quoted: the gate can recommend allow, deny, or approval; **It cannot override Hermes's existing authorization rules.** Quoted: a Jev outage, malformed response, or uncertain decision is treated as a reason to ask for approval, not a reason to allow the call. Quoted: metadata-only audit records to `$HERMES_HOME/logs/jev-gate.jsonl`. Quoted: experimental; tracks deployed Hermes plugin `0.3.0`. Distinct from [thevibeworks/jevgate](https://github.com/thevibeworks/jevgate) (allowlist), [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate) (PR-review Nouls), [robbyczgw-cla/hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) (cannot grant permission; never returns `allow`). Cousin of [kerpopule/hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills) / [cdepuy/hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) / [nekowasabi/jev-routing](https://github.com/nekowasabi/jev-routing). Fail-closed-into-approval is not this sidecar's structural deny. Do not dump plugin source — quote README behavior *theirs*. Do not merge into `examples/`. Cousin, not this sidecar.

[omo-jevlike-router](https://github.com/islee23520/omo-jevlike-router) is a local **jevlike** one-pass skill router for [OmO](https://github.com/code-yeongyu/oh-my-openagent): frozen Qwen2.5-0.5B + option-attention head scores the full skill catalog; an OmO extension shrinks `<available_skills>` to top-K. Quoted README: **fail-open**: if the router is unreachable, OmO behaves exactly as before. Quoted measured (theirs; 1,414 labeled turns, 141 skills, held-out 132): recall@24 **84.1%**, warm ~50–70 ms, ECE ~0.10. Quoted: an earlier README quoted 46.2% top-1 / 95.5% recall@12 — **evaluation bug** (trainer iterated training rows, not held-out). Quoted: skills cut from top-K keep names in an `other_skill_names` index; flat-confidence turns skip filtering. Quoted: **independent experiment, not a Jev reproduction**. MIT. Integrity: **soft router ≠ hard gate**; fail-open is intentional; a catalog shrink is not a deny. Do not dump model/weights. Cousin of [cdepuy/hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) (local Laya inject, fail-open) / [nekowasabi/jev-routing](https://github.com/nekowasabi/jev-routing) (shrink `tools[]`) / [vinnylarouge/jevlike](https://github.com/vinnylarouge/jevlike). Distinct from TypeSafe Jev. Do not merge into `examples/`. Cousin, not this sidecar.

[llm-vs-jev](https://github.com/ishaannk/llm-vs-jev) is a controlled comparison of LLMs vs Jev on **LLM guardrailing**. Quoted README: one decision spec, one policy, several perception backends. Quoted table (shared spec `77f2a821072b1862`): `jev-1.13.0` strict accuracy **77.9%** / ECE **0.053** / p99 679 ms / $0.0444 per 1k screens; `gpt-5.1` 68.8% / 0.229; `claude-opus-5` 83.8% / 0.051; `gpt-6-astra` 85.8% / 0.107. Quoted: **Nothing wins outright.** Quoted: **Jev is the cheap end of the frontier.** Quoted steerability: appending one sentence that asserts the classification it wants moved `anthropic-opus` 14.3%, `jev` 10.7%, `openai-mini` 7.1%, `openai` 0.0%. Quoted: **this repo does not make a stronger claim** on TypeSafe's behalf. Distinct from [TeoMastro/jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router) (LangGraph demo; 96.8% route acc). Sentinel eval: cost/latency/steerability bake-off for guardrail judges — quoted **Nothing wins outright** (Jev is beaten on accuracy by opus/astra). Do not invent unpublished RESULTS.md extras as a rh-guard ROC. Do not merge into `examples/`. Cousin, not this sidecar.

[jeff](https://github.com/Gestalt-Lab/jeff) (Jeff 1) is a local open-weight typed decision / fact-checking model (Jev-compatible Choice / Noul / Score). Quoted README: **API compatibility does not imply identical judgments or performance.** Independent, not affiliated with TypeSafe. Quoted evaluation vs live Jev 1.13.0 on **9,730** human-labelled fact-checking examples (FEVER, VitaminC, SciFact, Climate-FEVER): Jeff 1 accuracy **0.8183** / ECE **0.0807** vs Jev **0.8283** / **0.0932**. Quoted: **Lower ECE does not guarantee that an individual prediction is correct.** Apache 2.0 for the code and adapter. Fact-check / integrity cousin; light cross-note only (not a drop-in Jev ROC; do not dump a deeper replica). Do not dump weights. Pair with [laya](https://github.com/NandhaKishorM/laya) / [localjev](https://github.com/githubnext/localjev). Do not merge into `examples/`. Cousin, not this sidecar.

[invalidate](https://github.com/chopratejas/invalidate) is a memory lease/invalidation layer on TypeSafe Jev: every stored fact is judged against new evidence; code owns the disposition. Quoted README: **The memory text is never edited.** **Questions and plans change nothing.** **Instructions change nothing.** **When unsure, it asks a human.** Six Jev votes (`bears` / `still_true` / `replaces` / `partial` / `hypothetical` / `directive`) then fixed rules in code; similarity top-k is never the judge. Quoted eval (157 labeled cases, shipped `v4`): **89.2% strict**, **97.5% lenient**, **0 false invalidations**. Quoted: defaults "refused any policy adding a false invalidation; they were tuned on that set, so rerun the sweep on your own events." Quoted: a kill takes two votes. Quoted: LongMemEval treatment number for the stale-retrieval slice is pending. Not a memory store (adapters sit in front of Mem0 / Chroma / Markdown / …). **0/157 is not a rh-guard ROC.** Cousin of [jev-carryforward](https://github.com/Dharundp6/jev-carryforward) (verbatim ledger; this one retires stale facts) / [jev-recall](https://github.com/samdotmak/jev-recall) (include/exclude at read). Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin) is a Hermes Agent **tool plugin** exposing `jev_check` (Noul) / `jev_route` (Choice) / `jev_score` (Score) / `jev_evaluate` (mixed, one call). Not a PreToolUse hook and not a fail-closed permission overlay. Distinct from [robbyczgw-cla/hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) (cannot grant permission; never returns `allow`) and [Mrmimee/hermes-plugin-jev](https://github.com/Mrmimee/hermes-plugin-jev) (Agnes Flash). Distinct from [typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate) (fail-closed policy overlay). Hope-the-model-looks cousin of jev-carryforward 0/4: if Hermes never calls the tools, there is no gate. Bundled skill `jev:jev-questions` covers atomic questions, state, and confidence gating. Quoted tests: clear-cut noul → confident yes (p ≥ 0.70); malformed call → graceful error JSON, hermes exit 0. Do not dump plugin source. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-lint](https://github.com/mizchi/jev-lint) is a semantic **contract** linter: does a function do what its name says, is a comment still true, would a test still pass if the claimed behaviour were broken — ast-grep locates subjects; Jev scores one sentence per match. Distinct from [huntedman/JevLint](https://github.com/huntedman/JevLint) (semantic convention lint, write → check → fix). Distinct from [wobsoriano/oxlint-plugin-jev](https://github.com/wobsoriano/oxlint-plugin-jev) (English oxlint rules → Jev cutoffs) and [mizchi/jev-playground](https://github.com/mizchi/jev-playground) `eslint-plugin-jev`. Quoted README: **Read a finding as a candidate for a human to judge, not a verdict to act on.** Quoted: about one finding in five was wrong. Quoted: **No shipped rule has `severity: error`** — "a probabilistic reviewer that can fail a build is one that gets switched off." Without an API key the pre-commit hook steps aside. Quoted: 20 of 23 rules reach precision and recall 1.00 on small evals (197 labelled defects) after removing in-file `// DEFECT` markers that leaked the label; **not a rh-guard ROC**. Cutoffs fitted to their corpus. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-recall](https://github.com/samdotmak/jev-recall) is a calibrated include/exclude gate over memories: **relevance, not resemblance**. One yes/no Noul per memory in one request; keep everything above a threshold (default **0.5**) instead of top-k. Quoted bench (2026-09-19, `jev-1.13.0`, 238 fictional memories, 18 requests): pointer mode **17/18** requests / **19/20** key memories / **$0.00044** / **0.35s** — matches Sonnet 5, within one memory of Opus 5. Quoted: one miss needs outside knowledge ("Sam is on an H-1B visa"); Sonnet missed that one too. Distinct from [jev-carryforward](https://github.com/Dharundp6/jev-carryforward) (verbatim ledger; 0/4 recall) and [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) (distill of memory-relevance). Soft include/exclude is not a safety deny. 18 fictional requests is not a rh-guard ROC. Cousin of [invalidate](https://github.com/chopratejas/invalidate) (retire vs retrieve). Do not merge into `examples/`. Cousin, not this sidecar.

[oxlint-plugin-jev](https://github.com/wobsoriano/oxlint-plugin-jev) is English oxlint rules → Jev cutoffs (`jev/ask`). Oxlint finds the node; Jev answers a yes/no; a cutoff reports. When Jev can't be asked: skip (warn) unless `ci: "fail"`. Quoted: keep `jev/ask` out of the editor config (keystroke = paid request). Distinct from huntedman/JevLint and mizchi/jev-lint. Treating an uncalibrated cutoff as a hard lint error is soundness theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[rspamd-jev](https://github.com/rioriost/rspamd-jev) is a **shadow-mode only** TypeSafe Jev spam-eval Lua plugin for Rspamd (classification gate in the mail path). Quoted README: **Experimental: disabled by default, no external requests by default, no filtering decisions.** Quoted: **Jev observations have zero score and do not change delivery actions or set Bayes learning flags.** `JEV_HAM` / `JEV_SPAM` / `JEV_PHISHING` / `JEV_UNCERTAIN` / `JEV_ERROR` have **registration scores and insertion weights of zero** — do not add them to action rules, composites, or learning conditions. Quoted: the **individual mail scan still waits for Jev**. Gloss: **unchanged score ≠ unchanged latency**. Quoted: `agreement` is **not** accuracy. Timeout 1.5s, no retries; failures keep the existing verdict. Quoted: **Confidence is not a false-positive-rate guarantee.** Quoted: no **automatic enforcement**. Gloss: **no auto-reject path is provided**. Pins `jev-1.13.0`; quoted: **`jev-latest` and other moving aliases are rejected.** Classification-as-guardrail: observation, not a hard reject. Cousin of [jevmod](https://github.com/ohernandezdev/jevmod) / [tonedown](https://github.com/ziziphus-jujuba-zao/tonedown). Treating score-0 shadow symbols as a reject envelope is soundness theater. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-guardrails](https://github.com/codebam/jev-guardrails) (`@codebam/jev-guardrails`; README title `dsh-jev-guardrails`) is Jev-backed agent tool-call guardrails plus OpenCode / Hermes Agent / DeepSeek Harness hook installers. Quoted README: **The library owns policy, not the model.** Jev answers typed questions; code maps them to `allow` / `review` / `block` / `support`. Heuristics are fast paths; **a local decision never overrides Jev**. `failMode` is explicit (`open` → allow, `review`, `closed` → block). Default action/review thresholds **0.70 / 0.35** are uncalibrated product knobs. Quoted library README: **A guardrail is not a sandbox.** Default TypeSafe/OpenRouter aliases include `jev-latest` (moving alias, not a pin; contrast [classifier-dev](https://github.com/mrmps/classifier-dev) advertised backend ≠ served backend and [rspamd-jev](https://github.com/rioriost/rspamd-jev) refusing that alias). Distinct from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard), [pablozr/JevGuard](https://github.com/pablozr/JevGuard), [leepokai/jev-guard](https://github.com/leepokai/jev-guard), and [seb4ez/jevguard](https://github.com/seb4ez/jevguard). Cousin of claude-code-jev / construct-auto-classifier / AgentGhost / this sidecar's dsh adapter. Treating 0.70 as a safety envelope or merging their dsh/OpenCode/Hermes installers into `examples/` is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[moongate](https://github.com/brickfrog/moongate) is a semantic CI gate (MoonBit): TypeSafe Jev evaluates committed diffs against JSON rules (`violation` / `compliant` / `insufficient_evidence`). Policy and checkout come from the **base commit** so a PR cannot edit the rules that judge it. Quoted README: **A verdict is a model's answer, not a proof. Exit 0 doesn't mean the code is fine.** Confidence **doesn't tell you the answer is correct.** Advisory unless `"severity": "blocking"`. **An unevaluated rule never counts as a pass.** Forks and Dependabot are skipped rather than reported as a fake pass. Ten identical replays: label `violation` all ten times, but **4 counted as violation and 6 as review** at a 0.90/0.80 gate. Quoted: **Keep thresholds away from where a rule actually lands.** **The model is pinned. Changing it invalidates your thresholds.** Cousin of [jev-gate](https://github.com/totally-tim/jev-gate) / [jev-pr-review](https://github.com/ohernandezdev/jev-pr-review) / [if-ai](https://github.com/Victor-Casado/if-ai) / [latch](https://github.com/CaseReed/latch). Soft-score-as-hard-merge without calibration + escape hatch is soundness theater. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage) is an SRE observability sentinel: Jev scores a collapsed log batch (six questions, one call); **code keeps the thresholds; nothing is executed.** Confidence-gated routing: below `--confidence-floor` (default 0.50) → `review`. Quoted README: **Low confidence never auto-acts.** `auto_remediate_candidate` is a **label**; the repo **does not restart pods, call webhooks, or page anyone**. Security is never an auto-remediation candidate. Demo numbers move; **the gates do not**. Cousin of [jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel) (action ≠ verified outcome) / [firehose-judge](https://github.com/ragelink/firehose-judge). Treating `auto_remediate_candidate` as execution is hard-gating soft judgment. Do not merge into `examples/`. Cousin, not this sidecar.

[bias-bench](https://github.com/natemoo-re/bias-bench) is a resume-screening **fairness/calibration audit** for decision models (pinned `jev-1.13.0`). Full factorial 76 names × 8 resumes × 3 reps = **1,824** independent evaluations (Bertrand & Mullainathan / Kline, Rose & Walters design). Quoted README headline: callback decisions are **perfectly determined by resume quality (zero binary-decision name differences)**; mean-probability name gaps are **~0.4–0.6pp** — statistically detectable because the model is near-deterministic, opposite in sign to the human audit-study direction, **operationally negligible**. Quoted: **read the magnitudes, not the p-values.** One domain, one prompt; not a claim about Jev in other framings. Fairness audit for guards — **not a rh-guard ROC**. Do not invent unpublished gaps as a safety proof. Do not merge into `examples/`. Cousin, not this sidecar.

[jevusher](https://github.com/cvsgireesh/jevusher) is context-window **admission control** (token VOI gate before expensive models): J1 route, J2 skill gate, J3 memory usher, J4 tool-output filter, J5 compact, J6 stop, J7 injection screen. Quoted README failure posture: admission (J3/J4/J5) unsure → **let it in**; selection (J1/J2) unsure → **surface none**; safety (J7) unsure → **flag, never pass**. Quoted: J7 **`pass` means nothing detected, never safe to obey**; unreachable → `unavailable`, **never `pass`**. Provider outage degrades to **no lens installed, never to an empty context**. Quoted: **On small inputs these lenses lose money.** Cousin of [jevex](https://github.com/jimmyhealer/jevex) / [jev-sift](https://github.com/kbhuw/jev-sift) / [jev-routing](https://github.com/nekowasabi/jev-routing) / compaction gates. Treating a J2 catalog shrink or J7 `pass` as a hard safety envelope is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-evaluation](https://github.com/willkelly/jev-evaluation) is an **adversarial, pre-registered** Jev eval: plan written **before any request**; 28 predictions each with a falsifier; one run **123,805 requests, 138 minutes, $12.69, five failures**, all `jev-1.13.0`. Quoted README: **Twelve of twenty-five testable predictions held. Thirteen were wrong, which is the useful half.** Calibration holds in-domain (support-ticket ECE 0.075) and **fails completely outside it** (3-SAT: answers *satisfiable* for every formula). Quoted current README: **Confidence predicts whether an answer is right, but not whether the question could be answered.** Quoted PROMPTING.md: gate on confidence ≥ **0.95** still admits **47%** of unanswerable states (mostly fluent nonsense). Quoted README: **act when confident and escalate when not** **catches wrong answers and misses unanswerable inputs**. Crude `"IGNORE THE QUESTION"` moved the answer **0%**; a polite invented-supervisor sentence moved it **65%** (confidence 1.00 → 0.62). Ground truth from a solver or construction, **never from the model**. Distinct from [jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval). Soft-judgment integrity sentinel: **do not hard-gate confidence as fake safety**. Do not invent unpublished extras as a rh-guard ROC. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-bias-bench](https://github.com/Fox-Islam/jev-bias-bench) is a **one-attribute-at-a-time** Jev fairness/calibration bench: counterfactual pairs that differ in one attribute and nothing else. Quoted FINDINGS.md (20 September 2026, `jev-latest`): **11,984 calls, 52,430 answers, 666 people built from 6 anchors, 8 scenarios**. Quoted: **0 of 100** control comparisons significant. Quoted: **Do not test it by swapping names.** Quoted: **Read the deltas, not the stars.** Quoted caveats: **No build pinned.** Distinct from [natemoo-re/bias-bench](https://github.com/natemoo-re/bias-bench) (resume-screening name factorial, pinned `jev-1.13.0`). Fairness audit for guards — **not a rh-guard ROC**. `jev-latest` is a moving alias (contrast [rspamd-jev](https://github.com/rioriost/rspamd-jev) refusing that alias). Do not invent unpublished extras as a safety proof. Do not merge into `examples/`. Cousin, not this sidecar.

[aurum-gate](https://github.com/Ormus-Solutions/aurum-gate) (`@ormus/aurum-gate`) is a TypeScript **confidence-gated action router** (Jev Pattern 2): per-action floors, human escalation, refuse-below bands. Packaged export (`src/index.ts`, `package.json` `main`/`exports` → `dist/index.js`): decisions `auto` | `escalate` | `refuse`; default `autoConfidence` **0.85** is an uncalibrated product knob (same 0.85 theater as laya / jev-preflight). Quoted README: **Probability opens the door — confidence decides if gold flows automatic, or a human holds the pour.** Quoted README: tests are **mocked — no live API**. Mock router, not live Jev. Parallel non-export `src/gate.ts` is a second `AurumGate` (`ok` / `human`|`deny`|`ask`); quoted comment: **Probability is not confidence.** `index.test.ts` hits the packaged API; `gate.test.ts` hits the parallel class. **packaged export ≠ parallel gate.ts.** Treating 0.85 auto as a safety envelope is confidence theater / hard-gating soft judgment. Do not merge into `examples/`. Cousin of [jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage) / [typed-gate](https://github.com/harshpuri84/typed-gate), not this sidecar.

[quicksilver-judge](https://github.com/Ormus-Solutions/quicksilver-judge) (`@ormus/quicksilver-judge`) is a **staged PR/code pre-filter**. Packaged export (`src/index.ts`): sketch a Noul-style risk matrix, emit confidence-gated `PASS` / `HOLD` / `FAIL`. Public `sketchRisks` / `prefilter` is a **heuristic** (churn, auth, deps, labels) — **not live Jev**. Profiles: Choice `minConfidence` **0.7**, Score **0.65**. Gloss: **PASS is not a merge grant.** Parallel `src/stages.ts` (`runQuicksilver` inject-evaluate): quoted **Code owns overrides — Jev Choice is advisory when hard flags fire** (`pass`/`hold`/`escalate`, not the packaged PASS/HOLD/FAIL). **packaged heuristic ≠ live Jev.** Soft-score-as-hard-merge without calibration + escape hatch is soundness theater. Cousin of [moongate](https://github.com/brickfrog/moongate) / [jev-gate](https://github.com/totally-tim/jev-gate) / [latch](https://github.com/CaseReed/latch). Do not merge into `examples/`. Cousin, not this sidecar.

[karat-filter](https://github.com/Ormus-Solutions/karat-filter) (`@ormus/karat-filter`) is **retrieve-then-judge**: filter RAG/search hits with lightweight relevance+confidence scores before they burn context (speculative fan-out). Quoted source (`src/index.ts`): **Token overlap judge — mock stand-in for a Jev Noul (no live API).** Defaults `minRelevance` **0.45** / `minConfidence` **0.5**. Inject-a-judge path exists (`src/filter.ts`); the packaged default is not live Jev. Treating token-overlap keep as calibrated Jev or a hard safety deny is confidence theater. Cousin of [jevex](https://github.com/jimmyhealer/jevex) / [jev-sift](https://github.com/kbhuw/jev-sift) / [jevusher](https://github.com/cvsgireesh/jevusher). Do not merge into `examples/`. Cousin, not this sidecar.

[gold-assay](https://github.com/Ormus-Solutions/gold-assay) (`@ormus/gold-assay`) is a **UI proof assay**: score screenshot/OCR + DOM-as-state before an agent claims the flow worked. Quoted README: **Screenshots lie until you assay them.** Public `assay()` is substring/regex `GREEN` | `AMBER` | `RED` (`minGreen` **0.75**); a separate `assayQuestions` path is Jev-shaped, not the default. Gloss: **GREEN ≠ verified UI** (quoted README: **don't stamp GREEN on fool's gold**). Lexical GREEN is not a rh-guard ROC and not action≠verified-outcome ([jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel)). Treating GREEN as license to commit/click is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[WaynezProg/jev-kit](https://github.com/WaynezProg/jev-kit) is source-bound evidence checks plus bounded batch Jev judgments (`jev_evidence` / `jev_classify` / `jev_extract` / `jev_decide`). Distinct from [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit) (Claude PreToolUse **Airlock**). Quoted README: **A source supporting a claim does not independently prove the claim true. Confidence is not a correctness guarantee.** Quoted: **No approval gate**. Quoted: **Exit `0` does not certify task completion or claim truth.** Quoted SECURITY.md: **Do not use confidence, source support, or CLI success as an authorization boundary** (**not an authorization boundary**). Evidence-bound integrity cousin of [clear-head](https://github.com/VladyslavHontar/clear-head) — source support ≠ truth/permit. Do not merge host installers into `examples/`. Cousin, not this sidecar.

[Jev-Examiner](https://github.com/JularDepick/Jev-Examiner) is listed as "AI content moderation workflow powered by the Jev model." Empty public tree at capture (created 2026-09-20T04:30:19Z; GitHub 409 on `main`). Content-moderation cousin of [gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez) / [jevmod](https://github.com/ohernandezdev/jevmod) / [GLiGuard](https://github.com/fastino-ai/GLiGuard) / [tonedown](https://github.com/ziziphus-jujuba-zao/tonedown). Watch; do not invent a shipped moderator. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-tool-guard](https://github.com/BubbatheVTOG/pi-jev-tool-guard) (`pi-jev-tool-guard@0.1.0`) intercepts Pi `bash` / `write` / `edit` immediately before execute. Jev returns typed probabilities; **the extension owns the control flow and thresholds**. Default `evaluatorFailure: "allow"` (**fails open**); `headlessRisk: "block"`; thresholds `reviewProbability` **0.35** / `highRiskProbability` **0.7** uncalibrated. Model default `jev-latest` (moving alias, not a pin). Quoted README: **This extension is a confirmation guard, not an operating-system sandbox.** Rule lists have deterministic precedence over Jev (`protectedPaths` / `alwaysConfirmCommands` force confirmation; `allowedPaths` / `allowedCommands` bypass evaluation; confirmation rules win when both match). `disable: true` bypasses the guard. Distinct from [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) / [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) / [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) / [pi-jev-control](https://github.com/goodruizhan/pi-jev-control) / [pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel). Contrast [jevgate](https://github.com/thevibeworks/jevgate) (allowlist then Jev) and this sidecar (structural first; soft never the sole veto). Treating 0.35/0.7 as a safety envelope or fail-open as fail-closed is confidence theater. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez) is a fast Node toxicity/profanity screener powered by TypeSafe Jev (`isProfane` / `isToxic` / `screen()`). Actions `ALLOW` / `SUSPICIOUS_REVIEW` / `AUTO_CENSOR` / `AUTO_MUTE` / `AUTO_BAN`. Thresholds review **0.3** / censor **0.55** / ban **0.7** uncalibrated. No key → local heuristic; **calls never throw** (named degraded backend, same lesson as `backend: "lexical"`). Quoted 42 curated cases **97.6%** (41/42) — **not a rh-guard ROC**. Fold grading/policy-in-code only, not Twitch/Valorant demos. Cousin of [jevmod](https://github.com/ohernandezdev/jevmod) / [tonedown](https://github.com/ziziphus-jujuba-zao/tonedown) / [GLiGuard](https://github.com/fastino-ai/GLiGuard). Treating `AUTO_BAN` as a safety proof is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[jeveryword](https://github.com/jkrup/jeveryword) is Jev field extraction + PII detection + exact quotes: numbers tokens, Jev picks ids, maps to verbatim spans (`text.slice(start, end) === value`). `extractSpans` / `classifyChunks` / PII. Quoted README: **Experimental.** Small synthetic sample; **too small to support an accuracy claim**. Labels must include `none`. Confirm `p<0.8`. Quoted: untrusted input can influence which span; **cannot invent words that are not in the source**. Distinct from [WaynezProg/jev-kit](https://github.com/WaynezProg/jev-kit) `jev_extract`. Not PreToolUse. Sensitive-data / source-bound integrity cousin. Do not merge into `examples/`. Cousin, not this sidecar.

[localjev](https://github.com/githubnext/localjev) is a thin soundness-theater cousin: a local, Jev-wire-compatible `POST /v1/systemone` that prompts a chat model for JSON probability vectors. README: wire-compatible, **not** mathematically equivalent to a logit read — "The probabilities are generated/self-reported by the model rather than read directly from its logits. Evaluate their calibration on your own workload before relying on them for consequential decisions." Treating prompted JSON probs as calibrated logits for hard gates is soundness theater. One thin card only; not a new hook pack. Cousin of jev-arena / jev-ood-calibration. Not a rh-guard peer.

[laya](https://github.com/NandhaKishorM/laya) is an open System One head (typed Choice / Score / Noul). Confidence-gating recipe at **0.85** (RLCD → "statistically meaningful") is still soft. Auto-act at that uncalibrated threshold is confidence theater, especially given Khmer OOD **0.000 at 95.2% confidence** — the model's own confidence gives no warning. Future backend, not a drop-in ROC replacement for this hook. Pair with jev-ood-calibration / capability-atlas.

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

[jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) is a LoRA distill of Jev memory-relevance onto Qwen2.5-0.5B. Distill agreement is not independent gold; a student is not the hard envelope. Card: `docs/eval-integrity.md`.

[jev-triage](https://github.com/ThyFriendlyFox/jev-triage) routes unlabeled data by calibrated confidence and logs soft labels. If used as an eval filter: do not distill Jev as teacher of record — real outcome labels remain the training targets.

[jev-curate](https://github.com/ThyFriendlyFox/jev-curate) is corpus curation with Jev pass/fail gates → `curated.jsonl` vs `rejected.jsonl` (eval-data integrity). Filter with Jev; train on real outcome labels. Sibling of jev-triage (curate first, then triage). Do not treat Jev as teacher of record.

[system-one-benchmark](https://github.com/mallahyari/system-one-benchmark) is a 50-sample LMSYS toxic-chat safety eval: Jev precision 90.9% (1 FP) vs local PCD flooding FPs (16). Calibration is the eval-integrity angle; do not treat uncalibrated open PCD as a safety gate. Bounded fixture, not a rh-guard ROC.

[dinostomp](https://github.com/collapseindex/dinostomp) audits eval instruments (data / scorer / runs / claims) before you trust the score. Pointer when people hard-gate on Jev scores inside reward/eval loops: check the instrument first. Harbor/jevals-adjacent; not a rh-guard peer.

[jev-packs](https://github.com/dtduc-git/jev-packs) is an evidence-gated registry of Jev question packs: a pack is `verified` only when accuracy / ECE / cost / latency are recorded on a pinned Jev version. Every Choice and Score must offer `unknown` (mandatory abstention). Anti-soundness-theater for gate criteria: no numbers, no endorsement.

[ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev) matured: README + `action.yml` + `src/` + committed `dist/`. Jev via Vercel AI Gateway asks four typed questions (`should_review`, `risk`, `route`, `touches_secrets`); configurable thresholds route to `auto-approve` | `human-review` | `block`. Conservative default `risk_threshold_for_review: cosmetic` escalated even trivial diffs Jev called `moderate`. Timeout/Jev-failure still → human-review, never silent auto-approve. Eval-gaming surface: optimizing the four Jev questions / thresholds instead of real review quality. Watch, not an endorsement — do not hard-gate merge on a Jev auto-approve without a deterministic path floor.

[jev-pr-review](https://github.com/ohernandezdev/jev-pr-review) is a GitHub Action that scores each changed file with Jev. **Shadow-mode only** until calibrated — automerge is designed but unreachable (`mode: enforce` fails loudly; the merge path is unwritten). Hard path gates (`blocked_paths`, `max_lines`, CI) run before scores; max aggregation, never average. Calibration-first gating before any automerge. Soft judgment as sole merge authority is soundness theater. Cousin of ci-gatekeeper / jev-reviewer / prune-review.

[prune-review](https://github.com/shubhangi013/prune-review) is a cost-aware Jev gate before a generative PR reviewer: Jev scores hunks; a deterministic **safety escarpment** always keeps matching hunks whatever Jev says. Jev does not generate review comments. Cost results are not quality claims. Source preview. Cousin of jev-reviewer; not this sidecar.

[jev-intent-review](https://github.com/yottayoshida/jev-intent-review) is whole-repo intent verification beyond the diff: typed Jev judgments `VERIFIED` / `VIOLATION` / `UNKNOWN` against stated requirements — catches incomplete-change gaming (requirement misses in unchanged paths). The diff is a search hint, not the object being verified. Prefer UNKNOWN over a false VERIFIED. CLI works; GitHub Action not written yet. Watch, not an endorsement.

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
   (TOCTOU: check-then-act is not atomic). [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev)
   binds a **single-use Action Grant** to the exact tool call and consumes it
   once (replayed/expired/mutated permits fail closed). A Noul is not a permit.
   [dgp](https://github.com/numerous-com/dgp) names the same integrity
   boundary: typed assessment then application-side guarded commit;
   quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe):
   **Speculative assessments cannot authorize effects**; cache hit ≠ live
   Jev; assessors do not execute. Primary protocol fold is in Augustus;
   here capture the boundary.
   [AgentGhost](https://github.com/reddpy/AgentGhost) wraps execution so the
   model cannot opt out (`guard()` *is* the tool's execution function);
   ASK/DENY throw; default `failMode` closed. Contrast actiongate `wrapTool`
   (advisory until a gateway).
   [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) re-checks target
   and instruction snapshots before committing. `wrapTool` is not `hooks.json` — do not merge into `examples/`. Same shape as
   [jevgate](https://github.com/thevibeworks/jevgate) (allowlist proves what
   may run; Jev judges only the rest)—sibling, not a merge. See
   `references/gates.md`.
7. **Lexical / GLiClass / open System One heads are not ROC-equivalent.**
   Without `TYPESAFE_API_KEY`, the lexical fallback is **degraded**, not risk
   zero. Shared `RiskKind` ids do not make probabilities interchangeable with
   Jev. Open System One heads ([laya](https://github.com/NandhaKishorM/laya);
   [localjev](https://github.com/githubnext/localjev) prompted JSON) are future
   backends, not drop-in replacements — a 0.85 gate is still soft, and
   wire-compatible probs are not calibrated logits. Quote a number only with
   the served backend (`FALLBACK` / `backend: "lexical"`); advertised backend ≠
   served backend ([classifier-dev](https://github.com/mrmps/classifier-dev)).
   An undeclared model swap is an eval-integrity failure (advertised score ≠
   live model). Advertised screened ≠ served payload is the same failure
   ([agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) discards a
   shape-mismatched replacement without complaint). Fail-open hygiene
   ([jev-kit](https://github.com/jonathanavis96/jev-kit) "This is not a security
   control"), a system directive that is not a hard block
   ([opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate)),
   and uncalibrated compaction keepThresholds
   ([opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner))
   are not safety envelopes. AUC 0.976 and labelled-eval 100% are confidence
   theater if quoted as a rh-guard ROC. A named offline heuristic floor
   ([yolo-shell](https://github.com/riz007/yolo-shell): **no silent fail-open
   when Jev is down**) is not the same as a crash that allows. Dispatch success
   is not evidence ([jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel):
   **action ≠ verified outcome**). Advertised trajectory verification is not a
   shipped module ([apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness):
   **advertised capability ≠ shipped module**; **shadow vs live**). A design-only
   NLI prompt gate ([herdr-jev](https://github.com/muthuishere/herdr-jev)
   **Nothing here works yet**) is not a TypeSafe Jev ROC. Silent fail-open
   when Jev is down ([alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer),
   renamed from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard):
   **Tripwires never deny**; quoted **Your rules win**; quoted SECURITY.md
   **Not a security boundary**) is not
   yolo-shell's named floor. Incomplete evidence must stay `UNAVAILABLE`,
   not PASS ([pablozr/JevGuard](https://github.com/pablozr/JevGuard):
   **advertised monorepo ≠ shipped packages**). A local n-gram daemon
   branded Jev ([jevbrain](https://github.com/Synxneuos/jevbrain):
   confidence ≥ 0.80 → `AUTO_ACT` else `REVIEW_QUEUE`) is not TypeSafe Jev
   — auto-act at that uncalibrated threshold is silent-fallback /
   confidence theater. Planted defects withheld from criteria writers
   ([ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground))
   are the held-out antidote. A judge Noul is not a verified bug
   ([jev-crawlers](https://github.com/russfranky/jev-crawlers):
   **unverified lead, never a bug**; **ranking signals**, not calibrated
   confidence). Argmax without reading the probability is soundness theater
   ([typed-gate](https://github.com/harshpuri84/typed-gate): a yes/no near 0.5 is
   **declining to answer**; the 0.40–0.60 band is a refusal, not a weak yes).
   A fail-open pre-exec checker
   ([pi-jev-gate](https://github.com/fivethirty/pi-jev-gate): block if
   `choice === "block"` OR `p(block) ≥ 0.50`; **failing open**) is not this
   sidecar. Documentation-only OpenAPI can hide consumer breaks
   ([jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel):
   **documentation-only**; enforce only when breaking AND promise-violation
   ≥ 0.90). A passing CI condition is advisory
   ([if-ai](https://github.com/Victor-Casado/if-ai): **A passing if-ai check is
   advisory**; TypeSafe **67.8%** is four workflows, not PR review). A 2.8MB
   Laya distill ([nanoprune](https://github.com/dmdjr1409/nanoprune): **0.0%
   Hallucination Guaranteed** / ECE 2.58%) is not TypeSafe Jev and not a
   rh-guard ROC. Skill recommendation is not a grant
   ([hermes-switchyard](https://github.com/bgrablin/hermes-switchyard):
   **never loads the skill**; ack is **not DLP** / not authorization; 0.20
   local / 0.80 Jev uncalibrated). Soft-judgment gate middleware that
   hard-denies four Nouls at 0.5
   ([typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates):
   **27/27** / **31/31** are synthetic probes, not a rh-guard ROC; **second
   layer, not a boundary**; pattern first, judgment **never looser**; 0.5 /
   0.6 / 0.8 are starting points). Static shell Scores at `--error-on`
   ([safe-sh](https://github.com/EpicEric/safe-sh): `curl | safe-sh`;
   **never executes**) are not yolo-shell's exec floor. Confirm-as-gate paste
   routing ([jev-pastepilot](https://github.com/buberlo/jev-pastepilot):
   **Confirm is a gate, not a formality**; **Confidence is a gate, not
   proof**; **fail-opens**) is not a safety envelope. A cache hit is not
   a correctness proof
   ([jevcache](https://github.com/hyperspaceai/jevcache): **cache hit ≠
   correctness**; shared fingerprint bundles as calibrated truth /
   auto-act is trust theater). A GEPA training score is not auto-accept
   ([sutro-sh/jev-align](https://github.com/sutro-sh/jev-align): quoted
   **A higher training score never accepts a proposal automatically**;
   hard-gating that score is soundness theater). Compiled `when asked`
   guidance is not an enforced PreToolUse hook
   ([enzyme](https://github.com/byenzyme/enzyme): quoted
   **guidance compiled for your agent, not an enforced hook**;
   **catalyst similarity** is ranking, not deny/allow). Closed-world Choice
   without an escape is a forced false positive
   ([seb4ez/jevguard](https://github.com/seb4ez/jevguard): inject
   `UNRESOLVED_OR_OTHER`; flag `AMBIGUOUS_STATE` when top p < 0.40 or
   margin < 0.15). Soft CI skip without shadow is hard-gating
   ([guilhem/jev-ci-selector](https://github.com/guilhem/jev-ci-selector):
   **Measure before you skip**; `proposed_run` vs `run`). A 0–4 safety
   grade is a measurement, not a veto
   ([tonedown](https://github.com/ziziphus-jujuba-zao/tonedown): **the
   engine only measures**; 74/74 **proves the pipeline, not the model**).
   Productized moderation that fails open
   ([ohernandezdev/jevmod](https://github.com/ohernandezdev/jevmod):
   `error_open`; AUROC is a **sanity benchmark, not a leaderboard**) is
   not a rh-guard ROC. A 74-message injection demo
   ([one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe):
   **demonstration set, not a statistically powered** benchmark) is not a
   safety proof. A fail-closed allow/ask/warn ladder is not a hard deny
   list ([pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel):
   quoted **never auto-allows**; secret scrub before Jev; optional task
   pin; **Prompt injection is not solved**). Contrast fail-open pruners /
   [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Fail-open
   skill/routing overlays
   ([hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills):
   quoted **Everything fails open**; named lexical skip, not live Jev;
   Jev can only return an action id from the table;
   [hermes-skill-router](https://github.com/cdepuy/hermes-skill-router):
   local Laya **Fail-open**; inject ≠ grant; same-named trees exist)
   are not this sidecar's structural deny. Assessors do not execute
   ([dgp](https://github.com/numerous-com/dgp): **application code
   retains control**; quoted DGP `docs/TYPESAFE_JEV.md`;
   **Speculative assessments cannot authorize effects**; cache hit ≠
   live Jev). A Hermes fail-closed policy overlay that escalates to
   host approval
   ([typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate):
   quoted **not an autonomous permission slip**; uncertain/unavailable →
   Hermes approval, not allow; **cannot override** Hermes hardline;
   metadata-only audit) is not this sidecar's structural deny. A local
   jevlike catalog shrink
   ([omo-jevlike-router](https://github.com/islee23520/omo-jevlike-router):
   quoted **fail-open**; recall@24 **84.1%** / ECE ~0.10 are not a
   rh-guard ROC; **soft router ≠ hard gate**; earlier 46.2%/95.5% was an
   evaluation bug) is not a hard envelope. Guardrail bake-off numbers
   ([ishaannk/llm-vs-jev](https://github.com/ishaannk/llm-vs-jev): quoted
   **Nothing wins outright**; steerability 14.3%/10.7%) are not a
   rh-guard ROC. A Jev-compatible local replica
   ([Gestalt-Lab/jeff](https://github.com/Gestalt-Lab/jeff): quoted
   **API compatibility does not imply identical judgments**; lower ECE
   ≠ correct) is not TypeSafe Jev. A memory lease that retires facts
   on new evidence
   ([chopratejas/invalidate](https://github.com/chopratejas/invalidate):
   quoted **The memory text is never edited**; **0 false invalidations**
   / 157 is tuned on that set, not a rh-guard ROC; similarity top-k is
   never the judge) is not this sidecar. A Hermes **tool** plugin is
   not a fail-closed hook
   ([ajensenwaud/hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin):
   `jev_check` / `jev_route` / `jev_score` / `jev_evaluate`; hope the
   model looks). Semantic contract lint
   ([mizchi/jev-lint](https://github.com/mizchi/jev-lint): quoted
   **candidate for a human to judge, not a verdict**; **No shipped
   rule has `severity: error`**; distinct from huntedman/JevLint) is
   not a hard CI gate. Memory include/exclude by relevance
   ([samdotmak/jev-recall](https://github.com/samdotmak/jev-recall):
   **17/18** / **19/20** is not a safety deny). English oxlint cutoffs
   ([wobsoriano/oxlint-plugin-jev](https://github.com/wobsoriano/oxlint-plugin-jev):
   skip unless `ci: "fail"`). Adding a Claude PreToolUse hop
   ([RahulBalakavi/claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev):
   quoted **adds a 264 ms hop rather than removing one**; **0
   dangerous allowed** on a synthetic 18-case fixture; 0.85
   uncalibrated) is not a drop-in for Anthropic auto-mode. A shadow-mode
   mail classifier
   ([rspamd-jev](https://github.com/rioriost/rspamd-jev): **score 0**;
   **no auto-reject**; **unchanged score ≠ unchanged latency**;
   agreement is **not accuracy**) is not a reject envelope. A
   library-owned tool-call guardrail pack
   ([codebam/jev-guardrails](https://github.com/codebam/jev-guardrails):
   quoted **The library owns policy, not the model**; **A guardrail
   is not a sandbox**; default 0.70/0.35 uncalibrated; `jev-latest` alias (moving alias, not a pin); distinct from alsoleg89/jev-guard / pablozr/JevGuard / leepokai/jev-guard / seb4ez/jevguard) is not this sidecar's
   structural deny. A semantic CI gate that reads policy from the
   base commit
   ([brickfrog/moongate](https://github.com/brickfrog/moongate):
   quoted **Exit 0 doesn't mean the code is fine**; **unevaluated
   never counts as a pass**; 4/6 violation-vs-review on identical
   replays) is not a hard merge envelope. Log-batch labels that
   execute nothing
   ([jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage):
   quoted **Low confidence never auto-acts**;
   `auto_remediate_candidate` is a label) are not a page/restart
   grant. A resume-screening fairness audit
   ([bias-bench](https://github.com/natemoo-re/bias-bench): **1,824**
   evals; **zero binary-decision name differences**; **~0.4–0.6pp**
   mean noul; **read the magnitudes, not the p-values**) is not a
   rh-guard ROC. Context-window admission
   ([jevusher](https://github.com/cvsgireesh/jevusher): J7 **pass
   means nothing detected, never safe to obey**; outage → **no lens,
   never an empty context**) is not a safety envelope. Pre-registered
   adversarial Jev eval
   ([willkelly/jev-evaluation](https://github.com/willkelly/jev-evaluation):
   **123,805** requests; confidence ≥ **0.95** still admits **47%**
   unanswerable states; quoted **act when confident and escalate when not** **catches wrong answers and misses unanswerable inputs**; distinct from jev-baselines-eval)
   is the soft-judgment integrity sentinel — **do not hard-gate
   confidence as fake safety**. A one-attribute fairness bench
   ([Fox-Islam/jev-bias-bench](https://github.com/Fox-Islam/jev-bias-bench):
   **11,984** calls; **0/100** controls; quoted **Do not test it by
   swapping names**; **Read the deltas, not the stars**; distinct from
   natemoo-re/bias-bench) is not a rh-guard ROC. A mock confidence
   router
   ([Ormus-Solutions/aurum-gate](https://github.com/Ormus-Solutions/aurum-gate):
   packaged `src/index.ts` `auto`|`escalate`|`refuse`; default autoConfidence
   **0.85** uncalibrated; parallel `src/gate.ts` quoted **Probability is not
   confidence**; mocked, no live API)
   is not a safety envelope. A heuristic PR pre-filter
   ([Ormus-Solutions/quicksilver-judge](https://github.com/Ormus-Solutions/quicksilver-judge):
   packaged `sketchRisks` `PASS`|`HOLD`|`FAIL` not live Jev; Gloss: **PASS
   is not a merge grant**; parallel `src/stages.ts` quoted **Code owns
   overrides**) is not this sidecar's
   structural deny. A retrieve-then-judge RAG filter
   ([Ormus-Solutions/karat-filter](https://github.com/Ormus-Solutions/karat-filter):
   quoted **Token overlap judge — mock stand-in for a Jev Noul**;
   0.45/0.5 defaults) is not calibrated Jev. A UI proof assay
   ([Ormus-Solutions/gold-assay](https://github.com/Ormus-Solutions/gold-assay):
   quoted **Screenshots lie until you assay them**; public assay is
   substring/regex; Gloss: **GREEN ≠ verified UI**) is not a commit grant.
   Source-bound evidence tools
   ([WaynezProg/jev-kit](https://github.com/WaynezProg/jev-kit): quoted
   **Confidence is not a correctness guarantee**; **Exit 0 does not
   certify**; SECURITY.md **not an authorization boundary**; distinct
   from jonathanavis96/jev-kit Airlock) are not a hard envelope. An empty-tree content-moderation listing
   ([Jev-Examiner](https://github.com/JularDepick/Jev-Examiner): GitHub description only;
   **empty public tree at capture**) is not a shipped moderator. A Pi confirmation guard
   ([BubbatheVTOG/pi-jev-tool-guard](https://github.com/BubbatheVTOG/pi-jev-tool-guard): quoted
   **confirmation guard, not an operating-system sandbox**; default `evaluatorFailure: "allow"`
   fail-open; 0.35/0.7 uncalibrated; distinct from pi-jev-guard / pi-jev-gate / pi-jev-approver /
   pi-jev-sentinel) is not this sidecar's structural deny. A Node toxicity screener
   ([ItisShikhar/gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez): 41/42 **not a rh-guard ROC**;
   named heuristic when no key; treating `AUTO_BAN` as a safety proof is confidence theater) is not
   a reward-hack gate. Source-bound PII/quotes
   ([jkrup/jeveryword](https://github.com/jkrup/jeveryword): `text.slice(start, end) === value`; quoted
   **cannot invent words that are not in the source**; distinct from WaynezProg `jev_extract`; not PreToolUse)
   are not a hard envelope. Soft floors / AMBIGUOUS / p<0.5 are
   **not** hard gates. [Archer](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
   is still **promised-not-landed**. Do not treat
   [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) as Archer.
   There is
   **no public Jev reward-hack ROC**.

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
- Advertised scorer ≠ live model is an eval-integrity failure. This sidecar names `backend`; silent undeclared fallback is the [classifier.dev](https://github.com/mrmps/classifier-dev) lesson (`FALLBACK` digest marker). Advertised screened ≠ served payload is the [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) silent replacement discard.
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
- Additive Claude PreToolUse permission gate (OpenRouter Jev; 0 dangerous allowed on synthetic fixture; adds a 264 ms hop): [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev)
- Browser-agent Jev-vs-baseline eval (benign + injected): [jev-agent-safety-arena](https://github.com/mjyoke1111/jev-agent-safety-arena)
- Model+effort router (not a safety gate): [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router)
- CI merge-gate (infra `Gate: PASS` vs real `Gate: BLOCK`): [latch](https://github.com/CaseReed/latch)
- Stop-hook claims vs session evidence (`CONTRADICTED` / `UNSUPPORTED`): [clear-head](https://github.com/VladyslavHontar/clear-head)
- PR policy rules enforced by Jev (watch): [jev-marshal](https://github.com/LightningK0ala/jev-marshal)
- Fail-open wake gate (skip only if Jev answers and p < 0.2): [wakegate](https://github.com/shitianfang/wakegate)
- Plain-English PR condition checks (passing is advisory; 67.8% is not PR review): [if-ai](https://github.com/Victor-Casado/if-ai)
- oh-my-pi `safe`/`ask`/`unsafe` classifier: [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode)
- OMP/pi acceptance gating + subagent routing (fail-open): [omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions)
- Measured OMP approval-gate (graded allow; default 0/94 unsafe; operator owns the risk dial): [omp-greenlight](https://github.com/SemetricLabs/omp-greenlight)
- Effect-based OpenCode/agy shell gate (Privilege Is Not a Verdict; 0 dangerous allowed for Jev): [construct-auto-classifier](https://github.com/godspede/construct-auto-classifier)
- Runtime tool authorization (Jev supplies evidence. Code owns authority; Schema-valid ≠ intent-matched; single-use Action Grant; replayed/expired permits fail closed; wrapTool ≠ hooks.json): [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev)
- Intent-aware SDK wrap (AgentGhost *is* the tool's execution function; ASK/DENY throw so approval cannot be silently skipped; default failMode closed): [AgentGhost](https://github.com/reddpy/AgentGhost)
- Pi constraint integrity across compaction (instruction-drift / reward-hack; Jev never writes policy): [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed)
- Pi edit/write content-judge vs Markdown rules (informative default; 0.85 uncalibrated; soundness theater if treated as a hard gate): [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard)
- Pi control plane, not a content-judge (deterministic tool-gate + Jev; GUI never force-click): [pi-jev-control](https://github.com/goodruizhan/pi-jev-control)
- Optional PreToolUse `jev_gate` (deny/ask only; fails open; only ever tightens; 12/12 is not a safety proof): [jev-use](https://github.com/shitianfang/jev-use)
- MCP VOI admission (`codebase_investigate`; what to read; shortlist-as-hard-gate risk): [jevex](https://github.com/jimmyhealer/jevex)
- Jev-gated commit-msg (calibration-first; fail-open on check failure; middle band is review): [commitjev](https://github.com/yodablocks/commitjev)
- Codex Jev proxy (LICENSE-only public tree at capture): [jev-runway](https://github.com/IPECTER/jev-runway)
- Pi verbatim compaction (keep-windows before Jev; fail-open to LLM summary; 0.5 uncalibrated): [pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact)
- Hermes host adapter (shadow default; cannot grant permission; contrast jev-decisions / hermes-jev-router / ajensenwaud tools): [hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev)
- Hermes typed decision **tools** (`jev_check` / `jev_route` / `jev_score` / `jev_evaluate`; hope the model looks): [hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin)
- Memory lease/invalidation (never edits text; 0/157 tuned on that set, not a ROC): [invalidate](https://github.com/chopratejas/invalidate)
- Semantic contract linter (candidate, not a verdict; no shipped `severity: error`; distinct from huntedman/JevLint): [jev-lint](https://github.com/mizchi/jev-lint)
- Memory include/exclude by relevance not resemblance (17/18 not a safety deny): [jev-recall](https://github.com/samdotmak/jev-recall)
- English oxlint rules → Jev cutoffs (skip unless `ci: "fail"`): [oxlint-plugin-jev](https://github.com/wobsoriano/oxlint-plugin-jev)
- Shadow-mode Rspamd spam eval (score 0; no auto-reject; agreement ≠ accuracy): [rspamd-jev](https://github.com/rioriost/rspamd-jev)
- Jev-backed tool-call guardrails + OpenCode/Hermes/DSH hooks (library owns policy; not a sandbox; distinct from alsoleg89/jev-guard / pablozr/JevGuard / leepokai/jev-guard / seb4ez/jevguard): [jev-guardrails](https://github.com/codebam/jev-guardrails)
- Semantic CI gate (base-commit policy; unevaluated never pass; Exit 0 ≠ fine): [moongate](https://github.com/brickfrog/moongate)
- Log-batch act/no-act (nothing executed; auto_remediate_candidate is a label): [jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage)
- Resume-screening fairness/calibration audit (1,824 evals; zero binary name gaps; read magnitudes): [bias-bench](https://github.com/natemoo-re/bias-bench)
- Context-window admission (token VOI; J7 pass ≠ safe to obey; outage → no lens): [jevusher](https://github.com/cvsgireesh/jevusher)
- Adversarial pre-registered Jev eval (123,805 requests; confidence ≥ 0.95 still admits 47% unanswerable): [jev-evaluation](https://github.com/willkelly/jev-evaluation)
- One-attribute fairness/calibration bench (11,984 calls; 0/100 controls; Do not test it by swapping names): [jev-bias-bench](https://github.com/Fox-Islam/jev-bias-bench)
- Confidence-gated action router (packaged src/index.ts auto|escalate|refuse; 0.85 uncalibrated mock; parallel gate.ts Probability is not confidence): [aurum-gate](https://github.com/Ormus-Solutions/aurum-gate)
- Staged PR/code pre-filter (packaged sketchRisks PASS|HOLD|FAIL not live Jev; Gloss: PASS is not a merge grant; parallel stages.ts Code owns overrides): [quicksilver-judge](https://github.com/Ormus-Solutions/quicksilver-judge)
- Retrieve-then-judge RAG/search filter (Token overlap judge; mock stand-in for a Jev Noul): [karat-filter](https://github.com/Ormus-Solutions/karat-filter)
- UI proof assay (Screenshots lie until you assay them; Gloss: GREEN ≠ verified UI): [gold-assay](https://github.com/Ormus-Solutions/gold-assay)
- Source-bound evidence tools (Confidence is not a correctness guarantee; not an authorization boundary; distinct from Airlock): [WaynezProg/jev-kit](https://github.com/WaynezProg/jev-kit)
- Empty-tree content-moderation workflow (GitHub description only; do not invent a shipped moderator): [Jev-Examiner](https://github.com/JularDepick/Jev-Examiner)
- Pi bash/write/edit confirmation guard (extension owns control flow; fail-open; not an OS sandbox): [pi-jev-tool-guard](https://github.com/BubbatheVTOG/pi-jev-tool-guard)
- Node toxicity/profanity screener (41/42 not a rh-guard ROC; AUTO_BAN is not a safety proof): [gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez)
- Jev field extraction + PII + exact quotes (verbatim spans; cannot invent words not in the source): [jeveryword](https://github.com/jkrup/jeveryword)
- Multi-host Go harness (not MCP; drop/truncate without summarizing; Choice+Noul; 1 schema; strip thinking; not jev-routing-mcp): [jev-routing](https://github.com/nekowasabi/jev-routing)
- Silent FALLBACK model-swap (advertised backend ≠ served backend; F1 0.546 vs ~0.800): [classifier-dev](https://github.com/mrmps/classifier-dev)
- Calibrated PR-review gate (Action + CLI + OpenCode; soft-score-as-hard-rank; need calibration + escape hatch): [jev-gate](https://github.com/totally-tim/jev-gate)
- Claude PreToolUse Art Director (warden-as-hard-gate; attention≠verdict; escalate vs block): [claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden)
- Claude PreToolUse Airlock (code first; fail-open hygiene; not a security control; `[airlock-ok:]` / retry loop): [jev-kit](https://github.com/jonathanavis96/jev-kit)
- Dual-gate MCP/hook screen (calls before run AND results before the agent reads; silent replacement discard): [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone)
- OpenCode ask-before-act (system directive, not a hard block; hope the model asks): [opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate)
- OpenCode context-hook compaction (fast-jev-compaction port; keepThreshold 0.15 vs 0.5; request view only): [opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner)
- Destructive-shell interceptor (~2ms fast-path + Jev + 40-rule offline floor; no silent fail-open when Jev is down; YOLO_BYPASS): [yolo-shell](https://github.com/riz007/yolo-shell)
- HA gate + readback (Command sent ≠ state confirmed; action ≠ verified outcome): [jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel)
- Herdr prompt-path gate via openjev NLI (design; Nothing here works yet): [herdr-jev](https://github.com/muthuishere/herdr-jev)
- jev-harness rebrand (shadow vs live; advertised capability ≠ shipped module; 0.85 uncalibrated): [apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness)
- Claude PreToolUse three-judge + PostToolUse injection sentinel (renamed from alsoleg89/jev-guard; Tripwires never deny; Your rules win; Not a security boundary; fail-open): [alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer)
- Semantic policy engine (attributed diff + local gate; UNAVAILABLE on incomplete evidence; advertised monorepo ≠ shipped packages): [pablozr/JevGuard](https://github.com/pablozr/JevGuard)
- Synthetic verify-criteria cases (planted defect withheld from criteria writers): [ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground)
- Local n-gram attention firewall (AUTO_ACT at 0.80 else REVIEW_QUEUE; not TypeSafe Jev; silent-fallback if mis-calibrated): [jevbrain](https://github.com/Synxneuos/jevbrain)
- Judge/verify crawler nodes (unverified lead, never a bug; ranking signals, not calibrated confidence): [jev-crawlers](https://github.com/russfranky/jev-crawlers)
- Probability≠argmax field gate (0.40–0.60 band is refusal; argmax only omitted 25): [typed-gate](https://github.com/harshpuri84/typed-gate)
- Pi fail-open pre-exec checker (block if choice===block OR p(block)≥0.50; failing open): [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate)
- OpenAPI docs-only consumer-break sentinel (enforce at 0.90 breaking AND promise-violation): [jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel)
- Cheap 2.8MB Laya-distill front gate (0.0% Hallucination Guaranteed theater; ECE 2.58%): [nanoprune](https://github.com/dmdjr1409/nanoprune)
- Hermes skill selection under policy (never loads the skill; ack is not DLP): [hermes-switchyard](https://github.com/bgrablin/hermes-switchyard)
- LangChain/Deep Agents middleware (four Nouls at 0.5 HELD; pattern first never looser; weakened-spec review; 27/27 not a ROC): [typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates)
- Paste confirm-gate (injection Noul; Confidence is a gate, not proof; fail-opens): [jev-pastepilot](https://github.com/buberlo/jev-pastepilot)
- Decision ledger (cache hit ≠ correctness; shared fingerprint bundles as calibrated truth / auto-act is trust theater): [jevcache](https://github.com/hyperspaceai/jevcache)
- GEPA human-align loop (never auto-accepts on training score; hard-gating that score is theater): [sutro-sh/jev-align](https://github.com/sutro-sh/jev-align)
- Markdown knowledge compile (`when asked` compiled guidance, not an enforced hook; catalyst similarity is ranking, not deny/allow): [enzyme](https://github.com/byenzyme/enzyme)
- Production integrity runtime (UNRESOLVED_OR_OTHER escape; AMBIGUOUS_STATE on flat margin; SHA-256 cache still not correctness): [jevguard](https://github.com/seb4ez/jevguard)
- CI task selection (shadow default; Measure before you skip; proposed_run vs run; do not hard-skip): [jev-ci-selector](https://github.com/guilhem/jev-ci-selector)
- Multilingual 0–4 safety grading (the engine only measures; proves the pipeline, not the model): [tonedown](https://github.com/ziziphus-jujuba-zao/tonedown)
- Productized moderation (fails open error_open; AUROC is a sanity benchmark, not a leaderboard): [jevmod](https://github.com/ohernandezdev/jevmod)
- Prompt-injection defense eval (demonstration set, not a statistically powered benchmark; Real Jev API): [one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe)
- Pi fail-closed integrity gate (allow/ask/warn; never auto-allows; secret scrub; task pin; Prompt injection is not solved): [pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel)
- Hermes skill pack (Everything fails open; named lexical skip not live Jev; safe action tables; dropped_injection_ids; Shadow first; not hermes-jev-router / jev-kit Airlock): [hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills)
- Local Laya skill inject (user-message channel; Fail-open; Accuracy is ~good, not perfect; inject ≠ grant; same-named trees exist): [hermes-skill-router](https://github.com/cdepuy/hermes-skill-router)
- Guarded commit/authorization boundary (assessors do not execute; DGP TYPESAFE_JEV.md not TypeSafe; cache hit ≠ live Jev): [dgp](https://github.com/numerous-com/dgp)
- Hermes fail-closed tool-call policy gate (not an autonomous permission slip; uncertain → Hermes approval; metadata-only audit): [typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate)
- Local jevlike OmO skill router (fail-open; recall@24 84.1%; soft router ≠ hard gate): [omo-jevlike-router](https://github.com/islee23520/omo-jevlike-router)
- Controlled LLM-vs-Jev guardrailing bake-off (Nothing wins outright; distinct from TeoMastro demo): [llm-vs-jev](https://github.com/ishaannk/llm-vs-jev)
- Local open-weight Jev-compatible fact-check (API compatibility ≠ identical judgments; light cross-note): [jeff](https://github.com/Gestalt-Lab/jeff)
- Wire-compatible prompted JSON probs (not logits; evaluate calibration before consequential decisions): [localjev](https://github.com/githubnext/localjev)
- Open System One head (0.85 still soft; Khmer 0.000 at 95.2% conf): [laya](https://github.com/NandhaKishorM/laya)
- Agent action guardrail (Jev never grants authority that policy denied; threshold replay): [turnstile](https://github.com/zyphr-labs/turnstile)
- Formal consensus around a probabilistic oracle (Never confidently wrong; escalate-not-guess): [jev-labs](https://github.com/copyleftdev/jev-labs)
- Advance gate + coverage ledger (Hiding escalations is a product lie; mint ≠ product brain): [seal](https://github.com/Reasonofmoon/seal)
- Pre-execution tool-call gate (`allow` / `block` / `review`; fail-safe): [toolgate](https://github.com/fdemir/toolgate)
- Attention-priority PR overlay (P0 expand; never "blocked as unsafe"): [jev-reviewer](https://github.com/egma-ai/jev-reviewer)
- Static shell analysis with Jev (`curl | safe-sh`; `--error-on`; never executes; secrets-shaped Scores): [safe-sh](https://github.com/EpicEric/safe-sh)
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
- Skill/MCP supply-chain scanner (static + Jev; Unflagged ≠ certified safe): [jev-security-scan](https://github.com/win4r/jev-security-scan)
- Hermes pre-tool reviews (advisory; JEV_ENABLE_HOOKS; failed review grants no permission): [jev-decisions](https://github.com/bojansandhaus/jev-decisions)
- LangGraph Jev vs LLM guardrails (96.8%; classify accuracy is not a safety proof): [jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router)
- LoRA distill of Jev memory-relevance (student is not the hard envelope): [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b)
- Soft-label eval filter (do not distill Jev as teacher of record): [jev-triage](https://github.com/ThyFriendlyFox/jev-triage)
- Corpus curation with Jev pass/fail gates (`curated.jsonl` / `rejected.jsonl`; eval-data integrity): [jev-curate](https://github.com/ThyFriendlyFox/jev-curate)
- toxic-chat safety eval (Jev 90.9% precision / 1 FP; do not treat uncalibrated PCD as a safety gate): [system-one-benchmark](https://github.com/mallahyari/system-one-benchmark)
- Eval-instrument audit (check the instrument first): [dinostomp](https://github.com/collapseindex/dinostomp)
- Evidence-gated question packs (mandatory `unknown`; no numbers, no endorsement): [jev-packs](https://github.com/dtduc-git/jev-packs)
- CI PR-triage gate (`should_review` / `risk` / `route` / `touches_secrets`; threshold gaming surface; watch): [ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev)
- Changed-file Jev scores in CI (shadow-mode only until calibrated; calibration-first before automerge; soundness theater): [jev-pr-review](https://github.com/ohernandezdev/jev-pr-review)
- Cost-aware Jev gate before generative PR review (safety escarpment): [prune-review](https://github.com/shubhangi013/prune-review)
- Whole-repo intent vs requirements (`VERIFIED` / `VIOLATION` / `UNKNOWN`; diff is a search hint; incomplete-change gaming): [jev-intent-review](https://github.com/yottayoshida/jev-intent-review)
- Pre-registered eval + same-day errata (claim vs evidence): [jev-baselines-eval](https://github.com/ickma2311/jev-baselines-eval)
- Verbatim fact ledger scored for relevance (0/4 recall; hope the model looks): [jev-carryforward](https://github.com/Dharundp6/jev-carryforward)
- Measured negative result (no quality-equivalent Jev PDF payoff): [databricks-jev-pdf-lab](https://github.com/laurentfabre/databricks-jev-pdf-lab)
- Official TypeSafe contracts: [typesafe-ai/skills](https://github.com/typesafe-ai/skills)
