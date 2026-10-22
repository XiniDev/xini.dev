import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// A procedural night skyline on a cylinder around the scene: blocky towers, lit windows,
// a few signboards, halftone haze at the base. Two layers give parallax.
export const cityU = {
  uSilA: { value: new THREE.Color('#1b1630') },
  uSilB: { value: new THREE.Color('#2b2147') },
  uWin: { value: new THREE.Color('#ffcf7a') },
  uWin2: { value: new THREE.Color('#ff5a6e') },
  uWin3: { value: new THREE.Color('#57d9ff') },
  uHaze: { value: new THREE.Color('#4a2a5c') },
  uDotInk: { value: new THREE.Color('#0b0a12') },
};

export function makeCity({ radius = 38, height = 26, y0 = -14, layer = 0, seed = 1, px }) {
  const geo = new THREE.CylinderGeometry(radius, radius, height, 160, 1, true);
  geo.translate(0, y0 + height / 2, 0);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `
      in vec3 position; in vec2 uv; uniform mat4 modelViewMatrix, projectionMatrix; out vec2 vUv; out float vH;
      void main(){ vUv = uv; vH = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uSilA, uSilB, uWin, uWin2, uWin3, uHaze, uDotInk; uniform float uSeed, uLayer, uPx, uH, uY0, uStep;
      in vec2 vUv; in float vH;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float cols = 140.0 - uLayer * 40.0;
        float x = vUv.x * cols;
        float bi = floor(x);
        float r = hash11(bi * 1.37 + uSeed);
        float r2 = hash11(bi * 7.1 + uSeed * 3.0);
        // tower height in metres above the base
        float h = mix(4.0, 15.0, pow(r, 1.6)) * (1.0 - uLayer * 0.25) + step(0.93, r2) * 6.0;
        float y = vH - uY0;
        if (y > h) discard;
        float fx = fract(x);
        // setback roofs and antennae
        if (y > h - 1.0 && (fx < 0.18 || fx > 0.82)) discard;
        vec3 c = mix(uSilA, uSilB, uLayer);
        // windows: grid per tower, randomly lit
        vec2 w = vec2(fx * 6.0, y * 1.6);
        vec2 wi = floor(w), wf = fract(w);
        float lit = step(0.72, hash12(wi + bi * 17.0 + uSeed)) * step(0.15, wf.x) * step(wf.x, 0.75) * step(0.2, wf.y) * step(wf.y, 0.7);
        float pick = hash12(wi * 3.1 + bi);
        vec3 wc = pick < 0.78 ? uWin : (pick < 0.9 ? uWin2 : uWin3);
        c = mix(c, wc, lit * (0.55 + 0.45 * hash12(wi + 3.0)) * (y < h - 1.2 ? 1.0 : 0.0));
        // a few vertical signboards
        float sign = step(0.88, r2) * step(0.3, fx) * step(fx, 0.55) * step(h * 0.35, y) * step(y, h * 0.75);
        c = mix(c, (r2 > 0.94 ? uWin2 : uWin3), sign * 0.85);
        // haze rising from the street
        float haze = smoothstep(0.55 * h, 0.0, y);
        c = mix(c, uHaze, haze * 0.75);
        float d = halftone(gl_FragCoord.xy, 5.0 * uPx, 0.785, haze * 0.6 + uLayer * 0.15);
        c = mix(c, uDotInk, d * 0.45);
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 0.0);
      }`,
    uniforms: { ...cityU, uSeed: { value: seed }, uLayer: { value: layer }, uPx: px, uH: { value: height }, uY0: { value: y0 }, uStep: { value: 0 } },
    side: THREE.BackSide, depthWrite: true,
  });
  const m = new THREE.Mesh(geo, mat);
  m.renderOrder = -500;
  return m;
}
