import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { inkMaterial as baseInk, shared } from './shared/gfx/ink-material.js';
import { V, canvasTex, QUIET_GLOW, lightMaterial } from './board.js';
import { COLOR } from './shared/gfx/glsl.js';
import { SITES } from './districts.js';
import { batchStatic } from './shared/gfx/batch.js';
import { FOLD_FRONT, FOLD_BACK } from './shared/ui/marks.js';
const inkMaterial = (o) => baseInk({ brushScale: 0.07, dotCell: 4.5, ...o });

// The secure enclave: a plinth inside a laser fence, and on it the cipher cube: a 3x3x3 cube of glyph
// tiles, scrambled and turning slice by slice in red. When the visitor arrives it solves itself, click by
// click, its front face assembles the mark and everything turns green (the fence drops).
// (A geodesic shield cage and a firewall were built and compared; the cube was chosen.)
const mono = '"JetBrains Mono Variable", ui-monospace, monospace';
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp = THREE.MathUtils.clamp, lerp = THREE.MathUtils.lerp;
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const step12 = (t) => Math.floor(t * 12) / 12;
const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export function buildEnclave(pal, parts, silk, { face = V(-80, 0, 660) } = {}) {
  const root = new THREE.Group();
  const { x, z } = SITES.enclave;
  root.position.set(x, 0, z);
  const toCam = Math.atan2(face.x - x, face.z - z); // yaw that turns +z toward the arrival camera
  const brassDark = inkMaterial({ base: pal.brassDark, brush: 0.12, spec: 0.8, rim: 1 });
  const armour = inkMaterial({ base: pal.shieldDark, brush: 0.14, spec: 0.8, rim: 1 });
  // ---- the plinth every lock stands on, and the laser fence round it
  // a pedestal that reads as a block: hard edges the ink catches (the vertical corners too), walls darker than the
  // board, a top lighter than it, a stepped lip at its foot, and a thin brass keyline round the top
  const wall = inkMaterial({ base: pal.ink2, brush: 0.12, spec: 0.3, rim: 0.3 }), top = inkMaterial({ base: pal.shieldDark, brush: 0.12, spec: 0.5, rim: 0.6 });
  const slab = (w, h, d, y, m) => { const s = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); s.position.y = y; root.add(s); return s; };
  slab(266, 6, 226, 3, wall); slab(266, 0.4, 226, 6, top);            // the lip, its step lit like the top
  slab(250, 14.6, 210, 6 + 7.3, wall);                                 // the block
  slab(250, 1.4, 210, 20.6 + 0.7, brassDark); slab(244, 1.5, 204, 20.6 + 0.75, top); // the keyline, and the top inside it
  const laser = inkMaterial({ base: pal.laser, emissive: true });
  const fence = new THREE.Group(); fence.userData.dynamic = true; root.add(fence);
  const W = 330, D = 290;
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const post = new THREE.Mesh(new RoundedBoxGeometry(7, 74, 7, 1, 1.5), armour); post.position.set(sx * W / 2, 37, sz * D / 2); fence.add(post);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), laser); cap.position.set(sx * W / 2, 76, sz * D / 2); fence.add(cap);
  }
  // no beams strung between the posts: red belongs to the locked cube alone, so the fence is four guard posts
  // whose caps burn while it is locked (the hazard band printed round the plinth draws the line)
  // ---- the lock, built facing +z and turned toward the arrival
  const stage = new THREE.Group(); stage.rotation.y = toCam; stage.position.y = 22; stage.userData.dynamic = true; root.add(stage);
  const variants = { cipher: buildCipher() };
  Object.values(variants).forEach((v) => { stage.add(v.group); batchStatic(v.group); v.group.visible = false; });
  let current = 'cipher';
  variants[current].group.visible = true;
  // legend
  if (silk) {
    silk.ao(x, z, 270, 230, 8, 0.95);
    silk.hazard(x, z, W + 34, D + 34, 11, 9);
    silk.text('U9', x - W / 2 - 16, z - D / 2 - 26, 10, { weight: '700' });
    // the marking lies between the arrival camera and the plinth, turned to read from it
    const fw = V(x - face.x, 0, z - face.z).normalize(), rt = V(-fw.z, 0, fw.x), rot = Math.atan2(rt.z, rt.x);
    const at = (a, b) => [x + rt.x * a - fw.x * b, z + rt.z * a - fw.z * b];
    silk.text('SEC-04  ·  REV 5', ...at(-20, 368), 6.5, { rot, stretch: 2 });
  }
  parts.chip(x - 90, z + 262, 36, 36, 4.5, { label: 'TPM', pitch: 3.4 });
  parts.row(x - 120, z + 300, x - 80, z + 300, 3, 'cap');
  parts.sprinkle(x, z, 360, 320, 50, 4, 20);

  // ---------------------------------------------------------------- the cipher cube
  function buildCipher() {
    const g = new THREE.Group();
    const ped = new THREE.Mesh(new RoundedBoxGeometry(72, 16, 72, 2, 4), armour); ped.position.y = 8; g.add(ped);
    const cap = new THREE.Mesh(new RoundedBoxGeometry(52, 4, 52, 1, 1.5), brassDark); cap.position.y = 18; g.add(cap);
    const ringMat = inkMaterial({ base: pal.laser, emissive: true });
    const pedRing = new THREE.Mesh(new THREE.TorusGeometry(32, 1.4, 6, 48).rotateX(Math.PI / 2), ringMat); pedRing.position.y = 16.5; g.add(pedRing);
    const S = 40, PITCH = 44, CY = 132;
    // the field the cube hangs in: a column of printed light from the dock up to it, in the lock's colour, thinning
    // as it rises (without it the cube floated over the dock with nothing between them)
    const colH = CY - PITCH * 1.5 - 20;
    const column = new THREE.Mesh(new THREE.CylinderGeometry(30, 24, colH, 32, 1, true), lightMaterial({
      color: pal.laser, print: true,
      vertex: /* glsl */ `in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY;
        void main(){ vY = position.y / ${colH.toFixed(1)} + 0.5; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,
      fragment: /* glsl */ `precision highp float; ${COLOR} uniform vec3 uColor; uniform float uAmt, uPx; in float vY;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){ float k = vY < 0.34 ? 1.0 : (vY < 0.68 ? 0.5 : 0.18); float d = halftone(gl_FragCoord.xy, 6.5 * uPx, 0.785, 0.24 * k * uAmt);
          gColor = vec4(uColor, d * step(0.01, uAmt)); gNormal = vec4(0.0); }`,
      uniforms: { uAmt: { value: 1 }, uPx: shared.uPx },
    }));
    column.position.y = 20 + colH / 2; column.frustumCulled = false; column.userData.dynamic = true; g.add(column);
    const cube = new THREE.Group(); cube.position.y = CY; cube.rotation.set(0.3, -0.42, 0); cube.userData.dynamic = true; g.add(cube);
    // 26 cubies (the hidden centre is left out), each a rounded block with a sticker on every outer face
    const home = [];
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) if (i || j || k) home.push(V(i, j, k));
    // (matte, with almost no rim: the case light's brass rim framed every face and the locked cube read orange-gold)
    const bodies = new THREE.InstancedMesh(new RoundedBoxGeometry(S, S, S, 2, 4), inkMaterial({ base: pal.anod, brush: 0.1, spec: 0.4, rim: 0.15, instanced: true }), home.length);
    bodies.frustumCulled = false; cube.add(bodies);
    // the atlas: sixteen hex glyphs round the edge of a 5 x 5 grid, the mark across the 3 x 3 block in the corner
    const CELL = 256;
    const atlas = canvasTex(CELL * 5, CELL * 5, (c, Wd) => {
      c.fillStyle = '#000'; c.fillRect(0, 0, Wd, Wd);
      const glyphCell = (k) => (k < 10 ? [k % 5, Math.floor(k / 5)] : [(k - 10) % 2, 2 + Math.floor((k - 10) / 2)]);
      '0123456789ABCDEF'.split('').forEach((ch, k) => {
        const [cx, cy] = glyphCell(k), X = cx * CELL, Y = cy * CELL;
        c.strokeStyle = 'rgba(255,255,255,0.34)'; c.lineWidth = 7; c.strokeRect(X + 22, Y + 22, CELL - 44, CELL - 44);
        c.fillStyle = '#fff'; c.font = `700 150px ${mono}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, X + CELL / 2, Y + CELL / 2 + 8);
        c.fillRect(X + 40, Y + CELL - 52, 30, 7);
      });
      // the mark, back fold grey and front fold white, across cells (2..4, 2..4)
      const k = (CELL * 3) / 120;
      c.save(); c.translate(CELL * 2, CELL * 2); c.scale(k, k);
      for (const [d, col] of [[FOLD_BACK, '#8c8c8c'], [FOLD_FRONT, '#ffffff']]) {
        c.fillStyle = col;
        for (const sub of d.split('M').filter((q) => q.trim())) {
          const pts = sub.replace(/Z/g, '').trim().split(/\s*L\s*/).map((q) => q.split(',').map(Number));
          c.beginPath(); pts.forEach(([px, py], i) => (i ? c.lineTo(px, py) : c.moveTo(px, py))); c.closePath(); c.fill();
        }
      }
      c.restore();
    });
    const glyphCell = (k) => (k < 10 ? [k % 5, Math.floor(k / 5)] : [(k - 10) % 2, 2 + Math.floor((k - 10) / 2)]);
    const FACES = [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]];
    const faceLocal = FACES.map(([ax, sg]) => {
      const n = V(0, 0, 0).setComponent(ax, sg), q = new THREE.Quaternion().setFromUnitVectors(V(0, 0, 1), n);
      return new THREE.Matrix4().compose(n.clone().multiplyScalar(S / 2 + 0.45), q, V(1, 1, 1));
    });
    const stickers = [];
    home.forEach((h, ci) => FACES.forEach(([ax, sg], fi) => {
      if (h.getComponent(ax) !== sg) return;
      // every tile carries a glyph; the front face's tiles also carry their piece of the mark, shown once solved
      const glyph = glyphCell(Math.floor(hash(ci * 6.1 + fi * 2.3) * 16));
      if (ax === 2 && sg === 1) stickers.push({ ci, fi, cell: [2 + h.x + 1, 2 + 1 - h.y], glyph, mark: 1 });
      else stickers.push({ ci, fi, cell: glyph, glyph, mark: 0 });
    }));
    const sGeo = new THREE.PlaneGeometry(S - 5, S - 5);
    const EXT = (PITCH - 1.2 - (S - 5)) / 2; // solved, a mark tile reaches across the gap to a hairline seam
    const SPAN = 2 * PITCH + (S - 5);        // the mark is printed across the whole face, gaps included
    const f = (x) => x.toFixed(3);
    sGeo.setAttribute('aCell', new THREE.InstancedBufferAttribute(new Float32Array(stickers.flatMap((s) => s.cell)), 2));
    sGeo.setAttribute('aMark', new THREE.InstancedBufferAttribute(new Float32Array(stickers.map((s) => s.mark)), 1));
    sGeo.setAttribute('aGlyph', new THREE.InstancedBufferAttribute(new Float32Array(stickers.flatMap((s) => s.glyph)), 2));
    sGeo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(new Float32Array(stickers.map((_, i) => hash(i * 3.3))), 1));
    const sMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      // the mark is one picture across the front face: each tile shows the part of it that lies under the tile, and
      // solved, the tiles grow across the gaps between the cubies (toward their neighbours only), so the face reads
      // as one mark cut by hairline seams instead of nine tiles behind a grid
      vertexShader: /* glsl */ `in vec3 position; in vec2 uv; in mat4 instanceMatrix; in vec2 aCell, aGlyph; in float aMark, aSeed;
        uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform float uSolve;
        out vec2 vUv, vFace; out vec3 vN; flat out vec2 vCell, vGlyph; flat out float vMark, vSeed;
        void main(){ vUv = uv; vCell = aCell; vGlyph = aGlyph; vMark = aMark; vSeed = aSeed;
          vec3 p = position; vFace = vec2(0.0);
          if (aMark > 0.5) {
            float sv = smoothstep(aSeed * 0.62, aSeed * 0.62 + 0.38, uSolve);
            float ext = ${f(EXT)} * smoothstep(0.5, 1.0, sv); // grows across the gaps once it has flipped to the mark
            float hx = aCell.x - 3.0, hy = 3.0 - aCell.y;
            if (p.x > 0.0 && hx < 0.5) p.x += ext;
            if (p.x < 0.0 && hx > -0.5) p.x -= ext;
            if (p.y > 0.0 && hy < 0.5) p.y += ext;
            if (p.y < 0.0 && hy > -0.5) p.y -= ext;
            vFace = vec2(hx, hy) * ${f(PITCH)} + p.xy;
          }
          mat4 mv = viewMatrix * modelMatrix * instanceMatrix; vN = normalize(mat3(mv) * vec3(0.0, 0.0, 1.0));
          gl_Position = projectionMatrix * mv * vec4(p, 1.0); }`,
      fragmentShader: /* glsl */ `precision highp float; uniform sampler2D uAtlas; uniform vec3 uLock, uOk, uHot; uniform float uSolve, uStep, uAmt, uWake;
        in vec2 vUv, vFace; in vec3 vN; flat in vec2 vCell, vGlyph; flat in float vMark, vSeed;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){
          // locked, every tile is an ink face with a glyph in vermilion; in the solve each front tile flips, click by
          // click, to its piece of the mark (cream fold, green legs) and the other glyphs turn a dim green
          float sv = smoothstep(vSeed * 0.62, vSeed * 0.62 + 0.38, uSolve);
          bool mk = vMark > 0.5 && sv > 0.5;
          vec2 q = mk ? (vec2(2.0, 0.0) + 3.0 * clamp(vFace / ${f(SPAN)} + 0.5, 0.0, 1.0)) / 5.0
                      : (vec2(vGlyph.x, 4.0 - vGlyph.y) + 0.02 + vUv * 0.96) / 5.0;
          float g = texture(uAtlas, q).r;
          // scrambled, the glyphs flicker on twos; solved, they hold steady and the mark burns brightest
          float fl = mix(1.0, mix(step(0.22, fract(sin(vSeed * 91.7 + floor(uStep * 12.0) * 3.1) * 43758.5)), 1.0, sv), uWake);
          // (solved, the rest of the cipher stays a dim vermilion: the cube still reads as a cipher, not another mark;
          // on standby it all sinks low, so it never pulls the eye back once you have left)
          vec3 ok = mk ? (g > 0.8 ? uHot : uOk) : uLock * 0.42;
          float gg = mk ? step(0.3, g) : g;
          vec3 lit = (mk ? ok : mix(uLock, ok, vMark > 0.5 ? 0.0 : sv)) * mix(0.18, 1.0, uWake);
          vec3 col = mix(vec3(0.012, 0.032, 0.027), lit * (0.3 + 0.7 * fl) * uAmt, gg);
          gColor = vec4(col, 1.0); gNormal = vec4(normalize(vN) * 0.5 + 0.5, ${QUIET_GLOW}.0 / 255.0);
        }`,
      uniforms: { uAtlas: { value: atlas }, uLock: { value: new THREE.Color(pal.laser) }, uOk: { value: new THREE.Color(pal.signal) }, uHot: { value: new THREE.Color(pal.cream) }, uSolve: { value: 0 }, uStep: shared.uStep, uAmt: { value: 1 }, uWake: { value: 1 } },
    });
    const stickerMesh = new THREE.InstancedMesh(sGeo, sMat, stickers.length); stickerMesh.frustumCulled = false; cube.add(stickerMesh);
    // state: each cubie's grid position and orientation; a move turns one slice a quarter
    const AX = [V(1, 0, 0), V(0, 1, 0), V(0, 0, 1)];
    const st = home.map((h) => ({ p: h.clone(), q: new THREE.Quaternion() }));
    const apply = (mv) => {
      const R = new THREE.Quaternion().setFromAxisAngle(AX[mv.ax], (mv.dir * Math.PI) / 2);
      st.forEach((c) => { if (Math.round(c.p.getComponent(mv.ax)) !== mv.l) return; c.p.applyQuaternion(R).round(); c.q.premultiply(R); });
    };
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const hist = [];
    const randMove = () => {
      let mv;
      do { mv = { ax: Math.floor(rnd() * 3), l: Math.floor(rnd() * 3) - 1, dir: rnd() < 0.5 ? -1 : 1 }; }
      while (hist.length && hist[hist.length - 1].ax === mv.ax && hist[hist.length - 1].l === mv.l);
      return mv;
    };
    for (let k = 0; k < 5; k++) { const mv = randMove(); apply(mv); hist.push(mv); }
    let cur = null, idleAt = 0, solving = false, solvedAt = -1, solve = 0, resumeIn = 0;
    const Mc = new THREE.Matrix4(), Ms = new THREE.Matrix4(), Rq = new THREE.Quaternion(), T = new THREE.Vector3();
    const layout = (ang) => {
      if (cur) Rq.setFromAxisAngle(AX[cur.ax], ang); else Rq.identity();
      const Mr = new THREE.Matrix4().makeRotationFromQuaternion(Rq);
      st.forEach((c, i) => {
        Mc.compose(T.copy(c.p).multiplyScalar(PITCH), c.q, V(1, 1, 1));
        if (cur && Math.round(c.p.getComponent(cur.ax)) === cur.l) Mc.premultiply(Mr);
        bodies.setMatrixAt(i, Mc);
        st[i].m = Mc.clone();
      });
      stickers.forEach((s, j) => { Ms.multiplyMatrices(st[s.ci].m, faceLocal[s.fi]); stickerMesh.setMatrixAt(j, Ms); });
      bodies.instanceMatrix.needsUpdate = true; stickerMesh.instanceMatrix.needsUpdate = true;
    };
    layout(0);
    return {
      group: g, leds: [pedRing], column, stickers: stickerMesh,
      unlock(t) { solving = true; solvedAt = -1; },
      lock() { solving = false; solvedAt = -1; resumeIn = 1.0; },
      get solved() { return solvedAt >= 0; },
      update(t, dt, sfx, near, wake = 1) {
        const s = step12(t);
        sMat.uniforms.uWake.value = wake;
        if (resumeIn) { idleAt = s + resumeIn; resumeIn = 0; }   // left alone a moment, it scrambles again
        // standing by while the visitor is elsewhere: the cube finishes its turn, scrambles itself out of sight
        // (dim and far away by now) so there is a solve to watch on the way back, then holds still
        if (wake < 0.3 && !cur && !solving) {
          if (hist.length < 5) { while (hist.length < 5) { const mv = randMove(); apply(mv); hist.push(mv); } layout(0); }
          idleAt = Math.max(idleAt, s + 0.2);
          solve = Math.max(0, solve - dt * 2); sMat.uniforms.uSolve.value = solve;
          return solve;
        }
        if (!cur) {
          if (solving) {
            if (hist.length) { const h = hist.pop(); cur = { ax: h.ax, l: h.l, dir: -h.dir, t0: s, dur: 1 / 6, push: false }; }
            else if (solvedAt < 0) { solvedAt = s; sfx?.play('unlock'); sfx?.cubeSolved?.(); }
          } else if (s >= idleAt) {
            const pop = hist.length >= 6 || (hist.length >= 3 && rnd() < 0.4);
            if (pop) { const h = hist.pop(); cur = { ax: h.ax, l: h.l, dir: -h.dir, t0: s, dur: 0.25, push: false }; }
            else { const mv = randMove(); cur = { ...mv, t0: s, dur: 0.25, push: true }; }
          }
        }
        let ang = 0;
        if (cur) {
          const k = clamp((s - cur.t0) / cur.dur, 0, 1);
          ang = (cur.dir * Math.PI) / 2 * ease(k);
          if (k >= 1) {
            apply(cur); if (cur.push) hist.push({ ax: cur.ax, l: cur.l, dir: cur.dir });
            if (near) sfx?.play(solving ? 'dial' : 'dialIdle');
            cur = null; ang = 0; idleAt = s + 0.38;
          }
        }
        layout(ang);
        // a slow bob on twos; solved, the stickers turn green and the mark burns
        cube.position.y = CY + Math.sin(s * 1.4) * 3;
        solve = solvedAt >= 0 ? seg(s - solvedAt, 0, 0.6) : Math.max(0, solve - dt * 2);
        sMat.uniforms.uSolve.value = solve;
        return solve;
      },
    };
  }

  // ---- state shared by every lock: lasers and lights go from red to green as it opens
  const red = new THREE.Color(pal.laser), green = new THREE.Color(pal.signal), tmp = new THREE.Color();
  let unlocked = 0;
  const api = {
    group: root, laserMat: laser, variants,
    get current() { return current; },
    set(name) {
      if (!variants[name] || name === current) return;
      variants[current].group.visible = false; variants[current].lock();
      current = name; variants[current].group.visible = true;
    },
    unlock(t) { variants[current].unlock(t); },
    lock() { variants[current].lock(); },
    get solved() { return !!variants[current].solved; },
    update(t, dt, sfx, near = false, wake = 1) {
      const s = step12(t);
      const v = variants[current];
      const open = v.update(t, dt, sfx, near, wake) || 0;
      unlocked += (open - unlocked) * (1 - Math.exp(-dt * 10));
      // lasers fade out and the beams stop scanning once the lock is open; standing by they glow low and steady
      laser.uniforms.uGain.value = lerp(1, 0.06, unlocked) * (unlocked < 0.5 && wake > 0.5 ? (0.8 + 0.2 * (Math.floor(s * 6) % 2)) : 1) * lerp(0.3, 1, wake);
      fence.position.y = -80 * Math.round(clamp(unlocked * 1.15, 0, 1) * 6) / 6; // sinks into the board, on twos
      tmp.copy(red).lerp(green, clamp(unlocked * 1.4, 0, 1));
      v.leds.forEach((m) => (m.material ?? m).uniforms.uBase.value.copy(tmp));
      if (v.column) { v.column.material.uniforms.uColor.value.copy(tmp); v.column.material.uniforms.uAmt.value = lerp(0.15, 1, wake); }
    },
  };
  return api;
}
