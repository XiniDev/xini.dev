/**
 * xini.dev — procedural score (v5, first draft)
 *
 * Synthesised with WebAudio, no audio files. sfx.js owns the AudioContext and the
 * master bus; this module adds a music bus and plays an adaptive track on it.
 *
 *   import { createMusic } from './music.js';
 *   const music = createMusic(ctx, musicInput);        // musicInput: a GainNode feeding the master bus
 *   music.start(slamTime, { stop: current, impact: true });  // first chord lands on the slam
 *   music.start(t, { stop: current, fadeIn: 0.8 });        // sound switched on again later
 *   music.setStop(i);        // call on flight departure; the change lands on the next bar
 *   music.setStop(3, { solved: true });   // arriving at an Enclave whose cube is already solved
 *   music.cubeSolved();      // Enclave: the tension resolves on the next beat
 *   music.duck(); music.unduck();   // around flights
 *   music.activity();        // any navigation or scene click; stops the mix thinning when idle
 *   music.stop(0.6);         // sound off
 *
 * Every method also accepts { at } (seconds on the ctx clock), which lets the score be
 * rendered offline (see tools/audio). With { manual: true } there is no timer and the
 * caller drives scheduling with music.scheduleUntil(t).
 *
 * Musical choices live in SCORE, PROGRESSIONS, STOPS and MIX below. Change those, not the engine.
 */

// ─── Score ───────────────────────────────────────────────────────────────────

export const SCORE = {
  bpm: 90,
  swing: 0.57,          // 16th-note swing (0.5 = straight)
  seed: 20261021,       // fixed, so every render and every visit plays the same notes
  idleBars: 48,         // ~2 min at one stop without activity → thin to keys and pad
  lockedMaxBars: 6,     // Enclave resolves by itself if cubeSolved() never arrives
};

// One entry per bar: [bass root, rootless voicing] (MIDI note numbers, C4 = 60).
export const PROGRESSIONS = {
  // F minor: Fm9 | Dbmaj9 | Bbm9 | C7sus → C7(b9)
  main: [
    [29, [56, 60, 63, 67]], [29, [56, 60, 63, 67]],
    [37, [56, 60, 63, 65]], [37, [56, 60, 63, 65]],
    [34, [56, 60, 61, 65]], [34, [56, 60, 61, 65]],
    [36, [55, 58, 62, 65]], [36, [55, 58, 61, 64]],
  ],
  // Enclave before the cube solves: dominant pedal on C, C7(b9) against Db/C
  locked: [
    [36, [55, 58, 61, 64]], [36, [53, 56, 61, 65]],
    [36, [55, 58, 61, 64]], [36, [53, 56, 61, 65]],
  ],
  // I/O: Dbmaj9 | Abmaj9/C | Bbm9 | Eb7sus — brighter, never quite lands
  daylight: [
    [37, [56, 60, 63, 65]], [37, [56, 60, 63, 65]],
    [36, [55, 58, 60, 63]], [36, [55, 58, 60, 63]],
    [34, [56, 60, 61, 65]], [34, [56, 60, 61, 65]],
    [39, [56, 58, 61, 65]], [39, [56, 58, 61, 65]],
  ],
};

// Per stop: which progression plays, rhythm variants, and each layer's level (0–1).
// Layers left out of `mix` are silent at that stop.
export const STOPS = [
  { // 0 Power on — keys, pad, sub and a soft pulse
    section: 'main', kick: 'pulse', hats: 'eighths',
    mix: { ep: 1, pad: 0.85, sub: 1, kick: 0.8, hats: 1, shaker: 0.8, glitch: 0.5 },
  },
  { // 1 The core — the groove comes in: bass, backbeat, 16th hats
    section: 'main', kick: 'groove', hats: 'sixteenths', snare: 'backbeat', bass: 'groove',
    mix: { ep: 0.85, pad: 0.7, bass: 1, kick: 1, snare: 1, hats: 1, shaker: 1, glitch: 0.7 },
  },
  { // 2 Neural core — adds the arpeggio
    section: 'main', kick: 'groove', hats: 'sixteenths', snare: 'backbeat', bass: 'groove', arp: 'flow',
    mix: { ep: 0.75, pad: 0.65, bass: 1, kick: 1, snare: 1, hats: 1, shaker: 1, arp: 1, glitch: 0.8 },
  },
  { // 3 Enclave — locked: pedal bass, half-time, riser; resolves when the cube solves
    section: 'locked', kick: 'half', hats: 'tick', snare: 'three', bass: 'pedal', arp: 'tension',
    mix: { pad: 1, bass: 0.85, kick: 0.9, snare: 0.85, hats: 0.8, arp: 0.8, riser: 1 },
    resolved: {
      section: 'main', kick: 'groove', hats: 'sixteenths', snare: 'backbeat', bass: 'groove',
      mix: { ep: 0.9, pad: 0.75, bass: 1, kick: 1, snare: 1, hats: 1, shaker: 1, glitch: 0.6 },
    },
  },
  { // 4 Memory — keys turn to syncopated stabs, a sparse bell
    section: 'main', kick: 'groove', hats: 'sixteenths', snare: 'backbeat', bass: 'groove',
    mix: { ep: 0.45, stabs: 1, pad: 0.6, bass: 1, kick: 1, snare: 1, hats: 1, shaker: 1, bell: 1, glitch: 0.6 },
  },
  { // 5 I/O — daylight: brighter chords, air, drums drop back
    section: 'daylight', kick: 'pulse', hats: 'eighths',
    mix: { ep: 0.9, pad: 0.8, sub: 0.9, air: 1, kick: 0.6, hats: 0.6, shaker: 0.5, glitch: 0.3 },
  },
];

// After SCORE.idleBars without activity: keys and pad only, until the next interaction.
const IDLE_MIX = { ep: 0.75, pad: 0.8, sub: 0.6, hats: 0.3 };

// Static trims per layer, calibrated by measurement (tools/audio/measure.mjs).
export const MIX = {
  master: 0.42,         // music bus output: the core's groove ≈ −20 LUFS through the master chain
  layers: {
    ep: 1.88, pad: 1.62, sub: 0.14, bass: 0.15, kick: 0.38, snare: 1.39, hats: 1.6,
    shaker: 1.6, arp: 1.33, stabs: 1.45, bell: 1.24, air: 0.34, glitch: 0.8, riser: 1.52, fx: 0.55,
  },
  reverb: { ep: 0.14, pad: 0.3, snare: 0.16, arp: 0.18, stabs: 0.1, bell: 0.4, air: 0.45, glitch: 0.25, riser: 0.3, fx: 0.35, hats: 0.04 },
  delay: { arp: 0.32, bell: 0.22, glitch: 0.22, stabs: 0.06, ep: 0.05 },
  reverbReturn: 0.5,
  delayReturn: 0.45,
  pumpDepth: 0.22,      // how far keys and pad dip on each kick
};

// ─── Patterns (16 steps per bar; [bar A, bar B]) ─────────────────────────────

const KICK = {
  pulse: [[[0, 0.9], [10, 0.55]], [[0, 0.9], [10, 0.55]]],
  groove: [[[0, 1], [7, 0.55], [10, 0.85]], [[0, 1], [6, 0.5], [10, 0.85], [13, 0.4]]],
  half: [[[0, 1], [10, 0.7]], [[0, 1], [10, 0.7], [14, 0.5]]],
};
const SNARE = {
  backbeat: [[[4, 0.85], [12, 1]], [[4, 0.85], [7, 0.16], [12, 1], [15, 0.2]]],
  three: [[[8, 1]], [[8, 1]]],
};
const SNARE_FILL = [[9, 0.15], [11, 0.2], [13, 0.26], [14, 0.42], [15, 0.55]];
const HATS = {
  eighths: { a: [0, 2, 4, 6, 8, 10, 12, 14].map((k) => [k, k % 4 === 0 ? 0.5 : 0.36]), open: [] },
  sixteenths: { a: [...Array(16).keys()].map((k) => [k, k % 2 ? 0.22 : k % 4 === 2 ? 0.48 : 0.4]), open: [14] },
  tick: { a: [...Array(16).keys()].map((k) => [k, 0.2]), open: [], straight: true, short: true },
};
const SHAKER = [...Array(16).keys()].map((k) => [k, [0.3, 0.45, 0.32, 0.55][k % 4]]);
// [step, interval from root | 'next', length in steps, velocity]
const BASS = {
  groove: [
    [[0, 0, 3, 1], [3, 12, 1, 0.5], [6, 0, 2, 0.8], [10, 7, 2, 0.7], [12, 0, 2, 0.75], [14, 12, 1, 0.45]],
    [[0, 0, 3, 1], [6, 0, 2, 0.8], [8, 10, 2, 0.6], [11, 7, 1, 0.55], [12, 0, 2, 0.7], [14, 'next', 2, 0.65]],
  ],
  pedal: [
    [[0, 0, 1.5, 1], [2, 0, 1.5, 0.6], [4, 0, 1.5, 0.85], [6, 0, 1.5, 0.6], [8, 0, 1.5, 0.9], [10, 0, 1.5, 0.6], [12, 0, 1.5, 0.85], [14, 12, 1.5, 0.6]],
    [[0, 0, 1.5, 1], [2, 0, 1.5, 0.6], [4, 0, 1.5, 0.85], [6, 0, 1.5, 0.6], [8, 0, 1.5, 0.9], [10, 0, 1.5, 0.6], [12, 12, 1.5, 0.8], [14, 0, 1.5, 0.6]],
  ],
};
// Arpeggio: indexes into [voicing +12, voicing +24]; null = rest. One pattern per 8-bar loop, cycling.
const ARP_FLOW = [
  [0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, null, 6, 4, 3, 1],
  [0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, null],
  [7, 5, 6, 4, 5, 3, 4, 2, 3, 1, 2, 0, 1, null, 3, 4],
];
const ARP_TENSION = [60, 61, 64, 67, 70, 67, 64, 61]; // 8ths, C7(b9) colour
const STABS = [[[3, 0.7], [6, 0.55], [10, 0.75], [14, 0.5]], [[2, 0.6], [6, 0.7], [11, 0.65]]];
const BELL = [[2, 3, 0.55], [7, 1, 0.4], [11, 2, 0.45]]; // [step, voicing index, velocity], every other bar

const LAYERS = ['ep', 'pad', 'sub', 'bass', 'kick', 'snare', 'hats', 'shaker', 'arp', 'stabs', 'bell', 'air', 'glitch', 'riser', 'fx'];
const PUMPED = new Set(['ep', 'pad', 'arp', 'stabs', 'air', 'bell']);
const SUSTAINED = ['pad', 'sub', 'air'];
const RHYTHM_KEYS = ['kick', 'snare', 'hats', 'bass', 'arp'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const dbToGain = (db) => Math.pow(10, db / 20);
const same = (a, b) => a[0] === b[0] && a[1].length === b[1].length && a[1].every((n, i) => n === b[1][i]);

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function grid(pattern) {
  const g = new Array(16).fill(0);
  for (const [k, v] of pattern) g[k] = v;
  return g;
}

/**
 * AudioParam automation that tracks its own value. Every exponential segment starts
 * with an explicit setValueAtTime, and retarget() replaces cancelAndHoldAtTime (missing
 * in Firefox). Same sound in every browser, and offline renders match.
 */
function automate(param, initial = 0) {
  const ev = [{ t: -1, kind: 'set', v: initial }];
  const start = (e) => (e.kind === 'exp' ? e.v0 : e.v);
  const at = (t) => {
    let j = ev.length;
    while (j > 1 && ev[j - 1].t > t) j--;
    const p = ev[j - 1];
    const n = ev[j];
    if (n && n.kind === 'lin') return start(p) + ((n.v - start(p)) * (t - p.t)) / (n.t - p.t);
    if (p.kind === 'exp') return p.target + (p.v0 - p.target) * Math.exp(-(t - p.t) / p.tc);
    return p.v;
  };
  const push = (e) => { ev.push(e); if (ev.length > 48) ev.splice(0, 24); };
  return {
    at,
    set(v, t) { param.setValueAtTime(v, t); push({ t, kind: 'set', v }); return this; },
    lin(v, t) { param.linearRampToValueAtTime(v, t); push({ t, kind: 'lin', v }); return this; },
    exp(target, t, tc) {
      const v0 = at(t);
      param.setValueAtTime(v0, t);
      param.setTargetAtTime(target, t, tc);
      push({ t, kind: 'exp', v0, target, tc });
      return this;
    },
    retarget(t) {
      const v = at(t);
      param.cancelScheduledValues(t);
      while (ev.length > 1 && ev[ev.length - 1].t >= t) ev.pop();
      return this.set(v, t);
    },
  };
}

// ─── Engine ──────────────────────────────────────────────────────────────────

export function createMusic(ctx, destination, options = {}) {
  const opts = { manual: false, lookahead: 0.3, interval: 0.05, ...SCORE, ...options };
  const rand = mulberry32(opts.seed);
  const stepDur = 60 / SCORE.bpm / 4;
  const barDur = stepDur * 16;
  const swingOffset = (SCORE.swing - 0.5) * 2 * stepDur;
  const hum = (amount = 0.12) => 1 + (rand() - 0.5) * amount;
  const jitter = () => (rand() - 0.5) * 0.006;

  const patterns = (set) => Object.fromEntries(Object.entries(set).map(([k, bars]) => [k, bars.map(grid)]));
  const KICK_G = patterns(KICK);
  const SNARE_G = patterns(SNARE);
  const HATS_G = Object.fromEntries(Object.entries(HATS).map(([k, h]) => [k, grid(h.a)]));
  const FILL_G = grid(SNARE_FILL);
  const SHAKER_G = grid(SHAKER);
  const STABS_G = STABS.map(grid);
  const BASS_G = Object.fromEntries(Object.entries(BASS).map(([k, bars]) => [k, bars.map((bar) => {
    const g = new Array(16).fill(null);
    for (const [step, interval, len, vel] of bar) g[step] = { interval, len, vel };
    return g;
  })]));

  // Shared sources
  const noise = makeNoise(2);
  const crush = makeShaper((x) => Math.round(x * 7) / 7);
  const warm = makeShaper((x) => Math.tanh(1.6 * x) / Math.tanh(1.6));
  const punch = makeShaper((x) => Math.tanh(1.25 * x) / Math.tanh(1.25));

  // Output: mix → tone (rumble cut, low-mid scoop, soft top) → volume → duck → destination
  const mix = ctx.createGain();
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 30; hp.Q.value = 0.7;
  const scoop = ctx.createBiquadFilter();
  scoop.type = 'peaking'; scoop.frequency.value = 260; scoop.Q.value = 0.8; scoop.gain.value = -5;
  const soft = ctx.createBiquadFilter();
  soft.type = 'highshelf'; soft.frequency.value = 8000; soft.gain.value = -4;
  const volume = ctx.createGain(); volume.gain.value = 0;
  const duckGain = ctx.createGain();
  mix.connect(hp); hp.connect(scoop); scoop.connect(soft); soft.connect(volume);
  volume.connect(duckGain); duckGain.connect(destination);
  const volumeA = automate(volume.gain, 0);
  const duckA = automate(duckGain.gain, 1);

  const pump = ctx.createGain(); pump.connect(mix);
  const pumpA = automate(pump.gain, 1);

  // Reverb: generated impulse, a dark medium room
  const reverb = ctx.createConvolver();
  reverb.normalize = false;
  reverb.buffer = makeImpulse(2.4, 0.32);
  const reverbReturn = ctx.createGain(); reverbReturn.gain.value = MIX.reverbReturn;
  reverb.connect(reverbReturn); reverbReturn.connect(mix);

  // Ping-pong delay, dotted eighth
  const delayIn = ctx.createGain();
  const delayReturn = ctx.createGain(); delayReturn.gain.value = MIX.delayReturn;
  buildPingPong(delayIn, delayReturn, stepDur * 3, 0.4);
  delayReturn.connect(mix);

  // Slow LFOs shared by every voice (Rhodes-style stereo tremolo, air vibrato)
  const tremolo = ctx.createOscillator(); tremolo.frequency.value = 4.6;
  const tremoloDepth = ctx.createGain(); tremoloDepth.gain.value = 0.32;
  tremolo.connect(tremoloDepth); tremolo.start();
  const vibrato = ctx.createOscillator(); vibrato.frequency.value = 5.1;
  const vibratoDepth = ctx.createGain(); vibratoDepth.gain.value = 7; // cents
  vibrato.connect(vibratoDepth); vibrato.start();

  // Layers: input (static trim) → [insert] → fader (per-stop level) → pump|mix, plus sends
  const layer = {};
  for (const name of LAYERS) {
    const input = ctx.createGain(); input.gain.value = MIX.layers[name];
    const fader = ctx.createGain(); fader.gain.value = name === 'fx' ? 1 : 0;
    let tail = input;
    if (name === 'ep' || name === 'stabs') {
      const hpf = ctx.createBiquadFilter(); hpf.type = 'highpass'; hpf.frequency.value = 140; hpf.Q.value = 0.6;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6500; lp.Q.value = 0.5;
      input.connect(hpf); hpf.connect(lp); tail = lp;
      if (name === 'ep') { const pan = ctx.createStereoPanner(); tremoloDepth.connect(pan.pan); lp.connect(pan); tail = pan; }
    } else if (name === 'pad') {
      const hpf = ctx.createBiquadFilter(); hpf.type = 'highpass'; hpf.frequency.value = 220; hpf.Q.value = 0.6;
      input.connect(hpf); tail = hpf;
    } else if (name === 'bass') {
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400; lp.Q.value = 0.5;
      const sh = warm(); input.connect(sh); sh.connect(lp); tail = lp;
    } else if (name === 'kick') {
      const sh = punch(); input.connect(sh); tail = sh;
    }
    tail.connect(fader);
    fader.connect(PUMPED.has(name) ? pump : mix);
    if (MIX.reverb[name]) { const s = ctx.createGain(); s.gain.value = MIX.reverb[name]; fader.connect(s); s.connect(reverb); }
    if (MIX.delay[name]) { const s = ctx.createGain(); s.gain.value = MIX.delay[name]; fader.connect(s); s.connect(delayIn); }
    const level = name === 'fx' ? 1 : 0;
    layer[name] = { input, fader, auto: automate(fader.gain, level), to: level, fadeEnd: 0 };
  }

  // ─── State ───
  let t0 = 0;             // time of step 0
  let nextStep = 0;       // first step not yet scheduled
  let anchor = 0;         // step where the current section's bar 0 falls
  let section = 'main';
  let conf = STOPS[0];
  let stopIndex = 0;
  let variant = {};
  let pending = null;
  let running = false;
  let stopAtStep = Infinity;
  let timer = null;
  let impactStep = -1;
  let solvedEarly = false;
  let idle = false;
  let lastActivity = 0;
  let volumeDb = 0;
  let entering = new Set();
  let forceVoice = false;
  const held = [];        // sustained voices that may need an early release

  const stepTime = (s) => t0 + s * stepDur;
  const now = (o) => (o && o.at != null ? o.at : ctx.currentTime);
  const stepAt = (t) => Math.max(nextStep, Math.ceil((t - t0) / stepDur - 1e-6));
  const live = (name, t) => layer[name].to > 0.001 || t < layer[name].fadeEnd;

  function setFader(name, target, t, fade) {
    const l = layer[name];
    const v = l.auto.at(t);
    if (Math.abs(v - target) < 1e-4 && Math.abs(l.to - target) < 1e-4) return;
    if (v < 0.05 && target > 0) entering.add(name);
    l.auto.retarget(t).lin(target, t + fade);
    l.to = target;
    l.fadeEnd = t + fade;
  }

  function applyMix(c, t, fade) {
    for (const name of LAYERS) if (name !== 'fx') setFader(name, (c.mix && c.mix[name]) || 0, t, fade);
    for (const k of RHYTHM_KEYS) if (c[k]) variant[k] = c[k];
  }

  function releaseHeld(t, fade = 0.08) {
    for (const v of held) {
      if (v.end > t) {
        v.gate.gain.setValueAtTime(1, t);
        v.gate.gain.linearRampToValueAtTime(0, t + fade);
        v.end = t;
      }
    }
  }

  function enterStop(s, i, solved) {
    const t = stepTime(s);
    stopIndex = i;
    let c = STOPS[i];
    let hit = false;
    if (i === 3 && (solved || solvedEarly)) { c = STOPS[3].resolved; hit = solvedEarly && !solved; }
    solvedEarly = false;
    if (c.section !== section) { section = c.section; anchor = s; releaseHeld(t); forceVoice = true; }
    conf = c; idle = false;
    applyMix(c, t, barDur * 0.75);
    if (hit) impactStep = s;
  }

  function resolve(s, withImpact) {
    const t = stepTime(s);
    releaseHeld(t, 0.05);
    section = 'main'; anchor = s; conf = STOPS[3].resolved; idle = false;
    applyMix(conf, t, barDur * 0.25);
    forceVoice = true;
    if (withImpact) impactStep = s;
  }

  // ─── Scheduler ───

  function scheduleUntil(t) {
    // After a long main-thread stall, skip steps that are already late (keeping the state
    // changes) instead of firing them all at once.
    const late = opts.manual ? -Infinity : ctx.currentTime - 0.1;
    while (running && nextStep < stopAtStep && stepTime(nextStep) < t) {
      scheduleStep(nextStep, stepTime(nextStep) < late);
      nextStep++;
    }
    if (nextStep >= stopAtStep) running = false;
  }

  function scheduleStep(s, silent = false) {
    if (pending && s >= pending.step) { const p = pending; pending = null; p.run(s); }
    let rel = s - anchor;
    let bar = Math.floor(rel / 16);
    let k = rel - bar * 16;
    const t = stepTime(s);
    if (section === 'locked' && k === 0 && bar >= opts.lockedMaxBars) { resolve(s, false); bar = 0; k = 0; }
    if (silent) { if (k === 0) forceVoice = true; return; }
    if (k === 0) onBar(bar, t, s);

    const B = bar % 2;
    const sw = k % 2 === 1 ? swingOffset : 0;
    const prog = PROGRESSIONS[section];
    const pi = ((bar % prog.length) + prog.length) % prog.length;
    const [root, voicing] = prog[pi];

    // Drums
    if (variant.kick && live('kick', t)) { const v = KICK_G[variant.kick][B][k]; if (v) kick(t + sw, v * hum(0.06)); }
    if (variant.snare && live('snare', t)) {
      let v = SNARE_G[variant.snare][B][k];
      if (!v && variant.snare === 'backbeat' && section === 'main' && bar % 8 === 7) v = FILL_G[k];
      if (v) snare(t + sw + jitter(), v * hum());
    }
    if (variant.hats && live('hats', t)) {
      const h = HATS[variant.hats];
      const v = HATS_G[variant.hats][k];
      if (v) hat(t + (h.straight ? 0 : sw) + jitter(), v * hum(0.2), B === 1 && h.open.includes(k), h.short);
    }
    if (live('shaker', t)) shaker(t + sw + jitter(), SHAKER_G[k] * hum(0.25));

    // Bass
    if (variant.bass && live('bass', t)) {
      const n = BASS_G[variant.bass][B][k];
      if (n) {
        let midi = root + (n.interval === 'next' ? 0 : n.interval);
        if (n.interval === 'next') {
          const next = prog[(pi + 1) % prog.length][0];
          midi = next === root ? root + 7 : next + (next > root ? -1 : 1);
        }
        bassNote(t + sw, midi, n.len * stepDur * 0.92, n.vel * hum(0.08));
      }
    }

    // Arpeggio
    if (variant.arp && live('arp', t)) {
      if (variant.arp === 'flow') {
        const idx = ARP_FLOW[Math.floor(bar / 8) % ARP_FLOW.length][k];
        if (idx != null) {
          const tones = [...voicing.map((n) => n + 12), ...voicing.map((n) => n + 24)];
          const vel = k % 4 === 0 ? 0.85 : k % 2 === 0 ? 0.68 : 0.55;
          arpNote(t + sw, tones[idx], vel * hum(), false, k % 2 ? 0.3 : -0.3);
        }
      } else if (k % 2 === 0) {
        arpNote(t, ARP_TENSION[(k / 2 + bar * 8) % ARP_TENSION.length], 0.7 * hum(), true, k % 4 ? 0.25 : -0.25);
      }
    }

    // Keys stabs and bell (Memory)
    if (live('stabs', t)) {
      const v = STABS_G[B][k];
      if (v) for (const m of voicing) epNote(t + sw, m, stepDur * 0.7, v * hum(0.1), layer.stabs.input, 1.25);
    }
    if (B === 0 && live('bell', t)) {
      for (const [step, vi, vel] of BELL) if (step === k) bellNote(t + sw, voicing[vi] + 12, vel * hum());
    }

    // Glitch ornaments, mid-phrase and at phrase ends
    if (live('glitch', t)) {
      if (k === 14 && bar % 4 === 3 && rand() < 0.55) blip(t + sw);
      if (k === 12 && bar % 8 === 3 && variant.snare === 'backbeat' && rand() < 0.4) stutter(t);
    }

    if (s === impactStep) impact(t);
  }

  function onBar(bar, t, s) {
    if (!idle && t - lastActivity >= opts.idleBars * barDur) {
      idle = true;
      applyMix({ mix: IDLE_MIX }, t, barDur * 2);
    }
    const prog = PROGRESSIONS[section];
    const i = ((bar % prog.length) + prog.length) % prog.length;
    const [root, v] = prog[i];
    const chordStart = bar === 0 || !same(prog[(i + prog.length - 1) % prog.length], prog[i]);
    let left = 1; // bars left in this chord
    while (left < prog.length && same(prog[(i + left) % prog.length], prog[i])) left++;
    const accent = s === impactStep;

    if (live('ep', t)) {
      const vel = accent ? 1 : bar % 2 ? 0.66 : 0.82;
      for (const m of v) epNote(t + rand() * 0.012, m, barDur - 0.05, vel * hum(0.08), layer.ep.input, accent ? 1.2 : 1);
    }
    for (const name of SUSTAINED) {
      if (!live(name, t) || !(chordStart || forceVoice || entering.has(name))) continue;
      const dur = left * barDur - 0.04;
      if (name === 'pad') padChord(t, v, dur, section === 'locked' ? 700 : section === 'daylight' ? 2600 : 1200);
      if (name === 'sub') subNote(t, root, dur);
      if (name === 'air') airChord(t, [v[1] + 24, v[3] + 24, v[2] + 12], dur);
    }
    if (section === 'locked' && bar % 4 === 0 && live('riser', t)) riser(t, barDur * 4);
    entering = new Set();
    forceVoice = false;
    for (let j = held.length - 1; j >= 0; j--) if (held[j].end < t - 1) held.splice(j, 1);
  }

  // ─── Instruments ───

  function osc(type, freq, t, end) {
    const o = ctx.createOscillator();
    o.type = type; o.frequency.value = freq;
    o.start(t); o.stop(end);
    return o;
  }
  function gain(dest, value = 0) {
    const g = ctx.createGain(); g.gain.value = value; if (dest) g.connect(dest); return g;
  }
  function noiseSrc(t, end) {
    const src = ctx.createBufferSource();
    src.buffer = noise; src.loop = true;
    src.start(t, rand() * 1.5); src.stop(end);
    return src;
  }
  function filter(type, freq, q = 0.7) {
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; return f;
  }
  function panner(pos, dest) {
    const p = ctx.createStereoPanner(); p.pan.value = pos; p.connect(dest); return p;
  }
  // Percussive envelope: 0 → peak in `attack`, then exponential decay with time constant tc
  function hit(g, t, peak, attack, tc, holdFor = 0) {
    automate(g.gain, 0).set(0, t).lin(peak, t + attack).exp(0, t + attack + holdFor, tc);
  }
  function cleanup(src, nodes) {
    src.onended = () => { for (const n of nodes) { try { n.disconnect(); } catch (e) { /* already gone */ } } };
  }

  // Electric piano: two-operator FM with a short high "tine" partial
  function epNote(t, midi, dur, vel, dest, bright = 1) {
    const f = mtof(midi);
    const end = t + dur + 1.0;
    const env = gain(dest);
    const car = osc('sine', f, t, end);
    const mod = osc('sine', f, t, end);
    const modG = gain(car.frequency);
    mod.connect(modG);
    automate(modG.gain).set(f * (1.1 + 1.1 * vel) * bright, t).exp(f * 0.45, t + 0.004, 0.35);
    const tine = osc('sine', f * 14, t, t + 0.25);
    const tineG = gain(car.frequency);
    tine.connect(tineG);
    automate(tineG.gain).set(f * 0.7 * vel * bright, t).exp(0, t + 0.002, 0.012);
    car.connect(env);
    const peak = 0.2 * vel;
    automate(env.gain).set(0, t).lin(peak, t + 0.004).exp(peak * 0.42, t + 0.004, 0.7).exp(0, t + dur, 0.14);
    cleanup(car, [car, mod, modG, tine, tineG, env]);
  }

  // Pad: detuned saws, split left/right, slow filter swell
  function padChord(t, notes, dur, cutoff) {
    const end = t + dur + 2.5;
    const gate = gain(layer.pad.input, 1);
    const env = gain(gate);
    for (const [side, detune] of [[-0.6, -7], [0.6, 7]]) {
      const lp = filter('lowpass', cutoff, 0.4);
      lp.frequency.setValueAtTime(cutoff * 0.75, t);
      lp.frequency.linearRampToValueAtTime(cutoff * 1.3, t + dur * 0.5);
      lp.frequency.linearRampToValueAtTime(cutoff * 0.8, t + dur);
      const sum = gain(lp, 0.045);
      lp.connect(panner(side, env));
      for (const m of notes) { const o = osc('sawtooth', mtof(m), t, end); o.detune.value = detune; o.connect(sum); }
    }
    automate(env.gain).set(0, t).exp(1, t, 0.45).exp(0, t + dur, 0.6);
    held.push({ gate, end: t + dur });
  }

  function subNote(t, midi, dur) {
    const f = mtof(midi);
    const end = t + dur + 1.5;
    const gate = gain(layer.sub.input, 1);
    const env = gain(gate);
    osc('sine', f, t, end).connect(env);
    osc('sine', f * 2, t, end).connect(gain(env, 0.22));
    automate(env.gain).set(0, t).exp(0.9, t, 0.05).exp(0, t + dur, 0.25);
    held.push({ gate, end: t + dur });
  }

  function airChord(t, notes, dur) {
    const end = t + dur + 3;
    const gate = gain(layer.air.input, 1);
    const env = gain(gate);
    for (const m of notes) {
      const o = osc('triangle', mtof(m), t, end);
      vibratoDepth.connect(o.detune);
      o.onended = () => { try { vibratoDepth.disconnect(o.detune); } catch (e) { /* already gone */ } };
      o.connect(gain(env, 0.16));
    }
    const breath = filter('bandpass', 6500, 2);
    noiseSrc(t, end).connect(breath);
    breath.connect(gain(env, 0.12));
    automate(env.gain).set(0, t).exp(1, t, 0.8).exp(0, t + dur, 1.0);
    held.push({ gate, end: t + dur });
  }

  function bassNote(t, midi, dur, vel) {
    const f = mtof(midi);
    const end = t + dur + 0.3;
    const env = gain(layer.bass.input);
    osc('sine', f, t, end).connect(gain(env, 0.85));
    const lp = filter('lowpass', 200, 3);
    automate(lp.frequency, 200).set(220 + 900 * vel, t).exp(180, t + 0.004, 0.08);
    osc('sawtooth', f, t, end).connect(lp);
    lp.connect(gain(env, 0.32));
    automate(env.gain).set(0, t).lin(vel, t + 0.006).exp(vel * 0.75, t + 0.006, 0.3).exp(0, t + dur, 0.03);
  }

  function kick(t, vel) {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(52, t + 0.09);
    o.frequency.exponentialRampToValueAtTime(44, t + 0.4);
    const env = gain(layer.kick.input);
    o.connect(env);
    hit(env, t, vel, 0.002, 0.11, 0.028);
    o.start(t); o.stop(t + 0.8);
    const click = filter('highpass', 2200);
    noiseSrc(t, t + 0.02).connect(click);
    const cg = gain(layer.kick.input);
    click.connect(cg);
    hit(cg, t, 0.22 * vel, 0.0005, 0.003);
    // Keys and pad dip a little on each kick
    const d = MIX.pumpDepth * vel * layer.kick.to;
    if (d > 0.01) pumpA.set(1 - d, t).exp(1, t + 0.01, 0.09);
  }

  function snare(t, vel) {
    const ghost = vel < 0.3;
    const bp = filter('bandpass', 1800, 0.7);
    const hpf = filter('highpass', 500);
    noiseSrc(t, t + 0.6).connect(bp); bp.connect(hpf);
    const ng = gain(layer.snare.input);
    hpf.connect(ng);
    hit(ng, t, 0.55 * vel, 0.001, ghost ? 0.025 : 0.07, 0.004);
    if (!ghost) {
      const body = ctx.createOscillator(); body.type = 'triangle';
      body.frequency.setValueAtTime(205, t);
      body.frequency.exponentialRampToValueAtTime(165, t + 0.06);
      const bg = gain(layer.snare.input);
      body.connect(bg);
      hit(bg, t, 0.4 * vel, 0.001, 0.035, 0.003);
      body.start(t); body.stop(t + 0.3);
    }
  }

  function hat(t, vel, open = false, short = false) {
    const hpf = filter('highpass', 6000);
    const lpf = filter('lowpass', 10000);
    noiseSrc(t, t + (open ? 0.5 : 0.12)).connect(hpf); hpf.connect(lpf);
    const g = gain(panner(0.22, layer.hats.input));
    lpf.connect(g);
    hit(g, t, 0.3 * vel, 0.001, open ? 0.09 : short ? 0.007 : 0.014, 0.001);
  }

  function shaker(t, vel) {
    const bp = filter('bandpass', 5200, 1.4);
    noiseSrc(t, t + 0.12).connect(bp);
    const g = gain(panner(-0.35, layer.shaker.input));
    bp.connect(g);
    hit(g, t, 0.25 * vel, 0.01, 0.022, 0.002);
  }

  function arpNote(t, midi, vel, dark, pan) {
    const lp = filter('lowpass', 500, 7);
    automate(lp.frequency, 500).set(400 + 2600 * vel * (dark ? 0.35 : 1), t).exp(dark ? 380 : 520, t + 0.003, 0.05);
    osc('sawtooth', mtof(midi), t, t + 0.5).connect(lp);
    const g = gain(panner(pan, layer.arp.input));
    lp.connect(g);
    hit(g, t, 0.3 * vel, 0.003, dark ? 0.12 : 0.07, 0.007);
  }

  function bellNote(t, midi, vel) {
    const f = mtof(midi);
    const end = t + 3;
    const car = osc('sine', f, t, end);
    const mod = osc('sine', f * 3.5, t, end);
    const mg = gain(car.frequency);
    mod.connect(mg);
    automate(mg.gain).set(f * 2.2 * vel, t).exp(f * 0.1, t + 0.002, 0.5);
    const g = gain(layer.bell.input);
    car.connect(g);
    hit(g, t, 0.2 * vel, 0.002, 0.55, 0.001);
  }

  // Short bit-crushed chirp
  function blip(t) {
    const o = ctx.createOscillator(); o.type = 'square';
    for (let i = 0; i < 4; i++) o.frequency.setValueAtTime(mtof(80 + Math.floor(rand() * 20)), t + i * 0.028);
    const sh = crush();
    const hpf = filter('highpass', 1200);
    const g = gain(panner((rand() - 0.5) * 1.2, layer.glitch.input));
    o.connect(sh); sh.connect(hpf); hpf.connect(g);
    automate(g.gain).set(0, t).lin(0.12, t + 0.002).set(0.12, t + 0.1).lin(0, t + 0.112);
    o.start(t); o.stop(t + 0.13);
  }

  // Hat stutter in 32nds, falling away
  function stutter(t) {
    for (let i = 0; i < 6; i++) {
      const tt = t + i * stepDur * 0.5;
      const bp = filter('bandpass', 8000 - i * 900, 1.5);
      noiseSrc(tt, tt + 0.06).connect(bp);
      const g = gain(layer.glitch.input);
      bp.connect(g);
      hit(g, tt, 0.5 * (1 - i / 7), 0.001, 0.008, 0.001);
    }
  }

  function riser(t, dur) {
    const end = t + dur + 0.1;
    const bp = filter('bandpass', 250, 3.5);
    bp.frequency.setValueAtTime(250, t);
    bp.frequency.exponentialRampToValueAtTime(3500, t + dur);
    noiseSrc(t, end).connect(bp);
    const gate = gain(layer.riser.input, 1);
    const g = gain(gate);
    bp.connect(g);
    automate(g.gain).set(0, t).lin(0.32, t + dur).set(0, t + dur + 0.01);
    held.push({ gate, end: t + dur });
  }

  // Downbeat hit for the sound-on sting and the Enclave resolve
  function impact(t) {
    const boom = ctx.createOscillator();
    boom.frequency.setValueAtTime(72, t);
    boom.frequency.exponentialRampToValueAtTime(36, t + 0.5);
    const bg = gain(layer.fx.input);
    boom.connect(bg);
    hit(bg, t, 0.9, 0.003, 0.32, 0.047);
    boom.start(t); boom.stop(t + 2.2);
    const hpf = filter('highpass', 3800);
    const lpf = filter('lowpass', 9500);
    noiseSrc(t, t + 3).connect(hpf); hpf.connect(lpf);
    const cg = gain(layer.fx.input);
    lpf.connect(cg);
    hit(cg, t, 0.16, 0.002, 0.45, 0.008);
  }

  // ─── Builders ───

  function makeNoise(seconds) {
    const len = Math.floor(seconds * ctx.sampleRate);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = rand() * 2 - 1;
    return buf;
  }

  function makeShaper(fn) {
    const curve = new Float32Array(1025);
    for (let i = 0; i < curve.length; i++) curve[i] = fn((i / 1024) * 2 - 1);
    return () => { const s = ctx.createWaveShaper(); s.curve = curve; return s; };
  }

  function makeImpulse(seconds, decay) {
    const sr = ctx.sampleRate;
    const len = Math.floor(seconds * sr);
    const pre = Math.floor(0.018 * sr);
    const buf = ctx.createBuffer(2, len, sr);
    let energy = 0;
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let y = 0;
      for (let i = pre; i < len; i++) {
        const tt = (i - pre) / sr;
        const fc = 8500 * Math.exp(-tt / 0.7) + 1600;   // darker as it decays
        const a = 1 - Math.exp((-2 * Math.PI * fc) / sr);
        y += a * ((rand() * 2 - 1) - y);
        d[i] = y * Math.exp(-tt / decay);
      }
      [0.021, 0.034, 0.047, 0.063].forEach((tap, j) => {
        const i = pre + Math.floor(tap * (ch ? 1.07 : 1) * sr);
        if (i < len) d[i] += (j % 2 ? -1 : 1) * [0.5, 0.35, 0.3, 0.22][j];
      });
      for (let i = 0; i < len; i++) energy += d[i] * d[i];
    }
    const scale = 1 / Math.sqrt(energy / 2);
    for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] *= scale; }
    return buf;
  }

  function buildPingPong(input, output, time, feedback) {
    const dl = ctx.createDelay(2); dl.delayTime.value = time;
    const dr = ctx.createDelay(2); dr.delayTime.value = time;
    const toneL = filter('lowpass', 3200, 0.5);
    const toneR = filter('lowpass', 3200, 0.5);
    const hpL = filter('highpass', 300, 0.5);
    const hpR = filter('highpass', 300, 0.5);
    const fbLR = gain(dr, feedback);
    const fbRL = gain(dl, feedback);
    input.connect(dl);
    dl.connect(toneL); toneL.connect(hpL); hpL.connect(panner(-0.8, output)); hpL.connect(fbLR);
    dr.connect(toneR); toneR.connect(hpR); hpR.connect(panner(0.8, output)); hpR.connect(fbRL);
  }

  // ─── Public API ───

  function start(when = ctx.currentTime, o = {}) {
    const { stop = 0, impact: withImpact = false, solved = false, fadeIn = 0.03 } = o;
    const at = Math.min(when, now(o));
    if (timer) clearInterval(timer);
    t0 = when; nextStep = 0; anchor = 0; pending = null; stopAtStep = Infinity;
    impactStep = withImpact ? 0 : -1;
    stopIndex = stop;
    conf = stop === 3 && solved ? STOPS[3].resolved : STOPS[stop];
    section = conf.section;
    variant = {};
    for (const k of RHYTHM_KEYS) if (conf[k]) variant[k] = conf[k];
    idle = false; lastActivity = when; solvedEarly = false;
    for (const name of LAYERS) {
      if (name === 'fx') continue;
      const l = layer[name];
      const v = (conf.mix && conf.mix[name]) || 0;
      l.auto.retarget(at).set(v, at);
      l.to = v; l.fadeEnd = 0;
    }
    entering = new Set(); forceVoice = true;
    duckA.retarget(at).set(1, at);  // in case sound went off mid-flight
    volumeA.retarget(at).set(0, at).lin(MIX.master * dbToGain(volumeDb), Math.max(at, when) + fadeIn);
    running = true;
    if (!opts.manual) {
      timer = setInterval(() => scheduleUntil(ctx.currentTime + opts.lookahead), opts.interval * 1000);
      scheduleUntil(ctx.currentTime + opts.lookahead);
    }
  }

  function setStop(i, o = {}) {
    if (!running || (i === stopIndex && !pending)) return;
    const at = now(o);
    lastActivity = at;
    const s0 = stepAt(at);
    const step = anchor + Math.ceil((s0 - anchor) / 16) * 16;
    const solved = !!o.solved;
    pending = { step, kind: 'stop', target: i, run: (s) => enterStop(s, i, solved) };
  }

  function cubeSolved(o = {}) {
    if (!running) return;
    const at = now(o);
    lastActivity = at;
    // Solved before the locked section started (still flying in): go straight to the resolve.
    if (pending && pending.kind === 'stop' && pending.target === 3) { solvedEarly = true; return; }
    if (section !== 'locked' || (pending && pending.kind === 'stop')) return;
    const s0 = stepAt(at);
    const step = anchor + Math.max(4, Math.ceil((s0 - anchor) / 4) * 4); // next beat, at least one beat in
    pending = { step, kind: 'resolve', run: (s) => resolve(s, true) };
  }

  function activity(o = {}) {
    const at = now(o);
    lastActivity = at;
    if (idle && running && !pending) {
      const s0 = stepAt(at);
      const step = anchor + Math.ceil((s0 - anchor) / 16) * 16;
      pending = { step, kind: 'wake', run: (s) => { idle = false; applyMix(conf, stepTime(s), barDur); } };
    }
  }

  function setVolume(db, o = {}) {
    volumeDb = db;
    const at = now(o);
    volumeA.retarget(at).exp(MIX.master * dbToGain(db), at, (o.ramp || 0.3) / 3);
  }

  function duck(o = {}) {
    const at = now(o);
    duckA.retarget(at).exp(dbToGain(o.depthDb ?? -5), at, 0.06);
  }

  function unduck(o = {}) {
    const at = now(o);
    duckA.retarget(at).exp(1, at, o.release ?? 0.2);
  }

  function stop(fade = 0.6, o = {}) {
    const at = now(o);
    volumeA.retarget(at).exp(0, at, fade / 4);
    stopAtStep = stepAt(at + fade);
    releaseHeld(at + fade, 0.05);
    if (timer) {
      const id = timer;
      timer = null;
      setTimeout(() => { clearInterval(id); if (!timer) running = false; }, (fade + opts.lookahead) * 1000 + 50);
    }
  }

  function dispose() {
    if (timer) clearInterval(timer);
    timer = null; running = false;
    try { tremolo.stop(); vibrato.stop(); } catch (e) { /* not started */ }
    duckGain.disconnect();
  }

  return {
    start, setStop, cubeSolved, activity, setVolume, duck, unduck, stop, dispose, scheduleUntil,
    get barDuration() { return barDur; },
    get beatDuration() { return stepDur * 4; },
    nextBarTime(at = ctx.currentTime) { const s = stepAt(at); return stepTime(anchor + Math.ceil((s - anchor) / 16) * 16); },
    getState() {
      return { running, stop: stopIndex, section, idle, bar: Math.floor((nextStep - anchor) / 16), sectionStart: stepTime(anchor) };
    },
  };
}
