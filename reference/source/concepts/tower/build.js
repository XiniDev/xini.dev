import * as THREE from 'three';
import { inkMaterial as baseInk, glowId, shared } from '../../shared/gfx/ink-material.js';
import { NOISE, COLOR } from '../../shared/gfx/glsl.js';
import { facadeMaterial, towerBox } from '../../shared/gfx/facade.js';
import { mergedBoxes, labelPlane, lightMaterial, QUIET_GLOW } from '../machine/board.js';
import { markBadge } from '../machine/tower.js';
import { latticeMast } from '../loop/stations.js';

// The megatower: a brutalist block with a hollow atrium through its full height. Floors ring the
// atrium every 30 m, each with a red light under its edge; five floors open up into tall halls.
export const inkMaterial = (o) => baseInk({ brushScale: 0.08, dotCell: 4.5, ...o });
export const V = (x, y, z) => new THREE.Vector3(x, y, z);
export const T = { H: 1200, R: 120, A: 55, wall: 72, pitch: 30 };
export const FLOORS = { systems: 990, ai: 750, security: 510, work: 270, contact: 0 };
const open = Object.values(FLOORS);
const isOpen = (y) => open.some((y0) => y > y0 + 1 && y < y0 + 89);

const box = (parent, w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); parent.add(b); return b; };
/** a square ring of four boxes between half-widths r0 and r1 */
const ring = (list, r0, r1, y, h) => {
  const w = r1 - r0, c = (r0 + r1) / 2;
  list.push({ p: [0, y + h / 2, -c], s: [r1 * 2, h, w] }, { p: [0, y + h / 2, c], s: [r1 * 2, h, w] });
  list.push({ p: [-c, y + h / 2, 0], s: [w, h, r0 * 2] }, { p: [c, y + h / 2, 0], s: [w, h, r0 * 2] });
};

export function buildTower(pal) {
  const g = new THREE.Group();
  const concrete = inkMaterial({ base: pal.concrete, brush: 0.22, spec: 0.15, rim: 0.8, stroke: 0.16, mid: 0.4, dark: 0.76 });
  const concreteDark = inkMaterial({ base: pal.concreteDark, brush: 0.22, spec: 0.1, rim: 0.7, stroke: 0.16 });
  const red = inkMaterial({ base: pal.signal, emissive: true });
  const redQuiet = inkMaterial({ base: pal.signal, emissive: true, id: QUIET_GLOW });
  const white = inkMaterial({ base: pal.lamp, emissive: true });
  const { H, R, A } = T;

  // ---- exterior: corner piers, curtain walls with fins, belts
  const piers = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) piers.push({ p: [sx * (R - 22), H / 2 + 8, sz * (R - 22)], s: [44, H + 16, 44] });
  g.add(new THREE.Mesh(mergedBoxes(piers), concrete));
  const curtain = new THREE.InstancedMesh(towerBox(), facadeMaterial(), 4);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion();
  [[0, R - 4, 0, 0], [0, -(R - 4), Math.PI, 0], [R - 4, 0, Math.PI / 2, 0], [-(R - 4), 0, -Math.PI / 2, 0]].forEach(([x, z, ry], i) => {
    const y0 = i === 0 ? 92 : 0;
    M.compose(V(x, y0, z), Q.setFromAxisAngle(V(0, 1, 0), ry), V(152, H - y0, 6)); curtain.setMatrixAt(i, M);
  });
  curtain.frustumCulled = false; g.add(curtain);
  const fins = [];
  for (const side of [0, 1, 2, 3]) for (let k = -3; k <= 3; k++) {
    const u = k * 21, y0 = side === 0 ? 92 : 0, h = H - y0, o = R + 1;
    if (side < 2) fins.push({ p: [u, y0 + h / 2, side === 0 ? o : -o], s: [3, h, 10] }); else fins.push({ p: [side === 2 ? o : -o, y0 + h / 2, u], s: [10, h, 3] });
  }
  for (const y of [300, 600, 900]) ring(fins, R - 2, R + 8, y, 14);
  ring(fins, R - 2, R + 10, 1176, 24);
  g.add(new THREE.Mesh(mergedBoxes(fins), concreteDark));
  const belts = [];
  for (const y of [300, 600, 900, 1176]) { ring(belts, R + 8.2, R + 8.6, y - 2.5, 1.6); }
  g.add(new THREE.Mesh(mergedBoxes(belts), red));
  // the lobby front: canopy, glass doors, a lit band
  box(g, 200, 6, 60, 0, 90, R + 26, concreteDark);
  box(g, 190, 1.4, 1.4, 0, 89, R + 55.5, red);
  for (let k = -3; k <= 3; k++) box(g, 2.4, 90, 2.4, k * 24, 0, R - 2, inkMaterial({ base: pal.steel, spec: 0.8, rim: 1 }));
  // the doors are glass: a faint sheen that only adds light, so the street shows through
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(150, 88), lightMaterial({
    color: pal.lamp,
    vertex: /* glsl */ `in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; in vec2 vUv; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float streak = step(0.92, fract((vUv.x + vUv.y * 0.6) * 5.0)); gColor = vec4(uColor, 0.025 + streak * 0.05); gNormal = vec4(0.0); }`,
  }));
  glass.position.set(0, 44, R - 2); g.add(glass);

  // ---- atrium: slabs, edge fascias with red light, office walls set back
  const slabs = [], fascia = [], strips = [], rails = [];
  for (let y = T.pitch; y < H; y += T.pitch) {
    if (isOpen(y)) continue;
    ring(slabs, A, R - 2, y - 2.5, 2.5);
    ring(fascia, A - 1.2, A + 1.5, y - 6, 6);
    ring(strips, A - 1.6, A - 1.1, y - 6.4, 1.2);
    ring(rails, A + 0.2, A + 0.9, y + 9, 0.8);
  }
  ring(slabs, A, R - 2, H - 4, 8);
  // atrium floor (the lobby) is the street plane; corner columns frame the shaft
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) slabs.push({ p: [sx * (A + 4), H / 2, sz * (A + 4)], s: [8, H, 8] });
  g.add(new THREE.Mesh(mergedBoxes(slabs), concrete));
  g.add(new THREE.Mesh(mergedBoxes(fascia), concreteDark));
  const stripMesh = new THREE.Mesh(mergedBoxes(strips), redQuiet); g.add(stripMesh);
  g.add(new THREE.Mesh(mergedBoxes(rails), inkMaterial({ base: pal.steel, spec: 0.9, rim: 1 })));
  // office walls between the open floors (windows from the facade shader, facing the atrium)
  const spans = [];
  let y = T.pitch; const tops = [...open.map((y0) => [y0, y0 + 90])].sort((a, b) => a[0] - b[0]);
  let cur = 90;
  for (const [a, b] of tops.slice(1)) { spans.push([cur, a]); cur = b; }
  spans.push([cur, H - 4]);
  const walls = new THREE.InstancedMesh(towerBox(), facadeMaterial(), spans.length * 4);
  let n = 0;
  for (const [y0, y1] of spans) [[0, -T.wall, 0], [0, T.wall, Math.PI], [-T.wall, 0, Math.PI / 2], [T.wall, 0, -Math.PI / 2]].forEach(([x, z, ry]) => {
    // the face that looks into the atrium carries the windows
    M.compose(V(x, y0, z), Q.setFromAxisAngle(V(0, 1, 0), ry), V(T.wall * 2, y1 - y0, 2)); walls.setMatrixAt(n++, M);
  });
  walls.frustumCulled = false; g.add(walls);

  // ---- roof: slab, parapet, the light ring round the atrium, the sign, a mast
  const roof = [];
  ring(roof, R - 3, R + 10, H + 4, 16);
  ring(roof, A - 4, A, H + 4, 5);
  g.add(new THREE.Mesh(mergedBoxes(roof), concreteDark));
  const ringL = []; ring(ringL, A - 4.4, A - 3.8, H + 7, 1.4); g.add(new THREE.Mesh(mergedBoxes(ringL), white));
  for (const [x, z, w, d] of [[-70, -80, 34, 24], [-30, -88, 30, 20], [70, -84, 26, 30], [84, -40, 22, 22]]) {
    box(g, w, 14, d, x, H + 4, z, concreteDark);
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(Math.min(w, d) * 0.35, Math.min(w, d) * 0.35, 1.5, 20), inkMaterial({ base: pal.steel, spec: 0.8 })); fan.position.set(x, H + 18.8, z); g.add(fan);
  }
  const mast = latticeMast({ h: 170, w: 10, taper: 0.3, step: 10, mat: inkMaterial({ base: pal.steel, spec: 0.8, rim: 1, instanced: true }) }); mast.position.set(-96, H + 4, -96); g.add(mast);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(3, 10, 6), inkMaterial({ base: pal.signal, emissive: true })); beacon.position.set(-96, H + 176, -96); g.add(beacon);
  // the mark, two storeys tall, on a steel frame at the south edge
  const signFrame = latticeMast({ h: 34, w: 6, taper: 1, step: 8, mat: inkMaterial({ base: pal.steel, spec: 0.8, rim: 1, instanced: true }) });
  [-60, 60].forEach((x) => { const f = signFrame.clone(); f.position.set(x, H + 20, R - 14); g.add(f); });
  box(g, 150, 6, 8, 0, H + 52, R - 14, inkMaterial({ base: pal.steel, spec: 0.8, rim: 1 }));
  const front = inkMaterial({ base: pal.signal, emissive: true }), back = inkMaterial({ base: pal.lamp, emissive: true });
  const mark = markBadge(124, front, back, 6); mark.position.set(0, H + 118, R - 12); g.add(mark);
  for (const x of [-56, -28, 0, 28, 56]) box(g, 4, 3, 4, x, H + 58, R - 8, white);
  // two searchlights on the roof corners sweep the clouds (light only, no ink)
  const beamGeo = new THREE.CylinderGeometry(1.5, 60, 1600, 24, 1, true); beamGeo.translate(0, 800, 0);
  const beamMat = lightMaterial({
    color: pal.lamp,
    vertex: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY; void main(){ vY = position.y / 1600.0; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uAmt; in float vY; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, pow(1.0 - vY, 1.8) * 0.07 * uAmt); gNormal = vec4(0.0); }`,
    uniforms: { uAmt: { value: 1 } },
  });
  const lights = [[-100, -100, 0.0], [100, 100, 2.1]].map(([x, z, ph]) => {
    const pivot = new THREE.Group(); pivot.position.set(x, H + 22, z); g.add(pivot);
    const beam = new THREE.Mesh(beamGeo, beamMat); beam.frustumCulled = false; pivot.add(beam);
    box(pivot, 10, 8, 10, 0, -8, 0, concreteDark);
    return { pivot, ph };
  });
  const updateLights = (t) => { const st = Math.floor(t * 12) / 12; lights.forEach((l) => { l.pivot.rotation.set(0.55 + Math.sin(st * 0.23 + l.ph) * 0.18, st * 0.17 + l.ph, 0, 'YXZ'); }); };
  return { group: g, beacon, stripMat: redQuiet, markFront: front, markBack: back, markPos: V(0, H + 118, R - 12), updateLights, beamMat };
}

/** the street: wet asphalt that reflects the city, with roads and painted lines */
export const streetU = { uRefl: { value: null }, uReflMat: { value: new THREE.Matrix4() }, uReflAmt: { value: 0.8 } };
export function buildStreet(pal, size = 7000) {
  const geo = new THREE.PlaneGeometry(size, size, 1, 1); geo.rotateX(-Math.PI / 2);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat; out vec3 vW; out vec3 vV; out vec3 vN; out vec4 vR;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vR = uReflMat * w; vec4 mv = viewMatrix * w; vV = mv.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uAsphalt, uLine, uStone, uDot; uniform sampler2D uRefl; uniform float uReflAmt, uPx, uStep;
      in vec3 vW; in vec3 vV; in vec3 vN; in vec4 vR;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN), Vv = normalize(-vV);
        // blocks of 220 m with 40 m roads; the tower stands on a stone plaza
        vec2 q = mod(vW.xz + 110.0, 220.0) - 110.0;
        float road = max(step(90.0, abs(q.x)), step(90.0, abs(q.y)));
        float plaza = step(max(abs(vW.x), abs(vW.z)), 170.0);
        vec3 c = mix(uStone, uAsphalt, road) * (0.85 + 0.3 * vnoise2(vW.xz * 0.05));
        c = mix(c, uStone * 0.9, plaza);
        float dash = step(abs(abs(q.x) - 110.0), 0.6) * step(0.5, fract(vW.z / 12.0)) + step(abs(abs(q.y) - 110.0), 0.6) * step(0.5, fract(vW.x / 12.0));
        c = mix(c, uLine, clamp(dash, 0.0, 1.0) * road * (1.0 - plaza) * 0.8);
        // puddles: patches of mirror, rain rings on twos
        float wet = smoothstep(0.42, 0.58, fbm2(vW.xz * 0.012)) * 0.7 + 0.3;
        vec2 ruv = vR.xy / vR.w;
        vec2 rip = (vec2(vnoise2(vW.xz * 0.3 + uStep * 7.0), vnoise2(vW.xz * 0.3 - uStep * 5.0)) - 0.5) * 0.004;
        vec3 rc = texture(uRefl, ruv + rip).rgb;
        float fres = mix(0.25, 0.9, pow(1.0 - max(dot(N, Vv), 0.0), 2.0));
        float rl = luma(rc);
        float rd = halftone(gl_FragCoord.xy, 3.6 * uPx, 0.4, clamp(rl * 1.6, 0.0, 1.0));
        c += rc * fres * wet * mix(rd, 1.0, smoothstep(0.3, 0.7, rl)) * uReflAmt;
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, 197.0 / 255.0);
      }`,
    uniforms: { ...streetU, uAsphalt: { value: new THREE.Color(pal.asphalt) }, uLine: { value: new THREE.Color(pal.roadLine) }, uStone: { value: new THREE.Color(pal.stone) }, uDot: shared.uDotInk, uPx: shared.uPx, uStep: shared.uStep },
  });
  const m = new THREE.Mesh(geo, mat); m.renderOrder = -10;
  return m;
}

/** rain: streaks that fall on twos, wrapped round the camera */
export function buildRain(pal, count = 2600) {
  const pos = new Float32Array(count * 6), seed = new Float32Array(count * 2);
  let s = 3; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < count; i++) {
    const x = r() * 600, y = r() * 600, z = r() * 600, len = 10 + r() * 14;
    pos.set([x, y, z, x + 2.2, y - len, z + 0.8], i * 6); seed[i * 2] = seed[i * 2 + 1] = r();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const mat = lightMaterial({
    color: pal.rain,
    vertex: /* glsl */ `in vec3 position; in float seed; uniform mat4 viewMatrix, projectionMatrix; uniform vec3 cameraPosition; uniform float uStep, uSpeed; out float vA;
      void main(){
        vec3 p = position - vec3(uStep * uSpeed * 0.12, uStep * uSpeed * (0.9 + seed * 0.3), uStep * uSpeed * 0.04);
        p = mod(p - cameraPosition + 300.0, 600.0) - 300.0 + cameraPosition;
        vec4 mv = viewMatrix * vec4(p, 1.0);
        vA = smoothstep(300.0, 60.0, length(p - cameraPosition)) * smoothstep(3.0, 20.0, -mv.z) * (0.4 + 0.6 * seed);
        gl_Position = projectionMatrix * mv;
      }`,
    fragment: /* glsl */ `precision highp float; uniform vec3 uColor; uniform float uAmt; in float vA;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, vA * 0.42 * uAmt); gNormal = vec4(0.0); }`,
    uniforms: { uStep: shared.uStep, uSpeed: { value: 520 }, uAmt: { value: 1 } },
  });
  const lines = new THREE.LineSegments(geo, mat); lines.frustumCulled = false; lines.renderOrder = 60;
  return lines;
}
