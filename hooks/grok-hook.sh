#!/usr/bin/env bash
# Fail-closed Grok PreToolUse adapter. Grok itself is fail-open on crash,
# timeout, and malformed output — this wrapper always emits an explicit deny.
# Event JSON and URL stay aligned with examples/grok-hooks.json.
# Deny JSON stays aligned with failClosedGrokOutput() in src/lib/risk/hosts.ts.
set -eu

SIDECAR="${RH_GUARD_URL:-${HACK_RADAR_URL:-http://127.0.0.1:43147/api/hooks/grok}}"
DENY='{"decision":"deny","reason":"Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it."}'

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
if grep -q '"decision"[[:space:]]*:[[:space:]]*"deny"' "$tmp"; then
  exit 2
fi
