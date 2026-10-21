import * as THREE from 'three';
import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '../../shared/fonts/zen-kaku-700.css';
import './loop.css';
import { World, reduced, q, openLink } from '../../shared/world/world.js';
import { renderWorld, STOP_IDS } from '../../shared/world/ui.js';
import { shared, inkMaterial, newInkId } from '../../shared/gfx/ink-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { backdrop } from '../../shared/gfx/backdrop.js';
import { scatterTowers, facadeU } from '../../shared/gfx/facade.js';
import { makeCloudSea, cloudU } from '../../shared/gfx/clouds.js';
import { NOISE } from '../../shared/gfx/glsl.js';
import { makeSky, skyU, makeTraffic } from '../../shared/gfx/sky.js';
import { foldMarkSVG, FOLD_FRONT, FOLD_BACK } from '../../shared/ui/marks.js';
import { featured } from '../../shared/data/content.js';
import { Track, buildTrackMeshes, S as MS, BASE_Y } from './track.js';
import { V, boxMesh, signPlane, latticeMast, dishMesh, podMesh, drawBoard, signFont, kanjiFont, monoFont } from './stations.js';
import { PALETTES } from './palettes.js';

const PLACES = ['Arrival', 'The yard', 'Signal', 'Checkpoint', 'Gallery', 'Terminal'];
const lerp = THREE.MathUtils.lerp;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// the route map is the mark itself
const W2 = 1.56, H2 = 1.62;
const markPts = [[-W2 / 2, -H2 / 2], [-W2 / 2, H2 / 2], [W2 / 2, -H2 / 2], [W2 / 2, H2 / 2]];
const routePath = 'M' + markPts.map(([x, y]) => `${(x * 100).toFixed(1)},${(-y * 100).toFixed(1)}`).join(' L') + ' Z';

document.getElementById('app').innerHTML = renderWorld({
  places: PLACES,
  mark: foldMarkSVG('logo', 'var(--text)', 'var(--neon)'),
  route: {
    viewBox: '-92 -94 184 188', path: routePath,
    // arrival floats above; the stations sit on the loop in ride order
    nodes: [[0, -91], [-78, 0], [-74, -77], [0, 0], [78, 0], [74, -77]],
  },
});

// the neon strips carry data: bright packets travel the whole loop
function neonMaterial(base, hot, speed = 0.06, density = 26) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; in vec2 uv; in vec3 aCenter; in vec3 aOff; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; uniform float uGrow;
      out vec2 vUv;
      // the strip widens with distance so the loop stays a bold line from far away and a fine one up close
      void main(){ vUv = uv; float d = distance(aCenter, cameraPosition); vec3 p = aCenter + aOff * (1.0 + d * uGrow); gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0); }`,
    fragmentShader: /* glsl */ `precision highp float;
      ${NOISE}
      uniform vec3 uBase, uHot; uniform float uTime, uSpeed, uDensity, uBoost, uLit;
      in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float u = vUv.x;
        // the strip switches on along the loop during the entrance (uLit 0..1)
        if (u > uLit) { gColor = vec4(uBase * 0.08, 1.0); gNormal = vec4(0.5, 0.5, 1.0, 9.0 / 255.0); return; }
        float lane = floor(u * uDensity - uTime * uSpeed * uDensity);
        float f = fract(u * uDensity - uTime * uSpeed * uDensity);
        float pk = step(0.88, f) * step(0.35, hash11(lane));
        vec3 c = uBase * (0.85 + uBoost * 0.3) + uHot * pk;
        float head = smoothstep(0.012, 0.0, abs(u - uLit)) * step(uLit, 0.999);
        c = mix(c, uHot * 1.4, head);
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 250.0 / 255.0);
      }`,
    uniforms: { uBase: { value: new THREE.Color(base) }, uHot: { value: new THREE.Color(hot) }, uTime: shared.uTime, uSpeed: { value: speed }, uDensity: { value: density }, uBoost: { value: 0 }, uLit: { value: 1 }, uGrow: { value: 0.012 } },
  });
}

class LoopDirector {
  constructor() { this.parallax = 3.5; this.podS = 0.02; this.lit = 1; }
  palette(p) {
    this.pal = p.gl;
    const g = this.pal;
    skyU.uZenith.value.set(g.zenith); skyU.uHorizon.value.set(g.skyHorizon); skyU.uGlow.value.set(g.skyGlow); skyU.uStreak.value.set(g.skyStreak); skyU.uMoon.value.set(g.moon); skyU.uDot.value.set(g.ink);
    if (this.carMats) { this.carMats[0].uniforms.uBase.value.set(g.carA); this.carMats[1].uniforms.uBase.value.set(g.carB); }
    shared.uShadeTint.value.set(g.shade); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set(g.glint);
    shared.uFillCol.value.set(g.uplight); shared.uFillAmt.value = 0.55;
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paperFlash); post.uImpAccent.value.set(g.neon);
    post.uFogCol.value.set(g.fog); post.uSpeedCol.value.set(g.streak);
    cloudU.uTop.value.set(g.cloudTop); cloudU.uUnder.value.set(g.cloudUnder); cloudU.uDeep.value.set(g.cloudDeep); cloudU.uDot.value.set(g.ink);
    facadeU.uWinA.value.set(g.winA); facadeU.uWinB.value.set(g.winB); facadeU.uWinC.value.set(g.winC); facadeU.uRoof.value.set(g.roof); facadeU.uWallLit.value.set(g.wallLit);
    if (this.neon) { this.neon.uniforms.uBase.value.set(g.neon); this.neon.uniforms.uHot.value.set(g.hot); }
    this.boards?.forEach((b) => b.userData.redraw());
  }
  async build(world) {
    this.world = world;
    const { scene, camera } = world;
    camera.near = 1; camera.far = 5000;
    await document.fonts.ready;
    await Promise.all(['900 40px "Big Shoulders Display Variable"', '700 40px "Zen Kaku Gothic New"', '600 20px "JetBrains Mono Variable"'].map((f) => document.fonts.load(f, '工房信号検問展示終点到着').catch(() => {})));
    const g = this.pal;
    // ---- the loop
    const track = this.track = new Track();
    const tm = buildTrackMeshes(track, g);
    this.neon = neonMaterial(g.neon, g.hot);
    tm.children.forEach((m) => { if (m.material === tm.userData.neonMat) m.material = this.neon; });
    scene.add(tm);
    // ---- stations along the ride, in route order
    const sAt = (x, z, lo = 0, hi = 1) => { let best = lo, bd = Infinity; for (let s = lo; s < hi; s += 0.0005) { const p = track.frameAt(s).p; const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; best = s; } } return best; };
    const L = (W2 / 2) * MS, T = (H2 / 2) * MS;
    this.sYard = sAt(-L, 20, 0, 0.25);
    this.sSignal = sAt(-L, -T, 0.1, 0.32);
    this.sCheck = sAt(0, 0, 0.25, 0.55);
    this.sGallery = sAt(L, 15, 0.5, 0.75);
    this.sTerm = sAt(L, -T, 0.55, 0.8);
    const stat = (s) => track.frameAt(s);
    // city: the near ring threads between the loop's arms, the far ring fills the horizon
    const avoid = [];
    for (let s = 0; s < 1; s += 0.01) { const p = track.frameAt(s).p; avoid.push([p.x, p.z, 24]); }
    const pal4 = [g.wallA, g.wallB, g.wallC];
    // most of the city stays under the cloud sea; only the skyline far out and a few landmarks break through
    const near = scatterTowers({ count: 300, rMin: 0, rMax: 700, hMin: 110, hMax: 225, wMin: 16, wMax: 34, y: -160, seed: 11, avoid, palette: pal4 });
    const far = scatterTowers({ count: 900, rMin: 700, rMax: 2600, hMin: 160, hMax: 470, wMin: 24, wMax: 70, y: -160, seed: 7, palette: pal4 });
    const marks = scatterTowers({ count: 9, rMin: 230, rMax: 520, hMin: 330, hMax: 420, wMin: 26, wMax: 38, y: -160, seed: 5, avoid, palette: pal4 });
    scene.add(near, far, marks);
    // hero towers carry the signal mast and the terminal on their roofs
    const heroMat = inkMaterial({ base: g.wallB, brush: 0.25, spec: 0.2, rim: 1 });
    const sig = stat(this.sSignal), term = stat(this.sTerm);
    const sigBase = V(sig.p.x - 34, 0, sig.p.z - 34), termBase = V(term.p.x + 36, 0, term.p.z - 34);
    const heroTower = (base, top) => { const m = boxMesh([30, top + 160, 30], V(base.x, (top - 160) / 2, base.z), heroMat); scene.add(m); return m; };
    heroTower(sigBase, 128); heroTower(termBase, 131);
    // clouds and sky
    this.clouds = makeCloudSea({ y: 58, px: shared.uPx, time: shared.uTime });
    scene.add(this.clouds);
    world.backdrop.visible = false;
    this.sky = makeSky({ px: shared.uPx }); scene.add(this.sky);
    // skylanes: rings of traffic weaving between the towers
    const lanes = [];
    for (let k = 0; k < 7; k++) {
      const r0 = 300 + k * 110, y0 = 75 + (k % 4) * 38, pts = [];
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 + k; pts.push(V(Math.cos(a) * (r0 + Math.sin(a * 3 + k) * 60), y0 + Math.sin(a * 2 + k) * 14, Math.sin(a) * (r0 + Math.cos(a * 2 + k) * 60))); }
      lanes.push(new THREE.CatmullRomCurve3(pts, true));
    }
    this.carMats = [inkMaterial({ base: g.carA, emissive: true, instanced: true }), inkMaterial({ base: g.carB, emissive: true, instanced: true })];
    this.traffic = [makeTraffic({ lanes, count: 220, mat: this.carMats[0] }), makeTraffic({ lanes, count: 160, mat: this.carMats[1] })];
    this.traffic.forEach((tr) => scene.add(tr.mesh));
    // giant ads on the landmark towers, facing the loop
    const adWords = [['電脳', 'NETWORK'], ['未来', 'FUTURE'], ['光', 'LIGHT'], ['夜市', 'NIGHT MARKET'], ['速達', 'EXPRESS'], ['記憶', 'MEMORY'], ['自由', 'FREE'], ['回路', 'CIRCUIT'], ['信頼', 'TRUST']];
    const Mx = new THREE.Matrix4(), Pp = new THREE.Vector3(), Qq = new THREE.Quaternion(), Ss = new THREE.Vector3();
    for (let i = 0; i < marks.count; i++) {
      marks.getMatrixAt(i, Mx); Mx.decompose(Pp, Qq, Ss);
      const top = Pp.y + Ss.y;
      const toC = V(-Pp.x, 0, -Pp.z).normalize();
      const [jp, en] = adWords[i % adWords.length];
      const col = g.ad[i % g.ad.length];
      const ad = signPlane(Ss.x * 0.8, Ss.x * 1.5, (c2, Wd, Hd) => {
        c2.fillStyle = '#05060d'; c2.fillRect(0, 0, Wd, Hd);
        c2.fillStyle = col; c2.fillRect(Wd * 0.06, Hd * 0.04, Wd * 0.88, Hd * 0.012); c2.fillRect(Wd * 0.06, Hd * 0.95, Wd * 0.88, Hd * 0.012);
        c2.font = `700 ${Math.round(Wd * 0.62)}px ${kanjiFont}`; c2.textAlign = 'center'; c2.textBaseline = 'middle';
        const chars = [...jp];
        chars.forEach((ch, k) => c2.fillText(ch, Wd / 2, Hd * (0.22 + (k * 0.62) / Math.max(1, chars.length - 1 || 1)) - (chars.length === 1 ? -Hd * 0.2 : 0)));
        c2.font = `900 ${Math.round(Wd * 0.11)}px ${signFont}`; c2.fillText(en, Wd / 2, Hd * 0.9);
      }, { res: 256 });
      ad.material = inkMaterial({ base: '#ffffff', map: ad.material.uniforms.uMap.value, mapAmt: 1, emissive: true });
      ad.position.copy(Pp).add(V(0, top - Ss.x * 1.0, 0)).addScaledVector(toC, Ss.z * 0.51 + 0.5);
      ad.lookAt(ad.position.clone().add(toC));
      scene.add(ad);
    }
    // ---- materials for props
    const steel = inkMaterial({ base: g.steel, brush: 0.2, spec: 0.8, rim: 1 });
    const steelI = inkMaterial({ base: g.steel, brush: 0.2, spec: 0.8, rim: 1, instanced: true });
    const dark = inkMaterial({ base: g.steelDark, brush: 0.2, spec: 0.5, rim: 1 });
    const lamp = inkMaterial({ base: g.lamp, emissive: true });
    const neonSolid = inkMaterial({ base: g.neon, emissive: true });
    const hazard = inkMaterial({ base: g.hazard, brush: 0.2, spec: 0.3 });
    this.boards = [];
    const board = (jp, en, sub, w, h) => { const b = signPlane(w, h, drawBoard(jp, en, this.pal, sub), { res: 640 }); this.boards.push(b); return b; };
    const at = (s, side, out, y = 0) => { const f = stat(s); const c = f.p.clone().addScaledVector(f.side, side * out); c.y = f.p.y + y; return { f, c, yaw: Math.atan2(f.side.x * side, f.side.z * side) }; };

    // THE YARD: a hanging deck where track segments are built
    {
      const { f, c } = at(this.sYard, -1, 22, -2.5);
      const grp = new THREE.Group(); grp.position.copy(c); grp.lookAt(c.clone().add(f.side)); scene.add(grp); this.yard = grp;
      grp.add(boxMesh([58, 1.6, 32], V(0, 0, 0), dark));
      for (const x of [-20, 20]) grp.add(boxMesh([1.2, 18, 1.2], V(x, -9, -12), steel), boxMesh([1.2, 18, 1.2], V(x, -9, 12), steel));
      // stacked segments and a half-built section on stands
      for (let i = 0; i < 4; i++) grp.add(boxMesh([9, 2.2, 4], V(-12, 2 + i * 2.3, 6 - (i % 2) * 0.6), i % 2 ? steel : dark));
      grp.add(boxMesh([24, 2.4, 9], V(8, 6.5, -2), steel));
      for (const x of [-2, 18]) grp.add(boxMesh([1, 5.5, 1], V(x, 3.5, -2), dark));
      grp.add(boxMesh([24.4, 0.4, 0.4], V(8, 7.9, -6.7), neonSolid));
      // crane
      const crane = latticeMast({ h: 58, w: 3.4, taper: 0.9, step: 4, mat: steelI }); crane.position.set(20, 0.8, 9); grp.add(crane);
      const jib = latticeMast({ h: 44, w: 2.4, taper: 1, step: 4, mat: steelI }); jib.rotation.z = Math.PI / 2; jib.position.set(34, 58, 9); grp.add(jib);
      grp.add(boxMesh([0.3, 30, 0.3], V(-4, 31, 9), dark), boxMesh([5, 2, 3], V(-4, 15, 9), hazard));
      for (const x of [-18, -6, 6, 18]) { const l = boxMesh([3, 0.6, 1.2], V(x, 12, 12), lamp); grp.add(l); }
      const b = board('工房', 'The yard', 'Build', 22, 9); b.position.set(-8, 16, 13.2); grp.add(b);
      this.sparkPos = grp.localToWorld(V(-2, 9, -2));
      this.yardAnchor = grp.localToWorld(V(-8, 34, 10));
    }
    // SIGNAL: the uplink mast on a tower roof at the corner
    {
      const base = V(sigBase.x, 128, sigBase.z);
      const mast = latticeMast({ h: 150, w: 14, taper: 0.25, step: 10, mat: steelI }); mast.position.copy(base); scene.add(mast);
      const dish = dishMesh(22, 7, inkMaterial({ base: g.dish, spec: 0.9, rim: 1, side: THREE.DoubleSide }));
      dish.position.set(base.x + 16, base.y + 74, base.z + 16); dish.rotation.set(-1.0, 0.0, 0.55); dish.lookAt(dish.position.clone().add(V(0.6, 0.5, 0.7))); dish.rotateX(Math.PI / 2);
      scene.add(dish);
      const dish2 = dishMesh(11, 3.5, inkMaterial({ base: g.dish, spec: 0.9, rim: 1, side: THREE.DoubleSide }));
      dish2.position.set(base.x - 8, base.y + 112, base.z + 6); dish2.lookAt(dish2.position.clone().add(V(-0.3, 0.6, 0.8))); dish2.rotateX(Math.PI / 2); scene.add(dish2);
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 8), inkMaterial({ base: g.beacon, emissive: true })); beacon.position.set(base.x, base.y + 152, base.z); scene.add(beacon); this.beacon = beacon;
      // signal rings rise off the mast top, drawn as hard neon hoops
      const ringMat = inkMaterial({ base: new THREE.Color(g.neon).multiplyScalar(0.55).getStyle(), emissive: true, bloom: false });
      this.rings = [0, 1, 2].map((k) => { const r = new THREE.Mesh(new THREE.TorusGeometry(10, 0.2, 6, 48), ringMat); r.rotation.x = Math.PI / 2; r.position.set(base.x, base.y + 150, base.z); r.userData.k = k; scene.add(r); return r; });
      const b = board('信号', 'Signal', 'Uplink', 26, 10); b.position.set(base.x + 10, base.y + 22, base.z + 18); b.lookAt(b.position.clone().add(V(0.7, 0, 0.7))); scene.add(b);
      this.sigTop = V(base.x, base.y + 150, base.z);
      this.sigAnchor = V(base.x + 44, base.y + 98, base.z + 54);
    }
    // CHECKPOINT: a heavy gate over the lower branch at the crossing
    {
      const { f, c } = at(this.sCheck, 0, 0, 0);
      const grp = new THREE.Group(); grp.position.copy(f.p); grp.lookAt(f.p.clone().add(f.t)); scene.add(grp); this.gate = grp;
      for (const x of [-8, 8]) grp.add(boxMesh([3.2, 16, 5], V(x, 4.5, 0), dark));
      grp.add(boxMesh([20, 3.5, 5], V(0, 13.5, 0), dark));
      const stripe = signPlane(19, 3, (g2, Wd, Hd) => { g2.fillStyle = this.pal.hazard; g2.fillRect(0, 0, Wd, Hd); g2.fillStyle = this.pal.ink; for (let x = -Hd; x < Wd + Hd; x += Hd * 0.9) { g2.beginPath(); g2.moveTo(x, 0); g2.lineTo(x + Hd * 0.45, 0); g2.lineTo(x + Hd * 0.45 - Hd, Hd); g2.lineTo(x - Hd, Hd); g2.fill(); } }, { emissive: false, res: 512 });
      stripe.position.set(0, 13.5, -2.55); stripe.rotation.y = Math.PI; grp.add(stripe);
      this.scan = boxMesh([15, 0.3, 0.35], V(0, 6, -2.6), inkMaterial({ base: g.scan, emissive: true })); grp.add(this.scan);
      for (const x of [-6.4, 6.4]) { const l = boxMesh([0.6, 12, 0.6], V(x, 4.6, -2.7), inkMaterial({ base: g.scan, emissive: true })); grp.add(l); }
      const b = board('検問', 'Checkpoint', 'Verify', 14, 5.5); b.position.set(0, 19, -2.6); b.rotation.y = Math.PI; grp.add(b);
      this.gateAnchor = grp.localToWorld(V(12, 22, -6));
    }
    // GALLERY: three billboards beside the right side, facing the track
    {
      this.exhibits = [];
      const shots = featured.map((p) => p.image);
      featured.forEach((p, i) => {
        const s = this.sGallery + (i - 1) * 0.058;
        const { f, c } = at(s, -1, -30, 10);
        const grp = new THREE.Group(); grp.position.copy(c); grp.lookAt(f.p.clone().setY(c.y)); scene.add(grp);
        grp.add(boxMesh([42, 26, 1.6], V(0, 0, -1), dark));
        grp.add(boxMesh([43, 0.8, 2.2], V(0, 13.4, -0.6), neonSolid), boxMesh([43, 0.8, 2.2], V(0, -13.4, -0.6), neonSolid));
        for (const x of [-14, 14]) grp.add(boxMesh([2, 120, 2], V(x, -73, -1.5), dark));
        const screen = signPlane(40, 24, (g2, Wd, Hd) => {
          g2.fillStyle = '#05060c'; g2.fillRect(0, 0, Wd, Hd);
          if (this.imgs?.[i]) { const im = this.imgs[i]; const sc = Math.max(Wd / im.width, (Hd * 0.78) / im.height); g2.drawImage(im, (Wd - im.width * sc) / 2, 0, im.width * sc, im.height * sc); }
          g2.fillStyle = 'rgba(0,0,0,0.78)'; g2.fillRect(0, Hd * 0.74, Wd, Hd * 0.26);
          g2.fillStyle = this.pal.neon; g2.fillRect(0, Hd * 0.74, Wd, Hd * 0.012);
          g2.fillStyle = '#ffffff'; g2.font = `900 ${Math.round(Hd * 0.17)}px ${signFont}`; g2.fillText(p.name.toUpperCase(), Wd * 0.04, Hd * 0.93);
          g2.fillStyle = this.pal.neon; g2.font = `600 ${Math.round(Hd * 0.045)}px ${monoFont}`; g2.fillText(p.kicker.toUpperCase() + '  ·  ' + p.tags.slice(0, 3).join(' · ').toUpperCase(), Wd * 0.045, Hd * 0.8);
          // scanlines
          g2.fillStyle = 'rgba(0,0,0,0.18)'; for (let y = 0; y < Hd; y += 4) g2.fillRect(0, y, Wd, 1.5);
        }, { res: 1024 });
        screen.position.z = 0.05; grp.add(screen); screen.userData.exhibit = i; this.boards.push(screen);
        this.exhibits.push({ grp, screen, s, f, c });
      });
      this.imgs = [];
      shots.forEach((src, i) => { const im = new Image(); im.onload = () => { this.imgs[i] = im; this.exhibits[i].screen.userData.redraw(); }; im.src = src; });
      const b = board('展示', 'Gallery', 'Work', 22, 8.5); const e0 = this.exhibits[0];
      b.position.copy(e0.grp.localToWorld(V(-30, 6, 0))); b.lookAt(stat(this.sGallery - 0.05).p.clone().setY(b.position.y)); scene.add(b);
    }
    // TERMINAL: a station on a tower roof with the mark in neon
    {
      const base = V(termBase.x, 131, termBase.z);
      scene.add(boxMesh([44, 14, 30], V(base.x, base.y + 7, base.z), dark));
      scene.add(boxMesh([40, 6, 0.6], V(base.x, base.y + 6, base.z + 15.2), lamp));
      // the mark, extruded from the logo paths and lit
      const shapes = [FOLD_FRONT, FOLD_BACK].map((d) => pathShapes(d));
      const markGrp = new THREE.Group();
      shapes.forEach((list, k) => list.forEach((sh) => {
        const geo = new THREE.ExtrudeGeometry(sh, { depth: 3, bevelEnabled: false });
        markGrp.add(new THREE.Mesh(geo, k === 0 ? neonSolid : inkMaterial({ base: g.markBack, emissive: true })));
      }));
      markGrp.scale.set(0.42, -0.42, 0.42); markGrp.position.set(base.x - 25, base.y + 66, base.z - 4);
      const holder = new THREE.Group(); holder.add(markGrp); scene.add(holder);
      holder.position.set(0, 0, 0);
      markGrp.lookAt(markGrp.position.clone().add(V(-0.75, 0, 0.66)));
      this.markSign = markGrp;
      for (const x of [-12, 12]) scene.add(boxMesh([1.2, 26, 1.2], V(base.x + x, base.y + 27, base.z - 2), steel));
      const b = board('終点', 'Terminal', 'Contact', 24, 9); b.position.set(base.x - 4, base.y + 19, base.z + 16); b.lookAt(b.position.clone().add(V(-0.6, 0, 0.8))); scene.add(b);
      this.termAnchor = V(base.x - 70, base.y + 70, base.z + 60);
    }
    // the pod
    this.pod = podMesh(g); scene.add(this.pod);
    this.placePod(0.02);
    // ---- the route
    const ride = (s0, s1, n, lift = 7, ahead = 0.03, sideOff = 0) => {
      const out = [];
      for (let k = 1; k <= n; k++) {
        const s = s0 + ((s1 - s0) * k) / (n + 1);
        const f = stat(s), fa = stat(s + ahead);
        out.push({ p: f.p.clone().addScaledVector(f.up, lift).addScaledVector(f.side, sideOff), t: fa.p.clone().addScaledVector(fa.up, lift * 0.55), fov: 62, roll: 0 });
      }
      return out;
    };
    const yard = stat(this.sYard), sig2 = stat(this.sSignal), chk = stat(this.sCheck), gal = stat(this.sGallery), trm = stat(this.sTerm);
    // cards hang in the air beside each subject: offset left or right of the view, a little up
    const side = (pose, k = -1, dist = 60, lat = 30, up = 4) => {
      const P = V(...[].concat(pose.p.toArray ? pose.p.toArray() : pose.p)), Tt = V(...[].concat(pose.t.toArray ? pose.t.toArray() : pose.t));
      const fwd = Tt.clone().sub(P).normalize(), right = new THREE.Vector3().crossVectors(fwd, V(0, 1, 0)).normalize(), upv = new THREE.Vector3().crossVectors(right, fwd);
      return P.clone().addScaledVector(fwd, dist).addScaledVector(right, k * lat).addScaledVector(upv, up).toArray();
    };
    const stops = [
      { id: 'top', p: V(60, 470, 300), t: V(-80, 105, -30), fov: 44 },
      { id: 'systems', p: V(-30, 160, 40), t: V(-125, 165, -10), fov: 56 },
      { id: 'ai', p: V(-70, 150, -40), t: V(-131, 230, -131), fov: 64, roll: 0.05 },
      { id: 'security', p: stat(this.sCheck - 0.032).p.clone().add(V(0, 7, 0)), t: chk.p.clone().add(V(0, 9, 0)), fov: 60 },
      { id: 'work', ...this.exhibitPose(1) },
      { id: 'contact', p: V(20, 178, -10), t: V(112, 182, -132), fov: 52 },
    ];
    const cardSide = [-1, -1, 1, -1, -1, -1];
    stops.forEach((st, i) => { st.anchor = side(st, cardSide[i], 60, i === 0 ? 34 : 30, i === 0 ? 0 : 3); });
    this.stops = stops;
    const legs = [
      [{ p: V(-120, 260, 300), t: V(-60, 140, 40), fov: 50 }, { p: stat(0.01).p.clone().add(V(0, 9, 0)), t: stat(0.04).p.clone().add(V(0, 5, 0)), fov: 60 }],
      ride(this.sYard + 0.012, this.sSignal - 0.01, 3),
      ride(this.sSignal + 0.01, this.sCheck - 0.04, 4),
      ride(this.sCheck + 0.01, this.sGallery - 0.05, 4),
      ride(this.sGallery + 0.05, this.sTerm - 0.012, 2),
      [...ride(this.sTerm + 0.012, 0.995, 6, 9, 0.03), { p: V(-140, 230, 300), t: V(0, 120, -20), fov: 48 }],
    ];
    return { stops, legs, closed: true, speed: 95, minT: 1.8, maxT: 3.6, speedRef: 70, arriveImpact: 'hit' };
  }
  exhibitPose(i) {
    const e = this.exhibits[i];
    const front = e.grp.localToWorld(V(-6, 0, 74)), look = e.grp.localToWorld(V(-4, -1, 0));
    return { p: front.add(V(0, 20, 0)), t: look, fov: 44, roll: 0 };
  }
  placePod(s) {
    this.podS = s;
    const f = this.track.frameAt(s);
    this.pod.position.copy(f.p).addScaledVector(f.up, 2.7);
    const m = new THREE.Matrix4().makeBasis(f.side.clone().negate(), f.up, f.t);
    this.pod.quaternion.setFromRotationMatrix(m);
  }
  stopS(i) { return [0.02, this.sYard, this.sSignal, this.sCheck, this.sGallery, this.sTerm][i]; }
  depart(from, to, world) {
    let a = this.stopS(from), b = this.stopS(to);
    if (b <= a) b += 1; // the loop only runs forward
    this.podRun = { a, b };
    if (to === 4) world.ui.setProject(1, 1);
  }
  arrive(i, world) {
    if (i === 4) this.focusExhibit(world.ui.project, true);
  }
  project(i, d, world) { this.focusExhibit(i); world.impact.hit({ seq: 'soft', center: [0.5, 0.5], shake: 0.3 }); }
  focusExhibit(i) {
    const base = this.stops[4];
    const pose = this.exhibitPose(i);
    this.world.rig.nudge(pose.p.clone().sub(base.p), pose.t.clone().sub(base.t));
  }
  impactCenter(i, world) {
    const a = world.route.stops[i].t; const s = world.toScreen(new THREE.Vector3(...[].concat(a.toArray ? a.toArray() : a)));
    return [s.x / world.view.w, 1 - s.y / world.view.h];
  }
  ready(world) {
    // entrance: the mark draws itself in neon around the loop, then the camera settles
    const html = document.documentElement;
    html.classList.add('ready');
    if (reduced || q.has('skipintro')) { this.neon.uniforms.uLit.value = 1; return; }
    this.intro = { t: 0 };
    this.neon.uniforms.uLit.value = 0;
    world.nav.lockUntil = performance.now() + 2600;
    document.querySelector('.stop--top').classList.remove('is-current');
    const r = world.rig;
    r.pose.p.set(0, 980, 700); r.pose.t.set(0, 80, -60); r.pose.fov = 34;
  }
  update(dt, t, world) {
    // entrance
    if (this.intro) {
      const I = this.intro; I.t += dt;
      const u = Math.min(1, I.t / 2.2);
      this.neon.uniforms.uLit.value = ease(Math.min(1, I.t / 1.7));
      const r = world.rig, s0 = this.stops[0];
      r.pose.p.lerpVectors(V(0, 980, 700), s0.p, ease(u)); r.pose.t.lerpVectors(V(0, 80, -60), s0.t, ease(u)); r.pose.fov = lerp(34, s0.fov, ease(u));
      if (I.t > 1.75 && !I.hit) { I.hit = true; world.impact.hit({ seq: 'big', center: [0.5, 0.45], shake: 1 }); world.api().sfx.play('slam'); }
      if (I.t > 1.85 && !I.card) { I.card = true; world.setCard(0, true); }
      if (I.t >= 2.2) this.intro = null;
    }
    // the pod rides with the camera
    if (this.podRun && world.rig.flying) {
      const u = ease(world.rig.progress);
      this.placePod(lerp(this.podRun.a, this.podRun.b, u) % 1);
    } else if (this.podRun && !world.rig.flying) { this.placePod(this.podRun.b % 1); this.podRun = null; }
    this.neon.uniforms.uBoost.value = world.rig.flying ? 1 : 0;
    // key light: the moon (world space → view space each frame); uplight from the city below
    const cam = world.camera;
    shared.uKeyDir.value.copy(V(-0.45, 0.62, -0.35).normalize().transformDirection(cam.matrixWorldInverse));
    shared.uFillDir.value.copy(V(0.1, -1, 0.15).normalize().transformDirection(cam.matrixWorldInverse));
    this.sky.position.copy(cam.position);
    this.traffic.forEach((tr) => tr.update(Math.floor(t * 12) / 12));
    // signal rings rise and fade on twos
    const step = Math.floor(t * 12) / 12;
    this.rings.forEach((r) => { const k = ((step * 0.45 + r.userData.k / 3) % 1); r.scale.setScalar(1 + k * 3.5); r.position.y = this.sigTop.y + k * 40; r.visible = k < 0.92; });
    this.beacon.visible = Math.floor(t * 1.5) % 2 === 0;
    // checkpoint laser sweeps
    this.scan.position.y = 1 + (Math.sin(step * 2.4) * 0.5 + 0.5) * 10;
    // the terminal mark breathes
    this.markSign.rotation.z = Math.sin(t * 0.4) * 0.02;
  }
  click(e, ray, world) {
    const hits = ray.intersectObjects(this.exhibits.map((x) => x.screen), false);
    if (hits.length) {
      const i = hits[0].object.userData.exhibit;
      if (world.rig.index !== 4) { world.nav.go(4, 'click', true); world.ui.setProject(i, 1); return; }
      if (i !== world.ui.project) world.ui.setProject(i, i > world.ui.project ? 1 : -1);
      else openLink(featured[i].url);
      return;
    }
    world.impact.hit({ seq: 'soft', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.25 });
    world.api().sfx.play('snap', { gain: 0.6 });
  }
}

// SVG path (M/L/Z polygons) → THREE.Shapes
function pathShapes(d) {
  const shapes = [];
  for (const sub of d.split('M').filter((x) => x.trim())) {
    const pts = sub.replace(/Z/g, '').trim().split(/L|\s+L|\s+/).map((p) => p.split(',').map(Number)).filter((p) => p.length === 2 && !isNaN(p[0]));
    if (pts.length < 3) continue;
    shapes.push(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x - 60, y - 60))));
  }
  return shapes;
}

const director = new LoopDirector();
const world = new World({
  canvas: document.querySelector('canvas.gl'), director, places: PLACES,
  palettes: PALETTES, palette: q.get('palette') || 'signal',
  pipeline: { bloom: true },
});
post.uFogAmt.value = 1; post.uFogNear.value = 160; post.uFogFar.value = 1900; post.uFogLine.value = 0.9;
post.uBloomAmt.value = 0.6; post.uBloomDots.value = 0.6;
post.uMisregPx.value = 1.1; post.uGrain.value = 0.035; post.uVignette.value = 0.35; post.uGradeAmt.value = 0.16;
post.uDepthK.value = 0.04; post.uNormalK.value = 0.35;
await world.start();
window.__xini.ready = true;
