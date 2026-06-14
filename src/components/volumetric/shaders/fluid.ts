export const fluidVertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fluidFragment = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uStir;
uniform vec2 uPointerVel;
uniform vec2 uClick;
uniform float uClickAge;
uniform float uReducedMotion;
#ifdef USE_FLUID
uniform sampler2D tFluid;
uniform vec2 uFluidScale;
#endif

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

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

vec2 curl(vec2 p, float t) {
  const float e = 0.015;
  const float FREQ = 1.8;
  vec2 d = vec2(t * 0.15, -t * 0.10);
  float n1 = noise((p + vec2(0.0, e)) * FREQ + d);
  float n2 = noise((p - vec2(0.0, e)) * FREQ + d);
  float n3 = noise((p + vec2(e, 0.0)) * FREQ + d);
  float n4 = noise((p - vec2(e, 0.0)) * FREQ + d);
  return vec2((n1 - n2) / (2.0 * e), -(n3 - n4) / (2.0 * e));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = uv - 0.5;
  p.x *= aspect;
  float t = (uReducedMotion > 0.5) ? 0.0 : uTime * 0.06;

  vec2 ptrUv = vec2((uPointer.x + 1.0) * 0.5, 1.0 - (uPointer.y + 1.0) * 0.5);
  vec2 ptr = ptrUv - 0.5;
  ptr.x *= aspect;

  float live = (uReducedMotion > 0.5) ? 0.0 : 1.0;

  vec2 disp = vec2(0.0);
  disp += curl(p, uTime) * 0.015;

#ifdef USE_FLUID
  vec4 fl = texture2D(tFluid, uv);
  vec2 fvel = vec2(fl.x, -fl.y);
  float fenergy = fl.z;
  disp += fvel * uFluidScale.x;
#else
  float dist = length(p - ptr);
  float infl = smoothstep(0.6, 0.0, dist);
  float amp = (0.05 + uStir * 0.45) * infl;
  disp += curl(p + ptr, uTime * 1.6) * amp;
  disp += uPointerVel * infl * 0.18;
  vec2 clickUv = vec2(uClick.x, 1.0 - uClick.y);
  vec2 clk = clickUv - 0.5;
  clk.x *= aspect;
  float cdist = length(p - clk);
  float clife = exp(-uClickAge * 2.2);
  float cradius = 0.05 + uClickAge * 0.6;
  float cgauss = exp(-(cdist * cdist) / (cradius * cradius + 1e-3));
  disp += curl(p + clk, uTime + uClickAge * 3.0) * (cgauss * clife * 0.15);
#endif

  float dl = length(disp);
  disp *= 0.30 * inversesqrt(dl * dl + 0.09);
  p += disp * live;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.5 * q + vec2(1.7, 9.2) + 0.5 * t),
    fbm(p + 3.5 * q + vec2(8.3, 2.8))
  );
  float f = fbm(p + 3.5 * r);

  vec3 ink = vec3(0.020, 0.063, 0.051);
  vec3 emerald = vec3(0.063, 0.725, 0.506);
  vec3 teal = vec3(0.176, 0.831, 0.749);
  vec3 cyanGreen = vec3(0.133, 0.827, 0.933);
  float k = clamp(uScroll + r.x * 0.5, 0.0, 1.0);
  vec3 accent = mix(emerald, teal, smoothstep(0.0, 0.7, k));
  accent = mix(accent, cyanGreen, smoothstep(0.65, 1.0, k) * 0.6);

  float m = pow(clamp(f * 1.4, 0.0, 1.0), 1.6);
#ifdef USE_FLUID
  m = clamp(m + fenergy * uFluidScale.y * live * (1.0 - m), 0.0, 1.0);
  vec3 col = mix(ink, accent, m * 0.92);
  col += accent * fenergy * 0.05 * live;
#else
  m = clamp(m + cgauss * clife * 0.18 * live, 0.0, 1.0);
  vec3 col = mix(ink, accent, m * 0.92);
  col += accent * (infl * uStir * 0.08 + cgauss * clife * 0.06) * live;
#endif

  float vig = smoothstep(1.25, 0.2, length(uv - 0.5));
  col *= mix(0.55, 1.0, vig);
  col += (hash(uv * uResolution) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;
