#!/usr/bin/env bash
# Run a command with a temporary dev server on :5173 (started here, stopped when the command ends).
cd /home/claude/rework
if curl -s -o /dev/null http://127.0.0.1:5173/; then exec "$@"; fi
npx vite --host 127.0.0.1 --port 5173 --strictPort > /tmp/claude-0/-home-claude/f77cf654-e93e-598b-b6a8-dacc6629ae69/scratchpad/vite.log 2>&1 &
VPID=$!
for i in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:5173/ && break; sleep 0.5; done
"$@"; CODE=$?
kill $VPID 2>/dev/null; wait $VPID 2>/dev/null
exit $CODE
