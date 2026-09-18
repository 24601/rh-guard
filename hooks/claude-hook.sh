#!/usr/bin/env bash
# Fail-closed Claude PreToolUse adapter. Posts stdin to the Hack Radar sidecar.
# Event names, matcher, and URL stay aligned with examples/claude-*.json.
# Deny JSON stays aligned with failClosedClaudeOutput() in src/lib/risk/hooks.ts.
set -eu

SIDECAR="${HACK_RADAR_URL:-http://127.0.0.1:43147/api/hooks/claude}"
DENY='{"continue":false,"decision":"block","reason":"Action held: filesystem integrity policy.","hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it."}}'

body=$(cat || true)
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

code=$(printf '%s' "$body" | curl -sS -o "$tmp" -w '%{http_code}' --max-time 8 \
  -H 'Content-Type: application/json' --data-binary @- "$SIDECAR" || true)

if [ "$code" != "200" ] && [ "$code" != "204" ]; then
  printf '%s\n' "$DENY"
  exit 2
fi

if [ ! -s "$tmp" ]; then
  printf '%s\n' "$DENY"
  exit 2
fi

cat "$tmp"
printf '\n'
