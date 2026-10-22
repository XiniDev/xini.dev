// Loudness and peak measurement (ITU-R BS.1770-4 / EBU R128).
// Pure JS with no dependencies, so it runs in Node and in the browser.
//
//   import { measure } from './loudness.mjs';
//   const m = measure([left, right], 48000);
//   // { integrated, shortTermMax, momentaryMax, samplePeakDb, truePeakDb, durationS }

export function measure(channels, sampleRate) {
  const weighted = channels.map((ch) => kWeight(ch, sampleRate));
  const n = channels[0].length;
  const prefix = weighted.map((ch) => {
    const p = new Float64Array(ch.length + 1);
    for (let i = 0; i < ch.length; i++) p[i + 1] = p[i] + ch[i] * ch[i];
    return p;
  });
  const meanSquare = (start, len) => prefix.reduce((sum, p) => sum + (p[start + len] - p[start]) / len, 0);
  const L = (ms) => (ms > 0 ? -0.691 + 10 * Math.log10(ms) : -Infinity);

  const hop = Math.round(0.1 * sampleRate);
  const block = Math.round(0.4 * sampleRate);
  const blocks = [];
  for (let s = 0; s + block <= n; s += hop) blocks.push(meanSquare(s, block));

  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const absGated = blocks.filter((z) => L(z) > -70);
  const relGate = absGated.length ? L(avg(absGated)) - 10 : -Infinity;
  const gated = absGated.filter((z) => L(z) > relGate);
  const integrated = gated.length ? L(avg(gated)) : -Infinity;

  const short = Math.round(3 * sampleRate);
  let shortTermMax = -Infinity;
  for (let s = 0; s + short <= n; s += hop) shortTermMax = Math.max(shortTermMax, L(meanSquare(s, short)));

  let peak = 0;
  for (const ch of channels) for (let i = 0; i < ch.length; i++) { const a = Math.abs(ch[i]); if (a > peak) peak = a; }

  return {
    integrated: round(integrated),
    shortTermMax: round(shortTermMax),
    momentaryMax: round(blocks.length ? Math.max(...blocks.map(L)) : -Infinity),
    samplePeakDb: round(20 * Math.log10(peak || 1e-12)),
    truePeakDb: round(20 * Math.log10(truePeak(channels) || 1e-12)),
    durationS: round(n / sampleRate),
  };
}

// Slice [from, to) seconds out of a set of channels.
export function slice(channels, sampleRate, from, to) {
  const a = Math.max(0, Math.floor(from * sampleRate));
  const b = Math.min(channels[0].length, Math.floor(to * sampleRate));
  return channels.map((ch) => ch.subarray(a, b));
}

const round = (v) => (Number.isFinite(v) ? Math.round(v * 10) / 10 : v);

// K-weighting: high shelf then high pass, with coefficients derived for any sample rate.
function kWeight(x, fs) {
  let K = Math.tan((Math.PI * 1681.974450955533) / fs);
  const Q1 = 0.7071752369554196;
  const Vh = Math.pow(10, 3.999843853973347 / 20);
  const Vb = Math.pow(Vh, 0.4996667741545416);
  let a0 = 1 + K / Q1 + K * K;
  const s1 = {
    b0: (Vh + (Vb * K) / Q1 + K * K) / a0, b1: (2 * (K * K - Vh)) / a0, b2: (Vh - (Vb * K) / Q1 + K * K) / a0,
    a1: (2 * (K * K - 1)) / a0, a2: (1 - K / Q1 + K * K) / a0,
  };
  K = Math.tan((Math.PI * 38.13547087602444) / fs);
  const Q2 = 0.5003270373238773;
  a0 = 1 + K / Q2 + K * K;
  const s2 = { b0: 1, b1: -2, b2: 1, a1: (2 * (K * K - 1)) / a0, a2: (1 - K / Q2 + K * K) / a0 };
  return biquad(biquad(x, s1), s2);
}

function biquad(x, c) {
  const y = new Float64Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const v = c.b0 * x[i] + c.b1 * x1 + c.b2 * x2 - c.a1 * y1 - c.a2 * y2;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
  }
  return y;
}

// 4x oversampled peak (windowed-sinc interpolation, 12 taps per phase).
function truePeak(channels) {
  const taps = 48, phases = 4, half = taps / 2;
  const h = new Float64Array(taps);
  for (let i = 0; i < taps; i++) {
    const t = (i - (taps - 1) / 2) / phases;
    const sinc = t === 0 ? 1 : Math.sin(Math.PI * t) / (Math.PI * t);
    h[i] = sinc * (0.5 - 0.5 * Math.cos((2 * Math.PI * (i + 0.5)) / taps));
  }
  const poly = [...Array(phases).keys()].map((p) => { const c = []; for (let i = p; i < taps; i += phases) c.push(h[i]); return c; });
  let peak = 0;
  for (const x of channels) {
    for (let n = 0; n < x.length; n++) {
      for (let p = 0; p < phases; p++) {
        const c = poly[p];
        let acc = 0;
        for (let j = 0; j < c.length; j++) { const idx = n - j + half / phases; if (idx >= 0 && idx < x.length) acc += c[j] * x[idx]; }
        const a = Math.abs(acc); if (a > peak) peak = a;
      }
    }
  }
  return peak;
}
