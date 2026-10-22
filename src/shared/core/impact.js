// Comic impact frames: a few held frames of two-ink silhouette / inversion with speed lines, plus shake.
// Rate-limited (at most one burst every 700 ms) and skipped entirely under reduced motion.
import { post } from '../gfx/pipeline.js';

const SEQ = {
  hit: [{ m: 1, a: 1 }, { m: 2, a: 1 }],
  big: [{ m: 3, a: 1 }, { m: 1, a: 1 }, { m: 2, a: 1 }],
  soft: [{ m: 1, a: 0.55 }],
  accent: [{ m: 3, a: 1 }, { m: 3, a: 0.6 }],
  // the signature without the inverted paper frame: one full-bleed field, then the two-ink silhouette
  sig: [{ m: 3, a: 1 }, { m: 1, a: 1 }],
};

export class Impact {
  constructor({ reduced = false, frame = 1 / 16 } = {}) {
    this.reduced = reduced;
    this.frame = frame;
    this.queue = [];
    this.t = 0;
    this.last = -10;
    this.shake = { x: 0, y: 0, amt: 0 };
    this.root = document.documentElement;
  }
  hit({ seq = 'hit', center = [0.5, 0.5], shake = 1, at = 0 } = {}) {
    if (this.reduced) return;
    const now = performance.now() / 1000;
    if (now - this.last < 0.7) return;
    this.last = now;
    const frames = SEQ[seq] || SEQ.hit;
    this.queue = frames.map((f, i) => ({ ...f, t: at + i * this.frame }));
    this.queue.push({ m: 0, a: 0, t: at + frames.length * this.frame });
    this.t = 0;
    post.uImpactCenter.value.set(center[0], center[1]);
    post.uImpactSeed.value = Math.random() * 100;
    this.shake.amt = Math.max(this.shake.amt, shake);
  }
  update(dt) {
    if (this.queue.length) {
      this.t += dt;
      while (this.queue.length && this.queue[0].t <= this.t) {
        const f = this.queue.shift();
        post.uImpact.value = f.a; post.uImpactMode.value = f.m || post.uImpactMode.value;
        if (f.a > 0) { this.root.dataset.impact = String(f.m); post.uImpactSeed.value += 1.7; }
        else delete this.root.dataset.impact;
      }
    }
    // shake on twos: jumps, never smooth drift
    this.shake.amt = Math.max(0, this.shake.amt - dt * 3.2);
    const k = this.shake.amt * this.shake.amt;
    const step = Math.floor(performance.now() / 62);
    if (step !== this._step) {
      this._step = step;
      this.shake.x = (Math.random() * 2 - 1) * k;
      this.shake.y = (Math.random() * 2 - 1) * k;
    }
    return this.shake;
  }
}
