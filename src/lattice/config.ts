export const STAGE_VH = 560;
export const PHONE_MAX_WIDTH = 760;
export const SHORT_MAX_HEIGHT = 560;

export const SEED = 20261002;
export const STREAMS = { wordmark: 1, d20: 2, network: 3, padlock: 4, landing: 5, start: 6, dust: 7 } as const;
export const STREAM_STRIDE = 104729;

export const POINTS = {
  desktop: { count: 18000, dprCap: 1.5, size: 34, alpha: 0.9, dust: 1200 },
  lowPower: { count: 9000, dprCap: 1.25, size: 33, alpha: 1.25, dust: 500 },
} as const;
export const LOW_POWER = { maxWidth: PHONE_MAX_WIDTH, maxCores: 4 } as const;

export const COLOURS = {
  base: [0.2, 1.0, 0.52],
  hot: [0.88, 1.0, 0.93],
  dust: [0.25, 0.95, 0.6],
} as const;

export const FINAL_DIST = 9.0;
export const CAMERA = {
  fov: 35,
  near: 0.1,
  far: 100,
  height: 0.15,
  orbitSpeed: 0.07,
  orbitAmplitude: 0.12,
} as const;

export const KEYS = {
  distance: [9.2, 7.6, 8.1, 7.8, FINAL_DIST],
  tilt: [0, 0.36, 0.24, 0.1, 0],
} as const;

export const GROUP = {
  turnPerForm: Math.PI / 2,
  swayAmplitude: 0.5,
  swaySpeed: 0.3,
  scaleCap: 1.15,
  shiftShare: 0.3,
  shiftMax: 2.0,
} as const;

export const FIT = {
  desktop: [
    [0.7, 6.4],
    [0.36, 3.6],
    [0.34, 4.4],
    [0.34, 3.4],
  ],
  phone: [
    [0.86, 6.4],
    [0.74, 3.6],
    [0.74, 4.4],
    [0.7, 3.4],
  ],
} as const;
export const LIFT = {
  desktop: [0.5, 0.05, 0.05, 0.05, 0],
  phone: [0.8, 0.95, 0.95, 0.95, 0],
} as const;

export const START_SHELL = { radius: 7, depth: 6 } as const;
export const DUST_BOX = { width: 30, height: 18, near: -2, depth: 14 } as const;

export const WORDMARK = { edgeShare: 0.56, edgeJitter: 0.0055, edgeZJitter: 0.06, fillZJitter: 0.09, maxTries: 200 } as const;

export const D20 = {
  circumradius: 1.5,
  edgeShare: 0.66,
  vertexShare: 0.08,
  edgeJitter: 0.007,
  vertexSigma: 0.035,
  faceJitter: 0.012,
  tolerance: 1e-3,
} as const;

export const NETWORK = {
  layers: [
    { x: -1.95, count: 5, radius: 0.95 },
    { x: -0.65, count: 8, radius: 1.4 },
    { x: 0.65, count: 8, radius: 1.4 },
    { x: 1.95, count: 4, radius: 0.72 },
  ],
  layerTwist: 0.42,
  edgeShare: 0.7,
  edgeJitter: 0.004,
  nodeSigma: 0.05,
} as const;

export const PADLOCK = {
  width: 2.2,
  height: 1.55,
  depth: 0.7,
  bodyY: -0.5,
  shackleRadius: 0.62,
  shackleRise: 0.42,
  shackleSteps: 40,
  tube: 0.1,
  tubeJitter: 0.006,
  key: { radius: 0.17, y: 0.12, z: 0.004, steps: 28, phase: 0.5, gapFrom: 1.2, gapTo: 1.75 },
  slot: { top: 0.15, bottom: 0.5, inner: 0.08, outer: 0.13 },
  bodyShare: 0.36,
  faceShare: 0.12,
  shackleShare: 0.4,
  bodyJitter: 0.006,
  faceZJitter: 0.01,
  keyJitter: 0.006,
  keyZJitter: 0.003,
} as const;

export const COHERENT = { yWeight: 0.45, noise: 0.35 } as const;

export const LANDING = {
  edgeShare: 0.4,
  fillShare: 0.22,
  edgeJitter: 0.0035,
  edgeZJitter: 0.008,
  fillZJitter: 0.01,
  textZJitter: 0.008,
  titleSpread: 0.34,
  textSpread: 0.22,
  titleWeight: 2.2,
  minLineWidth: 3,
  debounceMs: 120,
} as const;

export const SHADER = {
  staggerSpread: 0.4,
  staggerWindow: 0.6,
  turbRotateBase: 0.7,
  turbRotateRand: 1.3,
  turbScale: 0.16,
  turbNoise: 0.28,
  idleNoise: 0.01,
  noiseFreq: [2.3, 2.1, 1.9],
  noiseSpeed: [0.9, 0.8, -0.7],
  introSpread: 0.45,
  introWindow: 0.55,
  pointerRadius: 1.0,
  pointerPushXY: 0.38,
  pointerPushZ: 0.25,
  pulseFreqX: 2.4,
  pulseSpeed: 3.4,
  pulseFreqY: 0.6,
  pulseThreshold: 0.82,
  pulseCalm: 1.0,
  bigThreshold: 0.968,
  sizeBase: 0.55,
  sizeRand: 0.75,
  sizeBig: 1.5,
  alphaBase: 0.5,
  alphaRand: 0.5,
  coreRadius: 0.17,
  softWeight: 0.36,
  coreWeight: 0.7,
  glowBase: 0.3,
  glowBig: 0.6,
  pulseColour: 0.7,
  pulseAlphaBase: 0.85,
  pulseAlpha: 1.2,
} as const;

export const DUST = {
  driftY: 0.25,
  driftYSpeed: 0.12,
  driftYPhase: 40,
  driftX: 0.2,
  driftXSpeed: 0.08,
  driftXPhase: 30,
  sizeBase: 1.0,
  sizeRand: 1.6,
  sizeScale: 9.0,
  alphaBase: 0.12,
  alphaRand: 0.22,
  counterRotation: 0.05,
} as const;

export const POINTER = { activeMs: 1400, halfLifeMs: 187, tiltY: 0.1, tiltX: 0.06 } as const;

export const INTRO = { duration: 2.5, delay: 0.15, ease: 'power3.out', skipAfter: 0.5 } as const;

export const TIMELINE = {
  total: 6.65,
  jumpTargets: [0, 1.5, 3.0, 4.5, 6.4],
  jumpNudgePx: 2,
  scrub: 1,
  tickerSleepFrames: 30,
  morphStarts: [0.5, 2.0, 3.5, 5.0],
  morphDuration: 1,
  morphEase: 'power2.inOut',
  copyOut: { duration: 0.3, y: -36, ease: 'power1.in' },
  copyIn: { offset: 0.62, duration: 0.35, y: 36, ease: 'power2.out' },
  crossfade: { start: 6.0, duration: 0.35, ease: 'power1.inOut', alphaFloor: 0.28 },
  hold: { start: 6.35, duration: 0.3 },
  imagesFrom: 4.5,
  finaleFocusBefore: 6.0,
  cardsFrom: 6.0,
  copyWindows: [
    [0, 0.65],
    [0.65, 2.15],
    [2.15, 3.65],
    [3.65, 5.15],
    [5.15, Infinity],
  ],
} as const;

export const FRAMING = { clearancePx: 10 } as const;

export const CHROME = { vignetteLockFade: 0.8, railPointerOffAt: 0.5, railHiddenAt: 0.98 } as const;

export const IDLE_LOAD = { timeoutMs: 1200 } as const;

export const FINALE_FIT = {
  steps: ['no-thumb', 'row', 'no-step', 'no-tags', 'tight'],
  rowMinWidth: 500,
} as const;

export const seedFor = (stream: keyof typeof STREAMS) => (SEED + STREAMS[stream] * STREAM_STRIDE) | 0;
