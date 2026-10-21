// Tiny timeline: tasks with a start, a length and an update(progress). Progress can be stepped
// ("on twos": 12 drawings a second) so motion reads like hand-timed animation.

export const ease = {
  linear: (x) => x,
  out3: (x) => 1 - Math.pow(1 - x, 3),
  in3: (x) => x * x * x,
  inOut3: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outBack: (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
  outExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
};

export const stepped = (p, dur, fps = 12) => {
  const n = Math.max(1, Math.round(dur * fps));
  return Math.min(1, Math.floor(p * n + 1e-6) / n);
};

export class Timeline {
  constructor() { this.tasks = []; this.t = 0; }
  clear() { this.tasks.length = 0; }
  add(start, dur, fn, { ease: e = ease.linear, step = 0, onStart, onEnd } = {}) {
    this.tasks.push({ s: this.t + start, d: Math.max(1e-4, dur), fn, e, step, onStart, onEnd, started: false, done: false });
    return this;
  }
  at(start, fn) { return this.add(start, 1e-4, (p) => { if (p >= 1) fn(); }); }
  update(dt) {
    this.t += dt;
    for (const k of this.tasks) {
      if (k.done || this.t < k.s) continue;
      if (!k.started) { k.started = true; k.onStart?.(); }
      let p = Math.min(1, (this.t - k.s) / k.d);
      if (k.step) p = stepped(p, k.d, k.step);
      k.fn(k.e(p), p);
      if (p >= 1) { k.done = true; k.onEnd?.(); }
    }
    this.tasks = this.tasks.filter((k) => !k.done);
  }
  get busy() { return this.tasks.length > 0; }
}
