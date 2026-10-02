precision highp float;

uniform vec3 uColor;
uniform vec3 uHot;
uniform float uAlpha;

varying float vAlpha;
varying float vGlow;
varying float vPulse;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = 1.0 - smoothstep(0.0, 0.5, d);
  float core = 1.0 - smoothstep(0.0, CORE_RADIUS, d);
  vec3 colour = mix(uColor, uHot, clamp(core * (GLOW_BASE + vGlow * GLOW_BIG) + vPulse * PULSE_COLOUR, 0.0, 1.0));
  float a = (soft * SOFT_WEIGHT + core * CORE_WEIGHT) * vAlpha * uAlpha * (PULSE_ALPHA_BASE + vPulse * PULSE_ALPHA);
  gl_FragColor = vec4(colour, a);
}
