import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// A sky dome that follows the camera: zenith colour, a bright band of city glow at the horizon,
// a moon with a printed halo, sparse stars, painted cloud streaks. Matches the post fog at the horizon.
export const skyU = {
  uZenith: { value: new THREE.Color('#0a0b2a') },
  uHorizon: { value: new THREE.Color('#4a2668') },
  uGlow: { value: new THREE.Color('#c85a7c') },
  uMoonDir: { value: new THREE.Vector3(-0.35, 0.32, -0.88).normalize() },
  uMoon: { value: new THREE.Color('#f3ecd8') },
  uMoonSize: { value: 0.035 },
  uStreak: { value: new THREE.Color('#6a3a7e') },
  uDot: { value: new THREE.Color('#07060d') },
  uStars: { value: 0.6 },
  uBand: { value: 0.18 },
  uStreakAmt: { value: 0.55 },
  // a broad lamp glow somewhere in the sky (no disc): backlights a skyline
  uLampDir: { value: new THREE.Vector3(0, 0.3, -1).normalize() }, uLampCol: { value: new THREE.Color('#ffffff') }, uLampAmt: { value: 0 }, uLampPow: { value: 6 },
  // uLampPrint 1: the glow is printed, a screen of round dots that grow toward its centre (no airbrush), cell in px
  uLampPrint: { value: 0 }, uLampCell: { value: 6.5 },
};

export function makeSky({ radius = 4000, px }) {
  const geo = new THREE.SphereGeometry(radius, 48, 24);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vDir;
      void main(){ vDir = normalize(position); vec4 p = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); gl_Position = vec4(p.xy, p.w * 0.99999, p.w); }`,
    fragmentShader: /* glsl */ `precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uZenith, uHorizon, uGlow, uMoonDir, uMoon, uStreak, uDot, uLampDir, uLampCol; uniform float uMoonSize, uStars, uBand, uPx, uLampAmt, uLampPow, uStreakAmt, uLampPrint, uLampCell;
      in vec3 vDir;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 d = normalize(vDir);
        float el = d.y;
        vec3 c = mix(uHorizon, uZenith, smoothstep(-0.02, 0.55, el));
        // city glow hugging the horizon
        c = mix(c, uGlow, exp(-max(el, -0.2) * max(el, -0.2) / (uBand * uBand)) * 0.85);
        // lamp glow, printed as dots where it fades out
        if (uLampAmt > 0.0) {
          float lg = pow(max(dot(d, normalize(uLampDir)), 0.0), uLampPow) * uLampAmt;
          if (uLampPrint > 0.5) {
            // a halo, not a wash: no dots where the glow is faint, so the sky away from it stays clean
            c += uLampCol * halftone(gl_FragCoord.xy, uLampCell * uPx, 0.785, clamp((lg - 0.05) * 1.15, 0.0, 0.48));
          } else {
            float ld = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.4, clamp(lg * 1.4, 0.0, 1.0));
            c += uLampCol * mix(lg, max(lg, ld * 0.22), smoothstep(0.05, 0.3, lg) * (1.0 - smoothstep(0.3, 0.7, lg)));
          }
        }
        // painted cloud streaks (long horizontal strokes)
        vec2 sp = vec2(atan(d.z, d.x) * 3.0, el * 18.0);
        float st = fbm2(sp * vec2(1.0, 1.0) + vec2(0.0, 3.0));
        c = mix(c, uStreak, smoothstep(0.58, 0.75, st) * smoothstep(0.05, 0.3, el) * (1.0 - smoothstep(0.45, 0.8, el)) * uStreakAmt);
        // moon with a printed halo
        float m = dot(d, normalize(uMoonDir));
        float disc = smoothstep(1.0 - uMoonSize * 0.012, 1.0 - uMoonSize * 0.010, m);
        float halo = smoothstep(1.0 - uMoonSize * 0.25, 1.0, m);
        float hd = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.3, halo * 0.8);
        c = mix(c, uMoon * 0.55 + c * 0.45, hd * 0.6);
        c = mix(c, uMoon, disc);
        // sparse stars
        vec2 g = floor(gl_FragCoord.xy / (3.0 * uPx));
        float s = step(0.9975, hash12(g + floor(d.xz * 10.0))) * smoothstep(0.15, 0.6, el) * uStars;
        c = mix(c, vec3(1.0), s);
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 0.0);
      }`,
    uniforms: { ...skyU, uPx: px },
    side: THREE.BackSide, depthWrite: false,
  });
  const m = new THREE.Mesh(geo, mat);
  m.frustumCulled = false;
  m.renderOrder = -900;
  return m;
}

/** Skylane traffic: little lights flowing along curves (on twos), one draw call. */
export function makeTraffic({ lanes, count = 240, mat }) {
  const geo = new THREE.BoxGeometry(2.2, 0.8, 5);
  const im = new THREE.InstancedMesh(geo, mat, count);
  im.frustumCulled = false;
  const cars = Array.from({ length: count }, (_, i) => ({ lane: i % lanes.length, u: Math.random(), v: (0.012 + Math.random() * 0.02) * (Math.random() < 0.5 ? 1 : -1) }));
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), Sv = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 0, 1);
  const update = (t) => {
    cars.forEach((c, i) => {
      const lane = lanes[c.lane];
      const u = ((c.u + t * c.v) % 1 + 1) % 1;
      const p = lane.getPointAt(u), tan = lane.getTangentAt(u);
      Q.setFromUnitVectors(up, tan);
      M.compose(p, Q, Sv); im.setMatrixAt(i, M);
    });
    im.instanceMatrix.needsUpdate = true;
  };
  update(0);
  return { mesh: im, update };
}
