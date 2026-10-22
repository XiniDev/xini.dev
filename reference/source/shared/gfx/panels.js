import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';

// The comic page: paper everywhere except inside the panel polygons, with thick ink borders.
// Drawn into the scene targets after the 3D, so the post pass inks it like everything else.
export const MAXP = 4, MAXV = 6;

export class PanelPage {
  constructor(px) {
    this.u = {
      uPts: { value: Array.from({ length: MAXP * MAXV }, () => new THREE.Vector2()) },
      uCount: { value: new Array(MAXP).fill(0) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPaper: { value: new THREE.Color('#f2ede3') },
      uPaper2: { value: new THREE.Color('#e7e0d2') },
      uInk: { value: new THREE.Color('#0b0a0d') },
      uBorder: { value: 4.0 },
      uTone: { value: new THREE.Color('#e8322b') },
      uToneAmt: { value: 0.0 },
      uPx: px,
      uSplat: { value: null },
      uSplatOn: { value: 0 },
    };
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: /* glsl */ `in vec3 position; void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        precision highp float;
        ${NOISE}
        ${COLOR}
        uniform vec2 uPts[${MAXP * MAXV}]; uniform int uCount[${MAXP}];
        uniform vec2 uRes; uniform vec3 uPaper, uPaper2, uInk, uTone; uniform float uBorder, uToneAmt, uPx, uSplatOn; uniform sampler2D uSplat;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        float segDist(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
        void main(){
          vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);   // pixels, top-left origin
          bool inside = false; float dmin = 1e9;
          for (int k = 0; k < ${MAXP}; k++) {
            int n = uCount[k]; if (n < 3) continue;
            bool in_k = false; float dk = 1e9;
            for (int i = 0; i < ${MAXV}; i++) {
              if (i >= n) break;
              vec2 a = uPts[k * ${MAXV} + i] * uRes, b = uPts[k * ${MAXV} + ((i + 1 == n) ? 0 : i + 1)] * uRes;
              if (((a.y > p.y) != (b.y > p.y)) && (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)) in_k = !in_k;
              dk = min(dk, segDist(p, a, b));
            }
            if (in_k) { inside = true; dmin = min(dmin, dk); }
          }
          float bw = uBorder * uPx;
          if (inside && dmin > bw) discard;
          vec3 c;
          if (inside) c = uInk;
          else {
            float f = fbm2(p / (220.0 * uPx));
            c = mix(uPaper, uPaper2, smoothstep(0.45, 0.8, f) * 0.35);
            // a faint screentone field in the page corners
            float tone = halftone(gl_FragCoord.xy, 6.0 * uPx, 0.785, smoothstep(0.55, 1.0, length((p / uRes - 0.5) * vec2(1.4, 1.0))) * 0.35);
            c = mix(c, uInk, tone * 0.12);
            c = mix(c, uTone, uToneAmt * tone);
          }
          if (uSplatOn > 0.5) { vec4 sp = texture(uSplat, gl_FragCoord.xy / uRes); c = mix(c, sp.rgb, step(0.5, sp.a)); }
          gColor = vec4(c, 1.0);
          gNormal = vec4(0.5, 0.5, 1.0, inside ? 201.0 / 255.0 : 200.0 / 255.0);
          gl_FragDepth = 0.0;
        }`,
      uniforms: this.u, depthTest: true, depthFunc: THREE.AlwaysDepth, depthWrite: true,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    this.mesh.frustumCulled = false;
    this.scene = new THREE.Scene(); this.scene.add(this.mesh);
  }
  /** panels: array of polygons in normalised screen coords (0..1, y down). */
  set(panels) {
    for (let k = 0; k < MAXP; k++) {
      const poly = panels[k];
      this.u.uCount.value[k] = poly ? poly.length : 0;
      for (let i = 0; i < MAXV; i++) {
        const v = poly && poly[Math.min(i, poly.length - 1)];
        this.u.uPts.value[k * MAXV + i].set(v ? v[0] : 0, v ? v[1] : 0);
      }
    }
  }
}

/** Interpolate two layouts (same panel count after padding), vertex by vertex. */
export function lerpPanels(a, b, t) {
  const n = Math.max(a.length, b.length), out = [];
  for (let k = 0; k < n; k++) {
    const pa = a[k] || collapse(b[k]), pb = b[k] || collapse(a[k]);
    const m = Math.max(pa.length, pb.length);
    const A = pad(pa, m), B = pad(pb, m);
    out.push(A.map((v, i) => [v[0] + (B[i][0] - v[0]) * t, v[1] + (B[i][1] - v[1]) * t]));
  }
  return out;
}
const pad = (p, m) => { const q = p.slice(); while (q.length < m) q.push(q[q.length - 1]); return q; };
const collapse = (p) => { const c = p.reduce((s, v) => [s[0] + v[0] / p.length, s[1] + v[1] / p.length], [0, 0]); return p.map(() => c); };
export const rectOf = (poly) => {
  const xs = poly.map((v) => v[0]), ys = poly.map((v) => v[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
};
