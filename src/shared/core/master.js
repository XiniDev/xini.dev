// Master chain for every sound on the site (sfx.js routes through it): a fast limiter, then a soft
// clipper that holds the ceiling. tools/audio imports this same file, so what they measure
// is what the site plays.

export function createMaster(ctx) {
  const input = ctx.createGain();
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 2;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.12;
  const clip = ctx.createWaveShaper();
  clip.curve = softClipCurve();
  clip.oversample = 'none'; // 'none' keeps the ceiling exact; the clipper only catches rare transients
  input.connect(limiter);
  limiter.connect(clip);
  return { input, output: clip };
}

// Linear up to 0.72, then eases into a 0.85 ceiling (−1.4 dBFS, so true peak stays under −1 dBTP).
export function softClipCurve(size = 4097) {
  const curve = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    const x = (i / (size - 1)) * 2 - 1;
    const a = Math.abs(x);
    const y = a < 0.72 ? a : 0.72 + 0.13 * Math.tanh((a - 0.72) / 0.13);
    curve[i] = Math.sign(x) * y;
  }
  return curve;
}
