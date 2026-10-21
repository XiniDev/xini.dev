import * as THREE from 'three';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource/dela-gothic-one';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/zen-kaku-gothic-new/700.css';
import './fold.css';
import { Stage, reduced, q } from '../../shared/core/stage.js';
import { Timeline, ease } from '../../shared/core/timeline.js';
import { sfx } from '../../shared/core/sfx.js';
import { shared, inkMaterial } from '../../shared/gfx/ink-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { backdrop } from '../../shared/gfx/backdrop.js';
import { renderSite, wireSite, SECTION_IDS } from '../../shared/ui/template.js';
import { foldMarkSVG, sealSVG, SEAL } from '../../shared/ui/marks.js';
import { featured, moreProjects } from '../../shared/data/content.js';
import { MarkForm, DieForm, MiuraForm, ScreenForm, BoxForm } from './forms.js';
import { PALETTES } from './palettes.js';
import { CastShadow, shadowU } from '../../shared/gfx/shadow.js';

const C = (c) => new THREE.Color(c);
function convexHull(points) {
  const p = points.map((q) => [Math.round(q[0] * 1e4) / 1e4, Math.round(q[1] * 1e4) / 1e4]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const q of p) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop(); lower.push(q); }
  for (const q of p.slice().reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop(); upper.push(q); }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

// ---------- DOM ----------
document.getElementById('app').innerHTML = renderSite({
  mark: () => foldMarkSVG('logo', 'var(--paper)', 'var(--signal)'),
  heroAfter: () => `<p class="cue" aria-hidden="true"><svg viewBox="0 0 30 46"><path class="dash" d="M4 4h22"/><path d="M15 10v28M8 31l7 8 7-8"/></svg>Fold down</p>`,
});

// ---------- colour script: one grade per section ----------
const GRADE = {
  top: { glow: 'glowA', glowAmt: 0.62, key: [-0.35, 0.55, 0.85] },
  systems: { glow: 'glowWarm', glowAmt: 0.62, key: [0.35, 0.8, 0.5] },
  ai: { glow: 'glowCool', glowAmt: 0.7, key: [-0.8, 0.35, 0.5] },
  security: { glow: 'glowSeal', glowAmt: 0.7, key: [0.6, 0.45, 0.7] },
  work: { glow: 'glowA', glowAmt: 0.45, key: [0.25, 0.55, 0.8] },
  contact: { glow: 'glowWarm', glowAmt: 0.6, key: [-0.4, 0.6, 0.7] },
};
const KANJI = { top: '折', systems: '系', ai: '知', security: '封', work: '作', contact: '信' };
const FORM_OF = { top: 'mark', systems: 'die', ai: 'miura', security: 'box', work: 'screen', contact: 'mark' };

class FoldDirector {
  constructor() {
    this.tl = new Timeline();
    this.cur = 0;
    this.form = null;
    this.forms = {};
    this.anchor = new THREE.Vector3();
    this.anchorT = new THREE.Vector3();
    this.scale = 1; this.scaleT = 1;
    this.rot = new THREE.Euler(); this.rotT = new THREE.Euler();
    this.key = new THREE.Vector3(0.55, 0.65, 0.55); this.keyT = this.key.clone();
    this.glow = C('#1f5e57'); this.glowT = this.glow.clone(); this.glowAmt = 0.4; this.glowAmtT = 0.4;
    this.entered = false;
    this.flex = 0; this.nextFlex = 4;
    this.raycaster = new THREE.Raycaster();
  }
  palette(p) {
    this.pal = p;
    if (!this.stage) return;
    this.applyPalette();
  }
  applyPalette() {
    const p = this.pal.gl;
    backdrop.uTop.value.set(p.skyTop); backdrop.uBottom.value.set(p.skyBottom); backdrop.uDot.value.set(p.ink);
    shared.uShadeTint.value.set(p.shade); shared.uDotInk.value.set(p.ink); shared.uRimCol.value.set(p.rim); shared.uGlint.value.set(p.glint);
    post.uInk.value.set(p.ink); post.uGradeShadow.value.set(p.gradeShadow); post.uGradeHigh.value.set(p.gradeHigh || '#ffffff');
    post.uImpInk.value.set(p.ink); post.uImpPaper.value.set(p.paper); post.uImpAccent.value.set(p.signal);
    post.uFadeCol.value.set(p.skyTop);
    shadowU.uShadowCol.value.set(p.shadow || p.signal);
    backdrop.uGridCol.value.set(p.paper); backdrop.uGridAmt.value = 0.05;
    if (this.fragMat) { this.fragMat.uniforms.uBase.value.set(p.paper); this.fragMat.uniforms.uBack.value.set(p.back); }
    // re-colour the paper (vertex colours) of every form
    for (const f of Object.values(this.forms)) f.recolor?.(p);
    this.glowT.set(p[GRADE[SECTION_IDS[this.cur]].glow]);
  }
  async load(stage) {
    this.stage = stage;
    const { scene, camera } = stage;
    camera.fov = 30; camera.position.set(0, 0, 10); camera.lookAt(0, 0, 0);
    await document.fonts.ready;
    await Promise.all(['800 40px "Hanken Grotesk Variable"', '40px "Dela Gothic One"', '700 20px "JetBrains Mono Variable"'].map((f) => document.fonts.load(f).catch(() => {})));
    const gp = this.pal.gl;
    const pal = { paper: gp.paper, back: gp.back, edge: gp.edge, pulse: gp.pulse };
    this.root = new THREE.Group(); scene.add(this.root);
    this.forms.mark = new MarkForm(pal);
    this.forms.die = new DieForm(pal, '"Dela Gothic One"');
    this.forms.miura = new MiuraForm(pal);
    this.forms.box = new BoxForm(pal);
    this.forms.screen = new ScreenForm(pal, [...featured, { name: 'All projects', more: true }], (it, i) => this.panelArt(it, i));
    for (const [k, f] of Object.entries(this.forms)) { f.group.visible = false; f.name = k; this.root.add(f.group); this.addRecolor(f); }
    // comic cast shadows on a plane behind the paper
    this.shadows = Object.values(this.forms).map((f) => new CastShadow(f.group, scene));
    this.fragments = this.makeFragments(pal);
    scene.add(this.fragments);
    // seal for the security beat: a vermilion stamp on the compressed sheet
    this.seal = this.makeSeal();
    this.forms.box.lid[0].add(this.seal);
    this.seal.userData.noShadow = true;
    this.seal.visible = false;
    { // centre of the lid, lying on it, rotated like a stamp
      const lid = this.forms.box.lid; const c = new THREE.Vector3();
      lid.forEach((m) => c.add(m.userData.centroid)); c.multiplyScalar(1 / lid.length);
      this.seal.position.set(c.x - 0.18, c.y + 0.03, c.z + 0.12);
      this.seal.rotation.set(-Math.PI / 2, 0, 0.22);
      this.seal.scale.setScalar(0.7);
    }
    this.applyPalette();
    this.form = this.forms.mark;
    this.form.group.visible = true;
  }
  // The flat crease pattern of each form, drawn faintly behind everything like a folding diagram.
  creasePatterns() {
    const out = {};
    const v3 = new THREE.Vector3();
    for (const [k, f] of Object.entries(this.forms)) {
      const segs = { line: [], m: [], v: [] };
      if (f.tree) {
        const tree = f.tree; const saved = tree.u.slice();
        const angles = tree.nodes.map((n) => n.angle);
        if (k === 'screen') tree.nodes.forEach((n) => { n.angle = 0; });
        tree.u.fill(0); if (k === 'screen') tree.u.fill(1); tree.update();
        // projection basis: the root piece's plane
        const root = tree.nodes[0].mesh;
        const N = (root.userData.normal || new THREE.Vector3(0, 0, 1)).clone();
        const ex = new THREE.Vector3(1, 0, 0); if (Math.abs(ex.dot(N)) > 0.9) ex.set(0, 1, 0);
        ex.sub(N.clone().multiplyScalar(ex.dot(N))).normalize();
        const ey = new THREE.Vector3().crossVectors(N, ex);
        const P = (p) => [p.dot(ex), -p.dot(ey)];
        tree.nodes.forEach((n, i) => {
          const pos = n.mesh.geometry.attributes.position;
          const pts = [];
          for (let j = 0; j < pos.count; j++) { v3.fromBufferAttribute(pos, j).applyMatrix4(n.M); pts.push(P(v3)); }
          const hull = convexHull(pts);
          for (let j = 0; j < hull.length; j++) segs.line.push([hull[j], hull[(j + 1) % hull.length]]);
          if (n.parent >= 0 && n.axis && k !== 'screen') {
            const a = n.a.clone().applyMatrix4(tree.nodes[n.parent].M), b = n.a.clone().add(n.axis).applyMatrix4(tree.nodes[n.parent].M);
            (angles[i] > 0 ? segs.m : segs.v).push([P(a), P(b)]);
          }
        });
        tree.u.splice(0, tree.u.length, ...saved);
        if (k === 'screen') tree.nodes.forEach((n, i) => { n.angle = angles[i]; });
        tree.update();
      } else if (f.sheet) {
        const sh = f.sheet;
        const V = (i, j) => { const v = sh.vertex(i, j, 0); return [v[0], -v[1]]; };
        for (let j = 0; j <= sh.rows; j++) for (let i = 0; i < sh.cols; i++) (j === 0 || j === sh.rows ? segs.line : (j % 2 ? segs.m : segs.v)).push([V(i, j), V(i + 1, j)]);
        for (let i = 0; i <= sh.cols; i++) for (let j = 0; j < sh.rows; j++) (i === 0 || i === sh.cols ? segs.line : (i % 2 ? segs.v : segs.m)).push([V(i, j), V(i, j + 1)]);
      }
      // normalise into a 1000-unit box
      const all = [...segs.line, ...segs.m, ...segs.v].flat();
      const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
      const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
      const sc = 1000 / Math.max(maxx - minx, maxy - miny);
      const T = (p) => `${((p[0] - (minx + maxx) / 2) * sc).toFixed(1)},${((p[1] - (miny + maxy) / 2) * sc).toFixed(1)}`;
      const d = (list) => list.map(([a, b]) => `M${T(a)}L${T(b)}`).join('');
      out[k] = { line: d(segs.line), m: d(segs.m), v: d(segs.v) };
    }
    return out;
  }
  showKanji(id) {
    const k = this.kanjiEl; if (!k) return;
    k.textContent = KANJI[id]; k.classList.remove('is-in'); void k.offsetWidth; k.classList.add('is-in');
  }
  showCP(formName) {
    const el = this.cpEl; if (!el || !this.cp) return;
    const c = this.cp[formName];
    el.innerHTML = `<g class="cp__g"><path class="cp__line" d="${c.line}"/><path class="cp__m" d="${c.m}"/><path class="cp__v" d="${c.v}"/></g>`;
    el.classList.remove('is-drawn'); void el.getBoundingClientRect(); el.classList.add('is-drawn');
  }
  ready(stage) {
    this.cp = this.creasePatterns();
    this.cpEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.cpEl.setAttribute('class', 'cp'); this.cpEl.setAttribute('viewBox', '-600 -600 1200 1200'); this.cpEl.setAttribute('aria-hidden', 'true');
    document.querySelector('.secs').before(this.cpEl);
    this.showCP('mark');
    this.kanjiEl = document.createElement('div'); this.kanjiEl.className = 'kanji'; this.kanjiEl.setAttribute('aria-hidden', 'true'); this.kanjiEl.lang = 'ja';
    document.querySelector('.secs').before(this.kanjiEl);
    this.showKanji('top');
    this.site = wireSite({ nav: stage.nav, sfx, onProject: (i, d) => this.project(i, d) });
    this.bindPointer();
  }
  addRecolor(f) {
    const meshes = [];
    f.group.traverse((o) => { if (o.isMesh && o.geometry.attributes.color) meshes.push(o); });
    const orig = meshes.map((m) => m.geometry.attributes.color.array.slice());
    const base = this.pal.gl;
    f.recolor = (p) => {
      const map = new Map([[C(base.paper).getHexString(), C(p.paper)], [C(base.back).getHexString(), C(p.back)], [C(base.edge).getHexString(), C(p.edge)]]);
      meshes.forEach((m, mi) => {
        const a = m.geometry.attributes.color, o = orig[mi], c = new THREE.Color();
        for (let i = 0; i < a.count; i++) {
          c.setRGB(o[i * 3], o[i * 3 + 1], o[i * 3 + 2]);
          const r = map.get(c.getHexString());
          if (r) a.setXYZ(i, r.r, r.g, r.b);
        }
        a.needsUpdate = true;
      });
      if (f.mat) { f.mat.uniforms.uBase.value.set(p.paper); f.mat.uniforms.uBack.value.set(p.back); f.mat.uniforms.uPulseCol.value.set(p.pulse); }
    };
    if (f instanceof MiuraForm) f.mat = f.mesh.material;
  }
  makeFragments(pal) {
    const n = 16;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.6, 0, -0.52, -0.3, 0, 0.52, -0.3, 0], 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 2));
    const mat = inkMaterial({ base: pal.paper, back: pal.back, side: THREE.DoubleSide, instanced: true, brush: 0.1, spec: 0.6, rim: 0.6, id: 249 });
    const m = new THREE.InstancedMesh(geo, mat, n);
    m.frustumCulled = false;
    const rnd = (a, b) => a + Math.random() * (b - a);
    this.frag = Array.from({ length: n }, (_, i) => ({
      p: new THREE.Vector3(rnd(-6, 6), rnd(-3.4, 3.4), rnd(-4, 2.2)), r: new THREE.Euler(rnd(0, 6), rnd(0, 6), rnd(0, 6)),
      v: new THREE.Vector3(rnd(-0.05, 0.05), rnd(0.03, 0.12), 0), w: new THREE.Vector3(rnd(-0.6, 0.6), rnd(-0.8, 0.8), rnd(-0.4, 0.4)), s: rnd(0.05, 0.16),
    }));
    this.fragMat = mat;
    return m;
  }
  updateFragments(dt, t) {
    const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
    const pt = this.stage.pointer;
    this.frag.forEach((f, i) => {
      f.p.addScaledVector(f.v, dt); if (f.p.y > 3.8) f.p.y = -3.8;
      f.r.x += f.w.x * dt; f.r.y += f.w.y * dt; f.r.z += f.w.z * dt;
      // stepped rotation reads as drawn, not simulated
      const step = Math.floor(t * 12) / 12;
      const e = new THREE.Euler(f.r.x + step * 0, f.r.y, f.r.z);
      Q.setFromEuler(e);
      const par = (f.p.z + 4) / 6;
      const pos = f.p.clone(); pos.x += pt.sx * par * 0.35; pos.y += pt.sy * par * 0.2;
      M.compose(pos, Q, S.setScalar(f.s));
      this.fragments.setMatrixAt(i, M);
    });
    this.fragments.instanceMatrix.needsUpdate = true;
  }
  makeSeal() {
    const c = document.createElement('canvas'); c.width = c.height = 512;
    const g = c.getContext('2d');
    const p = new Path2D(SEAL);
    g.scale(512 / 120, 512 / 120);
    g.fillStyle = '#e2412f'; g.fill(p, 'evenodd');
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), inkMaterial({ base: '#ffffff', map: tex, mapAmt: 1, emissive: true, id: 251, transparent: false }));
    // seal art is opaque only where inked
    m.material.fragmentShader = m.material.fragmentShader.replace('gColor = vec4(base, uAlpha);', 'if (mp.a < 0.5) discard; gColor = vec4(base, uAlpha);');
    m.material.needsUpdate = true;
    return m;
  }
  panelArt(it, i) {
    const W = 640, H = 908, c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    const gp = this.pal.gl;
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 8;
    const draw = (img) => {
      g.fillStyle = gp.paper; g.fillRect(0, 0, W, H);
      if (it.more) {
        g.fillStyle = gp.ink; g.font = '800 64px "Hanken Grotesk Variable"'; g.fillText('All', 40, 120); g.fillText('projects', 40, 186);
        const more = moreProjects();
        g.font = '500 24px "JetBrains Mono Variable"';
        [...more.recent].slice(0, 13).forEach((r, k) => { g.fillStyle = k % 2 ? 'rgba(7,6,13,.55)' : gp.ink; g.fillText(r.name, 40, 270 + k * 44); });
        g.strokeStyle = gp.ink; g.lineWidth = 3; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(40, 220); g.lineTo(W - 40, 220); g.stroke();
      } else {
        if (img) {
          const ih = Math.min(560, W * img.height / img.width);
          g.save(); g.beginPath(); g.rect(0, 0, W, 560); g.clip();
          const s = Math.max(W / img.width, 560 / img.height);
          g.drawImage(img, (W - img.width * s) / 2, 0, img.width * s, img.height * s);
          g.restore();
          g.fillStyle = gp.ink; g.fillRect(0, 556, W, 6);
        }
        g.fillStyle = gp.ink;
        g.font = '800 82px "Hanken Grotesk Variable"'; g.fillText(it.name, 34, 680);
        g.font = '600 22px "JetBrains Mono Variable"'; g.fillText((it.kicker || '').toUpperCase(), 38, 730);
        g.fillText(it.tags.slice(0, 3).join(' · ').toUpperCase(), 38, 770);
        g.fillStyle = '#e2412f'; g.fillRect(W - 96, 616, 58, 58);
        g.fillStyle = gp.paper; g.font = '28px "Dela Gothic One"'; g.textAlign = 'center'; g.fillText(String(i + 1).padStart(2, '0'), W - 67, 656); g.textAlign = 'left';
      }
      // registration marks
      g.strokeStyle = gp.ink; g.lineWidth = 2; g.setLineDash([]);
      for (const [x, y] of [[18, 18], [W - 18, 18], [18, H - 18], [W - 18, H - 18]]) { g.beginPath(); g.moveTo(x - 10, y); g.lineTo(x + 10, y); g.moveTo(x, y - 10); g.lineTo(x, y + 10); g.stroke(); }
      tex.needsUpdate = true;
    };
    if (it.image) { const img = new Image(); img.onload = () => draw(img); img.src = it.image; draw(null); } else draw(null);
    return tex;
  }
  // where the paper lives on screen for each section
  placement(id, view) {
    const vh = Math.tan(THREE.MathUtils.degToRad(this.stage.camera.fov / 2)) * 10;
    const vw = vh * view.aspect;
    const phone = view.portrait;
    const P = {
      top: { x: 0.40, y: 0.0, s: 1.42, r: [-0.22, -0.72, 0.08] },
      systems: { x: 0.42, y: 0.04, s: 1.2, r: [0.25, 0.35, 0.0] },
      ai: { x: 0.40, y: 0.02, s: 0.92, r: [-0.42, 0.32, 0.2] },
      security: { x: 0.42, y: -0.04, s: 1.18, r: [0.62, -0.58, 0.0] },
      work: { x: 0.2, y: -0.03, s: 0.98, r: [0.04, 0.0, 0.0] },
      contact: { x: 0.42, y: 0.02, s: 1.2, r: [-0.2, 0.62, -0.06] },
    }[id];
    if (phone) {
      const s = Math.min(1.15, view.aspect * 1.6);
      const y = { top: 0.42, systems: 0.36, ai: 0.4, security: 0.4, work: 0.46, contact: 0.42 }[id];
      return { pos: new THREE.Vector3(0, vh * y, 0), s: P.s * s * (id === 'work' ? 0.78 : 1.0), r: P.r };
    }
    return { pos: new THREE.Vector3(vw * P.x, vh * P.y, 0), s: P.s, r: P.r };
  }
  layout(view) {
    this.view = view;
    this.stage.camera.fov = view.portrait ? 40 : 30;
    const pl = this.placement(SECTION_IDS[this.cur], view);
    this.anchorT.copy(pl.pos); this.scaleT = pl.s; this.rotT.set(...pl.r);
    if (!this.entered) { this.anchor.copy(this.anchorT); this.scale = this.scaleT; this.rot.copy(this.rotT); }
  }
  // ---------- entrance ----------
  enter() {
    const html = document.documentElement;
    html.classList.add('ready');
    const mark = this.forms.mark;
    const tl = this.tl;
    const hero = document.querySelector('.sec--hero');
    this.entered = true;
    if (reduced || q.has('skipintro')) { mark.set(1); hero.classList.add('is-current'); this.stage.nav.lockUntil = 0; return; }
    html.classList.add('entering');
    mark.set(0);
    const home = this.anchorT.clone(), homeS = this.scaleT;
    this.anchor.set(-0.6, 0.1, 0); this.scale = homeS * 0.9;
    this.rot.set(0, 0, 0);
    // four creases, each a held-frame snap
    const creaseAt = [0.18, 0.48, 0.78, 1.06];
    tl.add(0.12, 1.22, (p) => mark.set(p), { step: 12 });
    creaseAt.forEach((t) => tl.at(t + 0.2, () => sfx.play('snap')));
    tl.at(1.36, () => { this.stage.impact.hit({ seq: 'big', center: this.screenPos(), shake: 1 }); sfx.play('slam'); });
    tl.add(1.3, 0.9, (p) => { this.anchor.lerpVectors(new THREE.Vector3(0, 0.1, 0), home, p); }, { ease: ease.inOut3 });
    tl.at(1.42, () => { html.classList.remove('entering'); hero.classList.add('is-current'); });
    this.stage.nav.lockUntil = performance.now() + 2100;
  }
  screenPos() {
    const v = this.anchor.clone().project(this.stage.camera);
    return [v.x * 0.5 + 0.5, v.y * 0.5 + 0.5];
  }
  // ---------- section changes ----------
  go(to, from) {
    this.cur = to;
    const id = SECTION_IDS[to], fromId = SECTION_IDS[from];
    const secs = document.querySelectorAll('.sec');
    const next = this.forms[FORM_OF[id]], prev = this.form;
    const pl = this.placement(id, this.view);
    const tl = this.tl;
    tl.clear();
    // DOM: old copy leaves at once, new copy arrives as the paper lands
    secs[from].classList.remove('is-current'); secs[from].classList.add('is-leaving');
    setTimeout(() => secs[from].classList.remove('is-leaving'), 300);
    const swap = next !== prev;
    const tIn = swap ? 0.42 : 0.15;
    setTimeout(() => secs[to].classList.add('is-current'), tIn * 1000);
    // grade
    this.glowT.set(this.pal.gl[GRADE[id].glow]); this.glowAmtT = GRADE[id].glowAmt; this.keyT.set(...GRADE[id].key).normalize();
    this.scaleT = pl.s; this.anchorT.copy(pl.pos);
    this.rotT.set(...pl.r);
    if (reduced) {
      if (swap) { prev.group.visible = false; next.group.visible = true; this.form = next; }
      this.settle(id, next, 1); return 300;
    }
    if (swap) {
      const unfold = prev === this.forms.screen ? 0.3 : 0.32;
      const p0 = prev.p ?? 1;
      if (prev === this.forms.screen) tl.add(0, unfold, (p) => { prev.close = p; prev.update(0); }, { step: 12 });
      else if (prev === this.forms.miura) tl.add(0, unfold, (p) => prev.set(lerp(p0, 0, p)), { step: 12 });
      else tl.add(0, unfold, (p) => prev.set(lerp(p0, 0, p)), { step: 12, ease: ease.in3 });
      tl.at(0.06, () => sfx.play('fold'));
      tl.at(unfold, () => {
        prev.group.visible = false;
        if (prev === this.forms.screen) prev.close = 0;
        next.group.visible = true; this.form = next;
        this.seal.visible = false;
        this.prepare(id, next);
        this.showCP(FORM_OF[id]);
        this.showKanji(id);
        this.stage.impact.hit({ seq: 'hit', center: this.screenPos(), shake: 0.7 });
        sfx.play('slam', { gain: 0.6 });
      });
      tl.add(unfold + 0.06, 0.78, (p) => this.settle(id, next, p), { step: 12, ease: ease.out3 });
      if (id === 'systems') tl.at(unfold + 0.9, () => { sfx.play('stamp'); this.stage.impact.hit({ seq: 'soft', center: this.screenPos(), shake: 0.5 }); });
    } else {
      this.showKanji(id);
      tl.add(0, 0.6, (p) => this.settle(id, next, p, fromId), { step: 12, ease: ease.inOut3 });
    }
    if (id === 'security') {
      tl.at(swap ? 1.2 : 0.62, () => {
        this.seal.visible = true; this.sealT = 0;
        sfx.play('stamp'); this.stage.impact.hit({ seq: 'accent', center: this.screenPos(), shake: 0.9 });
      });
    }
    return swap ? 1150 : 760;
  }
  prepare(id, f) {
    if (f === this.forms.mark) f.set(0);
    if (f === this.forms.die) { f.set(0); f.group.rotation.set(0, 0, 0); }
    if (f === this.forms.miura) f.set(0);
    if (f === this.forms.box) f.set(0);
    if (f === this.forms.screen) { f.close = 1; f.sel = this.site?.project ?? 0; f.selF = f.sel; f.update(0); }
  }
  settle(id, f, p, fromId) {
    if (f === this.forms.mark) f.set(p);
    else if (f === this.forms.die) f.set(p);
    else if (f === this.forms.miura) f.set(lerp(0, 0.6, p));
    else if (f === this.forms.box) f.set(p);
    else if (f === this.forms.screen) { f.close = 1 - p; f.update(0); }
  }
  project(i) {
    const s = this.forms.screen;
    s.sel = i;
    this.stage.impact.hit({ seq: 'soft', center: this.screenPos(), shake: 0.35 });
  }
  side(d) {
    if (SECTION_IDS[this.cur] !== 'work') return false;
    this.site.setProject(this.site.project + d, d);
    return true;
  }
  bindPointer() {
    const cv = this.stage.canvas;
    const pick = (e) => {
      const r = cv.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      this.raycaster.setFromCamera(ndc, this.stage.camera);
      const hits = this.form ? this.raycaster.intersectObject(this.form.group, true) : [];
      return hits[0];
    };
    addEventListener('pointermove', (e) => {
      if (e.target.closest && e.target.closest('a,button,.index')) return;
      const h = pick(e);
      document.body.style.cursor = h ? 'pointer' : '';
    }, { passive: true });
    addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a,button,.index,.bar,.rail')) return;
      const h = pick(e);
      if (!h) return;
      const f = this.form;
      if (f === this.forms.mark) this.flex = 1;
      else if (f === this.forms.die) this.roll();
      else if (f === this.forms.miura) { this.pulseKick = 1; sfx.play('fold'); this.stage.impact.hit({ seq: 'soft', center: this.screenPos(), shake: 0.4 }); }
      else if (f === this.forms.screen) {
        let o = h.object; while (o && o.userData.panel === undefined) o = o.parent;
        const pi = o ? o.userData.panel : null;
        if (pi === featured.length) document.querySelector('.work__all').click();
        else if (pi !== null && pi !== this.site.project) this.site.setProject(pi, pi > this.site.project ? 1 : -1);
      }
    });
  }
  roll() {
    if (this.rolling) return;
    this.rolling = true;
    const g = this.forms.die.group;
    const start = g.rotation.clone();
    const spins = new THREE.Euler(start.x + Math.PI * 4 + Math.random() * 3, start.y + Math.PI * 2 + Math.random() * 3, start.z + Math.random());
    sfx.play('whoosh');
    this.tl.add(0, 0.9, (p) => {
      g.rotation.set(lerp(start.x, spins.x, p), lerp(start.y, spins.y, p), lerp(start.z, spins.z, p));
    }, { step: 12, ease: ease.out3, onEnd: () => { this.rolling = false; sfx.play('snap'); this.stage.impact.hit({ seq: 'soft', center: this.screenPos(), shake: 0.4 }); } });
  }
  update(dt, t, shake) {
    if (!this.entered && this.stage.nav) this.enter();
    this.tl.update(dt);
    const k = 1 - Math.exp(-dt * 4.5);
    this.anchor.lerp(this.anchorT, this.tl.busy ? k * 0.9 : k);
    this.scale = lerp(this.scale, this.scaleT, k);
    this.rot.x = lerp(this.rot.x, this.rotT.x, k); this.rot.y = lerp(this.rot.y, this.rotT.y, k); this.rot.z = lerp(this.rot.z, this.rotT.z, k);
    this.key.lerp(this.keyT, k * 0.6);
    this.glow.lerp(this.glowT, k * 0.5); this.glowAmt = lerp(this.glowAmt, this.glowAmtT, k * 0.5);
    const pt = this.stage.pointer;
    // pointer: the paper leans toward you and the key light swings with the cursor
    const id = SECTION_IDS[this.cur];
    const f = this.form;
    if (!f) return;
    const g = f.group;
    const idle = Math.sin(t * 0.45) * 0.22;
    const tiltX = -pt.sy * 0.22, tiltY = pt.sx * 0.35;
    if (f === this.forms.die) {
      if (!this.rolling) { g.rotation.x += dt * 0.12; g.rotation.y += dt * 0.18; }
      this.root.rotation.set(this.rot.x + tiltX * 0.6, this.rot.y + tiltY * 0.6, this.rot.z);
    } else {
      g.rotation.set(0, 0, 0);
      this.root.rotation.set(this.rot.x + tiltX, this.rot.y + idle + tiltY, this.rot.z);
    }
    this.root.position.set(this.anchor.x + shake.x * 0.08, this.anchor.y + shake.y * 0.08 + Math.sin(t * 0.8) * 0.04, 0);
    this.root.scale.setScalar(this.scale);
    // idle life per form
    if (f === this.forms.mark && !this.tl.busy) {
      this.nextFlex -= dt;
      if (this.nextFlex <= 0) { this.flex = 1; this.nextFlex = 5 + Math.random() * 3; }
      if (this.flex > 0) {
        this.flex = Math.max(0, this.flex - dt * 1.6);
        const pulse = Math.sin((1 - this.flex) * Math.PI);
        const sn = Math.floor(pulse * 6) / 6;
        f.tree.u[2] = 1 - sn * 0.16; f.tree.u[3] = 1 - sn * 0.1; f.tree.update();
        if (this.flex > 0.45 && this.flex - dt * 1.6 <= 0.45) sfx.play('snap', { gain: 0.5 });
      }
    }
    if (f === this.forms.miura && !this.tl.busy && id === 'ai') {
      f.set(0.62 + Math.sin(t * 1.1) * 0.12 * (1 + (this.pulseKick || 0)));
      this.pulseKick = Math.max(0, (this.pulseKick || 0) - dt);
    }
    if (f === this.forms.miura && f.mat) f.mat.uniforms.uPulse.value = 1;
    if (this.seal.visible) {
      this.sealT = Math.min(1, (this.sealT || 0) + dt * 5);
      const s = 1 + (1 - Math.floor(this.sealT * 4) / 4) * 0.9;
      this.seal.scale.setScalar(s * 0.7);
    }
    if (f === this.forms.screen) { if (!this.tl.busy) f.close = Math.max(0, f.close - dt * 3); f.update(dt); }
    // lights + backdrop follow the paper
    const v = this.root.position.clone().project(this.stage.camera);
    backdrop.uGlowPos.value.set(v.x * 0.5 + 0.5, v.y * 0.5 + 0.5);
    if (this.cpEl) {
      const vw = this.view.w, vh = this.view.h, size = Math.min(vw, vh) * (this.view.portrait ? 1.05 : 1.12);
      this.cpEl.style.transform = `translate(${(v.x * 0.5 + 0.5) * vw - size / 2}px, ${(1 - (v.y * 0.5 + 0.5)) * vh - size / 2}px) rotate(-14deg)`;
      this.cpEl.style.width = this.cpEl.style.height = size + 'px';
      if (this.kanjiEl) this.kanjiEl.style.transform = `translate(${(v.x * 0.5 + 0.5) * vw}px, ${(1 - (v.y * 0.5 + 0.5)) * vh}px) translate(-50%, -50%)`;
    }
    backdrop.uGlowCol.value.copy(this.glow); backdrop.uGlowAmt.value = this.glowAmt;
    const kd = this.key.clone(); kd.x += pt.sx * 0.5; kd.y += pt.sy * 0.3; shared.uKeyDir.value.copy(kd.normalize());
    // shadow plane sits behind the paper; light comes from the upper left
    this.root.updateMatrixWorld(true);
    shadowU.uPlaneP.value.set(0, 0, -1.25 * this.scale);
    shadowU.uShadowAmt.value = 0.5;
    shadowU.uLight.value.set(-0.42 - pt.sx * 0.2, 0.5 - pt.sy * 0.15, 1).normalize();
    for (const sh of this.shadows) sh.update();
    this.updateFragments(dt, t);
  }
}

const director = new FoldDirector();
const stage = new Stage({
  canvas: document.querySelector('canvas.gl'), ids: SECTION_IDS, director, glow: false,
  palettes: PALETTES, palette: q.get('palette') || 'night-paper',
});
post.uMisregPx.value = 1.4; post.uGrain.value = 0.05; post.uVignette.value = 0.4; post.uGradeAmt.value = 0.22;
await stage.start();
// expose a hook for review captures
window.__xini.project = (i) => director.site.setProject(i, 1);
window.__xini.ready = true;
