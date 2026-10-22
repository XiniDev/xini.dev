// Music level check. Renders 8 bars of each stop through the site's master chain and
// compares against the v5 targets in docs/v5/AUDIO.md.
//
//   node tools/audio/measure.mjs          → table + PASS/FAIL, exit code 1 on any FAIL
//
// Needs the dev dependency node-web-audio-api.

import { OfflineAudioContext } from 'node-web-audio-api';
import { createMusic } from '../../src/shared/core/music.js';
import { createMaster } from '../../src/shared/core/master.js';
import { measure } from './loudness.mjs';

const SR = 48000;
const BAR = (60 / 90) * 4;
const NAMES = ['Power on', 'The core', 'Neural core', 'Enclave (locked)', 'Memory', 'I/O'];
const TARGET = { core: [-21.5, -18.5], each: [-22.5, -18], peak: -1.0 };

const rows = [];
for (const stop of [0, 1, 2, 3, 4, 5]) rows.push({ name: NAMES[stop], ...(await render(stop)) });
rows.splice(4, 0, { name: 'Enclave (resolved)', ...(await render(3, { solved: true })) });

let fail = 0;
console.log('stop                  LUFS   short-term max   peak dBFS   result');
for (const r of rows) {
  const range = r.name === 'The core' ? TARGET.core : TARGET.each;
  const ok = r.integrated >= range[0] && r.integrated <= range[1] && r.samplePeakDb <= TARGET.peak;
  if (!ok) fail++;
  console.log(`${r.name.padEnd(20)} ${String(r.integrated).padStart(6)}   ${String(r.shortTermMax).padStart(6)}           ${String(r.samplePeakDb).padStart(5)}      ${ok ? 'PASS' : `FAIL (want ${range[0]}…${range[1]} LUFS, peak ≤ ${TARGET.peak})`}`);
}
const loud = rows.map((r) => r.integrated);
console.log(`\nspread between stops: ${(Math.max(...loud) - Math.min(...loud)).toFixed(1)} LU (keep ≤ 3)`);
if (Math.max(...loud) - Math.min(...loud) > 3) fail++;
process.exit(fail ? 1 : 0);

async function render(stop, opts = {}) {
  const secs = BAR * 8 + 1.2;
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * secs), SR);
  const master = createMaster(ctx);
  master.output.connect(ctx.destination);
  const music = createMusic(ctx, master.input, { manual: true });
  music.start(0.2, { stop, at: 0, ...opts });
  music.scheduleUntil(secs);
  const buf = await ctx.startRendering();
  const skip = SR; // ignore the first second while the layers settle
  return measure([buf.getChannelData(0).subarray(skip), buf.getChannelData(1).subarray(skip)], SR);
}
