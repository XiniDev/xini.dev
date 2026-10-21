import { clamp01, smooth, luma, rgb2hsv, hsv2rgb, hueBand } from '../../shared/gfx/lut.js';

// The Verdigris grade, applied as a 3D LUT at the end of the post pass.
// 1. an S-curve on luminance around a low pivot (the image lives in the dark), hue preserved
// 2. split tone: teal into the shadows, brass-cream into the highlights
// 3. saturation by hue: murky dark greens calm down; live green is left alone
// 4. brass stays brass: teal air and teal shade over warm metal read as khaki and olive, so those hues are turned
//    back toward brass and the dark brass tones get some of their colour back (vermilion and cream are untouched)
export function gradeVerdigris(r, g, b) {
  const L = luma(r, g, b);
  const p = 0.22;
  const T = L < p ? p * Math.pow(L / p, 1.16) : 1 - (1 - p) * Math.pow((1 - L) / (1 - p), 1.22);
  const k = L > 1e-4 ? T / L : 1;
  r *= k; g *= k; b *= k;
  const ws = 1 - smooth(0.0, 0.3, T), wh = smooth(0.5, 1.0, T);
  r += -0.010 * ws + 0.022 * wh; g += 0.009 * ws + 0.012 * wh; b += 0.007 * ws - 0.018 * wh;
  let [h, s, v] = rgb2hsv(clamp01(r), clamp01(g), clamp01(b));
  const darkGreen = hueBand(h, 145, 62) * (1 - smooth(0.32, 0.68, v));
  s *= 1 - 0.24 * darkGreen;
  const olive = hueBand(h, 62, 26) * smooth(0.08, 0.2, s) * (1 - smooth(0.7, 0.92, v));
  h -= (h - 40) * 0.45 * olive;
  const brass = hueBand(h, 38, 22) * (1 - hueBand(h, 10, 14)) * smooth(0.06, 0.16, s) * (1 - smooth(0.3, 0.7, v));
  s = Math.min(1, s * (1 + 0.3 * brass));
  return hsv2rgb(h, s, v);
}
