// Effect levels. Renders every use in LEVELS (src/shared/core/sfx.js) alone through the site's own graph
// (effects bus, master chain, output gain) into an OfflineAudioContext, several times (the cues use random noise),
// and checks each peak against its tier in docs/v5/AUDIO.md.
//
//   node tools/audio/sfx-levels.mjs          → table + PASS/FAIL, exit code 1 on any FAIL
//
// Needs the dev dependency node-web-audio-api.

import { OfflineAudioContext } from 'node-web-audio-api';
import { Sfx, LEVELS, TIERS } from '../../src/shared/core/sfx.js';

const SR = 48000, RUNS = 6;
const db = (x) => (x > 0 ? 20 * Math.log10(x) : -Infinity);
const peakOf = (buf, from = 0, to = buf.length / SR) => {
  let p = 0;
  for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c); for (let i = Math.floor(from * SR); i < Math.min(d.length, Math.ceil(to * SR)); i++) p = Math.max(p, Math.abs(d[i])); }
  return db(p);
};
async function render(name, opt = {}, secs = 1.6) {
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * secs), SR);
  const s = new Sfx();
  s.attach(ctx); s.on = true;
  s.play(name, { at: 0.05, ...opt });
  return ctx.startRendering();
}

let fail = 0;
const rows = [];
for (const [name, L] of Object.entries(LEVELS)) {
  if (!L.tier) continue;
  const peaks = [];
  for (let k = 0; k < RUNS; k++) peaks.push(peakOf(await render(name)));
  const lo = Math.min(...peaks), hi = Math.max(...peaks), [a, b] = TIERS[L.tier];
  const ok = lo >= a && hi <= b;
  if (!ok) fail++;
  rows.push({ name, L, lo, hi, ok });
}
console.log('use          cue      tier  range (dBFS)   gain    peak over 6 renders   result');
for (const { name, L, lo, hi, ok } of rows) {
  const [a, b] = TIERS[L.tier];
  console.log(`${name.padEnd(12)} ${L.cue.padEnd(8)} ${L.tier.padEnd(5)} ${`${a} … ${b}`.padEnd(14)} ${String(L.gain).padEnd(7)} ${lo.toFixed(1).padStart(6)} … ${hi.toFixed(1).padStart(6)}       ${ok ? 'PASS' : 'FAIL'}`);
}

// the sting's whine: from about −24 dBFS at its start up to tier B by the slam (as the sting schedules it: 0.38 → 2.2 s)
const w = await render('stingWhine', { at: 0.38, dur: 1.82 }, 2.4);
const start = peakOf(w, 0.38, 0.6), end = peakOf(w, 2.0, 2.22), [ba, bb] = TIERS.B;
const wok = start >= -27 && start <= -21 && end >= ba && end <= bb;
if (!wok) fail++;
console.log(`\nstingWhine   power    rises from ${start.toFixed(1)} dBFS (first 0.2 s; about −24) to ${end.toFixed(1)} dBFS by the slam (tier B ${ba} … ${bb})   ${wok ? 'PASS' : 'FAIL'}`);
process.exit(fail ? 1 : 0);
