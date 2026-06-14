export const NCLICK = 8;

export const simVertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const clearFragment = `
precision highp float;
void main() {
  gl_FragColor = vec4(0.0);
}
`;

export const advectFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tFluid;
uniform float uDt;
uniform float uDissipation;
uniform float uTime;
uniform float uCurl;
uniform float uReducedMotion;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 curlN(vec2 p) {
  const float e = 0.1;
  float n1 = noise(p + vec2(0.0, e));
  float n2 = noise(p - vec2(0.0, e));
  float n3 = noise(p + vec2(e, 0.0));
  float n4 = noise(p - vec2(e, 0.0));
  return vec2((n1 - n2), -(n3 - n4)) / (2.0 * e);
}

void main() {
  vec4 prev = texture2D(tFluid, vUv);
  vec2 vel = prev.xy;

  vec2 back = clamp(vUv - vel * uDt, 0.0, 1.0);
  vec4 adv = texture2D(tFluid, back);
  vec2 newVel = adv.xy;
  float energy = adv.z;

  vec2 amb = curlN(vUv * 3.0 + vec2(uTime * 0.03, -uTime * 0.02));
  newVel += amb * uCurl * uDt * (1.0 - uReducedMotion);

  newVel *= uDissipation;
  energy *= uDissipation;

  float m = length(newVel);
  const float maxV = 2.5;
  if (m > maxV) newVel *= maxV / m;

  float b = smoothstep(0.0, 0.03, vUv.x) * smoothstep(0.0, 0.03, 1.0 - vUv.x)
          * smoothstep(0.0, 0.03, vUv.y) * smoothstep(0.0, 0.03, 1.0 - vUv.y);
  newVel *= b;
  energy *= b;

  gl_FragColor = vec4(newVel, energy, 1.0);
}
`;

export const splatFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tFluid;
uniform float uDt;
uniform float uAspect;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uRadius;
uniform float uStrength;
#define NCLICK ${NCLICK}
uniform vec2 uClickPos[NCLICK];
uniform vec2 uClickImpulse[NCLICK];
uniform float uClickGain[NCLICK];

float gauss(vec2 d, float r) {
  return exp(-dot(d, d) / (r * r));
}

void main() {
  vec4 field = texture2D(tFluid, vUv);
  vec2 vel = field.xy;
  float energy = field.z;

  vec2 dM = vUv - uMouse;
  dM.x *= uAspect;
  float fM = gauss(dM, uRadius);
  vel += uVelocity * (fM * uStrength * uDt);
  energy += fM * length(uVelocity) * uStrength * uDt;

  for (int i = 0; i < NCLICK; i++) {
    if (uClickGain[i] <= 0.0) continue;
    vec2 dC = vUv - uClickPos[i];
    dC.x *= uAspect;
    float fC = gauss(dC, uRadius * 1.4);
    vel += uClickImpulse[i] * (fC * uClickGain[i] * uDt);
    energy += fC * uClickGain[i] * uDt * 0.6;
  }

  gl_FragColor = vec4(vel, min(energy, 4.0), 1.0);
}
`;
