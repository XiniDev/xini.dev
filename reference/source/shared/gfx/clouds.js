import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// A sea of clouds: a large plane with layered fbm, lit by the moon from above and by the city from
// below (warm uplight through the gaps). Printed with halftone in the shadowed folds.
export const cloudU = {
  uTop: { value: new THREE.Color('#47456f') },
  uUnder: { value: new THREE.Color('#ff7a59') },
  uDeep: { value: new THREE.Color('#141433') },
  uDot: { value: new THREE.Color('#07060d') },
  uDrift: { value: new THREE.Vector2(0.004, 0.0015) },
  uScale: { value: 0.0042 },
  uCover: { value: 0.4 },
};

export function makeCloudSea({ size = 6000, y = 55, px, time }) {
  const geo = new THREE.PlaneGeometry(size, size, 1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `
      in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      ${NOISE}
      ${COLOR}
      uniform vec3 uTop, uUnder, uDeep, uDot; uniform vec2 uDrift; uniform float uScale, uCover, uTime, uPx;
      in vec3 vW;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec2 p = vW.xz * uScale + uDrift * uTime;
        float n = fbm2(p) * 0.65 + fbm2(p * 2.7 + 3.1) * 0.35;
        float big = fbm2(p * 0.35 + 7.7);
        float d = n * 0.75 + big * 0.45;
        float cloud = smoothstep(uCover - 0.08, uCover + 0.1, d);
        if (cloud < 0.02) discard;
        // shading: tops catch the moon, holes glow with the city underneath
        float ridge = smoothstep(0.55, 0.85, d);
        float hole = 1.0 - smoothstep(uCover, uCover + 0.22, d);
        vec3 c = mix(uDeep, uTop, ridge);
        c = mix(c, uUnder, hole * 0.75);
        c += uUnder * 0.08;
        float tone = halftone(gl_FragCoord.xy, 5.0 * uPx, 0.785, (1.0 - ridge) * 0.55 * (1.0 - hole));
        c = mix(c, uDot, tone * 0.45);
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 1.0, 0.5, 0.0);
      }`,
    uniforms: { ...cloudU, uTime: time, uPx: px },
  });
  const m = new THREE.Mesh(geo, mat);
  m.position.y = y;
  m.frustumCulled = false;
  m.renderOrder = -400;
  return m;
}
