import * as THREE from 'three';
import { scatterTowers, facadeU } from '../../shared/gfx/facade.js';
import { inkMaterial as baseInk } from '../../shared/gfx/ink-material.js';
import { V, canvasTex } from './board.js';
const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });

// The city beyond the board: the rest of the case as a night skyline. Everything here sits deep in the
// haze, so it reads as silhouettes, lit windows and signs; the board in front stays clean machinery.
const jp = '"Zen Kaku Gothic New", "Hiragino Sans", sans-serif';
const disp = '"Chakra Petch", "Arial Narrow", sans-serif';

// the signs: Chinese with a small English line, all in one dim cream, so the skyline reads as one place at night
const SIGNS = [
  ['電源', 'POWER'], ['冷卻', 'COOLING'], ['記憶體', 'MEMORY'], ['神經網絡', 'NEURAL'], ['接口', 'I/O'], ['自研', 'BUILT SOLO'],
];

export function buildCity(pal, { phone = false } = {}) {
  const g = new THREE.Group();
  // ---- the case floor beyond the board: dark, so the haze can stand on it
  const floor = new THREE.Mesh(new THREE.CircleGeometry(9000, 64).rotateX(-Math.PI / 2), inkMaterial({ base: pal.cityRoof, brush: 0.05, spec: 0, rim: 0, dot: 0.2, id: 0 }));
  floor.position.y = -60; floor.renderOrder = -20; g.add(floor);
  // ---- skyline: towers on an annulus around the board, tallest to the north (behind the spire)
  facadeU.uWinA.value.set(pal.winA); facadeU.uWinB.value.set(pal.winB); facadeU.uWinC.value.set(pal.winC);
  facadeU.uWall.value.set(pal.cityWall); facadeU.uWallLit.value.set(pal.cityWallLit); facadeU.uRoof.value.set(pal.cityRoof);
  facadeU.uLit.value = 0.19; facadeU.uCell.value.set(26, 34); facadeU.uWinBloom.value = 0;
  const blocks = scatterTowers({ count: phone ? 80 : 140, rMin: 1700, rMax: 4200, hMin: 240, hMax: 1500, wMin: 120, wMax: 380, seed: 21, palette: [pal.cityWall, '#0e1d19', '#0a1714', '#12221e'] });
  // push the tall ones north so the hero shot gets a skyline behind the spire
  const M = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
  const towers = [];
  for (let i = 0; i < blocks.count; i++) {
    blocks.getMatrixAt(i, M); M.decompose(P, Q, S);
    const d = Math.hypot(P.x, P.z), north = Math.max(0, -P.z / d);
    // the skyline stays below the spire from every stop: height grows with distance, taller to the north
    S.y = Math.min(S.y * (0.6 + 0.7 * north * north), 120 + d * (0.13 + 0.07 * north));
    M.compose(P, Q, S); blocks.setMatrixAt(i, M);
    towers.push({ p: P.clone(), s: S.clone(), q: Q.clone() });
  }
  blocks.instanceMatrix.needsUpdate = true;
  g.add(blocks);
  // ---- signs on the board-facing side of the nearest towers
  // signs go on the nearest tall towers, the arc behind the spire first
  const near = towers.map((t, i) => { const d = Math.hypot(t.p.x, t.p.z); return { ...t, i, d, score: d * (1.6 - Math.max(0, -t.p.z / d)) }; })
    .filter((t) => t.s.y > 300).sort((a, b) => a.score - b.score);
  const used = [];
  const signs = [];
  for (const t of near) {
    if (signs.length >= (phone ? 4 : SIGNS.length)) break;
    const ang = Math.atan2(t.p.z, t.p.x);
    if (used.some((a) => Math.abs(((a - ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < 0.22)) continue;
    used.push(ang);
    const [kanji, en] = SIGNS[signs.length];
    const h = Math.min(t.s.y * 0.5, 420), w = h * 0.22;
    const tex = canvasTex(128, Math.round(128 * h / w), (cx, W, H) => drawSign(cx, W, H, kanji, en, pal.dust, pal));
    const mat = inkMaterial({ base: '#ffffff', map: tex, mapAmt: 1, emissive: true, bloom: false, gain: 0.75 });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    // face the board centre, on the tower's facing wall
    const dir = V(-t.p.x, 0, -t.p.z).normalize();
    const half = Math.max(t.s.x, t.s.z) * 0.5 + 6;
    m.position.copy(t.p).addScaledVector(dir, half); m.position.y = t.s.y * (0.38 + 0.3 * ((signs.length * 37) % 10) / 10) + h * 0.2;
    m.lookAt(0, m.position.y, 0);
    g.add(m);
    signs.push({ mat });
  }
  // the skyline holds still: nothing in the far haze moves or flickers, so the eye stays on the stop
  const update = () => {};
  return { group: g, update, floor, blocks, signs };
}

function drawSign(c, W, H, kanji, en, colour, pal) {
  c.fillStyle = '#05100d'; c.fillRect(0, 0, W, H);
  c.strokeStyle = colour; c.lineWidth = W * 0.05; c.strokeRect(W * 0.06, W * 0.06, W * 0.88, H - W * 0.12);
  c.fillStyle = colour; c.textAlign = 'center'; c.textBaseline = 'middle';
  const chars = [...kanji];
  const cell = Math.min(W * 0.7, (H * 0.66) / chars.length);
  c.font = `700 ${cell * 0.92}px ${jp}`;
  chars.forEach((ch, i) => c.fillText(ch, W / 2, W * 0.2 + cell * (i + 0.55)));
  // the English line runs down the remaining space, rotated
  c.save(); c.translate(W / 2, W * 0.2 + cell * chars.length + (H - W * 0.3 - cell * chars.length) / 2); c.rotate(Math.PI / 2);
  c.font = `700 ${W * 0.3}px ${disp}`; c.fillText(en, 0, 0); c.restore();
}
