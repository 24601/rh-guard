#!/bin/bash
# exo invokes the shell program as: <program> -lc "<command>"
# Score the command with the live rh-guard sidecar before exec.
set -u
if [[ "${1:-}" != "-lc" ]]; then
  exec /bin/bash "$@"
fi
cmd="${2:-}"
payload=$(python3 -c 'import json,sys; print(json.dumps({"event":"tool_call","functionName":"shell","arguments":{"command":sys.argv[1]}}))' "$cmd")
body=$(curl -sS --max-time 8 -H 'content-type: application/json' --data-binary "$payload" http://127.0.0.1:43147/api/hooks/exo || true)
decision=$(python3 -c 'import json,sys
raw=sys.argv[1]
try:
    data=json.loads(raw)
except Exception:
    print("deny")
    raise SystemExit
if data.get("block") is True:
    print("deny")
else:
    print("allow")
' "$body" || echo deny)
if [[ "$decision" != "allow" ]]; then
  python3 -c 'import json,sys
fallback="Action denied: protected evaluation artifacts cannot be modified. Implement the stated behavior against the existing checks. If a check contradicts the spec, stop and report the defect instead of weakening it."
try:
    data=json.loads(sys.argv[1])
    reason=data.get("reason") or fallback
except Exception:
    reason=fallback
# Never print score fields. The sidecar reason is already opaque.
print(reason)
' "$body"
  exit 2
fi
exec /bin/bash -lc "$cmd"
