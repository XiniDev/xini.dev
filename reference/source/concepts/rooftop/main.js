import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '@fontsource-variable/sofia-sans-extra-condensed';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource/dela-gothic-one';
import '@fontsource/zen-kaku-gothic-new/700.css';
import './rooftop.css';
import { Stage, reduced, q } from '../../shared/core/stage.js';
import { Timeline, ease } from '../../shared/core/timeline.js';
import { sfx } from '../../shared/core/sfx.js';
import { shared, inkMaterial, newInkId } from '../../shared/gfx/ink-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { backdrop } from '../../shared/gfx/backdrop.js';
import { PanelPage, lerpPanels, rectOf } from '../../shared/gfx/panels.js';
import { makeCity, cityU } from '../../shared/gfx/city.js';
import { glowSprites } from '../../shared/gfx/glow.js';
import { renderSite, wireSite, SECTION_IDS } from '../../shared/ui/template.js';
import { sealSVG } from '../../shared/ui/marks.js';
import { featured, moreProjects } from '../../shared/data/content.js';
import { PALETTES } from './palettes.js';
import roofUrl from './assets/rooftop.glb?url';
import paths from './assets/rooftop-paths.json';
import { PaperPaint, DecalPaint } from '../../shared/gfx/splat.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerp = THREE.MathUtils.lerp;

document.getElementById('app').innerHTML = renderSite({
  mark: () => sealSVG('logo', 'var(--red)'),
  statement: (s) => s.replace('modern AI', '<span class="hl">modern AI</span>'),
}) + '<div class="slash" aria-hidden="true"><i></i><i></i></div>';

// ---------- the five shots (three.js coordinates) ----------
const POSTER_Z = [0.68, 0.06, -0.56, -1.18, -1.8];
const SHOTS = {
  top: { main: { p: V(-3.4, 3.4, 8.6), t: V(0.2, 1.55, -1.2), fov: 44, roll: 0.07 } },
  systems: { main: { p: V(-3.7, 2.35, 3.3), t: V(-1.05, 1.05, 0.9), fov: 40, roll: -0.04 }, inset: { p: V(-0.95, 1.52, 2.05), t: V(-0.9, 1.45, 0.98), fov: 30 } },
  ai: { main: { p: V(-0.7, 2.3, 3.7), t: V(1.9, 3.25, -2.45), fov: 52, roll: 0.05 }, inset: { p: V(1.62, 1.5, -1.62), t: V(1.75, 1.42, -2.45), fov: 40 } },
  security: { main: { p: V(0.9, 1.45, 4.3), t: V(2.75, 1.05, 1.1), fov: 36, roll: -0.05 }, inset: { p: V(2.95, 0.98, 1.95), t: V(3.15, 0.88, 1.27), fov: 30 } },
  work: { main: { p: V(-0.45, 1.15, 0.93), t: V(1.89, 0.9, 0.68), fov: 36, roll: 0.0 } },
  contact: { main: { p: V(0.8, 7.2, 15.0), t: V(0, 0.2, 0), fov: 34, roll: -0.03 } },
};
const LAYOUT = {
  desk: {
    top: [[[0.44, 0.09], [0.97, 0.05], [0.95, 0.93], [0.49, 0.97]]],
    systems: [[[0.43, 0.07], [0.97, 0.1], [0.96, 0.62], [0.41, 0.66]], [[0.56, 0.7], [0.87, 0.7], [0.87, 0.95], [0.56, 0.95]]],
    ai: [[[0.44, 0.05], [0.97, 0.08], [0.95, 0.72], [0.41, 0.69]], [[0.62, 0.74], [0.95, 0.76], [0.94, 0.95], [0.6, 0.95]]],
    security: [[[0.42, 0.1], [0.96, 0.05], [0.95, 0.9], [0.45, 0.95]], [[0.73, 0.6], [0.93, 0.6], [0.93, 0.87], [0.73, 0.87]]],
    work: [[[0.45, 0.08], [0.97, 0.05], [0.97, 0.94], [0.42, 0.92]]],
    contact: [[[0.04, 0.11], [0.96, 0.07], [0.95, 0.6], [0.05, 0.64]]],
  },
  phone: {
    top: [[[0.04, 0.085], [0.96, 0.075], [0.96, 0.47], [0.04, 0.5]]],
    systems: [[[0.04, 0.085], [0.96, 0.095], [0.96, 0.45], [0.04, 0.43]], [[0.6, 0.33], [0.93, 0.33], [0.93, 0.46], [0.6, 0.46]]],
    ai: [[[0.05, 0.08], [0.96, 0.09], [0.95, 0.47], [0.04, 0.45]]],
    security: [[[0.04, 0.09], [0.96, 0.075], [0.96, 0.46], [0.04, 0.48]]],
    work: [[[0.04, 0.08], [0.96, 0.08], [0.96, 0.43], [0.04, 0.45]]],
    contact: [[[0.04, 0.09], [0.96, 0.075], [0.96, 0.4], [0.04, 0.42]]],
  },
};
const CAPTION = { top: 'Xini <b>/</b> Systems engineer', systems: '01 <b>/</b> Systems', ai: '02 <b>/</b> AI', security: '03 <b>/</b> Security', work: '04 <b>/</b> Work', contact: '05 <b>/</b> Contact' };

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); draw(g, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8;
  t.redraw = () => { draw(g, w, h); t.needsUpdate = true; };
  return t;
}
function planarUV(mesh, flipU = false) {
  const g = mesh.geometry; g.computeBoundingBox();
  const b = g.boundingBox, s = new THREE.Vector3(); b.getSize(s);
  const axes = [['x', s.x], ['y', s.y], ['z', s.z]].sort((a, c) => a[1] - c[1]);
  const thin = axes[0][0];
  const [u, v] = thin === 'x' ? ['z', 'y'] : thin === 'y' ? ['x', 'z'] : ['x', 'y'];
  const p = g.attributes.position, uv = new Float32Array(p.count * 2);
  const vec = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    vec.fromBufferAttribute(p, i);
    let uu = (vec[u] - b.min[u]) / (b.max[u] - b.min[u] || 1), vv = (vec[v] - b.min[v]) / (b.max[v] - b.min[v] || 1);
    if (flipU) uu = 1 - uu;
    uv[i * 2] = uu; uv[i * 2 + 1] = vv;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

class RooftopDirector {
  constructor() {
    this.tl = new Timeline();
    this.cur = 0;
    this.cam = { p: SHOTS.top.main.p.clone(), t: SHOTS.top.main.t.clone(), fov: 44, roll: 0 };
    this.panels = LAYOUT.desk.top;
    this.workSel = 0;
  }
  palette(p) { this.pal = p; if (this.stage) this.applyPalette(); }
  applyPalette() {
    const g = this.pal.gl;
    backdrop.uTop.value.set(g.skyTop); backdrop.uBottom.value.set(g.skyBottom); backdrop.uDot.value.set(g.ink);
    backdrop.uGlowCol.value.set(g.neon); backdrop.uGlowAmt.value = 0.16; backdrop.uCloud.value = 0.22;
    shared.uShadeTint.value.set(g.shade); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set(g.glint);
    shared.uFillCol.value.set(g.neon);
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paper); post.uImpAccent.value.set(g.red);
    cityU.uSilA.value.set(g.cityA); cityU.uSilB.value.set(g.cityB); cityU.uHaze.value.set(g.cityHaze); cityU.uWin.value.set(g.win);
    cityU.uWin2.value.set(g.neon); cityU.uWin3.value.set(g.neon2); cityU.uDotInk.value.set(g.ink);
    if (this.page) { this.page.u.uPaper.value.set(g.paper); this.page.u.uPaper2.value.set(g.paper2); this.page.u.uInk.value.set(g.ink); this.page.u.uTone.value.set(g.red); }
    if (this.mats) for (const m of Object.values(this.mats)) { const c = this.colorFor(m.userData.colorName); if (c && m.uniforms.uBase) { m.uniforms.uBase.value.set(c); m.uniforms.uBack.value.set(c); } }
    this.posters?.forEach((t) => t.redraw()); this.signTex?.redraw(); this.warnTex?.redraw();
  }
  colorFor(name) {
    const g = this.pal.gl;
    return {
      concrete: g.concrete, concrete_dark: g.concreteDark, building: g.building, metal: g.metal, metal_dark: g.metalDark, rust: g.rust,
      wood: g.wood, rubber: g.rubber, plate: g.plate, hazard: g.hazard, puddle: g.puddle, paper: g.paper,
      neon_main: g.neon, neon_alt: g.neon2, led_green: g.led, led_red: g.ledR, screen: g.screen, bulb: g.bulb, glass: '#3b5a72',
    }[name];
  }
  async load(stage) {
    this.stage = stage;
    const { scene, camera } = stage;
    camera.near = 0.1; camera.far = 120;
    await document.fonts.ready;
    await Promise.all(['900 40px "Sofia Sans Extra Condensed Variable"', '40px "Dela Gothic One"', '700 30px "Zen Kaku Gothic New"', '600 20px "Schibsted Grotesk Variable"'].map((f) => document.fonts.load(f, 'Aシ工房立入禁止').catch(() => {})));
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(roofUrl);
    this.world = gltf.scene;
    scene.add(this.world);
    this.mats = {};
    this.live = {};
    const g = this.pal.gl;
    this.posters = featured.concat([{ name: 'All projects', more: true }]).map((it, i) => this.posterTex(it, i));
    this.signTex = canvasTex(512, 560, (c, w, h) => this.drawSign(c, w, h));
    this.warnTex = canvasTex(512, 368, (c, w, h) => this.drawWarning(c, w, h));
    this.monitorTex = canvasTex(700, 420, (c, w, h) => this.drawMonitor(c, w, h));
    this.world.traverse((o) => {
      if (!o.isMesh) return;
      const raw = o.material?.name || '';
      const [name, live] = raw.split('|');
      const hasAO = !!o.geometry.attributes.color;
      const hasId = !!o.geometry.attributes._inkid;
      o.frustumCulled = false;
      if (live) this.live[live] = o;
      const emissive = /^(neon|led|bulb|screen)/.test(name);
      let mat;
      if (name.startsWith('poster_')) {
        planarUV(o);
        const idx = +name.split('_')[1];
        const tex = this.posters[idx] || this.posters[this.posters.length - 1];
        mat = inkMaterial({ base: '#ffffff', map: tex, mapAmt: 1, brush: 0.05, stroke: 0.03, spec: 0.0, rim: 0.4, dot: 0.6, lift: 0.18, aoVertex: hasAO, vertexIds: hasId, ao: 0.4 });
        o.userData.poster = idx;
        if (idx >= this.posters.length) o.visible = false;
      } else if (name === 'sign_a') { planarUV(o); mat = inkMaterial({ base: '#ffffff', map: this.signTex, mapAmt: 1, emissive: true, vertexIds: hasId }); }
      else if (name === 'sign_b') { planarUV(o); mat = inkMaterial({ base: '#ffffff', map: this.warnTex, mapAmt: 1, brush: 0.05, spec: 0.2, rim: 0.3, lift: 0.2, vertexIds: hasId, aoVertex: hasAO }); }
      else if (name === 'monitor_img') { planarUV(o); mat = inkMaterial({ base: '#ffffff', map: this.monitorTex, mapAmt: 1, emissive: true, vertexIds: hasId }); }
      else {
        const key = name + (hasAO ? '+ao' : '') + (hasId ? '+id' : '') + (emissive ? '+e' : '');
        if (!this.mats[key]) {
          const c = this.colorFor(name) || '#888888';
          this.mats[key] = inkMaterial({
            base: c, back: c, emissive, aoVertex: hasAO && !emissive, vertexIds: hasId, id: newInkId(),
            brush: name.startsWith('concrete') ? 0.32 : 0.2, brushScale: name.startsWith('concrete') ? 1.6 : 3.0, stroke: 0.1,
            spec: /metal|puddle|hazard/.test(name) ? 0.9 : 0.25, rim: 1, dotCell: 4.5, ao: 0.7, lift: 0.08,
            side: name === 'puddle' ? THREE.DoubleSide : THREE.FrontSide,
          });
          this.mats[key].userData.colorName = name;
        }
        mat = this.mats[key];
        // re-key palette lookups by plain name
      }
      o.material = mat;
    });
    // palette recolouring works on plain names
    const byName = {};
    for (const m of Object.values(this.mats)) { (byName[m.userData.colorName] ||= []).push(m); }
    this.matsByName = byName;
    this.mats = Object.fromEntries(Object.entries(byName).flatMap(([n, list]) => list.map((m, i) => [n + (i ? '#' + i : ''), m])));
    for (const [k, m] of Object.entries(this.mats)) m.userData.colorName = k.split('#')[0];
    // city behind, in two layers
    this.cityFar = makeCity({ radius: 62, height: 40, y0: -12, layer: 1, seed: 3, px: shared.uPx });
    this.cityNear = makeCity({ radius: 34, height: 30, y0: -15, layer: 0, seed: 9, px: shared.uPx });
    scene.add(this.cityFar, this.cityNear);
    // neon + bulbs glow
    this.world.updateMatrixWorld(true);
    this.glow = this.makeGlow();
    stage.glowScene.add(this.glow);
    // the comic page
    this.page = new PanelPage(shared.uPx);
    this.paper = new PaperPaint(1);
    this.page.u.uSplat.value = this.paper.tex; this.page.u.uSplatOn.value = 1;
    this.decals = new DecalPaint(scene, { max: 28 });
    this.makePulses();
    this.insetCam = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
    // captions
    this.caps = [0, 1].map(() => { const d = document.createElement('div'); d.className = 'cap'; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d); return d; });
    this.applyPalette();
    // padlock shackle animates on the security beat
    this.shackle = this.world.getObjectByName('padlock_shackle');
  }
  makeGlow() {
    const g = this.pal.gl, pts = [];
    const neon = this.live['neon_mark'];
    if (neon) {
      neon.updateWorldMatrix(true, false);
      const pos = neon.geometry.attributes.position; const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i += 3) { v.fromBufferAttribute(pos, i).applyMatrix4(neon.matrixWorld); pts.push({ p: v.clone(), c: g.neon, s: 0.9 }); }
    }
    this.world.traverse((o) => {
      if (!o.isMesh) return;
      const n = o.material.userData?.colorName || '';
      if (/^bulb|^led/.test(n)) {
        o.geometry.computeBoundingBox();
        const pos = o.geometry.attributes.position; const v = new THREE.Vector3();
        const step = Math.max(1, Math.floor(pos.count / 60));
        for (let i = 0; i < pos.count; i += step * 6) { v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld); pts.push({ p: v.clone(), c: n.startsWith('bulb') ? g.bulb : g.led, s: 0.35 }); }
      }
    });
    const m = glowSprites(pts, { size: 0.55, px: shared.uPx, cell: 3.5 });
    m.material.uniforms.uFlicker.value = 0.6;
    return m;
  }
  // ---------- textures ----------
  posterTex(it, i) {
    let img = null;
    const draw = (g, W, H) => {
      const P = this.pal.gl;
      g.fillStyle = P.paper; g.fillRect(0, 0, W, H);
      if (it.more) {
        g.fillStyle = P.ink; g.fillRect(0, 0, W, H);
        g.fillStyle = P.red; g.beginPath(); g.moveTo(0, H * 0.62); g.lineTo(W, H * 0.48); g.lineTo(W, H); g.lineTo(0, H); g.fill();
        g.fillStyle = P.paper; g.font = '900 120px "Sofia Sans Extra Condensed Variable"'; g.textBaseline = 'top';
        g.fillText('ALL', 34, 40); g.fillText('PROJECTS', 34, 150);
        g.font = '600 26px "Schibsted Grotesk Variable"';
        moreProjects().recent.slice(0, 9).forEach((r, k) => g.fillText(r.name, 38, 300 + k * 36));
        return;
      }
      if (img) {
        const ih = H * 0.6, s = Math.max(W / img.width, ih / img.height);
        g.save(); g.beginPath(); g.moveTo(0, 0); g.lineTo(W, 0); g.lineTo(W, ih * 0.92); g.lineTo(0, ih); g.clip();
        g.drawImage(img, (W - img.width * s) / 2, 0, img.width * s, img.height * s); g.restore();
      }
      g.fillStyle = P.ink; g.beginPath(); g.moveTo(0, H * 0.6); g.lineTo(W, H * 0.552); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      g.fillStyle = P.red; g.fillRect(28, H * 0.66, 120, 36);
      g.fillStyle = P.paper; g.font = '900 30px "Sofia Sans Extra Condensed Variable"'; g.textBaseline = 'middle';
      g.fillText(String(i + 1).padStart(2, '0') + ' / ' + String(featured.length).padStart(2, '0'), 40, H * 0.66 + 19);
      g.font = '900 132px "Sofia Sans Extra Condensed Variable"'; g.textBaseline = 'alphabetic';
      g.fillText(it.name.toUpperCase(), 26, H * 0.86);
      g.font = '800 30px "Sofia Sans Extra Condensed Variable"';
      g.fillText((it.kicker || '').toUpperCase() + '  ·  ' + it.tags.slice(0, 2).join(' · ').toUpperCase(), 30, H * 0.93);
    };
    const t = canvasTex(512, 730, draw);
    if (it.image) { const im = new Image(); im.onload = () => { img = im; t.redraw(); }; im.src = it.image; }
    return t;
  }
  drawSign(g, W, H) {
    const P = this.pal.gl;
    g.fillStyle = P.plate; g.fillRect(0, 0, W, H);
    g.fillStyle = P.paper; g.fillRect(14, 14, W - 28, H - 28);
    g.fillStyle = P.ink; g.font = '900 150px "Sofia Sans Extra Condensed Variable"'; g.textBaseline = 'top';
    g.fillText('XINI', 40, 30);
    g.fillStyle = P.red; g.fillRect(40, 196, W - 80, 14);
    g.fillStyle = P.ink; g.font = '700 150px "Zen Kaku Gothic New"';
    g.fillText('工房', 40, 236);
    g.font = '800 30px "Sofia Sans Extra Condensed Variable"';
    g.fillText('SYSTEMS · AI · SECURITY', 44, 460);
  }
  drawWarning(g, W, H) {
    const P = this.pal.gl;
    g.fillStyle = P.hazard; g.fillRect(0, 0, W, H);
    g.save(); g.beginPath(); g.rect(0, 0, W, 54); g.rect(0, H - 54, W, 54); g.clip();
    g.fillStyle = P.ink; for (let x = -H; x < W + H; x += 56) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 28, 0); g.lineTo(x + 28 - 54, 54 * 2); g.lineTo(x - 54, 54 * 2); g.fill(); }
    g.translate(0, H - 54); for (let x = -H; x < W + H; x += 56) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 28, 0); g.lineTo(x + 28 - 54, 54); g.lineTo(x - 54, 54); g.fill(); }
    g.restore();
    g.fillStyle = P.ink; g.font = '700 118px "Zen Kaku Gothic New"'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('立入禁止', W / 2, H / 2 - 4); g.textAlign = 'left';
  }
  drawMonitor(g, W, H) {
    const P = this.pal.gl;
    g.fillStyle = '#0c0f1c'; g.fillRect(0, 0, W, H);
    const lines = [
      ['k', 'export async function '], ['f', 'ship'], ['p', '(system) {'], null,
      ['c', '  // tests, then build, then deploy'], ['k', '  const '], ['p', 'build = await compile(system);'], ['k', '  await '], ['p', 'verify(build);'],
      ['k', '  return '], ['p', 'deploy(build, { selfHosted: true });'], ['p', '}'],
    ];
    g.font = '600 26px "Schibsted Grotesk Variable"';
    let y = 52, x = 28;
    const col = { k: P.red, f: P.neon2, p: '#e8e3d6', c: '#7d7b8f' };
    for (const l of lines) {
      if (!l) { y += 36; x = 28; continue; }
      g.fillStyle = col[l[0]]; g.fillText(l[1], x, y); x += g.measureText(l[1]).width;
      if (l[0] !== 'k' && l[0] !== 'f') { y += 36; x = 28; }
    }
    g.fillStyle = P.neon2; g.fillRect(28, y - 22, 14, 28);
  }
  // ---------- layout ----------
  layout(view) {
    this.view = view;
    const set = view.portrait ? LAYOUT.phone : LAYOUT.desk;
    this.layoutSet = set;
    this.panels = set[SECTION_IDS[this.cur]];
    this.page?.u.uRes.value.set(view.w * view.dpr, view.h * view.dpr);
    if (this.page) this.page.u.uBorder.value = view.portrait ? 3.0 : 4.5;
  }
  ready(stage) {
    this.site = wireSite({ nav: stage.nav, sfx, onProject: (i) => this.project(i) });
    // render with several cameras into one frame: main shot, inset shot, then the page on top
    const pipe = stage.pipe;
    stage.pipe.render = (scene, camera, glowScene) => {
      const passes = [{ scene, camera }];
      const ins = this.insetRect();
      if (ins) passes.push({ scene, camera: this.insetCam, rect: ins, clearDepth: true });
      passes.push({ scene: this.page.scene, camera });
      pipe.renderPasses(passes, glowScene, this.view.w, this.view.h);
    };
    this.bindPointer();
  }
  insetRect() {
    const id = SECTION_IDS[this.cur];
    const shot = SHOTS[id].inset;
    if (!shot || !this.panels[1] || this.tl.busy) return null;
    const [x, y, w, h] = rectOf(this.panels[1]);
    return [x * this.view.w, y * this.view.h, w * this.view.w, h * this.view.h];
  }
  // ---------- entrance ----------
  enter() {
    const html = document.documentElement;
    html.classList.add('ready');
    this.entered = true;
    const hero = document.querySelector('.sec--hero');
    const main = SHOTS.top.main;
    if (reduced || q.has('skipintro')) { hero.classList.add('is-current'); this.stage.nav.lockUntil = 0; return; }
    // the panel opens from a slash and the camera rises from the street to the roof
    const slit = [[[0.7, 0.0], [0.72, 0.0], [0.7, 1.0], [0.68, 1.0]]];
    this.panels = slit;
    this.cam.p.set(-1.0, -9.0, 9.0); this.cam.t.set(0.0, 0.5, -0.5); this.cam.fov = 60; this.cam.roll = 0.3;
    const tl = this.tl;
    tl.add(0.05, 0.45, (p) => { this.panels = lerpPanels(slit, this.layoutSet.top, p); }, { step: 12, ease: ease.out3 });
    tl.add(0.0, 1.5, (p) => {
      this.cam.p.lerpVectors(V(-1.0, -9.0, 9.0), main.p, p); this.cam.t.lerpVectors(V(0, 0.5, -0.5), main.t, p);
      this.cam.fov = lerp(60, main.fov, p); this.cam.roll = lerp(0.3, main.roll, p);
    }, { ease: ease.outExpo });
    tl.at(0.05, () => sfx.play('whoosh'));
    tl.at(1.05, () => { this.stage.impact.hit({ seq: 'big', center: [0.7, 0.5], shake: 1 }); sfx.play('slam'); });
    tl.at(1.12, () => hero.classList.add('is-current'));
    this.stage.nav.lockUntil = performance.now() + 1700;
  }
  // ---------- section changes ----------
  go(to, from) {
    this.cur = to;
    const id = SECTION_IDS[to];
    const secs = document.querySelectorAll('.sec');
    secs[from].classList.remove('is-current'); secs[from].classList.add('is-leaving');
    setTimeout(() => secs[from].classList.remove('is-leaving'), 260);
    const html = document.documentElement;
    const tl = this.tl; tl.clear();
    const fromPanels = this.panels, toPanels = this.layoutSet[id];
    const shot = this.shotFor(id);
    const c0 = { p: this.cam.p.clone(), t: this.cam.t.clone(), fov: this.cam.fov, roll: this.cam.roll };
    if (reduced) { this.panels = toPanels; Object.assign(this.cam, { p: shot.p.clone(), t: shot.t.clone(), fov: shot.fov, roll: shot.roll || 0 }); secs[to].classList.add('is-current'); return 300; }
    // Persona slash across the page while the panels re-cut and the camera flies
    html.classList.remove('slashing'); void html.offsetWidth; html.classList.add('slashing');
    setTimeout(() => html.classList.remove('slashing'), 500);
    sfx.play('whoosh');
    tl.add(0.0, 0.5, (p) => { this.panels = lerpPanels(fromPanels, toPanels, p); }, { step: 12, ease: ease.inOut3 });
    // camera: a real move through the rooftop (eased, on ones) with a lift in the middle
    tl.add(0.0, 0.95, (p) => {
      const lift = Math.sin(p * Math.PI) * (id === 'contact' || SECTION_IDS[from] === 'contact' ? 0 : 1.2);
      this.cam.p.lerpVectors(c0.p, shot.p, p); this.cam.p.y += lift;
      this.cam.t.lerpVectors(c0.t, shot.t, p);
      this.cam.fov = lerp(c0.fov, shot.fov, p); this.cam.roll = lerp(c0.roll, shot.roll || 0, p);
    }, { ease: ease.inOut3 });
    tl.at(0.5, () => { secs[to].classList.add('is-current'); });
    tl.at(0.92, () => { this.stage.impact.hit({ seq: id === 'security' ? 'accent' : 'hit', center: this.panelCentre(), shake: 0.6 }); sfx.play(id === 'security' ? 'stamp' : 'slam', { gain: 0.6 }); });
    if (id === 'security') tl.add(0.95, 0.3, (p) => { if (this.shackle) this.shackle.position.y = (1 - p) * 0.08; }, { step: 12 });
    return 1050;
  }
  shotFor(id) {
    const s = SHOTS[id].main;
    if (id !== 'work') return s;
    const z = POSTER_Z[this.workSel] ?? 0;
    return { p: V(-0.45, 1.15, z + 0.25), t: V(1.89, 0.9, z), fov: 36, roll: 0 };
  }
  panelCentre() {
    const r = rectOf(this.layoutSet[SECTION_IDS[this.cur]][0]);
    return [r[0] + r[2] / 2, 1 - (r[1] + r[3] / 2)];
  }
  project(i) {
    this.workSel = i;
    const shot = this.shotFor('work');
    const c0 = { p: this.cam.p.clone(), t: this.cam.t.clone() };
    this.tl.add(0, 0.55, (p) => { this.cam.p.lerpVectors(c0.p, shot.p, p); this.cam.t.lerpVectors(c0.t, shot.t, p); }, { ease: ease.inOut3 });
    this.tl.at(0.5, () => this.stage.impact.hit({ seq: 'soft', center: this.panelCentre(), shake: 0.3 }));
  }
  side(d) {
    if (SECTION_IDS[this.cur] !== 'work') return false;
    this.site.setProject(this.site.project + d, d);
    return true;
  }
  inPoly(poly, x, y) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  paintColors() {
    const g = this.pal.gl;
    const c = new THREE.Color(g.red);
    const light = c.clone().lerp(new THREE.Color('#ffffff'), 0.45), dark = c.clone().multiplyScalar(0.45);
    return { color: '#' + c.getHexString(), light: '#' + light.getHexString(), dark: '#' + dark.getHexString(), ink: g.ink };
  }
  bindPointer() {
    const ray = new THREE.Raycaster();
    addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a,button,.index,.bar,.rail,.sec__inner')) return;
      if (this.tl.busy) return;
      const nx = e.clientX / this.view.w, ny = e.clientY / this.view.h;
      // which panel was hit? inset first, then the main panel, else the paper
      let cam = null, ndc = null;
      const p1 = this.panels[1], p0 = this.panels[0];
      if (p1 && SHOTS[SECTION_IDS[this.cur]].inset && this.inPoly(p1, nx, ny)) {
        const [x, y, w, h] = rectOf(p1);
        cam = this.insetCam; ndc = new THREE.Vector2(((nx - x) / w) * 2 - 1, -(((ny - y) / h) * 2 - 1));
      } else if (p0 && this.inPoly(p0, nx, ny)) {
        cam = this.stage.camera; ndc = new THREE.Vector2(nx * 2 - 1, -(ny * 2 - 1));
      }
      const colors = this.paintColors();
      const centre = [nx, 1 - ny];
      if (!cam) {
        // tag the paper
        this.paper.add(e.clientX, e.clientY, 26 + Math.random() * 22, colors, (Math.random() * 1e9) | 0, [Math.random() - 0.5, 1]);
        this.stage.impact.hit({ seq: 'soft', center: centre, shake: 0.35 }); sfx.play('splat');
        return;
      }
      ray.setFromCamera(ndc, cam);
      const hit = ray.intersectObject(this.world, true).find((h) => !h.object.userData.decal);
      if (!hit) return;
      const o = hit.object;
      if (o.userData.poster !== undefined) {
        const i = o.userData.poster;
        if (i >= featured.length) document.querySelector('.work__all').click();
        else if (i !== this.site.project) this.site.setProject(i, i > this.site.project ? 1 : -1);
        else window.open(featured[i].url, '_blank', 'noopener');
        return;
      }
      if (/neon/.test(o.material.userData?.colorName || '') || o.material.uniforms?.uMap?.value === this.signTex) { this.flicker = 1; sfx.play('snap'); return; }
      // spray it: a splat decal on whatever surface was hit
      const size = THREE.MathUtils.clamp(hit.distance * 0.09, 0.22, 0.9);
      this.decals.add(hit, size, colors);
      this.stage.impact.hit({ seq: 'hit', center: centre, shake: 0.5 }); sfx.play('splat'); sfx.play('hiss', { dur: 0.18 });
    });
    addEventListener('resize', () => this.paper.resize(innerWidth, innerHeight));
  }
  // data packets travelling the cables from the server to the antenna, drawn on twos
  makePulses() {
    const g = this.pal.gl;
    const cables = paths.cables.map((c) => c.map((p) => new THREE.Vector3(...p)));
    this.cables = cables.map((pts) => {
      const len = [0];
      for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + pts[i].distanceTo(pts[i - 1]));
      return { pts, len, total: len[len.length - 1] };
    });
    const n = 14;
    this.pulses = Array.from({ length: n }, (_, i) => ({ c: i % this.cables.length, u: Math.random(), v: 0.35 + Math.random() * 0.4 }));
    const pts = this.pulses.map(() => ({ p: new THREE.Vector3(), c: g.neon2, s: 0.45 }));
    this.pulseMesh = glowSprites(pts, { size: 0.32, px: shared.uPx, cell: 3 });
    this.stage.glowScene.add(this.pulseMesh);
    // the packets are also solid little blocks in the colour pass, so they ink and read in the inset
    const geo = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    this.pulseBlocks = new THREE.InstancedMesh(geo, inkMaterial({ base: g.neon2, emissive: true, instanced: true, id: 247 }), n);
    this.pulseBlocks.frustumCulled = false;
    this.stage.scene.add(this.pulseBlocks);
  }
  updatePulses(dt, t) {
    const step = Math.floor(t * 12);
    if (step === this._pstep) return;
    const dts = this._pstep === undefined ? 0 : (step - this._pstep) / 12;
    this._pstep = step;
    const boost = SECTION_IDS[this.cur] === 'ai' ? 1.6 : 0.6;
    const off = this.pulseMesh.geometry.attributes.offset;
    const M = new THREE.Matrix4(), v = new THREE.Vector3();
    this.pulses.forEach((p, i) => {
      p.u += dts * p.v * boost / this.cables[p.c].total * 2.2;
      if (p.u > 1) { p.u -= 1; p.c = (p.c + 1) % this.cables.length; }
      const cb = this.cables[p.c], d = p.u * cb.total;
      let k = 1; while (k < cb.len.length - 1 && cb.len[k] < d) k++;
      const f = (d - cb.len[k - 1]) / Math.max(1e-6, cb.len[k] - cb.len[k - 1]);
      v.lerpVectors(cb.pts[k - 1], cb.pts[k], f);
      off.setXYZ(i, v.x, v.y, v.z);
      M.makeTranslation(v.x, v.y, v.z); this.pulseBlocks.setMatrixAt(i, M);
    });
    off.needsUpdate = true; this.pulseBlocks.instanceMatrix.needsUpdate = true;
  }
  // ---------- frame ----------
  update(dt, t, shake) {
    if (!this.entered && this.stage.nav) this.enter();
    this.tl.update(dt);
    const cam = this.stage.camera, pt = this.stage.pointer;
    // a little parallax from the pointer, held to the frame like a hand-held comic camera
    const par = V(pt.sx * 0.25, pt.sy * 0.15, 0);
    cam.position.copy(this.cam.p).add(par);
    if (this.view.portrait) cam.position.lerp(this.cam.t, -0.22); // phones: step back so the panel holds the whole shot
    cam.position.x += shake.x * 0.06; cam.position.y += shake.y * 0.06;
    cam.fov = this.cam.fov;
    // aim the camera's optical centre at the middle of the main panel, not the screen
    const r0 = rectOf(this.panels[0]);
    const cx = (r0[0] + r0[2] / 2) * this.view.w, cy = (r0[1] + r0[3] / 2) * this.view.h;
    cam.setViewOffset(this.view.w, this.view.h, this.view.w / 2 - cx, this.view.h / 2 - cy, this.view.w, this.view.h);
    cam.updateProjectionMatrix();
    cam.lookAt(this.cam.t);
    cam.rotateZ(this.cam.roll);
    // inset camera
    const id = SECTION_IDS[this.cur];
    const ins = SHOTS[id].inset;
    if (ins && this.panels[1]) {
      const r = rectOf(this.panels[1]);
      this.insetCam.aspect = (r[2] * this.view.w) / Math.max(1, r[3] * this.view.h);
      this.insetCam.fov = ins.fov; this.insetCam.position.copy(ins.p); this.insetCam.position.x += Math.sin(t * 0.7) * 0.03;
      this.insetCam.lookAt(ins.t); this.insetCam.updateProjectionMatrix();
    }
    this.page.set(this.panels);
    this.paper.update(dt); this.decals.update(dt); this.updatePulses(dt, t);
    // key light: the moon from the upper left; the neon sign throws a red band from behind
    shared.uKeyDir.value.set(-0.5, 0.7, 0.5).normalize();
    const sign = V(-1.35, 2.75, -2.45).applyMatrix4(cam.matrixWorldInverse).sub(V(0, 0, 0)).normalize();
    shared.uFillDir.value.copy(sign); shared.uFillAmt.value = 0.85;
    // neon flicker: on twos, occasionally
    const g = this.glow.material.uniforms; g.uTime.value = t;
    this.flicker = Math.max(0, (this.flicker || 0) - dt * 2);
    g.uFlicker.value = 0.5 + this.flicker * 0.5;
    // captions pinned to the panel corners
    this.placeCaptions();
  }
  placeCaptions() {
    const id = SECTION_IDS[this.cur];
    const p0 = this.panels[0];
    const cap = this.caps[0];
    if (!p0 || this.tl.busy && !this.entered) { cap.classList.remove('is-on'); return; }
    const a = p0[0], b = p0[1];
    const ang = Math.atan2((b[1] - a[1]) * this.view.h, (b[0] - a[0]) * this.view.w);
    cap.innerHTML = CAPTION[id];
    cap.style.transform = `translate(${a[0] * this.view.w + 18}px, ${a[1] * this.view.h + 16}px) rotate(${ang}rad)`;
    cap.classList.toggle('is-on', !this.tl.busy);
  }
}

const director = new RooftopDirector();
const stage = new Stage({
  canvas: document.querySelector('canvas.gl'), ids: SECTION_IDS, director, glow: true,
  palettes: PALETTES, palette: q.get('palette') || 'persona',
});
post.uMisregPx.value = 1.6; post.uGrain.value = 0.045; post.uVignette.value = 0.0; post.uGradeAmt.value = 0.18; post.uGlowAmt.value = 0.9;
post.uDepthK.value = 0.02; post.uNormalK.value = 0.3;
await stage.start();
window.__xini.project = (i) => director.site.setProject(i, 1);
window.__xini.ready = true;
