import * as THREE from 'three';

// A colour grade as a 3D lookup table, generated from a function so the look stays editable in code.
// grade(r, g, b) -> [r, g, b], all display-space 0..1. The post pass samples it after bloom.
export function makeLut(grade, size = 33) {
  const data = new Uint8Array(size * size * size * 4);
  let i = 0;
  for (let b = 0; b < size; b++) for (let g = 0; g < size; g++) for (let r = 0; r < size; r++) {
    const [R, G, B] = grade(r / (size - 1), g / (size - 1), b / (size - 1));
    data[i++] = Math.round(clamp01(R) * 255); data[i++] = Math.round(clamp01(G) * 255); data[i++] = Math.round(clamp01(B) * 255); data[i++] = 255;
  }
  const tex = new THREE.Data3DTexture(data, size, size, size);
  tex.format = THREE.RGBAFormat; tex.type = THREE.UnsignedByteType;
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = tex.wrapR = THREE.ClampToEdgeWrapping;
  tex.unpackAlignment = 1; tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  tex.userData.size = size;
  return tex;
}

export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const luma = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

export function rgb2hsv(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d > 1e-6) {
    if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, mx > 0 ? d / mx : 0, mx];
}
export function hsv2rgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c]; else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return [r + m, g + m, b + m];
}
/** weight for a hue band centred on c with half-width w (degrees), soft edges */
export function hueBand(h, c, w) { const d = Math.abs(((h - c + 540) % 360) - 180); return 1 - smooth(w * 0.6, w, d); }
