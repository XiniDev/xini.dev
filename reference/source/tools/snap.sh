#!/usr/bin/env bash
# Build machine v2 into a fresh folder, serve it, and run a command against it; $URL points at the page.
# Editing can carry on while the command runs. usage: tools/snap.sh <name> '<command using $URL>'
cd /home/claude/rework
SP=/tmp/claude-0/-home-claude/f77cf654-e93e-598b-b6a8-dacc6629ae69/scratchpad
NAME=$1; shift
OUT=$SP/builds/$NAME; mkdir -p $SP/builds; rm -rf $OUT
if ! npx vite build -c vite.v2.config.js --outDir $OUT --emptyOutDir > $SP/builds/$NAME.log 2>&1; then echo "BUILD FAILED"; tail -20 $SP/builds/$NAME.log; exit 1; fi
PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("",0)); print(s.getsockname()[1])')
python3 -m http.server $PORT -d $OUT > /dev/null 2>&1 &
SPID=$!
for i in $(seq 1 40); do curl -s -o /dev/null http://127.0.0.1:$PORT/ && break; sleep 0.3; done
export URL=http://127.0.0.1:$PORT/concepts/machine2/index.html
bash -c "$*"; CODE=$?
kill $SPID 2>/dev/null
exit $CODE
