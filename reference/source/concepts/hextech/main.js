import * as THREE from 'three';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/gloock';
import './hextech.css';
import { World, reduced, q, openLink } from '../../shared/world/world.js';
import { renderWorld } from '../../shared/world/ui.js';
import { Mirror } from '../../shared/world/mirror.js';
import { shared, inkMaterial } from '../../shared/gfx/ink-material.js';
import { paintShared } from '../../shared/gfx/paint-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { NOISE, COLOR } from '../../shared/gfx/glsl.js';
import { makeSky, skyU, makeTraffic } from '../../shared/gfx/sky.js';
import { scatterTowers, facadeU } from '../../shared/gfx/facade.js';
import { finialGeometry } from '../core/parts.js';
import { foldMarkSVG } from '../../shared/ui/marks.js';
import { featured } from '../../shared/data/content.js';
import { V, C, buildArmillary, buildGears, GEARS, buildSeal, SEAL, buildOrrery, ORRERY_R, buildGate, GATE } from './armillary.js';
import { PALETTES } from './palettes.js';

const PLACES = ['Dusk', 'The works', 'The core', 'The seal', 'The orrery', 'The gate'];
const lerp = THREE.MathUtils.lerp, clamp = THREE.MathUtils.clamp;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const phone = Math.min(innerWidth, innerHeight) < 600;

const nodes = [[48, -46], [0, 50], [0, 0], [-38, -30], [28, 16], [-52, 40]];
const routePath = 'M48,-46 Q34,36 0,50 Q-26,26 0,0 Q-30,-8 -38,-30 Q4,-34 28,16 Q-6,52 -52,40 Q-34,-74 48,-46';
document.getElementById('app').innerHTML = renderWorld({
  places: PLACES,
  mark: foldMarkSVG('logo', 'var(--text)', 'var(--neon)'),
  route: { viewBox: '-60 -60 120 120', path: routePath, nodes },
});
{
  const svg = document.querySelector('.route__map'), ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'route__board');
  for (const [r, rx] of [[44, 44], [44, 14], [44, 30]]) { const e = document.createElementNS(ns, 'ellipse'); e.setAttribute('cx', 0); e.setAttribute('cy', 0); e.setAttribute('rx', rx); e.setAttribute('ry', r); g.appendChild(e); }
  const e = document.createElementNS(ns, 'ellipse'); e.setAttribute('cx', 0); e.setAttribute('cy', 0); e.setAttribute('rx', 44); e.setAttribute('ry', 12); g.appendChild(e);
  svg.insertBefore(g, svg.firstChild);
}

/** the bay: water at dusk that mirrors the sky, the city and the armillary */
const waterU = { uRefl: { value: null }, uReflMat: { value: new THREE.Matrix4() }, uReflAmt: { value: 0.9 } };
function buildWater(pal) {
  const geo = new THREE.PlaneGeometry(9000, 9000, 1, 1); geo.rotateX(-Math.PI / 2);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat; out vec3 vW; out vec3 vV; out vec3 vN; out vec4 vR;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vR = uReflMat * w; vec4 mv = viewMatrix * w; vV = mv.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uDeep, uShallow, uGlint; uniform sampler2D uRefl; uniform float uReflAmt, uPx, uStep;
      in vec3 vW; in vec3 vV; in vec3 vN; in vec4 vR;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN), Vv = normalize(-vV);
        float sw = fbm2(vW.xz * 0.006 + vec2(uStep * 0.02, 0.0));
        vec3 c = mix(uDeep, uShallow, sw * 0.6);
        // painted ripples: horizontal dashes that shift on twos
        vec2 q = vec2(vW.x * 0.02, vW.z * 0.09 + floor(uStep * 6.0) * 0.37);
        float dash = step(0.72, vnoise2(q * vec2(1.0, 3.0)));
        vec2 ruv = vR.xy / vR.w + vec2((vnoise2(q * 2.0) - 0.5) * 0.012, (vnoise2(q * 2.0 + 5.0) - 0.5) * 0.004);
        vec3 rc = texture(uRefl, ruv).rgb;
        float fres = mix(0.3, 0.95, pow(1.0 - max(dot(N, Vv), 0.0), 2.0));
        c = mix(c, rc, fres * uReflAmt * (0.75 + 0.25 * dash));
        c = mix(c, uGlint, dash * smoothstep(0.55, 0.85, luma(rc)) * 0.35);
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, 196.0 / 255.0);
      }`,
    uniforms: { ...waterU, uDeep: { value: new THREE.Color(pal.waterDeep) }, uShallow: { value: new THREE.Color(pal.waterShallow) }, uGlint: { value: new THREE.Color(pal.hot) }, uPx: shared.uPx, uStep: shared.uStep },
  });
  const m = new THREE.Mesh(geo, mat); m.renderOrder = -10;
  return m;
}

class HextechDirector {
  constructor() { this.parallax = 6; this.imgs = []; this.charge = 1; this.flash = 0; }
  palette(p, name) {
    if (this.built) { const u = new URL(location.href); u.searchParams.set('palette', name); location.replace(u); return; }
    const g = (this.pal = p.gl);
    skyU.uZenith.value.set(g.zenith); skyU.uHorizon.value.set(g.skyHorizon); skyU.uGlow.value.set(g.skyGlow); skyU.uStreak.value.set(g.skyStreak);
    skyU.uMoon.value.set(g.sun); skyU.uMoonSize.value = 0.09; skyU.uStars.value = 0.25; skyU.uDot.value.set(g.ink); skyU.uBand.value = 0.22;
    skyU.uMoonDir.value.set(-0.72, 0.07, 0.69).normalize();
    paintShared.uKeyCol.value.set(g.key); paintShared.uCoolCol.value.set(g.cool); paintShared.uRimCol.value.set(g.rim); paintShared.uInk.value.set(g.ink);
    paintShared.uEnergyCol.value.set(g.energy); paintShared.uEnergyHot.value.set(g.hot);
    shared.uShadeTint.value.set(g.cool); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set('#fff6e6');
    shared.uFillCol.value.set(g.skyGlow); shared.uFillAmt.value = 0.25;
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paper); post.uImpAccent.value.set(g.energy);
    post.uFogCol.value.set(g.fog); post.uSpeedCol.value.set(g.hot);
    facadeU.uWinA.value.set(g.winA); facadeU.uWinB.value.set(g.winB); facadeU.uWinC.value.set(g.energy); facadeU.uRoof.value.set(g.roof); facadeU.uWallLit.value.set(g.wallLit);
    facadeU.uCell.value.set(5, 8); facadeU.uLit.value = 0.22;
  }
  async build(world) {
    this.world = world;
    const { scene, camera } = world;
    camera.near = 1; camera.far = 9000;
    await document.fonts.ready;
    await Promise.all(['400 40px "Gloock"', '600 20px "JetBrains Mono Variable"'].map((f) => document.fonts.load(f, 'AZaz09').catch(() => {})));
    const pal = this.pal;
    this.arm = buildArmillary(pal); scene.add(this.arm.group);
    this.gears = buildGears(pal); scene.add(this.gears.group);
    this.seal = buildSeal(pal); scene.add(this.seal.group);
    this.orrery = buildOrrery(pal, featured, this); scene.add(this.orrery.group);
    this.gate = buildGate(pal); scene.add(this.gate.group);
    // the city on the bay: Deco towers with brass crowns, a skyline to the sunset
    const walls = [pal.wallA, pal.wallB, pal.wallC];
    const avoid = [[0, 0, 470], [GATE.x, GATE.z, 160]];
    const near = scatterTowers({ count: 120, rMin: 420, rMax: 1300, hMin: 60, hMax: 330, wMin: 40, wMax: 90, y: 0, seed: 21, avoid, palette: walls });
    const far = scatterTowers({ count: 700, rMin: 1300, rMax: 4200, hMin: 80, hMax: 520, wMin: 50, wMax: 140, y: 0, seed: 9, palette: walls });
    scene.add(near, far);
    const crown = new THREE.InstancedMesh(finialGeometry(80), inkMaterial({ base: pal.brass, spec: 1, rim: 1, instanced: true, brushScale: 0.08 }), near.count);
    const M = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
    for (let i = 0; i < near.count; i++) { near.getMatrixAt(i, M); M.decompose(P, Q, S); M.compose(V(P.x, P.y + S.y, P.z), new THREE.Quaternion(), V(S.x / 70, S.x / 70, S.x / 70)); crown.setMatrixAt(i, M); }
    crown.frustumCulled = false; scene.add(crown);
    this.water = buildWater(pal); scene.add(this.water);
    world.backdrop.visible = false;
    this.sky = makeSky({ radius: 7000, px: shared.uPx }); scene.add(this.sky);
    // airships drift between the towers
    const lanes = [];
    for (let k = 0; k < 5; k++) { const r0 = 650 + k * 260, y0 = 260 + (k % 3) * 120, pts = []; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 + k; pts.push(V(Math.cos(a) * r0, y0 + Math.sin(a * 2) * 30, Math.sin(a) * r0)); } lanes.push(new THREE.CatmullRomCurve3(pts, true)); }
    this.traffic = [makeTraffic({ lanes, count: 120, mat: inkMaterial({ base: pal.winA, emissive: true, instanced: true }) })];
    this.traffic.forEach((t) => scene.add(t.mesh));
    this.mirror = new Mirror(phone ? 0.35 : 0.5, 0);
    waterU.uRefl.value = this.mirror.rt.texture; waterU.uReflAmt.value = q.has('norefl') ? 0 : 0.9;
    this.mirrorHide = [this.water, this.sky];
    this.fogCol = new THREE.Color(pal.fog);
    featured.forEach((p, i) => { const im = new Image(); im.onload = () => { this.imgs[i] = im; this.orrery.screens[i].userData.redraw(); }; im.src = p.image; });
    this.built = true;

    const at = (pose, nx, ny, depth = 80) => {
      const c = new THREE.PerspectiveCamera(pose.fov, 1.6, 1, 10); c.position.copy(pose.p); c.lookAt(pose.t); c.updateMatrixWorld();
      return new THREE.Vector3(nx, ny, 0.5).unproject(c).sub(pose.p).normalize().multiplyScalar(depth).add(pose.p).toArray();
    };
    const stops = [
      { id: 'top', p: V(760, 300, 900), t: V(-231, 500, 192), fov: 46 },
      { id: 'systems', p: V(40, 170, 300), t: V(10, 155, 0), fov: 54 },
      { id: 'ai', p: V(-60, 560, 250), t: V(0, 530, 0), fov: 56 },
      { id: 'security', p: V(60, 560, 640), t: V(0, 540, SEAL.z), fov: 52 },
      { id: 'work', ...this.exhibitPose() },
      { id: 'contact', p: V(-839, 390, 778), t: V(-380, 420, 360), fov: 50 },
    ];
    const cardAt = [[-0.56, 0.22], [0.54, 0.06], [0.52, 0.04], [-0.54, 0.06], [-0.55, 0.04], [0.52, 0.06]];
    const depth = [260, 80, 80, 80, 80, 80];
    stops.forEach((st, i) => { st.anchor = at(st, ...cardAt[i], depth[i]); });
    this.stops = stops;
    const P2 = (x, y, z) => V(x, y, z);
    const legs = [
      [{ p: P2(600, 260, 760), t: P2(0, 300, 0), fov: 50 }, { p: P2(160, 190, 420), t: P2(0, 160, 0), fov: 54 }],
      [{ p: P2(60, 260, 260), t: P2(0, 480, 0), fov: 60 }, { p: P2(40, 470, 230), t: P2(0, 540, 0), fov: 60 }],
      [{ p: P2(40, 600, 300), t: P2(0, 560, 500), fov: 56 }, { p: P2(80, 580, 520), t: P2(0, 545, SEAL.z), fov: 54 }],
      [{ p: P2(160, 600, 560), t: P2(0, 540, 200), fov: 56 }, { p: P2(120, 560, 400), t: P2(0, 540, 0), fov: 52 }],
      [{ p: P2(-200, 520, 440), t: P2(-560, 380, 520), fov: 56 }, { p: P2(-640, 410, 720), t: P2(-560, 330, 520), fov: 54 }],
      [{ p: P2(-600, 520, 1100), t: P2(-100, 520, 300), fov: 50 }, { p: P2(320, 360, 1120), t: P2(-180, 500, 160), fov: 46 }],
    ];
    return { stops, legs, closed: true, speed: 380, minT: 1.9, maxT: 3.4, speedRef: 300, arriveImpact: 'hit', phonePull: 0.35, phoneFov: 12, phoneLift: 0.18 };
  }
  exhibitPose() { return { p: V(120, 600, ORRERY_R + 150), t: V(0, 540, ORRERY_R - 20), fov: 50, roll: 0 }; }
  depart(from, to, world) { if (to === 4) { world.ui.setProject(1, 1); this.orrery.show(1); } else this.orrery.show(-1); }
  arrive(i) {}
  project(i, d, world) { this.orrery.show(i); world.impact.hit({ seq: 'soft', center: [0.62, 0.5], shake: 0.3 }); }
  impactCenter(i, world) { const s = world.toScreen(world.route.stops[i].t.clone()); return [s.x / world.view.w, 1 - s.y / world.view.h]; }
  layout(view) { this.mirror?.setSize(view.w * view.dpr, view.h * view.dpr); }
  preRender(world) {
    if (!this.mirror || waterU.uReflAmt.value <= 0) return;
    world.camera.updateMatrixWorld();
    if (this.mirror.render(world.renderer, world.scene, world.camera, this.mirrorHide, this.fogCol)) waterU.uReflMat.value.copy(this.mirror.texMat);
  }
  ready(world) {
    document.documentElement.classList.add('ready');
    if (reduced || q.has('skipintro')) return;
    // the entrance: the runes charge round every band, the core wakes, and the camera rises from the water
    const s0 = this.stops[0];
    this.intro = {
      t: 0,
      pc: new THREE.CatmullRomCurve3([V(420, 30, 520), V(560, 100, 700), V(700, 200, 840), s0.p.clone()], false, 'centripetal'),
      tc: new THREE.CatmullRomCurve3([V(0, 420, 0), V(-10, 480, 0), V(-20, 510, 0), s0.t.clone()], false, 'centripetal'),
    };
    this.charge = 0;
    world.nav.lockUntil = performance.now() + 2800;
    document.querySelector('.stop--top').classList.remove('is-current');
    const r = world.rig; r.pose.p.copy(this.intro.pc.getPoint(0)); r.pose.t.copy(this.intro.tc.getPoint(0)); r.pose.fov = 50;
  }
  update(dt, t, world) {
    const cam = world.camera;
    if (this.intro) {
      const I = this.intro; I.t += dt;
      this.charge = ease(clamp((I.t - 0.2) / 1.4, 0, 1));
      const u = ease(clamp((I.t - 0.1) / 2.1, 0, 1)), r = world.rig;
      r.pose.p.copy(I.pc.getPoint(u)); r.pose.t.copy(I.tc.getPoint(u)); r.pose.fov = lerp(50, this.stops[0].fov, u);
      if (I.t > 1.66 && !I.hit) {
        I.hit = true;
        const s = world.toScreen(C.clone());
        world.impact.hit({ seq: 'big', center: [s.x / world.view.w, 1 - s.y / world.view.h], shake: 1 }); world.api().sfx.play('slam');
      }
      if (I.t > 1.8 && !I.card) { I.card = true; world.setCard(0, true); }
      if (I.t >= 2.3) { this.intro = null; this.charge = 1; }
    }
    // a low sun from the west, the cool sky above
    const key = V(-0.7, 0.36, 0.62).normalize().transformDirection(cam.matrixWorldInverse);
    paintShared.uKeyDir.value.copy(key); shared.uKeyDir.value.copy(key);
    shared.uFillDir.value.copy(V(0.4, 0.8, 0.4).normalize().transformDirection(cam.matrixWorldInverse));
    paintShared.uStep.value = shared.uStep.value; paintShared.uPx.value = shared.uPx.value;
    this.sky.position.copy(cam.position);
    this.flash = Math.max(0, this.flash - dt * 0.8);
    this.arm.update(t, this.charge);
    this.gears.update(t); this.seal.update(t); this.orrery.update(dt);
    this.traffic.forEach((tr) => tr.update(Math.floor(t * 12) / 12));
  }
  click(e, ray, world) {
    const hits = ray.intersectObjects(this.orrery.screens, false);
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

const director = new HextechDirector();
const world = new World({
  canvas: document.querySelector('canvas.gl'), director, places: PLACES,
  palettes: PALETTES, palette: q.get('palette') || 'hextech',
  pipeline: { bloom: true, kuwahara: phone || q.has('nopaint') ? 0 : 2 },
});
post.uFogAmt.value = 1; post.uFogNear.value = 300; post.uFogFar.value = 4200; post.uFogLine.value = 0.8;
post.uBloomAmt.value = 0.55; post.uBloomDots.value = 0.55;
post.uMisregPx.value = 0.9; post.uGrain.value = 0.04; post.uVignette.value = 0.38; post.uGradeAmt.value = 0.2;
post.uDepthK.value = 0.04; post.uNormalK.value = 0.4;
await world.start();
window.__xini.ready = true;
