// Renders the music through a scripted visit, so it can be heard without the site.
//
//   node tools/audio/preview.mjs [out.wav]
//
// The visit: sound switched on at Power on (sting: relays, whine, slam on the first chord),
// then a flight to each stop in turn, 8 bars per stop, the cube solving at the Enclave,
// and a fade at I/O. Clicks, whooshes and thuds here are rough stand-ins for the site's
// own effects in sfx.js; they are only there for context.
//
// Needs the dev dependency node-web-audio-api.

import { OfflineAudioContext } from 'node-web-audio-api';
import { createMusic } from '../../src/shared/core/music.js';
import { createMaster } from '../../src/shared/core/master.js';
import { measure, slice } from './loudness.mjs';
import { writeWav } from './wav.mjs';

const OUT = process.argv[2] || 'music-preview.wav';
const SR = 48000;
const BAR = (60 / 90) * 4;
const DURATION = 2.6 + BAR * 48 + 8;

const ctx = new OfflineAudioContext(2, Math.ceil(DURATION * SR), SR);
const master = createMaster(ctx);
master.output.connect(ctx.destination);
const musicBus = ctx.createGain();
musicBus.connect(master.input);
const sfxBus = ctx.createGain();
sfxBus.gain.value = 0.9;
sfxBus.connect(master.input);

const music = createMusic(ctx, musicBus, { manual: true });
const sfx = standIns(ctx, sfxBus);

// ─── The visit ───
const segments = [];
const click = 0.4;
sfx.sting(click);
const slam = click + 2.2;
music.start(slam, { stop: 0, impact: true, at: 0 });

let arrive = slam;           // when the current stop's music began
let label = '0 Power on';
const FLIGHT = 1.2;

function flyTo(stop, name, dwellBars = 8) {
  const depart = arrive + BAR * (dwellBars - 0.75);
  music.scheduleUntil(depart);
  music.setStop(stop, { at: depart });
  music.duck({ at: depart });
  music.activity({ at: depart });
  sfx.whoosh(depart);
  sfx.arrive(depart + FLIGHT);
  music.unduck({ at: depart + FLIGHT });
  const lands = music.nextBarTime(depart);
  segments.push({ label, from: arrive, to: lands });
  arrive = lands; label = name;
}

flyTo(1, '1 The core');
flyTo(2, '2 Neural core');
flyTo(3, '3 Enclave (locked)');

// The cube solves 3.4 bars into the locked section; the music resolves on the next beat.
const solve = arrive + BAR * 3.4;
music.scheduleUntil(solve);
music.cubeSolved({ at: solve });
sfx.unlock(solve);
music.scheduleUntil(solve + BAR);
const resolved = music.getState().sectionStart;
segments.push({ label, from: arrive, to: resolved });
arrive = resolved; label = '3 Enclave (resolved)';

flyTo(4, '4 Memory', 4);
flyTo(5, '5 I/O');

const end = arrive + BAR * 8;
segments.push({ label, from: arrive, to: end });
music.scheduleUntil(end);
music.stop(4, { at: end - 2 });
music.scheduleUntil(DURATION);

const rendered = await ctx.startRendering();
let channels = [rendered.getChannelData(0), rendered.getChannelData(1)];
let last = channels[0].length - 1;
while (last > 0 && Math.abs(channels[0][last]) < 1e-4 && Math.abs(channels[1][last]) < 1e-4) last--;
channels = channels.map((ch) => ch.subarray(0, Math.min(ch.length, last + SR / 2)));
writeWav(OUT, channels, SR);

const whole = measure(channels, SR);
console.log(`\n${OUT}  ${whole.durationS}s  integrated ${whole.integrated} LUFS  true peak ${whole.truePeakDb} dBTP`);
console.log('\nsegment                   from     to       LUFS   short-term max   peak');
for (const s of segments) {
  const m = measure(slice(channels, SR, s.from + 0.5, s.to), SR);
  console.log(`${s.label.padEnd(24)} ${fmt(s.from)} ${fmt(s.to)}  ${String(m.integrated).padStart(6)}   ${String(m.shortTermMax).padStart(6)}          ${m.samplePeakDb}`);
}

function fmt(t) { const m = Math.floor(t / 60); return `${m}:${(t - m * 60).toFixed(1).padStart(4, '0')}`; }

// ─── Stand-in effects (context only) ───
function standIns(ctx, out) {
  const noise = ctx.createBuffer(1, SR, SR);
  const d = noise.getChannelData(0);
  let seed = 7;
  for (let i = 0; i < d.length; i++) { seed = (seed * 16807) % 2147483647; d[i] = (seed / 2147483647) * 2 - 1; }
  const src = (t, end) => { const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.start(t); s.stop(end); return s; };
  const filt = (type, f, q = 0.7) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; };
  const env = (node, t, peak, tc, attack = 0.002) => {
    const g = ctx.createGain(); g.gain.value = 0;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + attack); g.gain.setTargetAtTime(0, t + attack, tc);
    node.connect(g); g.connect(out); return g;
  };
  const thump = (t, f0, f1, peak, tc) => {
    const o = ctx.createOscillator(); o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + 0.15);
    o.start(t); o.stop(t + 1.2); env(o, t, peak, tc);
  };
  return {
    sting(t) {
      [0.05, 0.12, 0.19, 0.26, 0.33].forEach((dt, i) => {
        const bp = filt('bandpass', 2600 + i * 300, 2); src(t + dt, t + dt + 0.05).connect(bp); env(bp, t + dt, 0.5, 0.004);
        thump(t + dt, 220, 160, 0.12, 0.01);
      });
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(90, t + 0.38); o.frequency.exponentialRampToValueAtTime(1400, t + 2.2);
      const bp = filt('bandpass', 900, 3);
      bp.frequency.setValueAtTime(400, t + 0.38); bp.frequency.exponentialRampToValueAtTime(3000, t + 2.2);
      const g = ctx.createGain(); g.gain.value = 0;
      g.gain.setValueAtTime(0, t + 0.38); g.gain.linearRampToValueAtTime(0.22, t + 2.17); g.gain.linearRampToValueAtTime(0, t + 2.21);
      o.connect(bp); bp.connect(g); g.connect(out); o.start(t + 0.38); o.stop(t + 2.25);
      const s = t + 2.2;
      const lp = filt('lowpass', 900); src(s, s + 1).connect(lp); env(lp, s, 0.6, 0.08);
      const hp = filt('highpass', 3000); src(s, s + 0.4).connect(hp); env(hp, s, 0.25, 0.02);
      thump(s, 90, 50, 0.7, 0.18);
    },
    whoosh(t) {
      const bp = filt('bandpass', 300, 1.2);
      bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(1800, t + 0.5); bp.frequency.exponentialRampToValueAtTime(500, t + 1.0);
      const g = ctx.createGain(); g.gain.value = 0;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.28, t + 0.45); g.gain.linearRampToValueAtTime(0, t + 1.05);
      src(t, t + 1.1).connect(bp); bp.connect(g); g.connect(out);
    },
    arrive(t) {
      const lp = filt('lowpass', 700); src(t, t + 0.6).connect(lp); env(lp, t, 0.3, 0.06);
      thump(t, 80, 48, 0.4, 0.12);
    },
    unlock(t) {
      thump(t, 120, 60, 0.5, 0.06); thump(t + 0.09, 100, 45, 0.55, 0.1);
      const car = ctx.createOscillator(); car.frequency.value = 660;
      const mod = ctx.createOscillator(); mod.frequency.value = 660 * 2.76;
      const mg = ctx.createGain(); mg.gain.value = 600; mod.connect(mg); mg.connect(car.frequency);
      car.start(t + 0.09); mod.start(t + 0.09); car.stop(t + 1.5); mod.stop(t + 1.5);
      env(car, t + 0.09, 0.1, 0.25);
    },
  };
}
