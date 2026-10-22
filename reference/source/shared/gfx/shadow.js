import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';
import { shared } from './ink-material.js';

// Comic cast shadow: every mesh of an object is projected along the light onto a plane behind it
// and drawn as flat halftone. Moves and folds with the object, costs one extra draw per piece.
export const shadowU = {
  uPlaneN: { value: new THREE.Vector3(0, 0, 1) },
  uPlaneP: { value: new THREE.Vector3(0, 0, -1.2) },
  uLight: { value: new THREE.Vector3(-0.35, 0.45, 1).normalize() },
  uShadowCol: { value: new THREE.Color('#05040a') },
  uShadowAmt: { value: 0.85 },
  uShadowCell: { value: 4.0 },
};

const VERT = /* glsl */ `
in vec3 position;
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
uniform vec3 uPlaneN, uPlaneP, uLight;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 P = wp.xyz;
  float t = dot(P - uPlaneP, uPlaneN) / dot(uLight, uPlaneN);
  P -= uLight * t;
  gl_Position = projectionMatrix * viewMatrix * vec4(P, 1.0);
}`;
const FRAG = /* glsl */ `
precision highp float;
${NOISE}
${COLOR}
uniform vec3 uShadowCol; uniform float uShadowAmt, uShadowCell, uPx;
layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
void main(){
  float d = halftone(gl_FragCoord.xy, uShadowCell * uPx, 0.785, uShadowAmt);
  if (d < 0.5) discard;
  gColor = vec4(uShadowCol, 1.0);
  gNormal = vec4(0.5, 0.5, 1.0, 0.0);
}`;

let mat = null;
export function shadowMaterial() {
  if (mat) return mat;
  mat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3, vertexShader: VERT, fragmentShader: FRAG,
    uniforms: { ...shadowU, uPx: shared.uPx }, side: THREE.DoubleSide, depthWrite: false,
  });
  return mat;
}

/** Mirror every mesh under `src` with a shadow twin added to `parent` (twins follow src matrices each frame). */
export class CastShadow {
  constructor(src, parent) {
    this.pairs = [];
    this.group = new THREE.Group();
    src.traverse((o) => {
      if (!o.isMesh || o.userData.noShadow) return;
      const m = new THREE.Mesh(o.geometry, shadowMaterial());
      m.matrixAutoUpdate = false; m.frustumCulled = false; m.renderOrder = -10;
      this.group.add(m); this.pairs.push([o, m]);
    });
    parent.add(this.group);
    this.src = src;
  }
  update() {
    this.group.visible = this.src.visible;
    if (!this.src.visible) return;
    for (const [o, m] of this.pairs) { m.visible = o.visible; m.matrix.copy(o.matrixWorld); m.matrixWorld.copy(o.matrixWorld); }
  }
}
