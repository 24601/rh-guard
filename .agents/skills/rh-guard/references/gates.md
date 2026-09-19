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

[safe-sh](https://github.com/EpicEric/safe-sh) is static shell analysis with Jev (tree-sitter bash chunks; never executes). Contrast toolgate fail-safe pre-exec. Same extract-then-Jev layering as jevscan. Gate-adjacent; not a reward-hack detector.

[interlock](https://github.com/somoore/interlock) is a capability kernel: Jev is a sensor; policy in code decides allow / ask / block. Canaries + closed action space; secrets never enter the agent. Critique of post-hoc "is this dangerous?" firewalls with real secrets still in scope. 38-case regression suite (not a blind paper). Soft judgment is never the envelope. Cousin, not this sidecar.

[port-cleanup](https://github.com/epiphany-dynamics/port-cleanup) is a gate UX exemplar: human confirms irreversible stop; shields override Jev; identity re-check before SIGTERM; app-owned explanation text, not model prose. Never auto-kills. Cousin, not this sidecar.

[jev-dspy-control-plane](https://github.com/manikanda-kumar/jev-dspy-control-plane) is a typed control plane: fraud/security force a human path even when the classifier predicts routine; after the plane fixes the action, the LLM cannot add routes or tools. Same structural-first shape. Cousin, not this sidecar.

[cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode) is a Command Code auto-permission gate: `beforeToolCall` after the host permission check; policy `decide` in code (`allow` / `deny` / `escalate`). `within_scope ≤ 0.25` is out of scope (deny). Escalation always goes to a human, never back to the model. Default `auto-fail-closed` true. Jev is a sensor; policy in code owns the verdict. Do not merge into `examples/`. Cousin, not this sidecar.

[omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) is an Oh My Pi / pi-coding-agent adapter: `jev_acceptance_gate` plus `jev_route`. Fail-open, never fail-catch. Gate-host adapter; do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

[omp-greenlight](https://github.com/SemetricLabs/omp-greenlight) is a measured OMP approval-gate (default 0/94 unsafe). The operator owns the risk dial; the plugin never tunes its own threshold. Graded allow, not hard deny. Permission ≠ probability. Cousin, not this sidecar.

[construct-auto-classifier](https://github.com/godspede/construct-auto-classifier) is an effect-based OpenCode / Antigravity (`agy`) shell PreToolUse gate: structural fast-deny/fast-allow first, then Jev Choice plus nine independent risk Nouls (`data_loss`, …). Allow only if choice is `allow` at `jev.minConfidence` (0.6) and every risk is below `jev.riskThreshold` (0.7). Certified **0 dangerous** commands allowed for Jev; chat LLMs all leaked. Operator owns the dial. Privilege Is Not a Verdict. Pair with dinostomp before hard-gating on those scores. Do not merge into `examples/`. Cousin, not this sidecar.

[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) is runtime tool-call authorization before side effects: deterministic policy owns `ALLOW` / `REVIEW` / `BLOCK`; Jev supplies evidence. **Jev supplies evidence. Code owns authority.** A positive model score never overrides a deterministic security failure. **Schema-valid ≠ intent-matched.** Enforced `ALLOW` issues a **single-use Action Grant** bound to the exact tool call; replayed, expired, mutated, and unknown permits fail closed. A Noul is not a permit. Early public MVP; current SDK `wrapTool` is advisory until a gateway. No Claude/Cursor hook pack — do not merge into `examples/`. Compose with construct-auto-classifier and jev-lens. Cousin, not this sidecar.

[turnstile](https://github.com/zyphr-labs/turnstile) is an agent action guardrail: deterministic policy then Jev, with receipts and threshold replay. **Jev never grants authority that policy denied.** Same doctrine as actiongate-jev. Observe-mode default; do not merge into `examples/`. Cousin, not this sidecar.

[pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) persists user constraints across tool calls and context compaction and checks every side-effecting call against what the user said (anti instruction-drift). Jev never writes policy; code owns the ledger and the block. Shadow by default; fail-open. Complementary to jev-carryforward 0/4. Do not merge into `examples/pi-extension.ts`. Cousin, not this sidecar.

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
  contrast toolgate fail-safe pre-exec

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

turnstile (zyphr-labs/turnstile)
  Jev never grants authority that policy denied
  deterministic policy then Jev; receipts + threshold replay
  observe-mode default; do not merge into examples/

pi-heed (Nyarlathoteppppp/pi-heed)
  persist user constraints across tool calls and compaction
  check every side-effecting call against what the user said
  Jev never writes policy; code owns the ledger and the block
  shadow default; fail-open; do not merge into examples/pi-extension.ts

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
not a permit. Cousin, not this sidecar.

## Polarity

Phrase every hazard Noul so a high number means the hack is present. Block on
`noul >= t`. Inverting to "is this safe" and raising `t` shrinks the reject
band. Advisory kinds (`proxy_metric`, `heldout_blindness`, `coverage_theater`,
`sycophancy_eval`) never deny by themselves.
