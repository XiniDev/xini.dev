import * as THREE from 'three';
import { InkPipeline, post } from '../gfx/pipeline.js';
import { shared } from '../gfx/ink-material.js';
import { makeBackdrop } from '../gfx/backdrop.js';
import { Nav } from '../core/nav.js';
import { Impact } from '../core/impact.js';
import { sfx } from '../core/sfx.js';
import { Rig } from './rig.js';
import { wireWorld, STOP_IDS } from './ui.js';

// A world: renderer + ink pipeline (fog, bloom) + camera rig + stop navigation + anchored cards.
// The director supplies the scene and the route:
//   build(world) -> { stops: [{p, t, fov, roll, anchor?}], legs, closed?, phone?(stop) }
//   update(dt, t), arrive(i), depart(from, to), project(i), palette(p), click(e, hit)
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const q = new URLSearchParams(location.search);
/** open an outside link through a real anchor, which embedded viewers allow where window.open is refused */
export function openLink(url) {
  const a = Object.assign(document.createElement('a'), { href: url, target: '_blank', rel: 'noopener' });
  document.body.append(a); a.click(); a.remove();
}

export class World {
  constructor({ canvas, director, places, palettes = {}, palette, pipeline = {} }) {
    this.canvas = canvas; this.director = director; this.places = places; this.palettes = palettes;
    const r = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: q.has('capture') });
    r.autoClear = false;
    this.renderer = r;
    this.pipe = new InkPipeline(r, { glow: pipeline.glow ?? false, bloom: pipeline.bloom ?? true, kuwahara: pipeline.kuwahara ?? 0 });
    this.scene = new THREE.Scene();
    this.glowScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.5, 3000);
    this.backdrop = makeBackdrop(shared.uPx);
    this.scene.add(this.backdrop);
    this.impact = new Impact({ reduced });
    this.pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    this.time = 0; this.frozen = null;
    this.dprScale = 1; this.perf = { ema: 1 / 60, slow: 0, t: 0, steps: 0 };
    this.view = { w: 1, h: 1, dpr: 1, portrait: false, phone: false, aspect: 1 };
    // (a turned phone can report its new size late, or only to the visual viewport: every source, once a frame)
    const onResize = () => { if (!this.rsFrame) this.rsFrame = requestAnimationFrame(() => { this.rsFrame = 0; this.resize(true); }); };
    addEventListener('resize', onResize); addEventListener('orientationchange', onResize);
    globalThis.visualViewport?.addEventListener('resize', onResize);
    new ResizeObserver(onResize).observe(document.documentElement);
    addEventListener('pointermove', (e) => { this.pointer.x = (e.clientX / innerWidth) * 2 - 1; this.pointer.y = -((e.clientY / innerHeight) * 2 - 1); }, { passive: true });
    document.addEventListener('visibilitychange', () => { this.paused = document.hidden; this.last = performance.now(); });
    this.palette = null;
    this.setPalette(palette || Object.keys(palettes)[0]);
    this.cards = [...document.querySelectorAll('.stop')];
  }
  setPalette(name) {
    const p = this.palettes[name]; if (!p) return;
    this.palette = p; this.paletteName = name;
    for (const [k, v] of Object.entries(p.css || {})) document.documentElement.style.setProperty(`--${k}`, v);
    document.documentElement.dataset.palette = name;
    this.director.palette?.(p, name);
  }
  resize(soft = false) {
    const w = innerWidth, h = innerHeight;
    const phone = Math.min(w, h) < 600;
    const cap = q.has('dpr') ? +q.get('dpr') : phone ? 1.5 : 1.75;
    const dpr = Math.min(devicePixelRatio || 1, cap) * this.dprScale;
    if (soft && w === this.view.w && h === this.view.h && dpr === this.view.dpr) return;
    Object.assign(this.view, { w, h, dpr, phone, portrait: h > w * 1.05, aspect: w / h });
    this._grid = null;
    this.renderer.setPixelRatio(dpr); this.renderer.setSize(w, h, false);
    this.pipe.setSize(w, h, dpr);
    shared.uPx.value = dpr;
    post.uLine.value = (phone ? 1.15 : 1.4) * dpr; post.uBoil.value = 0.5 * dpr;
    this.backdrop.material.uniforms.uRes.value.set(w * dpr, h * dpr);
    this.camera.aspect = w / h;
    this.director.layout?.(this.view);
  }
  async start() {
    const route = await this.director.build(this);
    this.route = route;
    this.resize();
    this.rig = new Rig(this.camera, route.stops, route.legs, { closed: route.closed, speed: route.speed ?? 34, minT: route.minT ?? 1.6, maxT: route.maxT ?? 3.0, ...(route.rig || {}) });
    this.nav = new Nav({ ids: STOP_IDS, wrap: !!route.wrap, onChange: (to, from, how) => this.go(to, from, how), onSide: (d) => this.side(d), onStep: (d) => this.inside(d) });
    this.ui = wireWorld({ nav: this.nav, sfx, onProject: (i, d) => this.director.project?.(i, d, this) });
    sfx.where = { stop: () => this.rig.flight?.to ?? this.rig.index, solved: () => !!this.director.solved?.(), bootImpact: () => this.director.bootImpact?.() ?? null };
    this.setCard(0, true);
    this.director.ready?.(this);
    this.last = performance.now();
    const loop = () => {
      requestAnimationFrame(loop);
      if (this.paused) return;
      const now = performance.now();
      const raw = (now - this.last) / 1000;
      let dt = Math.min(0.05, raw); this.last = now;
      this.watchPerf(raw);
      if (this.frozen !== null) dt = 0;
      this.tick(dt);
      const info = this.renderer.info;
      if (this.statsOn) { info.autoReset = false; info.reset(); }
      this.director.preRender?.(this);
      this.pipe.render(this.scene, this.camera, this.glowScene);
      if (this.statsOn) this.lastStats = { calls: info.render.calls, triangles: info.render.triangles, geometries: info.memory.geometries, textures: info.memory.textures, programs: info.programs?.length ?? 0 };
    };
    loop();
    this.bindClicks();
    window.__xini = this.api();
    return this;
  }
  /** a slow machine gets a lower pixel ratio, two steps at most; captures and ?dpr are left alone */
  watchPerf(raw) {
    const P = this.perf;
    if (q.has('dpr') || q.has('capture') || this.frozen !== null || raw > 0.5) return;
    P.t += raw; P.ema += (raw - P.ema) * 0.05;
    if (P.t < 2.5 || P.steps >= 2) return;
    P.slow = P.ema > 1 / 38 ? P.slow + raw : 0;
    if (P.slow > 1.2) { P.steps++; P.slow = 0; P.t = 1.5; this.dprScale *= 0.78; this.resize(); }
  }
  tick(dt) {
    this.time += dt;
    const t = this.time;
    shared.uTime.value = t; shared.uStep.value = post.uStep.value = Math.floor(t * 12) / 12; post.uTime.value = t;
    const p = this.pointer;
    p.sx += (p.x - p.sx) * (1 - Math.exp(-dt * 2.5)); p.sy += (p.y - p.sy) * (1 - Math.exp(-dt * 2.5));
    const shake = this.impact.update(dt);
    this.rig.update(dt);
    this.director.update?.(dt, t, this);
    // pointer parallax (smaller while flying) + phone framing handled by the director's stops
    const par = this.still ? 0 : this.rig.flying ? 0.25 : 1;
    const pr = this.director.parallax ?? 1.2;
    // portrait screens: step back, widen, and lift the subject above the docked card
    if (this.view.portrait) {
      const pull = typeof this.route.phonePull === 'function' ? this.route.phonePull() : (this.route.phonePull ?? 0.55);
      this.camera.position.lerp(this.rig.lookAt, -pull);
      this.camera.fov = Math.min(84, this.camera.fov + (this.route.phoneFov ?? 12));
      this.camera.setViewOffset(this.view.w, this.view.h, 0, this.view.h * (this.route.phoneLift ?? 0.2), this.view.w, this.view.h);
    } else if (this.camera.view && this.camera.view.enabled) this.camera.clearViewOffset();
    this.rig.apply({ x: p.sx * pr * par, y: p.sy * pr * 0.6 * par }, { x: shake.x * 0.4, y: shake.y * 0.4 });
    // speed feeds the post: plate slip + streaks
    const sp = THREE.MathUtils.clamp((this.rig.speedNow - 8) / (this.route.speedRef ?? 60), 0, 1);
    post.uSpeed.value += (sp - post.uSpeed.value) * (1 - Math.exp(-dt * 8));
    // arrival is driven by the flight itself, so it lands exactly when the camera does
    if (this.pending) {
      const pr = this.rig.progress, P = this.pending;
      if (pr >= 0.93 || !this.rig.flying) {
        this.pending = null;
        this.setCard(P.to, true);
        this.impact.hit({ seq: this.director.arriveSeq?.(P.to, P.from) ?? this.route.arriveImpact ?? 'soft', center: this.director.impactCenter?.(P.to, this) ?? [0.5, 0.5], shake: 0.5 });
        sfx.play('arrive'); sfx.arrive();
      }
    }
    this.placeCard();
  }
  /** project a world point to css px */
  toScreen(v) {
    const p = v.clone().project(this.camera);
    return { x: (p.x * 0.5 + 0.5) * this.view.w, y: (1 - (p.y * 0.5 + 0.5)) * this.view.h, behind: p.z > 1 };
  }
  setCard(i, now = false) {
    this.cards.forEach((c, k) => { if (k !== i) c.classList.remove('is-current'); });
    clearTimeout(this._cardT);
    const show = () => { this.cards[i].classList.add('is-current'); this.director.arrive?.(i, this); };
    if (now) show(); else this._cardT = setTimeout(show, 0);
  }
  placeCard() {
    if (this.view.portrait) return; // phones dock cards with CSS
    const i = this.rig.index, stop = this.route.stops[i];
    const card = this.cards[i];
    if (!stop.anchor || !card) return;
    // (the anchor rides the stop's nudge, so an exhibit's card keeps its column)
    const s = this.toScreen(new THREE.Vector3(...stop.anchor).add(this.rig.nudged));
    const el = card.firstElementChild;
    const w = el.offsetWidth, h = el.offsetHeight, m = 24, top = 84;
    let x = THREE.MathUtils.clamp(s.x, m + w / 2, this.view.w - m - w / 2);
    // (route.cardGrid: a card on the left lines up with the logo, one on the right with the bar's last control, so
    // the eye finds it in the same column at every stop; only its height follows the world. The printed edge of a
    // card is 4px inside its box on the right, where its shadow hangs.)
    if (this.route.cardGrid) {
      const G = this._grid || (this._grid = (() => { const a = document.querySelector('.bar__mark')?.getBoundingClientRect(), b = document.querySelector('.bar__sound')?.getBoundingClientRect(); return a?.width && b?.width ? { l: a.left, r: b.right } : null; })());
      if (G) x = s.x < this.view.w / 2 ? G.l + w / 2 : G.r - w / 2 + 4;
    }
    // cards on the left keep clear of the route map in the corner, and any card keeps clear of a review panel
    let bottom = x - w / 2 < 230 ? 168 : 40;
    const rv = this._review?.isConnected ? this._review : (this._review = document.querySelector('.review'));
    if (rv) { const r = rv.getBoundingClientRect(); if (r.width && x + w / 2 > r.left - 12 && x - w / 2 < r.right + 12) bottom = Math.max(bottom, this.view.h - r.top + 14); }
    const y = THREE.MathUtils.clamp(s.y, top + h / 2, Math.max(top + h / 2, this.view.h - bottom - h / 2));
    card.style.setProperty('--ax', `${x}px`); card.style.setProperty('--ay', `${y}px`);
  }
  go(to, from, how) {
    document.documentElement.dataset.stop = STOP_IDS[to];
    this.cards[from].classList.remove('is-current');
    this.cards[from].classList.add('is-leaving'); setTimeout(() => this.cards[from].classList.remove('is-leaving'), 320);
    this.director.depart?.(from, to, this);
    const dur = reduced ? this.rig.go(to, { duration: 0.35 }) : this.rig.go(to);
    sfx.play('flight'); sfx.depart(to);
    this.pending = { to, from };
    return dur * 1000;
  }
  side(d) {
    if (STOP_IDS[this.rig.index] !== 'work' || this.rig.flying) return false;
    this.ui.setProject(this.ui.project + d, d);
    return true;
  }
  /** scrolling at the gallery steps through its projects, then moves on from the last (or back from the first) */
  inside(d) {
    if (STOP_IDS[this.rig.index] !== 'work' || this.rig.flying) return false;
    const i = this.ui.project + d;
    return i >= 0 && i < this.ui.count && this.ui.setProject(i, d);
  }
  bindClicks() {
    const ray = new THREE.Raycaster();
    addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a,button,.index,.bar,.route,.card')) return;
      const ndc = new THREE.Vector2((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, this.camera);
      this.director.click?.(e, ray, this);
    });
  }
  api() {
    return {
      world: this,
      goto: (i) => this.nav.go(typeof i === 'string' ? STOP_IDS.indexOf(i) : i, 'api', true),
      advance: (s, step = 1 / 30) => { for (let x = 0; x < s; x += step) this.tick(step); },
      advanceTo: (t) => { const n = Math.max(0, t - this.time); for (let x = 0; x < n; x += 1 / 30) this.tick(1 / 30); },
      project: (i) => this.ui.setProject(i, 1),
      palette: (n) => this.setPalette(n),
      freeze: () => { this.frozen = 0; }, unfreeze: () => { this.frozen = null; },
      sway: (on) => { this.still = !on; }, // the pointer's sway, off for captures
      stats: () => { this.statsOn = true; return this.lastStats || null; },
      sfx,
    };
  }
}
