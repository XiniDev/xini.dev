// GLSL building blocks shared by every concept (all GLSL ES 3.00).

export const NOISE = /* glsl */ `
float hash11(float p){ p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
vec3 hash33(vec3 p3){ p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash12(i.xy + i.z * 17.17), n100 = hash12(i.xy + vec2(1,0) + i.z * 17.17);
  float n010 = hash12(i.xy + vec2(0,1) + i.z * 17.17), n110 = hash12(i.xy + vec2(1,1) + i.z * 17.17);
  float n001 = hash12(i.xy + (i.z + 1.0) * 17.17), n101 = hash12(i.xy + vec2(1,0) + (i.z + 1.0) * 17.17);
  float n011 = hash12(i.xy + vec2(0,1) + (i.z + 1.0) * 17.17), n111 = hash12(i.xy + vec2(1,1) + (i.z + 1.0) * 17.17);
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y), mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}
float vnoise2(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1,0)), u.x), mix(hash12(i + vec2(0,1)), hash12(i + vec2(1,1)), u.x), u.y);
}
float fbm3(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; } return s / 0.9375; }
float fbm2(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vnoise2(p); p = p * 2.03 + 11.7; a *= 0.5; } return s / 0.9375; }
`;

export const COLOR = /* glsl */ `
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// Screen-space halftone dot coverage for a darkness value in [0,1].
float halftone(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  vec2 c = fract(p) - 0.5;
  float r = sqrt(clamp(darkness, 0.0, 1.0)) * 0.62;
  float d = length(c);
  float aa = fwidth(d) * 0.55 + 0.01; // about a device pixel of edge: a printed dot, not a soft blob
  // no ink at no tone (the antialiasing alone used to leave a faint speck at every cell centre)
  return (1.0 - smoothstep(r - aa, r + aa, d)) * smoothstep(0.0, 0.01, darkness);
}
// Parallel hatching lines (for deep shadow), coverage in [0,1].
float hatch(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  float d = abs(fract(p.y) - 0.5);
  float w = clamp(darkness, 0.0, 1.0) * 0.42;
  float aa = fwidth(p.y) * 0.8 + 0.02;
  return 1.0 - smoothstep(w - aa, w + aa, d);
}
`;
