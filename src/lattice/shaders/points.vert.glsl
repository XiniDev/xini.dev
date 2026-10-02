uniform float uMorph;
uniform float uIntro;
uniform float uTime;
uniform float uCalm;
uniform float uLock;
uniform float uSize;
uniform float uPixelRatio;
uniform float uPointerStrength;
uniform vec3 uPointer;

attribute vec3 aB;
attribute vec3 aC;
attribute vec3 aD;
attribute vec3 aE;
attribute vec3 aStart;
attribute vec4 aRand;

varying float vAlpha;
varying float vGlow;
varying float vPulse;

float stagger(float x, float r) {
  return smoothstep(0.0, 1.0, clamp((x - r * STAGGER_SPREAD) / STAGGER_WINDOW, 0.0, 1.0));
}

void main() {
  float r = aRand.x;
  float e1 = stagger(uMorph, r);
  float e2 = stagger(uMorph - 1.0, r);
  float e3 = stagger(uMorph - 2.0, r);
  float e4 = stagger(uMorph - 3.0, r);
  vec3 p = mix(position, aB, e1);
  p = mix(p, aC, e2);
  p = mix(p, aD, e3);
  p = mix(p, aE, e4);

  float turb = (sin(LATTICE_PI * e1) + sin(LATTICE_PI * e2) + sin(LATTICE_PI * e3) + sin(LATTICE_PI * e4)) * (1.0 - uCalm);
  float angle = turb * (TURB_ROTATE_BASE + aRand.y * TURB_ROTATE_RAND);
  float cs = cos(angle);
  float sn = sin(angle);
  p.xz = mat2(cs, -sn, sn, cs) * p.xz;
  p *= 1.0 + turb * TURB_SCALE;

  vec3 n = vec3(
    sin(p.y * NOISE_FREQ_X + uTime * NOISE_SPEED_X + aRand.y * LATTICE_TAU),
    sin(p.z * NOISE_FREQ_Y + uTime * NOISE_SPEED_Y + aRand.z * LATTICE_TAU),
    sin(p.x * NOISE_FREQ_Z + uTime * NOISE_SPEED_Z + aRand.w * LATTICE_TAU)
  );
  p += n * (turb * TURB_NOISE + IDLE_NOISE * (1.0 - uCalm) * (1.0 - uLock));

  float ei = smoothstep(0.0, 1.0, clamp((uIntro - r * INTRO_SPREAD) / INTRO_WINDOW, 0.0, 1.0));
  p = mix(aStart, p, ei);

  vec2 dp = p.xy - uPointer.xy;
  float dist = length(dp);
  float push = (1.0 - smoothstep(0.0, POINTER_RADIUS, dist)) * uPointerStrength;
  p.xy += (dp / max(dist, 1e-3)) * push * POINTER_PUSH_XY;
  p.z += push * POINTER_PUSH_Z;

  float net = e2 * (1.0 - e3);
  vPulse = net * smoothstep(PULSE_THRESHOLD, 1.0, sin(p.x * PULSE_FREQ_X - uTime * PULSE_SPEED + p.y * PULSE_FREQ_Y)) * (1.0 - uCalm * PULSE_CALM);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float big = step(BIG_THRESHOLD, aRand.w);
  gl_PointSize = uSize * (SIZE_BASE + aRand.y * SIZE_RAND + big * SIZE_BIG) * uPixelRatio / -mv.z;
  vAlpha = ALPHA_BASE + ALPHA_RAND * aRand.z;
  vGlow = big;
}
