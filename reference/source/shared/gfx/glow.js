import * as THREE from 'three';
import { COLOR } from './glsl.js';

// Comic glow: additive billboards whose falloff is printed as halftone dots, so neon blooms like ink.
export function glowSprites(points, { size = 0.6, px, cell = 4 } = {}) {
  // points: [{ p: Vector3, c: Color|string, s: scale }]
  const n = points.length;
  const geo = new THREE.InstancedBufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3));
  geo.setIndex([0, 1, 2, 0, 2, 3]);
  const off = new Float32Array(n * 3), col = new Float32Array(n * 3), sc = new Float32Array(n);
  points.forEach((q, i) => {
    off.set([q.p.x, q.p.y, q.p.z], i * 3);
    const c = new THREE.Color(q.c); col.set([c.r, c.g, c.b], i * 3);
    sc[i] = (q.s ?? 1) * size;
  });
  geo.setAttribute('offset', new THREE.InstancedBufferAttribute(off, 3));
  geo.setAttribute('gcol', new THREE.InstancedBufferAttribute(col, 3));
  geo.setAttribute('gsize', new THREE.InstancedBufferAttribute(sc, 1));
  geo.instanceCount = n;
  const mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: /* glsl */ `
      in vec3 position; in vec3 offset; in vec3 gcol; in float gsize;
      uniform mat4 modelViewMatrix, projectionMatrix; uniform float uFlicker, uTime;
      out vec2 vP; out vec3 vC;
      void main(){
        vP = position.xy; vC = gcol;
        float fl = 1.0 - uFlicker * step(0.93, fract(sin(dot(offset.xy, vec2(12.9, 78.2)) + floor(uTime * 12.0)) * 43758.5));
        vec4 mv = modelViewMatrix * vec4(offset, 1.0);
        mv.xy += position.xy * gsize * fl;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      ${COLOR}
      uniform float uPx, uCell, uAmt;
      in vec2 vP; in vec3 vC;
      out highp vec4 fragColor;
      void main(){
        float r = length(vP);
        if (r > 1.0) discard;
        float fall = pow(1.0 - r, 1.6);
        float core = smoothstep(0.35, 0.0, r);
        float d = halftone(gl_FragCoord.xy, uCell * uPx, 0.3, fall * 0.9);
        vec3 c = vC * (d * 0.75 + core * 1.2) * uAmt;
        fragColor = vec4(c, 1.0);
      }`,
    uniforms: { uPx: px, uCell: { value: cell }, uAmt: { value: 1 }, uFlicker: { value: 0.0 }, uTime: { value: 0 } },
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  return mesh;
}
