# Structural vs Jev vs channel failure

Use this card when choosing a gate. Policy still lives in `src/lib/risk/`.

## Order of operations

1. Structural detectors on the hook event (paths, argv, diffs).
2. If a deny-kind structural hit is already at threshold, **skip Jev** and deny.
3. Otherwise one System One request (digested command, backticked paths,
   unified-diff summary; no agent self-justification).
4. If the key is missing or Jev errors, lexical / GLiClass-shaped labels.
   Treat that backend as **degraded**.
5. Code fuses labels. Choice, severity, and `control_falsifier_named` cannot
   cancel a hazard and cannot independently deny.

That order is the same shape as [jevgate](https://github.com/thevibeworks/jevgate):
an allowlist proves what may run; Jev judges only the rest. Hard envelope owns safety; soft judgment is never the sole veto (fail-open: it cannot block). jevgate is a
sibling CLI, not this sidecar. Do not merge the products.

[gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) names the opposite envelope default on a different job (Claude context compaction, not reward-hack detection): extractive character-offset spans, not generated summaries; uncertain/invalid → fail-closed `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Soft model never rewrites mutating or unknown shell. Sibling, not this sidecar.

[jev-compactor](https://github.com/edwardyen724-g/jev-compactor) is verbatim compaction plus safety gating: **Jev judges relevance. Code decides structure.** A regex floor in code flags destructive patterns whatever Jev later says. Keep a deterministic floor under Jev. Not a rh-guard peer.

[Abide](https://github.com/coldteadotai/abide) is the same envelope on a
different job: linters own checkable rules; Jev scores residual soft
project instructions on the diff; fail-open; banded confidence (repair /
note / silence). Soft judgment is never the sole hard veto. Sibling, not
a merge, and not a reward-hack detector.

[pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) is structural-first on Pi bash with the opposite envelope default: `commandRules` deny is a hard block; missing `TYPESAFE_API_KEY` fails closed. Contrast jevgate's fail-open rest (it cannot block). Sibling, not this sidecar.

[wakegate](https://github.com/shitianfang/wakegate) is the fail-open wake-gate contrast: skip a wakeup only when Jev answers and puts less than 0.2 on wake; error, no key, and unsure all wake. Opposite default from pi-jev-approver fail-closed. Not a reward-hack detector.

[toolgate](https://github.com/fdemir/toolgate) is a pre-execution allow / block / review gate: error or timeout stops the call (fail-safe). Distinct from [ndolinschi/toolgate](https://github.com/ndolinschi/toolgate). Eval CLI is given → expected → actual; only given reaches Jev. Cousin, not this sidecar.

[jev-reviewer](https://github.com/egma-ai/jev-reviewer) is a local PR overlay: Jev P0/P1/P2 attention (P0 expanded; P1/P2 collapsed). Attention is not a correctness verdict; never equate P0 with blocked as unsafe. Soft-judgment UX, not a merge gate. Cousin, not this sidecar.

[safe-sh](https://github.com/EpicEric/safe-sh) is static shell analysis with Jev (tree-sitter bash chunks; never executes). README: replace `sh`/`bash` with `safe-sh` (`curl … | safe-sh`); `--warn-on` / `--error-on` own the hard exit. Scores include credential/exfil-shaped questions — shell/secrets judgment **before** a hard deny, still not execution. Contrast yolo-shell (exec interceptor + local floor) and toolgate fail-safe pre-exec. Same extract-then-Jev layering as jevscan. Weakened-test review lives on [typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates), not here. Gate-adjacent; not a reward-hack detector.

[interlock](https://github.com/somoore/interlock) is a capability kernel: Jev is a sensor; policy in code decides allow / ask / block. Canaries + closed action space; secrets never enter the agent. Critique of post-hoc "is this dangerous?" firewalls with real secrets still in scope. 38-case regression suite (not a blind paper). Soft judgment is never the envelope. Cousin, not this sidecar.

[port-cleanup](https://github.com/epiphany-dynamics/port-cleanup) is a gate UX exemplar: human confirms irreversible stop; shields override Jev; identity re-check before SIGTERM; app-owned explanation text, not model prose. Never auto-kills. Cousin, not this sidecar.

[jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane) is a typed control plane: fraud/security force a human path even when the classifier predicts routine; after the plane fixes the action, the LLM cannot add routes or tools. Same structural-first shape. Cousin, not this sidecar.

[cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode) is a Command Code auto-permission gate: `beforeToolCall` after the host permission check; policy `decide` in code (`allow` / `deny` / `escalate`). `within_scope ≤ 0.25` is out of scope (deny). Escalation always goes to a human, never back to the model. Default `auto-fail-closed` true. Jev is a sensor; policy in code owns the verdict. Do not merge into `examples/`. Cousin, not this sidecar.

[omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) is an Oh My Pi / pi-coding-agent adapter: `jev_acceptance_gate` plus `jev_route`. Fail-open, never fail-catch. Gate-host adapter; do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[omp-greenlight](https://github.com/SemetricLabs/omp-greenlight) is a measured OMP approval-gate (default 0/94 unsafe). The operator owns the risk dial; the plugin never tunes its own threshold. Graded allow, not hard deny. Permission ≠ probability. Cousin, not this sidecar.

[construct-auto-classifier](https://github.com/godspede/construct-auto-classifier) is an effect-based OpenCode / Antigravity (`agy`) shell PreToolUse gate: structural fast-deny/fast-allow first, then Jev Choice plus nine independent risk Nouls (`data_loss`, …). Allow only if choice is `allow` at `jev.minConfidence` (0.6) and every risk is below `jev.riskThreshold` (0.7). Certified **0 dangerous** commands allowed for Jev; chat LLMs all leaked. Operator owns the dial. Privilege Is Not a Verdict. Pair with dinostomp before hard-gating on those scores. Do not merge into `examples/`. Cousin, not this sidecar.

[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) is runtime tool-call authorization before side effects: deterministic policy owns `ALLOW` / `REVIEW` / `BLOCK`; Jev supplies evidence. **Jev supplies evidence. Code owns authority.** A positive model score never overrides a deterministic security failure. **Schema-valid ≠ intent-matched.** Enforced `ALLOW` issues a **single-use Action Grant** bound to the exact tool call; replayed, expired, mutated, and unknown permits fail closed. A Noul is not a permit. Early public MVP; current SDK `wrapTool` is advisory until a gateway. Quoted threat model: **Proxies isolate only when the upstream endpoint is not otherwise routable, which is a network property and not a cryptographic one.** MCP/HTTP proxies exist as Isolate path; wrapTool remains advisory until that holds. No Claude/Cursor hook pack — do not merge into `examples/`. Compose with construct-auto-classifier and jev-lens. Cousin, not this sidecar.

[AgentGhost](https://github.com/reddpy/AgentGhost) (`@agentghost/sdk`) is intent-aware `ALLOW` / `ASK` / `DENY` wrap around tool execution. Deterministic rules first; Jev judge; `ASK`/`DENY` throw so an approval cannot be silently skipped; default `failMode: "closed"`. README: AgentGhost *is* the tool's execution function — the model cannot opt out. Contrast actiongate `wrapTool` (advisory until a gateway) and jev-use fail-open. Jev `ALLOW` is still soft. Do not merge into `examples/`. Cousin, not this sidecar.

[turnstile](https://github.com/zyphr-labs/turnstile) is an agent action guardrail: deterministic policy then Jev, with receipts and threshold replay. **Jev never grants authority that policy denied.** Same doctrine as actiongate-jev. Observe-mode default; do not merge into `examples/`. Cousin, not this sidecar.

[pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) persists user constraints across tool calls and context compaction and checks every side-effecting call against what the user said (anti instruction-drift). Jev never writes policy; code owns the ledger and the block. Shadow by default; fail-open. Complementary to jev-carryforward 0/4. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) is a Pi `edit`/`write` content-judge against Markdown rules. Default informative (advisory); enforcement blocks. Malformed config fails closed. `onUnavailable` block / `onUncertain` warn in enforce. Default `violationThreshold` 0.85 is uncalibrated — soundness theater if treated as a hard gate. Informative first before enforcement. Shell and other agents bypass. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-control](https://github.com/goodruizhan/pi-jev-control) is a Pi control plane, not a content-judge. Deterministic tool-gate fast path + Jev for uncertain ops. Graceful degradation; GUI `unknown` never force-click. Control-plane vs content-judge (pi-jev-guard / pi-heed / hermes-jev-router). Do not merge into `examples/`. Cousin, not this sidecar.

[jev-use](https://github.com/shitianfang/jev-use) `jev_gate` is an optional PreToolUse risk check: deny/ask only, fails open. Install does not enable the gate. Only ever tightens. Treat confidence calibration as a training claim. 12/12 gate fixture is not a safety proof. `escalate: true` when Jev can't decide. Do not merge into `examples/`. Cousin, not this sidecar.

[jevex](https://github.com/jimmyhealer/jevex) is MCP VOI admission (`codebase_investigate`): Jev ranks a shortlist of files to read. README does not document fail-open vs fail-closed on Jev error. Soft-score-as-hard-gate risk: treating the shortlist as the only files that exist. Cousin of jev-sift / jev-carryforward 0/4. Do not merge into `examples/`. Cousin, not this sidecar.

[commitjev](https://github.com/yodablocks/commitjev) is a Jev-gated commit-msg hook. Calibration-first (`calibrate.py`) before trusting thresholds. Hook blocks only on a warning; check failure is not a reason to refuse (fail-open). Middle band is "review", never rounded. Calibrate / shadow before a hard push block. Cousin of jev-pr-review. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-runway](https://github.com/IPECTER/jev-runway) is a Codex Jev proxy (GitHub description only; LICENSE-only public tree at capture). Host-adapter cousin of slo-router / jev-routing. Do not invent authorization mechanics. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact) is Pi verbatim compaction: keep-windows/pins before Jev; fail-open to the built-in LLM summarizer. Default `keepThreshold` 0.5 is uncalibrated; dropped calls are gone for good. Complementary to pi-heed / carryforward 0/4. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) is a Hermes host adapter. Shadow default. **It cannot grant permission.** Missing key: plugin inactive. Timeouts: Jev abstains. Contrast jev-decisions (advisory reviews) and hermes-jev-router (model-route / skip-main-model). Same-named Mrmimee tree is a tool plugin, not a hook adapter. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-routing](https://github.com/nekowasabi/jev-routing) is a single Go binary harness (explicitly **not an MCP server**): drop/truncate tool results **without summarizing**, then Jev Choice(next tool)+Noul(done) in parallel, then rewrite `tools[]` to 1 schema, then strip thinking. Default `filter`; `forced` only with a verified real Jev answer. No key → on-device classifier. Distinct from [nekowasabi/jev-routing-mcp](https://github.com/nekowasabi/jev-routing-mcp). Advisory filter vs hard route. Cousin of slo-router / pi-jev-control. Do not merge into `examples/`. Cousin, not this sidecar.

[classifier-dev](https://github.com/mrmps/classifier-dev) is an eval-integrity cousin, not a gate: advertised backend ≠ served backend. Silent FALLBACK (`granite-4.0-h-micro` at F1 **0.546** vs advertised ~**0.800**). Digest now marks `FALLBACK`; `eval/bench.py` measures a model offline before it ships. Quote numbers only with digest/`FALLBACK` markers; do not hard-gate on undeclared-fallback confidence. **undeclared fallback = eval integrity failure**; advertised score ≠ live model. Not a rh-guard peer.

[jev-gate](https://github.com/totally-tim/jev-gate) is a calibrated PR-review gate (Action + CLI + OpenCode). **soft-score-as-hard-rank**: require calibration evidence + `--no-gate` / human override before a hard merge. Distinct from thevibeworks/jevgate. Not choxos/jev-reviewer. Do not merge into `examples/`. Cousin, not this sidecar.

[claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden) is a Claude PreToolUse Art Director: quality ≥ 80% or exit 2. **attention≠verdict** / **warden-as-hard-gate**. Escalate taste/quality; block only eval-asset / structural. Do not merge `warden.js` into `examples/`. Cousin, not this sidecar.

[jev-kit](https://github.com/jonathanavis96/jev-kit) is a Claude PreToolUse **Airlock**: code pre-filter first; Jev only for the ambiguous half; fail-open. Deny needs confidence ≥ 0.8 and margin ≥ 0.4. Quoted README: **"This is not a security control."** Gaming: `[airlock-ok:]` override; loop protection never denies the same call twice in ten minutes. Labelled-eval 100% / A/B zero denies are not a rh-guard ROC. Belay is anti-done-without-reading. Treating fail-open hygiene Jev as a hard safety envelope is confidence theater / hard-gating soft judgment as "safety." Do not merge into `examples/`. Cousin, not this sidecar.

[agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) is a dual-gate MCP proxy plus Claude hooks: screen tool calls **before they run** and results **before the agent reads**. Shadow / enforce / strict; never auto-approves. InjecAgent AUC **0.976** is not a safety proof. A shape-mismatched replacement is **discarded without complaint** (advertised screened ≠ served payload; silent FALLBACK cousin). Distinct from [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness) (quoted **Filtering is a routing decision, never destruction**; quoted **Jev failures fail open**). Do not merge into `examples/`. Cousin, not this sidecar.

[opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate) is an OpenCode `context` hook: four Nouls; `isWorkThreshold` 0.5 / `dimensionThreshold` 0.75 inject a system directive to ask and not start tool calls this turn. **The gate is a system directive, not a hard block.** Hope the model asks (jev-carryforward 0/4). Treating that soft inject as a safety veto is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner) is an OpenCode port of [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) via the `context` hook. Keep/truncate/drop applies to the **request view**; persisted history is never modified. Default `keepThreshold` **0.15** vs upstream **0.5**. Measured `removedMessages` **282** is not a quality claim. Dropping results can erase eval evidence. Do not merge into `examples/`. Cousin, not this sidecar.

[yolo-shell](https://github.com/riz007/yolo-shell) is a destructive-shell interceptor: ~2ms local fast-path, then Jev with a 200ms deadline, then a 40-rule deterministic engine. **no silent fail-open when Jev is down.** Crash / unexpected exit still allows. `YOLO_BYPASS=1` and `yolo ` skip the gate. Treating the Jev `action` Choice as the sole veto without the local floor is soundness theater. Do not merge zsh/bash/fish hooks into `examples/`. Cousin, not this sidecar.

[jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel) is HA gate + readback: Jev recommends; policy in code; **Command sent ≠ state confirmed**; **action ≠ verified outcome**. Review is shadow. Unavailable ≠ success. Attention ≠ verdict. Do not merge into `examples/`. Cousin, not this sidecar.

[herdr-jev](https://github.com/muthuishere/herdr-jev) is a Herdr prompt-path gate via openjev NLI. Soft permission/gate that **owns** the submit path. Quoted README: **Nothing here works yet.** Distinct from TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness) is a rebrand of [jev-harness](https://github.com/AntonioCoppe/jev-harness) (`src/` SHA identical). README trajectory verification is **advertised capability ≠ shipped module**. Real pattern: **shadow vs live** (`shadow_noop` / `intendedAction`). Example 0.85 is uncalibrated. Distinct from [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness) (pre-model tool-result filter). Fold gate/eval-integrity only. Do not merge into `examples/`. Cousin, not this sidecar.

[alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer) (renamed from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard)) is a Claude PreToolUse **four-judge** (shell / edits / MCP / Web URLs) + PostToolUse injection sentinel. Web URLs: deterministic; a hit is a **deny**. **Tripwires never deny** (only block auto-allow). Fail-open (no key / timeout → silent; `fail=ask` never fail-to-allow). Quoted README: **Your rules win.** Quoted SECURITY.md: **Not a security boundary.** `on` skips auto-mode classifier (use `guard`). Pin `jev-1.13.0`. Author-labelled **0/148** dangerous shell auto-allowed — not a rh-guard ROC. Distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard) and [pablozr/JevGuard](https://github.com/pablozr/JevGuard). Contrast yolo-shell named floor. Do not merge `bouncer.py` into `examples/`. Cousin, not this sidecar.

[pablozr/JevGuard](https://github.com/pablozr/JevGuard) is a semantic policy engine: attributed turn + Jev + local gate → PASS/WARN/FAIL. Incomplete evidence → `UNAVAILABLE` (never a reassuring verdict). Observe-only V0.1. **advertised monorepo ≠ shipped packages**. Policy-integrity cousin of Abide, not reward-hack. Do not merge into `examples/`. Cousin, not this sidecar.

[ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground) is synthetic `verify-criteria` cases. Planted defects are withheld from this repo so criteria writers cannot read the answer. Soundness-theater antidote. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevbrain](https://github.com/Synxneuos/jevbrain) is a local n-gram daemon: confidence ≥ 0.80 → `AUTO_ACT`, else `REVIEW_QUEUE`. **Not TypeSafe Jev.** Silent-fallback risk if mis-calibrated. Fold attention-firewall / AUTO_ACT only. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-crawlers](https://github.com/russfranky/jev-crawlers) is judge then verify on bug-discovery crawlers. Failures are an **unverified lead, never a bug**. **ranking signals**, not calibrated confidence. Do not merge into `examples/`. Cousin, not this sidecar.

[typed-gate](https://github.com/harshpuri84/typed-gate) is probability≠argmax: code finds candidates; Jev Choice+Noul; Gate in code ACCEPT/REVIEW. A yes/no near 0.5 is **declining to answer**; the 0.40–0.60 band is a refusal, not a weak yes. **argmax only** omitted 25 of 1,100 fields; Jev+gate 0/0 (117 review). Distinct from [jev-gate](https://github.com/totally-tim/jev-gate). Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) is a Pi pre-exec checker (bash/write/edit + custom tools). Block if `choice === "block"` OR `p(block) ≥ 0.50`. **Fail-open** (`failing open`). `/checker` can disable. Distinct from [jevgate](https://github.com/thevibeworks/jevgate) / [jev-gate](https://github.com/totally-tim/jev-gate) / pi-jev-approver fail-closed. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel) catches consumer-visible API changes hiding in **documentation-only** OpenAPI edits. Structural first, then Jev prose. Advisory default. Enforce only when breaking AND promise-violation ≥ 0.90. Fail closed in enforce. Do not merge into `examples/`. Cousin, not this sidecar.

[nanoprune](https://github.com/dmdjr1409/nanoprune) is a **2.8MB** Laya distill, not TypeSafe Jev. Cheap front gate before expensive System Two. **0.0% Hallucination Guaranteed** / ECE 2.58% is soundness theater. Fold cheap-gate only. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-switchyard](https://github.com/bgrablin/hermes-switchyard) is Hermes skill selection under policy. Quoted: **never loads the skill**. Persistent ack is **not DLP** and not authorization. Hosted routing fail-closed without a host envelope. 0.20 local / 0.80 Jev uncalibrated. Sibling of skill-broker. Fold skill/policy only, not CUA. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates) is LangChain / Deep Agents middleware: four Nouls (`database_write` / `production` / `destructive` / `secrets`) on `execute`; one ≥ 0.5 → **HELD**. Quoted: **Closed when TypeSafe is unreachable** (`fail_closed=True`); only `{role, command}`. Pattern first, judgment **never looser**. `SpecReviewMiddleware`: inverted / retargeted / **weakened** / disabled. Quoted **27/27** / **31/31** synthetic — not a rh-guard ROC; **0.5 / 0.6 / 0.8 as starting points**; **second layer, not a boundary**. Distinct from fdemir/toolgate. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-pastepilot](https://github.com/buberlo/jev-pastepilot) is a paste-to-action launcher. Quoted: **Confirm is a gate, not a formality.** **Pasted text is untrusted data. It cannot grant new permissions.** Choice + injection Noul + emptiness Noul + fit Score; **code combines those answers**. **Confidence is a gate, not proof** (0.75 / 0.45). Missing key → **fail-opens**. Quoted: do not treat the README as a measured accuracy result. Fold paste/injection/confirm-gate only. Do not merge into `examples/`. Cousin, not this sidecar.

[jevcache](https://github.com/hyperspaceai/jevcache) is a Jev decision ledger. **cache hit ≠ correctness.** Shared fingerprint bundles as calibrated truth / auto-act is trust theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sutro-sh/jev-align](https://github.com/sutro-sh/jev-align) is a GEPA loop aligning Jev with human labels. Quoted: **A higher training score never accepts a proposal automatically.** Distinct from caiovicentino/jev-align. Anti-pattern cousin if someone hard-gates on the GEPA score. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[enzyme](https://github.com/byenzyme/enzyme) is a Markdown knowledge-compile step. Quoted: `when asked` is **guidance compiled for your agent, not an enforced hook.** Not PreToolUse. Do not hard-gate **catalyst similarity** as deny/allow. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevguard](https://github.com/seb4ez/jevguard) wraps Jev with closed-world escape (`UNRESOLVED_OR_OTHER`) and a certainty/margin calibrator (`AMBIGUOUS_STATE`). Distinct from alsoleg89/jev-guard / pablozr/JevGuard. SHA-256 cache is still not a correctness proof. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-ci-selector](https://github.com/guilhem/jev-ci-selector) is CI task selection. Quoted: **Measure before you skip.** Default shadow; report `proposed_run` vs `run`. Soft judgment must not hard-skip checks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[tonedown](https://github.com/ziziphus-jujuba-zao/tonedown) grades 0–4. Quoted: **the engine only measures.** 74/74 **proves the pipeline, not the model.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevmod](https://github.com/ohernandezdev/jevmod) is productized moderation. Fails open (`error_open`). AUROC is a **sanity benchmark, not a leaderboard.** Distinct from ohernandezdev/jev-pr-review. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevfanity-api](https://github.com/TickerDev/jevfanity-api) is a Cloudflare Worker moderation API. **code owns `flagged`** at default **0.75**. **`flagged` is a policy bit, not a safety proof.** Missing key → 500, not a named lexical fallback. Quoted: **CORS is open by default.** Distinct from gg-friggin-ez / Jev-Examiner. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[iso-jevdit](https://github.com/vidux/iso-jevdit) is an ISO/IEC 27001:2022 Annex A CLI. Quoted: **the audit engine is not finished.** **3 of ~36** checks; report **Not yet**. Quoted: **This is not a certification, and it is not a conformity assessment.** `failOn` is **Accepted today, acted on when the audit engine lands**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-linkedin](https://github.com/ashafizullah/jev-linkedin) scores LinkedIn job↔CV fit. Quoted: **not real-world probabilities.** Quoted: **Treat them as an early signal, not a decision.** CV is **sent** to `/v1/systemone` (PII). Distinct from bias-bench. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness) filters tool results through Jev **before the main model sees it**. Distinct from [AntonioCoppe/jev-harness](https://github.com/AntonioCoppe/jev-harness) and [Atikpui007/jev-sift](https://github.com/Atikpui007/jev-sift). Quoted: **Filtering is a routing decision, never destruction.** Quoted: **Jev failures fail open.** 25/30 **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Atikpui007/jev-sift](https://github.com/Atikpui007/jev-sift) is a Claude `PostToolUse` relevance filter. Distinct from [kbhuw/jev-sift](https://github.com/kbhuw/jev-sift) and [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness). Quoted: **Fails open**. Quoted: **This is a relevance filter, not a safety block.** Hidden candidates **never** learned. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-cite-check](https://github.com/simonsez9510/jev-cite-check) is a Korean ordinance citation-grounding experiment (not a hook). Quoted: **97/100**; 모순 **31/31**; **0** false-allow of 지지. Quoted: **1회 관찰이며 성능 주장이 아닙니다.** Gloss: one-shot observation, not a performance claim. `confidence` is **분포 집중도이지 정확도가 아닙니다**. 97/100 **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-command-guard](https://github.com/JasonHZS/pi-jev-command-guard) is a Pi bash/powershell approval gate. Local critical always `ask`. Auto-allow only `allow` + **0.75** / **0.25** / **0.10**. Quoted: **ambiguity must never silently become permission.** Quoted: **do not provide a complete sandbox.** Distinct from pi-jev-tool-guard / gate / approver / sentinel. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-transaction-guard](https://github.com/finrod21/jev-transaction-guard) is a settlement circuit-breaker sim. Quoted **IMMUNE TO BOTH** / **last line of defense** is **soundness theater**. Quoted: comparison **does not show proof that Jev makes better classification choices**. Choice TRIP is not a freeze. 0.0% FPR **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails) is a dedicated DSH plugin monorepo (sibling of [codebam/jev-guardrails](https://github.com/codebam/jev-guardrails)). Quoted: **The library owns policy, not the model.** **A guardrail is not a sandbox.** Plugin **policy layer, not a sandbox or an authorization system.** `failMode` default **open**; 0.70/0.35 uncalibrated. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-auto-approve](https://github.com/metalbear-co/jev-auto-approve) is a GitHub Action: Jev Noul then code approves at `confidence-threshold` **0.9**. Quoted: **does not satisfy required-approval branch protection**. Quoted: **Failures are loud.** Quoted: **a gate, not a substitute for a human reviewer.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hush](https://github.com/emreozyoruk/hush) is issue triage that stays quiet when unsure. Quoted: **Silence is the default behaviour, not the failure mode.** `apply` default **false**. Two gates 0.80 AND 0.60. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-call-screener](https://github.com/SuchintK/jev-call-screener) is a call-screening backend. Quoted: **JEV classifies; it does not generate dialogue or control the call.** Quoted: **The defaults are deliberately fail-open.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[unslopify](https://github.com/SwastikGorai/unslopify) is a Chrome quality filter. Quoted: **It is a quality filter, not an AI-authorship detector.** Quoted: **Keeps uncertain or failed classifications visible.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[no-hallucination](https://github.com/aryanchauhanoffical/no-hallucination) is RAG hallucination experiments. Quoted: **No effect.** Quoted: **Recall@k is the wrong thing to optimise.** 81.0% **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[context-evaluator](https://github.com/ramasamysh/context-evaluator) is a Jev context INCLUDE/REVIEW/EXCLUDE gate. Quoted: **experiment metrics, not proof**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-assist](https://github.com/glud123/jev-assist) ranks files by task relevance before reading. Quoted: **Flags are prompts for a human look, never verdicts.** Quoted: **Typed output guarantees the shape of an answer, not its correctness.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[rag-jev](https://github.com/Nixz0824/rag-jev) is local RAG with Jev rerank + self-check. Quoted: **Degradation is never silent.** noul < 0.5 **请以公告原文为准**; 20/20 **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[mailverdict](https://github.com/pantos12/mailverdict) is a phishing-verdict MCP/REST service. Quoted: **Forward an email, get a calibrated phishing verdict.** Quoted: the explainer **never changes the label**. Quoted: **A classifier cannot be talked out of a probability.** Quoted: 24 fixtures **are not a benchmark.** Distinct from rspamd-jev / jev-call-screener / [mailverdict/mailverdict](https://github.com/mailverdict/mailverdict) / [jaiswalism/mailverdict](https://github.com/jaiswalism/mailverdict). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[open-jev-approvals](https://github.com/alexj11324/open-jev-approvals) is a Codex / Claude Code **binary** allow/deny hook. Recapture: quoted **The degradation model changed from fail-closed to fail-open after user review.** Quoted: **A deny always requires positive evidence that the action is dangerous.** Quoted: **If Jev is unreachable or returns something unusable, the call is allowed.** Quoted: **There is no `review_required`**. 0.70 uncalibrated. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[beat-the-reviewer](https://github.com/Ash20pk/beat-the-reviewer) is a reviewer **game**: typed judgement rule answered by pinned `jev-1.13.0`. Quoted: **Taking the reviewer offline does not count as a pass.** Quoted: **An unavailable reviewer is not an approval.** Quoted: **Holds no key and reaches no model.** Quoted: **`on_unavailable: "block"`**. Puzzle, not a production merge gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard) is a DSH `tools/pre-execute` accident net: `allow` / `revise` / `block` / `escalate`. Quoted: **It is an accident net, not a security boundary**. Quoted: **degrades loudly instead of silently**. D3 timeout **fail-open**. D9 402/401 **l0-only**. Quoted: **L0 的 deny 类硬规则不受此开关影响**. Distinct from codebam/dsh-jev-guardrails. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-sentinel](https://github.com/CompleteTech-LLC-AI-Research/jev-sentinel) is a multi-harness sensor/veto. Quoted: **This is a defense-in-depth sensor and veto layer, not a complete reference monitor**. Quoted: **DEFER means only no additional veto**. Quoted: **Judgments are not grants**. Quoted: **provisional review/block thresholds 0.35/0.80 are policy starting points**. Pin `jev-1.13.0`. Distinct harshwasan/jev-sentinel. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[diff-risk-sentinel](https://github.com/heliowap/diff-risk-sentinel) is CRAP + optional Jev triage. Quoted: **It is a prioritization aid, not a bug detector**. Quoted: earlier **96% accuracy / 100% bug recall** **are superseded**. Rule 6 badge `ACCEPTABLE_LOW_RISK` (strategy: **Low risk. Safe to merge.**) is not a grant. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[agent-firewall](https://github.com/wmsing/agent-firewall) is L7 `:8286` plus MCP stdio. Quoted: **fail-closed if checks do not pass**. Layer 2 **Mock** without a key. Quoted: **Score ≥ 0.8** → **BLOCK**. Quoted: **git pull is intentionally excluded**. Distinct from 0xrem / 2026hoohacks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[/edit](https://github.com/acoyfellow/edit) is approval-first Pi. Quoted: **Nothing changes until you approve the exact request**. Quoted: **If the provider is unavailable, `/edit` stops instead of pretending that a review happened**. Quoted: **Four runs of one tiny task** **is not a benchmark**. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[slop-filter](https://github.com/adamnroman/slop-filter) **hides AI-generated posts**. Quoted: **Scores every post in your feed for how likely it is to be AI-written**. Contrast unslopify (**It is a quality filter, not an AI-authorship detector**). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sift](https://github.com/bohutang/sift) labels **Substance · Humor · Chit-chat · Promo · Junk** plus **AI-written** and **Off-topic**. Distinct from kbhuw / Atikpui007 jev-sift. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Winnow](https://github.com/ThinkyMiner/Winnow) verdicts **read now** / **skim** / **save** / **skip**. Quoted: **every word on the card is a template filled from typed answers**. Quoted: **80% verdict agreement** and **90% content-type agreement**. Quoted: **The goldens are still unreviewed**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[x-spam-filter-typesafe](https://github.com/yonsakhan/x-spam-filter-typesafe) max(`is_spam`,`is_gibberish`) ≥ **0.85**. API fail **放行不隐藏** (fail-open). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-mail](https://github.com/vynnlee/jev-mail) is **Autonomous 24/7 Zero-Inbox**. **Apply Label, Star, Archive**. Distinct from [muhammedilyasy/jev-mail](https://github.com/muhammedilyasy/jev-mail): **Read-only: it never sends, deletes, labels or archives anything**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[system1-fraud-interceptor-demo](https://github.com/ordepas/system1-fraud-interceptor-demo) is synthetic System 1 vs generative. Quoted: **Es una demo de experimentación personal, no un benchmark**. Quoted: **no está pensada para producción**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-wiki-watch](https://github.com/hfmsio/jev-wiki-watch) FLAG ≥ **80%**; REVIEW **40% to 80%**; OK below **40%**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[umby-jev-stack](https://github.com/Umbylicus/umby-jev-stack) 1.x **544 flags**; **rejected 543 as false positives**. Quoted: **Never drop a finding**. Quoted: **Jev only classifies**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-prune-kit](https://github.com/CompleteTech-LLC-AI-Research/jev-prune-kit) Quoted: **Not a universal `/prune`**. Quoted: **Not live-tested**. Quoted: **122 passing local tests are not 122 live harness or model tests**. Quoted: **88 passing local tests are not 88 live harness or model tests**. Pin `jev-1.13.0`. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[yolo-jev-scene-filter](https://huggingface.co/spaces/iluvblender/yolo-jev-scene-filter) Quoted: **YOLO-World detects; TypeSafe Jev keep/skips boxes**. Quoted: **Jev only filters what YOLO already found.** UI keep floor **0.55** (uncalibrated); not hide-never-learned; `jev-latest`; missing key raises. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-permit](https://github.com/kurihada/pi-jev-permit) **bash / write / edit**, not every tool. Quoted: **silence is never consent.** p ≥ **0.6** (uncalibrated default). Quoted: **A failed judgment is never treated as approval.** No key: read-only local else blocked. `degraded`: L1–2 pass, L3 block. Distinct pi-jev-approver/gate/guard/sentinel/tool-guard/command-guard/control. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jevgate-action](https://github.com/ktsu2i/jevgate-action) advertised Action; README title only; no `action.yml`; **advertised Action ≠ shipped workflow.** Distinct thevibeworks/jevgate and totally-tim/jev-gate. Watch. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[boldbug1/jev-triage](https://github.com/boldbug1/jev-triage) Go CLI. Distinct ThyFriendlyFox/jev-triage. Choice/Score 0–3/Noul frustrated; `-threshold` **0.8** (quoted starting point; uncalibrated); `jev-latest`; keep `other`. Vendor 193.6x/444.6x: test on own data. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[contact-cleaner](https://github.com/rubenhassid1/contact-cleaner) Google Other contacts Keep/Review/Remove. Quoted: **Buckets are code, not the model.** Quoted: **Deterministic first.** `KIND_CONFIDENCE_FLOOR` **0.5** (uncalibrated); `jev-latest`; PII name+email. Distinct jev-linkedin. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[claude-code-jev-guardrails](https://github.com/javimp2003/claude-code-jev-guardrails) Quoted: **Claude thinks. Jev reacts. Code decides.** `Math.max` floors never overridden. Fail-open judgment; fail-closed hard cases. No key / `JEV_MODE=mock` → offline heuristic mock (named degraded backend; mock can still BLOCK). `REFLEX_MODE=shadow`. Quoted: **Treat this as a working prototype, not a hardened production guardrail.** **advertised ASK_USER ≠ engine emit**. Distinct RahulBalakavi/claude-code-jev and codebam/jev-guardrails. Thin card. Do not merge `.claude/settings.json` into `examples/`. Cousin, not this sidecar.

[jev-voice-gate](https://github.com/vrazraz/jev-voice-gate) OpenJev NLI, not TypeSafe. Quoted: **Это не гарантированная замена wake word.** OpenJev оценивает **текст после распознавания**. 0.40/0.22 **не калиброванные вероятности**. After accept **без инструментов**. Не включайте `--yolo`. Distinct herdr-jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[alp-pr-review](https://github.com/pksorensen/alp-pr-review) Review → Jev-routing → squash-merge or Godkend merge portal. Quoted: **Den får aldrig PR-titel, -beskrivelse eller diff.** Quoted: **ikke kan tale sig selv til automerge.** Quoted: lukker linjen **sikkert**. Quoted: **Ikke en erstatning for branch protection.** Tærsklerne **er ikke tunede** (0.25 / 2 / 0.6). Distinct jev-pr-review and jev-auto-approve. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[youtube-judol-userscript-jev](https://github.com/arashari/youtube-judol-userscript-jev) Tampermonkey judol via classifier.dev `jev` no key. `confidenceThreshold` **0.6** (uncalibrated) unsure. discussing gambling ≠ promotion. Distinct rspamd-jev/jevmod/x-spam-filter-typesafe. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Postmark](https://github.com/silky-x0/Postmark) tone/virality/cringe; code stamps **0.6** / **2.2**. GitHub description LinkedIn; README never mentions LinkedIn — **advertised description ≠ shipped UI**. `jev-latest`; missing key → 500. Distinct jev-linkedin. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[shipit-gate](https://github.com/thecoderpanda/shipit-gate) Jev deploy/ship gate (`shipit check`). `blockOn` **0.5** / **0.7** / `critical`. Quoted: **Does this replace my CI? No.** Quoted: **Rejects fail closed (exit code 2).** `--force` / `git push --no-verify`. Demo **mocked**. Soft-score-as-hard-ship. Thin card. Do not merge the pre-push hook into `examples/`. Cousin, not this sidecar.

[jev-brig](https://github.com/uberto/jev-brig) Claude `PreToolUse` Bash AST allow/ask/deny. **Not TypeSafe Jev.** Quoted: **jev-brig is a guardrail, not a boundary.** no `allow` rules → silent; unparsable → **ask — never a silent allow**; `auto_approve` off = silence; `yolo` = no opinion; git hooks are the floor. 99 tests. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JevGuard-NSFA](https://github.com/knowlet/JevGuard-NSFA) `develop`; **`.gitignore` only**; description null; size 0. **advertised Guard ≠ shipped source.** Distinct alsoleg89/pablozr/leepokai/seb4ez/codebam JevGuard family. Watch. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevengineeringgate](https://github.com/RavenRepo/jevengineeringgate) L0 then L1–L4 Jev. Quoted: **The gate never says yes** (`deny`/`ask`/nothing). Fitted **0/26** wrong **25/26** primary **0** unsafe min margin **0.025**. Quoted: **Is this a security boundary? No.** Fail-open non-alarming; ask destructive. Distinct jevgate / jev-gate / jevgate-action. 26-case fit **not a rh-guard ROC**. Thin card. Do not merge hooks into `examples/`. Cousin, not this sidecar.

[lgtm](https://github.com/stardeckai/lgtm) tests that pass but prove nothing. Quoted: **lgtm is advisory by default** (exit 0); `--fail` later. Holdout precision **1.00** **not a rh-guard ROC**. Weakened-test cousin of typesafe_agent_gates SpecReview. Thin card. Do not merge `/lgtm` skills into `examples/`. Cousin, not this sidecar.

[openclaw-tool-prefilter](https://github.com/MertBasar0/openclaw-tool-prefilter) `before_prompt_build` catalog shrink; `thresholdAnyTool` **0.35** / 500ms. Quoted: **Bulletproof Fail-Open Safety**. Quoted **Zero Hallucination** theater. **catalog shrink ≠ deny**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-helm](https://github.com/Z761293629/pi-jev-helm) Pi model router; fail-open to Baseline. `confidenceThreshold` **0.75**; **2500 ms**. Quoted: Safety Gate/Verifier are **separate, uncommitted exploration directions** (`v0.2.0` preview). Routing ≠ permission. Distinct other pi-jev-*. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-claude-controller](https://github.com/snesmaeili/jev-claude-controller) Python owns the loop; Jev **candidate id**, never a command. Quoted: **no function in the safety layer accepts a model signal.** Quoted: **The thresholds are uncalibrated.** Not a Claude plugin. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ask-jev](https://github.com/logicrw/ask-jev) fail-open advisory CLI; **280ms**. Quoted: **never use a verdict to grant permissions**. Dual ≥ **0.85**. `HARNESS_JEV_ALLOW_REMOTE`. 146 mocked tests. GPL-3.0. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[switchboard](https://github.com/dev-hari-prasad/switchboard) GitHub description cost-aware LLM router + TypeSafe Jev; empty public tree (409). **advertised router ≠ shipped source.** Distinct hermes-switchyard. Watch. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[FastRisk-Jev](https://huggingface.co/spaces/durganani60/fastrisk-jev) Gradio OpenRouter `typesafe/jev-1.13`; code **0.80** BLOCK / **0.35** STEP-UP else APPROVED. Quoted **0% Type Errors** / **Calibrated Probabilities** theater. UI halt ≠ freeze. Last-6 of key in markdown. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-resume-match](https://github.com/hamidfarmani/jev-resume-match) Job Match; code combines Jev; pin `jev-1.13.0`. Quoted: **not a hiring prediction.** Resume **sent** to TypeSafe. Demo cookie **not a reliable public spending limit**. Distinct jev-linkedin / yueli / bias-bench. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[yueli](https://github.com/fatelei/yueli) batch resume classifier. Quoted: **仅供参考，不构成招聘决策依据.** `jev-latest`; PII to `api.typesafe.ai`. Distinct jev-resume-match / jev-linkedin. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ismailakdag/typesafe-jev](https://github.com/ismailakdag/typesafe-jev) sahibinden listing filter. Quoted: **Kararı yine kod verir.** Quoted: **Yargılar karar desteğidir, karar değil.** Quoted: **Jev metin üretmez.** Distinct product / typesafe-jev-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Mailbox-Boy-With-Jev](https://github.com/TennousuAthena/Mailbox-Boy-With-Jev) empty public tree (409); description null; size 0. **advertised mailbox ≠ shipped source.** Distinct vynnlee/muhammedilyasy jev-mail / mailverdict. Watch. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevshield](https://github.com/lgy1027/jevshield) TypeSafe Jev decorator / LangChain wrap. Quoted: **Sub-100ms, non-autoregressive runtime security gate.** Dual-Validation Matrix; code `(Tier ≥ Threshold ∧ P_destructive > 0.75) ∨ (BlastRadius ≥ 3 ∧ IsDestructive)`. Quoted SECURITY.md: heuristic **not a security boundary**; policy **fail-closed**; `interactive` **TTY-only**. No key → `_heuristic_fallback` (0.99/0.85). Distinct jev-brig (**Not TypeSafe Jev**). Uncalibrated 0.75 noul as a hard halt is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-warden](https://github.com/DevMortimer/pi-warden) Pi Action/Rules/Slop/Stuck/Done-check/Security/Runaway/Subagent. Default **steer**. Quoted: **It is advisory, not a sandbox**. `failOpen: true`; irreversible **0.5** warn / **0.7** hold; patterns set the floor. 150 paired 6 vs 0; **13,952** / **109** — quoted **project-maintained benchmarks, not universal claims** — **not a rh-guard ROC**. Distinct claude-jev-warden / pi-jev-*. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-demo-triage](https://github.com/jasonli0226/jev-demo-triage) mock incident-triage. `gate` **fails closed if Jev errors**; only `run_shell`/`restart_service`. Quoted: **Jev did not beat baseline on pass rate** (**17/21** vs **16/21**); **N is 3 per cell**. Distinct ThyFriendlyFox/boldbug1 jev-triage / jev-logtriage. Treating 0/3 simple-restart as a Jev-is-unsafe ROC is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[volumetric-intelligence](https://github.com/manutej/volumetric-intelligence) typed video/table mesh. Quoted: **Jev is the typed gate (`Choice` / `Score` / `Noul`), never the runtime.** Quoted: **Fail closed. Compose only on GREEN.** UI: **Jev classifies. Code gates.** `/api/walk` **rehearsal** (not live Jev). Pin `jev-1.13.0`; 0.72/0.5/7 uncalibrated as a ship grant is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Jev-Auto-Router](https://github.com/miniLV/Jev-Auto-Router) Codex skill; Jev Choice → Policy Guard. Quoted: Policy Guard **Deterministic ALLOW(plan) or DENY(reason)**. Quoted SKILL: **ALLOW (execute exactly the plan) and DENY → this unit runs in Root.** Quoted: **No evidence means no production delegation**. Quoted README.en: automatic delegation **off by default** (**UNVERIFIED** host evidence). Dashboard **observers only**. Routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer) SaaS URL → ReplyNodes Markdown → Jev. Quoted: **developer demo, not … SEO score, … AI detector**. Website **untrusted state**. **There is no mocked provider.** Not a PreToolUse gate. Distinct unslopify / Winnow / gold-assay / Postmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ai-provider-triage-comparison](https://github.com/rmax-ai/ai-provider-triage-comparison) three arms, five tickets. Quoted **not a controlled benchmark.** Unanimous **2/5**. Quoted: **not a general model ranking.** Jev `probability >= 0.5`. Distinct llm-vs-jev / jev-demo-triage. Ranking from one 15-call run is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[zerosweep](https://github.com/sysadarsh/zerosweep) Next.js email triage. Code `CONFIDENCE_SAFETY_THRESHOLD` **0.85**; < 0.85 → `human_review`; phishing / `safeToTrashProb ≥ 0.85` → `trash_quarantine`. Quoted: **Zero Format Errors**. Not PreToolUse. Distinct jev-mail / mailverdict / jevmod. 0.85 auto-trash as a safety envelope is theater. **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) per-turn Codex routing. Quoted: **Fail-open**; **Kill switch**. 0.5 → **Sol** not frontier. Quoted BACKTEST **−59.9%** on 237 turns; cache invalidation **not modelled**. Routing ≠ permission. Distinct miniLV/Jev-Auto-Router. −59.9% is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev](https://github.com/y0usaf/pi-jev) (`@y0usaf/pi-jev`) Pi bash/write/edit gate. Quoted: **Shadow mode is the default.** Quoted AGENTS.md: **The gate fails open by design.** 0.90/0.70/0.85/2.50. Quoted: smoke calibration **not enough to switch the gate to enforce**. Distinct other pi-jev-*. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[pi-jev-prune](https://github.com/fsmiamoto/pi-jev-prune) Pi context prune. Default **`dry`**; **Fails open**; ephemeral. Threshold **0.25**; **1 of 28** below 0.15. Code rule does useful prune. Distinct compact/pruner/nanoprune/prune-kit. **prune ≠ deny**. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-guard-mcp](https://github.com/raniellimontagna/jev-guard-mcp) experimental browser MCP. Pin `jev-1.13.0`; min **0.80**. Quoted: **the server cannot independently attest human approval.** Distinct leepokai/jev-guard. 0.80 as a safety envelope is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-router](https://github.com/reallygood83/jev-router) TypeSafe role routing. Quoted: **Jev does not pick model ids. It picks a role. Failures pass through.** `error-pass`; floor **0.6**. Quoted: **They are not a live quality claim.** Distinct justinhsu1477/jev-router / hermes-plugin-jev plugin ID `jev-router`. 0.6 as a safety envelope is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-router](https://github.com/philippdubach/pi-jev-router) Pi OpenRouter router. `/router shadow` recommend only default. Quoted: **Jev output is evidence, not truth.** 89%/88% cheaper **not a rh-guard ROC**. Distinct rizafahmi/pi-jev-task-router (owns the model while on). Routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[JEV-Dual-Spectrum-Phishing-Guardian](https://github.com/YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian) dual-spectrum phishing dashboard. Safe **0-20** / Suspicious **21-60** / Malicious **61-100**. Missing key throws. Quoted: **Section 4: Counter-Measures are exemplary and decoupled from individual verdicts.** Distinct zerosweep / mailverdict. Malicious 61–100 as a safety envelope is a shipit-gate anti-pattern. **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[slop-guard](https://github.com/bornakapusta/slop-guard) Ruby guideline review. Quoted: **code identifies what to inspect, Jev judges it, and explicit rules decide what to report.** `severity` always `advisory`; **the reviewer never blocks.** Exit 0: **Review completed (concerns may be present).** Distinct slop-filter / unslopify / Not-TypeSafe jev-brig. Advisory exit 0 as a merge grant is a shipit-gate anti-pattern. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-corrective-rag](https://github.com/sudeshkar/jev-corrective-rag) typed System One RAG gates. Quoted: **Jev decision gates | Stubbed — no API key yet**. Stub **NOT a simulation of Jev's quality**; **300 ms**; prints `PARTIAL`. `VERIFY_CONF_FLOOR` **0.60**. Stubbed 4.0× / 7.2× is not a rh-guard ROC; 0.60 AUTO_ANSWER is not a safety envelope. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-issue-radar](https://github.com/Patrick-SCH03/jev-issue-radar) GitHub duplicate triage. Quoted: **It never closes issues, adds labels, or posts comments.** **2/4** **not a rh-guard ROC**. ≥ **0.8** **not a calibrated accuracy guarantee**. Distinct zerosweep / jev-demo-triage. 2/4 or 0.8 as a close-issue grant is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-review](https://github.com/MaxIvanyshen/jev-review) TypeSafe diff triage. Quoted: **It never approves or rejects anything**. p **≥ 0.5** / `risk.score` **≥ 2**. Non-zero exit is **couldn't triage,** not **diff is clean**. Distinct NiazMorshed2007/jev-review. 0.5 / risk≥2 as a merge grant is a shipit-gate anti-pattern. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jcr](https://github.com/NiazMorshed2007/jcr) (**Jev Capability Resolver**) MCP `resolve_capabilities`. Quoted: **JCR returns documentation. It does not execute commands.** Quoted: **The included harnesses also stop at explaining the steps needed to carry out a task.** Beam **0.6** / width **3** / depth **16**. Ambiguous / no-match / depth-limit are resolver outcomes, not merge grants. Routing ≠ permission. Treating capability context as attested approval to run is theater. Distinct jev-guard-mcp / jev-router / NiazMorshed2007/jev-review. 80-run 85%/23% **not a rh-guard ROC**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JevPR](https://github.com/HexyeDEV/JevPR) GitHub App PR router. LOW if composite **< 3.5** → YAML `approve` → GitHub `APPROVE`. Quoted: **Jev is an AI model, and can make mistakes.** `payload["files"]` is not the standard PR files list. LOW auto-APPROVE as a merge grant is shipit-gate theater. Distinct ohernandezdev/jev-pr-review / metalbear-co/jev-auto-approve / MaxIvanyshen/jev-review. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[model-switch](https://github.com/aesgalexis/model-switch) Codex local router. Quoted: **Experimental. Start in `observe` mode.** Quoted: **Fail open**. `minConfidence` **0.65**. No key → passthrough. Routing ≠ permission. 0.65 route as a safety envelope is theater. Distinct jev-model-router / jev-codex-router / Jev-Auto-Router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafe-pi](https://github.com/gvkhosla/typesafe-pi) consent-gated Pi `typesafe_judge`. Disabled by default; `/typesafe enable`. Quoted: **Results are model judgments—not proof or authorization.** Quoted: **never as permission to perform an action.** Fold consent/gate only. Distinct DevMortimer/pi-typesafe / twilwa/pi-typesafe / nardinmarcus/pi-jev-typesafe. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[the-jev-enator](https://github.com/jakenbear/the-jev-enator) Claude hooks: danger gate / failure notice / completion check. Quoted: **all three fail open**. Quoted: **The completion check does not block anything by default.** 0.80/0.90 uncalibrated. **23/23** **not a rh-guard ROC**. Enforcing uncalibrated floors is safety theater. Distinct jevgate / jev-gate / claude-code-jev / jev-kit / jev-bouncer. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-vault-gate](https://github.com/sohryuu101/jev-vault-gate) Claude plugin noul gate + topic Choice; verbatim capture. Quoted: **never blocks or alters the actual turn**. Quoted: **Nothing is ever deleted automatically**. Threshold **0.6**. `plugin.json` 0.3.0 ≠ package.json 0.1.0. Distinct jev-carryforward / jev-recall / invalidate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dsh-jev-tools](https://github.com/HorusJiang/dsh-jev-tools) DSH prune/screen/suggest + `jev_ask`/`jev_gate`. Quoted: **it ranks, it never thresholds**. Quoted: **With no key the plugin is completely inert**. `jev_gate` escalate; **8/8** **not a rh-guard ROC**. Distinct tr1v3r/dsh-jev / codebam / 7starsseeker. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JEV-Prompt-Injection-Guardian](https://github.com/YuyaForest/JEV-Prompt-Injection-Guardian) quarantine dashboard. BLOCK/QUARANTINE/INSPECT/MONITOR/ALLOW; **80%+ BLOCK**. Score clamped to Choice. Heuristic fallback is not live Jev. Distinct Dual-Spectrum-Phishing-Guardian. BLOCK 80% as a safety envelope is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-healthcare-support-router](https://github.com/bhaskarpraveen/jev-healthcare-support-router) Jev decides, TypeScript acts. urgency **≥ 0.8** / confidence **< 0.7** human. Quoted: **does not make medical diagnoses**. 0.8/0.7 is not clinical authority. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[prMonster](https://github.com/dillera/prMonster) FujiNet PR triage. Quoted: **It never touches a pull request on its own.** Quoted: **Merging is never offered.** CONFIRM+name; `ALLOW_GITHUB_WRITES` default off; `reviewer_directed_text` **0.7**. Distinct JevPR / jev-pr-review. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dsh-jev](https://github.com/tr1v3r/dsh-jev) core degrade-never-throws; MCP; router shadow default. Quoted: **Never registers or modifies LLM routes.** Quoted: **Degrades, never breaks.** `name:` not `path:`. **35/35** mocked. Distinct HorusJiang / codebam / 7starsseeker. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-nerve](https://github.com/keeltrace/hermes-nerve) (current listing of keeltrace/hermes-jev) supervisory layer. Nerve/Reflex is a **watchdog and forecaster**; orchestrator owns stop/continue. `gate_mode` default **off**; `min_confidence` **0.80**. Quoted: **Do not treat a Jev probability as proof of correctness.** Catalog **0.2.1.2** ≠ **0.2.2**. Opt-in gate; live numbers **not a rh-guard ROC**. Distinct hermes-plugin-jev / hermes-jev-router / hermes-jev-skills / typesafe-jev-gate / hermes-jev-plugin. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[win4r/pi-jev-router](https://github.com/win4r/pi-jev-router) task-boundary Pi router. shadow default; exact hashes; pin `jev-1.13.0`. **15/16** **not a rh-guard ROC**. Quoted: **Production task quality and net savings have not been established.** Routing ≠ permission. Distinct philippdubach/pi-jev-router. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[sys1](https://github.com/hraness/sys1) System One gateway. Quoted: **Hosted Jev is disabled by default**. Qwen **32/72** / **44/72** **not a rh-guard ROC**. Quoted: **Do not reuse Jev probability thresholds for generic GGUF**. Loopback is not authentication. Cousin of localjev / laya / openjev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-regime-gate](https://github.com/matchstick-trading/jev-regime-gate) research, not advice. Code `viable < 0.4` / `changeLikely > 0.6` `stand_down`; `confidenceThreshold` **0.60** / `halfSizeThreshold` **0.45**. 0.4/0.6 is not investment advice. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[model-effort-router](https://github.com/nyattoh/model-effort-router) DAG + effort routing. Quoted: **No benchmark claims.** dry-run without key; fail closed. **0.5** dispatch is not accuracy. Quoted: does not execute. Distinct Mandrilsquad1441/jev-model-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[windows2text](https://github.com/ArronHC/windows2text) UIA screen-to-text MCP + Jev computer-use. Quoted MCP.md: **A Jev `confirm`, `escalate`, or `abort` gate never executes automatically.** `windows_step` defaults `act=false`. Distinct tacticocc/Jevbridge. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JohnsonRan/pi-jev](https://github.com/JohnsonRan/pi-jev) Pi auto-mode classifier. Quoted: **This is not a sandbox.** Quoted: **This remains a permission aid, not a security boundary.** ask ≥ **0.30** / deny ≥ **0.85**. **3/10 → 0/10** **not a rh-guard ROC**. Distinct y0usaf/pi-jev. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[PavelLizunov/jev-sentinel](https://github.com/PavelLizunov/jev-sentinel) Rust infra watchdog, not a coding-agent hook. Quoted: **not the truth of a diagnosis.** Quoted: **Schema validity is not evidence that a diagnosis is correct.** Self-healing logs only. **95.0%** / **0.12** **not a measurement**. Distinct CompleteTech jev-sentinel. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[omapi-overlay](https://github.com/VirtualMachinist/omapi-overlay) Nix overlay, not an omp source fork. Quoted: **There is no omp source tree in this repository.** Default shadow; **shadow never blocks**. Empty findings are **not** approval. Distinct omp-auto-mode. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jev-test-confidence-gate](https://github.com/abh2050/jev-test-confidence-gate) 24-ticket confidence-gate bench. *Theirs*: **163 ms** / **87.5%** / **$0.06**. Gate **0 of 3**. Quoted: **24 invented tickets**. Quoted: **untested at adequate power, not refuted.** **not a rh-guard ROC**. Distinct jasonli0226/jev-demo-triage. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Twitter-keyword-shield](https://github.com/michelbrigante46-art/Twitter-keyword-shield) X userscript: local **0ms** then Jev. Default **0.5** uncalibrated. sub-100ms **not a rh-guard ROC**. Distinct yonsakhan/x-spam-filter-typesafe. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Laya-GuardRails-Harness](https://github.com/morre95/Laya-GuardRails-Harness) Claude PreToolUse/PostToolUse/Stop. Quoted: **`BLOCK` comes from rules or policy, never from a Laya label.** Default **shadow**. Quoted: **low confidence escalates, never allows.** Distinct NandhaKishorM/laya. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-jev-approvals](https://github.com/anpicasso/hermes-jev-approvals) Hermes smart-approval reviewer. Quoted: **Scope: approvals only.** Quoted: **Not a sandbox.** *Theirs*: **9.8x faster, 4.2x fewer interruptions** on 156 real commands; independent **1.24x**. Distinct rsdkrasen/hermes-jev-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[scx-router](https://github.com/SouthernCrossAI/scx-router) GLiClass model router. Threshold **0.5**. Not TypeSafe Jev. **0.5** is not a Jev gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pii-masker](https://github.com/BlinkWrite/pii-masker) on-device reversible PII. Quoted: **Fail-closed.** Quoted: **It never returns the input unchanged as a fallback.** Distinct BuilderChat/PII-Redactor. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PII-Redactor](https://github.com/BuilderChat/PII-Redactor) REST redact/rehydrate. Default fail-closed. SLM: `PII_REDACTOR_USE_GLINER=false` / `PII_REDACTOR_USE_PRESIDIO=false`. Shadow fail-open. Distinct BlinkWrite/pii-masker. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[guardrails-demo](https://github.com/Harshal-Ug/guardrails-demo) LangChain PII middleware. *Theirs*: **~180 ms**. Distinct Laya-GuardRails-Harness. **180 ms** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[systemone-gatekeeper-war](https://github.com/lsu-ub-uu/systemone-gatekeeper-war) Uppsala Cora WAR (`se.uu.ub.cora`). Name collision only; not TypeSafe System One. Distinct hraness/sys1. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-slash-router](https://github.com/raitoxlol/hermes-slash-router) Hermes slash-token router. Quoted: **stored routes are never applied automatically.** **≥ 0.85**; no key fails closed. Distinct rsdkrasen/hermes-jev-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[airlock](https://github.com/tristan-kkim/airlock) local egress privacy airlock. Quoted: **A model never gets to say "this is fine."** Quoted: **Airlock fails closed.** *Theirs*: **7.5% ± 0.6** not held-out. Distinct jonathanavis96/jev-kit Airlock. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jevlike-esp32](https://github.com/david-cermak/jevlike-esp32) ESP32 jevlike demo. Quoted: **This is intentionally a demo, not a production model.** Not TypeSafe Jev. Distinct omo-jevlike-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafeai-dotnet-sdk](https://github.com/saibimajdi/typesafeai-dotnet-sdk) community .NET System One client. Quoted: **This project is not affiliated with, sponsored by, or endorsed by TypeSafe AI.** Quoted: **Thresholds belong in your code.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[RiskAverseTech/toolgate](https://github.com/RiskAverseTech/toolgate) (`@riskaverse/toolgate`) Claude PreToolUse + MCP proxy. Quoted: **Static rules run first**. Quoted: **defense in depth, not a sandbox**. `allow` is advisory. Policy only `~/.toolgate`. *Theirs* **20/20** / **19/20** / **40% ask** not a rh-guard ROC. Distinct fdemir/toolgate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ailerix](https://github.com/tylerjharden/ailerix) type-safe model router. Quoted: Jev classifies **task families** only. `ailerix/auto` is not a permission. Distinct slo-router / jev-model-router / reallygood83/jev-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-github-quality-gate](https://github.com/Bnymn1306/jev-github-quality-gate) (Q-GATE) `auto_approved` / `needs_review` / `blocked`. Quoted: **Supports shadow mode**. Heuristic fallback. `auto_approved` is not a merge grant. Distinct totally-tim/jev-gate / HexyeDEV/JevPR. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[win-cu-router](https://github.com/JkRheezy/win-cu-router) Windows Jev-first computer-use. Quoted: planner cannot increase operation permissions. Quoted: HTTP bridge is **not an operating-system sandbox**. *Theirs* E01 through E05. Distinct windows2text / Jevbridge. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[herdr-jev-router](https://github.com/boriscardano/herdr-jev-router) mandatory `agent.spawn` routing. Quoted: **Treat the enforcement claims as unproven.** Fail closed. Quoted: **The caller still cannot choose one.** Distinct muthuishere/herdr-jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[grok-jev-router](https://github.com/colinmcdermott/grok-jev-router) Grok Bot router. Quoted: **The router is advice; those rules are the boundary.** Quoted: **instruction-following, not enforcement.** Shadow first. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[braess-router](https://github.com/copyleftdev/braess-router) Jev handler + Poise endpoint. Quoted: **Alpha · single server · loopback only.** Quoted: **This project is independent of TypeSafe.** No workload accuracy guarantee. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gowtham980/jev-router](https://github.com/gowtham980/jev-router) OpenClaw plugin. Quoted: **This is NOT a universal automatic model-and-thinking switcher.** Quoted: **Classifier failures retain the current model.** Distinct reallygood83/jev-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PrivaParse](https://github.com/Jhiynn/PrivaParse) local PII + OpenAI-compatible gateway. *Theirs*: PERSON F1 **0.964**; **LICENSE_NUMBER and ROUTING_NUMBER measured 0.000 recall**. Not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[anonde](https://github.com/anonde-io/anonde) local-first Go PII. Quoted: **no outbound HuggingFace traffic at request time**. Reveal gated by `actor` + `purpose`. *Theirs* lowest leak_rate on **29** corpora, not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Agentic-Guides/decision-kernel](https://github.com/Agentic-Guides/decision-kernel) Cloudflare Worker `/classify` + `/guard`. Quoted: **Judgment proposals only**. Quoted: **The guard never executes anything itself.** Missing key → 503. *Theirs* **10/10** / **0** false-block not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[NeOMakinG/kev-model-router](https://github.com/NeOMakinG/kev-model-router) local kev, not TypeSafe Jev. Quoted: **The router never blocks traffic.** Quoted: **kev being down never blocks traffic**. Routing ≠ permission. Distinct Mandrilsquad1441/jev-model-router. *Theirs* **10/10** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[eugeniughelbur/jev-gate](https://github.com/eugeniughelbur/jev-gate) Claude PreToolUse. Quoted: **It catches mistakes, not attackers**. Quoted: **Fails open.** Observe default. MCP wrap is hope-the-model-looks. Distinct totally-tim/jev-gate. *Theirs* 300-call; `git stash clear` hard-rule. Soft p>=0.90 can deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jorgehara/gentle-browser-jev](https://github.com/jorgehara/gentle-browser-jev) Gentle/JEV/browser lab. Quoted: **never claim savings without a controlled A/B run.** local-fallback. Real browser/device not enabled. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[MarcoLoDico/pi-jev-router](https://github.com/MarcoLoDico/pi-jev-router) Pi `/model` picker. Quoted: **unvalidated starting policy, not a 95% accuracy guarantee.** Distinct philippdubach/pi-jev-router. Routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[harshwasan/jev-sentinel](https://github.com/harshwasan/jev-sentinel) current listing of the Pi/Claude/Codex integrity gate previously [harshwasan/pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel). Quoted: **never auto-allows.** Quoted: **Prompt injection is not solved.** Uncalibrated **0.3 / 1.3 / 0.8**. *Theirs*: **106** unit tests. Distinct CompleteTech jev-sentinel. Keep both slugs. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[Koushik890/jev-firewall](https://github.com/Koushik890/jev-firewall) Claude/Codex PreToolUse. Quoted: **Fail closed.** Quoted: **Rules can only tighten.** `ask_below` **0.7**. *Theirs*: **104** tests. Distinct wmsing/agent-firewall. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jackbarunz/jev-tool-router](https://github.com/jackbarunz/jev-tool-router) Codex MCP routing. Threshold **0.90**. `none_of_the_above`. Quoted: **The router narrows discovery; it does not permanently remove the fallback path.** Routing ≠ permission. Distinct esinocchi. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[esinocchi/jev-tool-router](https://github.com/esinocchi/jev-tool-router) experimental SDK. Quoted: not generate arguments, approve actions, or execute tools. Quoted: **not an agent framework or a security boundary.** *Theirs*: **76/81** versus **77/81**, not a ROC. Distinct jackbarunz. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[devjtv/jev-router](https://github.com/devjtv/jev-router) OMP model+thinking picker. Quoted: **This is cost control, not a quality upgrade.** Quoted: **A router must never break a turn.** Fail-open **keep the current model**. Distinct gowtham980 / reallygood83 / justinhsu1477. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[cyriusweng/omp-jev-gate](https://github.com/cyriusweng/omp-jev-gate) OMP plugin. Quoted: **User authorisation and OMP permissions continue to govern actions.** **0.5** checkpoint uncalibrated. Distinct luw2007/omp-jev-extensions. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[CompleteTech-LLC-AI-Research/jev-codex-approval](https://github.com/CompleteTech-LLC-AI-Research/jev-codex-approval) experimental Codex preflight. Quoted: **Codex retains responsibility for permission enforcement.** Quoted: native adapter **has not been compiled or exercised inside a running Codex instance**. Shadow always `defer`. Distinct their jev-sentinel. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JxWayne890/jev-control-plane](https://github.com/JxWayne890/jev-control-plane) Codex runtime router. Quoted: **Prevents the decision model from weakening verified safety rules.** Labeled local fallback. *Theirs*: **33** tests. Distinct jev-dspy-control-plane / pi-jev-control. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dr-dimitru/claude-jev-plugin](https://github.com/dr-dimitru/claude-jev-plugin) Claude Pre/PostToolUse. Quoted: **This plugin is a semantic guardrail, not a security sandbox.** Quoted: **Plugin never returns allow from TypeSafe confidence.** Fails open. Distinct RahulBalakavi/claude-code-jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[4rays/profanity-checker](https://github.com/4rays/profanity-checker) Cloudflare Worker. Quoted: **threshold lives in your code** (**0.5**). Not a coding-agent hook. Cousin jevmod / tonedown / jevfanity-api. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[vzornjak/typesafe-decision](https://github.com/vzornjak/typesafe-decision) Minis advisory layer. Quoted: **Not a safety control, not an authorization mechanism.** Quoted: **authorization is always false.** Quoted: **51.7% may only be cited as an uncontrolled projection, never as a measurement** (*theirs* retraction). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[openlayer-ai/jevals](https://github.com/openlayer-ai/jevals) evals+gates. Quoted: **don't let the classifier become the authorizer.** Quoted: **lets the call through by default.** Quoted: **estimates, not measurements**. Distinct dayhaysoos/jevals. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[DihRJ/claude-code-jev-compaction](https://github.com/DihRJ/claude-code-jev-compaction) LiteLLM tutorial. Quoted: **Nothing is summarized or paraphrased.** Quoted: **It fails open by default.** Threshold **0.2**. Distinct fast-jev-compaction / jev-compactor. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Gtrkrsk/laya](https://huggingface.co/Gtrkrsk/laya) HF listing of the Laya family hub, not a new model. Quoted: Khmer **0.000 accuracy at 0.952 confidence**. **0.85** still soft. Pair NandhaKishorM/laya. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JoacoMarc/jev-harness-router](https://github.com/JoacoMarc/jev-harness-router) per-turn harness router. Quoted: **This is where safety lives.** Quoted: **It does not execute tools.** *Theirs*: skill exact **94.4%**; **113** tests. Distinct AntonioCoppe/Astro-Han/apa-agent-harness. Routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[aniruddh-krovvidi/switchboard](https://github.com/aniruddh-krovvidi/switchboard) stdlib Python gateway. Code `BLOCK` **0.50** / `REVIEW` **0.10**. Quoted: **not measured here.** *Theirs*: ROC-AUC **0.990**, ECE **0.122**. Distinct dev-hari-prasad/switchboard. Soft-as-veto. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[da-vinci-noob/pi-jev-model-router](https://github.com/da-vinci-noob/pi-jev-model-router) Pi model router. Quoted: **Jev judges the task, code owns the budget.** Quoted: **Fails open.** Caps do not block turns. Distinct Mandrilsquad1441 / philippdubach / pi-auto-model-router. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[pi-auto-model-router](https://github.com/dev-willbird1936/pi-auto-model-router) Pi score-based auto router. Quoted: **The parent model is not switched.** Without `subagent`, routing does not dispatch. Distinct da-vinci-noob. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[jjlecocq-v/outbound-draft-gate](https://github.com/jjlecocq-v/outbound-draft-gate) draft-only LinkedIn demo. Quoted: **You always click send.** Quoted: **Code owns policy.** Jev-style evaluate, not TypeSafe Jev. Distinct jev-linkedin / Postmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[notque/vexjoy-agent](https://github.com/notque/vexjoy-agent) Jev-first `/d` router plus evidence hooks. Quoted: `/d` falls back to `/do`. Quoted EVAL.md: force routes make no Jev calls; gateway errors fail open. Quoted: exit gate requires test output. Routing ≠ permission. Distinct JoacoMarc/jev-harness-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[qkal/Canny](https://github.com/qkal/Canny) Claude/Codex done-gate warden. Quoted: **Facts go to code. Judgments go to Jev. Only facts can block.** Quoted hook.ts: Jev can only relax the block. YES **0.9** / NO **0.1**. Distinct clear-head / pi-warden. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[seb4ez/jevguard-mcp](https://github.com/seb4ez/jevguard-mcp) MCP wrap of seb4ez/jevguard. Quoted: `UNRESOLVED_OR_OTHER`; `AMBIGUOUS_STATE`. Quoted: **Official** (*theirs*, not TypeSafe). Distinct raniellimontagna/jev-guard-mcp. Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sathariels/jevtriage](https://github.com/sathariels/jevtriage) PR triage Action+CLI. Quoted: **`ready` only exits 0 when confidence ≥ threshold** (**0.8**). Fail closed. Distinct ThyFriendlyFox/jev-triage / HexyeDEV/JevPR. Soft-score-as-hard-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jamubc/opencode-langsearch](https://github.com/jamubc/opencode-langsearch) optional Jev search-result gate. Quoted: **Fails open**. Quoted: **Treat it as a mitigation, not a security boundary.** Off by default. Distinct Astro-Han/jev-harness / Atikpui007/jev-sift. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bramtechs/Focus](https://github.com/bramtechs/Focus) browser distraction blocker. Allowlist/blocklist first; Jev via OpenRouter; `P(distracting) >= 0.6`. Named heuristic fallback. Soft-as-veto. Distinct gentle-browser-jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[RefoundAI/jev-editor-skill](https://github.com/RefoundAI/jev-editor-skill) editorial gate skill. Code lint first; pass at **70** / voice **60**. Quoted: to-do list, not a grade. Hope the model looks. Distinct claude-jev-warden. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jeffloo886/jev-notion](https://github.com/jeffloo886/jev-notion) Notion property fill. Quoted: **Uncertain entries go to a review queue**. Quoted: **≥ 60%**. `scan` is read-only. *Theirs* **269** tests. Distinct mailverdict / vynnlee/jev-mail. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[simota/tenbin](https://github.com/simota/tenbin) design-time MCP plus skill. Quoted: production **never depends on the MCP**. Quoted: thresholds **provisional until measured**. Distinct wellposed. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[brnyxx/jev-ra](https://github.com/brnyxx/jev-ra) browser MCP; Jev picks op and target. Quoted: **No second LLM runs inside the loop.** Quoted: **never guesses a credential**. *Theirs* **25 of 25**. Distinct jevnav. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[1npo/jev-gmail-labeler](https://github.com/1npo/jev-gmail-labeler) Gmail classify. Quoted: **work in progress.** `label` still TODO. Distinct vynnlee/jev-mail. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[SuperInstance/jev-quilt](https://github.com/SuperInstance/jev-quilt) cell substrate. Quoted: **The decider never renders; the renderer never decides.** Quoted: **Not yet: plugin binaries**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ThePFMind/jev-mcp](https://github.com/ThePFMind/jev-mcp) stdio `jev_evaluate` / `jev_route`. Quoted: **`api.typesafe.ai` rejects `sk_jev-ai_` keys**. Distinct seb4ez/jevguard-mcp. Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[asmirrr/DriftLab](https://github.com/asmirrr/DriftLab) momentum-research CLI. Quoted: **Jev cannot modify a run**. Quoted: **methodology aid, not a market forecast**. Distinct jev-hft. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bouncerguy/jevwrapper](https://github.com/bouncerguy/jevwrapper) LLM-to-JEV middleware. Quoted: **never sends mail, transfers funds, or executes downstream actions.** Quoted: **0.7** demonstration policy. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[cristiancolon/jev-hft](https://github.com/cristiancolon/jev-hft) paper-trading news/market pipeline. Quoted: **It never places real trades**. Quoted: **doesn't beat a one-line rule.** Distinct DriftLab. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dtduc-git/jevnav](https://github.com/dtduc-git/jevnav) replayable browser automation. Quoted: **`done` is a claim, not evidence.** Quoted: **What keeps the loop safe is deterministic.** Quoted **Page truth, not pixels.** `replay` exits 1 with no model call. Distinct jev-ra. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hawkyre/jevx](https://github.com/hawkyre/jevx) X feed/draft scorer. Quoted: **not a validated prediction of views.** Distinct x-spam-filter-typesafe. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[frankyy03/laya-pt-es-nli](https://huggingface.co/frankyy03/laya-pt-es-nli) Laya PT/ES NLI. Quoted: **does not establish superiority**. Quoted: **Refit temperature**. Not TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jourdanlabs/assay-001](https://github.com/jourdanlabs/assay-001) pre-registered Jev assay. Quoted: CLINC150 ECE **0.0204**; Banking77 **0.0936**. Quoted: **not a statement about Jev on any other task**. Distinct gold-assay. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nanami-0713/dsh-jev-decide](https://github.com/nanami-0713/dsh-jev-decide) DSH `jev_decide` tool. Quoted: **only** registers the tool. Distinct codebam/dsh-jev-guardrails. Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[treycausey/semantic-find](https://github.com/treycausey/semantic-find) local search plus optional Jev rank. Quoted: **never sends the whole filesystem.** Quoted: **`local-lexical-fallback`**. Distinct jevex. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ttlequals0/MinusPodJev](https://github.com/ttlequals0/MinusPodJev) MinusPod Jev proxy. Quoted: **POC shim. It does not change the MinusPod runtime that controls holds, autoapproval**. Distinct jev-runway. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nrdz-labs/fast-jev-opencode](https://github.com/nrdz-labs/fast-jev-opencode) OpenCode V2 `context` hook prune. Quoted: **Fails open**. Quoted: rewrites **only the outgoing request**. keepThreshold **0.5** (upstream; not hoshinodis 0.15). **prune ≠ deny**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sable-inc/jev-linter-action](https://github.com/sable-inc/jev-linter-action) Action plus CLI semantic CI. Quoted: expect yes ≥ **0.8**; **0.5 fails**. Quoted: **The model can be wrong, and static lint does not measure how an agent behaves in a call.** Fail closed. Distinct JevLint / mizchi/jev-lint. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Dreydrey9000/jev-relay](https://github.com/Dreydrey9000/jev-relay) local-first advisory router. Quoted: **`requires_review` is always true.** Quoted: **Never use confidence as permission**. Frontier is a handoff. Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ashafizullah/jev-triage](https://github.com/ashafizullah/jev-triage) Probot issue/PR triage. Quoted: **Uncorrected predictions count as correct**. `allowAutoClose` default **false**. Distinct ThyFriendlyFox/jev-triage. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[caohy1988/jev-guard-smoke](https://github.com/caohy1988/jev-guard-smoke) lab smoke for leepokai/jev-guard 0.3.1. Quoted: **dual LGTM ≠ merge**. Advertised backend ≠ served. Nine-row table is not a ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[olivdx/jev-mcp](https://github.com/olivdx/jev-mcp) empty public tree (size 0; Git 409). **advertised MCP ≠ shipped source.** Distinct ThePFMind/jev-mcp. Watch; do not invent continue/fix/retry. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[smlayero/jev-debtgate](https://github.com/smlayero/jev-debtgate) CLI+Action+MCP tech-debt gate. Quoted: **It does not rewrite your codebase.** Quoted: **Do not ship on argmax alone.** `--collect-only` is measurement, not a verdict. Empty `api-key` fails (exit 3). 0 allow / 1 review / 2 block / 3 error. `DEBTGATE_AUTO` **0.85** / `DEBTGATE_REVIEW` **0.5**. Distinct latch / jev-linter-action / JevLint. Soft-score-as-hard-CI-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[BubbatheVTOG/pi-jev-redact](https://github.com/BubbatheVTOG/pi-jev-redact) Pi last-mile redactor `<-REDACTED->`. **Not TypeSafe Jev.** Quoted: **last-mile text redactor, not a complete sandbox or secret manager.** Invalid config **fails closed** (empty payload). Distinct pi-jev-tool-guard. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[abgregs/jev-experiments](https://github.com/abgregs/jev-experiments) `jev-skill-router/` retrieve then Noul then policy. Architecture borrowed from dabit3 `jev-launcher`. Mock judge is not Jev quality. threshold **0.9** uncalibrated. Quoted: **Calibrate on labeled data; not universal.** Routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[kevinlupera/jev-log-sentinel](https://github.com/kevinlupera/jev-log-sentinel) Go CLI+TUI log triage. `is_transient_error` Noul; `root_cause_category` Choice. No key → **offline heuristic fallback** (not semantic Jev). Distinct jev-logtriage / CompleteTech / harshwasan / PavelLizunov. Triage label is not a restart grant. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pyaichatbot/s1p](https://github.com/pyaichatbot/s1p) local S1Router+S1M. **Not TypeSafe Jev.** Quoted: **A caller must not interpret a recommendation as an authorization.** Quoted: **No requirement below is currently claimed implemented.** Defaults remote disabled; **0.90** / **0.10**. Distinct slo-router / sys1. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[qs-lll/twitter-jev-guard](https://github.com/qs-lll/twitter-jev-guard) Chrome MV3 STOP/AD watermarks. Quoted: 不是事实核查工具，也不是平台审核系统. **75%** / 0.75 uncalibrated. Fail-open display (**Jev 请求失败**). Distinct unslopify / slop-filter / x-spam-filter. Watermark is not a hide. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.


[jagsan-cyber/reflex-gate](https://github.com/jagsan-cyber/reflex-gate) local Windows Wails `/jev/*` gateway. **Not TypeSafe Jev.** Quoted: not affiliated with TypeSafe AI. **100.0%** self-test **not a rh-guard ROC**. Distinct localjev / laya / sys1. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hj01857655/jev-router](https://github.com/hj01857655/jev-router) ticket router; `mapResult` only; `autoReply` is a noul, not a send. Distinct reallygood83 / justinhsu1477 / gowtham980 / devjtv. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[DefensiveSniper/jev-subagent-router](https://github.com/DefensiveSniper/jev-subagent-router) Codex/Claude skill; hope the model looks. Quoted: 不等于任务成功率. Distinct jev-model-router / Jev-Auto-Router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PeterP22/jev-triage](https://github.com/PeterP22/jev-triage) paste-in demo; quoted **it only decides, it does not act.** hideSpam **0.9** / hideToxic **0.85** / minConfidence **0.7**. Distinct ThyFriendlyFox / boldbug1 / ashafizullah. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[a1325127730-cyber/jev-quiz-router](https://github.com/a1325127730-cyber/jev-quiz-router) Jev-first quiz then System-2. Quoted: 不能未经验证就解释为真实准确率. CLI **0.85** uncalibrated. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[aquental/jev-guardrail](https://github.com/aquental/jev-guardrail) quoted **Do not gate decisions on `confidence`.** BLOCK jailbreak>**0.50** or severity>=**2.0**. **11/13** synthetic. Distinct codebam / leepokai. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bo7/jev_test](https://github.com/bo7/jev_test) three synthetic emails; classify only. Quoted: **Email content is untrusted input.** Distinct jev-demo-triage / ai-provider-triage-comparison. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ehui1226/hookmeter-jev](https://github.com/ehui1226/hookmeter-jev) Chrome MV3 viral hook; clickbait noul **0.70**; grades S/A/B/C/D. Not a coding-agent hook. Distinct twitter-jev-guard / jevx / Postmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[AkashPriyadarshii/jev-git](https://github.com/AkashPriyadarshii/jev-git) Rust `git-jev` 0.0.1 pre-commit/pre-push; pin `jev-1.13.0`; fail-closed exit 2; **0.80** Block / **0.55** Warn (does not block). Distinct commitjev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ziozzang/hearim](https://github.com/ziozzang/hearim) Go Jev-compatible gateway; quoted **It does not reproduce Jev's model, probability calibration, or latency.** Strict **529** unavailable. Distinct localjev / sys1 / reflex-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[yyy-router/QA-Classifier-Jev](https://github.com/yyy-router/QA-Classifier-Jev) Fact/Definition/Reason classify CLI; no live RAG keep/drop. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[qiaohaojie/Jev-MongoDB](https://github.com/qiaohaojie/Jev-MongoDB) FMCG Change Stream triage; escalate safety≥**0.5** or Safety & Health; quoted **no authentication**. Distinct jev-healthcare-support-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[eziee-ai/jev-router-demo](https://github.com/eziee-ai/jev-router-demo) DeFi router; Jev reads, code ranks; *theirs* B2 **32/32**; quoted **Twelve prompts is a direction, not a benchmark.** Never picks a market. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate) fail-closed Pi permission; `HARD_COMMANDS` first; Distinct fivethirty fail-open. Quoted **This is a lexical permission gate, not a shell parser or sandbox.** Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[atulify/omp-plugin-jev-router](https://github.com/atulify/omp-plugin-jev-router) OMP simple/advanced; fail-open to advanced; **0.75**; routing ≠ permission. Distinct omp-auto-mode / omp-jev-gate. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[aglowinthefield/hermes-typesafe-plugins](https://github.com/aglowinthefield/hermes-typesafe-plugins) WIP shadow `typesafe-tool-gate` + `typesafe-model-router`; fail open; **0.70–0.90**. Distinct typesafe-jev-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Zafer-Liu/jev-demo-rag](https://github.com/Zafer-Liu/jev-demo-rag) keep iff relevance ≥**2** AND injection <**0.5**; *theirs* **83%** / **80%** saved. Distinct karat-filter. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Zafer-Liu/jev-demo-moderator](https://github.com/Zafer-Liu/jev-demo-moderator) publish→review only; never auto-delete; *theirs* ~**$20/M**. Distinct jevmod. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Zafer-Liu/jev-demo-guardrails](https://github.com/Zafer-Liu/jev-demo-guardrails) action Choice encodes policy; *theirs* 6 messages. Distinct aquental. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nexibeo/jev-cookbook](https://github.com/nexibeo/jev-cookbook) quoted **your code prepares the data and owns every decision**; *theirs* 24 messages. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[danielhirt/jev-lab](https://github.com/danielhirt/jev-lab) **Tight, not bitwise**; Distinct copyleftdev/jev-labs. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[JairajSustained/llm-routing-jiv](https://github.com/JairajSustained/llm-routing-jiv) quoted **nothing it produces is executed**; *theirs* 23/24 smoke; quoted **The evaluation set has not been scored against live Jev**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bojansandhaus/jev-lcm-dsh-compaction](https://github.com/bojansandhaus/jev-lcm-dsh-compaction) quoted **not a complete TypeScript port**; **Installation does not select the active engine automatically**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bojansandhaus/jev-lcm-hermes-compaction](https://github.com/bojansandhaus/jev-lcm-hermes-compaction) experimental RC Hermes LCM compaction; **Installation does not select the active engine automatically**. Distinct dsh-compaction. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[soyelmismo/laya-multilingual-onnx](https://huggingface.co/soyelmismo/laya-multilingual-onnx) Not TypeSafe Jev; *theirs* 250 to 300ms. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[shimo4228/jev-skill-router](https://github.com/shimo4228/jev-skill-router) quoted **A secret pasted into a prompt is sent as typed**; inject ≠ grant. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[vlasvar/jev-research](https://github.com/vlasvar/jev-research) **advertised research app ≠ shipped source**; greek-scrabble pending rename. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[wangmiaozero/laya-router-skill](https://github.com/wangmiaozero/laya-router-skill) quoted **sole approval gate**; `advisory: true`; quoted **The Laya output is advisory only**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gargpratyush/jev-router](https://github.com/gargpratyush/jev-router) quoted **Routing is fail-open**; `minConfidence` **0.3**; routing ≠ permission. Distinct reallygood83 / justinhsu1477 / gowtham980. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[BillionsBobby/JevRouter](https://github.com/BillionsBobby/JevRouter) quoted **Jev owns the decision probabilities**; *theirs* **44%** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ba2slk/jev-command-gate](https://github.com/ba2slk/jev-command-gate) quoted **classified only, not executed**; **0.60** uncalibrated; API error → `ask`. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[andrei10k/claude-jev-model-router](https://github.com/andrei10k/claude-jev-model-router) quoted **never hurt**; tool-set first; observe default; **0.15** / **0.3**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Ryder-MHumble/Awsome-Jev-Router](https://github.com/Ryder-MHumble/Awsome-Jev-Router) quoted **never an automatic action**; *theirs* **256**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Akashdb5/jev-router](https://github.com/Akashdb5/jev-router) quoted **GateUnavailable**; **0.95** / **0.88**; *theirs* **86.2%** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jimmyliao/jev-storyboard-lab](https://github.com/jimmyliao/jev-storyboard-lab) `check_segment()`; noul > **0.6**; *theirs* 7/1. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[daviddl9/jev-router](https://github.com/daviddl9/jev-router) quoted **Fresh context is not a sandbox**; **0.8**; routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[1105623876/qwenpaw-jev-memory-gate](https://github.com/1105623876/qwenpaw-jev-memory-gate) **0.50**; fail-open RETRIEVE; skip ≠ deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[kyle-chalmers/typesafe-jev-incident-router](https://github.com/kyle-chalmers/typesafe-jev-incident-router) registry first; **0.75** / **0.70**; quoted **These thresholds are illustrative.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Iskandeur/system1-system2](https://github.com/Iskandeur/system1-system2) **advertised demo ≠ shipped source**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[EricsenSemedo/t3code-jev](https://github.com/EricsenSemedo/t3code-jev) **advertised Jev routing ≠ shipped source**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[yjsplay2002/jev-router-dashboard](https://github.com/yjsplay2002/jev-router-dashboard) quoted **CLI exit success alone is not quality verification.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[grapefruit0205/jev-save](https://github.com/grapefruit0205/jev-save) quoted **never blocks an efficiency judgment**; distinct leepokai/jev-guard. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Joker666/Reflex](https://github.com/Joker666/Reflex) **0.85**; *theirs* 0.26 vs 0.99; distinct reflex-gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[DowLucas/browser-jev](https://github.com/DowLucas/browser-jev) fail **0.9** AND severity **3**; sample not argmax. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[AltSlate-Labs/certo](https://github.com/AltSlate-Labs/certo) quoted **not affiliated with TypeSafe**; *theirs* ECE **0.004**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/agent-mandates](https://github.com/gbesse/agent-mandates) quoted **authorizationGranted: false**; structural first. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[taifoon-io/n8n-nodes-typesafe](https://github.com/taifoon-io/n8n-nodes-typesafe) quoted **Nothing fails open.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ashishakkumar/Jev-Checkpoint](https://github.com/ashishakkumar/Jev-Checkpoint) quoted **It never performs the selected action.**; **0.95**; `jev-latest` moving alias. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[bhzdcz/multica-typed-decision-router](https://github.com/bhzdcz/multica-typed-decision-router) quoted **no external side effects**; quoted **based solely on a Jev answer**; Keychain `airoweb.multica.typesafe`. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[eyenpi/actionreflex](https://github.com/eyenpi/actionreflex) quoted **starting points, not calibrated values**; default `on_error` raise; *theirs* F1 **89.3**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nedzen/decision-gate](https://github.com/nedzen/decision-gate) quoted **Only `pass: true` items get read**; unsure **0.3–0.6**; skip ≠ deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[phamhongviet/pi-ext-model-router](https://github.com/phamhongviet/pi-ext-model-router) pin `jev-1.13.0`; fail-closed **Request was not sent**; routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[ruban-24/switchboard](https://github.com/ruban-24/switchboard) quoted **your policy makes the final choice**; **0.70**; distinct empty switchboard. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[vuckuola619/reflex](https://github.com/vuckuola619/reflex) quoted **Probabilistic providers never override deterministic hard policy.**; RC **1.0.0rc2**; distinct Joker666. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[luhayes/jev-agent-router](https://github.com/luhayes/jev-agent-router) quoted **never executes a selected tool, Skill, agent, or shell command**; **0.8**; `jev-latest`; live unverified. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Mazukriez/Jev-AI-Model-Security-protection-tool](https://github.com/Mazukriez/Jev-AI-Model-Security-protection-tool) (`jevshield` **0.1.0**) regex ALLOW/REVIEW/BLOCK; advertised Scan API ≠ shipped HTTP; distinct lgy1027. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[OmarAlaaeldein/jev-verifier-skill](https://github.com/OmarAlaaeldein/jev-verifier-skill) quoted **advisory signal, never proof**; fail-open; **0.80**/**0.20** uncalibrated. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[advance-lion/dsh-jev-hook](https://github.com/advance-lion/dsh-jev-hook) quoted **Replacement-first, not addition-first.**; **0.85**; `fallbackToLLM` true; slice top-K unused Choice. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[advance-lion/dsh-jev-hooks](https://github.com/advance-lion/dsh-jev-hooks) advertised hooks ≠ shipped source (409). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[s1lv3rj1nx/openjev-router-healthcare](https://huggingface.co/s1lv3rj1nx/openjev-router-healthcare) **not TypeSafe Jev**; *theirs* **0.899** vs **0.941**; FPR **0.652**; recall **0.583**; synthetic demo. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hiro1202/jev-review-gate-poc](https://github.com/hiro1202/jev-review-gate-poc) advertised review gate ≠ shipped source (409). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[microchipgnu/jev-hooks](https://github.com/microchipgnu/jev-hooks) **0.2.0**; quoted **not a sandbox**; **0.8** alert, no transaction. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[wylu1037/pi-jev-checkpoints](https://github.com/wylu1037/pi-jev-checkpoints) quality gate not weight snapshot; fail-open; **0.8**/**0.4**/**0.85**/**0.5**; not a fact checker; distinct Jev-Checkpoint. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[ryanzen9/XFlow](https://github.com/ryanzen9/XFlow) Blur Veil; no silent provider failover; sensitivity 70 is a 30% threshold; advertised sync/cache ≠ shipped Features; distinct twitter-jev-guard. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ChuckNomis/linkedin-post-filtering-jev](https://github.com/ChuckNomis/linkedin-post-filtering-jev) Choice highlight/dim; does not hide; `jev-latest`; early scaffold; fail-open error attr. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nk412/judgements](https://github.com/nk412/judgements) **0.1.0** MIT Alpha; quoted **Use the probabilities to make policy explicit**; **0.5** bool flip is not a deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jiawei686/jev-screen-mcp](https://github.com/jiawei686/jev-screen-mcp) **0.1.0** MIT; quoted **A high spam_prob alone is never permission to block**; named mock; hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jiawei686/jev-review-mcp](https://github.com/jiawei686/jev-review-mcp) **0.1.0** MIT; `auto_merge` only approve AND **0.8** AND **0.6**; quoted **never permission to merge**; named mock. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[yamadashy/jev-labeler-action](https://github.com/yamadashy/jev-labeler-action) **0.1.0** MIT; **0.8**; pin `jev-1.13.0`; quoted **The action only adds labels**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hyspacex/jev-router](https://github.com/hyspacex/jev-router) **0.1.0** MIT; quoted **NO_SAFE_ADMISSION**; session bind; routing ≠ permission; Distinct reallygood83 / justinhsu1477. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[alexei-led/pi-model-router](https://github.com/alexei-led/pi-model-router) **0.6.1** MIT; fork of yeliu84; quoted **not tool permissions or security levels**; **0.65**; advisory. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[cmd-siri-bot/llm-gateway](https://github.com/cmd-siri-bot/llm-gateway) **SECURITY_THRESHOLD = 0.25** sole block; quoted **the gate hasn't cleared**; anti-pattern. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PhilPentatonic/hermes-model-routing](https://github.com/PhilPentatonic/hermes-model-routing) **1.0.0** MIT; *theirs* **82.4% / 89.2%** on 74; hope-the-model-looks; not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jackygu2006/reasonix-jev-compaction](https://github.com/jackygu2006/reasonix-jev-compaction) Go port of fast-jev-compaction; **0.5**; quoted **never treats "no answer" as "delete"**; fail-open continue. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[WesleySmits/spark-jev-email-triage](https://github.com/WesleySmits/spark-jev-email-triage) quoted **No product features, persistence, email access, or external services.**; advertised triage ≠ shipped gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Charlie-Qi394/jevrouter-prompt-tier-extension](https://github.com/Charlie-Qi394/jevrouter-prompt-tier-extension) **1.1.0** MIT; quoted **not an official TypeSafe product**; **0.60**; Analyze click; not a picker. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) one-tool `evaluate`; 16 MiB rejected never truncated; TYPESAFE wins; hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp) **0.1.0** MIT; quoted **Incomplete context never permits `auto`**; quoted **Jev never invents arguments or executes tools**; mock not production. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[leepokai/jev-guard](https://github.com/leepokai/jev-guard) **0.3.1** MIT; deny `from_untrusted ≥ 0.7` or `risk ≥ 2.5`; quoted **never lifts a deny**; fail-open default. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[mejiasd3v/pi-jev-router](https://github.com/mejiasd3v/pi-jev-router) **0.4.0** MIT; quoted **Choose once. Stay pinned.**; quoted **Failure retains current effort**; routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[joelhooks/pi-fast-jev-compaction](https://github.com/joelhooks/pi-fast-jev-compaction) **0.1.0** MIT; quoted **never rewrites the JSONL**; **0.5**; fails open. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[Mandrilsquad1441/jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) **1.0.0** MIT; no key → offline keyword; quoted **Not affiliated**; routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[freepik-company/jev-mcp](https://github.com/freepik-company/jev-mcp) quoted **never leaks your credential**; incomplete answers fail the call; not affiliated. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PerryLink/laya-mcp](https://github.com/PerryLink/laya-mcp) **0.1.0**; quoted **confidence is not accuracy**; Khmer **0.000** at **0.952**; **Not TypeSafe Jev**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hugo-alves/jev-router-playground](https://github.com/hugo-alves/jev-router-playground) sessionStorage keys; quoted **never paste a key**; CORS proxy. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[TokenTrim/jev-routing-experiment](https://github.com/TokenTrim/jev-routing-experiment) *theirs* **62.4%** vs **60.3%**; quoted **no-Jev ablation matches it**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[kitze/skillbox](https://github.com/kitze/skillbox) **0.1.0** MIT; quoted **never executes uploaded skill code**; recs additive; uncalibrated 0–4. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[iammrduncan/typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) advertised gateway ≠ shipped gateway; *theirs* 475/476 vs 479/480; not a ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[shiftynick/jev-axi](https://github.com/shiftynick/jev-axi) **0.7.0**; quoted Jev **never writes text**; guard exit **3**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Brainwires/jevwire](https://github.com/Brainwires/jevwire) **0.6.0**; pin `jev-1.13.0`; **0.85**/**0.6**; quoted **never prompt you**; no key → judgment hooks inactive. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[docxology/daf-jev](https://github.com/docxology/daf-jev) **0.3.0**; `confidence_gate` **0.6**; fail open to deterministic fallback. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[rashedInt32/jev-mcp](https://github.com/rashedInt32/jev-mcp) **0.5.0**; quoted file contents **never enter the agent's context**; Distinct jev-lens. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[m0rphtail/triagedy](https://github.com/m0rphtail/triagedy) **0.1.0** Rust; quoted **never a silent default**; **0.6** review_required. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PerryLink/layacore](https://github.com/PerryLink/layacore) GitHub description retired name reservation now laya-mcp; README still quoted **nothing here is installable yet**; GitHub rename ≠ remaining README. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PerryLink/layacore-mcp](https://github.com/PerryLink/layacore-mcp) GitHub description retired name reservation now laya-mcp; README still quoted **no server to run**; GitHub rename ≠ remaining README. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Robertzu43/system-one-security-triage](https://github.com/Robertzu43/system-one-security-triage) **0.1.0**; 1,500 synthetic decisions; quoted **not a statistically powered benchmark**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[adibirzu/llm-router-axi](https://github.com/adibirzu/llm-router-axi) **0.1.0**; policy schema live; routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[codaaiteam/jev-mcp](https://github.com/codaaiteam/jev-mcp) **1.0.0**; `jev_gate` allow/confirm/block; quoted **Not affiliated**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gastonmira/typesafe-triage-demo](https://github.com/gastonmira/typesafe-triage-demo) noul ≥ **0.5** AND conf ≥ **0.75**; quoted Noul **no tiene `confidence`**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[geronimo-deploy-cloud/typesafe-tpm-mcp](https://github.com/geronimo-deploy-cloud/typesafe-tpm-mcp) **0.1.0**; quoted **Hard gates ignore confidence**; quoted **Fails closed.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[s1lv3rj1nx/openjev-healthcare-router](https://huggingface.co/datasets/s1lv3rj1nx/openjev-healthcare-router) dataset not encoder; quoted **Not for clinical use**; Distinct openjev-router-healthcare. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[s1lv3rj1nx/openjev-router-lora](https://huggingface.co/s1lv3rj1nx/openjev-router-lora) LoRA **not TypeSafe Jev**; quoted **Not a medical device**; FPR **0.826**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jamarius-fortson/model-router](https://github.com/jamarius-fortson/model-router) **0.1.0**; budget **before** the call; `BudgetExceeded`; no Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[kuldeepsinh19/jev-decision-gateway](https://github.com/kuldeepsinh19/jev-decision-gateway) **0.0.1**; quoted **fails open by design**; `minConfidence: 0`. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ndolinschi/pulselane](https://github.com/ndolinschi/pulselane) **0.1.0**; quoted **Without a key, demo heuristics return the same answer shape**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Das-rebel/a3m-router](https://github.com/Das-rebel/a3m-router) `adaptive-memory-multi-model-router` **2.16.4**; `model="jev-auto"` local option-attention; `MIN_CONFIDENCE` **0.22** falls to heuristic; optional `A3M_JEV_URL`. Routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ClemensSchartmueller/jev-guard](https://github.com/ClemensSchartmueller/jev-guard) Go MIT; `enforcing`/`audit`; Jev down → ASK; Distinct leepokai/alsoleg89/pablozr/seb4ez. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[AABBAASS1/jev-router](https://github.com/AABBAASS1/jev-router) noul > **0.7** optional approval; Routing ≠ permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[E-FL/typesafe-as-a-judge](https://github.com/E-FL/typesafe-as-a-judge) **0.1.0**; quoted **not an autonomous authority layer**; Distinct itsmostafa. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[aryasaatvik/pagegraph](https://github.com/aryasaatvik/pagegraph) **0.8.3**; Vite fails undeclared pages; editorial non-failing. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[herval/openclaw-jev-plugin](https://github.com/herval/openclaw-jev-plugin) `openclaw-jev-gate` **0.1.0**; unsure → standard never light; `failOpen` true. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[mooooorty/jev-openworld](https://github.com/mooooorty/jev-openworld) **0.1.0**; quoted **not live Jev measurements**; **0.80** experimental. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[st1ne/jev-gem-scan](https://github.com/st1ne/jev-gem-scan) mocked Jev; shadow default; never real trades. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[0x1f/pi-jev-multi-provider](https://github.com/0x1f/pi-jev-multi-provider) **0.5.1**; auto does not fail over; toolGuard **0.85** fail-open. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[AdelysAlberto/pi-laya-router](https://github.com/AdelysAlberto/pi-laya-router) **0.1.0**; **250ms** fail-open; Routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[F0Rextasy/omp-laya-judge](https://github.com/F0Rextasy/omp-laya-judge) **0.1.0**; *theirs* **8/12**; not wired into `judge()`. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[HuXioAn/jev-telegram-channel-router](https://github.com/HuXioAn/jev-telegram-channel-router) quoted **Jev is the router**; not a coding-agent hook. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Locaryn/morph-browser](https://github.com/Locaryn/morph-browser) Laya aide not garantie; lexical without Laya. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PerryLink/laya-mcp-npm](https://github.com/PerryLink/laya-mcp-npm) launcher not implementation; confidence is not accuracy. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[PerryLink/layacore-install](https://github.com/PerryLink/layacore-install) retired name reservation; README still not installable. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Renwang-Huang/typesafe-mcp](https://github.com/Renwang-Huang/typesafe-mcp) gate/review never authorize; Distinct itsmostafa. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[RiwRiwara/jev-computer](https://github.com/RiwRiwara/jev-computer) toy NAND; not a gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Sidharth1743/IndicPHI](https://github.com/Sidharth1743/IndicPHI) fail-closed audit pipeline; not a coding-agent hook. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[applex250/jev-skill-laya](https://github.com/applex250/jev-skill-laya) L-only fork; never presented as TypeSafe calibration. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ccai40359-wq/jev-triage](https://github.com/ccai40359-wq/jev-triage) RETRY/FIX_CODE/FIX_ENV; *theirs* **16/16** not a field claim; Distinct ThyFriendlyFox. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[dbssman/jev-minesweeper](https://github.com/dbssman/jev-minesweeper) quoted **The model judges, code decides.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/decision-hub](https://github.com/gbesse/decision-hub) **0.1.0**; errors remain failed rows. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/jev-marches](https://github.com/gbesse/jev-marches) **0.1.0**; pin `jev-1.13.0`; callers own actions. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gustavofullstack/macrix](https://github.com/gustavofullstack/macrix) **v0.24.0**; 7 Jev tools; quota never silences. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hemanth/pkg-gate](https://github.com/hemanth/pkg-gate) **0.2.0**; `isSafe()` boolean; no key → simulator. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[piratehack009/laya-cn-flash-triage](https://huggingface.co/piratehack009/laya-cn-flash-triage) no card; advertised triage ≠ shipped card. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[i3u8/jev-skill-selection](https://github.com/i3u8/jev-skill-selection) **0.1.0**; threshold **0.45**; catalog shrink ≠ deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[inematds/laya](https://github.com/inematds/laya) **v0.4.4**; *theirs* **13/16**; **0.85** review reason; Distinct NandhaKishorM/laya. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jeonck/jev-local-sample](https://github.com/jeonck/jev-local-sample) open-jev; conf < **0.6**; not TypeSafe by default. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jiawei686/jev-paper-review-mcp](https://github.com/jiawei686/jev-paper-review-mcp) **0.1.0**; advisory only; Distinct jev-screen-mcp. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[lBroth/nullpii](https://github.com/lBroth/nullpii) hobby PII; OOD F1 **0.7784** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[lhviet/jev-bridge](https://github.com/lhviet/jev-bridge) **0.2.0**; cache hit ≠ correctness; Distinct tacticocc/Jevbridge. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pkj3002/arxiv-economics-for-chat-users](https://github.com/pkj3002/arxiv-economics-for-chat-users) 3058 papers; not a live gate. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[rafaelbatistazz/jev-openrouter-runbook](https://github.com/rafaelbatistazz/jev-openrouter-runbook) runbook not a gate; Distinct tamaratran/fast-jev-compaction. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ricardochen1996/dsh-laya-router](https://github.com/ricardochen1996/dsh-laya-router) **0.1.0**; quoted **Advisory, never coercive**; Distinct codebam. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[smixs/code-quality-skill](https://github.com/smixs/code-quality-skill) deterministic tamper/CRAP gate; 0 false blocks not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[vinodjagwani/jev-claude-demo](https://github.com/vinodjagwani/jev-claude-demo) Spring Boot; **Jev decides, Claude writes**; treating **0.8** as a rh-guard ROC is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[iamvatsalpatel/tiershift](https://github.com/iamvatsalpatel/tiershift) TypeSafe Jev tier routing; Routing ≠ permission; treating 40 percent as a safety envelope is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sungatetop/Jev-robot](https://github.com/sungatetop/Jev-robot) System One/Two 3D demo; treating idle fallback as a safety envelope is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[NoNFake/job-classifier-search](https://github.com/NoNFake/job-classifier-search) Laya rank after keyword gate; treating a Laya percent as a hire is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Uri-cyber/typesafe-agent](https://github.com/Uri-cyber/typesafe-agent) min-confidence tool caller; **0.6** starting point; Distinct ThiagaoBR. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[chrismathew3/fast-jev-codex](https://github.com/chrismathew3/fast-jev-codex) Quoted **The stock Codex plugin supplements normal compaction**; prune ≠ deny; **14/14** not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[diluteoxygen/JevPalette](https://github.com/diluteoxygen/JevPalette) 16-color Choice plus Closed Beta Gate; access codes are structural, not Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[fstandhartinger/decision-desk](https://github.com/fstandhartinger/decision-desk) support-triage demo; treating a demo triage as a permission grant is theater. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router) Quoted **never selects a model from a benchmark score**; Routing ≠ permission; Distinct reallygood83 / gargpratyush. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/jev-proxy](https://github.com/gbesse/jev-proxy) Quoted **never sends policy data to a model**; structural first; Distinct agent-mandates. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[chanoian/openjev-mlx-demo](https://huggingface.co/spaces/chanoian/openjev-mlx-demo) Quoted **OpenJev is an independent project**; advertised MLX ≠ served FP8; Not TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[clduab11/jev-calibration-statistics](https://huggingface.co/datasets/clduab11/jev-calibration-statistics) Quoted **Gate mobility**; **11%** vs **99%**; pin `jev-1.13.0`. *Theirs* 0.612 against 0.740. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[prakash7474/Jev_guard](https://github.com/prakash7474/Jev_guard) Quoted **it never kills a process**; Distinct leepokai. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[rdutra/laya-mcp](https://github.com/rdutra/laya-mcp) Quoted **Laya decisions are probabilistic signals, not authorization**; Distinct PerryLink/laya-mcp. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[turenlabs/jast](https://github.com/turenlabs/jast) Quoted **Findings are candidate signals, not verdicts**; 80% Youden is not what the app achieves today. `priority` is a routing weight, not a calibrated risk score. Each scan records its threshold. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[wjw66/deepseek-harness-jev-pre-compaction](https://github.com/wjw66/deepseek-harness-jev-pre-compaction) **advertised pre-compaction ≠ shipped source**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.


[AntonG87/codearia-sieve](https://github.com/AntonG87/codearia-sieve) Quoted **Sieve prepares. The judge judges. The agent writes.** Optional selector is not a veto. *Theirs* 11 of 11 is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Alpha-Harper-Franklin/astra-jev](https://github.com/Alpha-Harper-Franklin/astra-jev) **advertised gates ≠ shipped source**. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Anxiety471/idle-mmo-bot](https://github.com/Anxiety471/idle-mmo-bot) Hunt cap **cannot be overridden by Jev**. Stub on API failure. Fold the hook only. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[MarkChu-git/typesafe-mcp](https://github.com/MarkChu-git/typesafe-mcp) `decision` computed in code. `jev_gate` **not implemented yet**. Distinct itsmostafa / Renwang-Huang. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Obrais-cloud/ticket-rerank](https://github.com/Obrais-cloud/ticket-rerank) Urgency Score is a sort key. Caller owns composite. All-fail HTTP 502. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[apolenkov/jev-codex-router-lab](https://github.com/apolenkov/jev-codex-router-lab) Quoted **does not execute skills**. *Theirs* n=1 ended in fallback. Distinct 0xNatoshi. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[awoaCrim/pi-smart-subagents](https://github.com/awoaCrim/pi-smart-subagents) Quoted **Resolve every worker before allowing a launch.** Failed `select` throws before finalize. **Profiles are tool-selection policy, not a sandbox.** Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[gbesse/jev-rerank-server](https://github.com/gbesse/jev-rerank-server) Quoted **Do not rerank untrusted text for authorization decisions.** *Theirs* SciFact nDCG is not a rh-guard ROC. Distinct jev-proxy. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-gate-student-b-merged](https://huggingface.co/SargeDev/jev-gate-student-b-merged) Merged Student B weights. *Theirs* 81.7% agreement is not a rh-guard ROC. Not the adapter n=60 card. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nathan1313/issue-triage-bot](https://github.com/nathan1313/issue-triage-bot) **advertised triage ≠ shipped classifier**. v0.1 posts `bot:received` only. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sisodias/jev-agent-skills](https://github.com/sisodias/jev-agent-skills) Quoted **does not** install hooks or grant permissions. *Theirs* 51 cases are not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[uzuraDev/cookie-clicker-jev](https://github.com/uzuraDev/cookie-clicker-jev) Closed candidate Choice. A Jev error stops the loop without `act`. Not a coding-agent hook. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[walidboulanouar/jev-agent-kit](https://github.com/walidboulanouar/jev-agent-kit) Hook **never returns `allow`**. Quoted **It is not a security boundary.** Distinct jonathanavis96/jev-kit. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[arnavm-codes/JevFence](https://github.com/arnavm-codes/JevFence) Fail closed by default. Quoted **one layer of defence, not the only one.** Author set is not a benchmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Georgy-hook/rimworld-autopilot](https://github.com/Georgy-hook/rimworld-autopilot) (GPL-3.0, Python, HEAD `fb82dbf`, **0.0.1**; current listing of [Georgy-hook/laya-rimworld-director](https://github.com/Georgy-hook/laya-rimworld-director), which redirects here). Quoted **Use a copied save.** Quoted README: **The controller — not the model — defines the allowed actions and validates their parameters.** Loopback only; Not TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Makia9879/pi-jev-router](https://github.com/Makia9879/pi-jev-router) Quoted **Jev never writes code and never appears as a chat model.** Distinct mejiasd3v. Routing ≠ permission. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[dannyowelch/jev-abstention-checker](https://github.com/dannyowelch/jev-abstention-checker) sufficiency **confidence > 70%**; label-order swap. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[emlama/jev-mcp](https://github.com/emlama/jev-mcp) Quoted **The TypeSafe API key never leaves the server.** Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[opg13/laya](https://huggingface.co/opg13/laya) **advertised hub identity** differs from this listing; Not TypeSafe Jev. Do not dump weights. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[hfnissum-byte/jevmerge](https://github.com/hfnissum-byte/jevmerge) Quoted **It does not write code.** *Theirs* 49% is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jordilopez/pi-smart-router](https://github.com/jordilopez/pi-smart-router) Quoted **never a heuristic tier.** Routing ≠ permission. Distinct Makia9879. Thin card. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[naiersaidane/jev-demos](https://github.com/naiersaidane/jev-demos) Quoted **l'agent ne parle jamais en premier.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[piyushsonawane07/trueKeep-jev](https://github.com/piyushsonawane07/trueKeep-jev) Quoted **it can never block your session.** Prune ≠ deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[prakash5284/jev-vs-llm-resume-jd-eval](https://github.com/prakash5284/jev-vs-llm-resume-jd-eval) Quoted **not a general leaderboard.** *Theirs* cost table. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ruslanlap/jev-gate](https://github.com/ruslanlap/jev-gate) Quoted **The model never returns executable content.** Distinct totally-tim. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[theglitcharchitect/muse-skills](https://github.com/theglitcharchitect/muse-skills) Quoted **never toward silent approval.** Shadow proceeds. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[AkashPriyadarshii/jev-seo](https://github.com/AkashPriyadarshii/jev-seo) Quoted **Thresholds live in one place.** Distinct jev-git. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[revsmoke/promptrejectormcp](https://github.com/revsmoke/promptrejectormcp) Quoted **A low Jev score does not let a prompt skip reasoning.** `unavailable` means do not approve. Hope-the-model-looks. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sirkirby/routr](https://github.com/sirkirby/routr) Quoted **Advice, never an override.** Pin `jev-1.13.0`. *Theirs* 61 of 68 is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Debasishhh/jevguard](https://github.com/Debasishhh/jevguard) `BLOCK_NOUL` **0.75**. *Theirs* 83% catch is not a rh-guard ROC. Distinct seb4ez / navidkashani. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[khursheed33/laya-routing-and-descision-making](https://github.com/khursheed33/laya-routing-and-descision-making) Uninitialized engine returns 503. **Not TypeSafe Jev.** Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[krisitown/jev-router](https://github.com/krisitown/jev-router) Quoted **Fallback is off by default.** Distinct sonson0910. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[lldois/dsh-jev](https://github.com/lldois/dsh-jev) Quoted **local keyword heuristic shortlists.** Gate default **0.7**. Distinct tr1v3r. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[navidkashani/jev-guard](https://github.com/navidkashani/jev-guard) Quoted **The plugin never approves a comment on its own.** Spam **0.85** is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[sonson0910/jev-router](https://github.com/sonson0910/jev-router) Quoted **never uses Jev to lower risk or bypass a gate.** Fail-open. Distinct krisitown. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[vishalbitit/jev-prior-auth-triage](https://github.com/vishalbitit/jev-prior-auth-triage) advertised prior-auth triage ships `README.md`, `pipeline/triage.py`, `policy/policies.py`, `data/*`, and `analysis/*`. No license. Quoted **Jev never denies anything.** Routes are `auto_approve`, `pend_clinical_review`, and `peer_to_peer_required`. `auto_approve` is a route, not a permission. `auto_approve` is not a hard grant. Soft judgment is never the sole veto. Distinct from [bhaskarpraveen/jev-healthcare-support-router](https://github.com/bhaskarpraveen/jev-healthcare-support-router). Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[benjamincanac/tia](https://github.com/benjamincanac/tia) Quoted **It never closes, transfers or converts an issue.** **Providers without a distribution count as certain.** `dryRun` defaults true. A label is not a close. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[satiricalguru/Fast-Jev-Agents](https://github.com/satiricalguru/Fast-Jev-Agents) Quoted **Default 'throw' for strict mode.** Hook fail-open to built-in compaction. 50/50 passing is not a rh-guard ROC. Prune is not deny. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Alberto-Codes/judgevet](https://github.com/Alberto-Codes/judgevet) Quoted **The response shape is verified.** Tools `ask_noul`, `ask_choice`, `ask_score`. If the agent never calls the tools, no gate runs. The 90% coverage floor is not a rh-guard ROC. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[Ivanovskyi/typesafe-ai-gateway](https://github.com/Ivanovskyi/typesafe-ai-gateway) Threshold 0.75. `executeMockService` is not a live dispatch. Routing is not permission. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[SAITS-Swiss-AI-Tech-Services/jev-mcp](https://github.com/SAITS-Swiss-AI-Tech-Services/jev-mcp) Quoted **There is no blocklist.** The domain lock is code. Distinct from emlama/jev-mcp. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[aleksvega/jev-skill-router](https://github.com/aleksvega/jev-skill-router) Quoted **A broken router never blocks your agent.** The advertised exit 2 is not the served exit. `--init` prints the paste rule and does not write the file. Choice over at most 60 skills. Distinct from shimo4228/jev-skill-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[anchorshell/relay](https://github.com/anchorshell/relay) Quoted **The built-in AnchorShell Classifier remains the default.** **Private, bounded Laya adapter.** anchorshell/relay is not TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[canok07/jev-router](https://github.com/canok07/jev-router) advertised jev-router ≠ shipped source. canok07/jev-router is not a shipped router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router) Quoted **No model available within the configured maximum.** **Jev is unavailable; continuing with** a route inside the cap. Distinct from 0xNatoshi/jev-codex-router. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[qasimhammad1/applyguard](https://github.com/qasimhammad1/applyguard) Quoted **Only the human can consent and submit.** Five nouls at 0.5. The public demo never submits an application. A demo BLOCK is not a hire. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server) (HEAD `6c07e23`) Description rewrite (*theirs*): five judgment tools over TypeSafe/OpenRouter decisions. Quoted **so agents see the warning and decide whether to proceed.** advertised verbatim extract ≠ shipped presence noul. `fail_on` is not a host deny. Soft judgment is never the sole veto. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[gnapse/jev](https://github.com/gnapse/jev) Quoted **the caller decides what action to take.** **it does not activate them or modify agent settings.** If the agent never calls the tools, no gate runs. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[haystackeditor/stop-rules](https://github.com/haystackeditor/stop-rules) Quoted **a quiet hook is not a clean codebase.** **an exit code alone does not tell you whether the turn was clean.** Threshold **0.6** is a default to look at, not a recommendation. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[jonkthomas/jev-shadow](https://github.com/jonkthomas/jev-shadow) Quoted **Nothing is launched; it is a shadow.** **it never overrides them.** Demo numbers say nothing about Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[maxvaega/gmail-jev-guard](https://github.com/maxvaega/gmail-jev-guard) Quoted **it always starts OFF.** The bar does not hide, delete, or block mail. No license file. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[ppradyoth/jev-guard](https://github.com/ppradyoth/jev-guard) Quoted **heuristic linter, not a prover.** **not a guardrail.** It does not call the model. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[4esv/jev-eval](https://github.com/4esv/jev-eval) (Python, no license, HEAD `59b7e61`) benchmarks TypeSafe Jev against OpenRouter models and local checkpoints on labelled classification data. Quoted README: **Training on the benchmark decides the winner.** *Theirs* n=300 per task on `jev-1.13.0` is not a rh-guard ROC. Quoted caveat: at n = 300 differences under about 5 points are noise. A bake-off table is not this sidecar's deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Bodila51/jev-hft-model-router](https://github.com/Bodila51/jev-hft-model-router) (MIT, Python, HEAD `e6b1081`) turns a trading request into a confidence-gated pick from up to 254 registered strategy models. Quoted README: Jev does not **execute orders.** The offline backend **is not Jev** and identifies itself as `heuristic-demo`. Quoted: **it never silently forces a recommendation.** `min_selection_confidence` **0.45** is uncalibrated. PAPER TEST REQUIRED is their pipeline step, not a fill. A model pick is not a trade. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Tech-Byte-Frontier/jevgate](https://github.com/Tech-Byte-Frontier/jevgate) (README: MIT OR Apache-2.0, Rust, HEAD `d795941`) is file-scoped maintainability review with TypeSafe Jev. Quoted README: **Findings currently remain advisory.** Quoted: **a built-in enforcement policy is not implemented yet.** Quoted: **Probabilities are model judgments, not measured accuracy.** Distinct from [thevibeworks/jevgate](https://github.com/thevibeworks/jevgate). Advisory findings are not a merge deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jon-devlapaz/tink-route](https://github.com/jon-devlapaz/tink-route) (MIT, Python, HEAD `13b4f7d`) routes Agent Skills with a Noul gate, then a Choice. Stage 1 exits `no_skill_needed` when p < **0.60**. *Theirs* **100.0% (6/6 passing)** and **0.0% (0/3 on negative controls)** are not a rh-guard ROC. Manifest skills are **never pruned**. A recommended skill is not a grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[0x7067/claude-jev](https://github.com/0x7067/claude-jev) (MIT, Python, HEAD `2b9f409`) is a Claude Code plugin for rule checks, verbatim compaction, and prompt routing. Quoted README: **All five fail open:** any error, missing key, or timeout produces no output and never blocks a prompt. Below **0.75** confidence, nothing. At **0.80** the edit is blocked; that probability is uncalibrated and is not a structural deny. *Theirs* **3 blocked (1.2%)** and **12 of 19** are not a rh-guard ROC. Distinct from [RahulBalakavi/claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[BhavinM/jev-policy-studio](https://github.com/BhavinM/jev-policy-studio) (README: PolyForm Noncommercial 1.0.0, Python, HEAD `7a25c3e`) is a visual policy workspace. GitHub description is null. Quoted README: a **SmartMock** local offline evaluator runs without an API key. SmartMock is not live Jev. Studio toggles are `BLOCK` vs `AUDIT`, not this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[DoGMaTiiC/hermes-jev](https://github.com/DoGMaTiiC/hermes-jev) (README says MIT; no root LICENSE file, HEAD `6a4768a`) routes each Hermes turn to one skill via TypeSafe Jev on the Vercel AI Gateway. Quoted README: **Fail-open, always.** No key, timeout, or HTTP error leaves the turn untouched. `jev-judge` defaults to shadow (log only). `jev-skill-router` defaults to off (opt-in). Quoted: **Thresholds live in code**, never in the model. Distinct from [robbyczgw-cla/hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) and [keeltrace/hermes-jev](https://github.com/keeltrace/hermes-jev). An injected skill line is not a grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Jhonnyr97/RuleGuard](https://github.com/Jhonnyr97/RuleGuard) (MIT, TypeScript, default branch `master`, HEAD `a9f6687`) checks project rules through a System One contract. Quoted README: a failed verifier **fails open**, and **a broken verifier never blocks the agent.** The API key is never read from `.ruleguard/config.json`. A healthy hook can still block; a 401 does not. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Loule95450/jev-free-router](https://github.com/Loule95450/jev-free-router) (MIT, JavaScript, HEAD `698b0b7`) is a per-turn OpenCode router on free Zen and Go models. It replaces the former Claude Code and Codex launchers from [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router). It is not that repository. Quoted README: probabilities are **router estimates**, not a guarantee nor experimentally calibrated success rates. If TypeSafe itself fails, it keeps the previous eligible model. Routing is not permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Madikhan33/jev_codex](https://github.com/Madikhan33/jev_codex) (MIT, Python, HEAD `e3ffed1`) is context-aware routing for Codex. Description rewrite (*theirs*): classify prompts, choose agent profiles, coordinate subagents, and verify results. Quoted README: **The hook does not launch agents or switch the parent model.** Profiles are configurable policy presets, **not benchmark rankings.** Quoted: **`git pull` alone is not an update to the installed runtime.** The credential file is plaintext, not an encrypted keychain. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) and [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router). A profile hint is not a permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[fallow-rs/fallow-verdict](https://github.com/fallow-rs/fallow-verdict) (MIT, TypeScript, HEAD `16f638a`) maps Jev probabilities onto fallow verdicts `survivor`, `dismissed`, and `needs-human-review`. Quoted README: **Verdicts are triage results, not proof.** Packets that fail the checks are `needs-human-review`, **never silently dropped.** Quoted: the canary is **a routing heuristic, not a security boundary.** Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[gurkirat309/JEV_COMMAND_GUARD](https://github.com/gurkirat309/JEV_COMMAND_GUARD) (no license, JavaScript, HEAD `dd49a07`) is a shell seatbelt for coding agents. Quoted README: **This is a seatbelt against your own mistakes, not a security boundary.** Quoted: **Ships in shadow mode.** v1 classifies and logs. It blocks nothing and allows nothing. On timeout, API error, or 429: **emit nothing.** Quoted: **The model supplies judgment. This code owns every decision.** Distinct from [JasonHZS/pi-jev-command-guard](https://github.com/JasonHZS/pi-jev-command-guard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[inferenceprince/laya-onnx-fp16](https://huggingface.co/inferenceprince/laya-onnx-fp16) (Apache-2.0) is an ONNX fp16 export of `convaiinnovations/laya`, **849 MB**. **Not TypeSafe Jev.** *Theirs* fp16 accuracy **76.7%** with **0 / 116** decisions changed versus PyTorch is not a rh-guard ROC. Quoted: **`choice` confidence is badly scaled.** Quoted: **Not a zero-shot decision engine.** Calibrate on your own data before gating. Distinct from [inferenceprince/laya-onnx-int8](https://huggingface.co/inferenceprince/laya-onnx-int8). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[inferenceprince/laya-onnx-int8](https://huggingface.co/inferenceprince/laya-onnx-int8) (Apache-2.0) is the int8 weight-only ONNX build of the same Laya checkpoint (block 64, **613 MB**). **Not TypeSafe Jev.** *Theirs* int8 row **76.7%** and **0 / 116** decisions changed is not a rh-guard ROC. Quoted: **`choice` confidence is badly scaled.** Distinct from the fp16 repo. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jimbobbennett/typesafe-guardrails](https://github.com/jimbobbennett/typesafe-guardrails) (no license, Python, HEAD `26a0d1b`) screens an OpenAI Agents SDK chat with TypeSafe System One, traced in Arize. Default model `jev-latest` (moving alias). Quoted README: **A system prompt is not a secret.** Quoted: agreement is indicative, **not a controlled measurement.** Their ~110ms check is not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lastlad/jev-model-router](https://github.com/lastlad/jev-model-router) (MIT, Python, HEAD `6336b0e`) is a LiteLLM proxy plugin. The layout names **six Jev questions**, then routes to the cheapest `(model, effort)`. Aliases include `jev-auto-gpt`. Deploy docs cover shadow mode. The root README does not state a fail-open or fail-closed default. Distinct from [Mandrilsquad1441/jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router). Routing is not permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[mingleiw/jev-oncall](https://github.com/mingleiw/jev-oncall) (no license, Python, HEAD `b5cd3bd`) triages incidents on TypeSafe Jev. Description rewrite (*theirs*): the model judges, plain code decides. Quoted README: **Jev never pages anyone. It only judges.** Error, timeout, or a malformed answer is fail-open to configured severity. Quoted: the **14 synthetic alerts** are **a smoke test, not an evaluation.** Calibration **can't be measured at all** on that set. *Theirs* 11/12 is not a rh-guard ROC. Being unsure costs a REVIEW, never silence. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[nikkoxgonzales/jev-certify](https://github.com/nikkoxgonzales/jev-certify) (MIT, Python, HEAD `5dfe582`) turns Jev probabilities into conformal routing thresholds. Quoted README: a probability **does not tell you what your system will do.** *Theirs* **2,412** decisions for **$0.23** are not a rh-guard ROC. Quoted: **α = 1% is infeasible.** Thresholds live in calling code. A certificate is not this sidecar's deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[prestonkakukdev/Agent-Defense](https://github.com/prestonkakukdev/Agent-Defense) (MIT, Python, HEAD `a56faee`) blocks tool calls, strips prompt injection, and scans skills. Quoted README: **Jev never makes the final decision.** Quoted: **A guardrail, not a sandbox.** **Default is fail closed** (a human decides). `--mock` is **not a real defense.** Hard rules in code run before Jev. *Theirs* **0 / 14** legitimate actions wrongly blocked is not a rh-guard ROC. It follows [leepokai/jev-guard](https://github.com/leepokai/jev-guard). It is not that repository. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[vishalbitit/jev-prior-auth-triage](https://github.com/vishalbitit/jev-prior-auth-triage) description rewrite (*theirs*, HEAD `06572c1`): payer-side utilization management, synthetic PHI-free data, audit-logged decisions. Quoted README: **Synthetic data only.** Quoted: **not a validated clinical or coverage decision system.** Quoted: **must not be used for real coverage or clinical decisions.** `auto_approve` is not a hard grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[rawwerks/one-system](https://github.com/rawwerks/one-system) (MIT, Go, release **v0.2.0**, 1 star, live HEAD `1104500`) is a System One gateway: local Laya and hosted Jev behind `POST /v1/systemone`. Quoted README: **Privacy Demo is not a privacy filter.** It **does not inspect the input for sensitive data.** A request with only one eligible backend **skips model-based selection, even if that backend is hosted.** Quoted `router.go`: **One representable destination: selection cannot change the outcome.** The privacy-demo rule `above` **0.5** on `math_or_logic` is a default to look at, not a recommendation. Quoted README: the routing question and threshold are **editable examples**. Quoted `router.go`: **Hard constraints apply first; soft preferences can only restore capable backends.** Soft judgment is never the sole veto. Routing selection is not permission. This gateway is not this sidecar. Distinct from [fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router) and [krisitown/jev-router](https://github.com/krisitown/jev-router). Do not merge into `examples/`. Cousin, not this sidecar.

[inferenceprince/laya-onnx](https://huggingface.co/inferenceprince/laya-onnx) (Apache-2.0, sha `dd0f4db`, 1 star) is an independent ONNX conversion of `convaiinnovations/laya`, not an official Convai Innovations release. README title **Laya — ONNX (fp16)**. Quoted table: `model.onnx` **3.3 MB** graph; `model.onnx.data` **842.6 MB** fp16 weights. **Not TypeSafe Jev.** Quoted: **The labels were generated by a language model, not written by human annotators.** *Theirs* overall **76.7%** on **116** synthetic items, same answer as upstream PyTorch on all 116, worst shift **1.8e-03**, is not a rh-guard ROC. Quoted: **`choice` confidence reads far lower than its real accuracy.** Quoted: **Not a zero-shot decision engine.** Quoted: **`act_probability` carries no signal.** English only; confidence gating will not catch the non-Latin collapse. Distinct from [inferenceprince/laya-onnx-fp16](https://huggingface.co/inferenceprince/laya-onnx-fp16) (**849 MB**) and [inferenceprince/laya-onnx-int8](https://huggingface.co/inferenceprince/laya-onnx-int8) (**613 MB**). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[osrim/readwise-jev-classifier](https://github.com/osrim/readwise-jev-classifier) (MIT, TypeScript, 1 star, HEAD `578cb54`) auto-tags and triages a Readwise Reader inbox with TypeSafe Jev. Quoted README: **It never writes back to Readwise.** Twenty-three noul tags; a probability of **0.80** or more applies a tag. Quoted: a middle score means **"cannot tell"** rather than no (scores 40 to 79 show as unsure). Triage choice: read now, skim, keep as reference, or drop. Quoted: the Vite dev server proxies `/readwise` and `/jev` so **neither key reaches the browser.** Quoted: **This works in `npm run dev` only.** The PocketBase binary is not shipped. Not a coding-agent hook. A tag is not a grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Jhonnyr97/JevGuard](https://github.com/Jhonnyr97/JevGuard) (MIT, TypeScript, HEAD `ecdba7a`) checks project rules through System One on Claude Code and Codex CLI. Quoted README: the API key **is never read from `.jevguard/config.json`.** Quoted: a broken verifier **never blocks the agent, it just stops checking.** `src/bin/jevguard-hook.ts` writes `{}` on catch, while paused, and when the event is not a verify request (fail-open). Default model `jev-latest` (moving alias). Defaults: PreToolUse `"block"`, Stop `"warn"`. `evaluateRule` maps noul `>= 0.5` to yes or no; a type mismatch returns `passed: true`. A healthy PreToolUse deny is the Jev answer alone, with no structural floor (soft-as-veto). Quoted status: **Not yet verified: behavior parity on Codex CLI.** Pause is a user-triggered flag file. Distinct from [Jhonnyr97/RuleGuard](https://github.com/Jhonnyr97/RuleGuard) (HEAD `a9f6687`), [pablozr/JevGuard](https://github.com/pablozr/JevGuard), and [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[MrDesjardins/jev-send-guard](https://github.com/MrDesjardins/jev-send-guard) (no license file, Python, HEAD `d432d77`) watches an allowlisted app's focused draft and shows a popup. Quoted README: **It never blocks anything — there's no send gesture to hook into by design.** Quoted: **the default allowlist is empty.** If browser host detection is unavailable or denied, **browser checks stay disabled rather than falling back to app-wide monitoring.** README file list: `jev_client.py` **fails open on any error.** macOS is **not yet run against a live session.** A popup is not a send deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Rocketstradingco/memory-router](https://github.com/Rocketstradingco/memory-router) (MIT, Python stdlib, HEAD `72ce3c2`) routes multi-agent memory and leases the write. Quoted README: **The router advises; your agent does the actual write.** `store == "dont-store"` means transient. Quoted: **No fallback in this version.** Unreachable Jev is an error: `app.py` returns **502** on `HTTPError` and **500** on other exceptions. Lock TTL defaults to **45** seconds, in-memory, one instance. OpenRouter `typesafe/jev-1.13`. MCP `memory_route`, `memory_lock_acquire`, and `memory_lock_release` on **8131**; HTTP **8130**. Quoted: **Don't send secrets to `/route`.** Routing is not a write grant; the lease is code. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Sofiyaan12/jev-support-routing](https://github.com/Sofiyaan12/jev-support-routing) (no license file, Python, HEAD `bbf198e`) prints a support-ticket route. README title **JEV Support Ticket Routing**. Quoted: **JEV by TypeAI** (not TypeSafe). `app.py` asks a Choice for department, a Score for urgency 1–5, and a Noul for churn. Code: `churn_prob > 0.75` escalates retention; `urgency >= 4` and Enterprise escalates senior; a cancellation choice routes to retention; otherwise the standard queue. It prints the string. There is no ticket write and no try/except, so a throw is uncaught rather than a named fail-open. **0.75** is uncalibrated. A printed route is not a grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[devthinker-ai/laya-mcp](https://github.com/devthinker-ai/laya-mcp) (MIT, Python, HEAD `20136b3`) is on-device Laya-MLX over MCP and HTTP `127.0.0.1:8901`. **Not TypeSafe Jev.** Default `LAYA_MODEL` is `aac6fef/laya-multilingual-mlx`. Tools `laya_decide`, `laya_score`, and `laya_is_true` return probabilities; the server does not deny. Quoted sample confidence **0.9999** is a sample, not a ROC. Advertised **~10ms after warm-up.** Install line `uvx --from laya-mcp`. Distinct from [rdutra/laya-mcp](https://github.com/rdutra/laya-mcp) and [wangmiaozero/laya-router-skill](https://github.com/wangmiaozero/laya-router-skill) (same default MLX id, different tree). Hope-the-model-looks. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[TracNetwork/mayhem-catalog-convaiinnovations-laya](https://huggingface.co/TracNetwork/mayhem-catalog-convaiinnovations-laya) (Apache-2.0, sha `d288cbf`, transformers) is a catalog copy of `convaiinnovations/laya`. The tree has `model.safetensors` plus `multilingual/` and `typed-decisions/` weights, not an empty card. **Not TypeSafe Jev.** The README is the upstream family card (English root **421M**). Quoted there: Khmer **0.000 accuracy at 0.952 confidence** and **confidence gating cannot save you** — the copied card, not a new ROC. Distinct from [inferenceprince/laya-onnx](https://huggingface.co/inferenceprince/laya-onnx) and [Gtrkrsk/laya](https://huggingface.co/Gtrkrsk/laya). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lucasbaruj4/jev-context-gate](https://github.com/lucasbaruj4/jev-context-gate) (no license file, HEAD `19d824c`) sketches a local-first source librarian. Quoted README: **Jev does not generate an answer to the research question.** Quoted status: **Project bootstrap only.** `AGENTS.md` at this HEAD names `jev-context find` and a spending cap, but the public tree is README, `AGENTS.md`, `research/jev.md`, and `.gitignore` — no CLI. Advertised cost ceiling ≠ shipped source. Selected chunks would be sent to TypeSafe. There is no threshold in code. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[marwan404/Jev-gate](https://github.com/marwan404/Jev-gate) (no license file, Python, HEAD `4906bbd`) classifies a shell command with Jev before execution. Quoted README: **Jev does not execute the command.** Quoted `jev_gate.py`: **no verdict means no ALLOW.** An API error returns exit **3**; a missing key returns exit **2**. `HARD_BLOCK_CATEGORIES` is the Jev choice `destructive_or_dangerous`, not a regex floor. risk `>= 3.5` or `needs_confirmation >= 0.75` returns BLOCK (exit 1). The BLOCK reason says human review; exit 1 does not prompt. confidence `< 0.5` and risk `>= 1.0` returns CONFIRM. `--yes` auto-accepts CONFIRM only. Timeout default **8** seconds. Distinct from [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate), [eugeniughelbur/jev-gate](https://github.com/eugeniughelbur/jev-gate), [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate), and [dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate). A Jev category mapped to exit 1 is still soft judgment. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[takezou621/jev-mcp](https://github.com/takezou621/jev-mcp) (README says MIT; no root LICENSE file, TypeScript, HEAD `09da9f7`) is a Jev judge for hosts. Quoted README: **回答確率 p はホストに渡らない.** `judge.ts` states **Judgment.action に p は含まれない.** docs/05: failMode `open` continues (既定), `closed` blocks, `escalate` asks. observe plus gate `reversible` plus block becomes pass, with would-block logged. Defaults trueMin **0.75**, falseMax **0.25**, minConfidence **0.5**. Missing confidence stays unknown; it is not collapsed to false. README still shows **構成（予定）** and **実装フェーズで追加**, while `packages/core` is already in the tree. Advertised planned layout ≠ shipped core. Sister [takezou621/jev-claude](https://github.com/takezou621/jev-claude) median **584ms** is *theirs*, not this repo's ROC. Distinct from [emlama/jev-mcp](https://github.com/emlama/jev-mcp), [SAITS-Swiss-AI-Tech-Services/jev-mcp](https://github.com/SAITS-Swiss-AI-Tech-Services/jev-mcp), [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server), [gnapse/jev](https://github.com/gnapse/jev), [ThePFMind/jev-mcp](https://github.com/ThePFMind/jev-mcp), and [olivdx/jev-mcp](https://github.com/olivdx/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[upcastr/codex-jevroid](https://github.com/upcastr/codex-jevroid) (MIT, Node 24+, HEAD `4290224`) is experimental thread-scoped working memory for Codex, ranked by Jev. Pin `jev-1.13.0`. Quoted README: **Historical text never grants new permission.** Quoted: **Jev confidence is not a correctness guarantee.** A starting confidence of **0.7** may recommend effort; uncertainty leaves the recommendation null. `advise_effort` does not change the Codex model or effort. Missing keys or provider failures use local retrieval. Hook errors report reduced coverage and allow Codex to continue (fail-open). Quoted: **intended workflow benefits, not measured improvements.** Quoted: **a complete live Codex compaction cycle has not yet been verified.** The live eval is a smoke evaluation, not a task-success benchmark. Default packet **2,500** o200k_base tokens. `private: true`. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router), [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router), [Madikhan33/jev_codex](https://github.com/Madikhan33/jev_codex), and [miniLV/Jev-Auto-Router](https://github.com/miniLV/Jev-Auto-Router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Taf0711/system-one-compiler](https://github.com/Taf0711/system-one-compiler) (MIT, Go, HEAD `19399db`) measures whether a judgement can be lowered onto a cheaper model, then serves that verdict as a base-URL gateway in front of a coding harness. Quoted README: **One Go executable and no third-party dependencies.** Quoted: **it is the only thing that authorises a substitution.** Quoted: **The provider's call is never skipped.** Quoted: **The application's own recorded answer is never ground truth.** The runtime starts in bypass and returns there when anything is wrong; shadow discards the decision answer; active returns it only with passing frozen-holdout evidence. Quoted `gate.go`: **Only the fourth of those is a confidence threshold. Confidence cannot compensate for failure of the others.** Quoted: **a rejected prediction is not a fallback answer, it is a refusal to answer.** A missing gate **fails closed**. Quoted README: **Zero observed errors is reported as a bound, not as safety.** Distinct from [rawwerks/one-system](https://github.com/rawwerks/one-system) and [localjev](https://github.com/githubnext/localjev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[abgregs/jev-skill-router](https://github.com/abgregs/jev-skill-router) (no license file, TypeScript, `private: true`, HEAD `386eebc`) scores one Noul per skill, sharded in parallel, then plain code thresholds. Quoted `policy.ts`: **Thresholds are calibrated on labeled data, not universal.** Default threshold **0.85**. `maxSelected` is a **bloat guard, not a quality mechanism.** The mock judge validates the pipeline, **not** Jev's real routing quality. Quoted README: the UserPromptSubmit hook is silent on conversational turns and on any error — **it never breaks a turn.** Quoted `pre-tool-use-gate.ts`: **FAIL-OPEN by design: routing is a policy layer, not a security boundary.** No state or stale state allows. *Theirs* **~340ms over 1,064 skills** is not a rh-guard ROC. Distinct from [abgregs/jev-experiments](https://github.com/abgregs/jev-experiments) `jev-skill-router/` (threshold **0.9**), [shimo4228/jev-skill-router](https://github.com/shimo4228/jev-skill-router), and [aleksvega/jev-skill-router](https://github.com/aleksvega/jev-skill-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ehab-ayman-gharib/border-protocol](https://github.com/ehab-ayman-gharib/border-protocol) (no license file, TypeScript, HEAD `298fb44`) is a three-case border-inspection game. Jev through the Vercel AI Gateway returns semantic evidence only. Quoted README: **It never returns an admission verdict.** Quoted: **Code applies a single combined policy.** Quoted: **These thresholds are game rules, not measured calibration guarantees.** Quoted: **Coherence is an ordinal rubric score, not a probability of innocence.** Quoted: **This is a fictional single-player game, not a real border decision system.** Confidence **0.7**, contraband risk **0.8**, clear risk **0.2**. Quoted resolution text: **a plausible story cannot override invalid papers.** Missing keys use the in-memory deterministic simulation. Quoted: **Credentials are never sent to the browser.** Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lifeporterlab/jev-verdict](https://github.com/lifeporterlab/jev-verdict) (MIT, Python, HEAD `2074018`) turns Jev judgments into auditable workflow gates with a cache, a ledger, per-gate policy, and stability measurement. Quoted README: **Does not guarantee judgment accuracy.** Quoted: **Not a quality claim.** Quoted: **It never stores source text or prompt bodies.** Quoted: **Keys are never printed and never written to the ledger.** Quoted: **No other location is ever read.** Code default `on_error` is **pass**; the example pre-publication gate sets **stop**. Quoted: **A service failure must not silently publish unverified content.** `block_at` default in code is **1.0**; the example uses **0.70**. A cache hit is the newest stored judgment, not a correctness proof. Exit **0** pass/warn, **1** block, **2** stopped by gate error policy. Distinct from [fallow-rs/fallow-verdict](https://github.com/fallow-rs/fallow-verdict) and [pantos12/mailverdict](https://github.com/pantos12/mailverdict). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[nikkoxgonzales/elmridge-ai-town](https://github.com/nikkoxgonzales/elmridge-ai-town) (MIT, JavaScript, HEAD `f5726c4`) is a three.js town simulation with an MCP server and an optional TypeSafe Jev decision layer on OpenRouter (`jev-1.13`). Quoted README: **Without a key the layer stays offline and the game runs exactly the same.** Quoted `decisions.js`: **answers below the confidence gate are recorded but not acted on**, and **the heuristic schedule in characters.js keeps working as the baseline either way.** `confidenceGate` **0.5** is uncalibrated. The file comment says **Jev returns calibrated probabilities**; that wording is not a measured ECE. A content Noul still nudges morale. The 25 MCP tools can puppet the town. That puppeting is a game control, not this sidecar. *Theirs* **0 deaths** over 20 simulated days and **52** headless assertions are not a rh-guard ROC. Distinct from [nikkoxgonzales/jev-certify](https://github.com/nikkoxgonzales/jev-certify). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[gholtzap/jev-codex-model-and-effort-router](https://github.com/gholtzap/jev-codex-model-and-effort-router) (no GitHub license, Python, HEAD `64b0899`) selects the Codex model and effort for the first task in a thread. Quoted README: **That route stays pinned for later turns so the thread can reuse its model cache.** **Greetings and other social messages do not set the pin.** Default `routing_mode` is `thread`; `turn` asks before every turn. A manual model or effort change becomes the new pin. With no key, the first `codex` start lets the user add one, **continue with normal Codex, or remove Jev**. **Use remaining quota when routing** is on by default; **high quota pressure selects the least intensive route that still meets the task's capability floor.** That floor is a routing preference, not a safety deny, and a thread pin is not a permission. Distinct from [romanmeclazcke/codex-sift](https://github.com/romanmeclazcke/codex-sift), [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router), [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router), and [aesgalexis/model-switch](https://github.com/aesgalexis/model-switch). Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[AidinZaeim/jev-fuzz](https://github.com/AidinZaeim/jev-fuzz) (no GitHub license, Go, HEAD `51ddb90`) is a web fuzzer whose judgment envelope is the fold, not its probe procedure. Quoted README: it evaluates captured HTTP responses **against strict, deterministic schemas**. HTTP `402` / `429` pauses in-flight evaluation and can downgrade to **Blind Passthrough Mode**. Quoted disclaimer: **Unauthorized scanning of third-party systems is illegal.** A schema match is not a vulnerability verdict, and Blind Passthrough is not a security boundary. Do not copy the scan procedure into this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[JohnCari/rossrecall](https://github.com/JohnCari/rossrecall) (no GitHub license, TypeScript, HEAD `0454680`) is an evidence-backed litigation draft gate. Quoted README: facts and rules are **selected and quoted, not written**. Quoted: **Not "this system does not hallucinate."** Quote match is exact after whitespace and typography normalisation; **There is no fuzzy matching**. Quoted: **The gate is code, not a prompt.** `finalize_draft` is **Refused in code while anything is open**. Quoted: **If CourtListener is down, the citation is reported as unavailable and the sentence goes to the attorney.** Quoted: **An outage is never a finding that a case is fake, and never a pass.** Quoted: **Read the interval, not the zero.** *Theirs* held-out bad sentences **0 of 19**, Wilson **0.0% to 16.8%**, are not a rh-guard ROC. Quoted: **none was adjudicated by a practising attorney.** Quoted: **Guarantees live in code the model cannot reach.** Quoted: **The record is evidence, not instruction.** Quoted: **nothing in it is legal advice.** Not this sidecar's eval gate. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[NeerajMohanty/RFxCheck](https://github.com/NeerajMohanty/RFxCheck) (Apache-2.0, JavaScript, HEAD `dca18ec`) is a Chrome extension that runs semantic RFx checks. Quoted README: **RFxCheck never asks Jev to write a summary.** `FINDING_THRESHOLD` **0.80** in `src/rfx-rules.js` is a semantic decision probability; quoted: **It is not an accuracy rate.** Quoted: **The original source text stays the evidence.** Quoted: **The API key never reaches the page.** Quoted: **findings require human review.** Quoted: **RFxCheck does not determine bid compliance.** Quoted: **RFxCheck is not legal advice.** Live note: `jev-latest` serving `jev-1.13.0`. Quoted: **These are examples from one live validation run, not general accuracy benchmarks.** *Theirs* **126 automated tests** are not a rh-guard ROC. A finding probability is not an unreviewed deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Zyw052/astrbot_plugin_jev_radar](https://github.com/Zyw052/astrbot_plugin_jev_radar) (MIT, Python, default branch `master`, version **1.1.0**, HEAD `564fc8f`; live README is larger than watch evidence blob `a1cd38d8`) is an AstrBot intent radar. Quoted README: official `reply_gate` decides whether the bot replies; this plugin outputs **人怎么理解这条消息**. Passive mode is **默认关闭**. `confidence_threshold` **0.75** and `risk_alert_threshold` **2** are uncalibrated alert knobs, not a hard deny. Model `jev-latest` (moving alias, not a pin). Copilot candidates **只推送给主人** and **永不向原会话发送**. `/jev dry` **只回显「将要发送的内容」，不发送、不写记录**. A risk label is not a send deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[baize7815/jev-mcp-open-source](https://github.com/baize7815/jev-mcp-open-source) (MIT, JavaScript, HEAD `929d1c1`; live README is larger than watch evidence blob `d99941af`) is a self-hosted Cloudflare Worker MCP for routing. Tools: `route_intent`, `rerank_candidates`, `batch_judge`, `system_one`. Quoted: **所有判断都只返回结构化答案与置信度，不生成散文**. A failed batch record is marked `failed` and **不会被当作"无关"丢弃**. Below `min_confidence` (example **0.65**) the route returns `needs_review` and `__uncertain__`. Quoted: that threshold **不是正确性保证，也不构成用户授权**. Quoted: `/mcp` **不设鉴权**. If the agent never calls the tools, no gate runs (hope the model looks). Distinct from [emlama/jev-mcp](https://github.com/emlama/jev-mcp), [SAITS-Swiss-AI-Tech-Services/jev-mcp](https://github.com/SAITS-Swiss-AI-Tech-Services/jev-mcp), and [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server). Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[cyberspace-cs/jev-agent-routing](https://github.com/cyberspace-cs/jev-agent-routing) (README states MIT; GitHub license field was null, Python, HEAD `028bdda`; live README is larger than watch evidence blob `57ca0429`) is a DIY agent routing layer. Quoted README: **概率不是安全证明。** Suggested bands ≥ **0.8** auto, **0.5** to **0.8** conservative, below **0.5** drop or human are uncalibrated and are not authorization to execute. Sample `keep_threshold` **0.5** is not a rh-guard ROC. *Theirs* table tool-select **~100ms** vs **2000ms** and simple-decision accuracy **94%** vs **95%** is not a rh-guard ROC. Distinct from [luhayes/jev-agent-router](https://github.com/luhayes/jev-agent-router), which never executes a selected tool. Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dagote/JevBlock](https://github.com/dagote/JevBlock) (README states MIT; GitHub license field was null, JavaScript, HEAD `ef3acd9`) scores page elements with a **System One / Jev-compatible** judge. Default **Annotate** mode shows chips and **do not remove**. Quoted: **Block (actually remove) stays off until you enable it in the popup.** Example `hideMin` **0.75** is uncalibrated. Local scorers may apply **labeled priors**. **Oversized prefixes are skipped silently for that element.** `jev-local` is not TypeSafe Jev. A noul is not a hide grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dxd-dechao/jev-playground](https://github.com/dxd-dechao/jev-playground) (no GitHub license, TypeScript, HEAD `fac2ad4`) is a local playground for **Student safety guardrails** and **Municipal ticket triage**. Quoted README: **Not** a moderation or escalation system. **Nothing is dispatched to any agency.** **Not** a benchmark runner. **"Configured" is not "verified".** A failed call shows its code and **nothing is substituted for it**. In `lib/safety-guardrails.ts`, a missing or off-menu answer goes to **Human review**. Quoted: the Noul probability **is never thresholded into a boolean and never overrides the Choice answers.** The agency taxonomy is **not** verified operational policy. Unlock failures are rate-limited in memory; quoted: that budget **is not a security boundary**. A displayed percentage is not a deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[gdamiani1/jev-feed-triage](https://github.com/gdamiani1/jev-feed-triage) (MIT, JavaScript, HEAD `170c7ad`) scores LinkedIn and Reddit posts. Quoted README: **It never writes or posts anything for you.** **plain code handles the rules, and you do the part that needs judgement.** LinkedIn **0.7** and up badges, **0.4** to **0.7** is a light bar, below **0.4** fades. Quoted: **You write the comment.** *Theirs* invented-set LinkedIn **7 of 8** and Reddit **5 of 6** is not a rh-guard ROC. Quoted: **Scores and angles are suggestions from cheap models.** Distinct from [ChuckNomis/linkedin-post-filtering-jev](https://github.com/ChuckNomis/linkedin-post-filtering-jev) and [ashafizullah/jev-linkedin](https://github.com/ashafizullah/jev-linkedin). A fade is not a hide or a deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[haginot/decision-without-generation](https://github.com/haginot/decision-without-generation) (MIT code, paper CC BY 4.0, Python, HEAD `0dac249`, release v1.0.0) archives moderation, hallucination, NLI, and prompt-injection benchmark runs. Quoted README: **`paper_tables.py` is the authoritative analysis for the report.** The archive **does not contain the original dataset prompts, passages, or full model completions**. Archived results **cannot recreate missing portions of model responses**. `JEV_ENFORCE_BUDGET=1` **is not a provider-side spending cap**. This card does not invent benchmark numbers. *Theirs* paper is not a rh-guard ROC and is not a prompt-injection immunity claim. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[juanmaagd/jev-test-auditor](https://github.com/juanmaagd/jev-test-auditor) (MIT, TypeScript, HEAD `0170fc9`) is a local JS/TS test auditor. Quoted README: **Real Jev evaluation is opt-in only** (`audit --evaluate`). Quoted: **Never fabricates a verdict.** Quoted: **`needs-review` means uncertainty, not a passing or failing grade.** Every request pins `jev-1.13.0`. `CLASSIFICATION_POLICY_V2` `sideMin` **0.65** and `criticalMin` **0.5** are **provisional and versioned, not calibrated claims.** Quoted: the discrimination fixture **does not show that the classifier is accurate.** Quoted: **The audit pipeline is reporting-only: it never executes audited source.** Quoted: **CI is reporting-only in V1; findings do not fail a build.** A cache hit is disclosed separately and is not a correctness proof. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lbbbboom/jev-chat](https://github.com/lbbbboom/jev-chat) (README states MIT; GitHub license field was null, Python, HEAD `a05199b`; live README is larger than watch evidence blob `e5302e00`) is a Windows port of [Finderchangchang/jev-chat-JARVIS](https://github.com/Finderchangchang/jev-chat-JARVIS). Quoted README: **发送始终由你手动点。** Fillback **绝不回车、绝不点发送。** Judgments are `POST /v1/systemone`, model `jev-latest` (moving alias, not a pin). The program fills the input box only. A risk level is not a send deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[maskedband1t/RLCD](https://github.com/maskedband1t/RLCD) (MIT, Python, HEAD `ab00497`) is human-robot oversight research. Quoted README: **Code owns safety.** Quoted: **a fixed handoff threshold means one thing for the judge and drifts for the open model.** The governor set-down rule is code: the one event every judge failed was a rule code already had the facts for. *Theirs* **29 of 30** and **88.3** vs **87.9** are not a rh-guard ROC. Quoted: **Everything positive about the decision loop is measured in simulation we built.** Quoted: the handoff threshold tuned in the cell **did not carry over**. A simulated handoff number is not a production deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[romanmeclazcke/codex-sift](https://github.com/romanmeclazcke/codex-sift) (MIT, TypeScript, HEAD `0230416`) routes each Codex turn. Quoted README: **Jev does not write code.** Quoted: **The policy never asks Jev “which model?”**. If Jev times out or the key is missing, Sift fail-opens to `on_jev_down` (default `craft`) and marks the decision `degraded`. Pin `jev_model` `jev-1.13.0`. Quoted: **Do not ship thresholds against `jev-latest`.** *Theirs* e2e Policy expectation match **11/12** and Estimated quota saved **53.7%** are not a rh-guard ROC. Quoted: **It does not claim answer quality unless you run and score the same prompts through Codex.** Distinct from [gholtzap/jev-codex-model-and-effort-router](https://github.com/gholtzap/jev-codex-model-and-effort-router) and [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router). Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[smaldd14/qavo](https://github.com/smaldd14/qavo) (MIT, TypeScript, HEAD `7cf7804`) drives a browser from typed Jev choices and reports `pass`, `fail`, `blocked`, or `unclear`. Quoted README: **Code owns the loop. The model only picks from the options that code offers.** Quoted: **It never writes code, selectors, or free text.** Quoted: code **never builds a selector from model output.** `expectPass` **0.7**, `expectFail` **0.3**, and `unclear` when confidence is below **0.5** or the expect probability sits between the thresholds. Quoted: **The value of a password field is never sent.** Quoted: **v0 is in progress.** `unclear` is abstention, not a pass. Exit code `0` means `pass` for the reported scenario, not a safety grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[tomtyiu/Jev-decision-plugin](https://github.com/tomtyiu/Jev-decision-plugin) (MIT, Python, HEAD `13118a9`) is a Codex plugin for typed decisions. The README is thin; gate sentences are from `skills/jev-decision/SKILL.md` at that HEAD. Quoted skill: **Confidence is a routing signal, not authorization.** Quoted: **A high-confidence model output must not bypass deterministic access control, authentication, approval requirements, policy enforcement, or other hard safety checks.** Quoted: **Do not claim universal threshold values.** Sample policy `min_confidence` **0.7**, `yes_at` **0.85**, `no_at` **0.15**, `on_uncertain` `review`. Sample model `jev-latest` (moving alias, not a pin). `--dry-run` inspects the request **without making a network call**. Quoted: **When the result is uncertain, say so in the typed status instead of silently forcing a decision.** Gate status includes `accept`, `review`, or `ungated`. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[tonghzhang/jevproof](https://github.com/tonghzhang/jevproof) was not reachable on 2026-09-22: `GET /repos/tonghzhang/jevproof` returned 404, and repository search returned no match. Watch evidence blob `778dcb55` (11389 bytes) is an advertised README capture, not a tree this fold could read. **advertised repo ≠ reachable source.** Do not invent a stress-test harness, a threshold, or a production deny from that capture. A Jev score from an unreachable repo is not an unreviewed hard deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) (MIT, Kotlin, HEAD `c6ae7d3`) is an Android chat copilot for WeChat, QQ, X DMs, and Feishu. Quoted README: **发送永远由你点。** The program only fills the input box, **从不自动发送**, and does not touch transfers, red packets, or payments. Quoted: **不 hook、不改包**. An accessibility service reads the on-screen chat only. TypeSafe Jev scores intent and a danger level. Distinct from [lbbbboom/jev-chat](https://github.com/lbbbboom/jev-chat), a Windows port that quotes **发送始终由你手动点**. A danger level is not a send deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[yangyu666/dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune) (MIT, JavaScript, HEAD `94393cb`) is Jev-judged context compaction for DeepSeek Harness. Quoted README: **What should not be generated by a model is not generated by a model.** Layer 2 injects a **deterministic receipt** computed by code. `neverCompactTools` excludes write-type calls by a hard rule, **never by a probability**. With no judgment, layer 1 falls back to DSH volumetric trim. Layer 2 consumes probabilities as **relative quantiles**, never a fixed threshold. Layer 1 `keepThreshold` **0.5** is a separate keep bar (`P(keep)` at or above it means no trimming). Evidence matching `error` / `assert` / `fail` / `todo` is never moved out (layer 1 may still trim). `minCharsToPrune` **400**. Prune ≠ deny. Distinct from [jasonjeske/hermes-jev-context-engine](https://github.com/jasonjeske/hermes-jev-context-engine) and [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[wotai-dev/typesafe-jev-tools](https://github.com/wotai-dev/typesafe-jev-tools) (MIT, Shell, HEAD `d9df174`) is a Claude Code hook that asks whether a decision needs a model. Quoted README: **It never blocks**. A PreToolUse matcher `Write|Edit` injects a three-way test (regex, DNS, or a database query versus a frontier model versus System One). *Theirs*: sixteen models, **150 identical passages**, run 2026-09-18, zero errors across 2,400 calls. Jev row: accuracy 66.0%, ECE 0.121, unsure **34.7%**, p50 **455ms**. Quoted: **Only four of the sixteen will say they are unsure.** Quoted: the **"40 to 1,000x cheaper" claim is not currently checkable** (`/pricing` and `/limits` 404 as of 2026-09-18). The business-category task is 149 rows (Jev 79.9% vs Haiku 83.2%). That 150-passage table is not a rh-guard ROC. The hook injects the question; it does not answer it. The one-line abstention note stays. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[FahadArfin/Jev_Unreal](https://github.com/FahadArfin/Jev_Unreal) (MIT, Python, HEAD `79851f3`, status **0.1 alpha**) is typed Jev decisions plus a guarded MCP workflow for Unreal editor development. Quoted README: **Jev never executes an editor command**, does not generate arbitrary code, and does not automatically receive project files. **short-lived single-use plans** and stale editor-state rejection. Scene tools need **no model key**. `JEV_MAX_REQUESTS` defaults to 100 attempted provider calls per process and **is not a dollar budget**. Inspired by [cnrveysel/JevUnreal](https://github.com/cnrveysel/JevUnreal); distinct. A typed choice is not an editor grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Pavan14K/jev-agent-router](https://github.com/Pavan14K/jev-agent-router) (no GitHub license, no detected language, HEAD `eccb62a`) has a git tree of one path, `Readme`, a directory sketch that names `src/router.py` and notebooks absent from the tree. **advertised router ≠ shipped source.** Do not invent a router. Distinct from [luhayes/jev-agent-router](https://github.com/luhayes/jev-agent-router), which never executes a selected tool, and from [cyberspace-cs/jev-agent-routing](https://github.com/cyberspace-cs/jev-agent-routing). Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[TimMikeladze/JevLang](https://github.com/TimMikeladze/JevLang) (MIT, JavaScript, HEAD `6923585`) is a policy engine for routes, gates, and actions in TypeScript or Python. Quoted README: **The model only answers questions.** **It never picks the branch.** A confidence gate escalates to a human instead of guessing — **the policy fails safe, not loud.** Offline replay of pure decisions needs no network. `bun add jevlang`, Node 22+, no runtime dependencies. An action name is not a Jev grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[VirtualMachinist/bezel](https://github.com/VirtualMachinist/bezel) (README states MIT; GitHub license field was null, JavaScript, HEAD `170a8be`; README title still **omapi-overlay**; requesting [VirtualMachinist/omapi-overlay](https://github.com/VirtualMachinist/omapi-overlay) resolves to this slug) is a Nix overlay for skills and Jev policy gates. Quoted README: **Shadow, the default, logs the verdict and does not block.** **Shadow never blocks.** `JEV_MODE=active` honors `continue` / `gate: auto` only; `stop` / `escalate` exit 2 and do not exec. **Empty findings are not approval.** `--schema` does not allow the tool; neither path prints `{"decision":"allow"}`. `JEV_BYPASS=1` or `true` skips the router (`yes`, `false`, and `0` are not a bypass). Loop-stop thresholds in `omapi-loop-stop-policy@1` (`conf ≥ 0.6`, `p ≥ 0.55`, `margin ≥ 0.15`) are uncalibrated. The repository **does not include harness source**. Quoted README: **A harness overlay: skills, a Jev toolkit, and adapters.** **Bezel is the supplement, not the harness.** **Bend2 is a later engine. It is not in this tree.** The Jev router is still JavaScript. GitHub description rewrite (*theirs*): harness-agnostic supplemental overlay, bend2 planned, prototype, Rust after PoC. `grok-build-jev` **does not install a host hook**. Permission catalogs stay shadow unless `JEV_PERMISSION_MODE=active`; `JEV_MODE=active` does not turn that surface on. Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jasonjeske/hermes-jev-context-engine](https://github.com/jasonjeske/hermes-jev-context-engine) (MIT, Python, HEAD `3bc7c7b`) is an experimental Hermes compaction plugin that asks TypeSafe Jev which eligible older results to drop. Quoted README: not an official Nous Research, Hermes Agent, OpenRouter, or TypeSafe release. Quoted: **not a replacement for Hermes, its memory system or your main model.** It will **keep uncertain evidence**. A `pruned` metric means the plugin produced a candidate. **It does not establish host-committed compaction.** Otherwise it uses Hermes's normal compressor, or retains the input when proceeding is unsafe. Quoted: **Installation alone does not authorize sending data to Jev.** Quoted: **The benefit is a hypothesis, not a benchmark result.** Prune ≠ deny. Distinct from [yangyu666/dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune) and [bojansandhaus/jev-lcm-hermes-compaction](https://github.com/bojansandhaus/jev-lcm-hermes-compaction). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jfrader/jev-mcp](https://github.com/jfrader/jev-mcp) (MIT, Go, default branch **master**, HEAD `5a1ba95`) is an unofficial stdio MCP client for TypeSafe Jev. Quoted README: **Unofficial client, not affiliated with TypeSafe.** Zero-dependency. Tools `ask`, `choose`, `score`, `noul`. Default `TYPESAFE_MODEL` is `jev-latest` (moving alias; pin once thresholds are tuned). `choose` and `score` set `reliable` against **0.5** by default — not a host deny and not a safety envelope. The server rejects state over 120 KB. Quoted: **It does not generate text, so it cannot write code.** If the agent never calls the tools, no gate runs (hope the model looks). Distinct from [markylaredo/openjev-mcp](https://github.com/markylaredo/openjev-mcp) (OpenJEV, not the TypeSafe API) and [emlama/jev-mcp](https://github.com/emlama/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kitapplegate/commander-oracle](https://github.com/kitapplegate/commander-oracle) (MIT, Python, default branch **master**, HEAD `5cfa75f`) ranks new Magic: The Gathering rares and mythics Buy / Hold / Sell from Commander demand. Quoted README: **Probabilities, not promises.** **not financial advice.** Outlook weights are a starting guess and **haven't been backtested yet**. Prices and EDHREC counts are **kept out** of what Jev sees. Code in `oracle/outlook.py` combines the judgments with those facts. An outlook is not a trade. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[marceloatoledo/jevMcp](https://github.com/marceloatoledo/jevMcp) (no description, no GitHub license) returned **Git Repository is empty** from the commits API on 2026-09-22, and the README fetch was HTTP 404. **advertised MCP ≠ shipped source.** Do not invent an MCP server. Distinct from [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp) and [markylaredo/openjev-mcp](https://github.com/markylaredo/openjev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[markylaredo/openjev-mcp](https://github.com/markylaredo/openjev-mcp) (MIT, TypeScript, HEAD `29e2084`) is an MCP server that calls `POST https://api.openjev.sh/v1/systemone`. Quoted README: `OPENJEV_API_KEY` lives in the server process and **never reaches the model**, the client, or a tool argument. A missing key exits **2**. Tools `jev_ask`, `jev_choice`, `jev_score`, `jev_noul` return typed judgments, **not prose**. Built for DeepSeek Harness; the stdio server also runs in other MCP clients. If the agent never calls the tools, no gate runs (hope the model looks). Distinct from [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[rakshita-devurkar/syncroute](https://github.com/rakshita-devurkar/syncroute) (no GitHub license, Python, HEAD `a8dd521`) routes synthetic data-sync connector failures to seven simulated recovery workflows. Quoted README: **Ordinary code — not the model — owns retry limits, escalation and approvals.** **Nothing is reconnected, restarted, resynced, contacted or modified.** A classification **can never lift a retry limit** or bypass a required approval. The gate is confidence ≥ **0.80** and top-two margin ≥ **0.15**, else review. *Theirs* exact accuracy **88.3%** (53/60) on a frozen held-out split of 60 synthetic events against live `jev-1.13.0` is not a rh-guard ROC. Rules-only was 26.7% (16/60). A route is a next action, not a fix. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[sheshisheri-hi/jev-vs-llm-stock-policy](https://github.com/sheshisheri-hi/jev-vs-llm-stock-policy) (no GitHub license, Python, HEAD `3abd3b4`) compares a chat-model paragraph with TypeSafe Jev on six synthetic stock-order tickets. Quoted README: **A hard deny beats a model allow.** A hard escalate is a floor: the model may still deny, and it may not lower the floor to allow. Cutoffs in `gate.py` **are not a property of the model**. Quoted: **not financial advice.** With no key, the demo still exits 0 and the Jev column is an authored SAMPLE. **SAMPLE rows are not measurements of `jev-latest`.** `jev-latest` is a moving alias. The final gate **does not read the LLM**. Desk cutoffs (action confidence **0.70**, `outside_policy` **0.55** escalate and **0.85** with Critical deny, fraud noul **0.50** escalate and **0.80** deny) are demo policy, uncalibrated. Distinct from [TeoMastro/jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[sperictao/dsh-auto-review-jev](https://github.com/sperictao/dsh-auto-review-jev) (MIT, TypeScript, package `@dsh-external/dsh-auto-review-jev`, HEAD `cfb066a`, commit message **0.2.5**) is a DeepSeek Harness Auto-permission reviewer. Description rewrite (*theirs*): per-tool-call review powered by TypeSafe Jev, with account usage and API-key management inline on its settings page. Quoted README: the plugin does **not** ask for free-text `risk/decision` JSON; Jev returns independent noul and score numbers and the plugin combines them locally into allow or deny. High risk of leaking sensitive data across a trust boundary is **always denied**. Timeout, throttling that survives retries, a malformed response, or a context or schema that cannot be rebuilt: **deny (fail closed)**. **A grant is never remembered** and never widens a later decision. Quoted: **the human may override a denial, the model never may.** `askOnDeny: false` restores a reviewer that never asks. Without `TYPESAFE_API_KEY` the plugin still loads, but it will not let you switch to that preset; tool calls on an already-running preset with an invalid key **fail closed**. Direct Node side effects inside `run_code` that bypass the DSH tool registry are outside this review. Do not load official `@deepseek-ai/dsh-experimental-auto-review` together with this plugin (the official one evicts this one). Combining nouls into allow or deny is their policy; a Jev number is not this sidecar's structural deny. Distinct from [y0usaf/pi-jev](https://github.com/y0usaf/pi-jev) (a design reference whose gate fails open), [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard), and [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.


[Vankleben/jev-arm-lab](https://github.com/Vankleben/jev-arm-lab) (MIT, Python, HEAD `b4f4d10`) is a simulated xArm7 task lab: TypeSafe Jev, or a local rule-based stand-in, chooses the next skill while code keeps the workflow, the geometry, and the safety veto. Quoted README: **keep the veto in code**. Quoted: **the thresholds must be calibrated yourself**. Default gates **0.30 / 0.45** are calibrated from their measurements. Quoted: raising the gate from 0.30 to 0.55 turns task completed into **does not move a single step**. The live row at gates **0.55 / 0.70** vetoed **15 of 16** proposals and froze in place. `--jev-mode fake` is that rule-based stand-in and needs no key. *Theirs*: 20/20 scenes completed, grasp-state judgments correct on all 79 samples (Brier 0.030), 0 dangerous false positives; the wrong protocol would score the same model at 77%. That table is not a rh-guard ROC. Quoted: **monitor data freshness (timestamps/heartbeats) and escalate to a human** — a frozen camera never finishes, with no crash. A Jev judgment is not the safety veto. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[antTing/jev-accounts-hub](https://github.com/antTing/jev-accounts-hub) (MIT, Go, HEAD `41b32ca`) is a multi-account pool and API gateway in front of Jev. Downstream keeps official System One (`POST /v1/systemone`, `GET /v1/models`). Quoted README: **不是 OpenAI `chat/completions` 兼容层.** The caller presents this service's `sk-jev-` key, not the upstream key. Upstream keys are AES-256 at rest. 429 / 529 / 5xx / 401 rotate accounts; a user 422 is returned as-is. Quoted: 绑定代理不可用时**不会**回退直连. The README model table says `jev-latest` **实际跑** `jev-1.13.0`. `jev-latest` remains a moving alias. The gateway is not this sidecar. Distinct from [rawwerks/one-system](https://github.com/rawwerks/one-system) and [fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[WayneCommand/laya-mcp](https://github.com/WayneCommand/laya-mcp) (MIT, Python, HEAD `f918648`) wraps [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) (laya **0.3.5**) as MCP Streamable HTTP on `127.0.0.1:8077/mcp` plus REST. **Not TypeSafe Jev.** Grades are `auto_execute` / `escalate` / `ask_human` / `reconsider`. Quoted README: two strategies at 0.79 / 0.78, the top score looks high, but **它不是一个决策**. The contract uses confidence, margin, and `needs_review` (quoted: **高置信也依然是 escalate**). Example `margin_threshold` **0.05** and `LAYAMCP_CONFIDENCE_THRESHOLD` **0.80** are uncalibrated configuration. Quoted grade `auto_execute` means **直接执行**; that label is not a grant. `GET /v1/healthz` returns 200 with `status=degraded` when the model fails to load (not a crash, and not a safety deny). If the agent never calls the tools, no gate runs (hope the model looks). Distinct from [PerryLink/laya-mcp](https://github.com/PerryLink/laya-mcp), [rdutra/laya-mcp](https://github.com/rdutra/laya-mcp), and [devthinker-ai/laya-mcp](https://github.com/devthinker-ai/laya-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ZongxingH/gemini-quality-gate-jev](https://github.com/ZongxingH/gemini-quality-gate-jev) (no GitHub license, Python, HEAD `d1b6446`; extension **0.2.0**; description rewrite) is a Gemini CLI quality gate on AfterAgent, BeforeTool, BeforeAgent, and SessionStart. Quoted README: **Jev 只回答判断，不生成代码或文字。** Quoted failure mode: **放行**（默认，Jev 不可用时不阻塞你）. The default path is still **Jev 请求失败时 Hook 会放行**: an unexpected exception returns `JEV error; allowed without the quality gate`. A missing key on AfterAgent, BeforeAgent, and SessionStart allows; BeforeTool uses `before_tool.fail_mode`, default **open** (`closed` is opt-in and can block when Jev cannot verify). Named read-only tools are not sent to Jev. `needs_retry` at `after_agent_retry` **0.85** can ask for one retry; `stop_hook_active` allows immediately. Quoted: `confidence < 0.6` 时**不允许自动拒绝**. BeforeAgent and SessionStart default stance `advisory` (a deny is downgraded to allow). A high-confidence BeforeTool deny is their policy, not this sidecar's structural deny. Default model `jev-latest` (moving alias). Config `timeouts` are AfterAgent 5.0, BeforeTool 3.0, BeforeAgent 4.0, and SessionStart 5.0 seconds. **0.85** is uncalibrated. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[bloodfel/modular-rag-mcp](https://github.com/bloodfel/modular-rag-mcp) (no GitHub license, Python, HEAD `dbecf91`) is an MCP RAG server with a Jev rerank provider. Quoted README: Jev **不生成任何文字** and **没有"JSON 解析失败"这条失败路径**. Example config `provider: "jev"`, `model: "jev-1.13.0"`, `min_score: 1.0`. The roadmap still has the min_score quality-gate experiment unchecked, and **HTTP 模式叠加鉴权（Bearer token）** unchecked. *Theirs* BEIR nDCG (scifact/bm25 jev 73.29 vs none 64.99; **6 格中拿 5 个第一**) and p50 ~1.5s / ~$0.17 per 1k queries are not a rh-guard ROC. If the agent never calls the tools, no gate runs (hope the model looks). A rerank score is not a deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dhirajpatra/agent-harness-with-jev-llm](https://github.com/dhirajpatra/agent-harness-with-jev-llm) (no GitHub license, Python, HEAD `2886a72`) is a small multi-agent harness for routing and risky-tool gating. Quoted README: **This harness is built for another piece of software, not a person.** There is no chat UI. No TypeSafe key: `jev_classifier/` is a local TF-IDF/cosine stand-in, **lexical, not semantic**, and **it is not as accurate**. LLM steps mock without `ANTHROPIC_API_KEY`. The router falls back to the LLM if Jev confidence is below a threshold. The guardrail runs only on `compliance_review`. Quoted tests: **a blocked action never reaches `auto_approve_shipment`**. That sentence describes a test assertion, not a production safety proof. The local classifier is not TypeSafe Jev. A soft gate is not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jackchen13755/dsh-jev-lens](https://github.com/jackchen13755/dsh-jev-lens) (BSD-3-Clause, TypeScript, HEAD `dd855cc`) is a DeepSeek Harness Jev quality bench. Default is measure-only. Quoted README: **默认绝不拦截** — `tools/pre-execute` always `return next()`; `gate` is explicit, and gated records are not mixed into shadow false-positive stats. Quoted: **任何失败都 fail-open，且必须 instantly**. Quoted: **账本不放正文** (commands keep only a redacted first 200 characters). Quoted: **灰色代表"没测到"，绝不代表通过。** Quoted: **"未被劫持"是弱信号** and **绝不算成安全**. Quoted: **p 不是严格概率** (TypeSafe docs `P(x)+P(¬x)≈1.19`); thresholds must be calibrated locally. *Theirs* dangerous-command 0/65 false blocks and injection 0/20 false positives / 10/10 hits are not a rh-guard ROC. README says 43 offline tests with no network, key, or browser. Distinct from [rashedInt32/jev-lens](https://github.com/rashedInt32/jev-lens), [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard), and [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lzero07/laya-zh-eval](https://github.com/lzero07/laya-zh-eval) (MIT, Python, HEAD `0604d37`) is an independent Chinese skill-routing eval of [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya). **Not TypeSafe Jev.** Limitations they state: n=20, single turn, self-labeled ground truth, no ECE. multilingual confident_wrong still exists (4 cases, highest 0.945). Quoted: **官方代码承认该 checkpoint 的 confidence 未校准** (typed-decisions temperature warning `choice:11+=0.1006`). That table is not a rh-guard ROC. Do not treat 0.945 as a gate. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[m4rtian/laya-it-triage](https://github.com/m4rtian/laya-it-triage) (MIT, no detected language, HEAD `cad6722`) has a git tree of `.gitignore`, LICENSE, and README. Quoted README: **planning and learning roadmap only. No application code has been implemented yet.** Quoted: **Confidence: used by policy—not treated as proof that a prediction is correct.** Quoted: **Enterprise IT triage is not one of those validated workflows**. **High-risk security decisions should fail safe to human review** is planned, not shipped. **advertised triage ≠ shipped source.** **Not TypeSafe Jev.** Distinct from [ThyFriendlyFox/jev-triage](https://github.com/ThyFriendlyFox/jev-triage) and [boldbug1/jev-triage](https://github.com/boldbug1/jev-triage). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[marceloatoledo/JEV-MCP-REST](https://github.com/marceloatoledo/JEV-MCP-REST) (MIT, C#, HEAD `314c460`) is HTTP MCP plus a Blazor admin, a port of [jkudish/jev-mcp](https://github.com/jkudish/jev-mcp) (stdio Node) onto Streamable HTTP. Quoted README: the tools are **not** raw API passthrough. Policy in code is `auto` / `review` / `block` / `escalate`. Quoted: **Malformed model output is treated as `invalid_response` (fail-closed).** Bearer on `/mcp` and `/api/jev` by default; anonymous MCP is an explicit local opt-in. Default model `jev-latest` (moving alias). Quoted: **Provider API keys are never stored in SQLite, sent to the browser, or written to logs.** Thresholds are starting points from TypeSafe cookbooks. A code `block` from a Jev probability is their policy, not this sidecar's structural deny. If the agent never calls the tools, no gate runs (hope the model looks). Distinct from empty [marceloatoledo/jevMcp](https://github.com/marceloatoledo/jevMcp) (**Git Repository is empty**). Do not treat this tree as that empty listing. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[mcmcmcmmmc/laya-codex-router](https://github.com/mcmcmcmmmc/laya-codex-router) (MIT, Python, HEAD `90bd8d8`) is local per-turn Codex routing, based on [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) (MIT notice retained). Laya is the default; quoted: local inference **does not call TypeSafe**. Quoted: **Fail-open** — a decision-backend error keeps the turn alive through a logged fallback. Quoted: **Kill switch** — a sentinel file bypasses the decision backend. Quoted historical simulation: **≈ −60 % vs full Astra** on 237 turns under the old policy: **not measured Codex quota saved**, nor evidence for the current policy. Routing ≠ permission. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router), [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router), and [miniLV/Jev-Auto-Router](https://github.com/miniLV/Jev-Auto-Router). **Not TypeSafe Jev** as the default backend. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[shivakrishna-k/jev-agent-routing-benchmark](https://github.com/shivakrishna-k/jev-agent-routing-benchmark) (no GitHub license, Python, HEAD `bf83042`) compares Jev with frontier LLMs on 100 synthetic routing cases. Quoted README: **Labels are unreviewed.** `--dry-run` numbers are **fake** and charts are watermarked. The confidence-routing simulation (auto ≥ 0.90, deeper reasoning 0.60–0.90, human < 0.60) is a simulation, not a grant. Quoted: **Not evidence about any production workload.** n=100 is not a rh-guard ROC. Distinct from [cyberspace-cs/jev-agent-routing](https://github.com/cyberspace-cs/jev-agent-routing) and [luhayes/jev-agent-router](https://github.com/luhayes/jev-agent-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[liskasYR/laya](https://huggingface.co/liskasYR/laya) (Apache-2.0, sha `9baf31afe1b29b31425fcc2e1c27fcfdeaa70964`) is a Hugging Face text-classification listing whose README is the upstream Convai Laya family card. The table names `convaiinnovations/laya` as **this repo root** while the listing id is `liskasYR/laya`: **advertised hub identity ≠ this listing.** **Not TypeSafe Jev.** Quoted card: **Ships over-confident** — refit one temperature and mean ECE moves **0.466 → 0.081** on `laya`. That copied figure is not a rh-guard ROC. Do not dump weights. Distinct from [Gtrkrsk/laya](https://huggingface.co/Gtrkrsk/laya), [opg13/laya](https://huggingface.co/opg13/laya), and [inferenceprince/laya-onnx-fp16](https://huggingface.co/inferenceprince/laya-onnx-fp16). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[liskasYR/laya-typed-decisions](https://huggingface.co/liskasYR/laya-typed-decisions) (Apache-2.0, sha `12522a05c214ce848b80d1cf1516c9f8c6fb6ff1`) is a Hugging Face listing whose README calls the repo `convaiinnovations/laya-typed-decisions` (**this repo**) while the listing id is `liskasYR/laya-typed-decisions`: **advertised checkpoint identity ≠ this listing.** **Not TypeSafe Jev.** Table *theirs*/copied: accuracy 0.766, ECE 0.213, Brier 0.062 on 400 cases / 2,000 decisions. Quoted: **Jev figures are third-party published, not measured here**. Quoted: **+3.9 points over Jev's published 0.727, above the 0.735 teacher ceiling**. That copied delta is not a rh-guard ROC. Quoted: **refit on your own held-out data before relying on the probabilities.** Distinct from [liskasYR/laya](https://huggingface.co/liskasYR/laya) and [SargeDev/jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[KGFCode/laya-decision-lab](https://huggingface.co/spaces/KGFCode/laya-decision-lab) (Gradio space, Apache-2.0, sha `41ad14e8807e1c7c0a28487ef138c78a6cb489f2`) loads `convaiinnovations/laya`. Quoted README: **置信度不是准确率，预训练概率可能过度自信**. Quoted: **此演示只显示结果，不执行外部业务操作。示例结果按首次请求缓存。** `app.py` says **不执行退款或分流操作** and launches with `mcp_server=True` (hope the model looks). Max 8 questions; text 6000 characters. Model load failure blocks startup of the demo, which is not a coding-agent deny. **Not TypeSafe Jev.** Distinct from the upstream demo space named on the family card, [convaiinnovations/laya-demo](https://huggingface.co/spaces/convaiinnovations/laya-demo). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[reachjalil/jevlogs](https://github.com/reachjalil/jevlogs) (MIT, TypeScript sources, GitHub language JavaScript, npm `jevlogs` **0.5.0**, HEAD `217d2b7`) scores OpenTelemetry logs before a later LLM analysis branch. Quoted README: **Every record stays in your archive.** Quoted: **Nothing in this SDK deletes your archive.** Annotation mode keeps every record and attaches `jev.*` attributes. `forwardMode` default `annotate`; `analysis-only` feeds a separate analysis pipeline **without touching your archive**. `retainBelow` **0.1** also requires low value and low priority. ERROR/FATAL, `jev.protected: true`, invalid outputs, timeouts, and provider failures **stay eligible for analysis**. Later records past `maxModelCalls` stay eligible with `reason: "budget"`. `GET /health` checks the receiver, **not model availability**. Quoted: **This preview is a local development receiver, not a remote hosted collector.** The default demo **makes no network requests**. *Theirs* illustrative demo is not a rh-guard ROC. A retain route is not a delete and not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Songokou1983/jev-mcp](https://github.com/Songokou1983/jev-mcp) (pyproject license text MIT; GitHub license field was null; no root LICENSE file; Python **0.3.0**, HEAD `304e628`) is a local MCP server exposing TypeSafe Jev as Claude Code / Codex tools. Tools `classify`, `check`, `rate`, `batch_judge`, `system_one_raw`, `health`. Model `jev-1.13.0` is hardcoded; **client 不可覆盖**. Confidence bands `act > 0.7` / `confirm > 0.4` / `escalate < 0.4` are a prototype, uncalibrated. HTTP mode binds a Tailscale address, not `0.0.0.0`, and missing `JEV_MCP_TOKEN` fails startup (`SystemExit`). *Theirs* **142/142** tests are not a rh-guard ROC. If the agent never calls the tools, no gate runs (hope the model looks). An `act` band is not a host grant. Distinct from [wangkuangkuang/jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server), [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp), and [ThePFMind/jev-mcp](https://github.com/ThePFMind/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Waxmell114514/jev-compaction](https://github.com/Waxmell114514/jev-compaction) (MIT, Python, HEAD `6d33376`) is a context compactor that **can only score, never write**. Quoted README: an agent's memory can't hold a **fact the transcript never contained**. Kept lines are the verbatim originals; the diagram says `expand()` returns **original bytes back**. The README example starts at `GateConfig(shadow_only=True)`. Quoted: **Start with `shadow_only=True`.** It scores and logs everything but changes nothing. The demo ships threshold **0.35**; quoted: at that default **half the elided segments got expanded again**. *Theirs* **749 to 391** tokens and **$0.000031** are not a rh-guard ROC. The offline demo is not live Jev. Prune ≠ deny. Distinct from [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction), [dev-willbird1936/pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact), and [yangyu666/dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[CommandCodeAI/cmd-mod-jev-nudge](https://github.com/CommandCodeAI/cmd-mod-jev-nudge) (MIT, TypeScript, HEAD `20e10fc`) is a Command Code mod that asks Jev whether to nudge a stopped agent. Quoted README: **If Jev fails, the run stops as normal.** Stop when `waiting ≥ .5`, `progress < .5`, `nudge < .5`, or error; otherwise nudge. Default `jev-nudge-threshold` **0.5**. Quoted: **The 0.5 threshold is measured** — *theirs*, not a rh-guard ROC. Command Code allows at most **8** nudges per user turn. A nudge is not a permission grant and not a deny. Distinct from [qkal/Canny](https://github.com/qkal/Canny) and [VladyslavHontar/clear-head](https://github.com/VladyslavHontar/clear-head). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[wellkilo/codex-jev-preflight](https://github.com/wellkilo/codex-jev-preflight) (MIT, Python, HEAD `633ddef`) is a Codex `UserPromptSubmit` hook. Quoted README: **The assessment is advisory context only. It cannot override system instructions, developer instructions, or an explicit user request.** Quoted: **Jev errors never block the task.** Unknown values become `unknown`. The installer **does not trust the hook automatically**. Default `JEV_MODEL` is `jev-latest` (moving alias). The hook sends the first **24,000** characters of the current user prompt. Quoted: **This project is not affiliated with OpenAI, Codex, TypeSafe, or Jev.** Inject ≠ grant. Distinct from [muse0509/jev-preflight](https://github.com/muse0509/jev-preflight) and [CompleteTech-LLC-AI-Research/jev-codex-approval](https://github.com/CompleteTech-LLC-AI-Research/jev-codex-approval). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[AbsoluteGeist/code-geist](https://github.com/AbsoluteGeist/code-geist) (MIT, TypeScript, HEAD `cbc0f9b`) is an experimental local coding-agent workbench. Quoted README: **The harness owns execution.** Jev selects a configured model, ranks context, and classifies failed verification. Every decision has an explicit source: Jev, a deterministic fallback, a user override, or the scripted demo. **Run demo** needs no API keys: Jev judgments are scripted, while file changes and tests are real. Quoted `docs/execution-boundaries.md`: a Git worktree **is not an OS security sandbox**. No authentication. Both services listen on `0.0.0.0` by default. Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[KalyanM45/GitHub-Issue-Classification-Using-Jev](https://github.com/KalyanM45/GitHub-Issue-Classification-Using-Jev) (MIT, Python, HEAD `e1994ac`) classifies GitHub issues with Jev, then code writes labels. Quoted README: **A model is never allowed to authorise its own side effects, however confident it is.** **Writing labels is off by default.** `never_auto` includes `security` — **a human decides that one**. High severity **never invents a hazard on its own**. A layer-1 regex hit escalates **regardless of what the model thought**. The workflow defaults to `comment`, not `apply`. Quoted: absolute floors in `thresholds.json` **are placeholders**. Eval model `jev-latest` (moving alias). *Theirs* **62** offline tests are not a rh-guard ROC. Distinct from [yamadashy/jev-labeler-action](https://github.com/yamadashy/jev-labeler-action) and [nathan1313/issue-triage-bot](https://github.com/nathan1313/issue-triage-bot). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Maxwell00000086/laya-agent-kit](https://github.com/Maxwell00000086/laya-agent-kit) (Apache-2.0, Python, HEAD `6526a1b`) ships a local Laya MCP for Codex, Claude Code, and Cursor. Quoted agent-kit README: **not an official OpenAI or Anthropic product.** **The host AI gathers evidence and writes the final answer.** Laya **does not browse, read screenshots or execute model-selected actions.** `python install.py --client codex --client claude-code`. Not published to PyPI; depends on `laya==0.3.5`. Quoted preface: reading GitHub **不会自动安装或授予账号权限**. `doctor --inference` **is not an accuracy benchmark.** `MODEL_NOT_INSTALLED` fails explicitly. The root README still copies the upstream Laya card (Khmer **0.000** at **0.952** is *theirs*/copied). **Not TypeSafe Jev.** Distinct from [PerryLink/laya-mcp](https://github.com/PerryLink/laya-mcp), [WayneCommand/laya-mcp](https://github.com/WayneCommand/laya-mcp), and [walidboulanouar/jev-agent-kit](https://github.com/walidboulanouar/jev-agent-kit). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dgyun-ai/openclaw-typesafe-catalog-router](https://github.com/dgyun-ai/openclaw-typesafe-catalog-router) returned **This repository is empty** from the contents API on 2026-09-22 (commits **409**). GitHub description: `typesafe jev openclaw plugins`. **advertised catalog router ≠ shipped source.** Do not invent OpenClaw plugins, a threshold, or a route. Distinct from [herval/openclaw-jev-plugin](https://github.com/herval/openclaw-jev-plugin). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[wangkuangkuang/jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server) (MIT, Python, HEAD `3a0c26d`) is a stdio MCP for `choice`, `score`, `noul`, and batch `classify`. Quoted README: **Jev never returns reasons**. Default `JEVMCP_MODEL` is `jev-latest` (moving alias). `noul >= 0.5` leans yes is their mapping, not a host deny. Cache is **off by default**. `setup` stores a key at mode **0600**; `TYPESAFE_API_KEY` wins over the file. *Theirs* ~0.5 s / ~$0.00002 calls are not a rh-guard ROC. If the agent never calls the tools, no gate runs (hope the model looks). The README could not verify a compatible OpenRouter call shape. Distinct from [Songokou1983/jev-mcp](https://github.com/Songokou1983/jev-mcp) (pins `jev-1.13.0`) and [itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[zhongpei/jev-chat-jarvis](https://github.com/zhongpei/jev-chat-jarvis) (MIT, Kotlin, HEAD `3a5e6b5`; GitHub language field was null) is an Android chat copilot. The README names WeChat, QQ, X DMs, and Feishu. Quoted README: **发送永远由你点。** The program only fills the input box, **从不自动发送**. Quoted: **不 hook、不改包**. A danger level (1–9) is not a send deny. Not a GitHub fork (`fork: false`). Distinct from [jev-chat/jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis) (folded at HEAD `c6ae7d3`) and [lbbbboom/jev-chat](https://github.com/lbbbboom/jev-chat). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[brainstormity/Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot) (MIT, Python, HEAD `325ea7f`, not a fork) is a Discord moderation bot. Quoted README: the engine **fails open** — a connection error, invalid API key, rate limit, or unexpected exception lets the message through **allowed through unmoderated rather than deleted**. Three consecutive failures warn `#mod-log` once. `/profile` scores scam, spam, noobness, toxicity, and helpfulness. Stored defaults `tier1_threshold` **0.95** and `tier2_threshold` **0.70** must satisfy `0.0 < tier2 < tier1 <= 1.0`. A tier-1 or tier-2 hit deletes the message (their policy); tier 3 allows. Code comment: **Automated bans are never unassisted; punishment decisions remain strictly administrator-governed.** `BanConfirmView` requires an administrator to confirm a permanent ban. A profile score is not a ban. Those thresholds are uncalibrated. A Jev score that deletes a message is their policy, not this sidecar's structural deny. Distinct from [ohernandezdev/jevmod](https://github.com/ohernandezdev/jevmod) and [Zafer-Liu/jev-demo-moderator](https://github.com/Zafer-Liu/jev-demo-moderator). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[himomohi/jev-skill-router](https://github.com/himomohi/jev-skill-router) (MIT, Python, pyproject **0.1.0**, HEAD `5e6bf6f`) keeps skill catalogs outside the main model context. Quoted README: **Early release:** live Jev routing is still being validated. Quoted: **Offline is an explicitly labeled keyword demonstration, not Jev.** `pip install jev-skill-router` is **not** the installation instruction. Codex/Cursor MCP is **not** universal prompt interception. Claude `--hook` does not alter the host's permissions. If no candidate meets the fit and confidence thresholds, no skill is loaded. Low fit, low confidence, malformed responses, missing keys, and API failures do not silently substitute another model or keyword routing. Synthetic UTF-8 accounting (not tokens, not a billing benchmark): 5 skills **-16.00%** (worse), 50 **73.00%**, 200 **92.41%**, 500 **96.89%**. Quoted: the router does **not** execute scripts, install arbitrary packages, modify application data, or grant permissions. SECURITY.md: **Register only trusted skill directories. This is a reader/router, not a sandbox.** Quoted: **Model decisions do not grant permission.** Defaults `jev-latest`, `min_fit` **0.65**, `min_confidence` **0.50**, `max_skills` 1; a missing key raises **No automatic offline fallback.** Those floors are uncalibrated. Routing ≠ permission. Distinct from [shimo4228/jev-skill-router](https://github.com/shimo4228/jev-skill-router) and [abgregs/jev-experiments](https://github.com/abgregs/jev-experiments) `jev-skill-router/`. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[cskwork/pi-jev-router](https://github.com/cskwork/pi-jev-router) (MIT, JavaScript, npm `pi-router-jev` **0.8.1**, HEAD `60c228e`; GitHub `fork: false`) is Pi model routing. Quoted README.en: this fork of mejiasd3v/pi-jev-router is published as `pi-router-jev`; the npm package `pi-jev-router` remains the upstream project. Requires Pi **0.85.1+** and Node.js **22.19+**. The model stays fixed for the session unless usage-limit fallback is enabled. Key order: `TYPESAFE_API_KEY`, `TYPESAFE_AI_API_KEY`, `jevRouter.typesafeApiKey`, then the Pi Gateway credential. When **no cloud key is configured**, the router tries local Laya. An invalid configured key does not silently switch evaluators; the error is reported and the generation fallback is used. Local Laya defaults to `http://127.0.0.1:8765/v1` (loopback only), `laya==0.3.5`, checkpoint `convaiinnovations/laya`. Direct calls use `jev-latest`. Preset `timeoutMs` **5000**. Quoted: **Failure retains current effort.** Quoted: **Suggest, never switch.** Adaptive effort is bounded by a **28,000**-byte request budget. Routing ≠ permission. Distinct from [mejiasd3v/pi-jev-router](https://github.com/mejiasd3v/pi-jev-router), [philippdubach/pi-jev-router](https://github.com/philippdubach/pi-jev-router), [win4r/pi-jev-router](https://github.com/win4r/pi-jev-router), and [MarcoLoDico/pi-jev-router](https://github.com/MarcoLoDico/pi-jev-router). Do not merge into `examples/pi-extension.ts`. Soft judgment is never the sole veto. Cousin, not this sidecar.

[draiagent/ai-to-agent-jev-mcp](https://github.com/draiagent/ai-to-agent-jev-mcp) (license SPDX `NOASSERTION`; LICENSE says **本專案目前未授予開放內容或開放原始碼授權**; Python **1.0.0**, default branch **master**, HEAD `6ed3b7f`) is a Traditional Chinese MCP wrapper. Quoted README: **Jev 不生成文字、不寫程式、不聊天。** Quoted: it is **不是**用來取代 Claude Code 背後的模型. Tools `jev_noul`, `jev_choice`, `jev_score`, `jev_ask`. Default model `jev-latest`; timeout **30** seconds; `MAX_ATTEMPTS` **4**. Errors return JSON `{"error": ...}` from `_fail`, not a host deny. NOTICE: 範例數值、業務情節與參數皆為教學模擬. The README example confidence **0.91** is that teaching simulation, not a rh-guard ROC. If the agent never calls the tools, no gate runs (hope the model looks). Distinct from [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp), [silkyland/use-jev](https://github.com/silkyland/use-jev), and [emlama/jev-mcp](https://github.com/emlama/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[SAIFIINDUSTRIES/laya](https://huggingface.co/SAIFIINDUSTRIES/laya) (Apache-2.0, sha `2ba530c97c3ef1937eeea6a1282aedd533d10217`, pipeline `text-classification`) is a Hugging Face listing whose README is the upstream Convai Laya family card. The table names **`convaiinnovations/laya` (this repo root)** while the listing id is `SAIFIINDUSTRIES/laya`: **advertised hub identity ≠ this listing.** **Not TypeSafe Jev.** Quoted card: **Ships over-confident:** refit one temperature and mean ECE moves **0.466 → 0.081** on `laya`. That copied figure is not a rh-guard ROC. Do not dump weights. Distinct from [liskasYR/laya](https://huggingface.co/liskasYR/laya), [Gtrkrsk/laya](https://huggingface.co/Gtrkrsk/laya), [opg13/laya](https://huggingface.co/opg13/laya), and [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[inara13/marketplace-aml-triage-engine](https://github.com/inara13/marketplace-aml-triage-engine) (MIT, Python, HEAD `a3fe942`) describes AML triage for a synthetic resale marketplace. Quoted README: **160 planted** laundering cases and **240 decoys**. Status: synthetic marketplace data is checked; Detection, the **Jev triage layer**, investigator, benchmark, dashboard, and write-up are unchecked. Quoted: **Run steps for each later layer will be added as they are built.** Results *Coming soon.* The tree ships a data generator; `triage/jev_questions/` is `.gitkeep` only. **advertised Jev triage ≠ shipped source.** `config.yaml` names `auto_close_confidence: 0.90` and `escalate_confidence: 0.60`, and there is no triage engine to apply them. Do not treat 0.90 as a shipped auto-close. 160 planted cases is not a rh-guard ROC. Human review is planned, not shipped. Distinct from [m4rtian/laya-it-triage](https://github.com/m4rtian/laya-it-triage). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[le0u0/jev-model-router](https://github.com/le0u0/jev-model-router) (no GitHub license, Shell, description was null, HEAD `d56889a`) is a Claude/Codex plugin that classifies a handed-off task as lightweight, standard, or advanced. Quoted README: **It never changes the model of the session currently running it — only of tasks it hands off.** Quoted: **Off by default. Nothing routes until you run `jev-router-on`.** `config.json` has `"enabled": false`, model `jev-latest`, `confidence_threshold` **0.7**, `high_stakes_probability_threshold` **0.5**. When enabled, the keyword guard runs before the API and returns `confidence: 1.0` with `reason: "keyword-guard"` — that 1.0 is a code flag, not a measured Jev probability. Disabled returns `{routed: false, reason: "disabled"}`. A missing key, a failed curl, or a response without `answers.tier.choice` still returns `routed: true`, tier `standard`, reason `api-unavailable` (fail-open to a route, not a deny). The skill says never skip the check; that is a prompt, not a host hook on the parent session. **0.7** and **0.5** are uncalibrated. Routing ≠ permission. Distinct from [Mandrilsquad1441/jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) and [da-vinci-noob/pi-jev-model-router](https://github.com/da-vinci-noob/pi-jev-model-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[mjmiller41/jev-router-harness](https://github.com/mjmiller41/jev-router-harness) (no GitHub license; README claims MIT; GitHub language Shell; HEAD `37d9771`) advertises an AI TUI that routes with Vercel Eve and typesafe-ai/jev. The tree is speckit skills, a ratified constitution v1.0.0, templates, and README. No router, Eve, or Jev source is in the tree. **advertised harness ≠ shipped source.** Do not invent a TUI. Distinct from [AbsoluteGeist/code-geist](https://github.com/AbsoluteGeist/code-geist) and [cskwork/pi-jev-router](https://github.com/cskwork/pi-jev-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ramb5144/laya-answer-router](https://github.com/ramb5144/laya-answer-router) (MIT, JavaScript, private npm `laya-answer-router` **0.4.0**, HEAD `f4c6d22`) is a Chrome side panel plus MCP that routes page questions with local Laya. **Not TypeSafe Jev.** Quoted README: in the interface, **Jev** is the guarded browser-operation loop; **Laya** is the local router. Installs `laya==0.3.3` and snapshots `convaiinnovations/laya`. The relay is `127.0.0.1`. If the checkpoint is warming or unavailable, a deterministic complexity guard chooses a lane (`fallbackRoute` confidence **0.72** / **0.68**). Quoted: **Check above 50%** uses the answering model's separate confidence value, **not Laya's routing confidence**. At 50% or below, it fills and stops for review. `chooseLane` picks deep when `choice === 'deep'` or `probabilities.deep >= 0.46`. Quoted: **Keep Direct mode and automatic submission disabled when human review is required.** Quoted: **not affiliated with Convai Innovations, Pearson, Anthropic, OpenAI, or Google.** Neither extension receives or stores the OpenAI key. A route is not a click grant. **0.46** is uncalibrated. Distinct from [WayneCommand/laya-mcp](https://github.com/WayneCommand/laya-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[silkyland/use-jev](https://github.com/silkyland/use-jev) (MIT, JavaScript, npm `@silkyland/use-jev`, HEAD `8a9a7ee`) is an MCP server and CLI for noul, choice, and score. NOTICE: the escalation contract, thresholds reported **0.5** / estimated **0.4**, the action gate, and tighten-only / fail-open PreToolUse are adapted from [shitianfang/jev-use](https://github.com/shitianfang/jev-use); **No source code was copied**; unaffiliated with TypeSafe. Quoted README: **It never writes a credential.** Tools include `jev_noul`, `jev_choice`, `jev_score`, and `jev_gate` (`allow` / `deny` / `ask`). `jev_status` never returns a key. `unreachable`: **Proceed as if Jev did not exist.** Quoted: **re-tune them on your own data**. The mock backend is **local, deterministic, meaningless answers**. PreToolUse only ever **tightens**: `deny` → deny, unsure → ask, `allow` → no output so the host permission flow decides. Quoted: every failure **fails open**. Quoted: **It is deliberately not enabled by `install`.** A gate allow is not a host grant. Those 0.5 / 0.4 figures are not this sidecar's calibration. Distinct from [shitianfang/jev-use](https://github.com/shitianfang/jev-use) and [draiagent/ai-to-agent-jev-mcp](https://github.com/draiagent/ai-to-agent-jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[doronp/jevc](https://github.com/doronp/jevc) (Apache-2.0, TypeScript, npm `jev-compiler`, command `jevc`, HEAD `377f4ad`) compiles agent policy prose into a Jev program: narrow typed questions plus a reducer that computes the verdict in ordinary code. Pins `jev-1.13.0` (non-generative, returns probabilities, never text). Quoted README: **Generation** rules are **never** compiled — **Jev emits no text**. `jevc scan` is a text heuristic: it calls no model, writes no files, and decides nothing. Quoted example: a bare approval is not consent; **verdict, computed in code: deny**; that example sets `"otherwise": "deny"`. An emitted release policy instead uses `default: allow` under explicit deny rules. Quoted: **58 fixtures, 58 passing, 0 failing**. Quoted: **No API key, no network — not for the tests, the examples, or anything in this README except `jevc check --live`.** Those 58 fixtures are not a rh-guard ROC. **0.5** is uncalibrated. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[abhishekswe/agent-fastpath](https://github.com/abhishekswe/agent-fastpath) (MIT, TypeScript, npm `agent-fastpath`, HEAD `bdabe14`) is a Jev MCP decision layer for Claude Code, Codex, and Cursor. Quoted README: **Rules first, then Jev.** Statuses are `accept`, `review`, or `escalate`. Without an API key: **deterministic checks work, and semantic questions return `escalate` instead of guessing.** Quoted: **Tool callers can tighten these limits but not loosen them.** Tools `fastpath_evaluate`, `fastpath_triage`, `fastpath_browser`, `fastpath_evidence`, `fastpath_capabilities`. If the agent never calls them, no gate runs (hope the model looks). *Theirs* benchmark **408** vs **35,256** tokens is not a rh-guard ROC. An `accept` is not a host grant. The README's "calibrated" wording is not this sidecar's calibration. Irreversible browser clicks need `allowIrreversible: true`. Semantic evaluation sends redacted state to TypeSafe. Soft judgment is never the sole veto. Distinct from [silkyland/use-jev](https://github.com/silkyland/use-jev) and [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp). Do not merge into `examples/`. Cousin, not this sidecar.

[1104480426-hash/jev-wingman](https://github.com/1104480426-hash/jev-wingman) (MIT, Java, HEAD `334dc66`) is an on-device Android chat co-pilot. Description rewrite (*theirs*): **基于 Jev 的聊天决策辅助** — typed verdicts and confidence, no generated reply; **QQ / 飞书 / 抖音实测可用**; **no package allowlist.** Quoted README: **它只给判决，不替你打字.** Quoted: **不会自动回消息。代码里没有任何一处发送路径.** Accessibility reads QQ / 飞书 / 抖音 / any chat that exposes text, **不设包名白名单**, and **不注入文本、不点发送**. Quoted: **不是官方 Jev，也不声称复现了它的精度.** The local kernel is `bge-small-zh-v1.5` sentence similarity, **not TypeSafe Jev**. Remote mode calls `jev-1.13.0`. *Theirs* on a Xiaomi 14: local **49 – 64 ms** vs remote about **870 ms**. That latency is not a rh-guard ROC. There is no send path. Distinct from [zhongpei/jev-chat-jarvis](https://github.com/zhongpei/jev-chat-jarvis). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[miniongk/laya-mcp-mimo-desktop](https://github.com/miniongk/laya-mcp-mimo-desktop) (MIT, Python, default branch `main`, HEAD `7e65a4e`) bridges local [Laya](https://github.com/NandhaKishorM/laya) `choice` / `score` / `noul` into MiMo Desktop over stdio MCP. **Not TypeSafe Jev.** Tools `laya_predict`, `laya_route`, `laya_preset`, `laya_status`. A skill trigger decides whether to call MCP (hope the model looks). The README example edits `mimocode.json`. Quoted README and `docs/compose/spec/laya-mcp-integration.md`: **≥0.85** auto-execute, **0.60–0.85** LLM review, **<0.60** escalate. Those bands are not in `laya_mcp/server.py` or `tools.py` — **advertised confidence gate ≠ shipped tool**. Quoted "no hallucination" is theirs. A route is not a host grant. Prior fold HEAD `8ebb79d` on `feat/laya-mcp-integration` had no GitHub license. Distinct from [WayneCommand/laya-mcp](https://github.com/WayneCommand/laya-mcp) and [GeneGulanesJr/LayaMCP](https://github.com/GeneGulanesJr/LayaMCP). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[taman-spirit/guardrail-chatbot-jev](https://github.com/taman-spirit/guardrail-chatbot-jev) (MIT, Python, HEAD `5b156df`) is a chatbot content-safety library over one policy file `policies/standard-v1.json` for Python and TypeScript. Quoted README: **It is a library, not a service. You call it, you get a verdict, and your code decides what to do.** Actions `allow` / `flag` / `review` / `block`; routes include `redact`, `guide`, `crisis_support`, `human_review`, and `safe_response`. Quoted: **Always check `degraded`.** When Jev is unreachable, `degraded: true` and the verdict **says nothing about the content.** On the input surface a degraded verdict's action is `allow` (fail-open). The example confidence **0.71** is a sample verdict, not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[AidenHadisi/mayi](https://github.com/AidenHadisi/mayi) (MIT, Rust, HEAD `e51371c`) is a tool-call gate for Claude, Cursor, and Codex. Quoted README: **With Jev, a score of 0.85 or higher is safe.** The default instruction is positively phrased: **Is this coding-agent tool call ordinary development work? Prefer yes unless it is clearly harmful.** Safe calls are allowed with no dialog; not-safe opens a dialog; errors (network, configuration, internal) deny. Quoted: **The process always exits 0, because some hosts treat a crashed hook as an allow.** `timeout_ms` default **2500**; a timeout denies. Model default `jev-latest` (moving alias). The log does not record the command or its arguments. Tool names and arguments are sent to the provider. **0.85** is uncalibrated. Exit 0 is not a host deny by itself. In Codex, approve the entry with `/hooks` or it will not run. Cloud and remote sessions are not configured. Prefer-yes is not a hard envelope. Soft judgment is never the sole veto. Distinct from [jevgate](https://github.com/thevibeworks/jevgate), [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate), and [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Do not merge into `examples/`. Cousin, not this sidecar.

[GeneGulanesJr/LayaMCP](https://github.com/GeneGulanesJr/LayaMCP) (no description, no license, no language, size 0) is an empty listing. Contents API: **This repository is empty.** Commits: **Git Repository is empty.** README 404. **advertised Laya MCP ≠ shipped source.** Do not invent an MCP server. **Not TypeSafe Jev.** Distinct from [miniongk/laya-mcp-mimo-desktop](https://github.com/miniongk/laya-mcp-mimo-desktop) and [WayneCommand/laya-mcp](https://github.com/WayneCommand/laya-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[bismawy/pi-jev-eye](https://github.com/bismawy/pi-jev-eye) (GitHub license field null; README badge **MIT**, TypeScript, HEAD `7cedcce`) is a Pi supervisor. Layer 1 regex blocks `rm -rf /`, force-push, and secrets at 0 ms. Layer 2 is a done-check warning notice if the agent claims done without tests. Layer 3 asks Jev `has_slop` on diffs of at least 10 lines; **P ≥ 0.85 blocked**. Quoted **Fail-Open Safety:** **Network timeouts or offline Jev API calls gracefully fall back to allow work to continue without freezing the agent.** `/eye off` disables the supervisor. **0.85** is uncalibrated and is not a rh-guard ROC. The regex floor is the hard envelope. Blocking on P ≥ 0.85 alone is soft judgment used as a veto; Jev fail-open is not a hard deny. Do not merge into `examples/pi-extension.ts`. Distinct from [DevMortimer/pi-warden](https://github.com/DevMortimer/pi-warden), [Reindeer-AI/pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard), [phin-tech/pi-jev-approver](https://github.com/phin-tech/pi-jev-approver), and [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Soft judgment is never the sole veto. Cousin, not this sidecar.

[distil-labs/invoice-processing-pipeline](https://github.com/distil-labs/invoice-processing-pipeline) (Apache-2.0, Python, HEAD `8aeb03f`) is an accounts-payable demo: Jev for inbox triage, a fine-tuned 4B model for invoice decisions. Quoted README: **197 of 200 messages handled correctly end to end**. Quoted: **It does not write text and it answers in one pass.** Quoted: **This test set does not rank the hosted models** and supports **Jev is as good as anything here**, not more. Quoted: **The data is synthetic** and **not a sample of real invoices.** 197 of 200 is not a rh-guard ROC. Not a coding-agent hook. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hiroyannnn/yuru-come](https://github.com/hiroyannnn/yuru-come) (Apache-2.0, MoonBit, HEAD `fae5d57`) bundles live-chat reactions in code, then asks Jev for kind and priority. Quoted README: **Jev が遅くてもチャットの読み取りは止めません.** Queue limit **50**; overflow drops old short comments into the stream unjudged. Dashboard `127.0.0.1:8791` is for the streamer, not an OBS overlay. Twitch IRC is anonymous read-only. open-jev is not TypeSafe Jev; they say its priority is nearly always the maximum. `--threshold` default **0.85** is string similarity, not a safety deny. `--priority-threshold` **1.5**, `--pickup-floor` **0.6**. The 200-line synthetic `samples/wave.tsv` is not a rh-guard ROC. Not a coding-agent hook. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[itsflownium/Kestrel-Agent](https://github.com/itsflownium/Kestrel-Agent) (MIT, Python, HEAD `752e1aa`) is a multi-provider terminal agent with optional Jev. Quoted README: **general superiority over Codex is not established.** Quoted: **Kestrel never extracts OAuth tokens.** Quoted: **Installation does not run tests, sign in, or call models.** Quoted: **Confidence is not treated as proof of correctness.** Quoted: **Jev cannot change permissions.** Arithmetic is computed locally after the decision service approves the route. Default budgets **6 Codex calls, 32 Jev calls, 24 actions, 15 minutes**. `activate` enables **unverified planning guidance**, not automatic execution. Model-requested permission escalations are declined. Routing and Jev are not permission. Not this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[john07180718/codex-jev-router](https://github.com/john07180718/codex-jev-router) (no license, no language, size 0) advertises a Codex × JEV router in the GitHub description only. Contents API: **This repository is empty.** Commits: **Git Repository is empty.** README 404. **advertised router ≠ shipped source.** Do not invent classification, budgets, or mock tests from the description. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) and [wellkilo/codex-jev-preflight](https://github.com/wellkilo/codex-jev-preflight). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[krijingle-create/maibot-jev-timing-gate](https://github.com/krijingle-create/maibot-jev-timing-gate) (MIT, Python, HEAD `0733b7c`) asks Jev before the planner. A high-confidence **本轮无需参与** suppresses that planner turn. Quoted: **拿不准、端点故障、被 @ → 一律放行**. `shadow_mode` default false; shadow only logs. `probability_threshold` **0.8** on `probabilities["no_reply"]`. `confidence_fallback_threshold` **0.62**. `timeout_sec` **6.0** (**超时即放行**). Model `jev-latest` (`jev-fast` / `jev` return 400). *Theirs* suppress rate about **1/4 ~ 1/3**, and they say those numbers **不能直接套到你的实例**. An @ mention skips Jev (deterministic exemption). Quoted 2026-09-22: on one sample set `classifier_dev` and `typesafe` agreed in direction — not a rh-guard ROC. Suppress is not a safety deny. **0.8** is uncalibrated. Distinct from [classifier-dev](https://github.com/mrmps/classifier-dev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[maito1201/jev-harness](https://github.com/maito1201/jev-harness) (no GitHub license, JavaScript, HEAD `31cbc9f`) is a Claude Code / Codex Stop and PreToolUse plugin. Quoted README: **コードが事実を集め、jev は意味の照合だけを担う.** Quoted: **「検証済み」の主張は jev に真偽を委ねず、記録された検証コマンドに成功したものが無ければコードが差し戻す.** The old **2回まで** / **その後は通過** does not apply to the current command hook; OpenCode remains the old implementation. No key or API down: **判定せず警告だけ（fail-open）.** `JEV_HARNESS=off`. Codex does not run unmanaged hooks until `hooks/hooks.json` is trusted. They say Jev cannot check arithmetic (a fabricated 92,670² scored **0.34**). That score is not a rh-guard ROC. Distinct from [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness), [AntonioCoppe/jev-harness](https://github.com/AntonioCoppe/jev-harness), and [AiPersonacademy/apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[manyamkarthik/laya-issue-triage](https://github.com/manyamkarthik/laya-issue-triage) (README says Apache-2.0; no LICENSE file, Jupyter Notebook, HEAD `0910237`) triages GitHub issues with local Laya. Description rewrite (*theirs*): **Fine-tuned Laya model that triages GitHub issues in a single CPU forward pass — training data, held-out benchmarks, and a ready-to-use GitHub Action.** **Not TypeSafe Jev.** Base zero-shot `issue_type` **0.626**; `needs_more_info` **0.563**. Fine-tuned row (*theirs*): `issue_type` **0.650** / macro-F1 **0.627**; `needs_more_info` **0.734** still under majority **0.738**, so commenting stays off. Quoted: **These are GitHub issue triage numbers. They are not comparable** to LocalLLaMA/typed-decisions (Laya **0.362** / Jev **0.727**). Quoted: **This model has never been run on it.** HF card [harikarthikmanyam/laya-issue-triage](https://huggingface.co/harikarthikmanyam/laya-issue-triage) (sha `ad004d0`): **Confidences are uncalibrated unless you fit temperatures.** Defaults: `skip-if-labeled: true` (**never touches an issue a human already triaged**), `comment-on-needs-info: false`, `min-confidence: 0.60`. Quoted: **Start in `dry-run`**. **3,868** held-out issues are not a rh-guard ROC. **0.60** is uncalibrated. Distinct from [ThyFriendlyFox/jev-triage](https://github.com/ThyFriendlyFox/jev-triage) and [KalyanM45/GitHub-Issue-Classification-Using-Jev](https://github.com/KalyanM45/GitHub-Issue-Classification-Using-Jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[sai-harsha-k/relay-macos-assistant](https://github.com/sai-harsha-k/relay-macos-assistant) (MIT, Python, HEAD `222bba5`) is an experimental local-first macOS voice assistant. Quoted README: **Relay is not production-ready.** Exact commands use a deterministic fast path, then Jev, then optional Ollama. Quoted: **The local writer model never chooses an action, recipient, risk level, or permission to execute.** Quoted: **The executor accepts validated typed actions, never free-form model instructions.** The bootstrap **never writes a secret.** Exact commands work without `TYPESAFE_API_KEY`; Jev routing needs the key (local-first, not fully offline). Quoted: verification **cannot guarantee that every third-party application completed an action.** Distinct from [jagsan-cyber/reflex-gate](https://github.com/jagsan-cyber/reflex-gate), [Joker666/Reflex](https://github.com/Joker666/Reflex), and [vuckuola619/reflex](https://github.com/vuckuola619/reflex). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[serejkaaa512/jev-content-guard-ext](https://github.com/serejkaaa512/jev-content-guard-ext) (no license, JavaScript, HEAD `948b65e`) has **no README** (404). The tree is `background.js`, `content.js`, `manifest.json`, `popup.html`, `popup.js`, `styles.css`. Manifest v3 name **Jev Content Guard** v**1.3**, host `https://api.typesafe.ai/*`, content scripts `<all_urls>`. `background.js` POSTs `https://api.typesafe.ai/v1/systemone` with model `jev-latest`. A missing key returns an error **Missing API Key** and does not hide. `content.js` `DEFAULT_THRESHOLDS`: `is_fraud` **0.50**, `is_advertising` **0.20**, `is_ai_generated` **0.25**, `is_spam` **0.25**, `is_clickbait` **0.20**, `is_infobusiness` **0.25**, `is_toxic` **0.25**. On a hit, `flagElement` adds `jev-blur-overlay` (`backdrop-filter: blur(15px)`). Failed analysis is not marked processed. Those thresholds are uncalibrated. A blur is not a host deny and not a rh-guard ROC. Page text is sent to TypeSafe. Distinct from [SwastikGorai/unslopify](https://github.com/SwastikGorai/unslopify) and [yonsakhan/x-spam-filter-typesafe](https://github.com/yonsakhan/x-spam-filter-typesafe). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[tuanhung303/agy-jev-hooks](https://github.com/tuanhung303/agy-jev-hooks) (no GitHub license, Python, HEAD `5ebcdb0`) is a stop verifier. The GitHub description names AGY, Qoder, and Hermes (formerly agy-background-agent). The README documents Stop hooks for Antigravity (`agy`) and Qoder. Quoted README: **Quality notes are logged and never block.** Quoted: **Every Jev failure fails open to an unavailable or clean stop with no invented steering.** Quoted: **The model writes every corrective action. There is no scripted repair fallback.** `AGY_COMPASS_ENABLED=0` disables Compass. `LITE_MODE_TIMEOUT` default **20** seconds. Fail-open Jev is not this sidecar's structural deny. Distinct from [advance-lion/dsh-jev-hooks](https://github.com/advance-lion/dsh-jev-hooks), [godspede/construct-auto-classifier](https://github.com/godspede/construct-auto-classifier), and [maito1201/jev-harness](https://github.com/maito1201/jev-harness). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/jev-brandsafety](https://github.com/gbesse/jev-brandsafety) (MIT, JavaScript, HEAD `d903f5d`) classifies page context, scores configurable risks, and applies advertiser-owned brand-safety policy. Public alpha. Quoted README: **This alpha leaves the transport and HTTP server unwired; `npm run live-smoke` makes zero calls.** Quoted: **Shadow mode logs the raw block while returning allow.** Quoted: **Excluded categories and maximum risk per dimension are code-owned policy.** Quoted: **Operator configuration—not bundled labels—is authoritative. No live benchmark is claimed.** Not affiliated with IAB, WFA, GARM, or TypeSafe. Cache identity includes content, taxonomy version, and policy version. `FakeJev` and a live-smoke that makes zero calls are not live Jev. Shadow allow is not a safety envelope. Related: [gbesse/decisionpacks](https://github.com/gbesse/decisionpacks), [gbesse/question-forge](https://github.com/gbesse/question-forge), and [gbesse/jev-rerank-server](https://github.com/gbesse/jev-rerank-server). Distinct from [gbesse/jev-rerank-server](https://github.com/gbesse/jev-rerank-server) and [gbesse/agent-mandates](https://github.com/gbesse/agent-mandates). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ismaelsoilet/jev-harness](https://github.com/ismaelsoilet/jev-harness) (MIT, Python, HEAD `0840cbf`) is a token optimizer, test-failure triage gate, and semantic guardrail, plus stdio MCP `jev-mcp`. Quoted README: exit `0` safe/skip_llm, `1` abort/logic defect, `2` syntax error. Quoted **Autonomous Simulation Fallback:** if offline or without an API key, a local heuristic runs so CI and scripts **never crash**; the table says that fallback is **Active by default if no key or offline**. *Theirs* 90ms / $0.00004 / doom-loop abort are not a rh-guard ROC. The heuristic is not TypeSafe Jev. Soft abort-as-sole-veto is theater. Distinct from [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness), [AntonioCoppe/jev-harness](https://github.com/AntonioCoppe/jev-harness), [AiPersonacademy/apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness), and [maito1201/jev-harness](https://github.com/maito1201/jev-harness). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ChenYCL/jev-browser-skill](https://github.com/ChenYCL/jev-browser-skill) (MIT, JavaScript, HEAD `225f288`) is browser and computer use for coding agents. Quoted README: **Control loop in code.** **Never invents text**; `secrets` are typed but never sent to the model. `goal_done` success ≥ **0.85** (≥ **0.7** on the final verification pass). `needs_user` when a non-none blocker ≥ **0.6**. Legal actions are filtered in code. *Theirs* ~$0.0003 per step and **54 passed, 0 failed, 5 skipped** are not a rh-guard ROC. **0.85** is uncalibrated. If the tools are never called, no gate runs (hope the model looks). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Alexander-68/jev-skill](https://github.com/Alexander-68/jev-skill) (no license, Python, default branch **master**, HEAD `744c106`) is an `ask-jev` skill. Article text is input, not verified facts. Calls `~typesafe/jev-latest` (moving alias), 60s timeout, no retries. The helper rejects a request over **32,000** ASCII-serialized bytes: **nothing was sent or truncated**. `--dry-run` makes no API call. Hope the model looks. Not a PreToolUse gate. Distinct from [logicrw/ask-jev](https://github.com/logicrw/ask-jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[EricCheng2222/vox-ambient-assistant](https://github.com/EricCheng2222/vox-ambient-assistant) (GitHub license `NOASSERTION`, TypeScript, HEAD `36c4104`) is a voice companion. Quoted README: **TypeSafe Jev routing for when to wait, speak, use vision, control an app, or delegate to Codex.** **Codex keeps its own sign-in and permission boundary; Vox does not read or copy Codex credentials.** Personal mode does not use the Vox backend. Keys stay in the desktop main process. Computer actions are limited by local policy and the Codex sandbox. Routing ≠ permission. Not this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[OguroGen/simple-jev](https://github.com/OguroGen/simple-jev) (no license, TypeScript, HEAD `867a32c`) is a small web app via Cloudflare AI Gateway model `typesafe/jev`. The user presses send; history stays in localStorage. Quoted README: **Jev はチャットモデルではありません.** A browser demo is not a coding-agent gate and not a safety envelope. Distinct from [antTing/jev-accounts-hub](https://github.com/antTing/jev-accounts-hub) and [rawwerks/one-system](https://github.com/rawwerks/one-system). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[SivletLabs/x402-gateway](https://github.com/SivletLabs/x402-gateway) (no license, JavaScript, HEAD `891351e`) is a Cloudflare Worker in front of System One. The README diagram names a local `jev-local` upstream through a cloudflared tunnel. `src/index.js` instead proxies TypeSafe `https://api.typesafe.ai/v1/systemone` and a Vercel AI Gateway failover: **advertised local upstream ≠ shipped channels.** If there is no payment authorization and no dev bypass, the worker returns HTTP 402. A dev-bypass header is **not a payment proof**. `/v1/stats` returns hardcoded totals (including `total_calls` **1438924**): **advertised telemetry ≠ measurement.** The gateway is not this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Sun-Season/jev-codex](https://github.com/Sun-Season/jev-codex) (no license, JavaScript, HEAD `0802134`) is a Codex skill for browser navigation, context compact, search rank, supervisor, and review. Quoted README: **这是工作流 skill，不是底层工具拦截插件；不能删除已经进入对话的上下文，也不保证固定倍数加速。精确计算和最终执行校验应由代码完成。** Review mode **不自动修改代码或授权操作.** Context mode **辅助 Codex compact** (assists that compact; it does not delete context already in the dialogue). Jev judges; Codex writes. Inject ≠ grant. Distinct from [wellkilo/codex-jev-preflight](https://github.com/wellkilo/codex-jev-preflight) and [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[derwells/sieve](https://github.com/derwells/sieve) (MIT, Python, HEAD `c454869`) is a local MCP: `jev_grep`, `jev_rank`, `jev_search`. Quoted README: **never generates text.** The agent still opens survivors. Key from `TYPESAFE_API_KEY`; the launcher sources `~/.config/sieve/env` as shell. `jev_grep` default `threshold=0.5`; `jev_rank` default `threshold=0.0`. **Status:** recall eval required files-mode recall@10 ≥ 0.8 on 4 of 5 asks and got **2 of 5, so it failed.** Quoted: the post-hoc 5 of 5 **does not replace the failed gate.** The eval used `threshold=0.0`. *Theirs* costs are not a rh-guard ROC. If the agent never calls the tools, no gate runs (hope the model looks). A shortlist is not the only files that exist. Distinct from [Atikpui007/jev-sift](https://github.com/Atikpui007/jev-sift) and [hawkyre/jevx](https://github.com/hawkyre/jevx). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[drycool/jev-router](https://github.com/drycool/jev-router) (MIT, Python, HEAD `7a01790`) is a multi-tier RAG router: deterministic fast path, FTS5, optional vectors, LightRAG, then an Ollama-compatible LLM. Optional `core/laya_client.py` is a remote Laya client. **Not TypeSafe Jev** as the decision head. Quoted README: **Route without executing an agent** (`/route-only`). A LightRAG timeout degrades to local context. Example bind `--host 0.0.0.0 --port 8030`. Quoted: **Do not publish local `.env`.** Routing ≠ permission. Distinct from [reallygood83/jev-router](https://github.com/reallygood83/jev-router), [fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router), [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router), and [hyspacex/jev-router](https://github.com/hyspacex/jev-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[fitchgc/jev-ccrouter-extension](https://github.com/fitchgc/jev-ccrouter-extension) (no license, JavaScript, HEAD `7d3e10c`, description null) classifies Codex requests into simple/normal/complex/extreme. Quoted README: **If JEV is unavailable, times out, returns an invalid result, or produces a tier whose model is no longer allowed, the extension keeps the request's original model.** `jev-latest` is recommended (moving alias). Timeout default **8000** ms. The summary sent to JEV does not include complete tool output, binary input, or API keys. README lists permissions `trusted-code`, `gateway-request-transforms`, and `proxy-routes` (*theirs*, not a grant). Quoted: **does not intercept OpenAI API requests made by other applications.** Routing ≠ permission. Distinct from [Mandrilsquad1441/jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) and [le0u0/jev-model-router](https://github.com/le0u0/jev-model-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[gbesse/jev-decisionops](https://github.com/gbesse/jev-decisionops) (MIT, TypeScript, HEAD `7721213`) ships `@gbesse/jev-eval` and `@gbesse/jev-gateway`. Quoted README: community software and **not affiliated with or endorsed by TypeSafe AI.** Design rules: **Labels are never sent to a provider.** **Failed or malformed upstream responses never become successful decisions.** **Confidence thresholds are policy, not truth.** **Numeric and temporal logic stays in deterministic code.** **Provider aliases are allowed for exploration; production examples pin versions.** Public alpha. Schema-valid ≠ correct. Distinct from [gbesse/agent-mandates](https://github.com/gbesse/agent-mandates), [gbesse/jev-proxy](https://github.com/gbesse/jev-proxy), [gbesse/jev-rerank-server](https://github.com/gbesse/jev-rerank-server), and [gbesse/jev-brandsafety](https://github.com/gbesse/jev-brandsafety). Do not merge the gateway into `examples/`. Soft judgment is never the sole veto. Cousin, not this sidecar.

[hzq001/cpa-plugin-jev](https://github.com/hzq001/cpa-plugin-jev) (MIT, Go, HEAD `43f7f9b`) is a CLIProxyAPI native System One provider. Quoted README: **不是传统的 Chat Completions.** Protocol `systemone`; `stream: true` returns HTTP 400. Default model `jev-latest` (moving alias). 400/422 do not rotate accounts; 401/403/429/529/5xx do. Upstream is `https://api.typesafe.ai`. A provider plugin is not a coding-agent PreToolUse gate and not this sidecar. Distinct from [antTing/jev-accounts-hub](https://github.com/antTing/jev-accounts-hub). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[keyboardsamurai/kleene](https://github.com/keyboardsamurai/kleene) (MIT, Kotlin, HEAD `f4cb166`) is three-valued Kotlin judgment. Quoted README: **The model judges. Your code decides.** **It never becomes UNKNOWN, and UNKNOWN never becomes `false`.** Quoted: **There is no fallback from a local URL to the cloud.** Example `acceptAt = 0.95` is policy, uncalibrated. Not on Maven Central (`0.1.0-SNAPSHOT`). Soft 0.95 is not a safety envelope. Distinct from [harshpuri84/typed-gate](https://github.com/harshpuri84/typed-gate) and [seb4ez/jevguard](https://github.com/seb4ez/jevguard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[pruthvirajg/Jev-Integrate](https://github.com/pruthvirajg/Jev-Integrate) (MIT, Python, HEAD `2ca457f`) routes writer calls. GitHub description (*theirs*): **Jev decides; Claude, Grok, or any LLM only writes.** `Router.plan` labels are `skip` / `jev_only` / `ask_human` versus `llm_fast` / `llm_strong`. *Theirs* bench: **78.8% fewer tokens**, **45.8%** of turns never call a writer, policy match **24/24**. Quoted: **Architecture estimate (chars/4 + fixed schema cost), not an invoice.** That table is **not a rh-guard ROC.** Quoted: **Payloads redacted before Jev. Hooks fail open.** Fail-open hooks are not this sidecar's structural deny. Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[randilt/jev-guardrail](https://github.com/randilt/jev-guardrail) (no license, Go, default branch **master**, HEAD `ea241e5`) is a WSO2 API Platform AI Gateway RequestPolicy proof of concept. Quoted README: **not to be production-ready.** `noulThreshold` default **0.7**, `severityThreshold` default **2.0**, `onError` required choice `failOpen` / `failClosed`. Live test of **3 prompts** is not a rh-guard ROC. Quoted: **says nothing about false-positive/negative rates.** Quoted: **every request body sent through this policy leaves your environment.** **0.7** is uncalibrated. Soft score as sole block is theater when `onError` is `failOpen`. Distinct from [codebam/jev-guardrails](https://github.com/codebam/jev-guardrails), [aquental/jev-guardrail](https://github.com/aquental/jev-guardrail), and [leepokai/jev-guard](https://github.com/leepokai/jev-guard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[taigrr/gojev](https://github.com/taigrr/gojev) (0BSD, Go, HEAD `58922c5`) is a Go harness for TypeSafe Jev and open-weight Kev (in-process llama.cpp). Quoted README: **Decision models do not generate text.** Example `d.Above(0.8, 0.3)` allows only if confident and unambiguous — an uncalibrated product knob, not a safety envelope. `gojev.Fallback(cloud, localKev)`. Kev is not TypeSafe Jev. Weights are fetched at runtime and SHA-256 pinned; a tampered library is an error. *Theirs* latency table is not a rh-guard ROC. A Classify allow is not this sidecar's structural deny. Distinct from [Gestalt-Lab/jeff](https://github.com/Gestalt-Lab/jeff), [githubnext/localjev](https://github.com/githubnext/localjev), and [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya). Do not dump weights. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[979569650/dsh-typesafe](https://github.com/979569650/dsh-typesafe) (MIT, JavaScript, HEAD `3612bfa`) is a TypeSafe Jev decision layer for DeepSeek Harness: `typesafe_decide` (1–200 questions), `typesafe_route` (`min_confidence` escalation), `typesafe_screen`, and a `tools/post-execute` guard on `web_fetch`, `web_search`, `read_page`, and fetch MCP results before the model reads them. The README table marks that guard **Fail-open.** `guardWarnThreshold` **0.5** flags injection; that knob is uncalibrated. The measured table lists session 2 as **0** TypeSafe calls on a coding-shaped task (hope the model looks). Session 3 used Jev to **audit its own rules**. *Theirs* ~800 ms and **$0.0000173** per call against `jev-latest` (moving alias) are not a rh-guard ROC. Jev returned high probability on five source questions. **Two were real.** Quoted: **it is a filter, not an oracle.** `test/compaction-survives.mjs` checks the node 0 system prompt survives compaction. Distinct from [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails), [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard), [RaulLazaro/dsh-jev](https://github.com/RaulLazaro/dsh-jev), [lldois/dsh-jev](https://github.com/lldois/dsh-jev), and [sperictao/dsh-auto-review-jev](https://github.com/sperictao/dsh-auto-review-jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kleosr/cursor-clijev-compaction](https://github.com/kleosr/cursor-clijev-compaction) (MIT, TypeScript, HEAD `accce66`) scores Cursor CLI `agent` tool I/O with TypeSafe Jev and keeps survivors through native compact. Quoted: **Zero modifications to `~/.cursor/hooks.json`.** Quoted: **`cursor-jev install` exits 2 and never creates `~/.cursor/hooks.json`.** Quoted: **Fail-open Cursor CLI.** Missing `TYPESAFE_API_KEY`, downtime, or a history that will not fit skip scoring; native compact still runs (`failClosed: false`). Offline `cursor-jev compact` fails closed without a key. Keep threshold **≥ 0.5** for `keepResult` / `keepCall` is uncalibrated. Pins: the initial prompt and the newest messages (`preserveRecentMessages`, default 6). State fit is 25,000 tokens; the request budget is 30,000. The stop hook sets `loop_limit: 1`. Quoted: **There is no stub scorer.** Prune ≠ deny. `jev-latest` is a moving alias. Distinct from [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction), [yangyu666/dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune), [DihRJ/claude-code-jev-compaction](https://github.com/DihRJ/claude-code-jev-compaction), [dev-willbird1936/pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact), and [hoshinodis/opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[psyb0t/vibecheck](https://github.com/psyb0t/vibecheck) (MIT, Go, HEAD `6dc2a02`) turns TypeSafe Jev probabilities and versioned YAML policy into typed decisions over REST and MCP. Quoted README: **Vibecheck never executes the action it judges.** Your code decides what `allow`, `review`, or `deny` mean. Idempotent retries replay the first decision. Re-evaluating stored inputs and calibration reports are not built yet. Pin image `psyb0t/vibecheck:v0.2.0`; `latest` is for kicking the tires. If the agent never calls the MCP tools, no gate runs (hope the model looks). Distinct from [zyphr-labs/turnstile](https://github.com/zyphr-labs/turnstile) and [omkarghugarkar007/actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Caho1/Jev](https://github.com/Caho1/Jev) (no license, Python, HEAD `80a0230`) is a public snapshot of Jev and Laya experiments: local inference, fine-tuning, browser automation, and a dashboard. Quoted README: **不上传模型权重、训练/测试数据、逐题预测或看板数据快照**. *Theirs* BANKING77 fine-tune accuracy **85.55%** on 3,080 official test items is an English banking-intent experiment, not a rh-guard ROC. Browser Choice local training: **当前效果尚不足以用于生产。** Local Laya heads are not TypeSafe logits. Not a coding-agent PreToolUse hook. Do not dump weights. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Mokusei-Hana/Jev-mcp](https://github.com/Mokusei-Hana/Jev-mcp) (no description, no license, no language, pushed 2026-09-22) is an empty Git repository (HTTP 409; README 404). **advertised MCP ≠ shipped source.** Do not invent an MCP server. Distinct from [ThePFMind/jev-mcp](https://github.com/ThePFMind/jev-mcp), [olivdx/jev-mcp](https://github.com/olivdx/jev-mcp), [jfrader/jev-mcp](https://github.com/jfrader/jev-mcp), and [markylaredo/openjev-mcp](https://github.com/markylaredo/openjev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Mr-Neutr0n/laya-session-guard](https://github.com/Mr-Neutr0n/laya-session-guard) (Apache-2.0, Python, HEAD `2eb697e`) fine-tunes `convaiinnovations/laya` for session content and action labels. **Not TypeSafe Jev.** Quoted README: **This checkpoint is not suitable for automatic tool authorization.** On 24 separately written synthetic sessions it detected **4 of 11** suspicious sources, **54.2%** action accuracy, and two incorrect allows. Templated 144-session content and action accuracy rose to **100%**. Quoted: **These are synthetic prototype metrics** and **not a held-out attack-family benchmark.** Base versus this fine-tune on the challenge: action 37.5% versus 54.2%, content 54.2% versus 70.8%, suspicious recall 0/11 versus 4/11, block recall stayed 2/8. Action probabilities below the provisional **0.8** threshold require review. Quoted: **The threshold is a prototype default, not a measured safety guarantee.** Native Laya `act_probability` is ignored. Bypassing the wrapper with `Agent.predict` bypasses overflow checks. The wrapper does not execute tools. Same checkpoint: [hxrikp/laya-session-guard-pilot](https://huggingface.co/hxrikp/laya-session-guard-pilot). Quoted HF card: **Not suitable for automatic tool authorization.** The saved checkpoint missed **7 of 11** suspicious sources. Quoted: templated perfect accuracy **is not evidence of robust session understanding.** *Theirs* numbers are not a rh-guard ROC. Distinct from [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) and [wangmiaozero/laya-router-skill](https://github.com/wangmiaozero/laya-router-skill). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[RaulLazaro/dsh-jev](https://github.com/RaulLazaro/dsh-jev) (MIT, JavaScript, HEAD `60336d3`) asks Jev typed questions from DeepSeek Harness through the `jev` tool (hope the model looks). Settings → Plugins → Jev. TypeSafe direct uses `jev-latest` (moving alias). The key stays in the DSH credentials store. Quoted: **Read the probabilities, not just the pick.** `confidence` roughly 0.4–0.6 on a noul carries little information. Quoted: **Measure `confidence` against your own workload before gating an action on it.** *Theirs* **13x faster and 13.6x cheaper** than a model, and **105x** faster and ~**120x** cheaper than a subagent, are not a rh-guard ROC. It loses to `grep` when the criterion is mechanical. `timeoutMs` **60000**, `maxStateChars` **40000**, `maxQuestions` **200**. A tool answer is not permission. Distinct from [lldois/dsh-jev](https://github.com/lldois/dsh-jev), [979569650/dsh-typesafe](https://github.com/979569650/dsh-typesafe), and [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Txy02/jev-harness](https://github.com/Txy02/jev-harness) (MIT, Python, HEAD `d8fe665`) wraps TypeSafe Jev typed questions in Python. Quoted: **Not affiliated with TypeSafe AI. Contains no model weights.** Backends: `JevBackend`, `MockBackend`, and `NimbleBackend`. Quoted: the Nimble adapter **is tested against a fake scorer only.** Example `Gate(act_at=0.8, reject_below=0.3)` is uncalibrated. Noul gating uses `|p − 0.5| × 2`. README: `jev-latest` moves; pin a version after thresholds are tuned. A Gate ACT is not this sidecar's structural deny. Distinct from [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness), [AntonioCoppe/jev-harness](https://github.com/AntonioCoppe/jev-harness), [AiPersonacademy/apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness), [maito1201/jev-harness](https://github.com/maito1201/jev-harness), and [ismaelsoilet/jev-harness](https://github.com/ismaelsoilet/jev-harness). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[aibengineering/minecraft-jev-distillation](https://github.com/aibengineering/minecraft-jev-distillation) (no license, TypeScript, HEAD `6939767`) trains a local LightGBM policy to imitate Jev Minecraft combat decisions. 17,592 windows, 93 fights, 414 features. Quoted: **these scores measure imitation, not combat win rates.** The demo recording uses LightGBM; Jev was queried afterward on the saved state. No Jev API key is needed to run the site. Not a coding-agent hook. Not TypeSafe at inference. *Theirs* imitation scores are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[anna-srp/review-triage-agent-skills](https://github.com/anna-srp/review-triage-agent-skills) (no license, JavaScript, HEAD `cab9321`) is a ZooWork Agent Runtime skill pack for review triage. Default mode `emulated` uses the agent's own model and no extra key. `jev` runs when `JEV_API_KEY` is configured. `replica` points at a Jev-style endpoint such as Kev or Nimble. Health, safety, discrimination, legal, and staff-conduct matters always escalate. Decisions below **0.75** route to human review; **0.75** is uncalibrated. Fast setup runs one emulated triage on three checked-in sample reviews. The quick Runtime turn has a two-minute hard budget. Three samples are not a rh-guard ROC. Not a coding-agent PreToolUse hook. Distinct from [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[davertor/jev-slop-guard](https://github.com/davertor/jev-slop-guard) (MIT, JavaScript, HEAD `7e3de0f`, badge **0.1.25**) is a Chrome MV3 extension that scores and stamps AI slop on X and LinkedIn as you scroll, one `{ slop, not_slop }` choice per post. Default slop threshold **70%**: green **Slop** below it, red **Stop** at or above. Blur and the SLOP stamp default on. **Show the post** clears that for the current session. Quoted: **Scrolling is never blocked.** Promoted and sponsored posts and "Who to follow" widgets are skipped. TypeSafe is the default provider; OpenRouter is the other, and the decisions endpoint refuses the call unless TypeSafe is allowed under OpenRouter Privacy. Model default `jev-latest` (moving alias); `jev-1.13.0` pins a version. The key stays in `chrome.storage.local`. A blur is not a hide and not a deny. Distinct from [bornakapusta/slop-guard](https://github.com/bornakapusta/slop-guard), [SwastikGorai/unslopify](https://github.com/SwastikGorai/unslopify), and [adamnroman/slop-filter](https://github.com/adamnroman/slop-filter). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[PerrinT/open-jev-typed-decisions](https://huggingface.co/spaces/PerrinT/open-jev-typed-decisions) (public Gradio space, sha `a8aed40`) serves `com-kotobalabs/open-jev-deberta-v3-large` in one forward pass. **Not TypeSafe Jev.** `app.py` calls `demo.launch(mcp_server=True)` and, on exception, prints **mcp_server launch unavailable** and launches without MCP. *Theirs* accuracy **0.854** in-domain and **0.690** out of distribution, ECE **0.022** / **0.035**, are not a rh-guard ROC. Quoted: **Treat a distribution as a ranked shortlist rather than ground truth.** English only, 512-token context, first 256 tokens of state, argmax on choice. Advertised MCP can fail open to a Gradio page. Distinct from [githubnext/localjev](https://github.com/githubnext/localjev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dwrth/laya-multilingual-demo](https://huggingface.co/spaces/dwrth/laya-multilingual-demo) returned HTTP **401** from the Hub API and the raw README (`Invalid username or password`). **advertised space ≠ readable card.** Watch tags (gradio, system-one, classification, multilingual, mcp-server, region:us) are *theirs*. Do not invent a model id, a threshold, or an MCP launch. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hongdroid94/fab-evidence-gate](https://github.com/hongdroid94/fab-evidence-gate) (no license; GitHub description *theirs*: evidence-aware semiconductor alert triage with TypeSafe Jev, policy guards, and reproducible evaluation) is an empty Git repository (HTTP 409; README 404). **advertised gate ≠ shipped source.** Do not invent policy guards. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kongyo2/similarity-ts-jev](https://github.com/kongyo2/similarity-ts-jev) (MIT, TypeScript, HEAD `90e41c2`) is the CLI `@kongyo2/similarity-ts-jev`. Jev scores duplicate pairs (`refactor` 0–3, plus same-logic and same-concept). Default `--min-score` **1.9**. Model `jev-latest` (moving alias). `--cache` replays answers; a fully cached run needs no API key (cache hit ≠ a fresh live judgment). Exit `0` done, `1` usage or analysis or a `--fail-on-*` gate, `2` when some pairs are unjudged. `--fail-on-warnings` and `--fail-on-duplicates` default off. *Theirs* date-fns run: 1,294 pairs to 56 families, 25 seconds, about $0.07, is not a rh-guard ROC. A refactor score is not a safety deny and not a merge grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kwon85428-art/typesafe-ai](https://github.com/kwon85428-art/typesafe-ai) (no GitHub license field, no language, HEAD `f0ba933`; SKILL.md frontmatter `license: MIT`) is a TypeSafe System One agent skill. The tree at this HEAD is `.gitignore`, `SKILL.md`, and `test-prompts.json`. Quoted skill: **Code owns the workflow; the model supplies programmable common sense.** Quoted: **Treat cookbook thresholds and demo results as examples to evaluate, not universal.** Quoted: **0.5 means similar probability for yes and no, not medium intensity.** Live docs are the source of truth. GitHub description (*theirs*) says Darwin-optimized 54.0→69.9; that figure is not in `SKILL.md` at this HEAD. Do not cite it as a measured ROC. A skill is not a PreToolUse hook and not a grant. Distinct from [sisodias/jev-agent-skills](https://github.com/sisodias/jev-agent-skills). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[monstercode2/jev-browser-playground](https://github.com/monstercode2/jev-browser-playground) (MIT, Python, HEAD `62063ce`) is a local Jev browser playground. Community fork of browser-use/jev-ultrafast, **并非上游官方产品**. macOS and Google Chrome scripts; the Windows and Linux start flow is not accepted here. `TYPESAFE_API_KEY` covers click and scroll; filling text needs a separate OpenAI-compatible text model. UI at `http://127.0.0.1:18866/`. Failure stop: re-observe a stale page, detect a repeat-navigation loop, at most **30** model calls per round; a click that was sent but whose observation failed is recorded and **不自动重放。** Quoted: **这不是“所有网站、所有指令都能完成”的保证。** Not a coding-agent PreToolUse gate. Distinct from [DowLucas/browser-jev](https://github.com/DowLucas/browser-jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[nischal94/emoji-sift](https://github.com/nischal94/emoji-sift) (no license, TypeScript, HEAD `eb672e9`) ranks emoji through the Vercel AI Gateway Jev scorer. One score question per emoji. Code drops anything under the floor and keeps the top few. `SIFT_FLOOR` default **1.5**, `SIFT_LIMIT` **12**. Quoted: the floor default is measured rather than guessed. Quoted: **Jev has a single provider and no fallback.** Five runs of one query: success, 503, success, 503. The key stays server-side; the browser posts to `http://127.0.0.1:5174`. A rank floor is not a deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[shikaizhong-design/pi-parallel-gate](https://github.com/shikaizhong-design/pi-parallel-gate) (MIT, TypeScript, HEAD `093b785`) is a Pi extension tool `parallel_gate` the main model must call (hope the model looks). Layer 0 deterministic glob and side-effect overlap is a hard edge. Layer 1 is a Jev noul, P(safe to parallelize). Layer 2 is code: p ≤ veto **0.30** is a hard edge, p ≥ safe **0.70** is no edge, and the band between is a soft edge. Quoted: thresholds **are initial values pending calibration.** Quoted: **Fail-closed by design:** malformed probabilities, missing answers, API outages, or a missing API key never produce a "safe" verdict — they degrade to `jev.ok: false` or conservative edges, **and the main model judges for itself.** Without `TYPESAFE_API_KEY`, only Layer 0 runs and the verdict is marked degraded. Judgment never replaces tests and `git diff`. Jev sees task descriptions and globs, never file contents. More than 12 subtasks is invalid. *Theirs* 25 unit tests with Jev mocked are not a rh-guard ROC. Distinct from [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) and [dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[valendra-tech/jevall](https://github.com/valendra-tech/jevall) (Apache-2.0, Python, HEAD `c45956d`) is a typed-decision gateway: one Qwen forward pass, candidate-label logit projection, softmax over the valid labels only. **Not TypeSafe Jev.** A wire-compatible typed contract is not TypeSafe logits. The demo adapter runs with `--model demo` and no GPU. Default `serve` binds `0.0.0.0:8000`. The image runs as root. Quoted: **not a guarantee that every model is perfectly calibrated** or that the model's judgment is universally correct. Authentication, quotas, persistence, tenant isolation, and public media-URI policy belong at the deployment boundary. *Theirs* **65 tests, no GPU required** are not a rh-guard ROC. Do not dump weights. A gateway answer is not this sidecar's structural deny. Distinct from [ziozzang/hearim](https://github.com/ziozzang/hearim) and [githubnext/localjev](https://github.com/githubnext/localjev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[infinitylogesh/systemone](https://github.com/infinitylogesh/systemone) (pyproject license Apache-2.0; GitHub license field was null, Python, HEAD `41a96e2`, version **0.1.0**) is an experimental proxy that serves TypeSafe-shaped `POST /v1/systemone` typed decisions (`noul` / `choice` / `score`) from decoder-only models on vLLM, SGLang, or OpenRouter. **Not TypeSafe Jev.** Quoted README: **Raw LLM probabilities are often overconfident:** Gemma 4 averages **0.99** confidence while being right **62%** of the time on Emotion. *Theirs* zero-shot typed accuracy Gemma 4 **0.709** vs published Jev **0.727**; quoted: **Jev figures are third-party published, not measured here.** Fitted-temperature ECE is not a rh-guard ROC. A wire-compatible gateway is not this sidecar's structural deny. Distinct from [githubnext/localjev](https://github.com/githubnext/localjev), [valendra-tech/jevall](https://github.com/valendra-tech/jevall), [rawwerks/one-system](https://github.com/rawwerks/one-system), and [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya). Do not dump weights. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[shikaizhong-design/jego](https://github.com/shikaizhong-design/jego) (README states MIT; GitHub license field was NOASSERTION, JavaScript, HEAD `45269f7`) is an unofficial single-file port of browser-use/jev-ultrafast: one typed-choice request per step drives Ego Lite. GitHub now serves this tree as [shikaizhong-design/ego-jev-ultrafast](https://github.com/shikaizhong-design/ego-jev-ultrafast); the `jego` slug redirects there. The README clone line still says `github.com/shikaizhong-design/jego`. Quoted: these guardrails **are mitigations, not guarantees**. Quoted: the high-risk keyword gate is **on by default**; **`JEV_AUTO=1` turns it off.** Quoted: **a cleverly worded button can get past it**, and link URLs are not inspected. Freshness guards re-check the element before CDP input; a changed page invalidates the decision. Hard budgets: **60** actions and **120** model calls. Quoted residual: a DONE judgment comes from the same model that acts. Page text goes to `api.typesafe.ai`. *Theirs* median decision step **0.6 to 1.9** seconds is not a rh-guard ROC. A keyword denylist is not this sidecar's structural deny. Distinct from [monstercode2/jev-browser-playground](https://github.com/monstercode2/jev-browser-playground), [DowLucas/browser-jev](https://github.com/DowLucas/browser-jev), and [shikaizhong-design/pi-parallel-gate](https://github.com/shikaizhong-design/pi-parallel-gate). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ZIJIAN004/jev-switchboard](https://github.com/ZIJIAN004/jev-switchboard) (MIT, JavaScript, HEAD `35e6b29`) is a Claude Code / Codex semantic communication gate. Quoted English: **Let coding agents talk only when the receiver's next action should change.** A network request occurs only when a checkpoint is due, a plausible recipient exists, and an API key is configured. Default `auto` every **3** answers. Quoted: **The demo mocks only the JEV response.** Routing, persistence, and `hookSpecificOutput.additionalContext` injection in that demo are real code. A mocked decision is not a live gate. `drop` never enters the inbox. Distinct from [dev-hari-prasad/switchboard](https://github.com/dev-hari-prasad/switchboard) and [ruban-24/switchboard](https://github.com/ruban-24/switchboard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dperezcabrera/system-one-chess](https://github.com/dperezcabrera/system-one-chess) (GPL-3.0, Python, HEAD `679a1d7`) plays chess by sending **one Choice question whose options are the legal moves** (at most 218; Choice accepts 255), so Jev cannot return an illegal move. Quoted: **Better than chance, and still not a chess player.** Quoted: **Jev is a fast classifier, not a chess engine.** *Theirs* percentile-versus-Stockfish figures are not a rh-guard ROC. Code owns the legal action space. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Allan-Nava/hookgate](https://github.com/Allan-Nava/hookgate) (MIT, JavaScript, HEAD `176decc`) describes a Claude Code `PreToolUse` shell gate and a `Stop` gate on unverified completion, answered by TypeSafe Jev. Quoted: **Status: scaffold.** Quoted: **The plugin installs and does nothing yet.** Quoted: **Fail-open, always.** No key, network failure, timeout, 5xx, or a bug exits 0 with empty stdout. Designed rule: below the confidence threshold the command gate is always `ask`, never `allow`. **advertised gates ≠ shipped handlers.** Distinct from [thevibeworks/jevgate](https://github.com/thevibeworks/jevgate), [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate), and [eugeniughelbur/jev-gate](https://github.com/eugeniughelbur/jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[FrancyJGLisboa/action-vocabulary-forge](https://github.com/FrancyJGLisboa/action-vocabulary-forge) (MIT, Python, HEAD `f0a64de`, v0.3) compiles a system's decisions into an evidence-graded Action Bundle and a generated adapter so TypeSafe JEV chooses among legal actions. Quoted: `validate_action_bundle.py` **refuses what is not proven.** Quoted: **Code decides what is legal**, applies thresholds and abstention, re-checks preconditions, and executes a handler generated from an observed binding. A human grants credentials and resolves abstentions. *Theirs* one internal surface: JEV **53/54** vs a keyword resolver **33/54** — not a rh-guard ROC. `mcp` and `ui` renderers are unit-tested, not exercised live. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Jul1en-Lin/pi-jev-compaction](https://github.com/Jul1en-Lin/pi-jev-compaction) (MIT, TypeScript, HEAD `a526adc`) is a Pi adapter for [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) on `session_before_compact`. It is not a replacement of Pi's native `compact()`. Quoted: missing key, unsupported Pi version, timeout, request failure, or an invalid response **保持原始压缩输入不变**, then Pi compacts as usual. Pins Pi `0.85.1` and upstream `0.4.0`. Description rewrite (*theirs*): **基于 Jev 的 Pi 上下文压缩扩展，在原生压缩前筛选过时的工具调用和结果，保留原生消息结构。** `drop_call` removes the pair; `drop_result` keeps the call and truncates only when the text is longer than **420** characters (head **300** + 120). Prune ≠ deny; dropping calls can erase eval evidence. Distinct from [dev-willbird1936/pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact), [kleosr/cursor-clijev-compaction](https://github.com/kleosr/cursor-clijev-compaction), and [hoshinodis/opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner). Soft judgment is never the sole veto. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[MohtashamMurshid/jev-design-lint](https://github.com/MohtashamMurshid/jev-design-lint) (MIT, TypeScript, HEAD `ab4775d`, package **0.1.0**) is a design-policy linter for CSS/JSX with a Codex hook installer. Quoted: independent community project, **not an official TypeSafe product.** Quoted: deterministic policy violations are errors; **optional Jev opinions are warnings.** `init` refuses to overwrite `jev-design.json`. Not published to npm. A warning is not a hard deny and not a taste verdict. Distinct from [huntedman/JevLint](https://github.com/huntedman/JevLint) and [mizchi/jev-lint](https://github.com/mizchi/jev-lint). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[TypeSafeAI/jev-harness](https://github.com/TypeSafeAI/jev-harness) (MIT, TypeScript, HEAD `102fb17`) is a community coding harness in the unofficial TypeSafeAI organization. Quoted: **Community project.** Quoted: **The model proposes. Jev supplies evidence. Code decides. The host authorizes.** Quoted: **Jev unavailable is never safe** (timeout, missing key, provider error, or malformed reply → `unavailable`, proposal-only). Pin **`jev-1.13.0`**, never `jev-latest`. Quoted: **this repository never executes anything.** Quoted: **n = 20, synthetic. A signal, not a calibration.** Tests are offline and make no network request. Distinct from [AntonioCoppe/jev-harness](https://github.com/AntonioCoppe/jev-harness), [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness), [Txy02/jev-harness](https://github.com/Txy02/jev-harness), and [ismaelsoilet/jev-harness](https://github.com/ismaelsoilet/jev-harness). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ai13io/jev-native-mcp](https://github.com/ai13io/jev-native-mcp) (Apache-2.0, Python, HEAD `c9fb0fe`) is an MCP server for ranking, batch screening, and claim checks of public code and documents in Codex and Claude Code. Quoted: unprocessed items, skipped regions, ties, and failed batches **remain visible instead of disappearing** from the result. Local spending limits and receipt logs record usage without storing request bodies. If the agent never calls the tools, no gate runs. A spend cap is not a safety envelope. Distinct from [emlama/jev-mcp](https://github.com/emlama/jev-mcp), [SAITS-Swiss-AI-Tech-Services/jev-mcp](https://github.com/SAITS-Swiss-AI-Tech-Services/jev-mcp), and [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[cwhy/decision-injection-bench](https://github.com/cwhy/decision-injection-bench) (MIT, Python, HEAD `1f48839`) is a reproducible prompt-injection evaluation for Jev-like structured decision systems. Quoted: **not a universal safety leaderboard** and not an exhaustive jailbreak benchmark. *Theirs* simple v1: **1,332 recorded calls** from Jev 1.13.0, SemIf/Qwen3.5-4B, and Winnow-12B Q8. Comprehensive v2 plans **25,920 logical calls per model**. Quoted: not affiliated with TypeSafe. Those counts are not a rh-guard ROC. Do not copy attack procedures into this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[diegozhou114-cloud/jev-agent-quality](https://github.com/diegozhou114-cloud/jev-agent-quality) (MIT, TypeScript, HEAD `29f903f`) is a stdio MCP server plus a copy-in skill for coding-agent review. One read-only tool, `jev_review`. Quoted: **Jev 不改代码**, and it does not replace tests, static analysis, or human review. Format, docs, typos, dependency installs, and one-line mechanical fixes are skipped by default. The key stays in the environment, not in the repo. If the agent never calls the tool, no gate runs. A structured score is not a merge grant. Distinct from [jiawei686/jev-review-mcp](https://github.com/jiawei686/jev-review-mcp) and [MaxIvanyshen/jev-review](https://github.com/MaxIvanyshen/jev-review). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dperezcabrera/system-one-poker](https://github.com/dperezcabrera/system-one-poker) (MIT, Python, HEAD `910e214`) measures TypeSafe Jev at Texas Hold'em through one Choice whose options are the legal actions. Quoted: **Better than chance, not distinguishable from breaking even.** *Theirs* +29.6 with standard error 57.6 is not a profit and not a rh-guard ROC. Same author as [dperezcabrera/system-one-chess](https://github.com/dperezcabrera/system-one-chess). Code owns the legal action list. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ggilestro/jevguard-wp](https://github.com/ggilestro/jevguard-wp) (no license file, PHP, HEAD `fe551ab`) is a WordPress comment filter on OpenRouter `jev-latest` (moving alias). Quoted *theirs*: **120 of 120 spam comments with zero false positives** on 215 real comments, about $0.00004 each — not a rh-guard ROC. Settings table: if the check fails, **Hold for moderation** / **Fails closed**. A spam-folder move is not a safety envelope. Distinct from [navidkashani/jev-guard](https://github.com/navidkashani/jev-guard), [Debasishhh/jevguard](https://github.com/Debasishhh/jevguard), and [pablozr/JevGuard](https://github.com/pablozr/JevGuard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[KGFCode/laya-drone-lab](https://huggingface.co/spaces/KGFCode/laya-drone-lab) (MIT Gradio space) replaces TypeSafe Jev tactical calls with [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) in a MuJoCo obstacle-track sim. **Not TypeSafe Jev.** Quoted: **近距离保护仍可覆盖模型动作.** Quoted: Laya score thresholds are carried from upstream, **尚未重新校准**, and **不声称优于 Jev** or the rule baseline. Quoted: this is not a strict real-time control benchmark. `collisions` includes ground contact. Distinct from [KGFCode/laya-decision-lab](https://huggingface.co/spaces/KGFCode/laya-decision-lab). Do not dump weights or flight code. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[oluies/jev-vs-spacy](https://github.com/oluies/jev-vs-spacy) (MIT, Python, HEAD `cd11dad`) compares spaCy, TypeSafe Jev, and Claude on English spam, English support routing, and Swedish routing in Braintrust. Quoted: **The student learns the teacher's mistakes.** *Theirs* spaCy on 2,000 gold labels **99.6%** vs 2,000 Jev labels **97.8%** on English routing (Bitext) — not a rh-guard ROC. Quoted: every Jev call sends the message text, in full, to TypeSafe in the US. A distilled student is not the teacher and not a safety deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[rapina/jev-assist](https://github.com/rapina/jev-assist) (MIT, JavaScript, HEAD `882ba63`) routes Codex model and reasoning effort through a central Jev Assist service; the workstation executes with the local ChatGPT account. Quoted: **A skill by itself cannot change a running Codex process's model.** Unavailable routing waits up to four seconds, then executes locally with Sol (fail-open to a model, not a deny). Completion reports are client telemetry, **not independent result-quality verification.** `/v1/responses` is disabled on the public gateway. Derived from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router). Distinct from [glud123/jev-assist](https://github.com/glud123/jev-assist). Routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[rfi-irfos/gut-check](https://github.com/rfi-irfos/gut-check) (Apache-2.0, Python, HEAD `77ae4a4`) is a System-1/System-2 verification gate. The fast classifier is [rfi-irfos/laya](https://github.com/rfi-irfos/laya), **not TypeSafe Jev** and distinct from [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya). *Theirs* on 55 hand-checked traces: raw accuracy **38.2%**, worse than a heuristic, with calibrated confidence **near-zero on almost every item**. Example policy `confidence_threshold=0.55`, `min_margin=0.15` is uncalibrated. Quoted: **`gut-check` never silently blocks** or rewrites agent output. v1 integrations are observation-only before escalation may affect output. 55 traces are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[robinwintertaylor/Prompt-Router](https://github.com/robinwintertaylor/Prompt-Router) (no license file, TypeScript, HEAD `2a23aa4`) is an OpenAI-compatible gateway that asks TypeSafe Jev (`jev-latest`, moving alias) to sort prompts. Badges claim sub-120ms and **Zero Hallucination Routing**. Quoted: Jev never generates unstructured text. Typed primitives are not a correctness proof; those badges are not a measured ROC. Below **0.60** confidence it refuses to downgrade to a flash model and elevates the query — **0.60** is uncalibrated, and elevation is not a deny. Routing ≠ permission. Distinct from [fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router) and [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[uzuraDev/x-not-interested-jev](https://github.com/uzuraDev/x-not-interested-jev) (no license file, TypeScript, HEAD `9bc6fb3`) clicks X **Not interested** via Playwright/CDP when a Vercel AI Gateway Choice is yes. Quoted: **The default is dry-run and does not click.** `DRY_RUN=false` is the only live opt-in. `THRESHOLD` default **0.85** is uncalibrated; missing yes-probability does not click. `ENABLE_MUTE` / `ENABLE_BLOCK` warn and do nothing. Quoted: this is not the official X API and can lead to account limits. A click is not a safety deny. Distinct from [uzuraDev/cookie-clicker-jev](https://github.com/uzuraDev/cookie-clicker-jev). Do not invent posts. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[yusupsupriyadi/jev-skill](https://github.com/yusupsupriyadi/jev-skill) (MIT, JavaScript, HEAD `973fc38`) is a Claude Code plugin that routes skill selection and post-turn judgment through OpenRouter `~typesafe/jev-latest` (moving alias). Quoted: **Everything is advisory. No hook ever blocks** a tool call or stops Claude from finishing. Without a key the plugin stays idle: it never errors, never blocks, and never injects. `route_min_confidence` default **0.5** is uncalibrated. Routing sends the prompt text and installed skill names to OpenRouter. A suggestion is not a grant. Distinct from [Alexander-68/jev-skill](https://github.com/Alexander-68/jev-skill) and [sisodias/jev-agent-skills](https://github.com/sisodias/jev-agent-skills). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[raihankhan-rk/diffjury](https://github.com/raihankhan-rk/diffjury) (no license file; README calls it a demo app, TypeScript, HEAD `9a29ad3`) pastes a public PR URL and shows one TypeSafe `systemOne` call. Model `jev-latest` (moving alias). `TYPESAFE_API_KEY` is server-only. Quoted README: **No GitHub OAuth, analytics SDK, user identity store, or LLM fallback in v1.** `verdictTone` only colors the UI: `block` or `merge_blocker` ≥ **0.65** is `danger`; `request_changes` or confidence < **0.55** is `warn`. That tone does not merge or block GitHub. A danger color is not a deny. *Theirs* anonymous analyze count is not a rh-guard ROC. Distinct from [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate) and [egma-ai/jev-reviewer](https://github.com/egma-ai/jev-reviewer). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Fuwn/typesafe-mcp](https://github.com/Fuwn/typesafe-mcp) (MIT, JavaScript, HEAD `5ba01ee`) is a stdio MCP with one `evaluate` tool. Default `model` is `jev-latest` (moving alias). Quoted README: answers **pass through without further validation or automatic accept/reject decisions**. If the agent never calls `evaluate`, no gate runs (hope the model looks). Distinct from [itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp), [Renwang-Huang/typesafe-mcp](https://github.com/Renwang-Huang/typesafe-mcp), [MarkChu-git/typesafe-mcp](https://github.com/MarkChu-git/typesafe-mcp), and [wangkuangkuang/jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hufaei/decision-infra](https://github.com/hufaei/decision-infra) (MIT, TypeScript, HEAD `d49895e`) is a Jev-compatible `POST /v1/systemone` gateway for hosted Jev and local Reflex, SemIf, and Laya. Quoted README: **没有静默 fallback、隐式重试或模型替换。** An unknown explicit model returns `404 unknown_model` and does not swap. Omitted `model` defaults to `jev-latest` when `TYPESAFE_API_KEY` is set, otherwise `laya-multilingual`. Quoted: SemIf confidence **是本 adapter 的 concentration heuristic，不等同于 Jev 的校准概率。** SemIf returns `501` on `score` or `noul` and does not pretend to support them. Quoted: **不要直接拿未经校准的 confidence 驱动高风险动作。** `/healthz` only proves the gateway process is up. A Reflex, SemIf, or Laya route is **not TypeSafe Jev**. Distinct from [infinitylogesh/systemone](https://github.com/infinitylogesh/systemone). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[JayanGupta/Laya-System-1-Model](https://github.com/JayanGupta/Laya-System-1-Model) (README says Apache-2.0; no LICENSE file; GitHub license null; Jupyter Notebook, HEAD `ead6b43`) is a local showcase of `convaiinnovations/laya`. **Not TypeSafe Jev.** Quoted README: **Zero Hallucinations** and **Calibrated Probabilities** are theirs. A notebook chart is not a rh-guard ROC. Distinct from [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) and [inferenceprince/laya-onnx](https://huggingface.co/inferenceprince/laya-onnx). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[NotoriousPOG/trust-router](https://github.com/NotoriousPOG/trust-router) (MIT, Python, HEAD `a8ac0f7`, version **0.1.0**) is a shadow-mode lab: deterministic rules, a local BERT route classifier, and Laya. **Not TypeSafe Jev.** Quoted: **Learned evaluators never control traffic; deterministic policy remains authoritative.** Quoted: a learned disagreement **cannot change the route.** Laya pin `convaiinnovations/laya-typed-decisions` revision `f9ab0b228f0fc0f14d873dbc99038f135c2da1b2`. *Theirs* 40-case challenge Laya **72.5%** / BERT **60%** / Rules **52.5%**, and the 20-case synthetic routing set Rules **95%** / BERT **90%** / Laya **40%**, are not a rh-guard ROC. Quoted: those numbers **are not production-quality claims.** Hard rules still `block` credential patterns and send destructive actions to `human_review`. Distinct from [CeamKrier/semantic-firewall](https://github.com/CeamKrier/semantic-firewall). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ZenDeveloper7/context-evidence-keeper](https://github.com/ZenDeveloper7/context-evidence-keeper) (MIT, JavaScript, HEAD `d723914`; package id `jev-evidence-keeper`) keeps exact Codex task evidence across compaction, adapting [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction). Quoted: **Never blocks compaction** when preservation or Jev scoring fails. Jev is **off by default**. When Jev returns a score, an unpinned candidate below `keepThreshold` **0.62** is not restored; pinned candidates stay, and compaction still proceeds. `model` `jev-latest` is a moving alias. Quoted: **Jev probabilities are ranking signals, not proof. Code owns thresholds.** The audit does not prove every useful fact was selected. Prune ≠ deny. Distinct from [kleosr/cursor-clijev-compaction](https://github.com/kleosr/cursor-clijev-compaction) and [Jul1en-Lin/pi-jev-compaction](https://github.com/Jul1en-Lin/pi-jev-compaction). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[bakertony-hash/AIConnect4](https://github.com/bakertony-hash/AIConnect4) (no license file, C#, HEAD `008e5e4`) is a watchable Connect 4 arena. Default matchup is catalog `typesafe/jev-1.13` (Red) against `openai/gpt-5.6-luna` (Yellow) via OpenRouter. The dropdown also lists `~typesafe/jev-latest` (moving alias). Quoted: **An illegal, empty, or unparseable answer retries once, then aborts the game and stops the series. No silent column fallback.** A missing `OPENROUTER_API_KEY` leaves Play disabled. A game abort is not this sidecar's deny. Distinct from [dperezcabrera/system-one-chess](https://github.com/dperezcabrera/system-one-chess). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ericjuta/omp-cua-jev](https://github.com/ericjuta/omp-cua-jev) (MIT, JavaScript, HEAD `c8d829b`) is guarded computer use: Oh My Pi's configured judge picks from a local action table, then Cua Driver executes. [ericjuta/omp-jev](https://github.com/ericjuta/omp-jev) is the same repository (GitHub id `1381225253`); the old slug redirects. Default `minConfidence` **0.8** and `minProbability` **0.6** abstain instead of acting. Quoted `jev-loop.mjs`: **Scores are policy gates, not correctness estimates.** Quoted: deterministic scores of **1** **are sentinels, not measurements.** Quoted README: a text-model fallback at confidence **1** is **neither calibrated certainty nor user authorization.** Quoted: **command acceptance is not completion.** Quoted: **A positive Cua click receipt alone is insufficient.** `authorize` must return its own boolean; a judge choice that fails it finishes `denied`. *Theirs* **15 tests** and a **4,796 ms** demo with **zero judge calls** are not a rh-guard ROC. Quoted: they **do not prove autonomous judge-selected native action.** Distinct from [luw2007/omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) and [SemetricLabs/omp-greenlight](https://github.com/SemetricLabs/omp-greenlight). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[IJyad/jeb-typed-decisions](https://huggingface.co/IJyad/jeb-typed-decisions) (Apache-2.0) is an Arabic MARBERTv2 checkpoint of [IJyad/jeb](https://huggingface.co/IJyad/jeb), **178M**. **Not TypeSafe Jev.** *Theirs* overall accuracy **0.8752** on **2,700** held-out synthetic decisions and ECE **0.0524** are not a rh-guard ROC. Quoted: a first split scored **1.0000** because labels were a deterministic function of the text; that benchmark was thrown away. Quoted: **12% label noise**. Quoted: **not validated on real production tickets.** Quoted: their **0.8752** and Laya's **0.766** **are not comparable.** Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[olafura/gemma4-12b-system-one](https://huggingface.co/olafura/gemma4-12b-system-one) (Apache-2.0) is a WIP **70.79M**-parameter routed expert beside Gemma 4 12B FFN layers. **Not TypeSafe Jev.** It answers in free text, not Choice / Score / Noul. Quoted: a gate under the floor **is clamped to exactly 0**, so a shut router is bit-identical to base Gemma. Serve floor **0.8** (manifest training floor **0.5**). *Theirs* **12** English TTS items (base **6/6** decidable and **5/6** underspecified asked; expert **5/6** and **6/6**) are not a rh-guard ROC. Quoted: they **show that the path works, not how good it is.** Distinct from [infinitylogesh/systemone](https://github.com/infinitylogesh/systemone). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[irouter-eu/jev-skill](https://github.com/irouter-eu/jev-skill) returned GitHub API **404** at this fold. The org exists; its public repo list is [irouter-eu/whatsai](https://github.com/irouter-eu/whatsai) only. **advertised jev-skill ≠ shipped source.** Do not invent a skill router. Distinct from [yusupsupriyadi/jev-skill](https://github.com/yusupsupriyadi/jev-skill) and [Alexander-68/jev-skill](https://github.com/Alexander-68/jev-skill). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kerwin2046/jev-intuition](https://github.com/kerwin2046/jev-intuition) (no license file, TypeScript, HEAD `22aafd0`) is a dashboard of route, compact, and gate beats, plus a Claude `UserPromptSubmit` hook. Quoted hook: **Fail-open: any error exits 0** with no JSON so the prompt still proceeds. A successful choice still sets `additionalContext` and exits 0. `INTUITION_AUTO_ROUTE=0` disables the hook. Model `jev-latest` (moving alias). `scripts/jev-decide.mjs` labels a block Noul ≥ **0.55** `block`, ≥ **0.35** `review`, else `pass` — a beat label, not a host deny. An injected route line is not a grant. Distinct from [cskwork/pi-jev-router](https://github.com/cskwork/pi-jev-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[wallfacers/jev-pi-router](https://github.com/wallfacers/jev-pi-router) (no license file, Python, HEAD `b55a838`) routes Pi roles across vendor pools. Rules plus Jev typed-choice. Quoted config: `fail_open: true` and **decision_engine.fail_open 必须为 true 方可投产（FR-006）.** Jev errors fall back to rules. Default model `jev-latest` (moving alias). Quoted README: the decision call **不进对话上下文**. A chosen model is not a tool grant. Distinct from [cskwork/pi-jev-router](https://github.com/cskwork/pi-jev-router) and [phin-tech/pi-jev-approver](https://github.com/phin-tech/pi-jev-approver). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[zanedonkey/TG-jev-chatbot](https://github.com/zanedonkey/TG-jev-chatbot) (MIT, TypeScript, HEAD `52ddeac`) relays Telegram DMs into forum topics. Quoted README: **Jev-ready: future triage / routing can plug in.** `src/index.ts` has no Jev client. **advertised Jev triage ≠ shipped source.** The bot must be a group admin to see staff replies. A forum copy is not a deny. Distinct from [brainstormity/Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[robertjndw/gosys1](https://github.com/robertjndw/gosys1) (MIT, Go, HEAD `be171dd`, 1 star) is an independent stdlib-only Go client for TypeSafe's SystemOne API (`Noul` / `Choice` / `Score`). Quoted README: it is **not affiliated with or endorsed by TypeSafe**. Quoted: **Keep the thresholds that act on these values in your own code. The model reports what it found; your policy decides what to do about it.** Default model `jev-latest` is a moving alias; pin with `WithModel`. A client library is not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[AISidesKicks/selectia](https://github.com/AISidesKicks/selectia) (CODE-LICENSE Apache-2.0; GitHub license field NOASSERTION, Python, HEAD `a66d9c3`) is an educational System One-style reproduction on Liquid AI LFM2.5 (ported from [Mapika/decider](https://github.com/Mapika/decider)). **Not TypeSafe Jev.** Typed `choice` / `score` / `noul` from one forward pass; YESMOM is Noul-only on the tiny bases. Quoted: **no decoding, no parsing, no generated text, and no answer outside the options you defined.** A fitted temperature in `selectia_config.json` is their calibration control, not a rh-guard ROC. Wire-compatible typed decisions are not this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lologhost3/Rafeeq-Mini---Layan-Alhamad--Advanced-Agentic-AI-System-Engineering](https://github.com/lologhost3/Rafeeq-Mini---Layan-Alhamad--Advanced-Agentic-AI-System-Engineering) (no license file, Jupyter Notebook, HEAD `1cf78a1`) is an educational bilingual capstone for synthetic Tawseel delivery support: local MCP `stdio`, scoped memory, human approval for refunds above **SAR 500**, adversarial suite, and redacted tracing. Quoted README: **synthetic data** and **does not claim institutional endorsement**. Offline stub mode is not live Jev. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[siren2345/jevlocal-mac](https://github.com/siren2345/jevlocal-mac) (no license file, JavaScript, HEAD `e42ec64`) is a macOS loopback gateway for Jev-shaped `POST /v1/systemone` / `/v1/decide` over llama.cpp Metal. Quoted README: it **does not claim to reproduce TypeSafe Jev's model, probabilities, context behavior, or algorithms.** Constrained one-token decode yields **one-hot decisions, not calibrated confidence estimates.** Quoted: a future fast route **will never silently substitute a heuristic or a lower-quality model.** *Theirs* BBQ-100 **71%** and **122 ms** p50 on an M5 Air are not a rh-guard ROC. Distinct from [alvarobartt/sys1](https://github.com/alvarobartt/sys1), [rawwerks/one-system](https://github.com/rawwerks/one-system), and [githubnext/localjev](https://github.com/githubnext/localjev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[AhmedA-afk/relay_itsm](https://github.com/AhmedA-afk/relay_itsm) (no license file, Python, HEAD `bf69dfa`) is a Meridian Foods ITSM demo (FastAPI + React). Quoted README: **The judgment layer is not wired yet; everything it will need is.** Policy in `relay/policy.py` is pure; priority is derived, never stored; writes record reasons. Quoted **201** backend tests are not a rh-guard ROC. **advertised Jev usecases ≠ shipped judgment.** Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Anjali-Kedia/gatehouse](https://github.com/Anjali-Kedia/gatehouse) (MIT, Python, HEAD `7887cf2`) is a policy gateway: hard rules, then three fixed Jev Choice questions, then mandatory human approval for every write (`ALLOW` / `BLOCK` / `CLARIFY` / `REVIEW`). Quoted README: **Jev can route a request toward review faster or slower; it never grants execution rights.** Quoted: a write **can never reach `ALLOW` regardless of Jev's output.** Unavailable / uncertain → `REVIEW`. Default `JEV_ADAPTER=mock`. Quoted: **portfolio demonstration of the pattern, not a production safety system.** *Theirs* live miss counts on a 40-case set are not a rh-guard ROC. Distinct from [omkarghugarkar007/actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) and [zyphr-labs/turnstile](https://github.com/zyphr-labs/turnstile). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Arpit-Khandelwal/jev-linkedin-slop-filter](https://github.com/Arpit-Khandelwal/jev-linkedin-slop-filter) (MIT, JavaScript, HEAD `df6cd0e`) stamps LinkedIn posts **BAIT** / **CORP** / **BRAG** via TypeSafe Jev; posts stay readable. Local keyword rules first; thresholds `is_slop >= 0.60` or `is_corporate_slop >= 0.70` in `server/jev.js`. Quoted: **Zero false positives** on **14** labelled samples — not a rh-guard ROC. Quoted: if the proxy is down or Jev errors, **every post stays visible. A broken judgment must never hide a real post.** Distinct from [ChuckNomis/linkedin-post-filtering-jev](https://github.com/ChuckNomis/linkedin-post-filtering-jev) and [adamnroman/slop-filter](https://github.com/adamnroman/slop-filter). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Chrishow2/mcp-jev](https://github.com/Chrishow2/mcp-jev) (MIT, Python, HEAD `916112b`) is a minimal unofficial MCP wrapper exposing TypeSafe Jev `jev_decide` (yes/no, choice, score) over Streamable HTTP / stdio. Default model `jev-latest` (moving alias). Quoted README: **Threshold and routing logic belong in the agent prompt, not in this server.** Quoted: **Unofficial project. Not affiliated with** TypeSafe. An MCP tool the agent must call is hope-the-model-looks, not this sidecar's structural deny. Distinct from [itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp), [Fuwn/typesafe-mcp](https://github.com/Fuwn/typesafe-mcp), and [Renwang-Huang/typesafe-mcp](https://github.com/Renwang-Huang/typesafe-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[LiuRJ99/dsh-decision-engine](https://github.com/LiuRJ99/dsh-decision-engine) (MIT, JavaScript, HEAD `55bb2c2`) is a model-agnostic DeepSeek Harness decision layer: finite candidates, pluggable providers, environment adapters. Quoted: **Laya is the first provider, not the architecture.** **Not TypeSafe Jev.** Missing Laya → provider `degraded` / `provider_unavailable`; the host still starts. Confidence requires `confidenceKind`; Laya reports `provider_raw` (entropy is not decision quality). Default `confidenceThreshold` **0.55** applies only to `normalized`. *Theirs* **264** tests are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Mire-2019/dsh-jev-compaction](https://github.com/Mire-2019/dsh-jev-compaction) (LICENSE states MIT; GitHub license field NOASSERTION, JavaScript, HEAD `b8fef78`) replaces DSH's positional tool-result pruner with two Jev `noul`s (`keepResult` / `keepCall`) against `keepThreshold` default **0.5**. Quoted README: **Fail open, always** — no key, timeout, non-200, malformed, missing `noul`, or `NaN` returns `null` and falls back to the positional pass. Quoted: **A classifier is an opinion about the work, never a dependency of it.** `shadow` asks Jev and **changes nothing**. Prune ≠ deny. Distinct from [ZenDeveloper7/context-evidence-keeper](https://github.com/ZenDeveloper7/context-evidence-keeper) and [bojansandhaus/jev-lcm-dsh-compaction](https://github.com/bojansandhaus/jev-lcm-dsh-compaction). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[SoMaCoSF/jev-minesweeper-harness](https://github.com/SoMaCoSF/jev-minesweeper-harness) (no license file, Python, HEAD `92f3fd0`) is a Jev System One tester plus hex playables and a generic JSON `state→Noul/Choice/Score` harness (`--mode mock` or `jev`). A toy world is not this sidecar's live deny. Distinct from [dbssman/jev-minesweeper](https://github.com/dbssman/jev-minesweeper). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[alexadark/jev-openrouter-skill](https://github.com/alexadark/jev-openrouter-skill) (MIT, HTML, HEAD `18e1f21`) is a Codex skill that asks TypeSafe Jev through OpenRouter which model and reasoning effort to use. Quoted README: **It does not route work automatically** and returns a recommendation **without starting the task or changing your active model.** Quoted: returned probabilities **are not success rates.** A missing or invalid RIFF catalog **fails clearly instead of silently using an old release snapshot.** Routing advice is not a permission grant. Distinct from [rafaelbatistazz/jev-openrouter-runbook](https://github.com/rafaelbatistazz/jev-openrouter-runbook). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[alvarobartt/sys1](https://github.com/alvarobartt/sys1) (LICENSE Apache-2.0; GitHub license field NOASSERTION, Rust, HEAD `bd6e91e`) serves a System One-compatible `/v1/systemone` (and `/v1/decide`) API for open decision models such as Laya via candle. **Not TypeSafe Jev.** A wire-compatible gateway is not this sidecar's structural deny. Distinct from [infinitylogesh/systemone](https://github.com/infinitylogesh/systemone), [rawwerks/one-system](https://github.com/rawwerks/one-system), and [siren2345/jevlocal-mac](https://github.com/siren2345/jevlocal-mac). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[cwjechw98-lang/jev-gates](https://github.com/cwjechw98-lang/jev-gates) (MIT, JavaScript, HEAD `ad5851e`) is three zero-dependency Node gates for any coding harness: deterministic approval before irreversible actions, completion that demands evidence instead of «done», and rubric regression. Quoted README: **Fail-open is part of the contract.** Exit `3` and any unexpected exit mean **not confirmed**, never **forbidden**. Quoted: Gate 2 checks **consistency, not truth.** Default bands yes ≥ **0.8** / no ≤ **0.2** send the middle to a human. Distinct from [thevibeworks/jevgate](https://github.com/thevibeworks/jevgate) and [totally-tim/jev-gate](https://github.com/totally-tim/jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dabaicai001/jeeves-desk](https://github.com/dabaicai001/jeeves-desk) (LICENSE MIT OpenAI ChatKit derivative; GitHub license field NOASSERTION, JavaScript, HEAD `d702348`) is a config-driven customer-service desk: ChatKit UI, TypeSafe Jev decisions, chat-model tool calls over MCP, RAG. Quoted: change tools (refund/cancel/tickets) **are not open to the model** and go to humans; Jev recommends, code executes. Confidence bands high **0.85** / low **0.55** in `business.yaml` are uncalibrated routing hints. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[NewSonnet/cua-s1-forge-rlcd](https://huggingface.co/NewSonnet/cua-s1-forge-rlcd) (MIT, HEAD `240d006`) is a tiny CUA-S1 form-action classifier smoke checkpoint from RLCD on synthetic forms. **Not TypeSafe Jev.** Quoted model card: **This release uses no Jev or TypeSafe outputs.** *Theirs* RLCD top-1 **51.95%** vs supervised **51.67%** while NLL and ECE (**0.193**) worsened — not a rh-guard ROC. Quoted: do not use it for consequential actions without an independent verifier and human review. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[tauheedbuttt/jev-router-hook](https://github.com/tauheedbuttt/jev-router-hook) (MIT, JavaScript, HEAD `1fc46a5`) is a Claude Code `UserPromptSubmit` hook that asks TypeSafe Jev which tier (opus/sonnet/haiku) fits, then may delegate to a cheaper subagent. Default confidence gate **0.55**; below the gate it holds the current model unless opus is not in contention (`split`). Observe mode logs without delegating. Quoted README: if the key is missing, the API is slow, or anything goes wrong, **the hook exits silently and your prompt goes through untouched. It never blocks a turn.** Routing ≠ permission. Distinct from [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router) (proxy rewrite) and [Mandrilsquad1441/jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[173787247/dsh-wsl-jev](https://github.com/173787247/dsh-wsl-jev) (MIT, JavaScript, HEAD `e05b0aa`, 1 star) is an optional DeepSeek Harness WSL plugin (`jev_ask` / `jev_check` / `jev_rank` / `jev_status`) that calls TypeSafe Jev or OpenRouter System One directly. Quoted README: **Self-contained.** Does not depend on third-party Jev dsh/MCP plugins. Default model `jev-latest` (moving alias). Tools the agent must call are hope-the-model-looks, not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[CMaintz/jev-guard](https://github.com/CMaintz/jev-guard) (MIT, TypeScript, HEAD `0c4796a`) vets proposed tool calls through TypeSafe Jev (`allow` / `block` / `hold`) before they run. Policy `decide` in code; `escalateBelow: 0.8` → fail-safe hold; `perTool` can bypass cheap reads. Status: **v0.1 scaffold**. Quoted README: **NOT a security boundary.** *Theirs* ~68% accuracy is not a rh-guard ROC. Distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard), [alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer), and [pablozr/JevGuard](https://github.com/pablozr/JevGuard). Treating 0.8 as a safety envelope is theater. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[CMaintz/jev-triage](https://github.com/CMaintz/jev-triage) (MIT, TypeScript, HEAD `3494ed6`) is a GitHub Action that labels issues with TypeSafe Jev. Quoted README: **low-confidence answers are never applied** — they get `triage:needs-human` or escalate. Quoted: **A first-pass, not a decision-maker.** It never auto-closes issues. *Theirs* ~68% classification accuracy is not a rh-guard ROC. Distinct from [ThyFriendlyFox/jev-triage](https://github.com/ThyFriendlyFox/jev-triage) (soft-label eval filter). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[FreeJolan/jev-gateway](https://github.com/FreeJolan/jev-gateway) (no license file, TypeScript, HEAD `9180b2e`) is a Vercel/Node TypeSafe Jev gateway (`POST /v1/systemone`, `/ask`, `/healthz`, `/readyz`). Callers use a gateway token; the server holds the official key. Quoted README: example `{"value":0.95}` is **数值仅用于演示** (demo only). `/readyz` checks local config and **does not verify** upstream key validity. A proxy is not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[HunterXing/laya-agent-skill](https://github.com/HunterXing/laya-agent-skill) (Apache-2.0, HEAD `eb10787`) is a Hermes Agent skill for typed decisions via any Laya-compatible API (routing, triage, guardrails, tool pre-screening). **Not TypeSafe Jev.** Quoted README: it **does not** let the decision model authorize destructive operations. Hard rules and user confirmation always win. S3 cannot be lowered by the model. Quoted: **Uncalibrated probabilities are treated as hints, never as authorization.** Independent of Convai/Laya. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[SHONOSUKE100/jev-coding-agent-harness](https://github.com/SHONOSUKE100/jev-coding-agent-harness) (no license file, Python, HEAD `fa313df`) is a PoC terminal harness that ranks repo candidates with Jev `noul` into **PIN / FULL / EXCERPT / DROP**. Quoted README: currently **`search + context-pack + metrics` only** — it does not rewrite Codex history or measure live Codex tokens. Quoted: API scores are relevance outputs, **not calibrated confidence**; fixed 0.8 / 0.4 thresholds are initial values. API error → batch falls back to FULL. Catalog shrink ≠ deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Wh0rigin/pi-decision-prior](https://github.com/Wh0rigin/pi-decision-prior) (no license file, TypeScript, HEAD `cc90eb0`) is a pi extension/`prior_consult` measurement frame that feeds Jev option distributions into the main model's CoT as a **soft prior** the model may override. Quoted English README: **the acceleration hypothesis does not hold within the tested scope** (every prior-on run was slower). Soft prior ≠ hard gate. *Theirs* A/B numbers are discussion-draft magnitudes, not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[akynte/boundedcode](https://github.com/akynte/boundedcode) (Apache-2.0, Go, HEAD `23a64c1`) is an 8 GB-GPU coding agent: local generation, **required** hosted TypeSafe Jev decision plane, sandboxed verification, human approval gate. Quoted README: **Nothing accepted without verification.** Quoted: **Passing checks is evidence, not proof of correctness.** Pre-1.0; historical evals include false acceptances. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[cbruyndoncx/AskJev-MCP](https://github.com/cbruyndoncx/AskJev-MCP) (no license file, JavaScript, HEAD `a5e6765`) is an unofficial MCP server over `@typesafe-ai/sdk` (`ask` / `list_models` for choice/noul/score). Quoted README: **confidence is a separate axis from the answer** — gate on it in the agent. An MCP tool the agent must call is hope-the-model-looks. Distinct from [Chrishow2/mcp-jev](https://github.com/Chrishow2/mcp-jev) and [itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[fazlerocks/jev-adblock](https://github.com/fazlerocks/jev-adblock) (MIT, TypeScript, HEAD `43be07f`) is a Chrome MV3 ad blocker: one Jev Choice per element; **Code owns every threshold; the model only judges.** Budget, circuit breaker, never-touch payment/auth/captcha lists. Not a coding-agent hook pack. Treating category thresholds as a rh-guard ROC is theater. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hcl-z/pi-jev-gate](https://github.com/hcl-z/pi-jev-gate) (no license file, TypeScript, HEAD `0fc8b7c`) is a Pi extension that checks file mutations against `constraints.md` via TypeSafe Jev (Abide-shaped). Default `threshold` **0.6** is **reasoned, not measured**. Quoted README: **Everything that goes wrong lets your change through** (no key / timeout / unreadable → skip with warning). Quoted: the guard is a **constraint advisor, not a security boundary**. Distinct from [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) (pre-exec allow/block) and [dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[inematds/jev-gw](https://github.com/inematds/jev-gw) (MIT, Python, HEAD `e3efff1`) is a stdlib-only Jev decision gateway: daily spend cap, cache, abstention policy, cost ledger. Quoted README: on failure it **returns human review instead of breaking the caller** (`suggest` vs review). Exit `0` = suggestion, `2` = needs review. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jackchen13755/dsh-jev-kit](https://github.com/jackchen13755/dsh-jev-kit) (BSD-3-Clause, TypeScript, HEAD `b2005b3`) exposes ~23 named Jev judgments on DeepSeek Harness (privacy scan, scope, memory/batch triage, …). Quoted README: **不拦截、不改写、不问你** — advisory only; **不注册任何 hook**. Distinct from [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit) (Claude Airlock). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[justhalfbit/dsh-plugin-jev-effort-selector](https://github.com/justhalfbit/dsh-plugin-jev-effort-selector) (MIT, JavaScript, HEAD `169a9a3`) rewrites DSH reasoning effort per message via Jev. Default `confidenceThreshold` **0.6** breaks ties upward. Quoted English README: missing key / timeout / malformed / unsupported level — **Nothing is thrown and nothing blocks the turn.** Effort routing ≠ permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[muhandis525/jev-code-reviewer](https://github.com/muhandis525/jev-code-reviewer) (Apache-2.0, Python, HEAD `c7fd582`) cascades local Semgrep/AST findings then asks Jev only on ambiguous windows. Quoted README: **not as a standalone security guarantee.** *Theirs* OWASP Java 72.2% precision / Vul4J **0/65** strict hits are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[vlados/laravel-spam-guard](https://github.com/vlados/laravel-spam-guard) (MIT, PHP, HEAD `35cf10a`) is Laravel spam content filtering via TypeSafe Jev (`Allow` / `Review` / `Block`). Quoted README: **Your application owns persistence, the review queue, approval, and delivery.** Unavailable check → `Review`. Default review band **0.2** / reject ~**0.9** are provisional. Shadow before blocking customers. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[jackie-cqz/dsh-jev-plugin](https://github.com/jackie-cqz/dsh-jev-plugin) (MIT, TypeScript, HEAD `a5d3963`, 1 star) is a DeepSeek Harness plugin exposing TypeSafe Jev `noul` / `choice` / `score` as `jev_decide` / `jev_evaluate` tools (`jev-latest` moving alias). Optional `tools/pre-execute` risk gate is **disabled by default**; `guard.onError` default **`allow`** (fail-open). Quoted README: offline `rules` are **an accident-prevention layer, not a security boundary.** Quoted: intentional injection **is not connected**; enabling intent does not inject messages. Oversized state is **rejected, never truncated**. Distinct from [tr1v3r/dsh-jev](https://github.com/tr1v3r/dsh-jev) / [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails) / [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard) / [nanami-0713/dsh-jev-decide](https://github.com/nanami-0713/dsh-jev-decide). Treating fail-open soft Jev as a security boundary, or `confidence.approveAt` **0.8** as a rh-guard ROC, is theater. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[takumi-golf/jev-fill-pdf](https://github.com/takumi-golf/jev-fill-pdf) (MIT, JavaScript, HEAD `99a4335`, 1 star) maps Japanese PDF form labels to profile *keys* with TypeSafe Jev via Vercel AI Gateway (`typesafe-ai/jev`). Quoted README: **Labels go to Jev. Your values never leave the browser.** Quoted: **Low-confidence fields are never filled silently** (≥ **0.8** fill; **0.5–0.8** confirm; below leave blank). Status: **building in public** — app not published; scripts reproduce facts on a real 国税庁 form. Not a coding-agent hook pack. Treating **0.8 fill as a safety envelope** is theater. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Agnuxo1/Universal-Cognitive-Architecture-JEV-v2](https://github.com/Agnuxo1/Universal-Cognitive-Architecture-JEV-v2) (MIT, HTML/Python runtime, HEAD `f947d7d`) is an executable graph workflow: deterministic allowlist work, validated graph context, optional JEV collaboration Choice (`single` / `second_opinion` / `thinktank` / `defer`), Codex workers in a **read-only sandbox**. Quoted README: **Acceptance means the declared checks passed, not that all claims are true.** Quoted: **JEV advice cannot waive checks.** **This implementation consults JEV once at initial auto routing.** Offline demo needs no credentials. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Dphoshoba/ticket-triage](https://github.com/Dphoshoba/ticket-triage) (package.json MIT; GitHub license field null, JavaScript, HEAD `b8794e7`) triages support tickets with TypeSafe Jev via OpenRouter (`~typesafe/jev-latest`): urgency noul, department choice, frustration score; Express demo. Routing copy is application policy, not a host deny. *Theirs* sample **85.3%** / **97.2%** confidences are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[MDGChamomile/pi-jev](https://github.com/MDGChamomile/pi-jev) (MIT, JavaScript, HEAD `80c2b7f`) is experimental consent-gated Pi tools: `jev_route_task` and `jev_rerank` via OpenRouter `~typesafe/jev-latest`. Quoted README: each tool **does not execute a route, grant authorization, or replace the parent agent's judgment.** Quoted: **Advice is not authority.** Noninteractive modes **fail closed**. Declining consent returns a sanitized fallback without a provider request. Distinct from [y0usaf/pi-jev](https://github.com/y0usaf/pi-jev) / [JohnsonRan/pi-jev](https://github.com/JohnsonRan/pi-jev) / [fivethirty/pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Soft judgment is never the sole veto. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[MaururuTakumi/codex-jev-compaction](https://github.com/MaururuTakumi/codex-jev-compaction) (MIT, JavaScript, HEAD `cf7266b`) is a Codex plugin: `PreCompact` asks Jev which tool evidence to keep, writes a private checkpoint, restores on compact `SessionStart`. Quoted README: **It never rewrites the Codex transcript and fails open.** Default `keepThreshold` **0.5**; `jev-latest`. Quoted: **redaction is not a security boundary.** Distinct from [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) / [DihRJ/claude-code-jev-compaction](https://github.com/DihRJ/claude-code-jev-compaction). **prune ≠ deny**. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[OrMizL/jev-skill-router-bench](https://github.com/OrMizL/jev-skill-router-bench) (MIT, Python, HEAD `3266a69`) independently measures a TypeSafe Jev skill router on an 84-skill Hermes roster. Quoted claim: on **81** author-labelled turns, **37/69** skill-labelled exact (**53.6%**), **25/69** abstain, **7/69** wrong; among named skills **37/44** (**84.1%**). Quoted: **descriptive results for this evaluation set, not estimates of production accuracy**. Agent-level A/B is an **explicitly inconclusive appendix**. **not a rh-guard ROC**. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[chriscoveries/jevalaya](https://github.com/chriscoveries/jevalaya) (Cargo.toml Apache-2.0; GitHub license field null, Rust, HEAD `3bbacee`) is a Mac-local `/predict` router to Apple Neural Engine, MLX, or cloud Jev with a receipt on every call. Quoted README: **A hard failure stays visible — we don't dress it up as an answer.** Jev escalates when asked, when confidence is too close, or on retry. *Theirs* ~**18 ms** p50 ANE / ~**93%** local AG News are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dl013209-ai/jev-preflight-director](https://github.com/dl013209-ai/jev-preflight-director) (README MIT badge; GitHub license field null, Python, HEAD `14d0f50`) is a **local regex/heuristic** `<1ms` preflight director (domain, collision, pruning, search plan). **Not TypeSafe Jev** — name collision with [muse0509/jev-preflight](https://github.com/muse0509/jev-preflight). Advertised System One / token-cut claims are *theirs*; do not invent a TypeSafe gate. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin (name collision), not this sidecar.

[drycool/jev-mcp](https://github.com/drycool/jev-mcp) (no license file, Go stdlib, HEAD `e23ce3a`) is an MCP wrapper around a **local** Jev router (FTS/graph/agent tiers), not TypeSafe System One. Tools: `jev_query` / `jev_health` / `jev_stats` / `jev_feedback`. Quoted README: an answer is not a training example until feedback; **There is deliberately no `unknown`.** Tool failures are `isError` content, not silent success. Hope-the-model-looks. Distinct from [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[forestwas/gmail-jev](https://github.com/forestwas/gmail-jev) (MIT, Python, HEAD `107e930`) labels Gmail with TypeSafe Jev and optionally archives. Quoted README: **Nothing in this repo sends mail for you.** Quoted: code **does not send mail** and **does not hard-delete threads**. `DRY_RUN` defaults **true** (missing env → dry-run). Thresholds live in `routing.py`. Distinct from [maxvaega/gmail-jev-guard](https://github.com/maxvaega/gmail-jev-guard). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[guptadivyanshu765/n8n-nodes-jev-router](https://github.com/guptadivyanshu765/n8n-nodes-jev-router) (no license file, TypeScript, HEAD `fb697e3`) is an n8n community node for TypeSafe Jev: classify/route with a **Needs Review** branch below the routing confidence threshold, plus a **Calibration Check** mode on labeled data. Example routing threshold **0.75** is uncalibrated until measured. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hanshs474/jevx-mcp](https://github.com/hanshs474/jevx-mcp) (MIT LICENSE file; GitHub license field NOASSERTION, TypeScript, HEAD `289694b`) is an MCP server for [jevx.org](https://jevx.org) typed decisions (`decide` / `validate_questions` / `open_in_jevx`). Quoted README: HTTP 200 with non-zero `code` on refusal is surfaced as a **normal tool error, not a silent success.** A key is required. Hope-the-model-looks. Distinct from [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server) / [drycool/jev-mcp](https://github.com/drycool/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hf:Mezahir2025/laya-triage](https://huggingface.co/spaces/Mezahir2025/laya-triage) (Apache-2.0 space card, Gradio, sha `2870432`) is a Make.com-oriented message triage API on local [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) (`multilingual`): noul scores for lead / partnership / phishing / urgent. **Not TypeSafe Jev.** Soft Laya noul scores are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[NatBrian/pokemon-showdown-jev-agent](https://github.com/NatBrian/pokemon-showdown-jev-agent) (no license file, JavaScript, HEAD `2d491a8`) is a Pokemon Showdown battle agent with a typed Jev decision path and live dashboard. Description rewrite (*theirs*): validated poke-env harness, safe fallback decisions, transparent telemetry. Quoted README: if Jev is unavailable, times out, returns malformed data, or selects an illegal action, the adapter uses a **deterministic fallback** and **never presents a fallback choice as if it were a successful Jev decision.** Quoted: a fallback **is not evidence of Jev strategic quality.** Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[020909/KyrosLabs-Kepler-1](https://github.com/020909/KyrosLabs-Kepler-1) (Apache-2.0, TypeScript, HEAD `cf02401`) is a marketing site plus a Kaggle fine-tune pack of [Laya](https://github.com/NandhaKishorM/laya) into Kepler 1.1. Quoted README: **not affiliated with TypeSafe AI or Jev.** `model/README.md` specialises the pack for coding-agent tool gates (allow / ask / deny) and a secret tripwire. Weights are listed at [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) (sha `e44d672`); that card is YAML front matter only. **Not TypeSafe Jev.** This repo does not install a host hook. advertised tool gate ≠ a PreToolUse deny. Do not dump weights. Distinct from [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) and [manyamkarthik/laya-issue-triage](https://github.com/manyamkarthik/laya-issue-triage). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Bodila51/muse-jev-playbook](https://github.com/Bodila51/muse-jev-playbook) (MIT, Python, HEAD `70edf68`) is a Jev decision-layer playbook (triage, rank, retry, research cap, approval) before expensive agent work. Default `mode: shadow`. Kill switch (`enabled: false`, or `bypass jev` / `no jev`) returns `proceed_full` with no call. Quoted policy says that path logs no state; `route_task` still logs `state_goal` truncated to 300 characters. Quoted policy: **A Jev result is never permission**. Quoted README: **Jev never sends, publishes, pays, deletes, or changes permissions.** `act_min` **0.80** / `surface_min` **0.50** / `min_choice_confidence` **0.55** are uncalibrated. `model: jev-latest` is a moving alias. Quoted policy says an outage falls back to the normal path; `src/jev_client.py` has no timeout wrapper and no catch. advertised outage fallback ≠ a client catch. Distinct from [Bodila51/jev-hft-model-router](https://github.com/Bodila51/jev-hft-model-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[TheBous/jev-codex-router](https://github.com/TheBous/jev-codex-router) (no license file, Python, HEAD `6c2cae9`; GitHub description null) is a local Codex Responses proxy. Jev `Choice` picks `model` and `effort` from the catalog (`jev-latest`). No key, timeout, invalid model, or catalog miss uses the heuristic tiers. README says the router falls back below the configured confidence threshold; `router.py` stores confidence and does not compare it to a threshold. advertised confidence threshold ≠ shipped classifier. `TypeSafeClassifier` timeout defaults to **1.5** seconds; `router.example.json` sets **3.0**. Local auth is disabled by default. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router), [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router), and [Madikhan33/jev_codex](https://github.com/Madikhan33/jev_codex). Routing is not permission. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[UCoyote/LayaProfilerPlugin](https://github.com/UCoyote/LayaProfilerPlugin) (MIT, JavaScript, default branch `master`, HEAD `33f30b6`) is a Chrome DevTools profiler for LayaAir and Cocos Creator 3.8 Web games (node tree, GPU memory, FPS). **Not** [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) and **not** a typed-decision model. Name collision only. Not a gate. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[dymoo/code-taste-bench](https://github.com/dymoo/code-taste-bench) (MIT, TypeScript, HEAD `8b4f7e2`) ranks code-generating models on taste using TypeSafe Jev over OpenRouter (`typesafe/jev-1.13`, pinned). README calls the judgments **typed, calibrated opinions** and the headline **Taste Elo**. Demo items are public; sealed items stay closed. The human calibration study is **awaiting human raters**. The status line names 6 models × 8 tasks = 48 items; this HEAD has demo tasks and no `results/results.json`. advertised suite ≠ a published leaderboard. A taste score is not a rh-guard ROC and not a deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[eaisdevelopment/jevmcp](https://github.com/eaisdevelopment/jevmcp) (Apache-2.0, Python, HEAD `f0ac5ec`) is an Agent Plugins marketplace. The shipped plugin is **docdrift**: a skill plus an MCP server that asks Jev whether code still matches a spec. Quoted README: the agent spends effort **only on what was flagged**. CLI `--dry-run --strict` exits 2 on an unmapped sentence; a real check exits 1 on drift and **3 when TypeSafe is unavailable**. *Theirs* 3 seconds / $0.0013 and 11 seconds / $0.006 on 131 requirements are not a rh-guard ROC. The key is not placed in the model's context. On Codex the shell inherits the environment, so an exported key can be read with `env`; the skill says not to. Cursor is not supported yet (`${PLUGIN_ROOT}`). Further plugins are planned, not in this tree. Hope the model calls the tools. A flag is not a host deny. Distinct from [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server) and [drycool/jev-mcp](https://github.com/drycool/jev-mcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hf:harikarthikmanyam/laya-issue-triage](https://huggingface.co/harikarthikmanyam/laya-issue-triage) (Apache-2.0, sha `ad004d0`, `laya` safetensors) is the fine-tuned checkpoint used by [manyamkarthik/laya-issue-triage](https://github.com/manyamkarthik/laya-issue-triage). **Not TypeSafe Jev.** Card metrics (*theirs*): `issue_type` accuracy **0.6501**, macro-F1 **0.6273**. Quoted card: **Confidences are uncalibrated unless you fit temperatures.** Quoted: evaluated **only** on GitHub issue triage. Do not dump weights. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hf:hugging-apps/agent-jev-demo](https://huggingface.co/spaces/hugging-apps/agent-jev-demo) (Gradio Space, sha `9591ddb`, `mcp_server=True`) serves AgentJev-0.6B: Qwen3-0.6B with the language-model head removed. **Not TypeSafe Jev.** Quoted README: **over-length input is refused rather than silently cropped** (2,048 tokens). `contract.py`: transport IDs never enter semantic model input. *Theirs* **20–50 ms** on GPU is not a rh-guard ROC. Code: [malevrigns/agent-jev](https://github.com/malevrigns/agent-jev). Hope the model calls the Space. A probability is not a host deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hf:nccyber/laya-school-email-triage](https://huggingface.co/spaces/nccyber/laya-school-email-triage) (Apache-2.0 Gradio Space, sha `fafe89d`) triages synthetic K-12 front-office email with [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya). **Not TypeSafe Jev.** Quoted: **Everything here is synthetic.** Quoted: **`noul` (yes/no) under-reads hedged language**; the demo phrases leaving as a two-option `choice`. `app.py` maps noul `>= 0.5` to true. *Theirs* six emails (sentiment 6/6, department 4/6, hedged leave **0.19**) are not a rh-guard ROC. **0.5** is uncalibrated. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[lihua-maker/jev-ios-capture](https://github.com/lihua-maker/jev-ios-capture) (no license file, Swift, HEAD `9c2d59e`) is the Apple Vision capture stage for a jev-chat-jarvis iOS port. Quoted README: chrome leaking into a transcript **is a data-integrity bug, so it is reported rather than silently swallowed.** *Theirs* Apple Vision **12/12** pipeline-pass and fully clean is not a rh-guard ROC. `JevClient` throws on an empty state or a malformed answer; `probe()` never throws. README "Next" still lists `JudgeClient` while `Sources/JudgeClient` is already in the tree. Not a host hook. A judgment is not a send. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[ruidpm/triage-bench](https://github.com/ruidpm/triage-bench) (MIT, Python, HEAD `427712e`) benchmarks local Von (`wfzyx/von-1.0`) against Claude Haiku 4.5 and GPT-5.6 Luna on 8-way Banking77 triage. Quoted README: **Von is a stand-in; nothing here measures Jev.** *Theirs* 200 tickets: Von accuracy **97.0%** ECE **0.025**, Haiku **100.0%**, Luna **99.5%**. Routing keeps Von when confidence ≥ **0.80**. Quoted: **LLM confidence is self-reported, not a computed probability.** Quoted: **200 tickets on 8 intents is a demo; no significance testing.** Not a rh-guard ROC. **0.80** is uncalibrated for this sidecar. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[stperic/jev-medhallu-benchmark](https://github.com/stperic/jev-medhallu-benchmark) (MIT, Python, HEAD `8202847`) adds TypeSafe Jev 1.13 and four fast LLMs to Stanford MedHELM MedHallu via OpenRouter. Preregistered in `PREREGISTRATION.md`. *Theirs* test split n=1,000: Jev run 2 accuracy **92.9%**, and on items with confidence at least **90%** (**37%** of items) accuracy **99.5%**. Quoted limits: the question and threshold were **chosen on 1,000 separate dev items**; **One task.** The score command uses `--threshold 0.65`. Not a rh-guard ROC. A medical hallucination probability is not this sidecar's deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[treadkex1/decision-model-security](https://github.com/treadkex1/decision-model-security) (MIT, Python, HEAD `27dde07`) is local security research on typed-decision models (Jev-class **Kev**, open weights, not a TypeSafe API test). Quoted: confidence **inverts** on out-of-distribution input. *Theirs* kev-0.8b: `hello` **0.20**, garbage `asdfghjkl` **0.64**; kev-4b garbage **0.19**. Quoted: a pipeline with `if confidence > 0.5: auto-route` sends **all garbage input to the default class**. Quoted defenses: delimiter forgery **refuted**; option order **refuted** (6 permutations). Those figures are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Charlyhno-eng/jev-codex-pilot](https://github.com/Charlyhno-eng/jev-codex-pilot) (MIT, TypeScript, HEAD `9a503e8`) is a local Codex control center. Description rewrite (*theirs*): **Smart Codex overlay with JEV model routing, context optimization & Kanban automation. Reduce tokens, keep control.** Quoted README: **Codex runs only after an explicit user action.** Quoted: the task breakdown score **never blocks execution.** Shell `PreToolUse` asks Jev; `offloadDecisions` minimum confidence **0.75**. Unavailable or low confidence returns allow (fail-open reason: JEV unavailable or insufficient confidence). `deny`, and `confirm`, both emit `permissionDecision: deny`. Risk score **4** forces deny. Quoted token ranges (**10–25%** through **up to 60%**) are **practical estimates, not guaranteed results.** Quoted: the native pre-compaction review is advisory. Compaction is also mentioned at **90,000** tokens. Quoted: **JEV analyses projects without changing their files.** A Jev shell deny is not a structural envelope. Distinct from [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) and [nautahakk/jev-codex-router](https://github.com/nautahakk/jev-codex-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[juspay/neurolink](https://github.com/juspay/neurolink) (MIT, TypeScript, HEAD `a7fd9bf`, npm `@juspay/neurolink`, default branch `release`) is a provider pipe with a third inference type. Description rewrite (*theirs*): **The pipe layer of an AI nervous system — one interface connecting providers** — generate, stream, and a calibrated decide via TypeSafe Jev. Quoted README: every AI-driven optimization (model routing, context compaction, tool selection) fails open; **no key configured behaves exactly like NeuroLink without it.** Upgrade `minUpgradeConfidence` **0.3** and downgrade `minDowngradeConfidence` **0.6** are asymmetric routing bars. Tool drops happen only on a confident no (`minDropConfidence` default **0.6**). `tryDecide()` is the fail-open path; `decide()` surfaces the failure. Quoted: **there is no `neurolink decide` CLI command today.** Quoted: TypeSafe Jev is **the only provider serving `decide`**. MCP covers four transports. *Theirs* ~400ms and ~$0.00002/decision are not a rh-guard ROC. Those 0.3 / 0.6 bars are uncalibrated routing policy. Distinct from [slo-router](https://github.com/zeeshan8281/slo-router), [ziozzang/hearim](https://github.com/ziozzang/hearim), and [fstandhartinger/jev-router](https://github.com/fstandhartinger/jev-router). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[anessbelbati/jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) (MIT, Python, HEAD `372331a`) asks whether a decision model can beat dedicated rerankers. Quoted: Jev rubric minus Cohere Pro is +0.001, 95% interval −0.009 to +0.012. **This establishes neither a winner nor equivalence.** *Theirs* equal-dataset nDCG@10: Jev rubric **0.692**, Cohere Pro **0.691**, ZeroEntropy zerank-2 **0.682**. Equal weight per query puts Cohere **0.756** and Jev **0.738**. Calls used `jev-latest`, reporting version **1.13.0**. Quoted: the Qwen port **does not reproduce Jev's training**. Those nDCG figures are not a rh-guard ROC. Distinct from [gbesse/jev-rerank-server](https://github.com/gbesse/jev-rerank-server) and [Wanke15/product_search_bench](https://github.com/Wanke15/product_search_bench). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[GitNimay/jev-plays-tetris](https://github.com/GitNimay/jev-plays-tetris) (no LICENSE file; `package.json` says MIT, JavaScript, package `jev-tetris` 1.0.0, HEAD `5e1b268`) is solo Tetris where TypeSafe Jev picks each move through the Vercel AI Gateway as `typesafe-ai/jev`. Code enumerates every legal placement; the `placement` Choice drives the piece. Direct `JEV_MODEL` default is `jev-latest` (moving alias). The key is never stored, logged, or sent to the browser. Quoted: if the gateway stays down after retries, the heuristic plays that one piece — **the game never stops on a 503.** A placement is not a coding-agent grant. The heuristic fallback is not a host deny. Distinct from [uzuraDev/cookie-clicker-jev](https://github.com/uzuraDev/cookie-clicker-jev), [dperezcabrera/system-one-chess](https://github.com/dperezcabrera/system-one-chess), and [bakertony-hash/AIConnect4](https://github.com/bakertony-hash/AIConnect4). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[RickT34/dsh-just-enough-tools](https://github.com/RickT34/dsh-just-enough-tools) (MIT, TypeScript, package `dsh-just-enough-tools` 0.4.0, HEAD `866aaa3`) is a DeepSeek Harness plugin that reveals tools and skills progressively. Quoted goal (*theirs*): **nearly half the agent cost, with accuracy intact** — a goal, not a measurement. Quoted: **Jev selects capabilities, the Agent does the work.** The agent starts with no tools or skills. Settings: threshold default **0.5**, model `jev-latest`, `scoreTimeoutMs` **60000**, `maxSteps` **12**. On a score error, status is `score-error` and `scores` is `{}`, so **score error adds nothing**. That empty set is not a host deny of the turn and does not reveal the full catalog. Distinct from [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails), [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard), [lldois/dsh-jev](https://github.com/lldois/dsh-jev), and [advance-lion/dsh-jev-hook](https://github.com/advance-lion/dsh-jev-hook). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[NicolasRisso/JevMCP](https://github.com/NicolasRisso/JevMCP) (MIT, Python, HEAD `1549c3e`, status early **0.1.0**) is an MCP server that lets coding agents offload yes/no, multiple-choice, and scoring questions. Independent project, not affiliated with TypeSafe. Tool `jev_ask`. Docstring: **Open unsure items yourself.** Default threshold **0.6**. Unsure means confidence below threshold; for a noul, confidence is `|2p - 1|`. Model `jev-latest` / OpenRouter `typesafe/jev-1.13`. `JEV_MAX_ITEMS` **500** refuses an oversized call (a size cap, not this sidecar's deny). If the agent never calls the tool, no gate runs. An unsure row is not a host deny. Distinct from [emlama/jev-mcp](https://github.com/emlama/jev-mcp), [echohello-dev/jev-mcp-server](https://github.com/echohello-dev/jev-mcp-server), [SAITS-Swiss-AI-Tech-Services/jev-mcp](https://github.com/SAITS-Swiss-AI-Tech-Services/jev-mcp), [drycool/jev-mcp](https://github.com/drycool/jev-mcp), [olivdx/jev-mcp](https://github.com/olivdx/jev-mcp), [gnapse/jev](https://github.com/gnapse/jev), and [eaisdevelopment/jevmcp](https://github.com/eaisdevelopment/jevmcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[Wanke15/product_search_bench](https://github.com/Wanke15/product_search_bench) (no license file, Python, HEAD `aee9fd6`) compares BM25, TypeSafe Jev, a Qwen reranker, and Laya on WANDS, plus an interactive search view. Quoted: **不包含数据集、密钥或历史运行产物.** The tree implements NDCG@10/@20 and publishes no numeric result. Quoted `docs/benchmark.md`: **本仓库不发布本地已有实验结果.** Laya uses a fixed intranet address in `wands_algorithms.py`; scripts do not read `LAYA_ENDPOINT`. The interactive search threshold filter is not the WANDS rerank-only experiment. `jev_risk_guard.py` is a separate OpenRouter example (not the retrieval bench): `FLAG_NOUL` **0.5**, `ESCALATE_NOUL` **0.75**, `REDLINE_NOUL` **0.4**, endpoint `https://openrouter.ai/api/alpha/decisions`. Those floors are not a rh-guard ROC. Distinct from [anessbelbati/jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[eidos-space/eidos-smart-actions-plugin](https://github.com/eidos-space/eidos-smart-actions-plugin) (MIT, TypeScript, package `@eidos.space/plugin-smart-actions` 0.1.0, HEAD `72d0d68`) writes classification, scoring, and checkbox results back to an `.eidos` file. Quoted: actions **do not generate free-form replies**. Quoted: **Generating a draft does not execute** it or modify records. Checkbox applies when `result >= (output.threshold ?? 0.5)`. Validated results apply directly — a written field is not a safety deny. Distinct from [hush](https://github.com/emreozyoruk/hush) and [jev-triage](https://github.com/ThyFriendlyFox/jev-triage). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[hf:alibiserikbay/JevK5](https://huggingface.co/alibiserikbay/JevK5) (Apache-2.0, sha `c5be5f3`, base `Qwen/Qwen3.5-4B`, pipeline `text-generation`) is an open typed-decision head. Quoted card: a calibrated probability for every option in one forward pass, with **zero generated tokens**. It speaks a TypeSafe `/v1/systemone` wire shape. The readout is a softmax over answer-letter next-token logits divided by T = **1.367**. That wire shape is not TypeSafe logits. Quoted: **Not affiliated with TypeSafe AI or Jev.** *Theirs* JevBench v1.2 public: hard n=111 **0.676** vs untrained **0.613**, ECE **0.082** (untrained 0.117); standard **0.958** down from **0.986**; easy **1.000**. Inputs over **4,096** tokens are refused, not cut. Quoted: **No JevBench item, public or held out, and no output of Jev was used for training, tuning or selection.** Runtime named on the card: `github.com/allebee/jevk5` (runtime tree not verified here). Those public JevBench figures are not a rh-guard ROC. Do not dump weights. Distinct from [jev-gate-student-b](https://huggingface.co/SargeDev/jev-gate-student-b) and [jeff](https://github.com/Gestalt-Lab/jeff). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[kyr0/typed-decision-bench](https://github.com/kyr0/typed-decision-bench) (MIT, Python, HEAD `836c1e7`) is a System One typed-decision benchmark. Description (*theirs*): 275 use-cases and **27,598** decisions, called held-out. Body: **275 suites / 27,598 cases** on an explicit `test`/`calibrate`/`train` split. Question counts: choice **18,140**, noul **7,250**, score **2,208**. Quoted: **Calibration changes what the system claims, never what it chooses.** The TL;DR "provably" sentence is *theirs*, not a rh-guard proof. Description "held-out" is broader than the split that includes train. Those case counts are not a rh-guard ROC. Their reference impl is [kyr0/Bonsai-Llama-Jev](https://github.com/kyr0/Bonsai-Llama-Jev). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[mindroom-ai/response-audit-jev-plugin](https://github.com/mindroom-ai/response-audit-jev-plugin) (MIT, Python, HEAD `3ffca9e`, plugin `response-audit-jev`) audits a completed MindRoom answer and may post one follow-up. Quoted: **The audit requests verification; it does not prove an answer wrong.** Quoted: **Missing or incomplete evidence stays quiet.** Quoted: **`agents` defaults to `[]`, so installation alone audits nobody.** Quoted: **The probability threshold is a starting point, not a calibrated accuracy guarantee.** `audit.py` default `TypeSafeJudgmentConfig` threshold **0.9**. Hooks skip `incomplete_evidence`; provider exceptions continue; the answer is already delivered. Not a PreToolUse deny. Distinct from [clear-head](https://github.com/VladyslavHontar/clear-head) and [jev-cite-check](https://github.com/simonsez9510/jev-cite-check). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[peakevergreen/jevidence](https://github.com/peakevergreen/jevidence) (MIT, Python, HEAD `6450a78`) turns Choice, Noul, and Score into a testable routing policy. Description rewrite (*theirs*): **Let Jev judge. Let your code decide.** Quoted: **This is advisory issue triage. It never assigns issues, changes records, or executes actions.** Output includes `applied: false`. Quoted: **Replay never contacts a model.** Quoted: **Confidence is not a correctness probability.** Quoted: **API compatibility does not imply equivalent judgments.** Quoted: **Prompt wording is not an authorization boundary.** `policy.py` teaching floors stay route **0.8**, reproduction **0.85**. Quoted comment: **Teaching values, not calibrated production defaults.** Those floors are uncalibrated teaching policy. API failure: status `unavailable`, retain the current queue. Quoted runner: **An unavailable model is not a model vote for a fallback category.** Score does not become severity. Kev local calls use placeholder key `local` and never send a real `TYPESAFE_API_KEY` to that server. The captioned demo captures an earlier revision. Bundled judgments are synthetic fixtures, not captured Jev responses. `POLICY_VERSION` is `issue-routing-v2`. Not an official TypeSafe product. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[wmtang2/jevknows](https://github.com/wmtang2/jevknows) (GPL-3.0, Python, HEAD `e56bf74`) is a malicious-instruction prehook and skill. ZCode intercepts every `WebFetch` and `Read`. Codex is deterministic for shell URL targets and MCP tools; hosted tools stay advisory via `AGENTS.md`. MCP tools `check_url` / `check_file` / `check_text` are advisory; quoted: **the agent's built-in tools are not interceptable.** Policy: deny when any of `agent_directive`, `harmful_intent`, or `concealed_directive` is ≥ `JEV_GUARD_THRESHOLD` default **0.80**, and only when the hook runs. Guard errors **fail open** by default (`JEV_GUARD_FAIL_MODE=open`); a block mode exists. Manual exits: **0** allow, **2** block, **1** guard error. Quoted: **A judgment is not a sandbox.** *Theirs* deployed attack signals **0.46 / 0.99 / 0.96** BLOCK (hook exit 2); benign research corpora about **0.44–0.46**. Those signals are not a rh-guard ROC. Fail-open allows the load. Distinct from [alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer), [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit), and [revsmoke/promptrejectormcp](https://github.com/revsmoke/promptrejectormcp). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.

[petinari/omega-wheel-guard](https://github.com/petinari/omega-wheel-guard) (Apache-2.0, JavaScript, npm `omega-wheel-guard` **0.1.0**, HEAD `217a162`) is a coding-agent PreToolUse guard (Claude, Codex, Cursor, Gemini, Copilot, Factory Droid, DSH, git). Quoted README: **Fails open.** No key, no network, a 429, or a timeout → the write passes. Quoted: **A guard must never take the editor away.** `guard.mjs` logs `Jev/registry unavailable, failing open` and returns `kind: pass` when there is no client or the call throws. Default `mode` `block`, `blockThreshold` **0.75**, `blockThresholdUnverified` **0.9**, `warnThreshold` **0.5**. `warn` lets the write through; `shadow` returns `kind: pass`. Those floors are uncalibrated. The README word "calibrated" is not this sidecar's calibration. A library-reuse block is not rh-guard's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[Sharkelot/classify-goblin](https://github.com/Sharkelot/classify-goblin) (MIT, Python, HEAD `9ad6523`) is local typed decisions plus deterministic Hermes and artifact guards. **Not TypeSafe Jev.** Quoted: **Local confidence is not calibrated benchmark confidence.** Quoted: **deterministic workflow guards remain authoritative.** The default lexical demo must not be used as an intelligent safety classifier. Unsupported modalities fail closed with **503** — never a fallback to text. Quoted: **A blocked gate suppresses tool routing** and skips inference. Optional model answers are `advisory` with `authoritative=false`. *Theirs* **18/18** smoke (CG-MM-17, 2026-09-21, loopback `127.0.0.1:8094`) is not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[chatguard-dev/chat-guard](https://github.com/chatguard-dev/chat-guard) (no license file, C#, HEAD `5e1d0b3`) is a Unity chat-moderation proxy over Jev. Studios set thresholds in a dashboard. Quoted: when the model or the quota is unavailable, moderation **degrades to a shared dictionary filter instead of failing.** That dictionary degrade is not a host deny. Not a coding-agent hook. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[Sur-Cai/macos-computer-use-kit](https://github.com/Sur-Cai/macos-computer-use-kit) (MIT, Python, HEAD `08c32dd`) ships an optional `macos-cu jev` guard. Fold the guard only; do not copy CUA procedures. Quoted: **Small models judge, code decides.** Quoted: **The only part that needs a key. Everything else works without it.** The DSH plugin does **not** claim exclusive `ctx.computerUse`, so it **cannot block** the in-box Cua Driver. Every tool shells out with an argv array (`shell: false`); quoted: **model-supplied text can never reach a shell.** A Jev decision string is not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[Wh0rigin/pi-jev-router](https://github.com/Wh0rigin/pi-jev-router) (no license file, TypeScript, package `pi-jev-router` **0.1.0**, HEAD `95f4919`) sets Pi thinking level. Quoted: **它不切换模型，不写代码，不碰 Agent Loop.** Local rules are the fallback. Checklist: **environment-only failures never escalate nor call jev**; **malformed jev answer -> fallback, invalid level never applied.** Badge **44 pass** is not a rh-guard ROC. A thinking level is not a permission grant. Distinct from [philippdubach/pi-jev-router](https://github.com/philippdubach/pi-jev-router) and [cskwork/pi-jev-router](https://github.com/cskwork/pi-jev-router). Soft judgment is never the sole veto. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.
[siren2345/jevlocal](https://github.com/siren2345/jevlocal) (no license file, JavaScript, HEAD `53ef637`) is a loopback gateway on `:9011`. Distinct from [siren2345/jevlocal-mac](https://github.com/siren2345/jevlocal-mac). Quoted: it **does not claim to reproduce TypeSafe Jev.** Quoted: **Admission is mechanical** (input size, question shape), **never a confidence threshold.** Quoted: probabilities are **not calibrated** Jev probabilities. Fast-path failure falls through to SemIf. *Theirs* Laya **10/12** and ~**14 ms** are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[Ceobe-dev/routerBasedJev](https://github.com/Ceobe-dev/routerBasedJev) (no license file, Python, HEAD `4fa963c`) is a pure routing MVP. `JEV_MODEL=jev-latest`. `JEV_REQUESTION_CONFIDENCE_THRESHOLD=0.6` is an uncalibrated routing floor. Errors return the same `RouteDecision` with `error` set, not a silent model pick. A route is not a grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[rahuldegra1/Local-System-One-Router](https://github.com/rahuldegra1/Local-System-One-Router) (no license file, Python, HEAD `deec128`) is three files: README, `server.py`, and `code_writer.py`. Routes `/v1/choice`, `/v1/noul`, and `/v1/score`, plus `/v1/generate_code`. `code_writer.py` writes the response body to `auto_generated_archive_tool.py`. A generated file is not a reviewed grant. **Not TypeSafe Jev.** Do not treat a candidate-logit softmax as calibrated Jev. The README claims an automated syntax-sanitation filter; this fold confirmed only the client write. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[zheyar-ltd/exp-laya-router](https://github.com/zheyar-ltd/exp-laya-router) (MIT, Python, HEAD `fe7633e`) is a snake/grid router. **Not TypeSafe Jev.** A local Hamiltonian-cycle and flood-fill guardrail checks dead ends; the suite is **15** unit and integration tests covering guardrail overrides. *Theirs* under **50 ms** and those 15 tests are not a rh-guard ROC. Quoted "calibrated probabilities" are theirs. A game guardrail is not a coding-agent deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[lenML/deep-jev-seek](https://github.com/lenML/deep-jev-seek) (MIT, TypeScript, HEAD `fbb5654`) description rewrite (*theirs*): **Use DeepSeek/llamacpp like Jev. (just api router).** Default `missingLogprobPolicy: "zero"` returns all-zero probabilities and `confidence: 0`; `"error"` throws. Zero confidence is not a deny and not a calibrated abstention. **Not TypeSafe logits.** A wire-shaped router is not this sidecar's gate. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[riceball-tw/ai-router](https://github.com/riceball-tw/ai-router) (no license file, Vue, HEAD `f9e7ac8`) routes in the client (`src/ai/useIntentRouter.ts`). `navigational.noul < 0.5` → chat. `destination.confidence < 0.55` → do not guess. `ACTION_FLOOR` **0.7**. Quoted: **The table decides that, never the model's `destructive` answer**: **a classifier is not an authorisation boundary.** Those floors are uncalibrated. Not a coding-agent host grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[n8mirai/jev-relay](https://github.com/n8mirai/jev-relay) (MIT, JavaScript, HEAD `3932065`) README title is **jev2mcp**; the clone line is `n8mirai/jev2mcp`. **advertised clone path ≠ this listing.** Description on the watch still says ChatGPT plugin mentions; the README is a context-aware picker for MCP, plugin, and tool names. Code uses probabilities. Thresholds are experimental: ≤**0.20** no and ≥**0.80** yes. Uncertain, unavailable, or failed keeps the draft. Quoted: it **does not connect directly to MCP servers.** Signed-in ChatGPT injection is still unverified. A picker attach is not a host grant. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[GiskardB/jev-agentbridge](https://github.com/GiskardB/jev-agentbridge) (MIT, Python, package `jev-cpu-agentbridge` **0.2.0**, HEAD `04fa947`) scores option letters on CPU. **Not TypeSafe Jev.** Quoted diagram: **no generate()**. The response includes `accepted: bool`; `base.py` shows that field and this fold found no numeric cutoff that turns `accepted` into a host grant. Engines are SemIf (Qwen3-0.6B) or Laya. *Theirs* ~**7.9×** (~2s local $0 vs ~15.7s / 586 tokens OpenRouter) and CPU warm p50 **720 ms** SemIf vs **339 ms** Laya are not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[apixly-ai/jev-context](https://github.com/apixly-ai/jev-context) (MIT, Python, HEAD `0d62a90`) is an evidence CLI. The CI badge and install URL point at `JIA-ss/jev-context` (`git+https://github.com/JIA-ss/jev-context.git@v0.1.0`), not this listing. **advertised install remote ≠ this listing.** Quoted: **A semantic judgment never grants permission to execute an action.** Quoted: **`exec` executes the command you supply; it is not a sandbox.** `doctor` and `--plan` work without a key. No result cache. Up to **30** concurrent requests. Context reduction is not end-to-end cost reduction. Independent, maintained by JIA-ss, not an official TypeSafe product. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[simonw/llm-typesafe](https://github.com/simonw/llm-typesafe) (Apache-2.0, Python, HEAD `225932c`) is an LLM plugin, not a gate. Quoted: **Text is never automatically interpreted as JSON.** Quoted: scores **measure degree on the rubric, not probability of yes.** Not a host deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[hichem300/bruv](https://github.com/hichem300/bruv) (LICENSE file Apache-2.0; GitHub license field NOASSERTION, Python, HEAD `efc5568`) is a CLI over Jev, Simple Jev, and other open models. Quoted doctrine: **Never describe uncalibrated scores as real-world probabilities.** Simple Jev always reports `calibrated: false`; quoted: **do not use them for threshold decisions.** OpenRouter's typed Decisions API reports `calibrated: true` — that flag is not a safety envelope. The key is never a CLI flag. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[NickSeagull/nh-task-solver](https://github.com/NickSeagull/nh-task-solver) (no license file, Haskell, HEAD `8bca2d8`) advertises a Jev task solver. Quoted: **the solver is not implemented.** The executable prints a scaffold status, starts no server, and requires no Jev credentials; the generated Hspec driver is not a solver test. **advertised Jev task solver ≠ shipped scaffold.** Taxonomy artifacts moved from NeoHaskell commit `e5a7a396` classify possible work; they do not claim this solver implements those capabilities. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[dailyoozoo/jev-demo](https://github.com/dailyoozoo/jev-demo) (no license file, JavaScript, HEAD `bd2414d`) is a Decision Flood demo. `GATE`: Noul ≥ **0.8** has priority veto to a human; else Choice ≥ **0.85** auto, **0.6–0.85** review, below **0.6** human. Voiceover (*theirs*): **置信度可以直接当门禁阈值用** — that copy is theirs; those floors are uncalibrated demo policy. No key → SIM local probabilities, labeled 模拟 rather than 回放. Binds `127.0.0.1`. `/api/warmup` hard cap **200**. A demo gate is not this sidecar's deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[EnesDemir143/jev-laya-benchmark](https://github.com/EnesDemir143/jev-laya-benchmark) (no license file, Python, HEAD `ee8be5b`) says it is a **local benchmark experiment, not a production performance claim.** Laya was warmed and Jev was not, so latency is **not an apples-to-apples** warm-run comparison. *Theirs* mean **328.1** vs **309.2** ms, p50 **318.4** vs **307.8**, p95 **423.0** vs **329.1**. Agreement **80%** beginner-friendliness, **42%** CV fit, **61%** difficulty. Not a rh-guard ROC. Issue data and raw JSON are gitignored. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[PerryLink/llm-jev-laya-bench](https://github.com/PerryLink/llm-jev-laya-bench) (Apache-2.0, Python, default branch `master`, HEAD `07bcb2d`) is a measurement study, not an algorithm paper. Audit: **two cells of a published confidence-interval row could not be reproduced** (one Wald value with a Newcombe label). The fourth claim (heterogeneous judge incremental coverage) **is NOT supported**. Quoted: **access-layer self-reported fields are not trustworthy.** *Theirs* **$0.0808** across **1,773** API calls (n=1100 calibration battery **$0.0443**). Not a rh-guard ROC. Do not invent Harbor numbers. Loadout changes the clamp: **512** vs **1024**. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[Shray15/laya-vs-llm-benchmark](https://github.com/Shray15/laya-vs-llm-benchmark) (MIT, Python, HEAD `570b6e5`) benches MCP tool selection against real stdio MCP (5 tools). `bench_core.py` `CONFIDENCE_THRESHOLD = 0.5`; below that the tool is `none`. *Theirs* **28/36** (77.8%) Laya vs **35/36** (97.2%) qwen3:4b; Laya ~**30×** faster on their glance table. Quoted: **N is small.** Not a rh-guard ROC. **0.5** is an uncalibrated router floor. The description's confidence-gating is this 0.5. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[tmo1885-lang/kev-context-robustness-study](https://github.com/tmo1885-lang/kev-context-robustness-study) (CC-BY-4.0, HEAD `d92149b`) studies Kev context robustness. It does **not** establish that TypeSafe's Jev has the same failures as Kev-0.8B, or a production security vulnerability. Quoted: **Kev is not a Velorin Intelligence project** (Jared Palmer, Apache-2.0, [github.com/jaredpalmer/kev](https://github.com/jaredpalmer/kev)). The record distinguishes **bounded neural judgment** from **deterministic authority**. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[mpuig/danny](https://github.com/mpuig/danny) (MIT, Python, HEAD `44a10c1`) is an open System One model, not TypeSafe. *Theirs* frozen 0.6B volume tier **77.6%** / ECE **0.049** on an untouched in-family test; MiniCPM-q8 **+6.8** accuracy points, CI **[+4.5, +9.2]**. Quoted: **in-family calibration does not survive distribution shift** (confident errors **14–19%** at t≥0.9 out-of-family vs ~2% in-family). A 42-case rubric was **retired after retraction**. Not a rh-guard ROC. Do not dump weights. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[darrenli6/jev-block-ad](https://github.com/darrenli6/jev-block-ad) (MIT, TypeScript, default branch `master`, HEAD `7a3d90f`) is a Chrome Jev ad blocker. Distinct from [fazlerocks/jev-adblock](https://github.com/fazlerocks/jev-adblock) (HEAD `43be07f`). The README install still says `git clone https://github.com/fazlerocks/jev-adblock`. Quoted: **Fail open.** Any error, timeout, or budget stop hides nothing. Quoted: **Code owns every threshold; the model only judges.** Not a coding-agent hook. Do not treat category thresholds as a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[matt-cochran/jevitate](https://github.com/matt-cochran/jevitate) (MIT, TypeScript, npm `@jevitate/cli`, HEAD `4b09c93`) records browser Journeys. Fold the gate and MCP surface only, not CUA recipes. Quoted: success is **judged by an independent assertion, never the model's say-so.** Quoted: **never auto-healing a write or irreversible action.** The MCP server is **allowlisted**. Credentials are never sent to a model. Autonomous runs stay bounded to authorized origins. A Journey is not this sidecar's structural deny. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[saivivekvenna/jevy-graph](https://github.com/saivivekvenna/jevy-graph) (MIT, Python, HEAD `0f8a303`) description rewrite (*theirs*): compile documents into source-grounded RDF with evidence and provenance. Quoted: **Jev never invents free-form graph text.** Example `Thresholds(support=0.45, entity=0.10, joint=0.70)` are caller knobs, not a safety envelope. Not a coding-agent hook. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[hf:ait-hf/certus-jev-like-v0007](https://huggingface.co/ait-hf/certus-jev-like-v0007) (Apache-2.0, sha `ae776a3`) is a peft LoRA on `Qwen/Qwen2.5-1.5B-Instruct` (`text-classification`). Quoted card: **in the spirit of** TypeSafe Jev; it does **not generate text**. Tags include `typesafe` and `jev-like`. Softmax over option-letter logits (example temperature **1.02** for 3–5 options) is not TypeSafe logits. Card comparison quotes Jev **0.727** and Laya **0.766** (1200-case format) and a **0.949** cell; trunk val acc mean **0.792**. Those stay theirs, not a rh-guard ROC. Do not dump weights. Playground: [ait-hf/certus-jev-like-playground](https://huggingface.co/spaces/ait-hf/certus-jev-like-playground). Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[hf:pranaysuyash/laya-formatting-fragility](https://huggingface.co/datasets/pranaysuyash/laya-formatting-fragility) (Apache-2.0 dataset, sha `ba2a066`) has **480** rows = 40 bases × 12 format variants. The gold label never changes across a pair. *Theirs* laya **0.3.5**, English, M3 Max, 2026-09-22: overall acc **66.7%**; semantic→abstract key flip **87.2%**; order flip **21.7%**; mean confidence correct vs incorrect **0.532** vs **0.247**. Quoted: treat confidence gating as **domain-tested, never assumed**. OOD jargon confidence was flat **0.106** vs **0.114**. Not a rh-guard ROC. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[hf:dwidlee/systemone-lite-phase2](https://huggingface.co/datasets/dwidlee/systemone-lite-phase2) (Apache-2.0 dataset, sha `c85990f`) is distill rows for [systemone-lite](https://github.com/fritzprix/systemone-lite). Description rewrite is the leakage-hygiene card. Earlier local mixes had train∩eval leakage (debate ~**91%**, word_games ~**87%**, connect4 ~**37%**). This Hub revision claims **0.00%** train∩test overlap on `state_task` fingerprints. Quoted: **Do not mix `train` rows into `test`.** train **240800** / test **4700**. Not affiliated with TypeSafe AI / JevBench official leaderboards. Overlap figures are theirs, not a Harbor score. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[hf:siffat-22/laya-api](https://huggingface.co/spaces/siffat-22/laya-api) (Gradio Space card, Apache-2.0, sdk **6.28.0**) wraps [NandhaKishorM/laya](https://github.com/NandhaKishorM/laya) on free ZeroGPU and says decision checkpoints serve from CPU. Quoted card: typed decisions with **calibrated probabilities**, plus a Router that picks the checkpoint per language. Those probabilities are theirs. The watch lists the Space as a Gradio MCP server; the saved card shows an API, and an API on a Space is hope-the-model-looks, not a host grant. **Not TypeSafe Jev.** Distinct from the laya package. Soft judgment is never the sole veto. Do not merge into `examples/`. Cousin, not this sidecar.
[INV-285965956230/notification-manager-jevofz46](https://github.com/INV-285965956230/notification-manager-jevofz46) (no license file, HEAD `950be8e`) ships one file, **Your payment was confirmed.**, whose body is a dated note (`22-Sep-2026` / `SvioRR8o`). **advertised notification manager ≠ shipped source.** Do not invent a Jev gate. Cousin, not this sidecar.



[one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe) is a prompt-injection eval including TypeSafe Jev. Quoted: **demonstration set, not a statistically powered** benchmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) (current listing [harshwasan/jev-sentinel](https://github.com/harshwasan/jev-sentinel); keep both slugs) is a Pi/Claude/Codex integrity gate: Jev on calls, outputs, and replies. Quoted: **never auto-allows** (fail-closed ask). **allow / ask / warn** ladder; secret scrub before Jev; optional task pin. Contrast fail-open pruners / [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Distinct from alsoleg89/jev-guard. Quoted: **Prompt injection is not solved.** Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills) is a Hermes skill pack: routing / memory (hidden-instruction) / compaction / skill select / triage / computer-use gated by **safe action tables**; dashboard `on`/`shadow`/`off`. Quoted README: **Everything fails open**. Named lexical skip, not live Jev (acknowledgements). Quoted `skills/jev-memory/SKILL.md`: **Never read `dropped_injection_ids`**. Quoted enablement: **Shadow first, and mean it**. Distinct from [rsdkrasen/hermes-jev-router](https://github.com/rsdkrasen/hermes-jev-router) and [cdepuy/hermes-skill-router](https://github.com/cdepuy/hermes-skill-router); in-repo `jevkit/` ≠ [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit). Fold integrity only, not CUA recipes. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) is a local Laya skill inject via the **user-message channel**. Quoted: **Fail-open** if Laya is down. Quoted: **Accuracy is ~good, not perfect**. Contrast hermes-switchyard (**never loads the skill**) — this plugin *does* inject. Inject ≠ grant. Same-named [xXLODXx/hermes-skill-router](https://github.com/xXLODXx/hermes-skill-router) / [LLM-Architects/hermes-skill-router](https://github.com/LLM-Architects/hermes-skill-router) / [bkutasi/hermes-skill-router](https://github.com/bkutasi/hermes-skill-router) / [MKI13/hermes-skill-router](https://github.com/MKI13/hermes-skill-router) — this card is cdepuy. Hermes prompt-cache, not jevcache. Do not merge into `examples/`. Cousin, not this sidecar.

[dgp](https://github.com/numerous-com/dgp) is typed assessment then application-side **guarded commit**. Assessors do not execute. Quoted README: **application code retains control**. Quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe): **Speculative assessments cannot authorize effects**; cache hit ≠ live Jev. Primary protocol fold is in Augustus; here the integrity boundary. Do not merge into `examples/`. Cousin, not this sidecar.

[typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate) is a Hermes **fail-closed** tool-call policy gate. Quoted README: **not an autonomous permission slip.** Quoted: uncertain/unavailable → Hermes approval, not allow; **cannot override** Hermes hardline. Quoted: ambiguous multi-step → advisory `pre_llm_call` (not approval). Quoted: metadata-only audit. Distinct from thevibeworks/jevgate / totally-tim/jev-gate / hermes-plugin-jev (never returns `allow`). Cousin of hermes-jev-skills / hermes-skill-router / jev-routing. Do not dump plugin source. Do not merge into `examples/`. Cousin, not this sidecar.

[omo-jevlike-router](https://github.com/islee23520/omo-jevlike-router) is a local **jevlike** OmO skill router (frozen Qwen2.5-0.5B + option-attention; shrinks `<available_skills>`). Quoted: **fail-open**. Quoted measured: recall@24 **84.1%**, warm ~50–70 ms, ECE ~0.10. Quoted earlier 46.2%/95.5% was an **evaluation bug**. **soft router ≠ hard gate**. MIT. Do not dump model/weights. Distinct from TypeSafe Jev. Do not merge into `examples/`. Cousin, not this sidecar.

[llm-vs-jev](https://github.com/ishaannk/llm-vs-jev) is a controlled LLM-vs-Jev **guardrailing** bake-off. Quoted: **Nothing wins outright.** Quoted jev-1.13.0 strict accuracy **77.9%** / ECE **0.053**. Quoted steerability: opus 14.3% / jev 10.7%. Distinct from TeoMastro/jev-vs-llm-guardrails-intent-router. Do not invent RESULTS.md extras. Do not merge into `examples/`. Cousin, not this sidecar.

[jeff](https://github.com/Gestalt-Lab/jeff) (Jeff 1) is a local open-weight Jev-compatible fact-check head. Quoted: **API compatibility does not imply identical judgments.** Quoted 9,730 examples: Jeff **0.8183** / ECE **0.0807** vs Jev **0.8283** / **0.0932**. Quoted: **Lower ECE does not guarantee** an individual prediction is correct. Light cross-note only (not a drop-in Jev ROC). Do not dump weights. Do not merge into `examples/`. Cousin, not this sidecar.

[localjev](https://github.com/githubnext/localjev) is a thin soundness-theater cousin: wire-compatible prompted JSON probs, not logits. Evaluate calibration on your workload before consequential decisions. Not a new hook pack.

[laya](https://github.com/NandhaKishorM/laya) is an open System One head. 0.85 RLCD gate is still soft; Khmer OOD 0.000 at 95.2% confidence. Future backend, not a drop-in ROC. HF family listing [Gtrkrsk/laya](https://huggingface.co/Gtrkrsk/laya) is the same hub, not a new model.

[jev-labs](https://github.com/copyleftdev/jev-labs) wraps a probabilistic oracle in a formal consensus kernel. **Never confidently wrong.** Escalate-not-guess: under severe chaos accuracy drops but wrong=0 because the system escalates. Anti-pattern: TLA+/model-check theater as proof the soft judge is safe without an exception path. Cousin, not this sidecar.

[seal](https://github.com/Reasonofmoon/seal) is an advance gate plus a visible coverage ledger (`auto` | `code` | `human` | `escalate`). Effects stay locked while escalations remain open. **Hiding escalations is a product lie.** **schema-valid ≠ semantically correct.** **mint ≠ product brain**. Cousin, not this sidecar.

[firehose-judge](https://github.com/ragelink/firehose-judge) is typed Jev on the Bluesky firehose (Durable Object). Uncertain answers route to a "needs a human" lane; nsfw is dropped server-side. Soft judgment is never the sole veto. Cousin, not this sidecar.

[jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade) is decide → policy → LLM leftover. A Noul at 0.5 means "cannot tell" (never rounded). `injection_suspected` always force-review even with an LLM configured. Force-review is a real lane, not soundness theater. Cousin, not this sidecar.

[waymode](https://github.com/mossburgh/waymode) lets the host keep permissions, validation, and handlers; Jev decides over typed actions on the live UI with retained evidence. Jev confidence grants no permission (sensor ≠ verdict). Cousin, not this sidecar.

[skill-broker](https://github.com/adamjralph/skill-broker) Hermes skill-intervention layer. Quoted: **Stages 1–4 are built and one Consumer is live.** Quoted: Jev **never grants access.** Stages 5-6 next. Do not treat a live Consumer as Hermes enforce. Direct sibling to turnstile (evidence ≠ authority). Anti-pattern: letting System One confidence expand the allowed skill set. Cousin, not this sidecar.

[jev-lens](https://github.com/rashedInt32/jev-lens) is an advisory Claude Stop hook: it never blocks, never edits, and never says green unless sure (`JEV_LENS_GREEN` 0.9). Attention/VOI, not authority — keep it separate from skill-broker / construct-auto-classifier. Cousin, not this sidecar.

[jev-preflight](https://github.com/muse0509/jev-preflight) is a Claude Code Stop-hook: eight risk axes on a redacted turn diff; assist mode is one reinspect then finish. Fail-open. Default **0.85 threshold is uncalibrated**. escalate-attention ≠ hard block; can be gamed by ignoring the reinspect. Cousin of jev-lens; not this sidecar.

[jev-security-scan](https://github.com/win4r/jev-security-scan) is a skill/MCP supply-chain scanner: static rules then Jev; policy in code (both Nouls ≥ 0.85, window ≥ 0.6, active ≥ 0.7). **Unflagged ≠ certified safe.** Does not execute the target. Direct sibling shape (structural + Jev), different job. Cousin of is-malicious / jevscan / safe-sh. Complementary to jev-preflight and jev-carryforward 0/4. Not this sidecar.

[jev-decisions](https://github.com/bojansandhaus/jev-decisions) is a Hermes pre-tool review plugin. `JEV_ENABLE_HOOKS` opt-in; even then reviews stay advisory and do not block. **Jev review is advisory; Hermes policy remains authoritative.** A **failed review grants no permission**. Local human routing for destructive / credential / irreversible-external. Version **0.2.1** optional smart approvals from [anpicasso/hermes-jev-approvals](https://github.com/anpicasso/hermes-jev-approvals). Quoted: **It never silently approves**. Quoted: **The workflow is shadow only**. Quoted: **Installation does not select the provider, change `approvals.mode`**. Cousin of skill-broker / turnstile. Complementary to jev-preflight and jev-carryforward (hope the model looks). Not this sidecar.

[jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router) hard-gates soft scores (`jailbreak` / `prompt_injection` / `harmful` ≥ 0.70 or severity ≥ 2) on a 218-item LangGraph demo. Jev route acc **96.8%**. **Classify accuracy is not a safety proof.** Cousin, not this sidecar.

[jev-packs](https://github.com/dtduc-git/jev-packs) is an evidence-gated question-pack registry: verified only with recorded ECE/accuracy on a pinned Jev version; every Choice/Score must offer `unknown`. No numbers, no endorsement. Cousin, not this sidecar.

[ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev) is a PR-triage gate: Jev via Vercel AI Gateway asks `should_review` / `risk` / `route` / `touches_secrets`; thresholds route `auto-approve` | `human-review` | `block`. Timeout → human-review, never silent auto-approve. Eval-gaming surface: optimizing the four questions / thresholds instead of review quality. Do not hard-gate merge on a Jev auto-approve.

[how-sure-is-jev](https://github.com/adarc8/how-sure-is-jev) maps probs to sureness bands CERTAIN / CONFIDENT / LEANING / TORN / CLUELESS. Gaming risk if agents optimize the sureness metric rather than task truth. Pair with jev-ood-calibration / ECE noise floor (contrast only).

[jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas) is a jagged hold-vs-break map with API receipts. **type-safe ≠ correct.** Eval-integrity cousin, not this sidecar.

[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration) (MIT, Python, HEAD `914d87a`) measures OOD ECE vs its noise floor. **AUC ≠ ECE.** Correction (2026-09-22): **Only the refit-T column moves** (score T **1.92** at a 0.005 floor, not the reported 3.40). Pairs with does-jev-confidence-mean-anything. Not a rh-guard peer.

[prune-review](https://github.com/shubhangi013/prune-review) is a cost-aware Jev gate before generative PR review; **safety escarpment** overrides Jev. Cousin, not this sidecar.

[jev-intent-review](https://github.com/yottayoshida/jev-intent-review) is whole-repo intent vs requirements: `VERIFIED` / `VIOLATION` / `UNKNOWN`. The diff is a search hint; catches incomplete-change gaming in unchanged paths. CLI works; Action not written. Watch.

[jev-pr-review](https://github.com/ohernandezdev/jev-pr-review) scores changed files with Jev in CI. **Shadow-mode only** until calibrated; automerge path unwritten. Calibration-first before any hard merge gate. Soft judgment as sole merge authority is soundness theater.

[jev-curate](https://github.com/ThyFriendlyFox/jev-curate) is corpus curation with Jev pass/fail gates → `curated.jsonl` vs `rejected.jsonl`. Filter with Jev; train on real outcome labels. Eval-data integrity cousin.

[latch](https://github.com/CaseReed/latch) is a CI merge-gate cousin: code clusters, Jev labels, code owns `Gate: PASS` / `Gate: BLOCK`. `ignore_as_infra` needs an explicit network fingerprint; Jev cannot ignore on its own. Flaky-test gaming counter-pattern.

[jevscan](https://github.com/alexykn/jevscan) composes tree-sitter extract (hard envelope; no execute) with independent Jev questions (soft judgment). Same layering; quality lint, not reward-hack.

[agent-workflow-typesafe-ai](https://github.com/ngallodev-software/agent-workflow-typesafe-ai) is the soft-sidecar extreme: advisory `no_action` receipts; the plugin never changes host routing/executor. Missing key → no-action, not a veto.

## Hook-pattern sketch (siblings, not this pack)

Soft judgments stay fail-open by default. The hard envelope stays structural.

```
rh-guard
  structural registry ──deny──► skip Jev, opaque AGENT_DENY
                    └──rest──► Jev Nouls (fail-open / degraded if no key)
  Code fuses; soft judgment is never the sole veto.

semantic-firewall (CeamKrier/semantic-firewall)
  LLM proposes action → Jev 5 noul (goalAlignment, authorization, sideEffect,
  untrustedInstruction skip-when-absent, evidenceSufficient) → code
  ALLOW / ASK_USER / REVISE / BLOCK. Soft-semantic + code authority; not a
  substitute for structural deny.

claude-code-jev (RahulBalakavi/claude-code-jev)
  human msgs + tool + cwd → OpenRouter typesafe/jev-1.13 → allow / block / ask
  low-confidence and network fail → human. Additive PreToolUse; Anthropic
  auto-mode is not replaceable via a supported API.
  quoted 0 dangerous allowed on synthetic 18-case fixture (90 live decisions)
  quoted adds a 264 ms hop rather than removing one; 0.85 uncalibrated
  do not claim the agent is 93% faster
  do not merge their examples/claude-settings.json into examples/

gliner25-compaction (m-newhauser/gliner25-compaction)
  GLiNER2.5 Choice keep_full | keep_evidence | keep_call_only | drop
  extractive character-offset spans, not generated summaries
  uncertain / invalid → fail-closed keep_full
  hard shell/mutation policy overrides the soft model
  shadowMode default true before rewriting history
  not reward-hack detection; not this sidecar

jev-compactor (edwardyen724-g/jev-compactor)
  Jev judges relevance. Code decides structure
  regex floor under Jev; safety gating in the same compaction pass
  keep a deterministic floor under Jev; not a rh-guard peer

latch (CaseReed/latch)
  cluster failures (code) → Jev labels cause → code Gate: PASS / Gate: BLOCK
  ignore_as_infra needs env_cascade + infra fingerprint
  Jev cannot ignore on its own; flaky-test gaming counter-pattern

clear-head (VladyslavHontar/clear-head)
  Stop hook: claims vs session evidence
  CONTRADICTED / UNSUPPORTED → block; low JEV_FIRM never blocks

wakegate (shitianfang/wakegate)
  fail-open wake: skip only if Jev answers and p < 0.2
  error / no-key / unsure wake. Contrast pi-jev-approver fail-closed

omp-auto-mode (alexsatch/omp-auto-mode)
  oh-my-pi safe / ask / unsafe; classifier fail → omp approval (fail-open)

toolgate (fdemir/toolgate)
  pre-exec allow | block | review; error/timeout → stop (fail-safe)
  given → expected → actual; only given reaches Jev
  distinct from ndolinschi/toolgate

jev-reviewer (egma-ai/jev-reviewer)
  P0 expand / P1+P2 collapse attention
  attention ≠ correctness; P0 ≠ blocked as unsafe

safe-sh (EpicEric/safe-sh)
  tree-sitter bash chunks → Jev Scores; never executes
  curl | safe-sh; --warn-on / --error-on own the hard exit
  credential/exfil-shaped Scores before deny; not execution
  contrast yolo-shell exec floor and toolgate fail-safe pre-exec
  weakened-test review is typesafe_agent_gates, not here

interlock (somoore/interlock)
  canaries + closed action space; secrets never enter the agent
  Jev sensor; policy in code allow|ask|block
  anti-pattern: post-hoc "is this dangerous?" with real secrets in scope

port-cleanup (epiphany-dynamics/port-cleanup)
  human confirms irreversible stop; shields override Jev
  identity re-check before SIGTERM; app-owned copy not model prose

jev-dspy-control-plane (manikanda-kumar/jev-dspy-control-plane)
  fraud/security → human even if classifier says routine
  LLM cannot add routes/tools after control plane fixes action

cmdc-auto-mode (mja00/cmdc-auto-mode)
  Command Code beforeToolCall after host permission check
  decide() in code allow|deny|escalate; within_scope ≤ 0.25 out of scope deny
  escalate to a human never model; auto-fail-closed default true
  do not merge into examples/

omp-jev-extensions (luw2007/omp-jev-extensions)
  jev_acceptance_gate + jev_route on Oh My Pi
  Fail-open, never fail-catch; do not merge into examples/pi-extension.ts

omp-greenlight (SemetricLabs/omp-greenlight)
  graded allow, not hard deny; default 0/94 unsafe
  operator owns the risk dial; plugin never tunes its own threshold
  permission ≠ probability

construct-auto-classifier (godspede/construct-auto-classifier)
  OpenCode / agy PreToolUse; Privilege Is Not a Verdict
  structural fast path then Jev Choice + nine Nouls (data_loss, …)
  minConfidence 0.6 / riskThreshold 0.7; 0 dangerous allowed (Jev)
  operator owns the dial; do not merge into examples/

actiongate-jev (omkarghugarkar007/actiongate-jev)
  Jev supplies evidence. Code owns authority
  ALLOW | REVIEW | BLOCK; positive score never overrides a deterministic fail
  Schema-valid ≠ intent-matched
  single-use Action Grant bound to the exact tool call
  replayed / expired / mutated / unknown permits fail closed
  wrapTool ≠ hooks.json; do not merge into examples/

AgentGhost (reddpy/AgentGhost)
  npm @agentghost/sdk; ALLOW / ASK / DENY wrap around tool execution
  deterministic rules first; Jev judge; ASK/DENY throw (silently skipped)
  default failMode closed (denies when the judge errors)
  AgentGhost is the tool's execution function — model cannot opt out
  contrast actiongate wrapTool advisory; jev-use fail-open
  Jev ALLOW is still soft; do not merge into examples/

turnstile (zyphr-labs/turnstile)
  Jev never grants authority that policy denied
  deterministic policy then Jev; receipts + threshold replay
  observe-mode default; do not merge into examples/

pi-heed (Nyarlathoteppppp/pi-heed)
  persist user constraints across tool calls and compaction
  check every side-effecting call against what the user said
  Jev never writes policy; code owns the ledger and the block
  shadow default; fail-open; do not merge into examples/pi-extension.ts

pi-jev-guard (Reindeer-AI/pi-jev-guard)
  Pi edit/write content-judge vs Markdown rules
  default informative (advisory); enforce blocks
  malformed config fails closed; onUnavailable block / onUncertain warn
  violationThreshold 0.85 uncalibrated — soundness theater if treated as a hard gate
  edit/write only; shell and other agents bypass
  informative first before enforcement; do not merge into examples/

pi-jev-control (goodruizhan/pi-jev-control)
  Pi control plane, not a content-judge
  deterministic tool-gate fast path + Jev for uncertain ops
  graceful degradation; GUI unknown never force-click
  control-plane vs content-judge (pi-jev-guard / pi-heed / hermes-jev-router)

jev-use (shitianfang/jev-use)
  optional PreToolUse jev_gate; deny/ask only; fails open
  only ever tightens; install does not enable the gate
  treat confidence calibration as a training claim
  12/12 gate fixture is not a safety proof; escalate when Jev can't decide

jevex (jimmyhealer/jevex)
  MCP VOI admission: codebase_investigate; Jev ranks a shortlist
  README: jevex only answers what to read; status sufficient is not a safety proof
  fail-open vs fail-closed on Jev error is undocumented
  soft-score-as-hard-gate: shortlist as the only files that exist
  cousin of jev-sift / jev-carryforward 0/4; do not merge into examples/

commitjev (yodablocks/commitjev)
  Jev-gated commit-msg; calibrate.py before trusting thresholds
  hook blocks only on a warning; check failure is not a reason to refuse
  Noul 0.65; middle band is review, never rounded
  calibrate / shadow before a hard push block

jev-runway (IPECTER/jev-runway)
  Codex Jev proxy; LICENSE-only public tree at capture
  host-adapter cousin of slo-router / jev-routing
  do not invent authorization mechanics

pi-jev-compact (dev-willbird1936/pi-jev-compact)
  Pi session_before_compact; Jev keep/drop; survivors verbatim
  keep-windows and pins before Jev
  fail-open to built-in LLM summarizer; keepThreshold 0.5 uncalibrated
  complementary to pi-heed / carryforward 0/4
  do not merge into examples/pi-extension.ts

hermes-plugin-jev (robbyczgw-cla/hermes-plugin-jev)
  Hermes host adapter (plugin ID jev-router); mode shadow default
  cannot grant permission; approve means request a human; never allow
  missing key: plugin inactive; timeout: Jev abstains
  contrast jev-decisions (advisory) and hermes-jev-router (model-route)
  Mrmimee/hermes-plugin-jev is a tool plugin, not a hook adapter
  distinct from ajensenwaud/hermes-jev-plugin (typed decision tools)

jev-routing (nekowasabi/jev-routing)
  Go harness Claude/Codex/Grok/Cursor/Devin; not an MCP server
  drop/truncate without summarizing; Choice+Noul in parallel; tools[] → 1 schema; strip thinking
  default filter; forced only with a verified real Jev answer
  distinct from nekowasabi/jev-routing-mcp (MCP add leaves tools[])
  PreToolUse cannot strip the catalog; advisory vs hard route

classifier-dev (mrmps/classifier-dev)
  advertised backend ≠ served backend
  undeclared fallback = eval integrity failure
  ling-2.6-flash delisted; granite-4.0-h-micro served weeks at F1 0.546 vs ~0.800
  digest now marks FALLBACK; eval/bench.py before it ships
  do not hard-gate on soft confidence from an undeclared fallback

jev-gate (totally-tim/jev-gate)
  GitHub Action + local CLI + OpenCode; seven typed concern questions
  gated Nouls default 0.60; calibrate on your diffs; --no-gate escape hatch
  soft-score-as-hard-rank; calibration evidence + escape hatch before merge
  not thevibeworks/jevgate; not choxos/jev-reviewer; not egma-ai/jev-reviewer
  do not merge into examples/

claude-jev-warden (connectedGraph/claude-jev-warden)
  Claude PreToolUse Art Director; Jev 1.13; quality ≥ 80% or exit 2
  attention≠verdict / warden-as-hard-gate
  escalate taste/quality (reinspect); block only eval-asset / structural
  do not merge warden.js into examples/

jev-kit (jonathanavis96/jev-kit)
  Claude PreToolUse Airlock; code pre-filter then Jev; fail-open
  deny needs conf ≥ 0.8 and margin ≥ 0.4
  "This is not a security control" — cost/hygiene, not a safety envelope
  [airlock-ok:] override; retry loop never denies twice in 10 min
  labelled-eval 100% / A/B zero denies — not a rh-guard ROC
  Belay: anti-done-without-reading
  hard-gating soft judgment as "safety" is confidence theater
  do not merge into examples/

agent-chaperone (agent-chaperone/agent-chaperone)
  dual-gate: tool calls before run AND results before the agent reads
  shadow / enforce / strict; never auto-approves
  InjecAgent AUC 0.976 is not a safety proof
  replacement shape-mismatch discarded without complaint (silent FALLBACK)
  advertised screened ≠ served payload
  do not merge into examples/

opencode-intent-gate (hoshinodis/opencode-intent-gate)
  OpenCode context hook; four Nouls; inject system directive
  isWorkThreshold 0.5 / dimensionThreshold 0.75
  the gate is a system directive, not a hard block
  hope the model asks; confidence theater if treated as a safety veto
  do not merge into examples/

opencode-context-pruner (hoshinodis/opencode-context-pruner)
  OpenCode port of tamaratran/fast-jev-compaction via context hook
  request view only; persisted history never modified
  keepThreshold 0.15 vs upstream 0.5
  530 msgs, removedMessages 282 — not a quality claim
  evidence-erasure eval-integrity (constraints / hidden eval / injection traces)
  do not merge into examples/

yolo-shell (riz007/yolo-shell)
  ~2ms local fast-path then Jev (200ms deadline) then 40-rule floor
  no silent fail-open when Jev is down; crash still allows
  YOLO_BYPASS / yolo prefix skip the gate
  do not merge zsh/bash/fish hooks into examples/

jev-home-assistant-sentinel (bojansandhaus/jev-home-assistant-sentinel)
  Jev recommends; policy; HA acts; state readback
  Command sent ≠ state confirmed; action ≠ verified outcome
  review is shadow; unavailable ≠ success; attention ≠ verdict
  do not merge into examples/

herdr-jev (muthuishere/herdr-jev)
  openjev NLI prompt gate; owns the Herdr submit path
  Status: design. Nothing here works yet
  NLI cross-encoder ≠ TypeSafe Jev ROC; thin card
  do not merge into examples/

apa-agent-harness (AiPersonacademy/apa-agent-harness)
  rebrand of AntonioCoppe/jev-harness; src/ SHA identical
  advertised capability ≠ shipped module (trajectory)
  shadow vs live: shadow_noop / intendedAction
  confidenceThreshold 0.85 uncalibrated; fold gate/eval-integrity only
  do not merge into examples/

alsoleg89/jev-bouncer (renamed from alsoleg89/jev-guard)
  Claude PreToolUse four judges (shell / edits / MCP / Web URLs) + PostToolUse injection sentinel
  Tripwires never deny (only block auto-allow); fail-open; fail=ask never fail-to-allow
  Your rules win; Not a security boundary; on skips auto-mode classifier (use guard)
  pin jev-1.13.0; author-labelled 0/148 not a rh-guard ROC
  distinct from leepokai/jev-guard and pablozr/JevGuard
  do not merge bouncer.py into examples/

pablozr/JevGuard
  attributed turn + Jev + local gate → PASS/WARN/FAIL
  UNAVAILABLE on incomplete evidence; never a reassuring verdict
  advertised monorepo ≠ shipped packages; observe-only V0.1
  policy-integrity cousin of Abide, not reward-hack
  do not merge into examples/

ybadragon/jev-proving-ground
  synthetic verify-criteria cases; planted defect withheld
  criteria writers must not read the answer
  soundness-theater antidote; thin card
  do not merge into examples/

jevbrain (Synxneuos/jevbrain)
  local n-gram daemon; confidence ≥ 0.80 AUTO_ACT else REVIEW_QUEUE
  not TypeSafe Jev; silent-fallback if mis-calibrated
  fold attention-firewall / AUTO_ACT only
  do not merge into examples/

jev-crawlers (russfranky/jev-crawlers)
  crawl-judge then crawl-verify
  unverified lead, never a bug
  ranking signals, not calibrated bug confidence
  do not merge into examples/

typed-gate (harshpuri84/typed-gate)
  probability≠argmax; Gate ACCEPT/REVIEW in code
  declining to answer; 0.40–0.60 band is a refusal
  argmax only omitted 25; Jev+gate 0/0 (117 review)
  do not merge into examples/

pi-jev-gate (fivethirty/pi-jev-gate)
  Pi pre-exec; block if choice===block OR p(block) ≥ 0.50
  fail-open (failing open); /checker can disable
  distinct from jevgate / jev-gate / pi-jev-approver
  do not merge into examples/pi-extension.ts

jev-oas-sentinel (ShuhanSun/jev-oas-sentinel)
  documentation-only OpenAPI consumer-break sentinel
  structural first; enforce at 0.90 breaking AND promise-violation
  advisory default; fail closed in enforce
  do not merge into examples/

nanoprune (dmdjr1409/nanoprune)
  2.8MB Laya distill; cheap front gate; not TypeSafe Jev
  0.0% Hallucination Guaranteed / ECE 2.58% theater
  fold cheap-gate only
  do not merge into examples/

hermes-switchyard (bgrablin/hermes-switchyard)
  skill selection under policy; never loads the skill
  ack is not DLP / not authorization
  0.20 local / 0.80 Jev uncalibrated; hosted fail-closed without envelope
  fold skill/policy only, not CUA
  do not merge into examples/

typesafe_agent_gates (ThiagaoBR/typesafe_agent_gates)
  LangChain/Deep Agents middleware; four Nouls on execute
  one ≥ 0.5 → HELD; fail_closed=True; only {role, command}
  pattern first, judgment never looser
  SpecReview: inverted / retargeted / weakened / disabled
  27/27 and 31/31 synthetic; second layer, not a boundary
  do not merge into examples/

jev-pastepilot (buberlo/jev-pastepilot)
  paste → allowlist → preview → Confirm
  Confirm is a gate, not a formality
  Confidence is a gate, not proof; fail-opens
  fold paste/injection/confirm-gate only
  do not merge into examples/

jevcache (hyperspaceai/jevcache)
  local-first Jev decision ledger; fingerprint after redact
  cache hit ≠ correctness
  shared fingerprint bundles as calibrated truth / auto-act is trust theater
  do not merge into examples/

sutro-sh/jev-align
  GEPA loop; human accept/reject/rewind
  A higher training score never accepts a proposal automatically
  distinct from caiovicentino/jev-align; hard-gating the GEPA score is theater
  do not merge into examples/

enzyme (byenzyme/enzyme)
  compile-time Jev; catalysts as semantic routes
  when asked is compiled guidance, not an enforced hook
  do not hard-gate catalyst similarity as deny/allow
  do not merge into examples/

jevguard (seb4ez/jevguard)
  closed-world escape UNRESOLVED_OR_OTHER; AMBIGUOUS_STATE on flat margin
  distinct from alsoleg89/jev-guard / pablozr/JevGuard
  SHA-256 cache still not a correctness proof
  do not merge into examples/

jev-ci-selector (guilhem/jev-ci-selector)
  shadow default; Measure before you skip
  proposed_run vs run; do not hard-skip checks
  do not merge into examples/

tonedown (ziziphus-jujuba-zao/tonedown)
  0–4 safety grade; the engine only measures
  proves the pipeline, not the model
  do not merge into examples/

jevmod (ohernandezdev/jevmod)
  category probs + plain-English rules; fails open error_open
  sanity benchmark, not a leaderboard
  distinct from ohernandezdev/jev-pr-review
  do not merge into examples/

one-dollar-tahoe (PavitarSinghArneja/one-dollar-tahoe)
  prompt-injection eval including Real Jev API
  demonstration set, not a statistically powered benchmark
  do not merge into examples/

pi-jev-sentinel (harshwasan/pi-jev-sentinel)
  Pi + Claude/Codex; call/output/reply Jev screens
  fail-closed: never auto-allows; allow / ask / warn ladder
  secret scrub before Jev; optional task pin vs chat drift
  Prompt injection is not solved
  contrast fail-open pruners / pi-jev-gate
  do not merge into examples/pi-extension.ts

hermes-jev-skills (kerpopule/hermes-jev-skills)
  routing / memory hidden-instruction / compaction / skill / triage / action tables
  Everything fails open; Jev can only return an action id from the table
  named lexical skip, not live Jev (acknowledgements)
  Quoted skills/jev-memory/SKILL.md: Never read dropped_injection_ids
  Quoted enablement: Shadow first, and mean it
  distinct from rsdkrasen/hermes-jev-router and cdepuy/hermes-skill-router
  in-repo jevkit/ ≠ jonathanavis96/jev-kit
  fold integrity only, not CUA recipes
  do not merge into examples/

hermes-skill-router (cdepuy/hermes-skill-router)
  local Laya pre_llm_call; user-message channel (cache-safe)
  Fail-open if Laya down; Accuracy is ~good, not perfect
  inject ≠ grant (contrast switchyard never loads the skill)
  same-named xXLODXx / LLM-Architects / bkutasi / MKI13 — this card is cdepuy
  Hermes prompt-cache, not jevcache
  do not merge into examples/

dgp (numerous-com/dgp)
  typed assessment then application-side guarded commit
  assessors do not execute; application code retains control
  Quoted DGP docs/TYPESAFE_JEV.md (theirs, not TypeSafe)
  Speculative assessments cannot authorize effects; cache hit ≠ live Jev
  primary protocol fold is in Augustus; here the integrity boundary
  do not merge into examples/

typesafe-jev-gate (russleyshaw/typesafe-jev-gate)
  Hermes fail-closed tool-call policy gate; not an autonomous permission slip
  uncertain/unavailable → Hermes approval, not allow; cannot override hardline
  ambiguous → advisory pre_llm_call, not approval; metadata-only audit
  distinct from jevgate / jev-gate / hermes-plugin-jev
  cousin of hermes-jev-skills / hermes-skill-router / jev-routing
  do not dump plugin source; do not merge into examples/

omo-jevlike-router (islee23520/omo-jevlike-router)
  local jevlike OmO skill router; shrinks <available_skills>
  fail-open; recall@24 84.1%; warm ~50–70 ms; ECE ~0.10
  earlier 46.2%/95.5% was an evaluation bug
  soft router ≠ hard gate; MIT; do not dump model/weights
  do not merge into examples/

llm-vs-jev (ishaannk/llm-vs-jev)
  controlled LLM-vs-Jev guardrailing bake-off
  Nothing wins outright; jev-1.13.0 77.9% / ECE 0.053
  steerability opus 14.3% / jev 10.7%
  distinct from TeoMastro/jev-vs-llm-guardrails-intent-router
  do not invent RESULTS.md extras; do not merge into examples/

jeff (Gestalt-Lab/jeff)
  local open-weight Jev-compatible fact-check (Jeff 1)
  API compatibility does not imply identical judgments
  9,730 examples: Jeff 0.8183 / ECE 0.0807 vs Jev 0.8283 / 0.0932
  Lower ECE does not guarantee an individual prediction is correct
  light cross-note only; not a drop-in Jev ROC
  do not dump weights; do not merge into examples/

invalidate (chopratejas/invalidate)
  memory lease/invalidation; six Jev votes then policy in code
  The memory text is never edited; questions/plans/instructions change nothing
  When unsure, it asks a human; similarity top-k is never the judge
  157 cases shipped v4: 89.2% strict / 97.5% lenient / 0 false invalidations
  tuned on that set; 0/157 is not a rh-guard ROC
  a kill takes two votes; LongMemEval treatment pending
  not a memory store; cousin of jev-carryforward / jev-recall
  do not merge into examples/

hermes-jev-plugin (ajensenwaud/hermes-jev-plugin)
  Hermes tool plugin: jev_check / jev_route / jev_score / jev_evaluate
  not a PreToolUse hook; not a fail-closed permission overlay
  distinct from robbyczgw-cla/hermes-plugin-jev and Mrmimee/hermes-plugin-jev
  hope the model looks (jev-carryforward 0/4)
  p ≥ 0.70 clear-cut noul; malformed → hermes exit 0
  do not dump plugin source; do not merge into examples/

jev-lint (mizchi/jev-lint)
  semantic contract linter: name / comment / test truth
  distinct from huntedman/JevLint and wobsoriano/oxlint-plugin-jev
  candidate for a human to judge, not a verdict
  No shipped rule has severity: error
  56/65 at 1.00 on 467 labelled defects (marker-free) is not a rh-guard ROC
  jev-lint commits judges message-vs-diff (candidate class)
  do not merge into examples/

jev-recall (samdotmak/jev-recall)
  relevance, not resemblance; include/exclude not top-k
  17/18 requests / 19/20 key memories / $0.00044 / 0.35s
  18 fictional requests is not a safety deny
  distinct from jev-carryforward 0/4 and jev-gate-student-b
  do not merge into examples/

oxlint-plugin-jev (wobsoriano/oxlint-plugin-jev)
  English oxlint rules → Jev cutoffs (jev/ask)
  skip unless ci: "fail"; keep out of the editor
  distinct from huntedman/JevLint and mizchi/jev-lint
  thin card; do not merge into examples/

rspamd-jev (rioriost/rspamd-jev)
  shadow-mode only TypeSafe Jev spam eval in Rspamd
  quoted: disabled by default, no external requests, no filtering decisions
  Jev observations have zero score; do not change delivery or Bayes flags
  JEV_* registration scores and insertion weights of zero
  quoted: the individual mail scan still waits for Jev
  gloss: unchanged score ≠ unchanged latency
  agreement is not accuracy
  Confidence is not a false-positive-rate guarantee
  no automatic enforcement; gloss: no auto-reject path is provided
  pins jev-1.13.0; jev-latest and other moving aliases are rejected
  classification-as-guardrail: observation, not a hard reject
  do not merge into examples/

jev-guardrails (codebam/jev-guardrails)
  @codebam/jev-guardrails; README title dsh-jev-guardrails
  The library owns policy, not the model
  allow / review / block / support; a local decision never overrides Jev
  failMode explicit (open / review / closed)
  default 0.70 / 0.35 uncalibrated
  A guardrail is not a sandbox
  jev-latest moving alias, not a pin (contrast rspamd-jev refuses that alias)
  distinct from alsoleg89/jev-guard, pablozr/JevGuard, leepokai/jev-guard, seb4ez/jevguard
  do not merge OpenCode/Hermes/DSH installers into examples/

moongate (brickfrog/moongate)
  MoonBit semantic CI; policy from the base commit
  A verdict is a model's answer, not a proof
  Exit 0 doesn't mean the code is fine
  unevaluated rule never counts as a pass
  forks/dependabot skipped, not a fake pass
  4 counted as violation and 6 as review at 0.90/0.80
  Keep thresholds away from where a rule actually lands
  The model is pinned. Changing it invalidates your thresholds
  do not merge into examples/

jev-logtriage (jyatesdotdev/jev-logtriage)
  SRE observability sentinel; code keeps the thresholds; nothing is executed
  Low confidence never auto-acts
  auto_remediate_candidate is a label
  does not restart pods, call webhooks, or page anyone
  security never auto-remediate
  do not merge into examples/

bias-bench (natemoo-re/bias-bench)
  resume-screening fairness/calibration audit; 1,824 evaluations
  zero binary-decision name differences
  ~0.4–0.6pp mean noul; read the magnitudes, not the p-values
  not a rh-guard ROC
  do not merge into examples/

jevusher (cvsgireesh/jevusher)
  context-window admission; token VOI before expensive models
  J3/J4/J5 unsure → let it in; J1/J2 unsure → surface none; J7 unsure → flag, never pass
  J7 pass means nothing detected, never safe to obey
  outage → no lens installed, never to an empty context
  On small inputs these lenses lose money
  do not merge into examples/

jev-evaluation (willkelly/jev-evaluation)
  adversarial pre-registered Jev eval; plan before any request
  123,805 requests, 138 minutes, $12.69, five failures
  Twelve of twenty-five testable predictions held
  Confidence predicts whether an answer is right, but not whether the question could be answered
  quoted PROMPTING.md: confidence ≥ 0.95 still admits 47% unanswerable (mostly fluent nonsense)
  act when confident and escalate when not catches wrong answers and misses unanswerable inputs
  IGNORE THE QUESTION 0%; polite supervisor 65%
  distinct from ickma2311/jev-baselines-eval
  do not hard-gate confidence as fake safety
  do not merge into examples/

jev-bias-bench (Fox-Islam/jev-bias-bench)
  one-attribute-at-a-time fairness/calibration; counterfactual pairs
  FINDINGS.md 20 Sep 2026, jev-latest: 11,984 calls, 52,430 answers, 666 people, 6 anchors, 8 scenarios
  0 of 100 control comparisons significant
  Do not test it by swapping names
  Read the deltas, not the stars
  No build pinned
  distinct from natemoo-re/bias-bench
  not a rh-guard ROC
  do not merge into examples/

aurum-gate (Ormus-Solutions/aurum-gate)
  confidence-gated action router; packaged src/index.ts auto | escalate | refuse
  Probability opens the door — confidence decides
  default autoConfidence 0.85 uncalibrated
  mocked — no live API
  parallel src/gate.ts quoted: Probability is not confidence
  packaged export ≠ parallel gate.ts
  do not merge into examples/

quicksilver-judge (Ormus-Solutions/quicksilver-judge)
  staged PR/code pre-filter; packaged src/index.ts PASS | HOLD | FAIL
  sketchRisks heuristic, not live Jev
  Gloss: PASS is not a merge grant
  parallel src/stages.ts quoted: Code owns overrides — Jev Choice is advisory when hard flags fire
  minConfidence 0.7 / 0.65
  packaged heuristic ≠ live Jev
  do not merge into examples/

karat-filter (Ormus-Solutions/karat-filter)
  retrieve-then-judge RAG/search hits
  Token overlap judge — mock stand-in for a Jev Noul (no live API)
  minRelevance 0.45 / minConfidence 0.5
  inject-a-judge path exists; packaged default is not live Jev
  do not merge into examples/

gold-assay (Ormus-Solutions/gold-assay)
  UI proof assay; screenshot/OCR + DOM-as-state
  Screenshots lie until you assay them
  public assay() substring/regex GREEN | AMBER | RED; minGreen 0.75
  Gloss: GREEN ≠ verified UI
  assayQuestions is a separate Jev-shaped path, not the default
  do not merge into examples/

WaynezProg/jev-kit
  source-bound evidence + bounded batch judgments
  jev_evidence / jev_classify / jev_extract / jev_decide
  distinct from jonathanavis96/jev-kit Airlock
  Confidence is not a correctness guarantee
  No approval gate
  Exit 0 does not certify task completion or claim truth
  SECURITY.md: not an authorization boundary
  do not merge host installers into examples/

Jev-Examiner (JularDepick/Jev-Examiner)
  GitHub description: An AI content moderation workflow powered by the TypeSafe/Jev model
  empty public tree at capture (created 2026-09-20T04:30:19Z)
  later README/LICENSE-only; README advertises src/docs not present (advertised tree ≠ shipped source)
  watch; do not invent a shipped moderator
  cousin of gg-friggin-ez / jevmod / GLiGuard / tonedown
  do not merge into examples/

pi-jev-tool-guard (BubbatheVTOG/pi-jev-tool-guard)
  Pi bash / write / edit intercept; extension owns control flow
  evaluatorFailure allow (fails open); headlessRisk block
  reviewProbability 0.35 / highRiskProbability 0.7 uncalibrated
  confirmation guard, not an operating-system sandbox
  rules deterministic over Jev; disable: true bypass
  distinct from pi-jev-guard / pi-jev-gate / pi-jev-approver / pi-jev-sentinel
  do not merge into examples/pi-extension.ts

gg-friggin-ez (ItisShikhar/gg-friggin-ez)
  Node toxicity/profanity screener; isProfane / isToxic / screen()
  ALLOW / SUSPICIOUS_REVIEW / AUTO_CENSOR / AUTO_MUTE / AUTO_BAN
  review 0.3 / censor 0.55 / ban 0.7 uncalibrated
  no key → local heuristic; calls never throw
  41/42 (97.6%) not a rh-guard ROC; AUTO_BAN is not a safety proof
  fold grading/policy-in-code only, not Twitch/Valorant demos
  do not merge into examples/

jeveryword (jkrup/jeveryword)
  field extraction + PII + exact quotes; numbered tokens → verbatim spans
  text.slice(start, end) === value
  Experimental; too small to support an accuracy claim
  labels must include none; confirm p<0.8
  cannot make it produce words that are not in the source
  distinct from WaynezProg/jev-kit jev_extract; not PreToolUse
  do not merge into examples/

jevfanity-api (TickerDev/jevfanity-api)
  Cloudflare Worker POST /v1/moderate; code owns flagged
  default threshold 0.75 / level medium; jev-latest moving alias
  max across chunks (FP-heavy); missing key → 500 not lexical fallback
  flagged is a policy bit, not a safety proof
  CORS open by default; posted text leaves to TypeSafe (PII)
  distinct from gg-friggin-ez / Jev-Examiner
  do not merge into examples/

iso-jevdit (vidux/iso-jevdit)
  ISO/IEC 27001:2022 Annex A CLI; audit engine is not finished
  3 of ~36 checks; report Not yet
  not a certification / not a conformity assessment
  failOn Accepted today, acted on when the audit engine lands
  README describes violation-label mass (not confidence); not shipped until engine lands
  today only network call is verifying a key; source is sent when engine lands
  do not merge into examples/

jev-linkedin (ashafizullah/jev-linkedin)
  Chrome MV3 job↔CV fit; code computes match % from the distribution
  odds are the model's judgement, not real-world probabilities
  Treat them as an early signal, not a decision
  CV sent to /v1/systemone (PII); opportunity_signals not sent at all if unread
  distinct from bias-bench / jev-bias-bench
  not a rh-guard ROC
  do not merge into examples/

Astro-Han/jev-harness
  filter tool results before the main model sees them
  distinct from AntonioCoppe/jev-harness and apa-agent-harness and Atikpui007/jev-sift
  Filtering is a routing decision, never destruction
  Jev failures fail open; keep at p > 0.5
  25/30 not a rh-guard ROC; Pass/fail alone is not significant
  cousin of agent-chaperone / jev-routing
  do not merge into examples/

Atikpui007/jev-sift
  Claude PostToolUse relevance filter before Claude sees tool results
  distinct from kbhuw/jev-sift and Astro-Han/jev-harness
  Fails open; hide when hide >= DROP_THRESHOLD 0.5 (JEV_FILTER_DROP_THRESHOLD; quote the code)
  This is a relevance filter, not a safety block
  hidden_candidates never learned
  jev-latest moving alias
  do not merge into examples/

simonsez9510/jev-cite-check
  Korean ordinance citation-grounding experiment (not a hook)
  20/20 then 97/100; 모순 31/31; 0 false-allow of 지지
  1회 관찰이며 성능 주장이 아닙니다 (one-shot observation, not a performance claim)
  grounded < 0.5 → human review; confidence is 분포 집중도이지 정확도가 아닙니다
  TypeSafe direct key not supported; Vercel typesafe-ai/jev
  97/100 not a rh-guard ROC
  do not merge into examples/

JasonHZS/pi-jev-command-guard
  Pi bash/powershell command approval
  local CRITICAL_PATTERNS always ask
  auto-allow only allow + conf>=0.75 + ask<0.25 + deny<0.10
  ambiguity must never silently become permission
  API fail → ask; no UI → block
  do not provide a complete sandbox
  distinct from pi-jev-tool-guard / gate / approver / sentinel / guard / control
  do not merge into examples/pi-extension.ts

finrod21/jev-transaction-guard
  settlement circuit-breaker sim
  IMMUNE TO BOTH / last line of defense is soundness theater
  comparison does not show proof that Jev makes better classification choices
  mock uses labeled features in state
  0.0% FPR not a rh-guard ROC
  Choice TRIP is not a freeze
  do not merge into examples/

codebam/dsh-jev-guardrails
  dedicated DSH plugin monorepo (@codebam/jev-guardrails + @codebam/dsh-jev-guardrails)
  sibling of already-folded codebam/jev-guardrails
  The library owns policy, not the model
  A heuristic never overrides a Jev block
  A guardrail is not a sandbox
  plugin is a policy layer, not a sandbox or an authorization system
  failMode default open; 0.70/0.35 uncalibrated; jev-latest moving alias
  do not merge into examples/

metalbear-co/jev-auto-approve
  GitHub Action: approve when confidence = 1 - p(human required) >= 0.9
  does not satisfy required-approval branch protection (GITHUB_TOKEN)
  Failures are loud
  a gate, not a substitute for a human reviewer
  jev-latest moving alias; 0.9 uncalibrated
  cousin of ci-gatekeeper / jev-pr-review / jev-gate / moongate / if-ai / latch
  do not merge into examples/

emreozyoruk/hush
  issue triage that stays quiet when unsure
  Silence is the default behaviour, not the failure mode
  apply default false
  never creates / removes / overwrites human labels
  two gates: p>=0.80 AND confidence>=0.60
  spam 0.90 / needs-info 0.85 / duplicate 0.85
  will not Close, lock, delete or edit anything
  do not merge into examples/

SuchintK/jev-call-screener
  JEV classifies; it does not generate dialogue or control the call
  The defaults are deliberately fail-open
  promotional >=0.90 reject; wanted >=0.75 forward; else clarify then forward
  jev-1.13.0 pinned; FORWARD_ON_ERROR true
  do not merge into examples/

SwastikGorai/unslopify
  Chrome quality filter for AI slop / engagement bait
  It is a quality filter, not an AI-authorship detector
  Keeps uncertain or failed classifications visible
  do not merge into examples/

aryanchauhanoffical/no-hallucination
  RAG hallucination experiments incl. TypeSafe Jev quote-checking
  quote-forced string-check is The hallucination defence that worked
  Jev as guard: No effect; agreed with 8 remaining errors 0.82-1.0
  one clear win: retry triage 78.0% → 81.0%
  Recall@k is the wrong thing to optimise
  not a rh-guard ROC
  do not merge into examples/

ramasamysh/context-evaluator
  Jev semantic decision gate over PetClinic files
  INCLUDE DIRECT+HIGH+conf>=0.8; EXCLUDE NONE/LOW; else REVIEW
  experiment metrics, not proof
  do not merge into examples/

glud123/jev-assist
  rank every file by task relevance before reading
  Flags are prompts for a human look, never verdicts
  Typed output guarantees the shape of an answer, not its correctness
  Do not judge candidates you just generated
  gate exits 1; quoted recall@20 0.68 / recall@40 0.80 over 41 files on one 705-file React app
  not a rh-guard ROC
  do not merge into examples/

Nixz0824/rag-jev
  local RAG with Jev candidate rerank + answer self-check
  numbers from structured extract, not generated
  rerank gap <0.15 keeps retrieval order
  Degradation is never silent
  self-check noul<0.5 cautions 请以公告原文为准; does not rewrite
  20/20 not a rh-guard ROC; jev-latest moving alias
  do not merge into examples/

pantos12/mailverdict
  phishing-verdict MCP/REST; Jev decides, LLM explains
  Forward an email, get a calibrated phishing verdict
  explainer never changes the label
  A classifier cannot be talked out of a probability
  24 fixtures are not a benchmark; jev-latest moving alias
  distinct from mailverdict/mailverdict and jaiswalism/mailverdict
  do not merge into examples/

alexj11324/open-jev-approvals
  Codex / Claude Code binary allow/deny (codex-guardian-v1)
  The degradation model changed from fail-closed to fail-open after user review
  A deny always requires positive evidence that the action is dangerous
  There is no review_required
  0.70 uncalibrated; incomplete/no-key → allow incomplete:true
  do not merge into examples/

Ash20pk/beat-the-reviewer
  reviewer game; typed judgement rule; pinned jev-1.13.0
  Taking the reviewer offline does not count as a pass
  An unavailable reviewer is not an approval
  Holds no key and reaches no model
  on_unavailable: block; puzzle, not a production merge gate
  do not merge into examples/

7starsseeker/dsh-jev-guard
  DSH tools/pre-execute accident net; allow/revise/block/escalate
  It is an accident net, not a security boundary
  degrades loudly instead of silently
  D3 timeout fail-open; D9 402/401 l0-only
  L0 的 deny 类硬规则不受此开关影响
  distinct from codebam/dsh-jev-guardrails
  do not merge into examples/

CompleteTech-LLC-AI-Research/jev-sentinel
  multi-harness sensor/veto; backend=local mode=shadow
  This is a defense-in-depth sensor and veto layer, not a complete reference monitor
  DEFER means only no additional veto; Judgments are not grants
  provisional review/block thresholds 0.35/0.80 are policy starting points
  pin jev-1.13.0
  do not merge into examples/

heliowap/diff-risk-sentinel
  CRAP + optional Jev; It is a prioritization aid, not a bug detector
  96% accuracy / 100% bug recall are superseded
  ACCEPTABLE_LOW_RISK is a badge (Low risk. Safe to merge.), not a grant
  do not merge into examples/

wmsing/agent-firewall
  L7 :8286 plus MCP stdio; fail-closed if checks do not pass
  Layer 2 Mock without a key; Score ≥ 0.8 BLOCK
  git pull is intentionally excluded
  distinct from 0xrem / 2026hoohacks
  do not merge into examples/

acoyfellow/edit
  approval-first Pi; Nothing changes until you approve the exact request
  If the provider is unavailable, /edit stops instead of pretending that a review happened
  Four runs of one tiny task is not a benchmark
  do not merge into examples/pi-extension.ts

adamnroman/slop-filter
  hides AI-generated posts; Scores every post for how likely it is to be AI-written
  contrast unslopify quality filter, not an AI-authorship detector
  do not merge into examples/

bohutang/sift
  Substance · Humor · Chit-chat · Promo · Junk plus AI-written and Off-topic
  distinct from kbhuw / Atikpui007 jev-sift
  do not merge into examples/

ThinkyMiner/Winnow
  read now / skim / save / skip
  every word on the card is a template filled from typed answers
  80% verdict agreement / 90% content-type agreement
  The goldens are still unreviewed
  do not merge into examples/

yonsakhan/x-spam-filter-typesafe
  max(is_spam, is_gibberish) ≥ 0.85; API fail 放行不隐藏 (fail-open)
  do not merge into examples/

vynnlee/jev-mail
  Autonomous 24/7 Zero-Inbox; Apply Label, Star, Archive
  distinct from muhammedilyasy/jev-mail Read-only: it never sends, deletes, labels or archives anything
  do not merge into examples/

ordepas/system1-fraud-interceptor-demo
  Es una demo de experimentación personal, no un benchmark
  no está pensada para producción
  do not merge into examples/

hfmsio/jev-wiki-watch
  FLAG ≥ 80%; REVIEW 40% to 80%; OK below 40%
  do not merge into examples/

Umbylicus/umby-jev-stack
  544 flags; rejected 543 as false positives
  Never drop a finding; Jev only classifies
  do not merge into examples/

CompleteTech-LLC-AI-Research/jev-prune-kit
  Not a universal /prune; Not live-tested
  122 passing local tests are not 122 live harness or model tests
  88 passing local tests are not 88 live harness or model tests
  pin jev-1.13.0; jev-bus with jev-context-fabric
  do not merge into examples/

iluvblender/yolo-jev-scene-filter
  YOLO-World detects; TypeSafe Jev keep/skips boxes
  Jev only filters what YOLO already found; not hide-never-learned
  UI keep floor 0.55 uncalibrated; jev-latest; missing key raises
  do not merge into examples/

kurihada/pi-jev-permit
  bash / write / edit, not every tool
  silence is never consent; p >= 0.6 uncalibrated
  A failed judgment is never treated as approval
  no key: read-only local else blocked; degraded L1-2 pass L3 block
  do not merge into examples/pi-extension.ts

ktsu2i/jevgate-action
  advertised Action; README title only; no action.yml
  advertised Action ≠ shipped workflow
  distinct thevibeworks/jevgate and totally-tim/jev-gate
  watch; do not invent mechanics
  do not merge into examples/

boldbug1/jev-triage
  Go CLI; Distinct ThyFriendlyFox/jev-triage
  Choice/Score 0-3/Noul frustrated; -threshold 0.8 uncalibrated; jev-latest; keep other
  vendor 193.6x/444.6x: test on own data
  do not merge into examples/

rubenhassid1/contact-cleaner
  Google Other contacts Keep/Review/Remove
  Buckets are code, not the model; Deterministic first
  KIND_CONFIDENCE_FLOOR 0.5 uncalibrated; jev-latest; PII name+email
  distinct ashafizullah/jev-linkedin
  do not merge into examples/

javimp2003/claude-code-jev-guardrails
  Claude thinks. Jev reacts. Code decides.
  Math.max floors never overridden; fail-open judgment; fail-closed hard cases
  no-key / JEV_MODE=mock named degraded backend (mock can still BLOCK); REFLEX_MODE=shadow; Treat this as a working prototype, not a hardened production guardrail
  advertised ASK_USER ≠ engine emit
  distinct RahulBalakavi/claude-code-jev and codebam/jev-guardrails
  do not merge .claude/settings.json into examples/

vrazraz/jev-voice-gate
  OpenJev NLI, not TypeSafe Jev
  Это не гарантированная замена wake word
  текст после распознавания; 0.40/0.22 не калиброванные вероятности
  after accept без инструментов; Не включайте --yolo
  distinct herdr-jev
  do not merge into examples/

pksorensen/alp-pr-review
  Review → Jev-routing → squash-merge or Godkend merge portal
  Den får aldrig PR-titel, -beskrivelse eller diff
  ikke kan tale sig selv til automerge; lukker sikkert
  Ikke en erstatning for branch protection
  tærsklerne er ikke tunede (0.25 / 2 / 0.6)
  distinct ohernandezdev/jev-pr-review and metalbear-co/jev-auto-approve
  do not merge into examples/

arashari/youtube-judol-userscript-jev
  Tampermonkey judol via classifier.dev jev; no API key
  confidenceThreshold 0.6 uncalibrated unsure; discussing gambling ≠ promotion
  distinct rspamd-jev / jevmod / x-spam-filter-typesafe
  do not merge into examples/

silky-x0/Postmark
  tone/virality/cringe; code stamps 0.6 / 2.2
  advertised description ≠ shipped UI (LinkedIn vs social draft)
  jev-latest; missing key → 500
  distinct ashafizullah/jev-linkedin
  do not merge into examples/

thecoderpanda/shipit-gate
  Jev deploy/ship gate before push; blockOn 0.5 / 0.7 / critical
  Does this replace my CI? No
  Rejects fail closed (exit code 2)
  --force / git push --no-verify; demo mocked
  soft-score-as-hard-ship; do not merge pre-push into examples/

uberto/jev-brig
  Claude PreToolUse Bash AST allow/ask/deny; NOT TypeSafe Jev
  jev-brig is a guardrail, not a boundary
  no allow rules → silent; unparsable → ask — never a silent allow
  auto_approve off = silence; yolo = no opinion; git hooks are the floor
  do not merge into examples/

knowlet/JevGuard-NSFA
  develop; .gitignore only; description null; size 0
  advertised Guard ≠ shipped source
  distinct alsoleg89 / pablozr / leepokai / seb4ez / codebam JevGuard family
  watch; do not invent mechanics
  do not merge into examples/

RavenRepo/jevengineeringgate
  L0 deterministic then L1–L4 Jev; The gate never says yes
  0/26 wrong 25/26 primary 0 unsafe min margin 0.025
  Is this a security boundary? No; advisory never authorization
  fail-open non-alarming; ask destructive; JEV_HOOKS_DISABLE=1
  distinct thevibeworks/jevgate / totally-tim/jev-gate / ktsu2i/jevgate-action
  26-case fit not a rh-guard ROC
  do not merge hooks into examples/

stardeckai/lgtm
  tests that pass but prove nothing; advisory default exit 0
  --fail later; holdout precision 1.00 not a rh-guard ROC
  weakened-test cousin of typesafe_agent_gates SpecReview
  do not merge /lgtm skills into examples/

MertBasar0/openclaw-tool-prefilter
  before_prompt_build catalog shrink; thresholdAnyTool 0.35 / 500ms
  Bulletproof Fail-Open Safety; Zero Hallucination theater
  catalog shrink ≠ deny
  do not merge into examples/

Z761293629/pi-jev-helm
  Pi model router; fail-open to Baseline; confidenceThreshold 0.75; 2500 ms
  Safety Gate and Verifier are separate, uncommitted exploration directions
  v0.2.0 preview; routing ≠ permission
  distinct other pi-jev-*
  do not merge into examples/pi-extension.ts

snesmaeili/jev-claude-controller
  Python owns the loop; Jev candidate id never a command
  no function in the safety layer accepts a model signal
  The thresholds are uncalibrated; not a Claude plugin
  do not merge into examples/

logicrw/ask-jev
  fail-open advisory CLI 280ms; choose/check/purify
  never use a verdict to grant permissions
  dual >= 0.85; HARNESS_JEV_ALLOW_REMOTE; 146 mocked tests; GPL-3.0
  do not merge into examples/

dev-hari-prasad/switchboard
  Cost-aware LLM router on Cloudflare Workers & D1 with TypeSafe Jev classification
  empty public tree (409); advertised router ≠ shipped source
  distinct hermes-switchyard; watch; do not invent mechanics
  do not merge into examples/

durganani60/fastrisk-jev
  Gradio OpenRouter typesafe/jev-1.13; code 0.80 BLOCK / 0.35 STEP-UP else APPROVED
  0% Type Errors / Calibrated Probabilities theater
  UI halt ≠ freeze; last-6 of key in markdown
  do not merge into examples/

hamidfarmani/jev-resume-match
  Job Match; code combines Jev; pin jev-1.13.0
  not a hiring prediction; resume sent to TypeSafe
  demo cookie not a reliable public spending limit
  distinct jev-linkedin / yueli / bias-bench
  do not merge into examples/

fatelei/yueli
  batch resume classifier; 仅供参考，不构成招聘决策依据
  jev-latest; PII to api.typesafe.ai
  distinct jev-resume-match / jev-linkedin
  do not merge into examples/

ismailakdag/typesafe-jev
  sahibinden listing filter; Kararı yine kod verir
  Yargılar karar desteğidir, karar değil; Jev metin üretmez
  distinct TypeSafe product / russleyshaw/typesafe-jev-gate
  do not merge into examples/

TennousuAthena/Mailbox-Boy-With-Jev
  empty public tree (409); description null; size 0
  advertised mailbox ≠ shipped source
  distinct vynnlee/muhammedilyasy jev-mail / mailverdict
  watch; do not invent mechanics
  do not merge into examples/

lgy1027/jevshield
  TypeSafe Jev decorator / LangChain wrap; Sub-100ms marketing
  Dual-Validation Matrix; 0.75 noul as hard halt is theater
  heuristic not a security boundary; Distinct jev-brig (Not TypeSafe Jev)
  do not merge into examples/

DevMortimer/pi-warden
  Pi Action/Rules/Slop/Stuck/Done-check/Security/Runaway/Subagent
  advisory, not a sandbox; failOpen true; 0.5 warn / 0.7 hold
  13,952 / 109 project-maintained, not a rh-guard ROC
  do not merge into examples/pi-extension.ts

jasonli0226/jev-demo-triage
  mock incident-triage; gate fails closed if Jev errors
  Jev did not beat baseline; N is 3 per cell
  Distinct ThyFriendlyFox/boldbug1 jev-triage / jev-logtriage
  do not merge into examples/

manutej/volumetric-intelligence
  Jev is the typed gate, never the runtime
  Fail closed. Compose only on GREEN; walk is rehearsal
  0.72/0.5/7 uncalibrated as a ship grant is theater
  do not merge into examples/

miniLV/Jev-Auto-Router
  Policy Guard ALLOW(plan) or DENY(reason)
  No evidence means no production delegation
  automatic delegation off by default (UNVERIFIED)
  do not merge into examples/

replynodes/jev-web-analyzer
  developer demo, not SEO score / AI detector
  website untrusted state; no mocked provider
  not a PreToolUse gate
  do not merge into examples/

rmax-ai/ai-provider-triage-comparison
  three arms, five tickets; not a controlled benchmark
  unanimous 2/5; not a general model ranking
  Distinct llm-vs-jev / jev-demo-triage
  do not merge into examples/

sysadarsh/zerosweep
  Next.js email triage; CONFIDENCE_SAFETY_THRESHOLD 0.85
  confidence < 0.85 → human_review; phishing / safeToTrashProb ≥ 0.85 → trash_quarantine
  Zero Format Errors is schema theater, not a safety proof
  not PreToolUse; distinct jev-mail / mailverdict / jevmod
  0.85 auto-trash is not a safety envelope; not a rh-guard ROC
  do not merge into examples/

0xNatoshi/jev-codex-router
  per-turn Codex routing; Fail-open; Kill switch
  0.5 → Sol not frontier; BACKTEST −59.9% on 237 turns
  cache invalidation not modelled; routing ≠ permission
  distinct miniLV/Jev-Auto-Router / jev-model-router / jev-routing
  −59.9% is not a rh-guard ROC; 0.5 is not a safety envelope
  do not merge into examples/

y0usaf/pi-jev
  @y0usaf/pi-jev; Shadow mode is the default
  The gate fails open by design
  0.90 / 0.70 / 0.85 / 2.50; output judge never blocks
  smoke calibration not enough to switch the gate to enforce
  distinct fivethirty/pi-jev-gate / Reindeer-AI/pi-jev-guard / pi-jev-sentinel
  do not merge into examples/pi-extension.ts

fsmiamoto/pi-jev-prune
  dry default; Fails open; ephemeral stubs
  threshold 0.25; 1 of 28 below 0.15
  code rule (read superseded by later read/edit) does useful prune
  prune ≠ deny; 0.25 is not a safety deny
  distinct pi-jev-compact / opencode-context-pruner / nanoprune / jev-prune-kit
  do not merge into examples/pi-extension.ts

raniellimontagna/jev-guard-mcp
  experimental browser MCP; pin jev-1.13.0; min 0.80
  Possession of a preview token is the technical authorization to execute; the server cannot independently attest human approval
  not a general-purpose browser agent
  0.80 is not a safety envelope; distinct leepokai/jev-guard
  do not merge into examples/

reallygood83/jev-router
  TypeSafe role routing; Jev does not pick model ids. It picks a role. Failures pass through
  error-pass; confidence_floor 0.6
  Fixture numbers in artifacts/ test the evaluator. They are not a live quality claim
  distinct justinhsu1477/jev-router / hermes-plugin-jev plugin ID jev-router
  0.6 is not a safety envelope; routing ≠ permission
  do not merge into examples/

philippdubach/pi-jev-router
  Pi OpenRouter router; /router shadow recommend only default
  Jev output is evidence, not truth
  89%/88% cheaper not a rh-guard ROC
  distinct rizafahmi/pi-jev-task-router (owns the model while on)
  do not merge into examples/pi-extension.ts

YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian
  dual-spectrum phishing; Safe 0-20 / Suspicious 21-60 / Malicious 61-100
  missing key throws; no named lexical fallback
  Section 4: Counter-Measures are exemplary and decoupled from individual verdicts
  Malicious 61-100 is not a safety envelope; not a rh-guard ROC
  do not merge into examples/

bornakapusta/slop-guard
  code identifies what to inspect, Jev judges it, and explicit rules decide what to report
  severity always advisory; the reviewer never blocks
  Review completed (concerns may be present)
  advisory exit 0 is not a merge grant; distinct jev-brig Not-TypeSafe
  do not merge into examples/

sudeshkar/jev-corrective-rag
  Jev decision gates | Stubbed — no API key yet
  NOT a simulation of Jev's quality; 300 ms; prints PARTIAL
  VERIFY_CONF_FLOOR 0.60; RELEVANCE_CONF_FLOOR 0.50
  stubbed 4.0× / 7.2× is not a rh-guard ROC; 0.60 AUTO_ANSWER is not a safety envelope
  do not merge into examples/

Patrick-SCH03/jev-issue-radar
  It never closes issues, adds labels, or posts comments
  2/4 not a rh-guard ROC
  0.8 is not a calibrated accuracy guarantee
  2/4 or 0.8 is not a close-issue grant
  do not merge into examples/

MaxIvanyshen/jev-review
  It never approves or rejects anything
  needs_review/security_concern p ≥ 0.5 or risk.score ≥ 2
  couldn't triage, not diff is clean
  distinct NiazMorshed2007/jev-review; 0.5 / risk≥2 is not a merge grant
  do not merge into examples/

NiazMorshed2007/jcr
  Jev Capability Resolver; MCP resolve_capabilities; Claude/Codex harnesses
  JCR returns documentation. It does not execute commands
  harnesses stop at explaining the steps
  beam 0.6 / width 3 / maxDepth 16; ambiguous / no-match / depth-limit are not merge grants
  routing ≠ permission; treating capability context as attested approval to run is theater
  80-run 85%/23% not a rh-guard ROC; jev-latest moving alias
  distinct raniellimontagna/jev-guard-mcp / reallygood83/jev-router / NiazMorshed2007/jev-review
  do not merge into examples/

HexyeDEV/JevPR
  GitHub App; typesafe-sdk>=0.7.0; Nouls + Score 0–9; composite 0.45/0.35/0.20
  LOW if score < 3.5; YAML LOW: action: approve → GitHub APPROVE
  Jev is an AI model, and can make mistakes
  payload["files"] is not the standard GitHub PR event files list
  LOW auto-APPROVE is not a merge grant; hard-gating soft judgment / shipit-gate theater
  distinct ohernandezdev/jev-pr-review / metalbear-co/jev-auto-approve / MaxIvanyshen/jev-review
  do not merge into examples/

aesgalexis/model-switch
  Codex local model/reasoning router; observe default; fail open
  minConfidence 0.65; luna/terra/sol; Astra excluded; no key → passthrough
  routing ≠ permission; 0.65 route is not a safety envelope
  distinct Mandrilsquad1441/jev-model-router / 0xNatoshi/jev-codex-router / miniLV/Jev-Auto-Router
  do not merge into examples/

gvkhosla/typesafe-pi
  consent-gated typesafe_judge; disabled by default; /typesafe enable
  Results are model judgments—not proof or authorization
  never as permission to perform an action
  fold consent/gate only; skip workflow skill
  distinct DevMortimer/pi-typesafe / twilwa/pi-typesafe / nardinmarcus/pi-jev-typesafe
  pfuller/Typesafe-Pi is a 2011 Scala tutorial, not TypeSafe Jev
  do not merge into examples/pi-extension.ts

jakenbear/the-jev-enator
  danger gate PreToolUse enforcing; failure notice PostToolUse inject; completion check Stop log-only
  all three fail open; The completion check does not block anything by default
  jev-latest moving alias; 0.80/0.90 uncalibrated
  23/23, 19/19, 12 fixtures not a rh-guard ROC
  enforcing uncalibrated floors is hard-gating soft judgment / safety theater
  distinct thevibeworks/jevgate / totally-tim/jev-gate / claude-code-jev / jev-kit / jev-bouncer
  do not merge into examples/

sohryuu101/jev-vault-gate
  noul gate + topic Choice; verbatim capture; never blocks
  Nothing is ever deleted automatically
  threshold 0.6; jev-latest moving alias
  plugin.json 0.3.0 ≠ package.json 0.1.0
  0.6 capture is not a safety grant; safe_to_delete is not auto-delete
  distinct Dharundp6/jev-carryforward / samdotmak/jev-recall / chopratejas/invalidate
  do not merge into examples/

HorusJiang/dsh-jev-tools
  prune/screen/suggest + jev_ask/jev_gate; ranks, never thresholds
  deterministic floors; fail-open except jev_gate escalate
  no key inert; jev-latest moving alias
  8/8 CJK smoke not a rh-guard ROC; shadow prune
  distinct tr1v3r/dsh-jev / codebam/dsh-jev-guardrails / 7starsseeker/dsh-jev-guard
  do not merge into examples/

YuyaForest/JEV-Prompt-Injection-Guardian
  BLOCK/QUARANTINE/INSPECT/MONITOR/ALLOW; 80%+ BLOCK
  Jev then Gemini then heuristic; score clamped to Choice
  heuristic fallback is not live Jev
  distinct YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian
  BLOCK 80% is not a safety envelope
  do not merge into examples/

bhaskarpraveen/jev-healthcare-support-router
  Jev decides, TypeScript acts
  urgency >= 0.8 / confidence < 0.7 human
  does not make medical diagnoses
  0.8/0.7 is not clinical authority
  do not merge into examples/

dillera/prMonster
  FujiNet PR triage; deterministic gates then Jev
  READY/NEEDS REVIEW/BLOCKED
  It never touches a pull request on its own
  Merging is never offered
  CONFIRM+name; ALLOW_GITHUB_WRITES default off
  reviewer_directed_text 0.7 hard block; mock without key
  confidenceFloor 0.5; probabilities not facts
  distinct HexyeDEV/JevPR / ohernandezdev/jev-pr-review / MaxIvanyshen/jev-review
  do not merge into examples/

tr1v3r/dsh-jev
  core degrade-never-throws; MCP jev_choice/score/noul
  router shadow default; never registers routes
  degrade keeps default; effort plugin
  name: not path:; 35/35 mocked; fake-key 403 degrade
  distinct HorusJiang/dsh-jev-tools / codebam / 7starsseeker
  do not merge into examples/

keeltrace/hermes-jev
  async nervous system; gate_mode default off
  selective; min_confidence 0.80
  enforce → human not silent allow
  Do not treat a Jev probability as proof of correctness
  catalog 0.2.1.2 ≠ dev 0.2.2.dev4
  live $0.000095088 / 419.276 ms theirs, not a rh-guard ROC
  distinct hermes-plugin-jev / hermes-jev-router / hermes-jev-skills / typesafe-jev-gate / hermes-jev-plugin
  do not merge into examples/

win4r/pi-jev-router
  task-boundary Pi router; shadow default; exact hashes
  pin jev-1.13.0; 15/16 not a rh-guard ROC
  production quality not established
  auto holds when no model; shadow reports
  routing ≠ permission
  distinct philippdubach/pi-jev-router / rizafahmi / pi-jev-helm / pi-jev-control
  do not merge into examples/pi-extension.ts

hraness/sys1
  System One gateway; hosted Jev disabled by default
  Qwen 32/72 and 44/72 theirs, not a Jev ROC
  do not reuse Jev thresholds for GGUF
  local-only not authentication; wire-compatible ≠ identical
  cousin localjev / laya / openjev
  do not merge into examples/

matchstick-trading/jev-regime-gate
  research, not investment advice
  viable < 0.4 / changeLikely > 0.6 stand_down
  confidenceThreshold 0.60 / halfSizeThreshold 0.45 application policy
  0.4/0.6 is not investment advice
  do not merge into examples/

nyattoh/model-effort-router
  no benchmark claims; TypeSafe unofficial
  dry-run without key; fail closed
  0.5 dispatch is not accuracy
  selects a plan; does not execute
  distinct Mandrilsquad1441/jev-model-router
  do not merge into examples/

ArronHC/windows2text
  UIA tree, not OCR; MCP windows_list/observe/snapshot/decide/act/step/run
  confirm/escalate/abort never auto-exec; windows_step act=false default
  Jevbridge visible/targets shape; distinct tacticocc/Jevbridge
  do not merge into examples/

JohnsonRan/pi-jev
  Claude-style auto-mode classifier; not a sandbox; permission aid, not a security boundary
  no key → mutating tools ask; 0.30 ask / 0.85 deny; beyond_request never denies
  3/10 → 0/10 not a rh-guard ROC
  distinct y0usaf/pi-jev / fivethirty/pi-jev-gate
  do not merge into examples/pi-extension.ts

PavelLizunov/jev-sentinel
  Rust infra watchdog, not a coding-agent hook
  schema validity is not a correct diagnosis; self-healing logs only
  require_confirmation is not an implemented approval workflow
  95.0%/0.12 not a measurement
  distinct CompleteTech-LLC-AI-Research/jev-sentinel
  do not merge into examples/

VirtualMachinist/omapi-overlay
  Nix overlay; no omp source tree; not an omp fork
  JEV_MODE=shadow never blocks; JEV_BYPASS=1 skips router
  empty findings are not approval
  distinct omp-auto-mode / omp-jev-extensions
  do not merge into examples/pi-extension.ts

abh2050/jev-test-confidence-gate
  24 invented tickets; theirs 163ms / 87.5% / $0.06
  gate caught 0 of 3; confidence separation -0.010
  untested at adequate power, not refuted; not a rh-guard ROC
  distinct jasonli0226/jev-demo-triage
  do not merge into examples/

michelbrigante46-art/Twitter-keyword-shield
  local 0ms then Jev; default 0.5 uncalibrated
  sub-100ms not a rh-guard ROC
  distinct yonsakhan/x-spam-filter-typesafe / bohutang/sift
  do not merge into examples/

morre95/Laya-GuardRails-Harness
  Rules → Laya → Policy → Frontier/Human → Execution
  BLOCK from rules or policy, never a Laya label
  default shadow; low confidence escalates, never allows
  distinct NandhaKishorM/laya
  do not merge into examples/

anpicasso/hermes-jev-approvals
  Hermes smart-approval reviewer; approvals only; not a sandbox
  theirs 9.8x / 4.2x on 156 real commands; independent 1.24x
  regex-flags-only; policy in code; not a universal speedup
  distinct rsdkrasen/hermes-jev-router
  do not merge into examples/

SouthernCrossAI/scx-router
  GLiClass model router scx-admin/scx-router-v0.1; threshold 0.5
  not TypeSafe Jev; 0.5 is not a Jev gate
  do not merge into examples/

BlinkWrite/pii-masker
  on-device reversible PII; GLiNER ONNX INT8
  fail-closed; never returns the input unchanged as a fallback
  fail-closed is not complete recall
  distinct BuilderChat/PII-Redactor
  do not merge into examples/

BuilderChat/PII-Redactor
  REST redact/rehydrate; default fail-closed
  SLM PII_REDACTOR_USE_GLINER=false / PII_REDACTOR_USE_PRESIDIO=false
  shadow fail-open; Presidio+GLiNER+Ollama is the full-detector line, not the slm default
  distinct BlinkWrite/pii-masker
  do not merge into examples/

Harshal-Ug/guardrails-demo
  LangChain AgentMiddleware PII mask/restore
  theirs ~180 ms; not a rh-guard ROC
  distinct morre95/Laya-GuardRails-Harness
  do not merge into examples/

lsu-ub-uu/systemone-gatekeeper-war
  Uppsala Cora WAR se.uu.ub.cora; name collision only
  not TypeSafe System One; distinct hraness/sys1
  do not merge into examples/

raitoxlol/hermes-slash-router
  stored routes are never applied automatically
  >= 0.85; no key fails closed; routing != permission
  distinct rsdkrasen/hermes-jev-router
  do not merge into examples/

tristan-kkim/airlock
  local egress privacy airlock; model never says this is fine
  fails closed; theirs 7.5% ± 0.6 not held-out
  distinct jonathanavis96/jev-kit Airlock
  do not merge into examples/

david-cermak/jevlike-esp32
  ESP32 jevlike demo; not a production model; not TypeSafe Jev
  distinct islee23520/omo-jevlike-router
  do not merge into examples/

saibimajdi/typesafeai-dotnet-sdk
  community .NET System One client; not affiliated with TypeSafe AI
  thresholds belong in caller code
  do not merge into examples/

RiskAverseTech/toolgate
  Claude PreToolUse + MCP proxy; static rules first; not a sandbox
  allow is advisory; policy only ~/.toolgate; distinct fdemir/toolgate
  theirs 20/20 and 19/20 not a rh-guard ROC
  do not merge into examples/

tylerjharden/ailerix
  Jev classifies task families only; ailerix/auto is not a permission
  distinct slo-router / jev-model-router / reallygood83/jev-router
  do not merge into examples/

Bnymn1306/jev-github-quality-gate
  Q-GATE auto_approved / needs_review / blocked; shadow mode
  auto_approved is not a merge grant; heuristic fallback
  distinct totally-tim/jev-gate / HexyeDEV/JevPR
  do not merge into examples/

JkRheezy/win-cu-router
  Windows Jev-first computer-use; planner cannot increase permissions
  HTTP bridge is not an operating-system sandbox; theirs E01-E05
  distinct ArronHC/windows2text / tacticocc/Jevbridge
  do not merge into examples/

boriscardano/herdr-jev-router
  mandatory agent.spawn routing; enforcement claims unproven
  fail closed; caller still cannot choose one
  distinct muthuishere/herdr-jev
  do not merge into examples/

colinmcdermott/grok-jev-router
  router is advice; Auto-review rules are the boundary
  instruction-following, not enforcement; shadow first
  do not merge into examples/

copyleftdev/braess-router
  Jev handler + Poise endpoint; alpha loopback only
  independent of TypeSafe; no workload accuracy guarantee
  do not merge into examples/

gowtham980/jev-router
  OpenClaw plugin; NOT a universal automatic model-and-thinking switcher
  classifier failures retain the current model
  distinct reallygood83/jev-router / justinhsu1477/jev-router
  do not merge into examples/

Jhiynn/PrivaParse
  local PII + OpenAI-compatible gateway; nothing leaves the machine
  theirs PERSON F1 0.964; LICENSE_NUMBER/ROUTING_NUMBER 0.000 recall
  not a rh-guard ROC
  do not merge into examples/

anonde-io/anonde
  local-first Go PII; no outbound HuggingFace at request time
  reveal gated by actor+purpose; theirs 29-corpus leak_rate not a ROC
  do not merge into examples/

localjev (githubnext/localjev)
  wire-compatible POST /v1/systemone; prompted JSON probs, not logits
  evaluate calibration on your workload before consequential decisions
  thin soundness-theater cousin; not a new hook pack

laya (NandhaKishorM/laya)
  open System One head; 0.85 RLCD gate is still soft
  Khmer OOD 0.000 at 95.2% confidence; confidence gives no OOD warning
  future backend, not a drop-in ROC

jev-labs (copyleftdev/jev-labs)
  Never confidently wrong; escalate-not-guess
  severe chaos: accuracy drops, wrong=0 because the system escalates
  anti-pattern: TLA+ theater without an exception path

seal (Reasonofmoon/seal)
  advance gate + coverage ledger auto|code|human|escalate
  Hiding escalations is a product lie
  schema-valid ≠ semantically correct; mint ≠ product brain

slo-router (zeeshan8281/slo-router)
  Jev on routing hot path; fail-open local features
  77.93 → 490.38 ms p95 (~6.3×); same routes/accuracy
  exactness never overrides context/capability; 503 if infeasible
  not a rh-guard peer

firehose-judge (ragelink/firehose-judge)
  Bluesky firehose; Durable Object; uncertain → "needs a human"
  nsfw dropped server-side

jav-email-cascade (skiingfalcon/jav-email-cascade)
  decide → policy → LLM leftover
  Noul 0.5 cannot tell, never rounded
  injection_suspected force-review

waymode (mossburgh/waymode)
  host keeps permissions/validation; typed actions + retained evidence
  Jev confidence grants no permission (sensor ≠ verdict)

skill-broker (adamjralph/skill-broker)
  Stages 1-4 built; one Consumer live; Jev never grants access
  Stages 5-6 next; do not treat a live Consumer as Hermes enforce
  Jev relevance ≠ authority; sibling to turnstile (evidence ≠ authority)
  anti-pattern: System One confidence expanding the allowed skill set

jev-lens (rashedInt32/jev-lens)
  advisory Stop hook; never blocks; never says green unless sure
  attention/VOI, not authority (pair skill-broker / construct)

jev-preflight (muse0509/jev-preflight)
  Claude Stop-hook; eight risk axes; assist = one reinspect
  0.85 threshold is uncalibrated; fail-open
  escalate-attention ≠ hard block; can be gamed by ignoring the reinspect

jev-security-scan (win4r/jev-security-scan)
  static checks + Jev on skills/MCP; does not execute the target
  high finding: both Nouls ≥ 0.85, window ≥ 0.6, active ≥ 0.7
  Unflagged ≠ certified safe; two same-model passes ≠ independent verification
  complementary to jev-preflight / jev-carryforward 0/4

jev-decisions (bojansandhaus/jev-decisions)
  Hermes pre_tool_call reviews; JEV_ENABLE_HOOKS opt-in
  advisory; do not block; failed review grants no permission
  Jev review is advisory; Hermes policy remains authoritative
  local gateway: destructive/credential/irreversible-external → human
  0.2.1 It never silently approves; The workflow is shadow only
  Installation does not select the provider, change approvals.mode
  anpicasso/hermes-jev-approvals

jev-vs-llm-guardrails-intent-router (TeoMastro/jev-vs-llm-guardrails-intent-router)
  LangGraph Jev vs LLM guardrails/intent; 218-item fixture
  block if jailbreak/PI/harmful ≥ 0.70 or severity ≥ 2
  96.8% route acc; classify accuracy is not a safety proof

jev-packs (dtduc-git/jev-packs)
  evidence-gated packs; verified only with recorded ECE/accuracy
  mandatory unknown abstention; no numbers, no endorsement

ci-gatekeeper-bot-jev (NemanjaManic/ci-gatekeeper-bot-jev)
  Jev via Vercel AI Gateway; should_review / risk / route / touches_secrets
  auto-approve | human-review | block; timeout → human-review
  eval-gaming surface: optimizing the four questions / thresholds
  do not hard-gate merge on Jev auto-approve

jev-pr-review (ohernandezdev/jev-pr-review)
  per-file Jev scores in CI; shadow-mode only until calibrated
  automerge path unwritten; mode: enforce fails loudly
  hard path gates before scores; max aggregation never average
  calibration-first before any automerge; soundness theater if sole merge authority

how-sure-is-jev (adarc8/how-sure-is-jev)
  sureness bands CERTAIN / CONFIDENT / LEANING / TORN / CLUELESS
  gaming the sureness metric ≠ task truth; pair ood ECE noise floor

jev-capability-atlas (Zaious/jev-capability-atlas)
  jagged hold-vs-break; type-safe ≠ correct; receipts first

jev-ood-calibration (scienthoon/jev-ood-calibration)
  OOD ECE vs noise floor; AUC ≠ ECE; do not threshold as a probability

prune-review (shubhangi013/prune-review)
  cost-aware Jev gate before generative PR review; safety escarpment

jev-intent-review (yottayoshida/jev-intent-review)
  whole-repo intent vs requirements; VERIFIED | VIOLATION | UNKNOWN
  diff is a search hint; incomplete-change gaming in unchanged paths
  CLI works; GitHub Action not written; UNKNOWN over false VERIFIED

jev-curate (ThyFriendlyFox/jev-curate)
  Jev pass/fail gates on every training example
  curated.jsonl vs rejected.jsonl; eval-data integrity
  Filter with Jev. Train on real outcome labels.

jev-carryforward (Dharundp6/jev-carryforward)
  verbatim ledger; nothing summarised, nothing deleted
  no key → whole list (fail-open); cousin to extractive compaction
  0/4 recall on force-push prohibition; hope the model looks
```

Do not merge those hooks into `examples/`. [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is adjacent model+effort routing, not a rh-guard peer. [slo-router](https://github.com/zeeshan8281/slo-router) is the latency/fallback cousin of that routing surface: Jev on the hot path preserved accuracy but raised p95 from 77.93 ms to 490.38 ms; fail-open local features; exactness never overrides context/capability.

## Fail-open vs fail-closed

| Channel | If the scorer is down |
|---|---|
| Claude HTTP hook | Fail-open (non-2xx / timeout does not block) |
| Claude command PreToolUse (`hooks/run.ts` or `hooks/claude-hook.sh`) | Fail-closed (deny JSON, exit 2) |
| Cursor `failClosed: true` on shell/tool | Fail-closed |
| Cursor `beforeSubmitPrompt` | Cannot inject context; gameable prompts get a user notice |
| Exo `ToolRuntime` wrap | Wrapper fail-closed: return a tool error with `AGENT_DENY`. Host has no `failClosed` flag. Not drop-in hooks; no native `hooks.json` |
| Codex PreToolUse command | Fail-closed only if stdout is Codex-safe deny JSON (no `continue: false`) + exit 2 |
| Grok PreToolUse | Host fail-open on crash/timeout; `hooks/grok-hook.sh` fail-closed |
| Pi / Prime / Amp plugins | Fail-closed in the copy (block / reject-and-continue) if fetch throws |
| dsh | Generic stdin (`hooks/run.ts dsh` / `generic`); Claude/Codex command-hook bridges also work; HTTP skipped |

A wrapper that never runs (killed, not installed) is fail-open. Keep a
separate capability boundary for hidden tests and graders.

## TOCTOU

A Noul is a score at hook time, not a lock. Do not authorize a mutate because
an earlier prompt-stage Noul was soft. Deny on the mutating event with fresh
structural checks. Soft semantic scores may steer; they do not replace an
atomic policy on the write. [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev)
binds a **single-use Action Grant** to the exact tool call and consumes it
once; replayed, expired, mutated, and unknown permits fail closed. A Noul is
not a permit. [AgentGhost](https://github.com/reddpy/AgentGhost) wraps
execution so the model cannot opt out (`guard()` *is* the tool's execution
function); ASK/DENY throw; default `failMode` closed. Contrast actiongate
`wrapTool` advisory until a gateway. [dgp](https://github.com/numerous-com/dgp)
names the same integrity boundary: typed assessment then application-side
guarded commit; quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe):
**Speculative assessments cannot authorize effects**; cache hit ≠ live Jev;
assessors do not execute. Primary protocol fold is in Augustus; here the
boundary. [typesafe-jev-gate](https://github.com/russleyshaw/typesafe-jev-gate)
cannot override Hermes hardline; a Jev allow is not a grant; uncertain →
approval, not allow. [ajensenwaud/hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin)
is tools the agent must call, not a fail-closed overlay.
[chopratejas/invalidate](https://github.com/chopratejas/invalidate) retires
stale memories in code after Jev votes; a lease is not a capability grant. [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard)
re-checks target and instruction snapshots before committing.
[codebam/jev-guardrails](https://github.com/codebam/jev-guardrails):
**The library owns policy, not the model**; a local decision never
overrides Jev; **A guardrail is not a sandbox**.
[brickfrog/moongate](https://github.com/brickfrog/moongate): policy from
the **base commit**; **unevaluated never counts as a pass**; **Exit 0
doesn't mean the code is fine**.
[jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage):
`auto_remediate_candidate` is a label, not execution; **Low confidence
never auto-acts**. [jevusher](https://github.com/cvsgireesh/jevusher):
J7 **pass means nothing detected, never safe to obey**.
[willkelly/jev-evaluation](https://github.com/willkelly/jev-evaluation):
quoted **Confidence predicts whether an answer is right, but not
whether the question could be answered**; **do not hard-gate confidence
as fake safety**. [Fox-Islam/jev-bias-bench](https://github.com/Fox-Islam/jev-bias-bench):
**11,984** calls; **Do not test it by swapping names**; **Read the
deltas, not the stars**; distinct from natemoo-re/bias-bench.
[Ormus-Solutions/aurum-gate](https://github.com/Ormus-Solutions/aurum-gate):
packaged `src/index.ts` default autoConfidence **0.85**; parallel
`src/gate.ts` quoted **Probability is not confidence**; mocked, no live
API. [Ormus-Solutions/quicksilver-judge](https://github.com/Ormus-Solutions/quicksilver-judge):
packaged `sketchRisks` not live Jev; Gloss: **PASS is not a merge
grant**; parallel `src/stages.ts` quoted **Code owns overrides**.
[Ormus-Solutions/karat-filter](https://github.com/Ormus-Solutions/karat-filter):
quoted **Token overlap judge — mock stand-in for a Jev Noul**.
[Ormus-Solutions/gold-assay](https://github.com/Ormus-Solutions/gold-assay):
quoted **Screenshots lie until you assay them**; Gloss: **GREEN ≠
verified UI**.
[WaynezProg/jev-kit](https://github.com/WaynezProg/jev-kit): quoted
**Confidence is not a correctness guarantee**; SECURITY.md **not an
authorization boundary**; distinct from jonathanavis96/jev-kit Airlock.
 [Jev-Examiner](https://github.com/JularDepick/Jev-Examiner):
GitHub description only; **empty public tree at capture**; later README
advertises `src`/`docs` not in the tree — **advertised tree ≠ shipped source**;
do not invent a shipped moderator.
[BubbatheVTOG/pi-jev-tool-guard](https://github.com/BubbatheVTOG/pi-jev-tool-guard):
quoted **confirmation guard, not an operating-system sandbox**; fail-open
`evaluatorFailure: "allow"`; rules deterministic over Jev.
[alsoleg89/jev-bouncer](https://github.com/alsoleg89/jev-bouncer) (renamed
from [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard)): quoted
**Your rules win**; quoted SECURITY.md **Not a security boundary**;
**Tripwires never deny**.
[ItisShikhar/gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez):
41/42 **not a rh-guard ROC**; `AUTO_BAN` is not a safety proof.
[jkrup/jeveryword](https://github.com/jkrup/jeveryword): quoted **cannot make it produce
words that are not in the source**; `text.slice(start, end) ===
value`; distinct from WaynezProg `jev_extract`.
[TickerDev/jevfanity-api](https://github.com/TickerDev/jevfanity-api): **code owns `flagged`**; **`flagged` is a policy bit, not a safety proof**; default **0.75**; missing key → 500. [vidux/iso-jevdit](https://github.com/vidux/iso-jevdit): quoted **the audit engine is not finished**; quoted **This is not a certification, and it is not a conformity assessment**; `failOn` **Accepted today, acted on when the audit engine lands**. [ashafizullah/jev-linkedin](https://github.com/ashafizullah/jev-linkedin): quoted **not real-world probabilities**; quoted **Treat them as an early signal, not a decision**; CV **sent** to `/v1/systemone`. [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness): quoted **Filtering is a routing decision, never destruction**; quoted **Jev failures fail open**; 25/30 **not a rh-guard ROC**; distinct from AntonioCoppe/jev-harness. [Atikpui007/jev-sift](https://github.com/Atikpui007/jev-sift): quoted **Fails open**; quoted **This is a relevance filter, not a safety block**; hidden candidates never learned; distinct from kbhuw/jev-sift. [simonsez9510/jev-cite-check](https://github.com/simonsez9510/jev-cite-check): quoted **1회 관찰이며 성능 주장이 아닙니다**; Gloss: one-shot observation, not a performance claim; 97/100 **not a rh-guard ROC**. [JasonHZS/pi-jev-command-guard](https://github.com/JasonHZS/pi-jev-command-guard): quoted **do not provide a complete sandbox**; quoted **ambiguity must never silently become permission**; distinct from pi-jev-tool-guard. [finrod21/jev-transaction-guard](https://github.com/finrod21/jev-transaction-guard): quoted **IMMUNE TO BOTH** is **soundness theater**; Choice TRIP is not a freeze. [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails): quoted **The library owns policy, not the model**; **A guardrail is not a sandbox**; plugin **policy layer, not a sandbox or an authorization system**; failMode default **open**; sibling of codebam/jev-guardrails. [pantos12/mailverdict](https://github.com/pantos12/mailverdict): quoted **A classifier cannot be talked out of a probability**; the explainer **never changes the label**; 24 fixtures **are not a benchmark**; distinct from [mailverdict/mailverdict](https://github.com/mailverdict/mailverdict) quoted **Advisory signals, not verdicts**. [alexj11324/open-jev-approvals](https://github.com/alexj11324/open-jev-approvals): stale authorization version while review is in flight → **deny**; quoted **Fail-open degradation**; incomplete / no-key → `allow` with `incomplete: true`. [Ash20pk/beat-the-reviewer](https://github.com/Ash20pk/beat-the-reviewer): quoted **An unavailable reviewer is not an approval**; `on_unavailable: "block"`. [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard): quoted **It is an accident net, not a security boundary**; quoted **degrades loudly instead of silently**; D3 **fail-open**; D9 **l0-only**; quoted **L0 的 deny 类硬规则不受此开关影响**. [CompleteTech-LLC-AI-Research/jev-sentinel](https://github.com/CompleteTech-LLC-AI-Research/jev-sentinel): quoted **This is a defense-in-depth sensor and veto layer, not a complete reference monitor**; quoted **DEFER means only no additional veto**; quoted **Judgments are not grants**; quoted **provisional review/block thresholds 0.35/0.80 are policy starting points**. [heliowap/diff-risk-sentinel](https://github.com/heliowap/diff-risk-sentinel): quoted **It is a prioritization aid, not a bug detector**; **96% accuracy / 100% bug recall** **are superseded**; Rule 6 badge `ACCEPTABLE_LOW_RISK` (strategy: **Low risk. Safe to merge.**) is a badge. [wmsing/agent-firewall](https://github.com/wmsing/agent-firewall): quoted **fail-closed if checks do not pass**; Layer 2 **Mock**; quoted **Score ≥ 0.8** → **BLOCK**; quoted **git pull is intentionally excluded**. [acoyfellow/edit](https://github.com/acoyfellow/edit): quoted **Nothing changes until you approve the exact request**; quoted **If the provider is unavailable, `/edit` stops instead of pretending that a review happened**; quoted **Four runs of one tiny task** **is not a benchmark**. [adamnroman/slop-filter](https://github.com/adamnroman/slop-filter): quoted **hides AI-generated posts**; quoted **Scores every post in your feed for how likely it is to be AI-written**. [bohutang/sift](https://github.com/bohutang/sift): **Substance · Humor · Chit-chat · Promo · Junk**. [ThinkyMiner/Winnow](https://github.com/ThinkyMiner/Winnow): quoted **every word on the card is a template filled from typed answers**; quoted **The goldens are still unreviewed**. [yonsakhan/x-spam-filter-typesafe](https://github.com/yonsakhan/x-spam-filter-typesafe): **放行不隐藏**. [vynnlee/jev-mail](https://github.com/vynnlee/jev-mail): **Autonomous 24/7 Zero-Inbox**; [muhammedilyasy/jev-mail](https://github.com/muhammedilyasy/jev-mail): quoted **Read-only: it never sends, deletes, labels or archives anything**. [ordepas/system1-fraud-interceptor-demo](https://github.com/ordepas/system1-fraud-interceptor-demo): quoted **Es una demo de experimentación personal, no un benchmark**; quoted **no está pensada para producción**. [hfmsio/jev-wiki-watch](https://github.com/hfmsio/jev-wiki-watch): FLAG ≥ **80%**. [Umbylicus/umby-jev-stack](https://github.com/Umbylicus/umby-jev-stack): quoted **Never drop a finding**; quoted **Jev only classifies**; **rejected 543 as false positives**. [CompleteTech-LLC-AI-Research/jev-prune-kit](https://github.com/CompleteTech-LLC-AI-Research/jev-prune-kit): quoted **Not a universal `/prune`**; quoted **Not live-tested**; quoted **122 passing local tests are not 122 live harness or model tests**; quoted **88 passing local tests are not 88 live harness or model tests**. [iluvblender/yolo-jev-scene-filter](https://huggingface.co/spaces/iluvblender/yolo-jev-scene-filter): quoted **Jev only filters what YOLO already found.**. [kurihada/pi-jev-permit](https://github.com/kurihada/pi-jev-permit): quoted **silence is never consent.**; quoted **A failed judgment is never treated as approval.**. [ktsu2i/jevgate-action](https://github.com/ktsu2i/jevgate-action): **advertised Action ≠ shipped workflow**. [boldbug1/jev-triage](https://github.com/boldbug1/jev-triage): Distinct ThyFriendlyFox/jev-triage. [rubenhassid1/contact-cleaner](https://github.com/rubenhassid1/contact-cleaner): quoted **Buckets are code, not the model.**. [javimp2003/claude-code-jev-guardrails](https://github.com/javimp2003/claude-code-jev-guardrails): quoted **Claude thinks. Jev reacts. Code decides.**; **advertised ASK_USER ≠ engine emit**; no-key / `JEV_MODE=mock` named degraded backend (mock can still BLOCK). [vrazraz/jev-voice-gate](https://github.com/vrazraz/jev-voice-gate): quoted **Это не гарантированная замена wake word.**. [pksorensen/alp-pr-review](https://github.com/pksorensen/alp-pr-review): quoted **Ikke en erstatning for branch protection.**. [arashari/youtube-judol-userscript-jev](https://github.com/arashari/youtube-judol-userscript-jev): `confidenceThreshold` **0.6** (uncalibrated). [silky-x0/Postmark](https://github.com/silky-x0/Postmark): **advertised description ≠ shipped UI**. [thecoderpanda/shipit-gate](https://github.com/thecoderpanda/shipit-gate): quoted **Does this replace my CI? No.**; quoted **Rejects fail closed (exit code 2).**; `--force` / `--no-verify`; demo **mocked**. [uberto/jev-brig](https://github.com/uberto/jev-brig): quoted **jev-brig is a guardrail, not a boundary.**; **Not TypeSafe Jev**; unparsable → **ask — never a silent allow**. [knowlet/JevGuard-NSFA](https://github.com/knowlet/JevGuard-NSFA): **`.gitignore` only**; **advertised Guard ≠ shipped source**. [RavenRepo/jevengineeringgate](https://github.com/RavenRepo/jevengineeringgate): quoted **The gate never says yes**; quoted **Is this a security boundary? No.**; **0/26** wrong **not a rh-guard ROC**. [stardeckai/lgtm](https://github.com/stardeckai/lgtm): quoted **lgtm is advisory by default**; holdout precision **1.00** **not a rh-guard ROC**. [MertBasar0/openclaw-tool-prefilter](https://github.com/MertBasar0/openclaw-tool-prefilter): **catalog shrink ≠ deny**; quoted **Bulletproof Fail-Open Safety**. [Z761293629/pi-jev-helm](https://github.com/Z761293629/pi-jev-helm): Safety Gate/Verifier **uncommitted**; fail-open to Baseline; **2500 ms**. [snesmaeili/jev-claude-controller](https://github.com/snesmaeili/jev-claude-controller): quoted **no function in the safety layer accepts a model signal.** [logicrw/ask-jev](https://github.com/logicrw/ask-jev): quoted **never use a verdict to grant permissions**. [dev-hari-prasad/switchboard](https://github.com/dev-hari-prasad/switchboard): **advertised router ≠ shipped source**. [durganani60/fastrisk-jev](https://huggingface.co/spaces/durganani60/fastrisk-jev): **0.80** BLOCK / **0.35** STEP-UP; quoted **0% Type Errors** theater; UI halt ≠ freeze. [hamidfarmani/jev-resume-match](https://github.com/hamidfarmani/jev-resume-match): quoted **not a hiring prediction**. [fatelei/yueli](https://github.com/fatelei/yueli): quoted **仅供参考，不构成招聘决策依据.** [ismailakdag/typesafe-jev](https://github.com/ismailakdag/typesafe-jev): quoted **Kararı yine kod verir.**; quoted **Jev metin üretmez.** [TennousuAthena/Mailbox-Boy-With-Jev](https://github.com/TennousuAthena/Mailbox-Boy-With-Jev): **advertised mailbox ≠ shipped source**. [lgy1027/jevshield](https://github.com/lgy1027/jevshield): quoted **Sub-100ms, non-autoregressive runtime security gate**; heuristic **not a security boundary**. [DevMortimer/pi-warden](https://github.com/DevMortimer/pi-warden): quoted **It is advisory, not a sandbox**; quoted **project-maintained benchmarks, not universal claims**. [jasonli0226/jev-demo-triage](https://github.com/jasonli0226/jev-demo-triage): quoted **Jev did not beat baseline on pass rate**; **N is 3 per cell**. [manutej/volumetric-intelligence](https://github.com/manutej/volumetric-intelligence): quoted **Jev is the typed gate (`Choice` / `Score` / `Noul`), never the runtime**; `/api/walk` rehearsal. [miniLV/Jev-Auto-Router](https://github.com/miniLV/Jev-Auto-Router): quoted **No evidence means no production delegation**; automatic delegation **off by default** (**UNVERIFIED**). [replynodes/jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer): quoted **developer demo, not … SEO score**. [rmax-ai/ai-provider-triage-comparison](https://github.com/rmax-ai/ai-provider-triage-comparison): quoted **not a general model ranking**. [sysadarsh/zerosweep](https://github.com/sysadarsh/zerosweep): 0.85 `human_review` vs `trash_quarantine`; **Zero Format Errors** theater. [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router): quoted **Fail-open**; BACKTEST **−59.9%**; distinct miniLV/Jev-Auto-Router. [y0usaf/pi-jev](https://github.com/y0usaf/pi-jev): quoted **The gate fails open by design**; smoke calibration not enforce. [fsmiamoto/pi-jev-prune](https://github.com/fsmiamoto/pi-jev-prune): default **dry**; **prune ≠ deny**. [raniellimontagna/jev-guard-mcp](https://github.com/raniellimontagna/jev-guard-mcp): quoted **the server cannot independently attest human approval**. [reallygood83/jev-router](https://github.com/reallygood83/jev-router): quoted **Jev does not pick model ids. It picks a role. Failures pass through.** [philippdubach/pi-jev-router](https://github.com/philippdubach/pi-jev-router): quoted **Jev output is evidence, not truth.** [YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian](https://github.com/YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian): quoted **Section 4: Counter-Measures are exemplary and decoupled from individual verdicts**. [bornakapusta/slop-guard](https://github.com/bornakapusta/slop-guard): **the reviewer never blocks.** [sudeshkar/jev-corrective-rag](https://github.com/sudeshkar/jev-corrective-rag): quoted **Jev decision gates | Stubbed — no API key yet**. [Patrick-SCH03/jev-issue-radar](https://github.com/Patrick-SCH03/jev-issue-radar): quoted **It never closes issues, adds labels, or posts comments**. [MaxIvanyshen/jev-review](https://github.com/MaxIvanyshen/jev-review): quoted **It never approves or rejects anything**. [NiazMorshed2007/jcr](https://github.com/NiazMorshed2007/jcr): quoted **JCR returns documentation. It does not execute commands.**; quoted **The included harnesses also stop at explaining the steps needed to carry out a task.**; beam **0.6** / width **3** / depth **16**; ambiguous / no-match / depth-limit are resolver outcomes, not merge grants; routing ≠ permission; treating capability context as attested approval to run is theater; 80-run 85%/23% **not a rh-guard ROC**. [bojansandhaus/jev-decisions](https://github.com/bojansandhaus/jev-decisions): quoted **It never silently approves**; quoted **The workflow is shadow only**; quoted **Installation does not select the provider, change `approvals.mode`**. [smlayero/jev-debtgate](https://github.com/smlayero/jev-debtgate): quoted **Do not ship on argmax alone**; `--collect-only` is measurement, not a verdict; 0.85 AUTO is not a safety envelope. [BubbatheVTOG/pi-jev-redact](https://github.com/BubbatheVTOG/pi-jev-redact): quoted **last-mile text redactor, not a complete sandbox or secret manager**; empty payload **fails closed**. [abgregs/jev-experiments](https://github.com/abgregs/jev-experiments): routing ≠ permission; **0.9** is not a grant. [kevinlupera/jev-log-sentinel](https://github.com/kevinlupera/jev-log-sentinel): **offline heuristic fallback** is not live Jev. [pyaichatbot/s1p](https://github.com/pyaichatbot/s1p): quoted **A caller must not interpret a recommendation as an authorization**; quoted **No requirement below is currently claimed implemented**. [qs-lll/twitter-jev-guard](https://github.com/qs-lll/twitter-jev-guard): STOP watermark is not a hide; **0.75** is not calibrated. [jagsan-cyber/reflex-gate](https://github.com/jagsan-cyber/reflex-gate): `/jev/*` is not TypeSafe Jev; **100.0%** self-test is not a rh-guard ROC. [hj01857655/jev-router](https://github.com/hj01857655/jev-router): `mapResult` only; autoReply is not a send. [DefensiveSniper/jev-subagent-router](https://github.com/DefensiveSniper/jev-subagent-router): 不等于任务成功率. [PeterP22/jev-triage](https://github.com/PeterP22/jev-triage): decides, does not act. [a1325127730-cyber/jev-quiz-router](https://github.com/a1325127730-cyber/jev-quiz-router): 不能未经验证就解释为真实准确率; **0.85** uncalibrated. [aquental/jev-guardrail](https://github.com/aquental/jev-guardrail): quoted **Do not gate decisions on `confidence`.**; **11/13** synthetic. [bo7/jev_test](https://github.com/bo7/jev_test): quoted **Email content is untrusted input.**; classify only. [ehui1226/hookmeter-jev](https://github.com/ehui1226/hookmeter-jev): clickbait noul **0.70** is not a hide/deny. [AkashPriyadarshii/jev-git](https://github.com/AkashPriyadarshii/jev-git): fail-closed pre-commit/pre-push; **0.80** Block / **0.55** Warn (does not block); soft 0.80 as sole veto is theater. [ziozzang/hearim](https://github.com/ziozzang/hearim): quoted **It does not reproduce Jev's model, probability calibration, or latency.**; **529** unavailable; not TypeSafe logits. [yyy-router/QA-Classifier-Jev](https://github.com/yyy-router/QA-Classifier-Jev): classify CLI; no live RAG keep/drop. [qiaohaojie/Jev-MongoDB](https://github.com/qiaohaojie/Jev-MongoDB): escalate safety≥**0.5** or Safety & Health; quoted **no authentication**. [eziee-ai/jev-router-demo](https://github.com/eziee-ai/jev-router-demo): *theirs* B2 **32/32**; quoted **Twelve prompts is a direction, not a benchmark.**; never picks a market. [dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate): fail-closed; Distinct fivethirty fail-open; quoted **This is a lexical permission gate, not a shell parser or sandbox.** [atulify/omp-plugin-jev-router](https://github.com/atulify/omp-plugin-jev-router): fail-open to advanced; **0.75**; routing ≠ permission. [aglowinthefield/hermes-typesafe-plugins](https://github.com/aglowinthefield/hermes-typesafe-plugins): shadow default, fail open; **0.70–0.90**. [Zafer-Liu/jev-demo-rag](https://github.com/Zafer-Liu/jev-demo-rag): relevance ≥**2** AND injection <**0.5**; *theirs* **83%** saved not a ROC. [Zafer-Liu/jev-demo-moderator](https://github.com/Zafer-Liu/jev-demo-moderator): never auto-delete; *theirs* ~**$20/M**. [Zafer-Liu/jev-demo-guardrails](https://github.com/Zafer-Liu/jev-demo-guardrails): action Choice encodes policy; *theirs* 6 messages. [nexibeo/jev-cookbook](https://github.com/nexibeo/jev-cookbook): quoted **your code prepares the data and owns every decision**; *theirs* 24 messages not a ROC. [danielhirt/jev-lab](https://github.com/danielhirt/jev-lab): **Tight, not bitwise**; Distinct copyleftdev/jev-labs. [JairajSustained/llm-routing-jiv](https://github.com/JairajSustained/llm-routing-jiv): quoted **nothing it produces is executed**; *theirs* 23/24 smoke; quoted **The evaluation set has not been scored against live Jev**. [bojansandhaus/jev-lcm-dsh-compaction](https://github.com/bojansandhaus/jev-lcm-dsh-compaction): quoted **not a complete TypeScript port**; **Installation does not select the active engine automatically**. [bojansandhaus/jev-lcm-hermes-compaction](https://github.com/bojansandhaus/jev-lcm-hermes-compaction): **Installation does not select the active engine automatically**; Distinct dsh-compaction. [soyelmismo/laya-multilingual-onnx](https://huggingface.co/soyelmismo/laya-multilingual-onnx): Not TypeSafe Jev; *theirs* 250 to 300ms. [shimo4228/jev-skill-router](https://github.com/shimo4228/jev-skill-router): quoted **A secret pasted into a prompt is sent as typed**; inject ≠ grant. [vlasvar/jev-research](https://github.com/vlasvar/jev-research): **advertised research app ≠ shipped source**; greek-scrabble pending rename. [wangmiaozero/laya-router-skill](https://github.com/wangmiaozero/laya-router-skill): quoted **sole approval gate**; `advisory: true`; quoted **The Laya output is advisory only**. [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router): quoted **Routing is fail-open**; **0.3**; routing ≠ permission. [BillionsBobby/JevRouter](https://github.com/BillionsBobby/JevRouter): quoted **Jev owns the decision probabilities**; *theirs* **44%** not a rh-guard ROC. [ba2slk/jev-command-gate](https://github.com/ba2slk/jev-command-gate): quoted **classified only, not executed**; **0.60** uncalibrated; API error → `ask`. [andrei10k/claude-jev-model-router](https://github.com/andrei10k/claude-jev-model-router): quoted **never hurt**; tool-set first; observe default; **0.15** / **0.3**. [Ryder-MHumble/Awsome-Jev-Router](https://github.com/Ryder-MHumble/Awsome-Jev-Router): quoted **never an automatic action**; *theirs* **256**. [Akashdb5/jev-router](https://github.com/Akashdb5/jev-router): quoted **GateUnavailable**; **0.95** / **0.88**; *theirs* **86.2%** not a rh-guard ROC. [jimmyliao/jev-storyboard-lab](https://github.com/jimmyliao/jev-storyboard-lab): `check_segment()`; **0.6**. [daviddl9/jev-router](https://github.com/daviddl9/jev-router): quoted **Fresh context is not a sandbox**. [1105623876/qwenpaw-jev-memory-gate](https://github.com/1105623876/qwenpaw-jev-memory-gate): **0.50**; skip ≠ deny. [kyle-chalmers/typesafe-jev-incident-router](https://github.com/kyle-chalmers/typesafe-jev-incident-router): registry first; illustrative. [Iskandeur/system1-system2](https://github.com/Iskandeur/system1-system2): **advertised demo ≠ shipped source**. [EricsenSemedo/t3code-jev](https://github.com/EricsenSemedo/t3code-jev): **advertised Jev routing ≠ shipped source**. [yjsplay2002/jev-router-dashboard](https://github.com/yjsplay2002/jev-router-dashboard): quoted **CLI exit success alone is not quality verification**. [grapefruit0205/jev-save](https://github.com/grapefruit0205/jev-save): quoted **never blocks an efficiency judgment**. [Joker666/Reflex](https://github.com/Joker666/Reflex): **0.85**; distinct reflex-gate. [DowLucas/browser-jev](https://github.com/DowLucas/browser-jev): fail **0.9** AND severity **3**. [AltSlate-Labs/certo](https://github.com/AltSlate-Labs/certo): quoted **not affiliated with TypeSafe**. [gbesse/agent-mandates](https://github.com/gbesse/agent-mandates): quoted **authorizationGranted: false**. [taifoon-io/n8n-nodes-typesafe](https://github.com/taifoon-io/n8n-nodes-typesafe): quoted **Nothing fails open**. [ashishakkumar/Jev-Checkpoint](https://github.com/ashishakkumar/Jev-Checkpoint): quoted **It never performs the selected action.**; **0.95**. [bhzdcz/multica-typed-decision-router](https://github.com/bhzdcz/multica-typed-decision-router): quoted **no external side effects**; quoted **based solely on a Jev answer**. [eyenpi/actionreflex](https://github.com/eyenpi/actionreflex): quoted **starting points, not calibrated values**; *theirs* F1 **89.3**. [nedzen/decision-gate](https://github.com/nedzen/decision-gate): quoted **Only `pass: true` items get read**; skip ≠ deny. [phamhongviet/pi-ext-model-router](https://github.com/phamhongviet/pi-ext-model-router): **Request was not sent**; routing ≠ permission. [ruban-24/switchboard](https://github.com/ruban-24/switchboard): quoted **your policy makes the final choice**; **0.70**; distinct empty switchboard. [vuckuola619/reflex](https://github.com/vuckuola619/reflex): quoted **Probabilistic providers never override deterministic hard policy.**; RC **1.0.0rc2**; distinct Joker666. [luhayes/jev-agent-router](https://github.com/luhayes/jev-agent-router): quoted **never executes a selected tool, Skill, agent, or shell command**; **0.8**. [Mazukriez/Jev-AI-Model-Security-protection-tool](https://github.com/Mazukriez/Jev-AI-Model-Security-protection-tool): advertised Scan API ≠ shipped HTTP; distinct lgy1027. [OmarAlaaeldein/jev-verifier-skill](https://github.com/OmarAlaaeldein/jev-verifier-skill): quoted **advisory signal, never proof**; **0.80**/**0.20** uncalibrated. [advance-lion/dsh-jev-hook](https://github.com/advance-lion/dsh-jev-hook): quoted **Replacement-first, not addition-first.**; **0.85**. [advance-lion/dsh-jev-hooks](https://github.com/advance-lion/dsh-jev-hooks): advertised hooks ≠ shipped source. [s1lv3rj1nx/openjev-router-healthcare](https://huggingface.co/s1lv3rj1nx/openjev-router-healthcare): **not TypeSafe Jev**; *theirs* **0.899**; FPR **0.652**. [hiro1202/jev-review-gate-poc](https://github.com/hiro1202/jev-review-gate-poc): advertised review gate ≠ shipped source. [microchipgnu/jev-hooks](https://github.com/microchipgnu/jev-hooks): quoted **not a sandbox**; **0.8** alert, no transaction. [wylu1037/pi-jev-checkpoints](https://github.com/wylu1037/pi-jev-checkpoints): quoted **not a model weight snapshot**; fail-open. [ryanzen9/XFlow](https://github.com/ryanzen9/XFlow): no silent provider failover; sensitivity 70 is a 30% threshold; **advertised sync/cache ≠ shipped Features**. [ChuckNomis/linkedin-post-filtering-jev](https://github.com/ChuckNomis/linkedin-post-filtering-jev): does not hide; fail-open error attr. [nk412/judgements](https://github.com/nk412/judgements): quoted **Use the probabilities to make policy explicit rather than trusting the top answer.**; **0.5** bool flip is not a deny. [jiawei686/jev-screen-mcp](https://github.com/jiawei686/jev-screen-mcp): quoted **A high spam_prob alone is never permission to block**; named mock. [jiawei686/jev-review-mcp](https://github.com/jiawei686/jev-review-mcp): quoted **never permission to merge**; **0.8** AND **0.6**. [yamadashy/jev-labeler-action](https://github.com/yamadashy/jev-labeler-action): quoted **The action only adds labels**; **0.8**. [hyspacex/jev-router](https://github.com/hyspacex/jev-router): quoted **NO_SAFE_ADMISSION**; Distinct reallygood83. [alexei-led/pi-model-router](https://github.com/alexei-led/pi-model-router): quoted **not tool permissions or security levels**; **0.65**. [cmd-siri-bot/llm-gateway](https://github.com/cmd-siri-bot/llm-gateway): **0.25** sole block. [PhilPentatonic/hermes-model-routing](https://github.com/PhilPentatonic/hermes-model-routing): *theirs* **82.4%/89.2%**; hope-the-model-looks. [jackygu2006/reasonix-jev-compaction](https://github.com/jackygu2006/reasonix-jev-compaction): quoted **never treats "no answer" as "delete"**; **0.5**. [WesleySmits/spark-jev-email-triage](https://github.com/WesleySmits/spark-jev-email-triage): advertised triage ≠ shipped gate. [Charlie-Qi394/jevrouter-prompt-tier-extension](https://github.com/Charlie-Qi394/jevrouter-prompt-tier-extension): quoted **not an official TypeSafe product**; **0.60**.
Cousin, not this sidecar.

## Polarity

Phrase every hazard Noul so a high number means the hack is present. Block on
`noul >= t`. Inverting to "is this safe" and raising `t` shrinks the reject
band. Advisory kinds (`proxy_metric`, `heldout_blindness`, `coverage_theater`,
`sycophancy_eval`) never deny by themselves.
