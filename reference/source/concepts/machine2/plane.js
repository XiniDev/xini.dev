import * as THREE from 'three';
import { FOLD_FRONT, FOLD_BACK } from '../../shared/ui/marks.js';
import { BOARD } from './board.js';

// The board's power plane is cut in the shape of the mark. It is never printed on the board: it shows
// as light, through everything standing on it, when the power comes on (the boot) and when the camera
// pulls back at the end of the journey (the finale). R = the plane, G = its clearance outline.
export const PLANE = { cx: 0, cz: 0, size: 1300, source: [-360, -420] };

export function planeTexture(res = 1024) {
  const W = res, H = Math.round(res * (BOARD.h / BOARD.w)), k = W / BOARD.w;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  const s = PLANE.size / 104;
  const pieces = (d) => d.split('M').filter((q) => q.trim()).map((sub) => sub.replace(/Z/g, '').trim().split(/\s*L\s*/).map((p) => p.split(',').map(Number)));
  const path = (pts) => {
    g.beginPath();
    pts.forEach(([mx, my], i) => { const X = (PLANE.cx + (mx - 60) * s + BOARD.w / 2) * k, Y = (PLANE.cz + (my - 60) * s + BOARD.h / 2) * k; i ? g.lineTo(X, Y) : g.moveTo(X, Y); });
    g.closePath();
  };
  // the back pieces a little dimmer than the front band, so the fold still reads
  g.globalCompositeOperation = 'lighter';
  for (const [d, v] of [[FOLD_BACK, 150], [FOLD_FRONT, 255]]) for (const pts of pieces(d)) { path(pts); g.fillStyle = `rgb(${v},0,0)`; g.fill(); }
  g.lineJoin = 'miter';
  for (const d of [FOLD_BACK, FOLD_FRONT]) for (const pts of pieces(d)) { path(pts); g.strokeStyle = 'rgb(0,255,0)'; g.lineWidth = 3.2; g.stroke(); }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace; tex.flipY = false; tex.anisotropy = 4;
  tex.minFilter = THREE.LinearMipmapLinearFilter; tex.generateMipmaps = true;
  return tex;
}
