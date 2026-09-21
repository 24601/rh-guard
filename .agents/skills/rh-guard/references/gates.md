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

[hermes-jev](https://github.com/keeltrace/hermes-jev) async nervous system. `gate_mode` default **off**; `min_confidence` **0.80**. Quoted: **Do not treat a Jev probability as proof of correctness.** Catalog **0.2.1.2** ≠ dev **0.2.2.dev4**. Live **$0.000095088** / **419.276 ms** **not a rh-guard ROC**. Distinct hermes-plugin-jev / hermes-jev-router / hermes-jev-skills / typesafe-jev-gate / hermes-jev-plugin. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

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

[dtduc-git/jevnav](https://github.com/dtduc-git/jevnav) replayable browser automation. Quoted: **`done` is a claim, not evidence.** Quoted: **What keeps the loop safe is deterministic.** Distinct jev-ra. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

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

[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration) measures OOD ECE vs its noise floor. **AUC ≠ ECE.** Pairs with does-jev-confidence-mean-anything. Not a rh-guard peer.

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
[TickerDev/jevfanity-api](https://github.com/TickerDev/jevfanity-api): **code owns `flagged`**; **`flagged` is a policy bit, not a safety proof**; default **0.75**; missing key → 500. [vidux/iso-jevdit](https://github.com/vidux/iso-jevdit): quoted **the audit engine is not finished**; quoted **This is not a certification, and it is not a conformity assessment**; `failOn` **Accepted today, acted on when the audit engine lands**. [ashafizullah/jev-linkedin](https://github.com/ashafizullah/jev-linkedin): quoted **not real-world probabilities**; quoted **Treat them as an early signal, not a decision**; CV **sent** to `/v1/systemone`. [Astro-Han/jev-harness](https://github.com/Astro-Han/jev-harness): quoted **Filtering is a routing decision, never destruction**; quoted **Jev failures fail open**; 25/30 **not a rh-guard ROC**; distinct from AntonioCoppe/jev-harness. [Atikpui007/jev-sift](https://github.com/Atikpui007/jev-sift): quoted **Fails open**; quoted **This is a relevance filter, not a safety block**; hidden candidates never learned; distinct from kbhuw/jev-sift. [simonsez9510/jev-cite-check](https://github.com/simonsez9510/jev-cite-check): quoted **1회 관찰이며 성능 주장이 아닙니다**; Gloss: one-shot observation, not a performance claim; 97/100 **not a rh-guard ROC**. [JasonHZS/pi-jev-command-guard](https://github.com/JasonHZS/pi-jev-command-guard): quoted **do not provide a complete sandbox**; quoted **ambiguity must never silently become permission**; distinct from pi-jev-tool-guard. [finrod21/jev-transaction-guard](https://github.com/finrod21/jev-transaction-guard): quoted **IMMUNE TO BOTH** is **soundness theater**; Choice TRIP is not a freeze. [codebam/dsh-jev-guardrails](https://github.com/codebam/dsh-jev-guardrails): quoted **The library owns policy, not the model**; **A guardrail is not a sandbox**; plugin **policy layer, not a sandbox or an authorization system**; failMode default **open**; sibling of codebam/jev-guardrails. [pantos12/mailverdict](https://github.com/pantos12/mailverdict): quoted **A classifier cannot be talked out of a probability**; the explainer **never changes the label**; 24 fixtures **are not a benchmark**; distinct from [mailverdict/mailverdict](https://github.com/mailverdict/mailverdict) quoted **Advisory signals, not verdicts**. [alexj11324/open-jev-approvals](https://github.com/alexj11324/open-jev-approvals): stale authorization version while review is in flight → **deny**; quoted **Fail-open degradation**; incomplete / no-key → `allow` with `incomplete: true`. [Ash20pk/beat-the-reviewer](https://github.com/Ash20pk/beat-the-reviewer): quoted **An unavailable reviewer is not an approval**; `on_unavailable: "block"`. [7starsseeker/dsh-jev-guard](https://github.com/7starsseeker/dsh-jev-guard): quoted **It is an accident net, not a security boundary**; quoted **degrades loudly instead of silently**; D3 **fail-open**; D9 **l0-only**; quoted **L0 的 deny 类硬规则不受此开关影响**. [CompleteTech-LLC-AI-Research/jev-sentinel](https://github.com/CompleteTech-LLC-AI-Research/jev-sentinel): quoted **This is a defense-in-depth sensor and veto layer, not a complete reference monitor**; quoted **DEFER means only no additional veto**; quoted **Judgments are not grants**; quoted **provisional review/block thresholds 0.35/0.80 are policy starting points**. [heliowap/diff-risk-sentinel](https://github.com/heliowap/diff-risk-sentinel): quoted **It is a prioritization aid, not a bug detector**; **96% accuracy / 100% bug recall** **are superseded**; Rule 6 badge `ACCEPTABLE_LOW_RISK` (strategy: **Low risk. Safe to merge.**) is a badge. [wmsing/agent-firewall](https://github.com/wmsing/agent-firewall): quoted **fail-closed if checks do not pass**; Layer 2 **Mock**; quoted **Score ≥ 0.8** → **BLOCK**; quoted **git pull is intentionally excluded**. [acoyfellow/edit](https://github.com/acoyfellow/edit): quoted **Nothing changes until you approve the exact request**; quoted **If the provider is unavailable, `/edit` stops instead of pretending that a review happened**; quoted **Four runs of one tiny task** **is not a benchmark**. [adamnroman/slop-filter](https://github.com/adamnroman/slop-filter): quoted **hides AI-generated posts**; quoted **Scores every post in your feed for how likely it is to be AI-written**. [bohutang/sift](https://github.com/bohutang/sift): **Substance · Humor · Chit-chat · Promo · Junk**. [ThinkyMiner/Winnow](https://github.com/ThinkyMiner/Winnow): quoted **every word on the card is a template filled from typed answers**; quoted **The goldens are still unreviewed**. [yonsakhan/x-spam-filter-typesafe](https://github.com/yonsakhan/x-spam-filter-typesafe): **放行不隐藏**. [vynnlee/jev-mail](https://github.com/vynnlee/jev-mail): **Autonomous 24/7 Zero-Inbox**; [muhammedilyasy/jev-mail](https://github.com/muhammedilyasy/jev-mail): quoted **Read-only: it never sends, deletes, labels or archives anything**. [ordepas/system1-fraud-interceptor-demo](https://github.com/ordepas/system1-fraud-interceptor-demo): quoted **Es una demo de experimentación personal, no un benchmark**; quoted **no está pensada para producción**. [hfmsio/jev-wiki-watch](https://github.com/hfmsio/jev-wiki-watch): FLAG ≥ **80%**. [Umbylicus/umby-jev-stack](https://github.com/Umbylicus/umby-jev-stack): quoted **Never drop a finding**; quoted **Jev only classifies**; **rejected 543 as false positives**. [CompleteTech-LLC-AI-Research/jev-prune-kit](https://github.com/CompleteTech-LLC-AI-Research/jev-prune-kit): quoted **Not a universal `/prune`**; quoted **Not live-tested**; quoted **122 passing local tests are not 122 live harness or model tests**; quoted **88 passing local tests are not 88 live harness or model tests**. [iluvblender/yolo-jev-scene-filter](https://huggingface.co/spaces/iluvblender/yolo-jev-scene-filter): quoted **Jev only filters what YOLO already found.**. [kurihada/pi-jev-permit](https://github.com/kurihada/pi-jev-permit): quoted **silence is never consent.**; quoted **A failed judgment is never treated as approval.**. [ktsu2i/jevgate-action](https://github.com/ktsu2i/jevgate-action): **advertised Action ≠ shipped workflow**. [boldbug1/jev-triage](https://github.com/boldbug1/jev-triage): Distinct ThyFriendlyFox/jev-triage. [rubenhassid1/contact-cleaner](https://github.com/rubenhassid1/contact-cleaner): quoted **Buckets are code, not the model.**. [javimp2003/claude-code-jev-guardrails](https://github.com/javimp2003/claude-code-jev-guardrails): quoted **Claude thinks. Jev reacts. Code decides.**; **advertised ASK_USER ≠ engine emit**; no-key / `JEV_MODE=mock` named degraded backend (mock can still BLOCK). [vrazraz/jev-voice-gate](https://github.com/vrazraz/jev-voice-gate): quoted **Это не гарантированная замена wake word.**. [pksorensen/alp-pr-review](https://github.com/pksorensen/alp-pr-review): quoted **Ikke en erstatning for branch protection.**. [arashari/youtube-judol-userscript-jev](https://github.com/arashari/youtube-judol-userscript-jev): `confidenceThreshold` **0.6** (uncalibrated). [silky-x0/Postmark](https://github.com/silky-x0/Postmark): **advertised description ≠ shipped UI**. [thecoderpanda/shipit-gate](https://github.com/thecoderpanda/shipit-gate): quoted **Does this replace my CI? No.**; quoted **Rejects fail closed (exit code 2).**; `--force` / `--no-verify`; demo **mocked**. [uberto/jev-brig](https://github.com/uberto/jev-brig): quoted **jev-brig is a guardrail, not a boundary.**; **Not TypeSafe Jev**; unparsable → **ask — never a silent allow**. [knowlet/JevGuard-NSFA](https://github.com/knowlet/JevGuard-NSFA): **`.gitignore` only**; **advertised Guard ≠ shipped source**. [RavenRepo/jevengineeringgate](https://github.com/RavenRepo/jevengineeringgate): quoted **The gate never says yes**; quoted **Is this a security boundary? No.**; **0/26** wrong **not a rh-guard ROC**. [stardeckai/lgtm](https://github.com/stardeckai/lgtm): quoted **lgtm is advisory by default**; holdout precision **1.00** **not a rh-guard ROC**. [MertBasar0/openclaw-tool-prefilter](https://github.com/MertBasar0/openclaw-tool-prefilter): **catalog shrink ≠ deny**; quoted **Bulletproof Fail-Open Safety**. [Z761293629/pi-jev-helm](https://github.com/Z761293629/pi-jev-helm): Safety Gate/Verifier **uncommitted**; fail-open to Baseline; **2500 ms**. [snesmaeili/jev-claude-controller](https://github.com/snesmaeili/jev-claude-controller): quoted **no function in the safety layer accepts a model signal.** [logicrw/ask-jev](https://github.com/logicrw/ask-jev): quoted **never use a verdict to grant permissions**. [dev-hari-prasad/switchboard](https://github.com/dev-hari-prasad/switchboard): **advertised router ≠ shipped source**. [durganani60/fastrisk-jev](https://huggingface.co/spaces/durganani60/fastrisk-jev): **0.80** BLOCK / **0.35** STEP-UP; quoted **0% Type Errors** theater; UI halt ≠ freeze. [hamidfarmani/jev-resume-match](https://github.com/hamidfarmani/jev-resume-match): quoted **not a hiring prediction**. [fatelei/yueli](https://github.com/fatelei/yueli): quoted **仅供参考，不构成招聘决策依据.** [ismailakdag/typesafe-jev](https://github.com/ismailakdag/typesafe-jev): quoted **Kararı yine kod verir.**; quoted **Jev metin üretmez.** [TennousuAthena/Mailbox-Boy-With-Jev](https://github.com/TennousuAthena/Mailbox-Boy-With-Jev): **advertised mailbox ≠ shipped source**. [lgy1027/jevshield](https://github.com/lgy1027/jevshield): quoted **Sub-100ms, non-autoregressive runtime security gate**; heuristic **not a security boundary**. [DevMortimer/pi-warden](https://github.com/DevMortimer/pi-warden): quoted **It is advisory, not a sandbox**; quoted **project-maintained benchmarks, not universal claims**. [jasonli0226/jev-demo-triage](https://github.com/jasonli0226/jev-demo-triage): quoted **Jev did not beat baseline on pass rate**; **N is 3 per cell**. [manutej/volumetric-intelligence](https://github.com/manutej/volumetric-intelligence): quoted **Jev is the typed gate (`Choice` / `Score` / `Noul`), never the runtime**; `/api/walk` rehearsal. [miniLV/Jev-Auto-Router](https://github.com/miniLV/Jev-Auto-Router): quoted **No evidence means no production delegation**; automatic delegation **off by default** (**UNVERIFIED**). [replynodes/jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer): quoted **developer demo, not … SEO score**. [rmax-ai/ai-provider-triage-comparison](https://github.com/rmax-ai/ai-provider-triage-comparison): quoted **not a general model ranking**. [sysadarsh/zerosweep](https://github.com/sysadarsh/zerosweep): 0.85 `human_review` vs `trash_quarantine`; **Zero Format Errors** theater. [0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router): quoted **Fail-open**; BACKTEST **−59.9%**; distinct miniLV/Jev-Auto-Router. [y0usaf/pi-jev](https://github.com/y0usaf/pi-jev): quoted **The gate fails open by design**; smoke calibration not enforce. [fsmiamoto/pi-jev-prune](https://github.com/fsmiamoto/pi-jev-prune): default **dry**; **prune ≠ deny**. [raniellimontagna/jev-guard-mcp](https://github.com/raniellimontagna/jev-guard-mcp): quoted **the server cannot independently attest human approval**. [reallygood83/jev-router](https://github.com/reallygood83/jev-router): quoted **Jev does not pick model ids. It picks a role. Failures pass through.** [philippdubach/pi-jev-router](https://github.com/philippdubach/pi-jev-router): quoted **Jev output is evidence, not truth.** [YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian](https://github.com/YuyaForest/JEV-Dual-Spectrum-Phishing-Guardian): quoted **Section 4: Counter-Measures are exemplary and decoupled from individual verdicts**. [bornakapusta/slop-guard](https://github.com/bornakapusta/slop-guard): **the reviewer never blocks.** [sudeshkar/jev-corrective-rag](https://github.com/sudeshkar/jev-corrective-rag): quoted **Jev decision gates | Stubbed — no API key yet**. [Patrick-SCH03/jev-issue-radar](https://github.com/Patrick-SCH03/jev-issue-radar): quoted **It never closes issues, adds labels, or posts comments**. [MaxIvanyshen/jev-review](https://github.com/MaxIvanyshen/jev-review): quoted **It never approves or rejects anything**. [NiazMorshed2007/jcr](https://github.com/NiazMorshed2007/jcr): quoted **JCR returns documentation. It does not execute commands.**; quoted **The included harnesses also stop at explaining the steps needed to carry out a task.**; beam **0.6** / width **3** / depth **16**; ambiguous / no-match / depth-limit are resolver outcomes, not merge grants; routing ≠ permission; treating capability context as attested approval to run is theater; 80-run 85%/23% **not a rh-guard ROC**. [bojansandhaus/jev-decisions](https://github.com/bojansandhaus/jev-decisions): quoted **It never silently approves**; quoted **The workflow is shadow only**; quoted **Installation does not select the provider, change `approvals.mode`**. [smlayero/jev-debtgate](https://github.com/smlayero/jev-debtgate): quoted **Do not ship on argmax alone**; `--collect-only` is measurement, not a verdict; 0.85 AUTO is not a safety envelope. [BubbatheVTOG/pi-jev-redact](https://github.com/BubbatheVTOG/pi-jev-redact): quoted **last-mile text redactor, not a complete sandbox or secret manager**; empty payload **fails closed**. [abgregs/jev-experiments](https://github.com/abgregs/jev-experiments): routing ≠ permission; **0.9** is not a grant. [kevinlupera/jev-log-sentinel](https://github.com/kevinlupera/jev-log-sentinel): **offline heuristic fallback** is not live Jev. [pyaichatbot/s1p](https://github.com/pyaichatbot/s1p): quoted **A caller must not interpret a recommendation as an authorization**; quoted **No requirement below is currently claimed implemented**. [qs-lll/twitter-jev-guard](https://github.com/qs-lll/twitter-jev-guard): STOP watermark is not a hide; **0.75** is not calibrated. [jagsan-cyber/reflex-gate](https://github.com/jagsan-cyber/reflex-gate): `/jev/*` is not TypeSafe Jev; **100.0%** self-test is not a rh-guard ROC. [hj01857655/jev-router](https://github.com/hj01857655/jev-router): `mapResult` only; autoReply is not a send. [DefensiveSniper/jev-subagent-router](https://github.com/DefensiveSniper/jev-subagent-router): 不等于任务成功率. [PeterP22/jev-triage](https://github.com/PeterP22/jev-triage): decides, does not act. [a1325127730-cyber/jev-quiz-router](https://github.com/a1325127730-cyber/jev-quiz-router): 不能未经验证就解释为真实准确率; **0.85** uncalibrated. [aquental/jev-guardrail](https://github.com/aquental/jev-guardrail): quoted **Do not gate decisions on `confidence`.**; **11/13** synthetic. [bo7/jev_test](https://github.com/bo7/jev_test): quoted **Email content is untrusted input.**; classify only. [ehui1226/hookmeter-jev](https://github.com/ehui1226/hookmeter-jev): clickbait noul **0.70** is not a hide/deny. [AkashPriyadarshii/jev-git](https://github.com/AkashPriyadarshii/jev-git): fail-closed pre-commit/pre-push; **0.80** Block / **0.55** Warn (does not block); soft 0.80 as sole veto is theater. [ziozzang/hearim](https://github.com/ziozzang/hearim): quoted **It does not reproduce Jev's model, probability calibration, or latency.**; **529** unavailable; not TypeSafe logits. [yyy-router/QA-Classifier-Jev](https://github.com/yyy-router/QA-Classifier-Jev): classify CLI; no live RAG keep/drop. [qiaohaojie/Jev-MongoDB](https://github.com/qiaohaojie/Jev-MongoDB): escalate safety≥**0.5** or Safety & Health; quoted **no authentication**. [eziee-ai/jev-router-demo](https://github.com/eziee-ai/jev-router-demo): *theirs* B2 **32/32**; quoted **Twelve prompts is a direction, not a benchmark.**; never picks a market. [dys-org/pi-jev-gate](https://github.com/dys-org/pi-jev-gate): fail-closed; Distinct fivethirty fail-open; quoted **This is a lexical permission gate, not a shell parser or sandbox.** [atulify/omp-plugin-jev-router](https://github.com/atulify/omp-plugin-jev-router): fail-open to advanced; **0.75**; routing ≠ permission. [aglowinthefield/hermes-typesafe-plugins](https://github.com/aglowinthefield/hermes-typesafe-plugins): shadow default, fail open; **0.70–0.90**. [Zafer-Liu/jev-demo-rag](https://github.com/Zafer-Liu/jev-demo-rag): relevance ≥**2** AND injection <**0.5**; *theirs* **83%** saved not a ROC. [Zafer-Liu/jev-demo-moderator](https://github.com/Zafer-Liu/jev-demo-moderator): never auto-delete; *theirs* ~**$20/M**. [Zafer-Liu/jev-demo-guardrails](https://github.com/Zafer-Liu/jev-demo-guardrails): action Choice encodes policy; *theirs* 6 messages. [nexibeo/jev-cookbook](https://github.com/nexibeo/jev-cookbook): quoted **your code prepares the data and owns every decision**; *theirs* 24 messages not a ROC. [danielhirt/jev-lab](https://github.com/danielhirt/jev-lab): **Tight, not bitwise**; Distinct copyleftdev/jev-labs. [JairajSustained/llm-routing-jiv](https://github.com/JairajSustained/llm-routing-jiv): quoted **nothing it produces is executed**; *theirs* 23/24 smoke; quoted **The evaluation set has not been scored against live Jev**. [bojansandhaus/jev-lcm-dsh-compaction](https://github.com/bojansandhaus/jev-lcm-dsh-compaction): quoted **not a complete TypeScript port**; **Installation does not select the active engine automatically**. [bojansandhaus/jev-lcm-hermes-compaction](https://github.com/bojansandhaus/jev-lcm-hermes-compaction): **Installation does not select the active engine automatically**; Distinct dsh-compaction. [soyelmismo/laya-multilingual-onnx](https://huggingface.co/soyelmismo/laya-multilingual-onnx): Not TypeSafe Jev; *theirs* 250 to 300ms. [shimo4228/jev-skill-router](https://github.com/shimo4228/jev-skill-router): quoted **A secret pasted into a prompt is sent as typed**; inject ≠ grant. [vlasvar/jev-research](https://github.com/vlasvar/jev-research): **advertised research app ≠ shipped source**; greek-scrabble pending rename. [wangmiaozero/laya-router-skill](https://github.com/wangmiaozero/laya-router-skill): quoted **sole approval gate**; `advisory: true`; quoted **The Laya output is advisory only**. [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router): quoted **Routing is fail-open**; **0.3**; routing ≠ permission. [BillionsBobby/JevRouter](https://github.com/BillionsBobby/JevRouter): quoted **Jev owns the decision probabilities**; *theirs* **44%** not a rh-guard ROC. [ba2slk/jev-command-gate](https://github.com/ba2slk/jev-command-gate): quoted **classified only, not executed**; **0.60** uncalibrated; API error → `ask`. [andrei10k/claude-jev-model-router](https://github.com/andrei10k/claude-jev-model-router): quoted **never hurt**; tool-set first; observe default; **0.15** / **0.3**. [Ryder-MHumble/Awsome-Jev-Router](https://github.com/Ryder-MHumble/Awsome-Jev-Router): quoted **never an automatic action**; *theirs* **256**. [Akashdb5/jev-router](https://github.com/Akashdb5/jev-router): quoted **GateUnavailable**; **0.95** / **0.88**; *theirs* **86.2%** not a rh-guard ROC. [jimmyliao/jev-storyboard-lab](https://github.com/jimmyliao/jev-storyboard-lab): `check_segment()`; **0.6**. [daviddl9/jev-router](https://github.com/daviddl9/jev-router): quoted **Fresh context is not a sandbox**. [1105623876/qwenpaw-jev-memory-gate](https://github.com/1105623876/qwenpaw-jev-memory-gate): **0.50**; skip ≠ deny. [kyle-chalmers/typesafe-jev-incident-router](https://github.com/kyle-chalmers/typesafe-jev-incident-router): registry first; illustrative. [Iskandeur/system1-system2](https://github.com/Iskandeur/system1-system2): **advertised demo ≠ shipped source**. [EricsenSemedo/t3code-jev](https://github.com/EricsenSemedo/t3code-jev): **advertised Jev routing ≠ shipped source**. [yjsplay2002/jev-router-dashboard](https://github.com/yjsplay2002/jev-router-dashboard): quoted **CLI exit success alone is not quality verification**. [grapefruit0205/jev-save](https://github.com/grapefruit0205/jev-save): quoted **never blocks an efficiency judgment**. [Joker666/Reflex](https://github.com/Joker666/Reflex): **0.85**; distinct reflex-gate. [DowLucas/browser-jev](https://github.com/DowLucas/browser-jev): fail **0.9** AND severity **3**. [AltSlate-Labs/certo](https://github.com/AltSlate-Labs/certo): quoted **not affiliated with TypeSafe**. [gbesse/agent-mandates](https://github.com/gbesse/agent-mandates): quoted **authorizationGranted: false**. [taifoon-io/n8n-nodes-typesafe](https://github.com/taifoon-io/n8n-nodes-typesafe): quoted **Nothing fails open**.
Cousin, not this sidecar.

## Polarity

Phrase every hazard Noul so a high number means the hack is present. Block on
`noul >= t`. Inverting to "is this safe" and raising `t` shrinks the reject
band. Advisory kinds (`proxy_metric`, `heldout_blindness`, `coverage_theater`,
`sycophancy_eval`) never deny by themselves.
