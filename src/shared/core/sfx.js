// Procedural sound effects (WebAudio, no audio files). Off by default; the toggle turns it on.
const KEY = 'xini-sound';

class Sfx {
  constructor() {
    this.on = false;
    this.ctx = null;
    this.listeners = new Set();
    this.lastPlay = {};
  }
  ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    this.ctx = ctx;
    this.master = ctx.createGain(); this.master.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
    this.master.connect(comp); comp.connect(ctx.destination);
    const len = ctx.sampleRate * 1.5;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }
  set(on) {
    this.on = on;
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch {}
    if (on) { const c = this.ensure(); if (c && c.state === 'suspended') c.resume(); }
    for (const fn of this.listeners) fn(on);
  }
  toggle() { this.set(!this.on); }
  onChange(fn) { this.listeners.add(fn); }
  remembered() { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } }
  src(dur) {
    const s = this.ctx.createBufferSource(); s.buffer = this.noise;
    s.start(this.ctx.currentTime, Math.random() * 0.5, dur + 0.05); return s;
  }
  env(node, t, a, peak, d) {
    const g = this.ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    node.connect(g); g.connect(this.master); return g;
  }
  filt(type, f, q = 1) { const b = this.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }
  tone(type, f0, f1, t, a, peak, d) {
    const o = this.ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + a + d);
    this.env(o, t, a, peak, d); o.start(t); o.stop(t + a + d + 0.05);
  }
  play(name, opt = {}) {
    if (!this.on || !this.ctx) return;
    const now = performance.now();
    if (now - (this.lastPlay[name] || 0) < 45) return;
    this.lastPlay[name] = now;
    const c = this.ctx, t = c.currentTime + 0.005, v = opt.gain ?? 1;
    switch (name) {
      case 'tick': this.tone('sine', 2400, 1800, t, 0.002, 0.05 * v, 0.03); break;
      case 'snap': {
        const n = this.src(0.06); const hp = this.filt('highpass', 2500); const bp = this.filt('bandpass', 4200, 1.4);
        n.connect(hp); hp.connect(bp); this.env(bp, t, 0.001, 0.5 * v, 0.05);
        this.tone('triangle', 1700, 500, t, 0.001, 0.12 * v, 0.03); break;
      }
      case 'fold': {
        const n = this.src(0.3); const bp = this.filt('bandpass', 900, 0.9);
        bp.frequency.setValueAtTime(700, t); bp.frequency.exponentialRampToValueAtTime(2800, t + 0.22);
        n.connect(bp); this.env(bp, t, 0.03, 0.22 * v, 0.2); break;
      }
      case 'slam': {
        this.tone('sine', 140, 42, t, 0.002, 0.9 * v, 0.24);
        const n = this.src(0.2); const lp = this.filt('lowpass', 600); n.connect(lp); this.env(lp, t, 0.001, 0.5 * v, 0.12);
        const n2 = this.src(0.08); const hp = this.filt('highpass', 3000); n2.connect(hp); this.env(hp, t, 0.001, 0.25 * v, 0.05); break;
      }
      case 'stamp': {
        this.tone('sine', 95, 50, t, 0.002, 0.7 * v, 0.16);
        const n = this.src(0.12); const bp = this.filt('bandpass', 1400, 0.7); n.connect(bp); this.env(bp, t, 0.001, 0.35 * v, 0.08); break;
      }
      case 'whoosh': {
        const n = this.src(0.5); const bp = this.filt('bandpass', 3000, 0.8);
        bp.frequency.setValueAtTime(3200, t); bp.frequency.exponentialRampToValueAtTime(400, t + 0.38);
        n.connect(bp); this.env(bp, t, 0.08, 0.28 * v, 0.3); break;
      }
      case 'hiss': {
        const dur = opt.dur ?? 0.35;
        const n = this.src(dur + 0.2); const bp = this.filt('bandpass', 7000, 0.7); const hp = this.filt('highpass', 3500);
        n.connect(hp); hp.connect(bp);
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32 * v, t + 0.03);
        g.gain.setValueAtTime(0.32 * v, t + dur); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.1);
        bp.connect(g); g.connect(this.master); break;
      }
      case 'rattle': {
        for (let i = 0; i < 5; i++) {
          const tt = t + i * 0.075 + Math.random() * 0.01;
          const n = this.src(0.03); const bp = this.filt('bandpass', 3000 + Math.random() * 1500, 4); n.connect(bp); this.env(bp, tt, 0.001, 0.3 * v, 0.025);
        }
        break;
      }
      case 'splat': {
        const n = this.src(0.25); const lp = this.filt('lowpass', 1800); n.connect(lp); this.env(lp, t, 0.002, 0.5 * v, 0.16);
        this.tone('sine', 220, 70, t, 0.002, 0.35 * v, 0.12); break;
      }
      case 'dial': { // a ratchet click: a bright tick over a small knock
        const n = this.src(0.03); const bp = this.filt('bandpass', 5200, 6); n.connect(bp); this.env(bp, t, 0.0005, 0.45 * v, 0.02);
        this.tone('square', 1300, 900, t, 0.0005, 0.05 * v, 0.018);
        this.tone('sine', 180, 120, t, 0.001, 0.2 * v, 0.05); break;
      }
      case 'unlock': { // a heavy clunk: low thump, a ringing bolt, a breath of released pressure
        this.tone('sine', 90, 48, t, 0.002, 0.8 * v, 0.22);
        const n = this.src(0.12); const bp = this.filt('bandpass', 900, 1.2); n.connect(bp); this.env(bp, t, 0.001, 0.4 * v, 0.08);
        this.tone('triangle', 2200, 2150, t + 0.01, 0.002, 0.06 * v, 0.5);
        this.tone('triangle', 3310, 3290, t + 0.01, 0.002, 0.035 * v, 0.4);
        const h = this.src(0.4); const hp = this.filt('highpass', 4000); h.connect(hp); this.env(hp, t + 0.05, 0.02, 0.12 * v, 0.3); break;
      }
      case 'seat': { // a module seating: a sharp clack, a second latch, a thump under both
        const n = this.src(0.04); const bp = this.filt('bandpass', 2600, 3); n.connect(bp); this.env(bp, t, 0.0005, 0.6 * v, 0.03);
        const n2 = this.src(0.04); const bp2 = this.filt('bandpass', 1500, 4); n2.connect(bp2); this.env(bp2, t + 0.018, 0.0005, 0.4 * v, 0.03);
        this.tone('sine', 140, 70, t, 0.002, 0.45 * v, 0.09); break;
      }
      case 'relay': { // a relay pulling in
        const n = this.src(0.02); const hp = this.filt('highpass', 2000); n.connect(hp); this.env(hp, t, 0.0003, 0.35 * v, 0.012);
        this.tone('square', 260, 200, t, 0.0005, 0.04 * v, 0.015); break;
      }
      case 'power': { // power coming up: a rising whine over a low swell
        const o = c.createOscillator(); o.type = 'sawtooth';
        o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(1400, t + 0.9);
        const lp = this.filt('lowpass', 2400, 2); o.connect(lp); this.env(lp, t, 0.25, 0.09 * v, 0.7); o.start(t); o.stop(t + 1.1);
        this.tone('sine', 45, 60, t, 0.4, 0.4 * v, 0.6); break;
      }
      default: break;
    }
  }
}

export const sfx = new Sfx();
