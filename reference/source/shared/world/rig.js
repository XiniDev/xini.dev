import * as THREE from 'three';

// Camera rig for a continuous world. Stops are camera poses; legs are the waypoints between
// consecutive stops, so a flight goes around structures instead of through them. Jumping several
// stops flies the whole route quickly (the world stays continuous). The camera runs on the smooth
// clock; banking comes from the path's curvature.
//
// Options (all off by default, so older worlds fly exactly as before):
//   profile: 'minjerk'   speed profile with zero acceleration at both ends (smoother starts and stops)
//   lookAhead: 0..1      mid-flight the gaze swings onto the path ahead, then back to the subject
//   damp: rate           orientation follows its target through a critically damped filter (no snaps)
//   settle: units        a small push past the stop on arrival that springs back
// A leg can be an array of waypoints or { pts, dur, look, warp } to give that hop its own duration,
// its own look-ahead, and its own timing: warp is a list of [time, distance] keys (0..1) through which a
// smooth monotone curve is fitted, so a flight can hang at a point of the path (a reveal) and race the rest.

const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const minJerk = (x) => x * x * x * (10 + x * (-15 + 6 * x));
/** monotone cubic through [[x, y], ...] (Fritsch-Carlson), flat at both ends */
export function monotone(keys) {
  const n = keys.length, xs = keys.map((k) => k[0]), ys = keys.map((k) => k[1]);
  const d = [], m = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (3 * (xs[i + 1] - xs[i - 1])) / ((2 * xs[i + 1] - xs[i] - xs[i - 1]) / d[i - 1] + (xs[i + 1] + xs[i] - 2 * xs[i - 1]) / d[i]);
  return (x) => {
    if (x <= xs[0]) return ys[0]; if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0; while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}

export class Rig {
  /**
   * @param {THREE.PerspectiveCamera} camera
   * @param {Array<{id, p, t, fov?, roll?}>} stops
   * @param {Array<Array<{p, t, fov?, roll?}>|{pts: Array, dur?: number}>} legs  legs[i]: waypoints from stop i to stop i+1 (exclusive)
   */
  constructor(camera, stops, legs = [], { closed = false, speed = 34, minT = 1.5, maxT = 3.2, bank = 0.9, maxBank = 0.35, profile = 'cubic', lookAhead = 0, damp = 0, settle = 0 } = {}) {
    this.camera = camera; this.stops = stops; this.legs = legs; this.closed = closed;
    this.speed = speed; this.minT = minT; this.maxT = maxT; this.bank = bank; this.maxBank = maxBank;
    this.profile = profile; this.lookAheadAmt = lookAhead; this.damp = damp; this.settleAmt = settle;
    this.index = 0;
    this.pose = this.copyPose(stops[0]);
    this.flight = null;
    this.offset = { p: new THREE.Vector3(), t: new THREE.Vector3() }; // per-stop nudges (project exhibits)
    this.offsetTarget = { p: new THREE.Vector3(), t: new THREE.Vector3() };
    this.speedNow = 0;
    this.lastPos = this.pose.p.clone();
    this.q = null; this.dt = 1 / 60;
    this.settle = null;
  }
  copyPose(s) { return { p: new THREE.Vector3(...[].concat(s.p.toArray ? s.p.toArray() : s.p)), t: new THREE.Vector3(...[].concat(s.t.toArray ? s.t.toArray() : s.t)), fov: s.fov ?? 45, roll: s.roll ?? 0 }; }
  V(a) { return a.isVector3 ? a.clone() : new THREE.Vector3(...a); }
  legPts(i) { const L = this.legs[i]; return !L ? [] : Array.isArray(L) ? L : (L.pts || []); }
  /** the chain of poses from stop a to stop b (forward along the route; closed routes may wrap) */
  chain(a, b) {
    const n = this.stops.length, pts = [];
    let dir = b > a ? 1 : -1;
    let steps = Math.abs(b - a);
    if (this.closed) {
      const fwd = (b - a + n) % n, back = (a - b + n) % n;
      if (fwd <= back) { dir = 1; steps = fwd; } else { dir = -1; steps = back; }
    }
    let i = a;
    pts.push(this.stops[i]);
    for (let k = 0; k < steps; k++) {
      const j = (i + dir + n) % n;
      const leg = dir > 0 ? this.legPts(i) : this.legPts(j).slice().reverse();
      for (const w of leg) pts.push(w);
      pts.push(this.stops[j]);
      i = j;
    }
    this.lastHop = steps === 1 ? (dir > 0 ? a : (a - 1 + n) % n) : -1;
    this.lastDir = dir;
    return pts;
  }
  go(to, { duration } = {}) {
    if (to === this.index && !this.flight) return 0;
    const from = this.index;
    const chain = this.chain(from, to);
    // start from where the camera is right now (a flight can be interrupted)
    const start = { p: this.pose.p.clone(), t: this.pose.t.clone(), fov: this.pose.fov, roll: this.pose.roll };
    const P = [start.p, ...chain.slice(1).map((c) => this.V(c.p))];
    const T = [start.t, ...chain.slice(1).map((c) => this.V(c.t))];
    const F = [start.fov, ...chain.slice(1).map((c) => c.fov ?? 45)];
    const R = [start.roll, ...chain.slice(1).map((c) => c.roll ?? 0)];
    const pc = new THREE.CatmullRomCurve3(P, false, 'centripetal', 0.5);
    const tc = new THREE.CatmullRomCurve3(T, false, 'centripetal', 0.5);
    pc.arcLengthDivisions = 400; tc.arcLengthDivisions = 400;
    const len = pc.getLength();
    const hops = chain.filter((c) => c.id).length - 1;
    const leg = this.lastHop >= 0 ? this.legs[this.lastHop] : null;
    const opt = leg && !Array.isArray(leg) && !this.flight ? leg : {};
    const fixed = opt.dur ?? null;
    let warp = null;
    if (opt.warp) { const w = monotone(opt.warp); warp = this.lastDir > 0 ? w : (x) => 1 - w(1 - x); }
    const dur = duration ?? fixed ?? THREE.MathUtils.clamp(len / this.speed, this.minT, this.maxT + Math.max(0, hops - 1) * 0.5);
    // fov/roll keyed by arc-length fraction at each control point
    const lens = [0]; for (let i = 1; i < P.length; i++) lens.push(lens[i - 1] + P[i].distanceTo(P[i - 1]));
    const keys = lens.map((l) => l / (lens[lens.length - 1] || 1));
    this.flight = { pc, tc, F, R, keys, t: 0, dur, from, to, warp, look: opt.look ?? this.lookAheadAmt };
    this.index = to;
    this.settle = null;
    this.offsetTarget.p.set(0, 0, 0); this.offsetTarget.t.set(0, 0, 0);
    return dur;
  }
  /** small move inside the current stop (e.g. the next project exhibit) */
  nudge(p, t) { this.offsetTarget.p.copy(this.V(p)); this.offsetTarget.t.copy(this.V(t)); }
  sampleKeyed(arr, keys, u) {
    let k = 1; while (k < keys.length - 1 && keys[k] < u) k++;
    const f = (u - keys[k - 1]) / Math.max(1e-6, keys[k] - keys[k - 1]);
    return arr[k - 1] + (arr[k] - arr[k - 1]) * THREE.MathUtils.clamp(f, 0, 1);
  }
  /** a value per control point, read at a curve parameter */
  sampleT(arr, tp) {
    const x = tp * (arr.length - 1), k = Math.min(arr.length - 2, Math.floor(x)), f = x - k;
    return arr[k] + (arr[k + 1] - arr[k]) * f;
  }
  get flying() { return !!this.flight; }
  get progress() { return this.flight ? this.flight.t / this.flight.dur : 1; }
  update(dt) {
    this.dt = dt;
    if (this.flight) {
      const f = this.flight;
      f.t = Math.min(f.dur, f.t + dt);
      const x = f.t / f.dur;
      // clamped: the polynomial profiles can land a hair past 1, which arc-length lookups turn into NaN
      const u = THREE.MathUtils.clamp(f.warp ? f.warp(x) : this.profile === 'minjerk' ? minJerk(x) : easeInOut(x), 0, 1);
      // the position runs at even speed along its path; the gaze follows the same control-point parameter,
      // so camera and subject pass each waypoint pose together
      const tp = THREE.MathUtils.clamp(f.pc.getUtoTmapping(u), 0, 1);
      this.pose.p.copy(f.pc.getPoint(tp));
      this.pose.t.copy(f.tc.getPoint(tp));
      if (f.look > 0) {
        // the gaze swings onto the road ahead mid-flight, at the same distance as the subject
        const s = Math.sin(Math.PI * u), w = f.look * s * s;
        const gaze = this.pose.t.distanceTo(this.pose.p);
        const ahead = f.pc.getPointAt(Math.min(1, u + 0.06)).sub(this.pose.p);
        if (ahead.lengthSq() > 1e-6) this.pose.t.lerp(ahead.normalize().multiplyScalar(gaze).add(this.pose.p), w);
      }
      this.pose.fov = this.sampleT(f.F, tp);
      let roll = this.sampleT(f.R, tp);
      // bank into the turn: lateral acceleration in camera space
      const look = this.pose.t.clone().sub(this.pose.p).normalize();
      const side = new THREE.Vector3().crossVectors(look, new THREE.Vector3(0, 1, 0)).normalize();
      const tan0 = f.pc.getTangentAt(Math.max(0, u - 0.04)), tan1 = f.pc.getTangentAt(Math.min(1, u + 0.04));
      const turn = tan1.sub(tan0).dot(side);
      roll += THREE.MathUtils.clamp(-turn * this.bank, -this.maxBank, this.maxBank) * Math.sin(Math.PI * u);
      this.pose.roll = roll;
      if (f.t >= f.dur) {
        const s = this.stops[f.to];
        const dir = f.pc.getTangentAt(1);
        this.pose = this.copyPose(s); this.flight = null;
        if (this.settleAmt > 0) this.settle = { t: 0, dir };
      }
    }
    // exhibit nudges ease in
    const k = 1 - Math.exp(-dt * 3.2);
    this.offset.p.lerp(this.offsetTarget.p, k); this.offset.t.lerp(this.offsetTarget.t, k);
    const cam = this.camera;
    cam.position.copy(this.pose.p).add(this.offset.p);
    // arrival settle: carry on a little along the flight direction, then spring back
    if (this.settle) {
      const S = this.settle; S.t += dt;
      const a = this.settleAmt * Math.sin(S.t * 2 * Math.PI / 0.7) * Math.exp(-S.t / 0.22);
      cam.position.addScaledVector(S.dir, a);
      if (S.t > 1.2) this.settle = null;
    }
    this.lookAt = this.pose.t.clone().add(this.offset.t);
    cam.fov = this.pose.fov;
    // speed for post effects (world units per second, smoothed)
    const v = cam.position.distanceTo(this.lastPos) / Math.max(dt, 1e-4);
    this.lastPos.copy(cam.position);
    this.speedNow += (v - this.speedNow) * (1 - Math.exp(-dt * 6));
  }
  apply(extra = { x: 0, y: 0 }, shake = { x: 0, y: 0 }) {
    const cam = this.camera;
    cam.position.x += extra.x + shake.x; cam.position.y += extra.y + shake.y;
    cam.updateProjectionMatrix();
    cam.lookAt(this.lookAt);
    cam.rotateZ(this.pose.roll);
    if (this.damp > 0) {
      // the view chases its target through a critically damped filter: no single-frame snaps
      if (!this.q || this.snapNext) { this.q = cam.quaternion.clone(); this.snapNext = false; }
      else { this.q.slerp(cam.quaternion, 1 - Math.exp(-this.dt * this.damp)); cam.quaternion.copy(this.q); }
    }
    cam.updateMatrixWorld();
  }
  /** jump the damped orientation straight to its target (after a cut) */
  snap() { this.snapNext = true; }
}
