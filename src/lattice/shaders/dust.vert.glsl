uniform float uTime;
uniform float uPixelRatio;

attribute float aR;

varying float vA;

void main() {
  vec3 p = position;
  p.y += sin(uTime * DUST_DRIFT_Y_SPEED + aR * DUST_DRIFT_Y_PHASE) * DUST_DRIFT_Y;
  p.x += cos(uTime * DUST_DRIFT_X_SPEED + aR * DUST_DRIFT_X_PHASE) * DUST_DRIFT_X;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (DUST_SIZE_BASE + aR * DUST_SIZE_RAND) * uPixelRatio * DUST_SIZE_SCALE / -mv.z;
  vA = DUST_ALPHA_BASE + aR * DUST_ALPHA_RAND;
}
