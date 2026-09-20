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

[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) is runtime tool-call authorization before side effects: deterministic policy owns `ALLOW` / `REVIEW` / `BLOCK`; Jev supplies evidence. **Jev supplies evidence. Code owns authority.** A positive model score never overrides a deterministic security failure. **Schema-valid ≠ intent-matched.** Enforced `ALLOW` issues a **single-use Action Grant** bound to the exact tool call; replayed, expired, mutated, and unknown permits fail closed. A Noul is not a permit. Early public MVP; current SDK `wrapTool` is advisory until a gateway. No Claude/Cursor hook pack — do not merge into `examples/`. Compose with construct-auto-classifier and jev-lens. Cousin, not this sidecar.

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

[agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) is a dual-gate MCP proxy plus Claude hooks: screen tool calls **before they run** and results **before the agent reads**. Shadow / enforce / strict; never auto-approves. InjecAgent AUC **0.976** is not a safety proof. A shape-mismatched replacement is **discarded without complaint** (advertised screened ≠ served payload; silent FALLBACK cousin). Do not merge into `examples/`. Cousin, not this sidecar.

[opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate) is an OpenCode `context` hook: four Nouls; `isWorkThreshold` 0.5 / `dimensionThreshold` 0.75 inject a system directive to ask and not start tool calls this turn. **The gate is a system directive, not a hard block.** Hope the model asks (jev-carryforward 0/4). Treating that soft inject as a safety veto is confidence theater. Do not merge into `examples/`. Cousin, not this sidecar.

[opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner) is an OpenCode port of [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) via the `context` hook. Keep/truncate/drop applies to the **request view**; persisted history is never modified. Default `keepThreshold` **0.15** vs upstream **0.5**. Measured `removedMessages` **282** is not a quality claim. Dropping results can erase eval evidence. Do not merge into `examples/`. Cousin, not this sidecar.

[yolo-shell](https://github.com/riz007/yolo-shell) is a destructive-shell interceptor: ~2ms local fast-path, then Jev with a 200ms deadline, then a 40-rule deterministic engine. **no silent fail-open when Jev is down.** Crash / unexpected exit still allows. `YOLO_BYPASS=1` and `yolo ` skip the gate. Treating the Jev `action` Choice as the sole veto without the local floor is soundness theater. Do not merge zsh/bash/fish hooks into `examples/`. Cousin, not this sidecar.

[jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel) is HA gate + readback: Jev recommends; policy in code; **Command sent ≠ state confirmed**; **action ≠ verified outcome**. Review is shadow. Unavailable ≠ success. Attention ≠ verdict. Do not merge into `examples/`. Cousin, not this sidecar.

[herdr-jev](https://github.com/muthuishere/herdr-jev) is a Herdr prompt-path gate via openjev NLI. Soft permission/gate that **owns** the submit path. Quoted README: **Nothing here works yet.** Distinct from TypeSafe Jev. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness) is a rebrand of [jev-harness](https://github.com/AntonioCoppe/jev-harness) (`src/` SHA identical). README trajectory verification is **advertised capability ≠ shipped module**. Real pattern: **shadow vs live** (`shadow_noop` / `intendedAction`). Example 0.85 is uncalibrated. Fold gate/eval-integrity only. Do not merge into `examples/`. Cousin, not this sidecar.

[alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard) is a Claude PreToolUse Bash classifier + PostToolUse injection sentinel. **Tripwires never deny** (only block auto-allow). Fail-open (no key / timeout → silent). `allow` bypasses host deny rules. Distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard) and [pablozr/JevGuard](https://github.com/pablozr/JevGuard). Contrast yolo-shell named floor. Do not merge `guard.py` into `examples/`. Cousin, not this sidecar.

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

[one-dollar-tahoe](https://github.com/PavitarSinghArneja/one-dollar-tahoe) is a prompt-injection eval including TypeSafe Jev. Quoted: **demonstration set, not a statistically powered** benchmark. Thin card. Do not merge into `examples/`. Cousin, not this sidecar.

[pi-jev-sentinel](https://github.com/harshwasan/pi-jev-sentinel) is a Pi/Claude/Codex integrity gate: Jev on calls, outputs, and replies. Quoted: **never auto-allows** (fail-closed ask). **allow / ask / warn** ladder; secret scrub before Jev; optional task pin. Contrast fail-open pruners / [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate). Distinct from alsoleg89/jev-guard. Quoted: **Prompt injection is not solved.** Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills) is a Hermes skill pack: routing / memory (hidden-instruction) / compaction / skill select / triage / computer-use gated by **safe action tables**; dashboard `on`/`shadow`/`off`. Quoted README: **Everything fails open**. Named lexical skip, not live Jev (acknowledgements). Quoted `skills/jev-memory/SKILL.md`: **Never read `dropped_injection_ids`**. Quoted enablement: **Shadow first, and mean it**. Distinct from [rsdkrasen/hermes-jev-router](https://github.com/rsdkrasen/hermes-jev-router) and [cdepuy/hermes-skill-router](https://github.com/cdepuy/hermes-skill-router); in-repo `jevkit/` ≠ [jonathanavis96/jev-kit](https://github.com/jonathanavis96/jev-kit). Fold integrity only, not CUA recipes. Do not merge into `examples/`. Cousin, not this sidecar.

[hermes-skill-router](https://github.com/cdepuy/hermes-skill-router) is a local Laya skill inject via the **user-message channel**. Quoted: **Fail-open** if Laya is down. Quoted: **Accuracy is ~good, not perfect**. Contrast hermes-switchyard (**never loads the skill**) — this plugin *does* inject. Inject ≠ grant. Same-named [xXLODXx/hermes-skill-router](https://github.com/xXLODXx/hermes-skill-router) / [LLM-Architects/hermes-skill-router](https://github.com/LLM-Architects/hermes-skill-router) / [bkutasi/hermes-skill-router](https://github.com/bkutasi/hermes-skill-router) / [MKI13/hermes-skill-router](https://github.com/MKI13/hermes-skill-router) — this card is cdepuy. Hermes prompt-cache, not jevcache. Do not merge into `examples/`. Cousin, not this sidecar.

[dgp](https://github.com/numerous-com/dgp) is typed assessment then application-side **guarded commit**. Assessors do not execute. Quoted README: **application code retains control**. Quoted DGP `docs/TYPESAFE_JEV.md` (theirs, not TypeSafe): **Speculative assessments cannot authorize effects**; cache hit ≠ live Jev. Primary protocol fold is in Augustus; here the integrity boundary. Do not merge into `examples/`. Cousin, not this sidecar.

[localjev](https://github.com/githubnext/localjev) is a thin soundness-theater cousin: wire-compatible prompted JSON probs, not logits. Evaluate calibration on your workload before consequential decisions. Not a new hook pack.

[laya](https://github.com/NandhaKishorM/laya) is an open System One head. 0.85 RLCD gate is still soft; Khmer OOD 0.000 at 95.2% confidence. Future backend, not a drop-in ROC.

[jev-labs](https://github.com/copyleftdev/jev-labs) wraps a probabilistic oracle in a formal consensus kernel. **Never confidently wrong.** Escalate-not-guess: under severe chaos accuracy drops but wrong=0 because the system escalates. Anti-pattern: TLA+/model-check theater as proof the soft judge is safe without an exception path. Cousin, not this sidecar.

[seal](https://github.com/Reasonofmoon/seal) is an advance gate plus a visible coverage ledger (`auto` | `code` | `human` | `escalate`). Effects stay locked while escalations remain open. **Hiding escalations is a product lie.** **schema-valid ≠ semantically correct.** **mint ≠ product brain**. Cousin, not this sidecar.

[firehose-judge](https://github.com/ragelink/firehose-judge) is typed Jev on the Bluesky firehose (Durable Object). Uncertain answers route to a "needs a human" lane; nsfw is dropped server-side. Soft judgment is never the sole veto. Cousin, not this sidecar.

[jav-email-cascade](https://github.com/skiingfalcon/jav-email-cascade) is decide → policy → LLM leftover. A Noul at 0.5 means "cannot tell" (never rounded). `injection_suspected` always force-review even with an LLM configured. Force-review is a real lane, not soundness theater. Cousin, not this sidecar.

[waymode](https://github.com/mossburgh/waymode) lets the host keep permissions, validation, and handlers; Jev decides over typed actions on the live UI with retained evidence. Jev confidence grants no permission (sensor ≠ verdict). Cousin, not this sidecar.

[skill-broker](https://github.com/adamjralph/skill-broker) keeps authority in deterministic code; Jev judges relevance only and never grants access. Jev relevance ≠ authority — the model never grants. Direct sibling to turnstile (evidence ≠ authority). Anti-pattern: letting System One confidence expand the allowed skill set. Cousin, not this sidecar.

[jev-lens](https://github.com/rashedInt32/jev-lens) is an advisory Claude Stop hook: it never blocks, never edits, and never says green unless sure (`JEV_LENS_GREEN` 0.9). Attention/VOI, not authority — keep it separate from skill-broker / construct-auto-classifier. Cousin, not this sidecar.

[jev-preflight](https://github.com/muse0509/jev-preflight) is a Claude Code Stop-hook: eight risk axes on a redacted turn diff; assist mode is one reinspect then finish. Fail-open. Default **0.85 threshold is uncalibrated**. escalate-attention ≠ hard block; can be gamed by ignoring the reinspect. Cousin of jev-lens; not this sidecar.

[jev-security-scan](https://github.com/win4r/jev-security-scan) is a skill/MCP supply-chain scanner: static rules then Jev; policy in code (both Nouls ≥ 0.85, window ≥ 0.6, active ≥ 0.7). **Unflagged ≠ certified safe.** Does not execute the target. Direct sibling shape (structural + Jev), different job. Cousin of is-malicious / jevscan / safe-sh. Complementary to jev-preflight and jev-carryforward 0/4. Not this sidecar.

[jev-decisions](https://github.com/bojansandhaus/jev-decisions) is a Hermes pre-tool review plugin. `JEV_ENABLE_HOOKS` opt-in; even then reviews stay advisory and do not block. **Jev review is advisory; Hermes policy remains authoritative.** A **failed review grants no permission**. Local human routing for destructive / credential / irreversible-external. Cousin of skill-broker / turnstile. Complementary to jev-preflight and jev-carryforward (hope the model looks). Not this sidecar.

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

alsoleg89/jev-guard
  Claude PreToolUse Bash classifier + PostToolUse injection sentinel
  Tripwires never deny (only block auto-allow); fail-open
  allow bypasses host deny rules; 0.95 Nouls are not a safety veto
  distinct from leepokai/jev-guard and pablozr/JevGuard
  do not merge guard.py into examples/

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
  Jev judges relevance only; never grants access
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
boundary. [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard)
re-checks target and instruction snapshots before committing. Cousin, not this sidecar.

## Polarity

Phrase every hazard Noul so a high number means the hack is present. Block on
`noul >= t`. Inverting to "is this safe" and raising `t` shrinks the reject
band. Advisory kinds (`proxy_metric`, `heldout_blindness`, `coverage_theater`,
`sycophancy_eval`) never deny by themselves.
