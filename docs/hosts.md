# Host adapters

RH Guard scores every host through the same `scoreEvent` path. Adapters
only change install location and the deny JSON the host understands.
`examples/` is the source of truth. Agent-visible text is always
`AGENT_DENY` (opaque filesystem-integrity copy). Scores stay on the operator
workbench.

**Sibling, not a merge.** [jevgate](https://github.com/thevibeworks/jevgate)
uses the same shape: an allowlist proves what may run; Jev judges only the
rest. Hard envelope owns safety; soft judgment is never the sole veto
(fail-open: it cannot block). rh-guard's structural deny is that first gate;
the System One sidecar is the rest. Do not merge the products.

[GLiGuard](https://github.com/fastino-ai/GLiGuard) is an encoder-based LLM
prompt/response safety guard; rh-guard is a coding-agent reward-hack / eval
integrity gate (complementary, not a competitor). [gliner25-compaction](https://github.com/m-newhauser/gliner25-compaction) is the same encoder family (GLiNER2.5) on Claude context compaction, not prompt/response safety and not reward-hack detection. Extractive character-offset spans, not generated summaries; uncertain → fail-closed `keep_full`; hard shell/mutation policy overrides the soft model; `shadowMode` default true before rewriting history. Sibling envelope next to jevgate (opposite default).

**Sibling, not a merge.** [Abide](https://github.com/coldteadotai/abide)
also ships Claude / Codex / OpenCode hooks, but it scores project-instruction
rules on diffs, not reward-hack hazard. Its hooks fail-open (exit 0; no key
→ edit proceeds). Soft Jev verdicts are banded (repair / note / silence);
they are not a hard veto. Do not merge adapters; Abide does not catch
reward hacking.

`hooks/run.ts <flavor>` reads JSON on stdin. Flavors:

| argv | Output shape |
|---|---|
| `claude` | Claude Code hook JSON |
| `cursor` | Cursor `hooks.json` JSON |
| `grok` | `{ decision: "deny", reason }` (not Claude JSON) |
| `generic` | `{ block, reason? }`; exit 2 on block |
| `codex` | Claude-like `hookSpecificOutput.permissionDecision` (Codex-safe; no `continue`) |
| `dsh` | alias of `generic` (DeepSeek Harness stdin / adapter) |
| `exo` | alias of `generic` (no native hooks; wrap `ToolRuntime.execute`) |
| `pi` / `prime` / `amp` | host plugin JSON; prefer the TypeScript copies in `examples/` |

HTTP sidecar: `POST /api/hooks/<flavor>` (Next.js 16 dynamic `params` is a
Promise). Claude and Cursor URLs stay `/api/hooks/claude` and
`/api/hooks/cursor`. Codex and DeepSeek Harness have **no HTTP hook type on
the host**; `POST /api/hooks/codex` and `/api/hooks/dsh` return 404. Use
`hooks/run.ts`. Exo has **no native hooks.json** and no host HTTP hook type;
the sidecar still serves `POST /api/hooks/exo` (alias of generic
`{ block, reason? }`) for the `ToolRuntime` wrap. Pi, Prime, and Amp reach
HTTP from the copied plugin.

## Generic stdin schema

Input (any one of these is enough; Claude / Cursor / Grok payloads also parse):

```json
{
  "event": "tool_call",
  "tool": "Bash",
  "input": { "command": "…" },
  "path": "tests/test_foo.py",
  "prompt": "",
  "transcript": ""
}
```

Aliases: `tool_name` / `toolName` for `tool`; `tool_input` / `toolInput` for
`input`; Exo `functionName` / `arguments`. See
[`examples/generic-event.json`](../examples/generic-event.json).

Output: `{ "block": true, "reason": "…" }` or `{ "block": false }`. Exit 2
on block.

```bash
npx tsx hooks/run.ts generic < examples/generic-event.json
npx tsx hooks/run.ts dsh < examples/generic-event.json
npx tsx hooks/run.ts exo < examples/generic-event.json
```

## Host notes

### Claude Code

Merge [`examples/claude-settings.json`](../examples/claude-settings.json)
(HTTP) or [`examples/claude-command-settings.json`](../examples/claude-command-settings.json)
(fail-closed PreToolUse). Plugin pack: `hooks/claude-hook.sh`. HTTP is
fail-open (non-2xx / timeout do not block). Sibling permission gate (not this copy): [claude-code-jev](https://github.com/RahulBalakavi/claude-code-jev) — OpenRouter `typesafe/jev-1.13` PreToolUse (230.8ms p50 / 263.9ms mean); low-confidence and network fail → human. Additive; Anthropic auto-mode is not replaceable via a supported API. Distinct pre-execution SDK cousin (not this copy): [toolgate](https://github.com/fdemir/toolgate) — `allow` / `block` / `review`; error/timeout fail-safe stop; not [ndolinschi/toolgate](https://github.com/ndolinschi/toolgate). Soft-judgment UX cousin (not this copy): [jev-reviewer](https://github.com/egma-ai/jev-reviewer) — P0/P1/P2 attention expand/collapse; never equate P0 with blocked as unsafe. Static shell cousin (not this copy): [safe-sh](https://github.com/EpicEric/safe-sh) — `curl | safe-sh`; `--error-on`; Jev analysis, never executes; secrets-shaped Scores before hard deny; contrast toolgate fail-safe pre-exec. Capability-kernel cousin (not this copy): [interlock](https://github.com/somoore/interlock) — Jev is a sensor; policy in code; canaries + closed action space; secrets never enter the agent; do not merge `interlock gate --claude-code` into `examples/`. Command Code auto-permission cousin (not this copy): [cmdc-auto-mode](https://github.com/mja00/cmdc-auto-mode) — `beforeToolCall` after host permission check; policy `decide` in code; `within_scope ≤ 0.25` out of scope (deny); escalate to a human, never the model; default `auto-fail-closed` true. Do not merge into `examples/`. Effect-based OpenCode/agy shell cousin (not this copy): [construct-auto-classifier](https://github.com/godspede/construct-auto-classifier) — Privilege Is Not a Verdict; structural rules then Jev Choice + nine risk Nouls (`data_loss`, …); certified 0 dangerous allowed for Jev; operator-owned minConfidence/riskThreshold; do not merge into `examples/`. Runtime tool-authorization cousin (not this copy): [actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev) — Jev supplies evidence. Code owns authority; a positive score never overrides a deterministic security failure. Schema-valid ≠ intent-matched. single-use Action Grant bound to the exact tool call; replayed/expired/mutated permits fail closed; `wrapTool` is not `hooks.json`. Intent-aware SDK wrap cousin (not this copy): [AgentGhost](https://github.com/reddpy/AgentGhost) (`@agentghost/sdk`) — AgentGhost *is* the tool's execution function; `ALLOW`/`ASK`/`DENY`; ASK/DENY throw so approval cannot be silently skipped; default `failMode: "closed"`; do not merge into `examples/`. Claude action-guardrail cousin (not this copy): [turnstile](https://github.com/zyphr-labs/turnstile) — Jev never grants authority that policy denied; receipts + threshold replay; do not merge `turnstile-hooks.json` into `examples/`. Direct sibling (not this copy): [skill-broker](https://github.com/adamjralph/skill-broker) — never grants access; Jev relevance ≠ authority. Formal-consensus cousin (not this copy): [jev-labs](https://github.com/copyleftdev/jev-labs) — Never confidently wrong; escalate-not-guess; TLA+ is not safety without an exception path. Advance-gate cousin (not this copy): [seal](https://github.com/Reasonofmoon/seal) — coverage ledger; Hiding escalations is a product lie; schema-valid ≠ semantically correct; mint ≠ product brain. Sureness UX cousin (not this copy): [how-sure-is-jev](https://github.com/adarc8/how-sure-is-jev) — CERTAIN/CONFIDENT/LEANING/TORN/CLUELESS; gaming the sureness metric is not task truth. CI PR-triage cousin (not this copy): [ci-gatekeeper-bot-jev](https://github.com/NemanjaManic/ci-gatekeeper-bot-jev) — `should_review` / `risk` / `route` / `touches_secrets`; threshold gaming surface. Changed-file CI cousin (not this copy): [jev-pr-review](https://github.com/ohernandezdev/jev-pr-review) — shadow-mode only until calibrated; automerge path unwritten; calibration-first before any hard merge gate. Whole-repo intent cousin (not this copy): [jev-intent-review](https://github.com/yottayoshida/jev-intent-review) — `VERIFIED` / `VIOLATION` / `UNKNOWN`; the diff is a search hint; incomplete-change gaming. Routing/latency cousin (not this copy): [slo-router](https://github.com/zeeshan8281/slo-router) — Jev on the hot path preserved accuracy but 77.93→490.38 ms p95; fail-open local features; exactness never overrides context/capability. Advisory Stop-hook cousin (not this copy): [jev-lens](https://github.com/rashedInt32/jev-lens) — never blocks; never says green unless sure. Claude Stop-hook cousin (not this copy): [jev-preflight](https://github.com/muse0509/jev-preflight) — eight risk axes; one reinspect; 0.85 threshold is uncalibrated; escalate-attention ≠ hard block; fail-open. Skill/MCP supply-chain cousin (not this copy): [jev-security-scan](https://github.com/win4r/jev-security-scan) — static checks + Jev; Unflagged ≠ certified safe; does not execute the target. Hermes pre-tool cousin (not this copy): [jev-decisions](https://github.com/bojansandhaus/jev-decisions) — `JEV_ENABLE_HOOKS` opt-in; Jev review is advisory; failed review grants no permission. Optional PreToolUse cousin (not this copy): [jev-use](https://github.com/shitianfang/jev-use) — `jev_gate` deny/ask only, fails open; only ever tightens; install does not enable the gate; 12/12 is not a safety proof. MCP VOI-admission cousin (not this copy): [jevex](https://github.com/jimmyhealer/jevex) — `codebase_investigate`; Jev ranks a shortlist of files to read; fail-open vs fail-closed on Jev error is undocumented; treating the shortlist as the only files that exist is a soft-score-as-hard-gate. Jev-gated commit-msg cousin (not this copy): [commitjev](https://github.com/yodablocks/commitjev) — calibration-first; hook fail-open on check failure; middle band is review. Multi-host routing-proxy cousin (not this copy): [jev-routing](https://github.com/nekowasabi/jev-routing) — Go proxy; not MCP; default `filter`; `forced` only with a verified real Jev answer; `tools[]` → 1 schema. Hermes host-adapter cousin (not this copy): [hermes-plugin-jev](https://github.com/robbyczgw-cla/hermes-plugin-jev) — shadow default; cannot grant permission; contrast jev-decisions / hermes-jev-router. Guardrail-demo cousin (not this copy): [jev-vs-llm-guardrails-intent-router](https://github.com/TeoMastro/jev-vs-llm-guardrails-intent-router) — 96.8% route acc; classify accuracy is not a safety proof. Eval-integrity cousin (not this copy): [jev-carryforward](https://github.com/Dharundp6/jev-carryforward) — 0/4 recall; hope the model looks. Silent FALLBACK cousin (not this copy): [classifier-dev](https://github.com/mrmps/classifier-dev) — advertised backend ≠ served backend; F1 0.546 vs ~0.800; digest marks `FALLBACK`; do not hard-gate on undeclared-fallback confidence. Calibrated PR-review cousin (not this copy): [jev-gate](https://github.com/totally-tim/jev-gate) — Action + CLI + OpenCode; **soft-score-as-hard-rank**; require calibration evidence + `--no-gate` / human override; not thevibeworks/jevgate; not choxos/jev-reviewer. Claude PreToolUse Art Director cousin (not this copy): [claude-jev-warden](https://github.com/connectedGraph/claude-jev-warden) — quality ≥ 80% or exit 2; **attention≠verdict** / **warden-as-hard-gate**; escalate taste/quality, block only eval-asset / structural; do not merge `warden.js` into `examples/`. Claude PreToolUse Airlock cousin (not this copy): [jev-kit](https://github.com/jonathanavis96/jev-kit) — code first, fail-open hygiene; quoted README **"This is not a security control"**; `[airlock-ok:]` / retry loop; labelled-eval 100% / A/B zero denies are not a rh-guard ROC; Belay anti-done-without-reading; do not merge into `examples/`. Dual-gate MCP/hook cousin (not this copy): [agent-chaperone](https://github.com/agent-chaperone/agent-chaperone) — screens calls before run AND results before the agent reads; never auto-approves; InjecAgent AUC **0.976** is not a safety proof; shape-mismatched replacement **discarded without complaint** (advertised screened ≠ served payload; silent FALLBACK); do not merge into `examples/`. OpenCode ask-before-act cousin (not this copy): [opencode-intent-gate](https://github.com/hoshinodis/opencode-intent-gate) — four Nouls; `isWorkThreshold` 0.5 / `dimensionThreshold` 0.75; **the gate is a system directive, not a hard block**; hope the model asks; do not merge into `examples/`. OpenCode context-hook compaction cousin (not this copy): [opencode-context-pruner](https://github.com/hoshinodis/opencode-context-pruner) — port of [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction); request view only; `keepThreshold` 0.15 vs upstream 0.5; measured `removedMessages` **282** is not a quality claim; evidence-erasure; do not merge into `examples/`. Destructive-shell cousin (not this copy): [yolo-shell](https://github.com/riz007/yolo-shell) — ~2ms fast-path then Jev (200ms deadline) then 40-rule floor; **no silent fail-open when Jev is down**; `YOLO_BYPASS` / `yolo ` skip; crash still allows; do not merge zsh/bash/fish hooks into `examples/`. HA readback cousin (not this copy): [jev-home-assistant-sentinel](https://github.com/bojansandhaus/jev-home-assistant-sentinel) — **Command sent ≠ state confirmed**; **action ≠ verified outcome**; review is shadow; attention ≠ verdict. Herdr prompt-path cousin (not this copy): [herdr-jev](https://github.com/muthuishere/herdr-jev) — openjev NLI; **Nothing here works yet**; do not invent mechanics. jev-harness rebrand cousin (not this copy): [apa-agent-harness](https://github.com/AiPersonacademy/apa-agent-harness) — **advertised capability ≠ shipped module**; **shadow vs live** (`shadow_noop`); 0.85 uncalibrated; do not merge into `examples/`. Claude Bash/injection-sentinel cousin (not this copy): [alsoleg89/jev-guard](https://github.com/alsoleg89/jev-guard) — **Tripwires never deny**; fail-open; `allow` bypasses host deny rules; distinct from [leepokai/jev-guard](https://github.com/leepokai/jev-guard) and [pablozr/JevGuard](https://github.com/pablozr/JevGuard); do not merge `guard.py` into `examples/`. Semantic policy-engine cousin (not this copy): [pablozr/JevGuard](https://github.com/pablozr/JevGuard) — attributed diff + local gate; `UNAVAILABLE` on incomplete evidence; **advertised monorepo ≠ shipped packages**; observe-only. Verify-criteria proving-ground cousin (not this copy): [ybadragon/jev-proving-ground](https://github.com/ybadragon/jev-proving-ground) — planted defect withheld from criteria writers. Local n-gram attention-firewall cousin (not this copy): [jevbrain](https://github.com/Synxneuos/jevbrain) — confidence ≥ 0.80 → `AUTO_ACT` else `REVIEW_QUEUE`; not TypeSafe Jev; silent-fallback if mis-calibrated. Judge/verify crawler cousin (not this copy): [jev-crawlers](https://github.com/russfranky/jev-crawlers) — **unverified lead, never a bug**; **ranking signals**, not calibrated confidence. Probability≠argmax cousin (not this copy): [typed-gate](https://github.com/harshpuri84/typed-gate) — **declining to answer**; 0.40–0.60 band is a refusal; **argmax only** omitted 25. OpenAPI docs-only cousin (not this copy): [jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel) — **documentation-only** consumer breaks; enforce only when breaking AND promise-violation ≥ 0.90. Plain-English PR-condition cousin (not this copy): [if-ai](https://github.com/Victor-Casado/if-ai) — **A passing if-ai check is advisory**; TypeSafe **67.8%** is four workflows, not PR review. Cheap Laya-distill front-gate cousin (not this copy): [nanoprune](https://github.com/dmdjr1409/nanoprune) — **2.8MB**; **0.0% Hallucination Guaranteed** / ECE 2.58% theater. Hermes skill-policy cousin (not this copy): [hermes-switchyard](https://github.com/bgrablin/hermes-switchyard) — **never loads the skill**; ack is **not DLP**; 0.20 local / 0.80 Jev uncalibrated. LangChain/Deep Agents middleware cousin (not this copy): [typesafe_agent_gates](https://github.com/ThiagaoBR/typesafe_agent_gates) — four Nouls at 0.5 **HELD**; **never looser**; **second layer, not a boundary**; **27/27** / **31/31** synthetic, not a rh-guard ROC; do not merge into `examples/`. Paste confirm-gate cousin (not this copy): [jev-pastepilot](https://github.com/buberlo/jev-pastepilot) — **Confirm is a gate, not a formality**; **Confidence is a gate, not proof**; **fail-opens**; do not merge into `examples/`. Decision-ledger cousin (not this copy): [jevcache](https://github.com/hyperspaceai/jevcache) — **cache hit ≠ correctness**; shared fingerprint bundles as calibrated truth / auto-act is trust theater. GEPA-align cousin (not this copy): [sutro-sh/jev-align](https://github.com/sutro-sh/jev-align) — quoted **A higher training score never accepts a proposal automatically**; distinct from caiovicentino/jev-align; hard-gating that GEPA score is soundness theater. Knowledge-compile cousin (not this copy): [enzyme](https://github.com/byenzyme/enzyme) — quoted `when asked` is **guidance compiled for your agent, not an enforced hook**; not PreToolUse; do not hard-gate **catalyst similarity** as deny/allow. Thin soundness-theater cousin (not this copy): [localjev](https://github.com/githubnext/localjev) — wire-compatible prompted JSON probs, not logits; evaluate calibration before consequential decisions; not a new hook pack. Open System One head (not this copy): [laya](https://github.com/NandhaKishorM/laya) — 0.85 RLCD gate is still soft; Khmer OOD 0.000 at 95.2% confidence.

### Cursor

Copy [`examples/cursor-hooks.json`](../examples/cursor-hooks.json) to
`.cursor/hooks.json`. Command stdin. Set `failClosed: true` on shell and
tool gates.

Host-adapter cousin (not this copy): [jev-routing](https://github.com/nekowasabi/jev-routing) — Go proxy for Cursor Agent CLI among others; not MCP; default `filter`; `forced` only with a verified real Jev answer.

### Codex (OpenAI Codex CLI)

Command PreToolUse only: `~/.codex/hooks.json` or `.codex/hooks.json`.
Copy [`examples/codex-hooks.json`](../examples/codex-hooks.json). There is
**no HTTP hook type**.

Deny with `hookSpecificOutput.permissionDecision: "deny"` plus a non-empty
`permissionDecisionReason`. Exit 2 with that JSON.

**Do not send `continue: false` on Codex PreToolUse.** Unsupported fields
mark the hook as failed and Codex **continues the tool** (fail-open).
`failClosedClaudeOutput()` is the Claude wrapper and includes `continue:
false`; Codex uses `failClosedCodexOutput()` instead.

Host-adapter cousins (not this copy): [jev-routing](https://github.com/nekowasabi/jev-routing) — Go proxy; not MCP; default `filter`; `forced` only with a verified real Jev answer. [jev-runway](https://github.com/IPECTER/jev-runway) — Codex Jev proxy; LICENSE-only public tree at capture; do not invent authorization mechanics. Jev-gated commit-msg cousin (not this copy): [commitjev](https://github.com/yodablocks/commitjev) — calibration-first; fail-open on check failure.

### Grok Build

`~/.grok/hooks/*.json` or `.grok/hooks/*.json`. PreToolUse is the only
blocking event. Command or HTTP. Deny shape is `{ "decision": "deny",
"reason": "…" }` — not Claude JSON. Exit 0 allows; exit 2 denies. Crash,
timeout, and malformed output are **fail-open** on the host
([docs](https://docs.x.ai/build/features/hooks)).

[`examples/grok-hooks.json`](../examples/grok-hooks.json) runs
`npx tsx hooks/run.ts grok`. Prefer [`hooks/grok-hook.sh`](../hooks/grok-hook.sh)
when you need fail-closed: it POSTs to `/api/hooks/grok` and always emits
an explicit deny JSON + exit 2 if the sidecar is down.

Host-adapter cousin (not this copy): [jev-routing](https://github.com/nekowasabi/jev-routing) — Go proxy; not MCP; default `filter`; `forced` only with a verified real Jev answer; PreCompact cannot strip the catalog.

### Pi

Copy [`examples/pi-extension.ts`](../examples/pi-extension.ts) to
`~/.pi/agent/extensions/` (global) or `.pi/extensions/` (project). The
extension listens on `tool_call` and returns `{ block: true, reason,
terminate: true }` (Pi supports `terminate`). It calls HTTP `/api/hooks/pi`
(or stdin `hooks/run.ts pi` for tests). On sidecar failure it fail-closes
in the plugin. Sibling Pi bash gate (not this copy): [pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) — code-computed state then Jev; `commandRules` can hard-block; no key → fail-closed. Contrast jevgate allowlist + fail-open rest. oh-my-pi cousin (not this copy): [omp-auto-mode](https://github.com/alexsatch/omp-auto-mode) — `safe`/`ask`/`unsafe`; classifier failure defers to omp approval (fail-open). Oh My Pi acceptance-gating cousin (not this copy): [omp-jev-extensions](https://github.com/luw2007/omp-jev-extensions) — `jev_acceptance_gate` + `jev_route`; fail-open, never fail-catch. Measured OMP approval-gate cousin (not this copy): [omp-greenlight](https://github.com/SemetricLabs/omp-greenlight) — graded allow, not hard deny; default 0/94 unsafe; operator owns the risk dial. instruction-drift cousin (not this copy): [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) — persists user constraints across tool calls and context compaction; Jev never writes policy; shadow default; fail-open. Pi content-judge cousin (not this copy): [pi-jev-guard](https://github.com/Reindeer-AI/pi-jev-guard) — `edit`/`write` vs Markdown rules; informative default; 0.85 uncalibrated; soundness theater if treated as a hard gate. Pi control-plane cousin (not this copy): [pi-jev-control](https://github.com/goodruizhan/pi-jev-control) — not a content-judge; deterministic tool-gate + Jev; GUI never force-click. Optional Pi/Claude `jev_gate` cousin (not this copy): [jev-use](https://github.com/shitianfang/jev-use) — deny/ask only, fails open; only ever tightens. Pi verbatim-compaction cousin (not this copy): [pi-jev-compact](https://github.com/dev-willbird1936/pi-jev-compact) — keep-windows before Jev; fail-open to the built-in LLM summarizer; `keepThreshold` 0.5 uncalibrated; complementary to pi-heed / carryforward 0/4. Do not merge into `examples/pi-extension.ts`. Pi fail-open pre-exec cousin (not this copy): [pi-jev-gate](https://github.com/fivethirty/pi-jev-gate) — block if `choice === "block"` OR `p(block) ≥ 0.50`; **failing open**; `/checker` can disable; distinct from jevgate / jev-gate / pi-jev-approver. Do not merge into `examples/pi-extension.ts`.

Optional Claude-compatible settings via `@hsingjui/pi-hooks` (command
handlers only; HTTP / prompt / agent types are not supported): merge
[`examples/pi-hooks-settings.json`](../examples/pi-hooks-settings.json)
into `.pi/settings.json` or `~/.pi/agent/settings.json`. Matchers use Pi's
lowercase tool names (`bash|edit|write`).

### Amp

Copy [`examples/amp-plugin.ts`](../examples/amp-plugin.ts) to
`.amp/plugins/` or `~/.config/amp/plugins/`. `amp.on("tool.call")` returns
`allow` or `reject-and-continue` with `AGENT_DENY`. Thrown plugin errors
are ignored by Amp (fail-open), so the copy catches and returns
`reject-and-continue`. Do not use `action: "error"` as a deny.
HTTP `/api/hooks/amp` is how copies score. In-repo you may import
`scoreEvent` at the top of the module instead of `fetch`.
[Plugin API](https://ampcode.com/docs/plugin-api).

### Prime Agent

Copy [`examples/prime-extension.ts`](../examples/prime-extension.ts) to
`~/.prime/agent/extensions/` or `.prime/agent/extensions/`. Same
`{ block, reason }` shape as Pi. Prime docs do **not** include `terminate`.

### DSH (generic/adapter)

This is the real [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(Basit / DarwinX). Its Claude Code and Codex **command-hook** bridges run
unmodified `hooks/run.ts claude` or `codex` at `tools/pre-execute`. HTTP
hook types are skipped. There is no separate drop-in DSH `hooks.json`.

`tools/pre-execute` is the pre-tool gate, so both adapters map it onto
`PreToolUse`: the Claude bridge answers with `permissionDecision: "deny"`
(`hookEventName: "PreToolUse"`) and the Codex bridge with its Codex-safe deny
JSON. Both **exit 2** on a deny for this event, because the bridge only fails
closed on a non-zero exit. Claude Code's own `PreToolUse` still exits 0 with
the deny JSON, which is what that host expects.

For a host-neutral stdin adapter use `hooks/run.ts dsh` (alias of
`generic`) with [`examples/generic-event.json`](../examples/generic-event.json).
Native typed plugins listen on `tools/pre-execute` and return
`PreToolDecision` `{ kind: "deny", reason }` — that is DSH's own API, not
a fake product we invented.

### Exo (ToolRuntime wrap, not drop-in hooks)

[Exo](https://github.com/exoharness/exo) has **no native hooks.json**.
This is **support via ToolRuntime wrap**, not drop-in hooks. Wrap
`ToolRuntime::execute` (Rust trait in
`crates/executor/src/executor_types.rs`) and TypeScript
`TurnContext.executeTool`. The wrapper
POSTs to `/api/hooks/exo` or `/api/hooks/generic` (same `{ block, reason? }`
JSON) or calls `scoreEvent` in-process. Deny by returning a tool error
`{ ok: false, error: AGENT_DENY }` — never leak scores. Fail-closed is whatever
the wrapper does; the Exo host has no hook `failClosed` flag. Scoring is
bounded at 8s (`AbortSignal.timeout` / `curl --max-time 8`) and a timeout is a
deny, same as the Pi, Amp, Prime, and Grok wrappers. Opaque copy:

`Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it.`

The gate is **deny-by-default**: every tool is scored except a verified
read-only exemption (`inspect_tools`, `list_adapters`, `list_adapter_events`,
`list_conversation_events`, `list_scheduled_tasks`, `list_sandbox_snapshots`,
`get_sandbox_status`, `list_skills`, `read_skill_file`, `web_search`,
`web_fetch`). That covers the mutating verbs Exo ships — `shell`,
`manage_tool`, `install_agent_tool`, `uninstall_agent_tool`,
`rebuild_and_restart_exo`, `snapshot_sandbox`, `rewind_sandbox`, the scheduler
verbs, and adapter create/enable/disable/delete/send — and agent-created tools
from `.exo/agent-tools/`, whose names are not known ahead of time. Exo ships no
`bash`, `write`, or `edit` tool; do not gate Claude-shaped names. Names are
from `crates/executor/src/harness_tool.rs` plus the TypeScript harness built-in,
adapter, sandbox, scheduler, and skill tools on
[exoharness/exo](https://github.com/exoharness/exo) `main`.

Keep generic stdin (`hooks/run.ts generic` / `exo`) if Exo later adds
hooks. Optional gate for agent-created tools under `.exo/agent-tools/`:
[`examples/exo-agent-tools-gate.ts`](../examples/exo-agent-tools-gate.ts).

See [`examples/exo-tool-runtime.ts`](../examples/exo-tool-runtime.ts) and
[`examples/exo-tool-runtime.rs`](../examples/exo-tool-runtime.rs).
