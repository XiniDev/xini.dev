import * as THREE from 'three';
import { inkMaterial as baseInk, glowId, shared } from '../../shared/gfx/ink-material.js';
const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });
import { FOLD_FRONT, FOLD_BACK } from '../../shared/ui/marks.js';
import { NOISE, COLOR } from '../../shared/gfx/glsl.js';
import { V, mergedBoxes, boardU, QUIET_GLOW } from './board.js';
import { batchStatic } from '../../shared/gfx/batch.js';

// The tower: a CPU cooler built like the city's corporate spire. Copper heat pipes rise from the
// socket through a fin stack of ~76 floors; the fan is a turbine on its east face; the mark crowns it.
export const TOWER = { cx: -80, cz: -120, finY0: 200, finY1: 770, depth: 150, width: 432, fanR: 200 };
const CROWN_Y = 702;

/** SVG polygon path (M/L/Z) → THREE.Shapes centred on the 120-unit mark box */
export function pathShapes(d, flipY = false) {
  const shapes = [];
  for (const sub of d.split('M').filter((x) => x.trim())) {
    const pts = sub.replace(/Z/g, '').trim().split(/\s*L\s*|\s+/).map((p) => p.split(',').map(Number)).filter((p) => p.length === 2 && !isNaN(p[0]));
    if (pts.length < 3) continue;
    shapes.push(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x - 60, flipY ? 60 - y : y - 60))));
  }
  return shapes;
}

/** the mark as an extruded two-tone badge (faces +z, upright), size = width in world units */
export function markBadge(size, frontMat, backMat, depth = 3) {
  const g = new THREE.Group();
  const s = size / 104;
  [[FOLD_BACK, backMat, depth * 0.7], [FOLD_FRONT, frontMat, depth]].forEach(([d, m, dp]) => {
    pathShapes(d, true).forEach((sh) => g.add(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: dp, bevelEnabled: false }), m)));
  });
  g.scale.setScalar(s);
  return g;
}


/** copper that runs hot: banded ink shading, an ember at the socket, heat pulses rising out of it */
function heatMaterial(pal) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN; out vec3 vV;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vV = mv.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `precision highp float;
      uniform vec3 uBase, uShade, uHeat, uHot, uKeyDir, uRim, uGlint; uniform float uStep, uOn, uId, uTop;
      in vec3 vW; in vec3 vN; in vec3 vV;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
        vec3 V = normalize(-vV), L = normalize(uKeyDir);
        float ndl = dot(N, L);
        vec3 c = ndl > 0.3 ? uBase : (ndl > -0.06 ? mix(uBase, uShade, 0.4) : mix(uBase, uShade, 0.74));
        c = mix(c, uGlint, step(0.55, pow(max(dot(reflect(-L, N), V), 0.0), 28.0)));
        c = mix(c, uRim, step(0.45, pow(1.0 - max(dot(N, V), 0.0), 2.4)) * step(ndl, 0.15));
        float heat = smoothstep(uTop, 26.0, vW.y) * uOn;
        float pulse = step(0.8, fract(vW.y / 64.0 - uStep * 0.9));
        c = mix(c, mix(uHeat, uHot, pulse * 0.35), clamp(heat * (0.8 + 0.2 * pulse), 0.0, 1.0));
        float id = heat > 0.55 ? ${QUIET_GLOW}.0 : uId;
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
      }`,
    uniforms: {
      uBase: { value: new THREE.Color(pal.copperPipe) }, uShade: shared.uShadeTint, uHeat: { value: new THREE.Color(pal.heat) }, uHot: { value: new THREE.Color(pal.heatHot) },
      uKeyDir: shared.uKeyDir, uRim: shared.uRimCol, uGlint: shared.uGlint, uStep: shared.uStep, uOn: { value: 1 }, uId: { value: 177 }, uTop: { value: 120 },
    },
  });
}


/** floor lights on the tower: switch on from the ground up during power-on (uLitY) */
function floorLightMaterial(pal) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `precision highp float;
      uniform vec3 uBase, uHot; uniform float uLitY, uStep;
      in vec3 vW; in vec3 vN;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float on = step(vW.y, uLitY);
        float fl = 0.7 + 0.3 * step(0.5, fract(vW.y * 0.13 + vW.z * 0.004 + uStep * 0.15));
        vec3 c = mix(uBase * 0.06, uBase * fl, on);
        c = mix(c, uHot, on * step(uLitY - 16.0, vW.y));
        gColor = vec4(c, 1.0);
        gNormal = vec4(normalize(vN) * 0.5 + 0.5, ${QUIET_GLOW}.0 / 255.0);
      }`,
    uniforms: { uBase: { value: new THREE.Color(pal.signal) }, uHot: { value: new THREE.Color(pal.hot) }, uLitY: { value: 1e5 }, uStep: shared.uStep },
  });
}

/** emissive ring with two bright segments chasing round it (stepped on twos) */
function chaseRingMaterial(base, hot) {
  return new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
      out vec2 vUv; out vec3 vN;
      void main(){ vUv = uv; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `precision highp float;
      uniform vec3 uBase, uHot; uniform float uStep, uOn, uId;
      in vec2 vUv; in vec3 vN;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float a = fract(vUv.x * 2.0 - uStep * 0.35);
        float seg = smoothstep(0.0, 0.08, a) * (1.0 - smoothstep(0.08, 0.42, a));
        vec3 c = mix(uBase * 0.75, uHot, seg) * uOn + uBase * 0.06 * (1.0 - uOn);
        gColor = vec4(c, 1.0);
        gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
      }`,
    uniforms: { uBase: { value: new THREE.Color(base) }, uHot: { value: new THREE.Color(hot) }, uStep: shared.uStep, uOn: { value: 1 }, uId: { value: glowId() } },
  });
}

export function buildTower(pal, silk) {
  const T = TOWER, { cx, cz } = T;
  const g = new THREE.Group();
  // the socket and the cooler's foot are dark, matte metal: lit bright they made a pale platform at the spire's foot
  // and a slab at the top of the core's frame
  const steel = inkMaterial({ base: '#414c4a', brush: 0.15, spec: 0.5, rim: 0.5 });
  const nickel = inkMaterial({ base: '#4f5957', brush: 0.12, spec: 0.55, rim: 0.5, dotCell: 4.5 });
  const copper = heatMaterial(pal);
  const anod = inkMaterial({ base: pal.anod, brush: 0.15, spec: 0.7, rim: 1 });
  const box = (w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); g.add(b); return b; };

  // ---- socket: retention frame, lever, substrate, lid
  box(300, 9, 32, cx, 0, cz - 134, steel); box(300, 9, 32, cx, 0, cz + 134, steel);
  box(32, 9, 236, cx - 134, 0, cz, steel); box(32, 9, 236, cx + 134, 0, cz, steel);
  box(5, 5, 270, cx + 162, 6, cz, steel); box(5, 5, 26, cx + 162, 6, cz + 146, steel); box(14, 12, 14, cx + 162, 0, cz - 138, steel);
  box(232, 3, 232, cx, 0, cz, inkMaterial({ base: pal.substrate, brush: 0.15, spec: 0.4, rim: 0.6 }));
  box(172, 10, 172, cx, 3, cz, nickel);
  // ---- cooler base and mount (nickel-plated; the heat shows only as the ember at the socket)
  box(150, 26, 150, cx, 13, cz, steel);
  box(176, 12, 176, cx, 39, cz, nickel);
  box(34, 8, 380, cx, 51, cz, steel);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 59, 16), steel); post.position.set(cx, 29.5, cz + s * 180); g.add(post);
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 6, 16), nickel); screw.position.set(cx, 62, cz + s * 180); g.add(screw);
  }
  // ---- heat pipes: three U-pipes, legs rising through the fins
  const pipes = [[-38, 150], [0, 196], [38, 98]];
  const R = 34, yPipe = 30, yTop = 794;
  for (const [dx, a] of pipes) {
    const pts = [];
    const zl = cz - a, zr = cz + a;
    const arc = (zc, yc, from, to) => { for (let k = 0; k <= 8; k++) { const t = from + (to - from) * (k / 8); pts.push(V(cx + dx, yc + Math.sin(t) * R, zc + Math.cos(t) * R)); } };
    for (let y = yTop; y > yPipe + R; y -= 40) pts.push(V(cx + dx, y, zl));
    arc(zl + R, yPipe + R, Math.PI, Math.PI * 1.5);
    for (let z = zl + R + 30; z < zr - R - 10; z += 30) pts.push(V(cx + dx, yPipe, z));
    arc(zr - R, yPipe + R, Math.PI * 1.5, Math.PI * 2);
    for (let y = yPipe + R + 40; y <= yTop; y += 40) pts.push(V(cx + dx, y, zr));
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.1);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 220, 6, 12, false), copper);
    g.add(tube);
    for (const z of [zl, zr]) { const dome = new THREE.Mesh(new THREE.SphereGeometry(6, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), nickel); dome.position.set(cx + dx, yTop, z); g.add(dome); }
  }
  // ---- fin stack: ~76 floors, one draw
  // thirty heavy plates, drawn like floors: three flat steel values that lighten as the stack rises, so the eye
  // climbs to the mark; brass only in the rims. The core between them is one flat dark value.
  const FIN = 19, bands = [[], [], []], H = T.finY1 - T.finY0;
  for (let y = T.finY0; y <= T.finY1 - 10; y += FIN) bands[y < T.finY0 + H * 0.3 ? 0 : y < T.finY0 + H * 0.62 ? 1 : 2].push({ p: [cx, y, cz], s: [T.depth, 6, T.width] });
  box(T.depth * 0.46, H, T.width * 0.84, cx, T.finY0, cz, inkMaterial({ base: '#1f2926', brush: 0.08, spec: 0, rim: 0, dot: 0 }));
  // no rim light on the plates: seen from below, their undersides would light up whole and stripe the tower
  ['#3a4642', '#47544e', pal.fin].forEach((base, k) => g.add(new THREE.Mesh(mergedBoxes(bands[k]), inkMaterial({ base, brush: 0.08, spec: 0.2, rim: 0, mid: 0.36, dark: 0.7, dotCell: 4.5 }))));
  // corner posts frame the stack; some floors carry a line of light, like a tower at night
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(5, T.finY1 - T.finY0 + 6, 5, cx + sx * (T.depth / 2 + 1), T.finY0 - 4, cz + sz * (T.width / 2 + 1), anod);
  const lit = [];
  for (let i = 0, y = T.finY0; y <= T.finY1 - 10; y += FIN, i++) {
    if (y < 500 || y > 610) continue;
    const w = T.depth * (0.35 + ((i * 37) % 10) / 16), x0 = cx - T.depth / 2 + ((i * 53) % 7) * 6;
    lit.push({ p: [Math.min(x0 + w / 2, cx + T.depth / 2 - w / 2), y + 0.2, cz + T.width / 2 + 0.6], s: [w, 1.4, 1.4] });
    if (i % 2) lit.push({ p: [cx - T.depth / 2 + 0.6, y + 0.2, cz + T.width / 2 - 40 - (i % 7) * 30], s: [1.4, 1.4, 60 + (i % 3) * 40] });
  }
  const floorLights = new THREE.Mesh(mergedBoxes(lit), floorLightMaterial(pal));
  g.add(floorLights);
  // ---- crown: top cap with the mark inlaid, and a crown plate on the south face
  box(164, 12, 446, cx, 772, cz, anod);
  box(150, 4, 432, cx, 784, cz, inkMaterial({ base: pal.anod2, brush: 0.12, spec: 0.8, rim: 1 }));
  const front = inkMaterial({ base: pal.signal, emissive: true }), back = inkMaterial({ base: pal.markBack, emissive: true });
  // (no mark on the cap: from above, at the boot and the finale, it stood beside the printed plane as a second mark)
  box(156, 168, 8, cx, 616, cz + T.width / 2 + 4 + 4, anod);
  const crown = markBadge(124, front, back, 3.5);
  crown.position.set(cx, CROWN_Y, cz + T.width / 2 + 12.2);
  crown.userData.dynamic = true; // (shown only once the boot's printed plane has gone: one mark per frame)
  g.add(crown);
  const lineMat = inkMaterial({ base: pal.signal, emissive: true });
  for (const [w, h, x, y] of [[140, 2.4, 0, 628], [140, 2.4, 0, 776], [2.4, 148, -69, 628], [2.4, 148, 69, 628]]) box(w, h, 2, cx + x, y, cz + T.width / 2 + 12.6, lineMat);
  // ---- the fan: a turbine on the east face
  const fanX = cx + T.depth / 2 + 1, fanY = (T.finY0 + T.finY1) / 2;
  const frameShape = new THREE.Shape();
  const S2 = 216, rc = 30;
  frameShape.moveTo(-S2 + rc, -S2); frameShape.lineTo(S2 - rc, -S2); frameShape.quadraticCurveTo(S2, -S2, S2, -S2 + rc);
  frameShape.lineTo(S2, S2 - rc); frameShape.quadraticCurveTo(S2, S2, S2 - rc, S2); frameShape.lineTo(-S2 + rc, S2);
  frameShape.quadraticCurveTo(-S2, S2, -S2, S2 - rc); frameShape.lineTo(-S2, -S2 + rc); frameShape.quadraticCurveTo(-S2, -S2, -S2 + rc, -S2);
  const hole = new THREE.Path(); hole.absarc(0, 0, T.fanR, 0, Math.PI * 2, true); frameShape.holes.push(hole);
  const frameGeo = new THREE.ExtrudeGeometry(frameShape, { depth: 26, bevelEnabled: false, curveSegments: 48 });
  const fan = new THREE.Group(); fan.position.set(fanX, fanY, cz); fan.rotation.y = Math.PI / 2; g.add(fan);
  fan.add(new THREE.Mesh(frameGeo, inkMaterial({ base: pal.fanFrame, brush: 0.15, spec: 0.4, rim: 0.4 })));
  // the rotor sits flattened inside the frame's depth: the pitched blade tips used to stand proud of the tower's
  // face and read as loose spikes from the spire's front
  const rotor = new THREE.Group(); rotor.position.z = 8; rotor.scale.z = 0.42; rotor.userData.dynamic = true; fan.add(rotor);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(60, 64, 22, 32), inkMaterial({ base: pal.fanFrame, brush: 0.12, spec: 0.5, rim: 0.4 }));
  hub.rotation.x = Math.PI / 2; rotor.add(hub);
  const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(40, 40, 2, 32), inkMaterial({ base: pal.anod2, spec: 0.6, rim: 0.4 }));
  hubCap.rotation.x = Math.PI / 2; hubCap.position.z = 12; rotor.add(hubCap);
  // matte blades: a pitched blade catching the key light read as a lone pale shard from the enclave
  const bladeMat = inkMaterial({ base: pal.blade, brush: 0.15, spec: 0, rim: 0, side: THREE.DoubleSide });
  for (let i = 0; i < 7; i++) {
    const sh = new THREE.Shape();
    const r0 = 58, r1 = 194, a0 = -0.28, a1 = 0.34, sweep = 0.32;
    sh.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0);
    sh.quadraticCurveTo(Math.cos(a0 + sweep * 0.4) * (r0 + r1) * 0.5, Math.sin(a0 + sweep * 0.4) * (r0 + r1) * 0.5, Math.cos(a0 + sweep) * r1, Math.sin(a0 + sweep) * r1);
    sh.quadraticCurveTo(Math.cos((a0 + a1) / 2 + sweep * 1.1) * (r1 + 6), Math.sin((a0 + a1) / 2 + sweep * 1.1) * (r1 + 6), Math.cos(a1 + sweep) * r1, Math.sin(a1 + sweep) * r1);
    sh.quadraticCurveTo(Math.cos(a1 + sweep * 0.4) * (r0 + r1) * 0.5, Math.sin(a1 + sweep * 0.4) * (r0 + r1) * 0.5, Math.cos(a1) * r0, Math.sin(a1) * r0);
    sh.lineTo(Math.cos(a0) * r0, Math.sin(a0) * r0);
    const bg = new THREE.ExtrudeGeometry(sh, { depth: 2.5, bevelEnabled: false, curveSegments: 10 });
    const b = new THREE.Mesh(bg, bladeMat);
    const holder = new THREE.Group(); holder.rotation.z = (i / 7) * Math.PI * 2; holder.add(b);
    b.rotation.x = 0.42; // pitch
    rotor.add(holder);
  }
  // motor struts behind the blades
  for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(8, 150, 6), inkMaterial({ base: pal.fanFrame, brush: 0.15, spec: 0.5 })); s.position.set(Math.cos(i * Math.PI / 2 + 0.6) * 128, Math.sin(i * Math.PI / 2 + 0.6) * 128, 3); s.rotation.z = i * Math.PI / 2 + 0.6 + Math.PI / 2; fan.add(s); }
  const ringMat = chaseRingMaterial(pal.signalDeep, pal.signal);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(T.fanR + 1, 3.2, 8, 96), ringMat); ring.position.z = 27; fan.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(T.fanR + 1, 2.2, 6, 96), ringMat); ring2.position.z = -1; fan.add(ring2);

  // ---- the ember: one vermilion light at the socket's front edge, the only warm light in the machine (big enough to
  // read as a bead with its printed halo, not a smudge)
  const emberMat = inkMaterial({ base: pal.heat, emissive: true });
  box(18, 7, 6, cx + 52, 5, cz + 152, emberMat);
  // ---- legend and shadows around the socket
  if (silk) {
    silk.ao(cx, cz, 310, 310, 10, 0.9);
    for (const s of [-1, 1]) silk.aoDisc(cx, cz + s * 180, 16, 6, 0.9);
    for (const [x, z] of [[-170, -170], [170, -170], [170, 170], [-170, 170]]) { silk.ring(cx + x, cz + z, 7, 12); silk.text('○', cx + x, cz + z, 4); }
    silk.rect(cx, cz, 316, 316, 1.4);
    silk.text('CPU1', cx - 158, cz - 168, 12, { weight: '700' });
    silk.text('SOCKET XN-01  ·  4 HEAT PIPES', cx - 150, cz + 186, 6.5);
    silk.text('注意 高溫  CAUTION HOT SURFACE', cx + 30, cz - 160, 6);
    silk.line([[cx - 160, cz + 250], [cx + 160, cz + 250]], 1.4);
  }

  batchStatic(rotor);
  const update = (t) => {
    const step = Math.floor(t * 12) / 12;
    rotor.rotation.z = -step * 2.6;
  };
  return { group: g, update, ringMat, heatMat: copper, emberMat, floorMat: floorLights.material, fan, crown, crownPos: V(cx, CROWN_Y, cz + T.width / 2 + 12), topPos: V(cx, 790, cz), front, back, lineMat };
}
