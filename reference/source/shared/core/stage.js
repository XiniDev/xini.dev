import * as THREE from 'three';
import { InkPipeline, post } from '../gfx/pipeline.js';
import { shared } from '../gfx/ink-material.js';
import { makeBackdrop } from '../gfx/backdrop.js';
import { Nav } from './nav.js';
import { Impact } from './impact.js';
import { sfx } from './sfx.js';

// One stage per concept: renderer + ink pipeline + section navigation + impact frames + sound.
// A concept supplies a "director" object with: load(), layout(view), go(to, from, how) -> ms,
// side(dir) -> bool, update(dt, t), and optionally pointer(x, y), palette(p).

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const q = new URLSearchParams(location.search);

export class Stage {
  constructor({ canvas, ids, director, glow = true, palettes = {}, palette }) {
    this.canvas = canvas;
    this.ids = ids;
    this.director = director;
    this.palettes = palettes;
    this.view = { w: 1, h: 1, dpr: 1, phone: false, portrait: false };
    const r = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: q.has('capture') });
    r.autoClear = false;
    this.renderer = r;
    this.pipe = new InkPipeline(r, { glow });
    this.scene = new THREE.Scene();
    this.glowScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 120);
    this.backdrop = makeBackdrop(shared.uPx);
    this.scene.add(this.backdrop);
    this.impact = new Impact({ reduced });
    this.time = 0; this.frozen = q.has('t') ? +q.get('t') : null;
    this.pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false };
    this.paused = false;
    addEventListener('resize', () => this.resize());
    addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / innerWidth) * 2 - 1; this.pointer.y = -((e.clientY / innerHeight) * 2 - 1); this.pointer.active = true;
    }, { passive: true });
    document.addEventListener('visibilitychange', () => { this.paused = document.hidden; if (!this.paused) this.last = performance.now(); });
    this.setPalette(palette || Object.keys(palettes)[0]);
  }
  setPalette(name) {
    const p = this.palettes[name];
    if (!p) return;
    this.paletteName = name;
    this.pal = p;
    const root = document.documentElement;
    for (const [k, v] of Object.entries(p.css || {})) root.style.setProperty(`--${k}`, v);
    root.dataset.palette = name;
    this.director.palette?.(p, name);
  }
  resize() {
    const w = innerWidth, h = innerHeight;
    const phone = Math.min(w, h) < 600 || matchMedia('(pointer: coarse)').matches && Math.max(w, h) < 1100;
    const cap = q.has('dpr') ? +q.get('dpr') : phone ? 1.5 : 1.75;
    const dpr = Math.min(devicePixelRatio || 1, cap);
    Object.assign(this.view, { w, h, dpr, phone, portrait: h > w * 1.05, aspect: w / h });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.pipe.setSize(w, h, dpr);
    shared.uPx.value = dpr;
    post.uLine.value = (phone ? 1.25 : 1.55) * dpr;
    post.uBoil.value = 0.55 * dpr;
    this.backdrop.material.uniforms.uRes.value.set(w * dpr, h * dpr);
    this.camera.aspect = w / h;
    this.director.layout?.(this.view);
    this.camera.updateProjectionMatrix();
  }
  async start() {
    await this.director.load(this);
    this.resize();
    this.nav = new Nav({
      ids: this.ids,
      onChange: (to, from, how) => this.go(to, from, how),
      onSide: (d) => this.director.side?.(d) ?? false,
    });
    this.director.ready?.(this);
    this.last = performance.now();
    const loop = () => {
      requestAnimationFrame(loop);
      if (this.paused) return;
      const now = performance.now();
      let dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
      if (this.frozen !== null) dt = 0;
      this.time += dt;
      const t = this.frozen !== null ? this.frozen : this.time;
      shared.uTime.value = t;
      shared.uStep.value = post.uStep.value = Math.floor(t * 12) / 12;
      post.uTime.value = t;
      const p = this.pointer;
      p.sx += (p.x - p.sx) * (1 - Math.exp(-dt * 3)); p.sy += (p.y - p.sy) * (1 - Math.exp(-dt * 3));
      const shake = this.impact.update(dt);
      this.director.update(dt, t, shake);
      this.pipe.render(this.scene, this.camera, this.glowScene);
    };
    loop();
    window.__xini = this.api();
    return this;
  }
  go(to, from, how) {
    document.documentElement.dataset.sec = this.ids[to];
    const ms = this.director.go(to, from, how) ?? 900;
    return reduced ? Math.min(ms, 350) : ms;
  }
  api() {
    return {
      stage: this,
      goto: (i, force = true) => this.nav.go(typeof i === 'string' ? this.ids.indexOf(i) : i, 'api', force),
      side: (d) => this.director.side?.(d),
      palette: (n) => this.setPalette(n),
      freeze: (t) => { this.frozen = t; },
      unfreeze: () => { this.frozen = null; },
      advanceTo: (t) => { const api = window.__xini; api.advance(Math.max(0, t - this.time)); },
      advance: (s, step = 1 / 30) => { // deterministic time for captures
        const f = this.frozen; this.frozen = null;
        for (let x = 0; x < s; x += step) { this.time += step; this.director.update(step, this.time, this.impact.update(step)); }
        this.frozen = f;
      },
      sfx,
    };
  }
}
