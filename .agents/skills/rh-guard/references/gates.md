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

[Abide](https://github.com/coldteadotai/abide) is the same envelope on a
different job: linters own checkable rules; Jev scores residual soft
project instructions on the diff; fail-open; banded confidence (repair /
note / silence). Soft judgment is never the sole hard veto. Sibling, not
a merge, and not a reward-hack detector.

[pi-jev-approver](https://github.com/phin-tech/pi-jev-approver) is structural-first on Pi bash with the opposite envelope default: `commandRules` deny is a hard block; missing `TYPESAFE_API_KEY` fails closed. Contrast jevgate's fail-open rest (it cannot block). Sibling, not this sidecar.

[wakegate](https://github.com/shitianfang/wakegate) is the fail-open wake-gate contrast: skip a wakeup only when Jev answers and puts less than 0.2 on wake; error, no key, and unsure all wake. Opposite default from pi-jev-approver fail-closed. Not a reward-hack detector.

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
```

Do not merge those hooks into `examples/`. [jev-model-router](https://github.com/Mandrilsquad1441/jev-model-router) is adjacent model+effort routing, not a rh-guard peer.

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
atomic policy on the write.

## Polarity

Phrase every hazard Noul so a high number means the hack is present. Block on
`noul >= t`. Inverting to "is this safe" and raising `t` shrinks the reject
band. Advisory kinds (`proxy_metric`, `heldout_blindness`, `coverage_theater`,
`sycophancy_eval`) never deny by themselves.
