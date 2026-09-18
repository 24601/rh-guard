#!/usr/bin/env bash
# Shows the stock exoharness/exo binary that was built here, and why it is
# not the rh-guard deny/allow recording.
set -u
EXO=/tmp/exo-src/target/debug/exo
echo "date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "binary: ${EXO}"
ls -l "${EXO}"
echo
echo "----- exo help (first commands) -----"
"${EXO}" --help
echo
echo "----- docker -----"
if command -v docker >/dev/null 2>&1; then
  docker --version
else
  echo "docker: not installed"
fi
echo
echo "----- registered models (names only) -----"
"${EXO}" --root /tmp/exo-state --secret-backend file model list
echo
echo "Stock exo does not load rh-guard. Deny/allow is the TypeScript"
echo "ToolRuntime wrap in docs/sessions/exo-wrapper-session.ts."
