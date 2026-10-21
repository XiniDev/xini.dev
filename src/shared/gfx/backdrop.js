import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// Full-screen painted backdrop drawn first into the scene targets (id 0: no ink lines).
// A vertical gradient that steps into halftone, plus soft painted cloud masses.
export const backdrop = {
  uTop: { value: new THREE.Color('#0d0b1c') },
  uBottom: { value: new THREE.Color('#1d1640') },
  uDot: { value: new THREE.Color('#06050c') },
  uGlowCol: { value: new THREE.Color('#2b6b52') },
  uGlowPos: { value: new THREE.Vector2(0.7, 0.55) },
  uGlowAmt: { value: 0.35 },
  uCloud: { value: 0.18 },
  uDotAmt: { value: 0.55 },
  uDotCell: { value: 7.0 },
  uShift: { value: new THREE.Vector2(0, 0) },
  uGridCol: { value: new THREE.Color('#eee6d3') },
  uGridAmt: { value: 0.0 },
  uGridCell: { value: 56.0 },
  uShaftAmt: { value: 0.0 },
  uShaftCol: { value: new THREE.Color('#e9c98a') },
  uShaftSrc: { value: new THREE.Vector2(0.15, 1.15) },
  uShaftDir: { value: 0.0 },
};

export function makeBackdrop(px) {
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uTop, uBottom, uDot, uGlowCol, uGridCol, uShaftCol; uniform vec2 uGlowPos, uShift, uShaftSrc; uniform float uGlowAmt, uCloud, uDotAmt, uDotCell, uPx, uStep, uGridAmt, uGridCell, uShaftAmt, uShaftDir;
      uniform vec2 uRes;
      in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec2 uv = vUv + uShift;
        vec2 asp = vec2(uRes.x / uRes.y, 1.0);
        float t = smoothstep(0.0, 1.0, uv.y);
        vec3 c = mix(uBottom, uTop, t);
        // painted cloud masses (low frequency, brushy)
        float cl = fbm2(uv * asp * vec2(1.6, 3.2) + vec2(0.0, uv.x * 0.6));
        c = mix(c, mix(uBottom, uTop, 0.5) * 1.18, smoothstep(0.52, 0.72, cl) * uCloud);
        // soft glow pool behind the subject
        float gd = length((uv - uGlowPos) * asp);
        float gl = exp(-gd * gd * 5.0);
        c = mix(c, uGlowCol, gl * uGlowAmt);
        // painted light shaft: a soft wedge from a high window, broken by brush noise
        if (uShaftAmt > 0.0) {
          vec2 d = (uv - uShaftSrc) * asp;
          float ang = atan(d.x, -d.y);
          float w = smoothstep(0.16, 0.02, abs(ang - uShaftDir) + (fbm2(vec2(ang * 9.0, length(d) * 2.0)) - 0.5) * 0.12);
          float fall = smoothstep(1.7, 0.2, length(d));
          float strokes = 0.75 + 0.5 * fbm2(vec2(ang * 40.0, length(d) * 1.5));
          c = mix(c, uShaftCol, w * fall * strokes * uShaftAmt);
        }
        // halftone falloff toward the bottom
        float dark = (1.0 - t) * 0.55 + (1.0 - gl) * 0.15;
        float d = halftone(gl_FragCoord.xy, uDotCell * uPx, 0.785, dark * dark);
        c = mix(c, uDot, d * uDotAmt);
        // manuscript-paper grid, fading away from the glow
        if (uGridAmt > 0.0) {
          vec2 gp = gl_FragCoord.xy / (uGridCell * uPx);
          vec2 gf = abs(fract(gp) - 0.5);
          float w = 0.5 - 0.6 / (uGridCell * uPx);
          float line = max(step(w, gf.x), step(w, gf.y));
          float major = max(step(w, abs(fract(gp.x / 4.0) - 0.5) * 4.0 - 1.5 + 0.0), 0.0);
          float dash = step(0.5, fract((gp.x + gp.y) * 2.0));
          c = mix(c, uGridCol, line * uGridAmt * (0.55 + 0.45 * gl) * (0.6 + 0.4 * dash));
        }
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 0.0);
      }`,
    uniforms: { ...backdrop, uPx: px, uStep: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } },
    depthTest: false, depthWrite: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  m.frustumCulled = false;
  m.renderOrder = -1000;
  return m;
}
