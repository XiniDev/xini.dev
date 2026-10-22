import * as THREE from 'three';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/anton';
import '../../shared/fonts/zen-kaku-700.css';
import './tower.css';
import { World, reduced, q, openLink } from '../../shared/world/world.js';
import { renderWorld } from '../../shared/world/ui.js';
import { Mirror } from '../../shared/world/mirror.js';
import { shared } from '../../shared/gfx/ink-material.js';
import { post } from '../../shared/gfx/pipeline.js';
import { makeSky, skyU, makeTraffic } from '../../shared/gfx/sky.js';
import { scatterTowers, facadeU } from '../../shared/gfx/facade.js';
import { foldMarkSVG } from '../../shared/ui/marks.js';
import { featured } from '../../shared/data/content.js';
import { inkMaterial, V, T, FLOORS, buildTower, buildStreet, streetU, buildRain } from './build.js';
import { labelPlane } from '../machine/board.js';
import { buildSystems, buildLab, buildVault, buildGallery, buildLobby, SCREENS } from './floors.js';
import { PALETTES } from './palettes.js';

const PLACES = ['Roof', 'Systems', 'Lab', 'Vault', 'Gallery', 'Lobby'];
const lerp = THREE.MathUtils.lerp, clamp = THREE.MathUtils.clamp;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const phone = Math.min(innerWidth, innerHeight) < 600;

// the route map is a section through the tower: down the atrium, back up the outside
const SY = (y) => 130 - y * 0.1;
const nodes = [[0, SY(1290)], [0, SY(1030)], [0, SY(790)], [0, SY(552)], [0, SY(316)], [0, SY(40)]];
document.getElementById('app').innerHTML = renderWorld({
  places: PLACES,
  mark: foldMarkSVG('logo', 'var(--text)', 'var(--neon)'),
  route: { viewBox: '-40 -8 80 148', path: `M0,${SY(1290)} L0,${SY(40)} L26,${SY(40)} L26,${SY(1290)} Z`, nodes },
});
{
  const svg = document.querySelector('.route__map'), ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'route__board');
  const add = (tag, a) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); g.appendChild(e); };
  add('rect', { x: -12, y: SY(1200), width: 24, height: 120 });
  for (let y = 30; y < 1200; y += 60) add('line', { x1: -12, x2: 12, y1: SY(y), y2: SY(y) });
  add('rect', { x: -5.5, y: SY(1200), width: 11, height: 120 });
  svg.insertBefore(g, svg.firstChild);
}

class TowerDirector {
  constructor() { this.parallax = 4; this.imgs = []; this.flash = 0; }
  palette(p, name) {
    if (this.built) { const u = new URL(location.href); u.searchParams.set('palette', name); location.replace(u); return; }
    const g = (this.pal = p.gl);
    skyU.uZenith.value.set(g.zenith); skyU.uHorizon.value.set(g.skyHorizon); skyU.uGlow.value.set(g.skyGlow); skyU.uStreak.value.set(g.skyStreak);
    skyU.uMoon.value.set(g.lamp); skyU.uMoonSize.value = 0.02; skyU.uStars.value = 0; skyU.uDot.value.set(g.ink); skyU.uBand.value = 0.2;
    skyU.uMoonDir.value.set(-0.5, 0.42, -0.75).normalize();
    shared.uShadeTint.value.set(g.shade); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set(g.glint);
    shared.uFillCol.value.set(g.uplight); shared.uFillAmt.value = 0.3;
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paperFlash); post.uImpAccent.value.set(g.signal);
    post.uFogCol.value.set(g.fog); post.uSpeedCol.value.set(g.streak);
    facadeU.uWinA.value.set(g.winA); facadeU.uWinB.value.set(g.winB); facadeU.uWinC.value.set(g.winC); facadeU.uRoof.value.set(g.roof); facadeU.uWallLit.value.set(g.wallLit);
    facadeU.uWall.value.set(g.wallB); facadeU.uCell.value.set(4.4, 7.5); facadeU.uLit.value = 0.38;
  }
  async build(world) {
    this.world = world;
    const { scene, camera } = world;
    camera.near = 1; camera.far = 8000;
    await document.fonts.ready;
    await Promise.all(['400 40px "Anton"', '700 40px "Zen Kaku Gothic New"', '600 20px "JetBrains Mono Variable"'].map((f) => document.fonts.load(f, '構築知能金庫展示 XINI').catch(() => {})));
    const pal = this.pal;
    this.tower = buildTower(pal); scene.add(this.tower.group);
    this.sys = buildSystems(pal); scene.add(this.sys.group);
    this.lab = buildLab(pal); scene.add(this.lab.group);
    this.vault = buildVault(pal); scene.add(this.vault.group);
    this.gal = buildGallery(pal, featured, this); scene.add(this.gal.group);
    this.lobby = buildLobby(pal); scene.add(this.lobby.group);
    // the city: neighbours close in, a skyline to the horizon
    const walls = [pal.wallA, pal.wallB, pal.wallC];
    const near = scatterTowers({ count: 150, rMin: 300, rMax: 1100, hMin: 90, hMax: 620, wMin: 50, wMax: 120, y: 0, seed: 11, palette: walls });
    const far = scatterTowers({ count: 760, rMin: 1100, rMax: 3600, hMin: 120, hMax: 900, wMin: 60, wMax: 170, y: 0, seed: 7, palette: walls });
    scene.add(near, far);
    const words = [['電脳', 'NETWORK'], ['信頼', 'TRUST'], ['夜市', 'NIGHT MARKET'], ['速達', 'EXPRESS'], ['回路', 'CIRCUIT'], ['自由', 'FREE'], ['記憶', 'MEMORY'], ['未来', 'FUTURE']];
    const Mx = new THREE.Matrix4(), Pp = new THREE.Vector3(), Qq = new THREE.Quaternion(), Ss = new THREE.Vector3();
    let ads = 0;
    for (let i = 0; i < near.count && ads < 14; i++) {
      near.getMatrixAt(i, Mx); Mx.decompose(Pp, Qq, Ss);
      if (Ss.y < 260 || i % 3) continue;
      const toC = V(-Pp.x, 0, -Pp.z).normalize(), [jp, en] = words[ads % words.length], col = [pal.signal, pal.lamp, pal.cyan][ads % 3];
      const w = Math.min(Ss.x, Ss.z) * 0.62, h = w * 1.8;
      const ad = labelPlane(w, h, (c2, Wd, Hd) => {
        c2.fillStyle = '#070405'; c2.fillRect(0, 0, Wd, Hd); c2.fillStyle = col;
        c2.fillRect(Wd * 0.08, Hd * 0.04, Wd * 0.84, Hd * 0.012); c2.fillRect(Wd * 0.08, Hd * 0.95, Wd * 0.84, Hd * 0.012);
        c2.font = `700 ${Math.round(Wd * 0.6)}px "Zen Kaku Gothic New", sans-serif`; c2.textAlign = 'center'; c2.textBaseline = 'middle';
        [...jp].forEach((ch, k) => c2.fillText(ch, Wd / 2, Hd * (0.26 + k * 0.36)));
        c2.font = `400 ${Math.round(Wd * 0.13)}px "Anton", sans-serif`; c2.fillText(en, Wd / 2, Hd * 0.9);
      }, { emissive: true, res: 256 });
      ad.position.copy(Pp).add(V(0, Ss.y - h * 0.62, 0)).addScaledVector(toC, Math.max(Ss.x, Ss.z) * 0.51 + 1);
      ad.lookAt(ad.position.clone().add(toC)); scene.add(ad); ads++;
    }
    this.street = buildStreet(pal); scene.add(this.street);
    world.backdrop.visible = false;
    this.sky = makeSky({ radius: 6000, px: shared.uPx }); scene.add(this.sky);
    // traffic: skylanes circling the tower, and the streets
    const lanes = [];
    for (let k = 0; k < 6; k++) {
      const r0 = 330 + k * 140, y0 = 160 + (k % 3) * 170, pts = [];
      for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2 + k; pts.push(V(Math.cos(a) * (r0 + Math.sin(a * 3 + k) * 50), y0 + Math.sin(a * 2 + k) * 24, Math.sin(a) * (r0 + Math.cos(a * 2 + k) * 50))); }
      lanes.push(new THREE.CatmullRomCurve3(pts, true));
    }
    for (const z of [-220, 220, 440]) lanes.push(new THREE.CatmullRomCurve3([V(-3000, 4, z - 8), V(3000, 4, z - 8), V(3000, 4, z + 8), V(-3000, 4, z + 8)], true, 'catmullrom', 0.01));
    this.carMats = [inkMaterial({ base: pal.lamp, emissive: true, instanced: true }), inkMaterial({ base: pal.signal, emissive: true, instanced: true })];
    this.traffic = [makeTraffic({ lanes, count: 260, mat: this.carMats[0] }), makeTraffic({ lanes, count: 140, mat: this.carMats[1] })];
    this.traffic.forEach((t) => scene.add(t.mesh));
    this.rain = buildRain(pal, phone ? 1500 : 2600); scene.add(this.rain);
    // wet street reflects everything
    this.mirror = new Mirror(phone ? 0.35 : 0.5, 0);
    streetU.uRefl.value = this.mirror.rt.texture; streetU.uReflAmt.value = q.has('norefl') ? 0 : 0.85;
    this.mirrorHide = [this.street, this.sky, this.rain];
    this.fogCol = new THREE.Color(pal.fog);
    featured.forEach((p, i) => { const im = new Image(); im.onload = () => { this.imgs[i] = im; this.gal.screens[i].userData.redraw(); }; im.src = p.image; });
    this.built = true;

    // ---- the route: down the atrium, out of the lobby, up the facade
    const at = (pose, nx, ny, depth = 60) => {
      const c = new THREE.PerspectiveCamera(pose.fov, 1.6, 1, 10); c.position.copy(pose.p); c.lookAt(pose.t); c.updateMatrixWorld();
      return new THREE.Vector3(nx, ny, 0.5).unproject(c).sub(pose.p).normalize().multiplyScalar(depth).add(pose.p).toArray();
    };
    const stops = [
      { id: 'top', p: V(110, 1250, 440), t: V(-57, 1330, 108), fov: 54 },
      { id: 'systems', p: V(-24, 1022, 30), t: V(18, 1034, -100), fov: 62 },
      { id: 'ai', p: V(0, 790, 30), t: V(0, 798, -90), fov: 58 },
      { id: 'security', p: V(0, 552, 30), t: V(0, 556, -104), fov: 60 },
      { id: 'work', ...this.exhibitPose(1) },
      { id: 'contact', p: V(-70, 26, 330), t: V(0, 110, 110), fov: 58 },
    ];
    const cardAt = [[-0.56, 0.2], [0.52, 0.04], [-0.54, 0.06], [0.52, 0.04], [-0.55, 0.04], [0.5, 0.08]];
    const depth = [220, 60, 60, 60, 60, 60];
    stops.forEach((st, i) => { st.anchor = at(st, ...cardAt[i], depth[i]); });
    this.stops = stops;
    const P = (x, y, z) => V(x, y, z);
    const legs = [
      [{ p: P(30, 1310, 200), t: P(0, 1180, 20), fov: 56 }, { p: P(4, 1196, 10), t: P(0, 900, -6), fov: 70, roll: 0.3 }, { p: P(0, 1088, 20), t: P(0, 1010, -70), fov: 64 }],
      [{ p: P(3, 994, 12), t: P(0, 700, -4), fov: 72, roll: -0.3 }, { p: P(0, 850, 20), t: P(0, 780, -70), fov: 62 }],
      [{ p: P(3, 754, 12), t: P(0, 460, -4), fov: 72, roll: 0.3 }, { p: P(0, 612, 22), t: P(0, 540, -70), fov: 62 }],
      [{ p: P(3, 514, 10), t: P(0, 220, -4), fov: 72, roll: -0.3 }, { p: P(0, 376, 16), t: P(0, 300, -70), fov: 60 }],
      [{ p: P(3, 274, 8), t: P(0, -50, -4), fov: 74, roll: 0.3 }, { p: P(0, 60, 10), t: P(0, 40, 200), fov: 66 }, { p: P(-10, 36, 200), t: P(0, 60, 400), fov: 62 }, { p: P(-60, 30, 380), t: P(0, 100, 110), fov: 58 }],
      [{ p: P(-40, 140, 420), t: P(0, 500, 140), fov: 62 }, { p: P(40, 660, 470), t: P(0, 1000, 120), fov: 58 }, { p: P(110, 1140, 470), t: P(-40, 1300, 100), fov: 56 }],
    ];
    return { stops, legs, closed: true, speed: 440, minT: 1.8, maxT: 3.2, speedRef: 320, arriveImpact: 'hit', phonePull: 0.3, phoneFov: 12, phoneLift: 0.18 };
  }
  exhibitPose(i) {
    const c = SCREENS[i].p.clone().setY(FLOORS.work + 46);
    return { p: V(0, FLOORS.work + 46, 6), t: c, fov: 56, roll: 0 };
  }
  depart(from, to, world) { if (to === 4) world.ui.setProject(1, 1); }
  arrive(i, world) { if (i === 4) this.focusExhibit(world.ui.project); }
  project(i, d, world) { this.focusExhibit(i); world.impact.hit({ seq: 'soft', center: [0.5, 0.5], shake: 0.3 }); }
  focusExhibit(i) {
    const base = this.stops[4], pose = this.exhibitPose(i);
    this.world.rig.nudge(pose.p.clone().sub(base.p), pose.t.clone().sub(base.t));
  }
  impactCenter(i, world) {
    const s = world.toScreen(world.route.stops[i].t.clone());
    return [s.x / world.view.w, 1 - s.y / world.view.h];
  }
  layout(view) { this.mirror?.setSize(view.w * view.dpr, view.h * view.dpr); }
  preRender(world) {
    if (!this.mirror || streetU.uReflAmt.value <= 0) return;
    world.camera.updateMatrixWorld();
    if (this.mirror.render(world.renderer, world.scene, world.camera, this.mirrorHide, this.fogCol)) streetU.uReflMat.value.copy(this.mirror.texMat);
  }
  ready(world) {
    document.documentElement.classList.add('ready');
    if (reduced || q.has('skipintro')) return;
    // the entrance rides up the facade from the street as the city lights come on
    const s0 = this.stops[0];
    this.intro = {
      t: 0,
      pc: new THREE.CatmullRomCurve3([V(0, 24, 560), V(30, 300, 470), V(60, 900, 430), s0.p.clone()], false, 'centripetal'),
      tc: new THREE.CatmullRomCurve3([V(0, 400, 120), V(0, 700, 120), V(0, 1200, 110), s0.t.clone()], false, 'centripetal'),
    };
    facadeU.uLit.value = 0; this.sign(0);
    world.nav.lockUntil = performance.now() + 2800;
    document.querySelector('.stop--top').classList.remove('is-current');
    const r = world.rig; r.pose.p.copy(this.intro.pc.getPoint(0)); r.pose.t.copy(this.intro.tc.getPoint(0)); r.pose.fov = 64;
  }
  sign(k) {
    const g = this.pal;
    this.tower.markFront.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.05, 1, k));
    this.tower.markBack.uniforms.uBase.value.set(g.lamp).multiplyScalar(lerp(0.05, 1, k));
  }
  update(dt, t, world) {
    const cam = world.camera;
    if (this.intro) {
      const I = this.intro; I.t += dt;
      facadeU.uLit.value = 0.38 * ease(clamp((I.t - 0.1) / 1.3, 0, 1));
      this.sign(I.t > 1.62 ? 1 : 0);
      const u = ease(clamp((I.t - 0.15) / 2.0, 0, 1)), r = world.rig;
      r.pose.p.copy(I.pc.getPoint(u)); r.pose.t.copy(I.tc.getPoint(u)); r.pose.fov = lerp(64, this.stops[0].fov, u);
      if (I.t > 1.66 && !I.hit) {
        I.hit = true;
        const s = world.toScreen(this.tower.markPos.clone());
        world.impact.hit({ seq: 'big', center: [s.x / world.view.w, 1 - s.y / world.view.h], shake: 1 }); world.api().sfx.play('slam');
      }
      if (I.t > 1.8 && !I.card) { I.card = true; world.setCard(0, true); }
      if (I.t >= 2.3) { this.intro = null; facadeU.uLit.value = 0.38; this.sign(1); }
    }
    shared.uKeyDir.value.copy(V(-0.4, 0.8, 0.45).normalize().transformDirection(cam.matrixWorldInverse));
    shared.uFillDir.value.copy(V(0.2, -1, 0.2).normalize().transformDirection(cam.matrixWorldInverse));
    this.sky.position.copy(cam.position);
    const st = Math.floor(t * 12) / 12;
    this.traffic.forEach((tr) => tr.update(st));
    this.tower.beacon.visible = Math.floor(t * 1.5) % 2 === 0;
    this.tower.updateLights(t);
    this.flash = Math.max(0, this.flash - dt * 0.8);
    this.lab.update(t, this.flash);
    this.vault.update(t);
  }
  click(e, ray, world) {
    const hits = ray.intersectObjects(this.gal.screens, false);
    if (hits.length) {
      const i = hits[0].object.userData.exhibit;
      if (world.rig.index !== 4) { world.nav.go(4, 'click', true); world.ui.setProject(i, 1); return; }
      if (i !== world.ui.project) world.ui.setProject(i, i > world.ui.project ? 1 : -1);
      else openLink(featured[i].url);
      return;
    }
    if (ray.ray.distanceToPoint(this.lab.center) < 30) { this.flash = 1.2; world.impact.hit({ seq: 'accent', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.35 }); world.api().sfx.play('snap'); return; }
    world.impact.hit({ seq: 'soft', center: [e.clientX / innerWidth, 1 - e.clientY / innerHeight], shake: 0.25 });
    world.api().sfx.play('snap', { gain: 0.6 });
  }
}

const director = new TowerDirector();
const world = new World({
  canvas: document.querySelector('canvas.gl'), director, places: PLACES,
  palettes: PALETTES, palette: q.get('palette') || 'arasaka',
  pipeline: { bloom: true },
});
post.uFogAmt.value = 1; post.uFogNear.value = 180; post.uFogFar.value = 2600; post.uFogLine.value = 0.85;
post.uBloomAmt.value = 0.6; post.uBloomDots.value = 0.6;
post.uMisregPx.value = 1.1; post.uGrain.value = 0.04; post.uVignette.value = 0.4; post.uGradeAmt.value = 0.18;
post.uDepthK.value = 0.045; post.uNormalK.value = 0.35;
await world.start();
window.__xini.ready = true;
