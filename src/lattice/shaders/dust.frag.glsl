precision mediump float;

uniform vec3 uDust;

varying float vA;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uDust, vA * (1.0 - smoothstep(0.0, 0.5, d)));
}
