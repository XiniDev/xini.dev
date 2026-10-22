// Procedural sound effects (WebAudio, no audio files). Off by default; the toggle turns it on.
import { createMaster } from './master.js';
import { createMusic } from './music.js';

const KEY = 'xini-sound';

// Every use of a cue, with its level. Tiers are peaks measured through the master chain, each use alone
// (tools/audio/sfx-levels.mjs): A signature −4…−2 dBFS, B movement −10…−6, C detail −18…−12.
export const LEVELS = {
  stingSlam: { cue: 'slam', tier: 'A', gain: 0.57 },
  unlock: { cue: 'unlock', tier: 'A', gain: 0.72 },
  flight: { cue: 'whoosh', tier: 'B', gain: 2.07 },
  arrive: { cue: 'slam', tier: 'B', gain: 0.32 },
  moduleSeat: { cue: 'seat', tier: 'B', gain: 0.71 },
  chipSeat: { cue: 'seat', tier: 'B', gain: 0.71 },
  boardDone: { cue: 'snap', tier: 'B', gain: 1.0 },
  finale: { cue: 'power', tier: 'B', gain: 0.87 },
  fan: { cue: 'whoosh', tier: 'B', gain: 2.03 },
  lattice: { cue: 'snap', tier: 'B', gain: 1.0 },
  board: { cue: 'snap', tier: 'B', gain: 1.0 },
  relay: { cue: 'relay', tier: 'C', gain: 0.43 },
  hover: { cue: 'tick', tier: 'C', gain: 3.13 },
  toggle: { cue: 'snap', tier: 'C', gain: 0.45 },
  pick: { cue: 'tick', tier: 'C', gain: 3.11 },
  dial: { cue: 'dial', tier: 'C', gain: 0.6 },
  dialIdle: { cue: 'dial', tier: 'C', gain: 0.44 },
  pager: { cue: 'whoosh', tier: 'C', gain: 0.91 },
  index: { cue: 'whoosh', tier: 'C', gain: 0.92 },
  stingWhine: { cue: 'power', tier: null, gain: 0.74 }, // rises from about −24 dBFS to tier B by the slam
};
export const TIERS = { A: [-4, -2], B: [-10, -6], C: [-18, -12] };
const WHINE_FROM = 0.48;

export class Sfx {
  constructor() {
    this.on = false;
    this.ctx = null;
    this.music = null;
    this.listeners = new Set();
    this.lastPlay = {};
    this.where = { stop: () => 0, solved: () => false }; // the world tells the music where the visitor is
  }
  ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    this.attach(new AC());
    // a hidden tab fades out and suspends; the music carries on where it stopped
    document.addEventListener('visibilitychange', () => {
      if (!this.on) return;
      clearTimeout(this.suspendT);
      if (document.hidden) { this.fade(0, 0.25); this.suspendT = setTimeout(() => this.ctx.suspend(), 300); }
      else this.ctx.resume().then(() => this.fade(1, 0.4));
    });
    return this.ctx;
  }
  /** cues → sfxBus and music → musicBus, both into the master chain (limiter, soft clip), then the output gain */
  attach(ctx) {
    this.ctx = ctx;
    this.chain = createMaster(ctx);
    this.out = ctx.createGain();
    this.chain.output.connect(this.out); this.out.connect(ctx.destination);
    this.sfxBus = ctx.createGain(); this.sfxBus.connect(this.chain.input);
    this.musicBus = ctx.createGain(); this.musicBus.connect(this.chain.input);
    this.music = createMusic(ctx, this.musicBus);
    const len = ctx.sampleRate * 1.5;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    // seeded, and read from one place: each cue sounds the same every time, so its level is the level in LEVELS
    let seed = 0x5eed;
    const rnd = () => { seed = (seed + 0x6d2b79f5) | 0; let x = Math.imul(seed ^ (seed >>> 15), 1 | seed); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
    for (let i = 0; i < len; i++) d[i] = rnd() * 2 - 1;
    return ctx;
  }
  set(on) {
    this.on = on;
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch {}
    if (on) this.soundOn(); else this.soundOff();
    for (const fn of this.listeners) fn(on);
  }
  /** the first switch-on in a page load plays the sting (the boot sound) and the music's first chord lands on its
   *  slam; later ones fade the music in. Times run on the context clock from the click, which a new or suspended
   *  context holds still until it runs. */
  soundOn() {
    const fresh = !this.ctx, ctx = this.ensure(); if (!ctx) return;
    clearTimeout(this.suspendT);
    ctx.resume();
    this.fade(1, 0.05);
    // the click is t = 0: a new context's clock starts there, and may run while the graph and the music are built
    const t0 = fresh ? 0 : ctx.currentTime, at = { stop: this.where.stop(), solved: this.where.solved() };
    if (this.stung) { this.music.start(t0 + 0.05, { ...at, fadeIn: 0.8 }); return; }
    this.stung = true;
    // switched on during the visual boot with its impact frame far enough away, the slam lands on that frame: its
    // time on the page clock is mapped onto the context clock once that clock runs (a new context starts late)
    const impact = this.where.bootImpact?.() ?? null;
    if (impact !== null && impact >= 0.6) {
      const hit = performance.now() + impact * 1000, c0 = ctx.currentTime;
      // (the output's timestamps only mean something once the device plays: until then the mapping is stale)
      const land = () => {
        if (!this.on) return;
        const ts = ctx.getOutputTimestamp?.(), live = ctx.currentTime > c0 && (!ts || ts.contextTime > 0);
        if (!live && performance.now() < hit - 450) { setTimeout(land, 15); return; }
        const now = ctx.currentTime, at2 = this.ctxTimeAt(hit);
        this.sting(now, at2 - now);
        this.music.start(at2, { ...at, impact: true });
      };
      land();
      return;
    }
    this.sting(t0, 2.2);
    this.music.start(t0 + 2.2, { ...at, impact: true });
  }
  /** a moment on the page clock (performance.now() ms) on the context clock, through the output's timestamp when it
   *  has one (measured within 12 ms of the frame on the context clock; currentTime alone, read just after the clock
   *  starts, was 33 ms out) */
  ctxTimeAt(ms) {
    const ts = this.ctx.getOutputTimestamp?.();
    if (ts && ts.performanceTime > 0) return ts.contextTime + (ms - ts.performanceTime) / 1000;
    return this.ctx.currentTime + (ms - performance.now()) / 1000;
  }
  /** relays from t0 + 0.05 s, the whine from t0 + 0.38 s, the slam at t0 + land */
  sting(t0, land) {
    const bus = (this.stingBus = this.ctx.createGain()); bus.connect(this.sfxBus);
    [0.05, 0.12, 0.2, 0.27, 0.33].forEach((dt) => this.play('relay', { at: t0 + dt, bus }));
    this.play('stingWhine', { at: t0 + 0.38, dur: land - 0.38, bus });
    this.play('stingSlam', { at: t0 + land, bus });
  }
  soundOff() {
    if (!this.ctx) return;
    this.music.stop(0.6);
    this.fade(0, 0.3);
    // a sting cut short is gone for good: nothing of it waits on the clock for the next switch-on
    const bus = this.stingBus; this.stingBus = null;
    if (bus) setTimeout(() => bus.disconnect(), 320);
    clearTimeout(this.suspendT);
    this.suspendT = setTimeout(() => this.ctx.suspend(), 700);
  }
  fade(to, seconds) {
    const g = this.out.gain, now = this.ctx.currentTime;
    g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(to, now + seconds);
  }
  /** the music follows the visit: a flight departs (jumps and the finale too), lands, the cube solves, any activity */
  depart(to) {
    if (!this.on || !this.music) return;
    this.music.setStop(to, { solved: to === 3 && this.where.solved() });
    this.music.duck();
  }
  arrive() { if (this.on && this.music) this.music.unduck(); }
  cubeSolved() { if (this.on && this.music) this.music.cubeSolved(); }
  activity() { if (this.on && this.music) this.music.activity(); }
  toggle() { this.set(!this.on); }
  onChange(fn) { this.listeners.add(fn); }
  remembered() { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } }
  src(dur, t) {
    const s = this.ctx.createBufferSource(); s.buffer = this.noise;
    s.start(t, 0.25, dur + 0.05); return s;
  }
  env(node, t, a, peak, d) {
    // (silent until it opens: a gain sits at 1 before its first event, which let a source that starts before its
    // envelope through at full scale)
    const g = this.ctx.createGain(); g.gain.value = 0.0001; g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    node.connect(g); g.connect(this.dest); return g;
  }
  filt(type, f, q = 1) { const b = this.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }
  tone(type, f0, f1, t, a, peak, d) {
    const o = this.ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + a + d);
    this.env(o, t, a, peak, d); o.start(t); o.stop(t + a + d + 0.05);
  }
  play(name, opt = {}) {
    if (!this.on || !this.ctx) return;
    if (opt.at == null) { // live cues are rate-limited; scheduled ones (the sting) are timed by the caller
      const now = performance.now();
      if (now - (this.lastPlay[name] || 0) < 45) return;
      this.lastPlay[name] = now;
    }
    const L = LEVELS[name];
    const c = this.ctx, t = opt.at ?? c.currentTime + 0.005, v = (L ? L.gain : 1) * (opt.gain ?? 1);
    this.dest = opt.bus ?? this.sfxBus;
    switch (L ? L.cue : name) {
      case 'tick': this.tone('sine', 2400, 1800, t, 0.002, 0.05 * v, 0.03); break;
      case 'snap': {
        const n = this.src(0.06, t); const hp = this.filt('highpass', 2500); const bp = this.filt('bandpass', 4200, 1.4);
        n.connect(hp); hp.connect(bp); this.env(bp, t, 0.001, 0.5 * v, 0.05);
        this.tone('triangle', 1700, 500, t, 0.001, 0.12 * v, 0.03); break;
      }
      case 'fold': {
        const n = this.src(0.3, t); const bp = this.filt('bandpass', 900, 0.9);
        bp.frequency.setValueAtTime(700, t); bp.frequency.exponentialRampToValueAtTime(2800, t + 0.22);
        n.connect(bp); this.env(bp, t, 0.03, 0.22 * v, 0.2); break;
      }
      case 'slam': {
        this.tone('sine', 140, 42, t, 0.002, 0.9 * v, 0.24);
        const n = this.src(0.2, t); const lp = this.filt('lowpass', 600); n.connect(lp); this.env(lp, t, 0.001, 0.5 * v, 0.12);
        const n2 = this.src(0.08, t); const hp = this.filt('highpass', 3000); n2.connect(hp); this.env(hp, t, 0.001, 0.25 * v, 0.05); break;
      }
      case 'stamp': {
        this.tone('sine', 95, 50, t, 0.002, 0.7 * v, 0.16);
        const n = this.src(0.12, t); const bp = this.filt('bandpass', 1400, 0.7); n.connect(bp); this.env(bp, t, 0.001, 0.35 * v, 0.08); break;
      }
      case 'whoosh': {
        const n = this.src(0.5, t); const bp = this.filt('bandpass', 3000, 0.8);
        bp.frequency.setValueAtTime(3200, t); bp.frequency.exponentialRampToValueAtTime(400, t + 0.38);
        n.connect(bp); this.env(bp, t, 0.08, 0.28 * v, 0.3); break;
      }
      case 'hiss': {
        const dur = opt.dur ?? 0.35;
        const n = this.src(dur + 0.2, t); const bp = this.filt('bandpass', 7000, 0.7); const hp = this.filt('highpass', 3500);
        n.connect(hp); hp.connect(bp);
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32 * v, t + 0.03);
        g.gain.setValueAtTime(0.32 * v, t + dur); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.1);
        bp.connect(g); g.connect(this.dest); break;
      }
      case 'rattle': {
        for (let i = 0; i < 5; i++) {
          const tt = t + i * 0.075 + Math.random() * 0.01;
          const n = this.src(0.03, tt); const bp = this.filt('bandpass', 3000 + Math.random() * 1500, 4); n.connect(bp); this.env(bp, tt, 0.001, 0.3 * v, 0.025);
        }
        break;
      }
      case 'splat': {
        const n = this.src(0.25, t); const lp = this.filt('lowpass', 1800); n.connect(lp); this.env(lp, t, 0.002, 0.5 * v, 0.16);
        this.tone('sine', 220, 70, t, 0.002, 0.35 * v, 0.12); break;
      }
      case 'dial': { // a ratchet click: a bright tick over a small knock
        const n = this.src(0.03, t); const bp = this.filt('bandpass', 5200, 6); n.connect(bp); this.env(bp, t, 0.0005, 0.45 * v, 0.02);
        this.tone('square', 1300, 900, t, 0.0005, 0.05 * v, 0.018);
        this.tone('sine', 180, 120, t, 0.001, 0.2 * v, 0.05); break;
      }
      case 'unlock': { // a heavy clunk: low thump, a ringing bolt, a breath of released pressure
        this.tone('sine', 90, 48, t, 0.002, 0.8 * v, 0.22);
        const n = this.src(0.12, t); const bp = this.filt('bandpass', 900, 1.2); n.connect(bp); this.env(bp, t, 0.001, 0.4 * v, 0.08);
        this.tone('triangle', 2200, 2150, t + 0.01, 0.002, 0.06 * v, 0.5);
        this.tone('triangle', 3310, 3290, t + 0.01, 0.002, 0.035 * v, 0.4);
        const h = this.src(0.4, t); const hp = this.filt('highpass', 4000); h.connect(hp); this.env(hp, t + 0.05, 0.02, 0.12 * v, 0.3); break;
      }
      case 'seat': { // a module seating: a sharp clack, a second latch, a thump under both
        const n = this.src(0.04, t); const bp = this.filt('bandpass', 2600, 3); n.connect(bp); this.env(bp, t, 0.0005, 0.6 * v, 0.03);
        const n2 = this.src(0.04, t); const bp2 = this.filt('bandpass', 1500, 4); n2.connect(bp2); this.env(bp2, t + 0.018, 0.0005, 0.4 * v, 0.03);
        this.tone('sine', 140, 70, t, 0.002, 0.45 * v, 0.09); break;
      }
      case 'relay': { // a relay pulling in
        const n = this.src(0.02, t); const hp = this.filt('highpass', 2000); n.connect(hp); this.env(hp, t, 0.0003, 0.35 * v, 0.012);
        this.tone('square', 260, 200, t, 0.0005, 0.04 * v, 0.015); break;
      }
      case 'power': { // power coming up: a rising whine over a low swell
        const rise = opt.dur ?? 0.9;
        const o = c.createOscillator(); o.type = 'sawtooth';
        o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(1400, t + rise);
        const lp = this.filt('lowpass', 2400, 2); o.connect(lp);
        if (opt.dur) { // the sting's whine climbs from WHINE_FROM of its peak to the peak at the slam, which cuts it
          const g = c.createGain(); g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(WHINE_FROM * 0.09 * v, t + 0.04); g.gain.exponentialRampToValueAtTime(0.09 * v, t + rise);
          g.gain.exponentialRampToValueAtTime(0.0001, t + rise + 0.06);
          lp.connect(g); g.connect(this.dest); o.start(t); o.stop(t + rise + 0.1);
          this.tone('sine', 45, 60, t, rise, 0.4 * v, 0.06); break;
        }
        this.env(lp, t, 0.25, 0.09 * v, 0.7); o.start(t); o.stop(t + 1.1);
        this.tone('sine', 45, 60, t, 0.4, 0.4 * v, 0.6); break;
      }
      default: break;
    }
  }
}

export const sfx = new Sfx();
