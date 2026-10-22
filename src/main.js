import './colour.js';
import * as THREE from 'three';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/chakra-petch/600.css';
import '@fontsource/chakra-petch/700.css';
import './shared/fonts/zen-kaku-700.css';
import './machine.css';
import { World, reduced, q, openLink } from './shared/world/world.js';
import { renderWorld } from './shared/world/ui.js';
import { shared } from './shared/gfx/ink-material.js';
import { post, setLut } from './shared/gfx/pipeline.js';
import { makeLut } from './shared/gfx/lut.js';
import { batchStatic } from './shared/gfx/batch.js';
import { gradeVerdigris } from './grade.js';
import { makeSky, skyU } from './shared/gfx/sky.js';
import { foldMarkSVG } from './shared/ui/marks.js';
import { featured } from './shared/data/content.js';
import { V, Silk, boardSurface, boardU, Traces, traceU, Parts, reseed } from './board.js';
import { buildTower, TOWER } from './tower.js';
import { buildVRM, buildMemory, buildNeural, buildIO, buildRest, buildBuses, buildDust, SITES, SCREEN_Z } from './districts.js';
import { buildEnclave } from './enclave.js';
import { buildGantry, GANTRY } from './core.js';
import { planeTexture, PLANE } from './plane.js';
import { initCards } from './cards.js';
import { monotone } from './shared/world/rig.js';
import { PALETTES } from './palettes.js';
import { buildCity } from './city.js';
import { Mirror } from './shared/world/mirror.js';

const PLACES = ['Power on', 'The core', 'Neural core', 'Enclave', 'Memory', 'I/O'];
// what each place is, in plain words, beside its name on the route (the names alone are the machine's)
const SECTIONS = ['', 'Systems', 'AI', 'Security', 'Projects', 'Contact'];
// the enclave stop frames each lock at its own height
const LOCK_Y = 132; // the camera looks at the cipher cube's centre
const BOOT_LEAD = 0.25; // seconds the LED holds the black before the power floods
const STANDBY = 0.18;   // how lit a district stays while the visitor is elsewhere
const REFS = ['PWR', 'U1', 'U7', 'U9', 'J4', 'J1'];
const lerp = THREE.MathUtils.lerp, clamp = THREE.MathUtils.clamp;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const sstep = (a, b, x) => { const u = clamp((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };
const phone = Math.min(innerWidth, innerHeight) < 600;
// portrait screens dock the card below: each stop centres its subject instead of leaving room beside it
const portrait = innerHeight > innerWidth * 1.05;
const PT = (wide, tall) => (portrait && tall ? tall : wide);

// the route: one trace from 01 to 06 read left to right, its vias numbered, with a return run under it back to
// the start (the finale); a strip of board, not a map, so the order reads at a glance
const nodes = [0, 1, 2, 3, 4, 5].map((i) => [-80 + i * 32, -6]);
const routePath = `M${nodes.map(([x, y]) => `${x},${y}`).join(' L')} L88,-6 L94,0 L94,4 L88,10 L-88,10 L-94,4 L-94,0 L-88,-6 L-80,-6`;

document.getElementById('app').innerHTML = renderWorld({
  places: PLACES,
  mark: foldMarkSVG('logo', 'var(--text)', 'var(--neonRest)'), // (the at-rest green: full strength stays on the hero)
  route: { viewBox: '-100 -22 200 44', path: routePath, nodes },
  deco: Object.fromEntries(['top', 'systems', 'ai', 'security', 'work', 'contact'].map((id, i) => [id, `<span class="card__ref" aria-hidden="true">${REFS[i]}</span>`])),
});
{
  const svg = document.querySelector('.route__map'), ns = 'http://www.w3.org/2000/svg';
  // the strip of board under the trace, and each via's number printed under it
  const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'route__board');
  const strip = document.createElementNS(ns, 'rect'); [['x', -99], ['y', -21], ['width', 198], ['height', 42]].forEach(([k, v]) => strip.setAttribute(k, v)); g.appendChild(strip);
  nodes.forEach(([x], i) => { const t = document.createElementNS(ns, 'text'); t.setAttribute('x', x); t.setAttribute('y', 20); t.textContent = `0${i + 1}`; g.appendChild(t); });
  svg.insertBefore(g, svg.firstChild);
  // the current stop, named over the strip
  const lab = document.createElement('p'); lab.className = 'route__label'; lab.setAttribute('aria-hidden', 'true');
  document.querySelector('.route').appendChild(lab);
  // on a phone the card carries the count in its header instead
  document.querySelectorAll('.stop .card').forEach((c, i) => c.insertAdjacentHTML('afterbegin', `<span class="card__count" aria-hidden="true">0${i + 1}/06</span>`));
}
const routeLabel = (i, from) => { const el = document.querySelector('.route__label'); if (el) el.innerHTML = `<b>${from === 5 && i === 0 ? '↺ ' : ''}0${i + 1}/06</b>${PLACES[i]}${SECTIONS[i] ? `<span> · ${SECTIONS[i]}</span>` : ''}`; };
routeLabel(0);
// wayfinding: the nav marks where you are, the gallery counts its projects, the contact card leads back to the start,
// and the first stop says how to move on until the visitor does
// the nav follows the order you travel: About covers the three stops of what I do, then Work, then Contact
const NAV_IDS = ['#top', '#systems', '#systems', '#systems', '#work', '#contact'];
{
  const nav = document.querySelector('.bar__nav'), by = (h) => nav?.querySelector(`a[href="${h}"]`), ext = nav?.querySelector('a:not([href^="#"])');
  [by('#systems'), by('#work'), by('#contact'), ext].forEach((a) => a && nav.appendChild(a));
}
const setNav = (i) => document.querySelectorAll('.bar__nav a').forEach((a) => { if (a.getAttribute('href') === NAV_IDS[i]) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
setNav(0);
{
  const dots = document.querySelector('.pager__dots');
  if (dots) dots.outerHTML = `<span class="pager__count" aria-live="polite"><b>01</b> / ${String(featured.length).padStart(2, '0')}</span>`;
  document.querySelector('.contact__links')?.insertAdjacentHTML('beforeend', '<li><a class="contact__restart" href="#top"><span aria-hidden="true">↺</span> Back to start</a></li>');
  // "All 20 projects" reads as one label (a count after a label read as a fourth code on the card)
  const all = document.querySelector('.work__all'), n = all?.querySelector('.work__allcount')?.textContent;
  if (all && n) all.innerHTML = `All ${n} projects`;
  // the route's vias name their stop when pointed at, with its number
  document.querySelectorAll('.route__list a span').forEach((sp, i) => { sp.textContent = `0${i + 1} · ${PLACES[i]}${SECTIONS[i] ? ` · ${SECTIONS[i]}` : ''}`; });
  document.body.insertAdjacentHTML('beforeend', '<p class="cue" aria-hidden="true">Scroll<i></i></p>');
  document.querySelector('.stop--top .card')?.insertAdjacentHTML('beforeend', '<p class="card__cue" aria-hidden="true">Scroll<i></i></p>');
}
const setCount = (i) => { const b = document.querySelector('.pager__count b'); if (b) b.textContent = String(i + 1).padStart(2, '0'); };
// the route's brass trace runs with the flight itself, and its lit via moves with the label and the nav
const routeGeo = (() => {
  const done = document.querySelector('.route__done'), path = document.querySelector('.route__path');
  if (!done || !path) return null;
  const total = done.getTotalLength();
  const fr = nodes.map(([x, y]) => { let best = 0, bd = Infinity; for (let k = 0; k <= 400; k++) { const pt = path.getPointAtLength((k / 400) * total); const d = (pt.x - x) ** 2 + (pt.y - y) ** 2; if (d < bd) { bd = d; best = k / 400; } } return best; });
  return { done, total, fr, links: [...document.querySelectorAll('.route__list a')] };
})();
const routeAt = (frac, cur) => {
  if (!routeGeo) return;
  const { done, total, links } = routeGeo;
  done.style.strokeDasharray = `${total}`; done.style.strokeDashoffset = `${total * (1 - frac)}`;
  links.forEach((a, k) => (k === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
};


class MachineDirector {
  constructor() { this.parallax = 5; this.imgs = []; this.flash = 0; this.spin = 0; this.pingN = 0; }
  palette(p, name) {
    if (this.built) { const u = new URL(location.href); u.searchParams.set('palette', name); location.replace(u); return; }
    const g = (this.pal = p.gl);
    skyU.uZenith.value.set(g.zenith); skyU.uHorizon.value.set(g.skyHorizon); skyU.uGlow.value.set(g.skyGlow); skyU.uStreak.value.set(g.skyStreak);
    skyU.uMoon.value.set(g.skyHorizon); skyU.uMoonSize.value = 0.0001; skyU.uStars.value = 0; skyU.uDot.value.set(g.ink); skyU.uBand.value = 0.11;
    // the city's glow stands behind the spire (seen from the power-on stop), so its dark body has a sky to read against;
    // it is printed as dots where it fades, and it is only up while the spire is the stop
    // (centred just above the crown as the first stop sees it: offset, it lit the empty sky beside the hero)
    skyU.uLampDir.value.set(0.26, 0.56, -0.79).normalize(); skyU.uLampCol.value.set(g.lamp ?? g.skyGlow); skyU.uLampAmt.value = 0; skyU.uLampPow.value = 120; skyU.uLampPrint.value = 1; skyU.uLampCell.value = 6.5;
    skyU.uStreakAmt.value = 0; // a flat night sky: no painted cloud smudges
    shared.uShadeTint.value.set(g.shade); shared.uDotInk.value.set(g.ink); shared.uRimCol.value.set(g.rim); shared.uGlint.value.set(g.glint);
    shared.uFillCol.value.set(g.uplight); shared.uFillAmt.value = 0.2;
    post.uInk.value.set(g.ink); post.uGradeShadow.value.set(g.gradeShadow); post.uGradeHigh.value.set(g.gradeHigh);
    post.uImpInk.value.set(g.ink); post.uImpPaper.value.set(g.paperFlash); post.uImpAccent.value.set(g.signal);
    post.uFogCol.value.set(g.fog); post.uFogHorizon.value.set(g.fogHorizon ?? g.fog); post.uSpeedCol.value.set(g.streak);
    boardU.uMask.value.set(g.mask); boardU.uMask2.value.set(g.mask2); boardU.uSilk.value.set(g.silk); boardU.uPad.value.set(g.pad);
    boardU.uSheen.value.set(g.sheen); boardU.uSignal.value.set(g.signal); boardU.uHot.value.set(g.hot);
  }
  async build(world) {
    this.world = world;
    const { scene, camera } = world;
    camera.near = 1; camera.far = 7000;
    await document.fonts.ready;
    await Promise.all(['700 40px "Chakra Petch"', '600 40px "Chakra Petch"', '700 40px "Zen Kaku Gothic New"', '600 20px "JetBrains Mono Variable"', '700 20px "JetBrains Mono Variable"']
      .map((f) => document.fonts.load(f, '電源冷卻記憶體神經網絡接口自研組裝加密認證注意高溫 AZ09').catch(() => {})));
    const pal = this.pal;
    const T0 = performance.now(), mark = (n) => { if (q.has('debug')) console.warn(n, Math.round(performance.now() - T0)); };
    reseed(7);
    const silk = (this.silk = new Silk(phone ? 2048 : 4096));
    const parts = new Parts(pal, silk);
    parts.keep(...GANTRY.keep); // the assembly gantry stands here
    parts.keep(SITES.enclave.x - 190, SITES.enclave.z - 170, SITES.enclave.x + 190, SITES.enclave.z + 170); // and the enclave
    boardU.uSilkTex.value = silk.tex;
    boardU.uLitC.value.set(TOWER.cx, TOWER.cz);
    this.board = boardSurface(); scene.add(this.board);
    this.tower = buildTower(pal, silk); scene.add(this.tower.group); mark('tower');
    const vrm = buildVRM(pal, parts, silk); vrm.name = 'vrm'; scene.add(vrm); this.vrmSeam = vrm.userData.seam;
    this.mem = buildMemory(pal, parts, silk, featured, this); scene.add(this.mem.group);
    this.npu = buildNeural(pal, parts, silk); scene.add(this.npu.group);
    this.enc = buildEnclave(pal, parts, silk, { face: V(490, 0, 640) }); scene.add(this.enc.group);
    this.gantry = buildGantry(pal, parts, silk); scene.add(this.gantry.group);
    this.gantry.onComplete = () => {
      const w = this.world, s = w.toScreen(V(-200, 10, 262));
      w.impact.hit({ seq: 'accent', center: [s.x / w.view.w, 1 - s.y / w.view.h], shake: 0.25 }); w.api().sfx.play('snap', { gain: 0.7 });
    };
    this.io = buildIO(pal, parts, silk); scene.add(this.io.group);
    this.rest = buildRest(pal, parts, silk); scene.add(this.rest.group); mark('districts');
    const tr = new Traces(); buildBuses(tr); this.traces = tr.mesh(pal); scene.add(this.traces);
    const partsMesh = parts.build(); partsMesh.name = 'parts'; scene.add(partsMesh); mark('parts');
    silk.finish(); mark('silk');
    world.backdrop.visible = false;
    this.sky = makeSky({ radius: 5200, px: shared.uPx }); scene.add(this.sky);
    this.dust = buildDust(pal, phone ? 400 : 700); scene.add(this.dust);
    this.city = buildCity(pal, { phone }); scene.add(this.city.group); mark('city');
    this.mirror = new Mirror(phone ? 0.35 : 0.5);
    boardU.uRefl.value = this.mirror.rt.texture; boardU.uReflAmt.value = q.has('norefl') ? 0 : q.has('refl') ? +q.get('refl') : 0.45; boardU.uReflDebug.value = q.has('refldebug') ? +(q.get('refldebug') || 1) : 0;
    // (the cube's stickers stay out of the board's reflection: the mark mirrored on the floor read as a second mark)
    this.mirrorHide = [this.board, this.sky, this.dust, this.traces, this.io.shafts, this.enc.variants.cipher?.stickers].filter(Boolean);
    this.fogCol = new THREE.Color(this.pal.fog);
    post.tPlane.value = planeTexture(); post.uPlaneC.value.set(...PLANE.source); post.uPlaneCol.value.set(this.pal.signal); post.uPlaneHot.value.set(this.pal.hot);
    // project screenshots arrive late; screens redraw when they do
    featured.forEach((p, i) => { const im = new Image(); im.onload = () => { this.imgs[i] = im; this.mem.screens[i].userData.redraw(); }; im.src = p.image; });
    // names for debugging and flight QA reports
    Object.entries({ gantry: this.gantry.group, tower: this.tower.group, memory: this.mem.group, neural: this.npu.group, enclave: this.enc.group, io: this.io.group, rest: this.rest.group, traces: this.traces, city: this.city.group, sky: this.sky, dust: this.dust, board: this.board })
      .forEach(([n, o]) => { if (o) o.name = n; });
    // static batching: everything that never moves is merged into one mesh per material
    if (!q.has('nobatch')) { const B = batchStatic(scene, { keep: [this.board, this.sky, this.dust, this.traces, this.io.shafts, this.city.floor].filter(Boolean) }); mark(`batch ${B.before} -> ${B.after}`); }
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
      // looking up at the spire from close in: the crown in the upper right third, big enough to win over the
      // headline, the cooler's foot and the districts round it out of shot; portrait screens centre it over the card
      { id: 'top', p: PT(V(-320, 230, 820), V(-160, 300, 900)), t: PT(V(-300, 610, -120), V(-85, 600, 108)), fov: PT(42, 31) },
      // looking down on the board being built, the whole gantry in frame and the cooler's pipes out of it
      // closer in, so the board being built is a quarter of the frame and the stack light is out of shot
      // (portrait: from further back, the target above the board, so the gantry clears the bar and the board sits
      // over the card)
      { id: 'systems', p: PT(V(-150, 380, 620), V(-150, 445, 680)), t: PT(V(-150, 15, 248), V(-190, 60, 265)), fov: PT(42, 41) },
      // phones pull the camera back along its view, which drops this upward look to board level; start it higher
      // (from a little east, so plain air stands between the lattice and the tower's edge behind it)
      { id: 'ai', p: PT(V(-450, 85, 650), V(-480, 112, 610)), t: PT(V(-415, 178, 330), V(-470, 176, 330)), fov: 50 },
      // (aimed a little right of the cube: the tower's fan ring hung as a pale arc in the corner)
      { id: 'security', p: V(495, 130, 640), t: PT(V(615, LOCK_Y - 2, 98), V(700, LOCK_Y, 140)), fov: 49 },
      { id: 'work', ...this.exhibitPose(1) },
      // square on to the shield, so the mark's verticals stand vertical; the mark left of centre, clear of the card
      { id: 'contact', p: V(-600, 215, -410), t: V(-1000, 228, -470), fov: 54 },
    ];
    // (the side of the screen each card takes; across, cards snap to the page's columns, see placeCard)
    const cardAt = [[-0.58, 0.36], [0.56, 0.02], [0.5, -0.18], [-0.52, 0.06], [-0.62, 0.04], [0.62, 0.06]];
    stops.forEach((st, i) => { st.anchor = at(st, ...cardAt[i]); });
    this.stops = stops;
    // what each stop is about: within r0 of it everything keeps its full ink; by r1 the machine has receded
    this.focus = [
      { p: V(TOWER.cx, 610, 0), r0: 300, r1: 820 },                       // the spire's crown
      { p: V(-195, 40, 250), r0: 170, r1: 520 },                          // the board on the gantry
      { p: this.npu.center.clone(), r0: 160, r1: 500 },                   // the lattice
      { p: V(SITES.enclave.x, 110, SITES.enclave.z), r0: 190, r1: 560 }, // the cipher
      { p: V(244, 100, SCREEN_Z[1]), r0: 150, r1: 440 },                  // the module on show
      { p: V(-1000, 240, -435), r0: 90, r1: 300 },                        // the mark cut through the shield (tight: the ports below sink)
    ];
    this.focusNow = { p: this.focus[0].p.clone(), r0: this.focus[0].r0, r1: this.focus[0].r1, amt: 0 };
    // a colour script in the air: the haze keeps its family and shifts a step per stop (colder round the enclave,
    // warm at the end as the daylight comes in through the mark)
    const C2 = (a, b) => [new THREE.Color(a), new THREE.Color(b)], base = C2(pal.fog, pal.fogHorizon);
    this.fogs = [base, base, base, C2('#1a2f3c', '#233c4c'), base, C2('#242b29', '#323530')];
    const P = (x, y, z) => V(x, y, z);
    // every flight is a different move; see DIRECTION.md (crane, orbit, skim, climb, run, reveal)
    const legs = [
      // 0 -> 1 crane: boom up off the spire's foot and tilt down onto the gantry
      { look: 0.1, dur: 2.4, pts: [
        { p: P(-270, 320, 850), t: P(-160, 300, -40), fov: 44 },
        { p: P(-200, 450, 760), t: P(-125, 80, 190), fov: 42 },
      ] },
      // 1 -> 2 orbit: swing round the neural core, falling to its feet
      { look: 0.15, dur: 2.3, pts: [
        { p: P(-290, 190, 560), t: P(-420, 140, 330), fov: 48 },
        { p: P(-400, 105, 655), t: P(-445, 168, 330), fov: 50 },
      ] },
      // 2 -> 3 skim: back out, drop to the deck and race east along the board's south edge, rise to the lock; the
      // gaze holds on the lock across the board so it is in frame for most of the run
      { look: 0.08, dur: 3.4, pts: [
        { p: P(-430, 52, 712), t: P(-290, 85, 500), fov: 54 },
        { p: P(-250, 30, 724), t: P(260, 85, 480), fov: 58 },
        { p: P(100, 32, 724), t: P(470, 100, 400), fov: 60 },
        { p: P(340, 64, 704), t: P(620, 160, 300), fov: 54 },
      ] },
      // 3 -> 4 climb: strafe up over the memory row, then down into the gallery
      { look: 0.1, dur: 3.0, pts: [
        { p: P(430, 230, 470), t: P(440, 200, 200), fov: 50 },
        { p: P(330, 290, 260), t: P(300, 185, 0), fov: 52 },
        { p: P(150, 230, 170), t: P(260, 110, -100), fov: 50 },
      ] },
      // 4 -> 5 run: down the aisle, then a long banked arc west over the power stages, behind the cooler
      // (the gaze turns west early, so the light through the mark is in frame from the first third of the run)
      { look: 0.1, dur: 3.6, warp: [[0, 0], [0.42, 0.38], [0.62, 0.6], [1, 1]], pts: [
        { p: P(80, 110, -120), t: P(140, 110, -400), fov: 56 },
        { p: P(115, 125, -330), t: P(-100, 145, -630), fov: 60 },
        { p: P(60, 145, -470), t: P(-380, 155, -660), fov: 60 },
        { p: P(-120, 155, -560), t: P(-700, 170, -560), fov: 60 },
        { p: P(-330, 160, -575), t: P(-860, 190, -540), fov: 58 },
        { p: P(-530, 175, -460), t: P(-940, 205, -500), fov: 56 },
      ] },
      // 5 -> 0 the reveal: pull up and back until the board's power plane shows the mark, hang, dive home
      { look: 0, dur: 5.6, warp: [[0, 0], [0.38, 0.47], [0.62, 0.53], [1, 1]], pts: [
        { p: P(-520, 420, -160), t: P(-600, 120, -300), fov: 56 },
        { p: P(-300, 1000, 60), t: P(-260, 100, -180), fov: 52 },
        { p: P(0, 1650, 290), t: P(0, 0, 0), fov: 50 },
        { p: P(-285, 470, 980), t: P(-285, 630, -110), fov: 46 },
      ] },
    ];
    // phones step back from every stop except the gallery, where the aisle is too narrow and the pose is already set back
    return { stops, legs, closed: true, cardGrid: true, speed: 420, minT: 1.9, maxT: 3.4, speedRef: 320, arriveImpact: 'hit', phonePull: () => lerp(0.32, 0.04, this.wake?.[4] ?? 0) - 0.14 * (this.wake?.[3] ?? 0), phoneFov: 12, phoneLift: 0.14,
      wrap: true, rig: { profile: 'minjerk', lookAhead: 0.22, damp: 9, settle: 3, maxBank: 0.09 } };
  }
  exhibitPose(i) {
    // close to square-on (about 30 degrees off the screen), as far back as the aisle allows; on a portrait
    // screen from further down the aisle and above, so the whole screen sits over the docked card
    const z = SCREEN_Z[i];
    // (portrait: wider, and aimed lower on the screen, so its top clears the bar and its near corner the card)
    return portrait ? { p: V(50, 150, z + 250), t: V(246, 90, z + 20), fov: 58, roll: 0 } : { p: V(38, 128, z + 102), t: V(246, 98, z - 52), fov: 56, roll: 0 };
  }
  depart(from, to, world) {
    this.labelled = false; this.lastFrom = from; document.documentElement.classList.add('moved');
    if (to === 4) { world.ui.setProject(1, 1); setCount(1); }
    if (from === 3) this.enc.lock(); if (from === 1) this.gantry.stop();
  }
  arrive(i, world) { if (!this.labelled) { this.labelled = true; routeLabel(i, this.lastFrom); setNav(i); }
    if (i === 4) this.focusExhibit(world.ui.project); if (i === 3) this.enc.unlock(world.time); if (i === 1) this.gantry.start(world.time); }
  project(i) { setCount(i); this.focusExhibit(i); } // the module seating lands the impact
  focusExhibit(i) {
    this.mem.seat(i, this.world.time);
    const base = this.stops[4], pose = this.exhibitPose(i);
    this.world.rig.nudge(pose.p.clone().sub(base.p), pose.t.clone().sub(base.t));
  }
  arriveSeq(to, from) { return to === 0 && from === 5 ? 'sig' : null; }
  solved() { return this.enc?.solved ?? false; }
  impactCenter(i, world) {
    const a = i === 0 ? this.tower.crownPos : world.route.stops[i].t, s = world.toScreen(a.clone ? a.clone() : V(...a));
    return [s.x / world.view.w, 1 - s.y / world.view.h];
  }
  /** the part each stop's card describes: its leader trace ends just outside the hero's silhouette, never on its face */
  partAt(i) {
    switch (i) {
      case 0: return [-74, -69, -62].map((dx) => this.tower.crownPos.clone().add(V(dx, 0, 0))); // just inside the crown plate's left edge
      case 1: return [V(-132, 10, 262), V(-160, 10, 262), V(-200, 10, 262)]; // the board's right edge, or further in
      case 2: { // the lattice's right-hand edge, as the arrival camera sees it
        const st = this.stops[2], f = st.t.clone().sub(st.p).normalize(), right = V(-f.z, 0, f.x).normalize();
        return [80, 70, 60].map((k) => this.npu.center.clone().addScaledVector(right, k));
      }
      case 3: { // on the cube's left edge, level with its middle row
        const [y, fwd] = [150, 57];
        const d = V(this.stops[3].p.x - SITES.enclave.x, 0, this.stops[3].p.z - SITES.enclave.z).normalize();
        return [-80, -74, -66].map((sd) => V(SITES.enclave.x, y, SITES.enclave.z).addScaledVector(d, fwd).addScaledVector(V(d.z, 0, -d.x), sd));
      }
      case 4: { const z = SCREEN_Z[this.world.ui.project]; return [V(246, 173, z - 114), V(246, 160, z - 114), V(246, 140, z - 114)]; } // beside the bezel's top-left corner, off the glass
      case 5: return [-497, -500, -503].map((z) => V(-1004, 252, z)); // on the mark's right edge
      default: return null;
    }
  }
  ready(world) {
    document.documentElement.classList.add('ready');
    this.cards = initCards({ parts: (i) => this.partAt(i) });
    // the boot plays once per visit (a reload in the same tab lands on the first stop; ?boot plays it again)
    let seen = false; try { seen = sessionStorage.getItem('xini-boot') === '1' && !q.has('boot'); } catch (e) { /* no storage: always play */ }
    if (reduced || q.has('skipintro') || seen) { boardU.uLitR.value = 1e5; this.setOn(1e5); this.crown(1); return; }
    try { sessionStorage.setItem('xini-boot', '1'); } catch (e) { /* fine */ }
    // the boot: black, one power LED, the power floods the mark-shaped plane seen from above, then the
    // camera dives into the machine as the districts light, and the mark on the crown flashes
    const s0 = this.stops[0];
    this.intro = {
      t: 0,
      pc: new THREE.CatmullRomCurve3([V(0, 1650, 290), V(-110, 1100, 700), V(-260, 600, 930), s0.p.clone()], false, 'centripetal'),
      // (the gaze rises onto the crown as the dive closes, so the mark is in frame before it flashes)
      tc: new THREE.CatmullRomCurve3([V(0, 0, 0), V(-40, 80, 100), V(-250, 700, -110), s0.t.clone()], false, 'centripetal'),
      warp: monotone([[0, 0], [0.35, 0.2], [0.8, 0.92], [1, 1]]),
    };
    boardU.uLitR.value = 0; this.setOn(0); this.tower.floorMat.uniforms.uLitY.value = 0; this.crown(0);
    document.documentElement.classList.add('booting');
    const skip = () => {
      const I = this.intro; if (!I) return;
      I.hit = true; I.k = 6; I.t = 2.5 + BOOT_LEAD; this.tower.crown.visible = true;
      if (!I.card) { I.card = true; world.setCard(0, true); }
      world.nav.lockUntil = performance.now() + 350;
      ['wheel', 'keydown', 'pointerdown', 'touchstart'].forEach((e) => removeEventListener(e, skip));
    };
    ['wheel', 'keydown', 'pointerdown', 'touchstart'].forEach((e) => addEventListener(e, skip, { passive: true }));
    post.uFadeCol.value.set(this.pal.ink); post.uFade.value = 1; post.uPlaneR.value = 0; post.uPlaneAmt.value = 0; post.uPlaneLed.value = 0;
    world.nav.lockUntil = performance.now() + 2900 + BOOT_LEAD * 1000;
    document.querySelector('.stop--top').classList.remove('is-current');
    const r = world.rig; r.pose.p.copy(this.intro.pc.getPoint(0)); r.pose.t.copy(this.intro.tc.getPoint(0)); r.pose.fov = 50; r.snap?.();
  }
  crown(k) {
    const g = this.pal;
    this.crownK = k;
    this.tower.front.uniforms.uBase.value.set(g.markBack).multiplyScalar(lerp(0.05, 0.94, k));
    this.tower.back.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.05, 1, k));
  }
  /** parts switch on as the power-on wave reaches them */
  setOn(R) { this.powerR = R; this.applyLights(); }
  /** the lights: the power-on wave (setOn) times each district's wake (one hero awake at a time) */
  applyLights() {
    const R = this.powerR ?? 1e5, on = (d) => clamp((R - d) / 90, 0, 1);
    const g = this.pal, W = this.wake ?? [1, 1, 1, 1, 1, 1], sb = (k) => lerp(STANDBY, 1, W[k]);
    // (the fan's ring goes dark on standby: a pale arc of it hung at the frame's edge from the enclave)
    this.tower.ringMat.uniforms.uOn.value = on(120) * W[0];
    skyU.uLampAmt.value = 0.5 * W[0] * on(400);
    // the cooler's pipes carry no glow; the heat is one small ember at the socket, dim while the visitor is elsewhere
    this.tower.heatMat.uniforms.uOn.value = 0;
    const flick = 0.86 + 0.14 * ((Math.floor((this.world?.time ?? 0) * 12) * 7) % 5) / 4; // a low flicker, on twos
    this.tower.emberMat.uniforms.uGain.value = on(30) * lerp(0.55, 1, W[0]) * flick;
    this.tower.lineMat.uniforms.uBase.value.set(g.signal).multiplyScalar(lerp(0.06, 1, on(240)) * sb(0));
    this.tower.floorMat.uniforms.uBase.value.set(g.signal).multiplyScalar(sb(0));
    this.vrmSeam.uniforms.uGain.value = lerp(0.3, 1, W[0]) * on(150);
    const pj = this.world?.ui?.project ?? 1;
    this.mem.bars.forEach((b, k) => {
      const live = b.userData.j === pj ? W[4] : 0;
      b.material.uniforms.uOn.value = on(330 + b.userData.k * 56) * lerp(0.16, 1, live);
    });
    this.npu.edgeMat.uniforms.uGain.value = lerp(0.04, 1, on(560)) * lerp(0.18, 1, W[2]);
    this.npu.nodeMat.uniforms.uGain.value = lerp(0.04, 1, on(560)) * lerp(0.18, 1, W[2]);
    this.npu.faceMat.uniforms.uAmt.value = W[2];
    if (this.npu.dieMat) this.npu.dieMat.uniforms.uGain.value = lerp(0.04, 1, on(560)) * lerp(0.25, 1, W[2]);
    this.npu.power = on(600);
    this.npu.lattice.visible = on(520) > 0;
    this.enc.laserMat.uniforms.uBase.value.set(g.laser).multiplyScalar(lerp(0.05, 1, on(600)));
    this.gantry.wake = W[1];
    // one mark at a time: while the power plane shows it in the finale, the crown and the light through the panel go out
    const dim = 1 - (this.crownDim ?? 0);
    // one lit mark per frame: away from the last stop the light through the shield is all but out
    this.io.outside.material.uniforms.uGain.value = lerp(0.08, 1, W[5]) * dim;
    this.io.shaftMat.uniforms.uAmt.value = lerp(0.04, 1, W[5]) * dim;
    this.io.patchMat.uniforms.uAmt.value = lerp(0.06, 1, W[5]) * dim;
    this.io.pkMat.uniforms.uGain.value = lerp(0.3, 0.8, W[5]);
    if (this.crownK !== undefined) this.crown(this.crownK);
    const cd = sb(0) * dim;
    this.tower.front.uniforms.uBase.value.multiplyScalar(cd); this.tower.back.uniforms.uBase.value.multiplyScalar(cd);
    // put out, the mark takes the plate's own dark rather than printing as a black mark of its own
    if (dim < 1) { const pl = this.plateCol || (this.plateCol = new THREE.Color("#141c1b")); this.tower.front.uniforms.uBase.value.lerp(pl, 1 - dim); this.tower.back.uniforms.uBase.value.lerp(pl, 1 - dim); }
    this.tower.lineMat.uniforms.uBase.value.multiplyScalar(dim);
  }
  /** one hero awake at a time: the stop you are at; the one you fly to is mostly awake a third of the way in, so the
   *  flight has somewhere to look */
  updateWake(dt, world) {
    const F = world.rig.flight, x = F ? clamp(F.t / F.dur, 0, 1) : 1;
    const target = [0, 1, 2, 3, 4, 5].map((i) => {
      if (this.intro) return i === 0 ? 1 : 0;
      if (F) return i === F.to ? sstep(0.08, 0.42, x) : i === F.from ? 1 - sstep(0.04, 0.4, x) : 0;
      return i === world.rig.index ? 1 : 0;
    });
    if (!this.wake) this.wake = target.slice();
    const k = 1 - Math.exp(-dt * 7);
    this.wake.forEach((w, i) => { this.wake[i] = w + (target[i] - w) * k; });
  }
  update(dt, t, world) {
    const cam = world.camera;
    if (this.intro) {
      // T0 is the boot clock; the picture runs on T, which holds back BOOT_LEAD so the first beat (one LED in
      // the black while the relays pull in) gets the screen to itself once the cover has stepped away
      const I = this.intro; I.t += dt; const T0 = I.t, T = Math.max(0, T0 - BOOT_LEAD), r = world.rig;
      // 1. black, one power LED at the CPU power connector; relays pull in
      post.uPlaneLed.value = sstep(0.04, 0.1, T0) * (1 - sstep(0.9, 1.3, T)) * 1.5;
      const sfx = world.api().sfx;
      I.k = I.k ?? 0;
      while (I.k < 6 && T0 > [0.05, 0.12, 0.2, 0.27, 0.33, 0.38][I.k]) { sfx.play(I.k === 5 ? 'power' : 'relay', { gain: 0.8 }); I.k++; }
      // 2. the power floods the plane; the city fades up beneath it
      // (the plate stays over a board held at a third of its light until the hand-off, so the frame has one drawing)
      post.uPlaneAmt.value = sstep(0.1, 0.16, T) * (1 - sstep(1.3, 1.68, T));
      // the name prints in the corner as the power floods the mark, so the boot never reads as a page still loading
      if (T > 0.55 && !I.brand) { I.brand = true; document.documentElement.classList.add('boot-brand'); }
      post.uPlaneR.value = ease(clamp((T - 0.14) / 0.8, 0, 1)) * 1900;
      post.uFade.value = 1 - 0.3 * sstep(0.3, 0.9, T) - 0.7 * sstep(1.32, 1.7, T);
      // 3. the dive: the districts and the cooler light up as the camera falls toward the spire
      const R = ease(clamp((T - 0.85) / 1.0, 0, 1)) * 1600;
      boardU.uLitR.value = R; this.setOn(R);
      this.tower.floorMat.uniforms.uLitY.value = lerp(150, 800, ease(clamp((T - 1.2) / 0.7, 0, 1)));
      this.crown(sstep(1.5, 1.86, T)); // the mark lights as the dive closes in on it, then the impact lands on it
      this.tower.crown.visible = T > 1.46; // and stands on the crown only once the plate under the dive has gone
      const u = I.warp(clamp((T - 0.95) / 0.95, 0, 1));
      // the dive's curves are smooth already: the view follows them exactly (the rig's damping lagged the fast swing
      // up onto the crown, which then flashed above the frame)
      r.pose.p.copy(I.pc.getPointAt(u)); r.pose.t.copy(I.tc.getPointAt(u)); r.pose.fov = lerp(50, this.stops[0].fov, u); r.snap?.();
      // 4. the signature: the mark on the crown flashes, then the card prints
      if (T > 1.92 && !I.hit) {
        I.hit = true;
        const s = world.toScreen(this.tower.crownPos.clone());
        world.impact.hit({ seq: 'sig', center: [s.x / world.view.w, 1 - s.y / world.view.h], shake: 1 }); world.api().sfx.play('slam');
      }
      // the chrome prints in on the frame after the impact, never inside it
      if (T > 2.14 && !I.card) { I.card = true; world.setCard(0, true); document.documentElement.classList.remove('booting'); }
      if (T >= 2.5) { this.intro = null; this.tower.crown.visible = true; document.documentElement.classList.remove('booting'); boardU.uLitR.value = 1e5; this.setOn(1e5); this.tower.floorMat.uniforms.uLitY.value = 1e5; this.crown(1); post.uFade.value = 0; post.uPlaneAmt.value = 0; post.uPlaneLed.value = 0; }
    } else {
      // the finale: pulling back from the I/O, the power plane shows the mark, then the camera dives home
      const F = world.rig.flight;
      if (F && F.from === 5 && F.to === 0 && !reduced) {
        const x = F.t / F.dur, bump = sstep(0.2, 0.34, x) * (1 - sstep(0.62, 0.76, x));
        post.uPlaneAmt.value = bump; post.uPlaneR.value = 1900 * sstep(0.22, 0.46, x); post.uFade.value = 0.32 * bump;
        // one mark at a time: the crown is out before the plate shows it, and back once it has gone
        this.crownDim = sstep(0.12, 0.22, x) * (1 - sstep(0.68, 0.8, x));
        if (x > 0.3 && !this.revealed) { this.revealed = true; world.api().sfx.play('power'); }
      } else if (post.uPlaneAmt.value > 0 || post.uFade.value > 0) {
        post.uPlaneAmt.value = Math.max(0, post.uPlaneAmt.value - dt * 3); post.uFade.value = Math.max(0, post.uFade.value - dt * 3);
        this.revealed = false; this.crownDim = post.uPlaneAmt.value;
      }
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
    this.updateWake(dt, world); this.applyLights();
    // the route label and the nav change a third of the way into a flight, when the next stop is in sight; in flight
    // the bar steps back so it never sits on the hero
    { const F = world.rig.flight; if (F && !this.labelled && F.t / F.dur >= 0.35) { this.labelled = true; routeLabel(F.to, F.from); setNav(F.to); }
      const fl = !!F && !this.intro; if (fl !== this.flyingCls) { this.flyingCls = fl; document.documentElement.classList.toggle('flying', fl); }
      if (routeGeo && fl) {
        const x = clamp(F.t / F.dur, 0, 1), a = routeGeo.fr[F.from], b = F.from === 5 && F.to === 0 ? 1 : routeGeo.fr[F.to];
        routeAt(lerp(a, b, sstep(0.05, 0.95, x)), x < 0.35 ? F.from : F.to); this.routeFlying = true;
      } else if (this.routeFlying) { this.routeFlying = false; routeAt(routeGeo.fr[world.rig.index], world.rig.index); } }
    const W = this.wake;
    // the cooler's fan: still in the dark, it spins up as the camera dives at the boot and idles slowly while the
    // tower is on standby, so nothing turns at full speed behind another stop; a click spins it harder
    this.fanT = (this.fanT || 0) + dt * (this.intro ? sstep(1.0, 1.9, this.intro.t - BOOT_LEAD) : lerp(0.12, 1, W[0])) + this.spin * dt * 3;
    this.tower.update(this.fanT);
    this.npu.update(t, this.flash, world.rig.index === 2 && !world.rig.flying ? 1 : 0, W[2]);
    this.enc.update(t, dt, world.api().sfx, world.rig.index === 3, W[3]);
    this.gantry.update(t, dt, world.api().sfx);
    this.mem.updateSeat(t, world.api().sfx, (i) => {
      const s = world.toScreen(V(244, 60, SCREEN_Z[i]));
      world.impact.hit({ seq: 'soft', center: [s.x / world.view.w, 1 - s.y / world.view.h], shake: 0.35 });
    });
    this.rest.updateLeds(t);
    this.io.update(t);
    this.city.update(t);
    this.updateFocus(dt, world);
    // project screens wait on standby until you are in the gallery; the chosen one is the only one fully lit
    this.mem.screens.forEach((scr, i) => {
      const u = scr.material.uniforms.uGain;
      const target = lerp(0.12, i === world.ui.project ? 0.92 : 0.3, W[4]);
      u.value += (target - u.value) * (1 - Math.exp(-dt * 5));
      if (scr.userData.flash > 0) u.value = Math.max(u.value, 1 + scr.userData.flash);
    });
  }
  /** the focus follows the subject: at a stop it sits on the hero, in flight it travels to the next and loosens
   *  mid-move (the whole machine reads while you fly), at the boot it only closes once the dive lands */
  updateFocus(dt, world) {
    const F = world.rig.flight, N = this.focusNow;
    const at = (i) => { const f = this.focus[i]; return i === 4 ? { ...f, p: V(244, 100, SCREEN_Z[world.ui.project ?? 1]) } : f; };
    let a, b, k = 1, amt = 1;
    if (F) {
      a = at(F.from); b = at(F.to);
      const x = clamp(F.t / F.dur, 0, 1); k = sstep(0.2, 0.8, x);
      amt = F.from === 5 && F.to === 0 ? 1 - sstep(0.12, 0.3, x) * (1 - sstep(0.7, 0.9, x)) : 1 - 0.55 * Math.sin(Math.PI * x);
    } else a = b = at(world.rig.index);
    if (this.intro) amt = sstep(1.6, 2.4, this.intro.t - BOOT_LEAD);
    const P = a.p.clone().lerp(b.p, k), r0 = lerp(a.r0, b.r0, k), r1 = lerp(a.r1, b.r1, k);
    const s = 1 - Math.exp(-dt * 6);
    N.p.lerp(P, s); N.r0 += (r0 - N.r0) * s; N.r1 += (r1 - N.r1) * s; N.amt += (amt - N.amt) * (this.intro ? 1 : s);
    if (q.has('nofocus')) N.amt = 0;
    post.uFocusP.value.copy(N.p); post.uFocusR0.value = N.r0; post.uFocusR1.value = N.r1; post.uFocusAmt.value = N.amt;
    if (this.fogs) {
      const ia = F ? F.from : world.rig.index, ib = F ? F.to : ia, A = this.fogs[ia], B = this.fogs[ib], T = this._fogT || (this._fogT = [new THREE.Color(), new THREE.Color()]);
      T[0].copy(A[0]).lerp(B[0], k); T[1].copy(A[1]).lerp(B[1], k);
      post.uFogCol.value.lerp(T[0], s); post.uFogHorizon.value.lerp(T[1], s);
    }
    // the speed lines converge on the stop you are flying to, when it is in view
    const sc = post.uSpeedCenter.value;
    let cx = 0.5, cy = 0.5;
    if (F) { const d = world.toScreen(at(F.to).p.clone()); if (!d.behind) { cx = clamp(d.x / world.view.w, 0.15, 0.85); cy = clamp(1 - d.y / world.view.h, 0.15, 0.85); } }
    sc.x += (cx - sc.x) * s; sc.y += (cy - sc.y) * s;
    // the vignette leans toward the subject
    const sp = world.toScreen(N.p.clone()), v = post.uVigC.value;
    const tx = sp.behind ? 0.5 : clamp(0.5 + (sp.x / world.view.w - 0.5) * 0.4, 0.35, 0.65), ty = sp.behind ? 0.5 : clamp(0.5 + (0.5 - sp.y / world.view.h) * 0.4, 0.35, 0.65);
    v.x += (tx - v.x) * s; v.y += (ty - v.y) * s;
  }
  layout(view) {
    this.mirror?.setSize(view.w * view.dpr, view.h * view.dpr); boardU.uScreen.value.set(view.w * view.dpr, view.h * view.dpr);
    // speed lines keep off the bar and the route box (css: a 96px band at the top; the route sits a gutter in, 26px up)
    const gut = Math.min(64, Math.max(18, view.w * 0.04));
    post.uSpeedMask.value.set(96 * view.dpr, (gut + 236) * view.dpr, (26 + 48 + 40) * view.dpr);
  }
  preRender(world) {
    this.cards?.update(world);
    if (!this.mirror || boardU.uReflAmt.value <= 0) return;
    world.camera.updateMatrixWorld();
    // the reflection only re-renders when the camera has moved or the twos clock has ticked
    const cam = world.camera, M = this.mirrorLast || (this.mirrorLast = { p: new THREE.Vector3(1e9, 0, 0), q: new THREE.Quaternion(), step: -1 });
    const still = M.p.distanceToSquared(cam.position) < 0.04 && Math.abs(M.q.dot(cam.quaternion)) > 0.999999 && M.step === shared.uStep.value;
    if (still) return;
    M.p.copy(cam.position); M.q.copy(cam.quaternion); M.step = shared.uStep.value;
    if (this.mirror.render(world.renderer, world.scene, world.camera, this.mirrorHide, this.fogCol)) boardU.uReflMat.value.copy(this.mirror.texMat);
  }
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
  palettes: PALETTES, palette: q.get('palette') || 'verdigris',
  pipeline: { bloom: true },
});
post.uFogAmt.value = 1; post.uFogNear.value = 560; post.uFogFar.value = 4200; post.uFogLine.value = 0.85;
post.uBloomAmt.value = 0.55; post.uBloomDots.value = 0.6;
post.uMisregPx.value = 1.0; post.uGrain.value = 0.035; post.uGradeAmt.value = 0.18;
// a vignette that takes the outer fifth of the frame down, leaning toward the subject (see updateFocus)
post.uVignette.value = 0.5; post.uVigR.value.set(0.3, 0.98);
post.uDepthK.value = 0.045; post.uNormalK.value = 0.35;
// aerial perspective and the grade
post.uHFogAmt.value = 0.55; post.uHFogY.value = 0; post.uHFogK.value = 0.012; post.uFogDirAmt.value = 0.8; post.uFogGlow.value = 0.25;
// print rules: nothing brighter than the cream of the cards, and glows drawn as dots, never airbrushed
post.uCap.value.set(PALETTES.verdigris.gl.cream); post.uCapAmt.value = 1; post.uBloomHard.value = 1;
// a light keeps its own hue as it rolls off into the cream (the green stays the brand's green, warm light stays warm);
// glows are printed on a coarser screen of round dots, the power plane as an inked plate of dots, speed lines as
// solid wedges, and the accent impact frame keys its lines in ink
post.uCapHue.value = 1; post.uBloomCell.value = 6.5; post.uBloomCov.value = 0.5; post.uPlanePrint.value = 1; post.uSpeedPrint.value = 1; post.uImpAccentInk.value = 1;
// glow dots print round a light, never over its face; speed lines are cream over dark and ink over light; the plate's
// front fold prints in cream (the mark is drawn the same way everywhere) and its flood runs out in straight edges at
// 0, 45 and 90 degrees, like a copper pour; far away the ink thins out (a board seen from high up printed every
// part's edge as ruled noise)
post.uBloomOver.value = 1; post.uSpeedInk.value = 1; post.uBloomFlat.value = 0.6; post.uSpeedIn.value = 0.62;
// the signature frame keeps the mark legible: the fold stays paper, its cuts knock out of the ink, no spikes across it
post.uImpTri.value = 1;
post.uPlaneFoldAmt.value = 1; post.uPlaneFold.value.set(PALETTES.verdigris.gl.cream); post.uPlaneOct.value = 1;
post.uLineFarAmt.value = 0.55; post.uLineFar.value.set(1400, 2500);
// standby districts keep a ghost of their line, lose their colour and sink into the haze behind the stop; whatever
// stands between the camera and the stop goes dark instead, a foreground frame
post.uFocusLine.value = 0.8; post.uFocusHaze.value = 0.5; post.uFocusNear.value = 0.8;
// (greyed before it hazes: brass sinking into the teal air passed through olive)
post.uFocusDesat.value = 0.75;
// no lens blur: away from the subject the colour plate slips off its key line instead (a printed defocus), and the
// lines thin and take the air's colour
post.uFocusSoft.value = 0; post.uFocusMisreg.value = 2.2;
if (!q.has('nolut')) setLut(makeLut(gradeVerdigris), q.has('lut') ? +q.get('lut') : 1);
await world.start();
// (for the capture and QA tools)
Object.assign(window.__xini, { post, boardU, skyU, shared });
window.__xini.ready = true;
