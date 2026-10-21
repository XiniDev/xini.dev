import * as THREE from 'three';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/chakra-petch/600.css';
import '@fontsource/chakra-petch/700.css';
import '../../shared/fonts/zen-kaku-700.css';
import './machine.css';
import { World, reduced, q, openLink } from '../../shared/world/world.js';
import { renderWorld } from '../../shared/world/ui.js';
import { shared } from '../../shared/gfx/ink-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { makeSky, skyU } from '../../shared/gfx/sky.js';
import { foldMarkSVG } from '../../shared/ui/marks.js';
import { featured } from '../../shared/data/content.js';
import { V, Silk, boardSurface, boardU, Traces, traceU, Parts, reseed, routeChain } from './board.js';
import { buildTower, TOWER } from './tower.js';
import { buildVRM, buildMemory, buildNeural, buildEnclave, buildIO, buildRest, buildBuses, buildDust, SITES, SCREEN_Z } from './districts.js';
import { PALETTES } from './palettes.js';
import { Mirror } from '../../shared/world/mirror.js';

const PLACES = ['Power on', 'The core', 'Neural core', 'Enclave', 'Memory', 'I/O'];
const REFS = ['PWR', 'U1', 'U7', 'U9', 'J4', 'J1'];
const lerp = THREE.MathUtils.lerp, clamp = THREE.MathUtils.clamp;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const phone = Math.min(innerWidth, innerHeight) < 600;

// the route map is a trace across a tiny board
const MS = 0.09;
const nodesW = [[TOWER.cx, TOWER.cz], [TOWER.cx, 170], [SITES.npu.x, SITES.npu.z], [SITES.enclave.x, SITES.enclave.z], [250, -110], [-940, -440]];
const nodes = nodesW.map(([x, z]) => [x * MS, z * MS]);
const chain = routeChain([...nodes, nodes[0]]);
const routePath = 'M' + chain.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');

document.getElementById('app').innerHTML = renderWorld({
  places: PLACES,
  mark: foldMarkSVG('logo', 'var(--text)', 'var(--neon)'),
  route: { viewBox: '-96 -72 192 144', path: routePath, nodes },
  deco: Object.fromEntries(['top', 'systems', 'ai', 'security', 'work', 'contact'].map((id, i) => [id, `<span class="card__ref" aria-hidden="true">${REFS[i]}</span>`])),
});
// draw the board under the route
{
  const svg = document.querySelector('.route__map'), ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'route__board');
  const r = (x, z, w, d) => { const e = document.createElementNS(ns, 'rect'); e.setAttribute('x', (x - w / 2) * MS); e.setAttribute('y', (z - d / 2) * MS); e.setAttribute('width', w * MS); e.setAttribute('height', d * MS); g.appendChild(e); };
  r(0, 0, 2000, 1500); r(TOWER.cx, TOWER.cz, 150, 432); r(-470, 330, 200, 200); r(120, 430, 260, 220); r(-436, 560, 572, 20); r(-436, 680, 572, 18); r(-942, -435, 110, 570);
  for (let k = 0; k < 4; k++) r(250 + k * 56, -108, 10, 744);
  svg.insertBefore(g, svg.firstChild);
}


class MachineDirector {
  constructor() { this.parallax = 5; this.imgs = []; this.flash = 0; this.spin = 0; this.pingN = 0; }
  palette(p, name) {
    if (this.built) { const u = new URL(location.href); u.searchParams.set('palette', name); location.replace(u); return; }
    const g = (this.pal = p.gl);
    skyU.uZenith.value.set(g.zenith); skyU.uHorizon.value.set(g.skyHorizon); skyU.uGlow.value.set(g.skyGlow); skyU.uStreak.value.set(g.skyStreak);
    skyU.uMoon.value.set(g.skyHorizon); skyU.uMoonSize.value = 0.0001; skyU.uStars.value = 0; skyU.uDot.value.set(g.ink); skyU.uBand.value = 0.12;
    shared.uShadeTint.value.set(g.shade); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set(g.glint);
    shared.uFillCol.value.set(g.uplight); shared.uFillAmt.value = 0.2;
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paperFlash); post.uImpAccent.value.set(g.signal);
    post.uFogCol.value.set(g.fog); post.uSpeedCol.value.set(g.streak);
    boardU.uMask.value.set(g.mask); boardU.uMask2.value.set(g.mask2); boardU.uSilk.value.set(g.silk); boardU.uPad.value.set(g.pad);
    boardU.uSheen.value.set(g.sheen); boardU.uSignal.value.set(g.signal); boardU.uHot.value.set(g.hot);
  }
  async build(world) {
    this.world = world;
    const { scene, camera } = world;
    camera.near = 1; camera.far = 7000;
    await document.fonts.ready;
    await Promise.all(['700 40px "Chakra Petch"', '600 40px "Chakra Petch"', '700 40px "Zen Kaku Gothic New"', '600 20px "JetBrains Mono Variable"', '700 20px "JetBrains Mono Variable"']
      .map((f) => document.fonts.load(f, '演算神経認証記憶接続電源制御注意高温 AZ09').catch(() => {})));
    const pal = this.pal;
    const T0 = performance.now(), mark = (n) => { if (q.has('debug')) console.warn(n, Math.round(performance.now() - T0)); };
    reseed(7);
    const silk = (this.silk = new Silk(phone ? 2048 : 4096));
    const parts = new Parts(pal, silk);
    boardU.uSilkTex.value = silk.tex;
    boardU.uLitC.value.set(TOWER.cx, TOWER.cz);
    this.board = boardSurface(); scene.add(this.board);
    this.tower = buildTower(pal, silk); scene.add(this.tower.group); mark('tower');
    scene.add(buildVRM(pal, parts, silk));
    this.mem = buildMemory(pal, parts, silk, featured, this); scene.add(this.mem.group);
    this.npu = buildNeural(pal, parts, silk); scene.add(this.npu.group);
    this.enc = buildEnclave(pal, parts, silk); scene.add(this.enc.group);
    this.io = buildIO(pal, parts, silk); scene.add(this.io.group);
    this.rest = buildRest(pal, parts, silk); scene.add(this.rest.group); mark('districts');
    const tr = new Traces(); buildBuses(tr); this.traces = tr.mesh(pal); scene.add(this.traces);
    scene.add(parts.build()); mark('parts');
    silk.finish(); mark('silk');
    world.backdrop.visible = false;
    this.sky = makeSky({ radius: 5200, px: shared.uPx }); scene.add(this.sky);
    this.dust = buildDust(pal, phone ? 900 : 1600); scene.add(this.dust);
    this.mirror = new Mirror(phone ? 0.35 : 0.5);
    boardU.uRefl.value = this.mirror.rt.texture; boardU.uReflAmt.value = q.has('norefl') ? 0 : q.has('refl') ? +q.get('refl') : 0.75; boardU.uReflDebug.value = q.has('refldebug') ? +(q.get('refldebug') || 1) : 0;
    this.mirrorHide = [this.board, this.sky, this.dust, this.traces, this.io.shafts].filter(Boolean);
    this.fogCol = new THREE.Color(this.pal.fog);
    // project screenshots arrive late; screens redraw when they do
    featured.forEach((p, i) => { const im = new Image(); im.onload = () => { this.imgs[i] = im; this.mem.screens[i].userData.redraw(); }; im.src = p.image; });
    this.built = true; mark('built');

    // ---- the route
    const { cx, cz } = TOWER;
    const side = (pose, k = -1, dist = 60, lat = 30, up = 4) => {
      const fwd = pose.t.clone().sub(pose.p).normalize(), right = new THREE.Vector3().crossVectors(fwd, V(0, 1, 0)).normalize(), upv = new THREE.Vector3().crossVectors(right, fwd);
      return pose.p.clone().addScaledVector(fwd, dist).addScaledVector(right, k * lat).addScaledVector(upv, up).toArray();
    };
    // a card can sit at a screen position (ndc x, y at a depth) and stay attached to the world from there
    const at = (pose, nx, ny, depth = 220) => {
      const c = new THREE.PerspectiveCamera(pose.fov, 1.6, 1, 10); c.position.copy(pose.p); c.lookAt(pose.t); c.updateMatrixWorld();
      return new THREE.Vector3(nx, ny, 0.5).unproject(c).sub(pose.p).normalize().multiplyScalar(depth).add(pose.p).toArray();
    };
    const stops = [
      { id: 'top', p: V(-230, 132, 1080), t: V(-80, 356, -120), fov: 48 },
      { id: 'systems', p: V(120, 40, 140), t: V(-80, 140, -120), fov: 60 },
      { id: 'ai', p: V(-470, 70, 620), t: V(-470, 170, 330), fov: 50 },
      { id: 'security', p: V(-80, 58, 660), t: V(120, 22, 430), fov: 54 },
      { id: 'work', ...this.exhibitPose(1) },
      { id: 'contact', p: V(-610, 118, -282), t: V(-990, 176, -446), fov: 54 },
    ];
    const cardAt = [[-0.58, 0.36], [0.5, 0.02], [-0.56, 0.3], [-0.52, 0.06], [-0.55, 0.04], [0.5, 0.06]];
    stops.forEach((st, i) => { st.anchor = at(st, ...cardAt[i]); });
    this.stops = stops;
    const P = (x, y, z) => V(x, y, z);
    const legs = [
      [{ p: P(-90, 100, 620), t: P(-80, 260, -120), fov: 54 }, { p: P(70, 56, 330), t: P(-80, 160, -120), fov: 58 }],
      [{ p: P(-150, 40, 320), t: P(-520, 46, 480), fov: 60 }, { p: P(-420, 56, 660), t: P(-470, 160, 330), fov: 54 }],
      [{ p: P(-400, 44, 640), t: P(-100, 34, 610), fov: 60 }, { p: P(-240, 40, 640), t: P(60, 30, 520), fov: 60 }],
      [{ p: P(30, 66, 470), t: P(140, 96, 100), fov: 56 }, { p: P(78, 100, 270), t: P(220, 110, -40), fov: 50 }],
      [{ p: P(120, 168, -380), t: P(-200, 140, -480), fov: 56 }, { p: P(-300, 150, -476), t: P(-700, 120, -420), fov: 58 }, { p: P(-540, 132, -380), t: P(-920, 160, -430), fov: 56 }],
      [{ p: P(-460, 380, 160), t: P(-80, 260, -100), fov: 50 }, { p: P(-260, 220, 820), t: P(-80, 360, -120), fov: 48 }],
    ];
    return { stops, legs, closed: true, speed: 420, minT: 1.9, maxT: 3.4, speedRef: 320, arriveImpact: 'hit', phonePull: 0.32, phoneFov: 12, phoneLift: 0.14 };
  }
  exhibitPose(i) {
    const z = SCREEN_Z[i];
    return { p: V(30, 122, z + 196), t: V(246, 100, z - 34), fov: 48, roll: 0 };
  }
  depart(from, to, world) { if (to === 4) world.ui.setProject(1, 1); }
  arrive(i, world) { if (i === 4) this.focusExhibit(world.ui.project); }
  project(i, d, world) { this.focusExhibit(i); world.impact.hit({ seq: 'soft', center: [0.62, 0.5], shake: 0.3 }); }
  focusExhibit(i) {
    const base = this.stops[4], pose = this.exhibitPose(i);
    this.world.rig.nudge(pose.p.clone().sub(base.p), pose.t.clone().sub(base.t));
  }
  impactCenter(i, world) {
    const a = world.route.stops[i].t, s = world.toScreen(a.clone ? a.clone() : V(...a));
    return [s.x / world.view.w, 1 - s.y / world.view.h];
  }
  ready(world) {
    document.documentElement.classList.add('ready');
    if (reduced || q.has('skipintro')) { boardU.uLitR.value = 1e5; this.setOn(1e5); this.crown(1); return; }
    // power on: the camera starts at the socket as the wave leaves it, then pulls back to reveal the tower
    const s0 = this.stops[0];
    this.intro = {
      t: 0,
      pc: new THREE.CatmullRomCurve3([V(70, 46, 240), V(40, 130, 520), V(-150, 140, 860), s0.p.clone()], false, 'centripetal'),
      tc: new THREE.CatmullRomCurve3([V(-80, 64, -80), V(-80, 200, -100), V(-80, 330, -120), s0.t.clone()], false, 'centripetal'),
    };
    boardU.uLitR.value = 0; this.setOn(0); this.tower.floorMat.uniforms.uLitY.value = 0; this.crown(0);
    world.nav.lockUntil = performance.now() + 2800;
    document.querySelector('.stop--top').classList.remove('is-current');
    const r = world.rig; r.pose.p.copy(this.intro.pc.getPoint(0)); r.pose.t.copy(this.intro.tc.getPoint(0)); r.pose.fov = 62;
  }
  crown(k) {
    const g = this.pal;
    this.tower.front.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.05, 1, k));
    this.tower.back.uniforms.uBase.value.set(g.markBack).multiplyScalar(lerp(0.05, 1, k));
  }
  /** parts switch on as the power-on wave reaches them */
  setOn(R) {
    const on = (d) => clamp((R - d) / 90, 0, 1);
    const g = this.pal;
    this.tower.ringMat.uniforms.uOn.value = on(120);
    this.tower.heatMat.uniforms.uOn.value = on(30);
    this.tower.lineMat.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.06, 1, on(240)));
    this.mem.bars.forEach((b, k) => { b.material.uniforms.uOn.value = on(330 + k * 56); });
    this.npu.edgeMat.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.04, 1, on(560)));
    this.npu.nodeMat.uniforms.uBase.value.set(g.hot).multiplyScalar(lerp(0.04, 1, on(560)));
    this.npu.beam.material.uniforms.uAmt.value = on(560);
    this.npu.lattice.visible = on(520) > 0;
    this.enc.laserMat.uniforms.uBase.value.set(g.laser).multiplyScalar(lerp(0.05, 1, on(600)));
  }
  update(dt, t, world) {
    const cam = world.camera;
    if (this.intro) {
      const I = this.intro; I.t += dt;
      const R = ease(clamp((I.t - 0.1) / 1.4, 0, 1)) * 1600;
      boardU.uLitR.value = R; this.setOn(R);
      this.tower.floorMat.uniforms.uLitY.value = lerp(150, 800, ease(clamp((I.t - 0.6) / 1.0, 0, 1)));
      this.crown(I.t > 1.62 ? 1 : 0);
      const u = ease(clamp((I.t - 0.25) / 1.95, 0, 1)), r = world.rig;
      r.pose.p.copy(I.pc.getPoint(u)); r.pose.t.copy(I.tc.getPoint(u)); r.pose.fov = lerp(62, this.stops[0].fov, u);
      if (I.t > 1.66 && !I.hit) {
        I.hit = true;
        const s = world.toScreen(this.tower.crownPos.clone());
        world.impact.hit({ seq: 'big', center: [s.x / world.view.w, 1 - s.y / world.view.h], shake: 1 }); world.api().sfx.play('slam');
      }
      if (I.t > 1.8 && !I.card) { I.card = true; world.setCard(0, true); }
      if (I.t >= 2.3) { this.intro = null; boardU.uLitR.value = 1e5; this.setOn(1e5); this.tower.floorMat.uniforms.uLitY.value = 1e5; this.crown(1); }
    }
    // case light from the south-west, a green uplight from the traces
    shared.uKeyDir.value.copy(V(-0.5, 0.78, 0.42).normalize().transformDirection(cam.matrixWorldInverse));
    shared.uFillDir.value.copy(V(0.55, -0.6, -0.35).normalize().transformDirection(cam.matrixWorldInverse));
    this.sky.position.copy(cam.position);
    this.dust.material.uniforms.uCam.value.copy(cam.position);
    const fly = world.rig.flying ? 1 : 0;
    traceU.uBoost.value += (fly + this.flash - traceU.uBoost.value) * (1 - Math.exp(-dt * 4));
    this.mem.bars.forEach((b) => { b.material.uniforms.uBoost.value = traceU.uBoost.value; });
    this.flash = Math.max(0, this.flash - dt * 0.8);
    this.spin = Math.max(0, this.spin - dt * 0.6);
    this.tower.update(t + this.spinAcc(dt));
    this.npu.update(t, this.flash);
    this.enc.update(t);
    this.rest.leds[3].uniforms.uBase.value.set(Math.floor(t * 2) % 2 ? this.pal.signal : this.pal.ledOff);
    this.rest.updateLeds(t);
  }
  layout(view) { this.mirror?.setSize(view.w * view.dpr, view.h * view.dpr); boardU.uScreen.value.set(view.w * view.dpr, view.h * view.dpr); }
  preRender(world) {
    if (!this.mirror || boardU.uReflAmt.value <= 0) return;
    world.camera.updateMatrixWorld();
    if (this.mirror.render(world.renderer, world.scene, world.camera, this.mirrorHide, this.fogCol)) boardU.uReflMat.value.copy(this.mirror.texMat);
  }
  spinAcc(dt) { this._spin = (this._spin || 0) + this.spin * dt * 3; return this._spin; }
  click(e, ray, world) {
    const scr = ray.intersectObjects(this.mem.screens, false);
    if (scr.length) {
      const i = scr[0].object.userData.exhibit;
      if (world.rig.index !== 4) { world.nav.go(4, 'click', true); world.ui.setProject(i, 1); return; }
      if (i !== world.ui.project) world.ui.setProject(i, i > world.ui.project ? 1 : -1);
      else openLink(featured[i].url);
      return;
    }
    const sfx = world.api().sfx;
    const C = this.npu.center;
    if (ray.ray.distanceToPoint(C) < 95) { this.flash = 1.2; world.impact.hit({ seq: 'accent', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.35 }); sfx.play('snap'); return; }
    const fanC = V(TOWER.cx + TOWER.depth / 2 + 14, (TOWER.finY0 + TOWER.finY1) / 2, TOWER.cz);
    if (ray.ray.distanceToPoint(fanC) < TOWER.fanR) { this.spin = 1.5; world.impact.hit({ seq: 'soft', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.3 }); sfx.play('whoosh', { gain: 0.6 }); return; }
    const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(new THREE.Plane(V(0, 1, 0), 0), hit)) {
      const P = boardU.uPing.value[this.pingN++ % 4];
      P.set(hit.x, hit.z, shared.uStep.value, 1);
    }
    world.impact.hit({ seq: 'soft', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.25 });
    sfx.play('snap', { gain: 0.6 });
  }
}

const director = new MachineDirector();
const world = new World({
  canvas: document.querySelector('canvas.gl'), director, places: PLACES,
  palettes: PALETTES, palette: q.get('palette') || 'signal',
  pipeline: { bloom: true },
});
post.uFogAmt.value = 1; post.uFogNear.value = 140; post.uFogFar.value = 2100; post.uFogLine.value = 0.85;
post.uBloomAmt.value = 0.55; post.uBloomDots.value = 0.6;
post.uMisregPx.value = 1.0; post.uGrain.value = 0.035; post.uVignette.value = 0.4; post.uGradeAmt.value = 0.18;
post.uDepthK.value = 0.045; post.uNormalK.value = 0.35;
await world.start();
window.__xini.ready = true;
