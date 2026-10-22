// The Power on panel, design 6a ("3b + card trim"), and its hologram entrance. Ported from
// reference/hero-6a/hero6a.js, the source of truth: the geometry, the floors and the timeline are kept as they are;
// only how the panel is created, mounted and wired is the site's (the markup is rendered with the page by
// heroMarkup, in the Power on stop, and createHero adopts it).
//
//   const hero = createHero({ root });                                        // the rendered .h6
//   hero.layout({ vw, vh, crown: { x, y }, gutter, bandTop, bandBottom });   // load, resize, rotation, fonts
//   hero.setCrown({ x, y });     // per frame, if the crown moves on screen while the panel is up
//   await hero.enter();          // arriving at Power on (hologram entrance, ~1 s)
//   await hero.leave();          // departing (~0.2 s)
//   hero.seek(ms);               // captures: freeze the running entrance at ms
//
// Coordinates are in the parent's CSS px. `crown` is the projected crown point (centre of the ring).
import { esc, nowrapParts } from './shared/world/ui.js';

const NS = 'http://www.w3.org/2000/svg';
const TAN = Math.tan(Math.PI / 8); // chamfer offset per unit of inset (45° corner)

// Geometry in design units (u), frame-relative. At k = 1 these are the mock's px.
const G = {
  W: 1250,
  pad: { off: 30, r: 7, pwrGap: 11.2 },
  corner: { dOut: 1.5, gap: 6.5, chamfer: 34, arm: 64, lineOut: 2.5, lineIn: 2 },
  fingers: { a: [117, 832], b: [867, 1162], finger: 10, pitch: 15 },
  ring: { r: 8, stroke: 2.5, core: 2.5, gap: 8.5, trace: 2.5 },
  minRun: 80, // trace must run at least this far (u) to the right of the frame before turning
  alpha: 0.472, // vertical placement inside the band (0.5 = centred)
  kFloor: 0.2, // smallest scale on desktop (compact: 0.15)
  kMax: 1.3,
};

// Timeline, in ms from the start of enter(). Tune here; nothing else hard-codes a time.
export const TIMELINE = {
  trace: { at: 0, dur: 240 },                                   // trace runs from the crown to the PWR pad
  ping: { at: 0, dur: 320 },                                    // a ring pings out from the crown
  pad: { at: 200, dur: 160 },                                   // the PWR pad pops
  pwr: { at: 200, flicker: [[0, 0], [1, 1], [40, 0.15], [70, 1]] },
  corners: { at: 210, stagger: 30, order: ['tr', 'tl', 'br', 'bl'], flicker: [[0, 0], [1, 1], [30, 0.2], [60, 1]] },
  sweep: { at: 280, dur: 400, easing: 'cubic-bezier(.45,.05,.55,.95)' }, // beam top → bottom; content arrives behind it
  beamOff: 20,                                                  // the beam blinks out this long after the sweep
  holo: [[280, 0.95], [700, 0.95], [720, 0.35], [740, 0.8], [790, 0.3], [840, 0]],     // scanline volume (opacity)
  flicker: [[280, 0.8], [330, 0.35], [370, 1], [520, 0.65], [550, 1], [700, 0.6], [730, 1]], // content opacity
  bands: [[-10, 29], [29, 47], [47, 68], [68, 112]],            // the name cut into bands (% of its box)
  slices: [[1, 600, 650, 16], [2, 690, 720, -9], [0, 760, 780, 6]], // [band, from, to, shift in u]
  lockup: [700, 740, -10],                                      // [from, to, shift in u]
  ghosts: { at: 560, dur: 240, shift: 8, opacity: 0.6 },        // fringes sit off the name as it appears, close in from 560
  fingers: { at: 720, dur: 200, steps: 11 },                    // gold fingers light left to right
  farPad: { at: 900, dur: 140 },
  end: 1040,
  leave: {                                                      // departure, about 0.2 s
    flicker: [[0, 1], [40, 0.3], [80, 0.85], [120, 0.15], [160, 0]],
    trace: 200,                                                 // the trace pulls back into the crown
    ring: [[0, 1], [140, 1], [170, 0.3], [200, 0]],
  },
  reduced: { enter: 200, leave: 150 },                          // prefers-reduced-motion: plain fades
};

// The name's halftone fill: a staggered dot screen that starts a fifth of the way down the letters
// and closes up toward the baseline. Drawn on a canvas at the exact device scale (k × devicePixelRatio)
// so the dots stay crisp; cached in 5% steps.
const halftoneCache = new Map();
export function halftoneURL(scale = 1, doc = document) {
  const s = Math.max(0.25, Math.round(scale * 20) / 20);
  if (halftoneCache.has(s)) return halftoneCache.get(s);
  const canvas = doc.createElement('canvas');
  canvas.width = Math.ceil(1400 * s);
  canvas.height = Math.ceil(520 * s);
  const g = canvas.getContext('2d');
  g.fillStyle = '#ece6d4';
  for (let j = 0; j < 39; j++) {
    const y = 139.5 + 10 * j;                                   // rows every 10u from 139.5u
    const t = Math.min(1, Math.max(0, (y - 139.5) / 370));
    const r = 0.6 + 4.6 * Math.pow(t, 1.25);                    // dot radius grows 0.6u → 5.2u
    g.beginPath();
    for (let x = j % 2 ? 4.5 : -0.5; x < 1410; x += 10) {       // alternate rows offset by 5u
      g.moveTo((x + r) * s, y * s);
      g.arc(x * s, y * s, r * s, 0, Math.PI * 2);
    }
    g.fill();
  }
  const url = `url("${canvas.toDataURL('image/png')}")`;
  halftoneCache.set(s, url);
  return url;
}

const LOCKUP = [
  // [text, size class, layer, x, y] in u, relative to the lockup box (painted in this order)
  ['AMBITIOUS', 'big', 'dots', 50.2, 14],
  ['AMBITIOUS', 'big', 'line', 42.2, 6],
  ['AMBITIOUS', 'big', 'face', 35.2, 0],
  ['IDEAS', 'small', 'dots', 877.8, 19.7],
  ['IDEAS', 'small', 'line', 873.4, 15.3],
  ['IDEAS', 'small', 'face', 869.5, 12],
  ['SOFTWARE', 'small', 'dots', 879, 79.9],
  ['SOFTWARE', 'small', 'line', 874.6, 75.5],
  ['SOFTWARE', 'small', 'face', 870.8, 72.2],
];

const u = (n) => `calc(${n} * var(--u))`;

/** the panel, rendered with the page in the Power on stop (hidden until it enters); the copy is the site's */
export function heroMarkup({ name, place, role, statement, spec, code }) {
  const lockup = LOCKUP.map(([text, size, layer, x, y]) =>
    `<span class="h6__p h6__p--${size} h6__p--${layer}" style="left: ${u(x)}; top: ${u(y)}">${text}</span>`
  ).join('');
  return `<div class="h6" hidden>
<div class="h6__content">
  <div class="h6__strip">
    <span class="h6__dot" aria-hidden="true"></span>
    <span class="h6__label">${esc(place)}</span>
    <span class="h6__rule" aria-hidden="true"></span>
    <span class="h6__role">${nowrapParts(role)}</span>
  </div>
  <h1 class="h6__name" id="h-top">
    <span class="h6__art">
      <span class="h6__name-plate" aria-hidden="true">${esc(name)}</span>
      <span class="h6__name-face">${esc(name)}</span>
    </span>
  </h1>
  <p class="h6__lockup">
    <span class="h6__sr">${esc(statement)}</span>
    <span class="h6__lk" aria-hidden="true">${lockup}<span class="h6__bar"></span></span>
  </p>
  <p class="h6__spec"><span class="h6__dash" aria-hidden="true"></span><span>${esc(spec)}</span></p>
  <div class="h6__holo" aria-hidden="true"></div>
  <div class="h6__beam" aria-hidden="true"></div>
</div>
<div class="h6__fingers" aria-hidden="true"><i class="h6__run"></i><i class="h6__run"></i></div>
<div class="h6__pwr" aria-hidden="true">${esc(code)}</div>
<svg class="h6__trim" aria-hidden="true" xmlns="${NS}">
  <g class="h6-corner" data-c="tl"></g><g class="h6-corner" data-c="tr"></g>
  <g class="h6-corner" data-c="br"></g><g class="h6-corner" data-c="bl"></g>
  <circle class="h6-pad" data-pad="tr"></circle><circle class="h6-pad" data-pad="bl"></circle>
</svg>
</div>`;
}

function leaderMarkup() {
  return `<path class="h6-leader__trace"></path><circle class="h6-leader__ping"></circle>
<circle class="h6-leader__ring"></circle><circle class="h6-leader__core"></circle>`;
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const setHidden = (node, hidden) => node.toggleAttribute('hidden', hidden);
const isHidden = (node) => node.hasAttribute('hidden');

// Keyframes that jump between values (no tweening): [[ms, value], ...] → [keyframes, duration].
function stepped(seq, prop, fmt = (v) => v) {
  const end = seq[seq.length - 1][0];
  const kf = [];
  seq.forEach(([t, v], i) => {
    // A jump exactly at 0 would also apply before the delay (fill: backwards), so nudge it.
    const offset = i > 0 ? Math.max(1e-4, end ? t / end : 1) : 0;
    if (i > 0) kf.push({ [prop]: fmt(seq[i - 1][1]), offset });
    kf.push({ [prop]: fmt(v), offset });
  });
  return [kf, end];
}

/** the panel's behaviour, on the rendered .h6; the leader (trace and ring) goes into the same layer */
export function createHero({ root, leaderParent = root.parentElement, doc = root.ownerDocument }) {
  setHidden(root, true);

  const leader = doc.createElementNS(NS, 'svg');
  leader.setAttribute('class', 'h6-leader');
  leader.setAttribute('aria-hidden', 'true');
  leader.innerHTML = leaderMarkup();
  setHidden(leader, true);

  leaderParent.append(leader);

  const $ = (s) => root.querySelector(s);
  const el = {
    content: $('.h6__content'),
    strip: $('.h6__strip'),
    role: $('.h6__role'),
    name: $('.h6__name'),
    art: $('.h6__art'),
    face: $('.h6__name-face'),
    lk: $('.h6__lk'),
    holo: $('.h6__holo'),
    beam: $('.h6__beam'),
    fingers: $('.h6__fingers'),
    runs: [...root.querySelectorAll('.h6__run')],
    pwr: $('.h6__pwr'),
    trim: $('.h6__trim'),
    corners: Object.fromEntries([...root.querySelectorAll('.h6-corner')].map((g) => [g.dataset.c, g])),
    padTR: $('[data-pad="tr"]'),
    padBL: $('[data-pad="bl"]'),
    trace: leader.querySelector('.h6-leader__trace'),
    ping: leader.querySelector('.h6-leader__ping'),
    ring: leader.querySelector('.h6-leader__ring'),
    core: leader.querySelector('.h6-leader__core'),
  };

  const state = { k: 1, compact: false, m: null, box: null, crown: null, vw: 0, vh: 0, pending: null };
  let anims = [];
  let temps = [];
  let frozen = false;

  // ---------- layout ----------

  function metrics(k) {
    const f = (v, min = 0) => Math.max(min, v * k);
    const c = G.corner;
    return {
      k,
      W: G.W * k,
      padTop: f(34, 12),
      row: f(24, 18),
      padR: f(G.pad.r, 4),
      padOff: f(G.pad.off, 18),
      pwrGap: f(G.pad.pwrGap, 6),
      dOut: f(c.dOut, 0.75),
      gap: f(c.gap, 4),
      chamfer: f(c.chamfer, 10),
      arm: f(c.arm, 20),
      lineOut: f(c.lineOut, 1.5),
      lineIn: f(c.lineIn, 1),
      fw: f(G.fingers.finger, 4),
      ringR: f(G.ring.r, 5),
      ringStroke: f(G.ring.stroke, 1.5),
      coreR: f(G.ring.core, 1.5),
      ringGap: f(G.ring.gap, 5.5),
      traceW: f(G.ring.trace, 1.5),
      colGap: f(16, 6),       // phones: the trace's column just right of the frame
      cut: f(12, 6),          // 45° cut on the trace's square corners
    };
  }

  function apply(k, compact) {
    const m = metrics(k);
    // Measure even while hidden: lay out invisibly, then restore.
    const wasHidden = isHidden(root);
    if (wasHidden) {
      root.style.visibility = 'hidden';
      setHidden(root, false);
    }
    root.classList.toggle('h6--compact', compact);
    root.classList.remove('h6--wrap');
    root.style.setProperty('--k', `${k}px`);
    root.style.setProperty('--h6-halftone', halftoneURL(k * (doc.defaultView?.devicePixelRatio || 1), doc));

    // PWR sits left of the top-right pad, on the strip's first row.
    const pwrRight = m.padOff + m.padR + m.pwrGap;
    el.pwr.style.right = `${pwrRight}px`;
    root.style.setProperty('--pwr-room', `${pwrRight + el.pwr.offsetWidth + Math.max(10, 20 * k)}px`);
    // Small desktop sizes: once the strip can't hold one row with clear space before PWR, wrap it
    // like the phone layout (role on its own line) so the role and the rule never run into PWR.
    if (!compact) {
      const gap = el.pwr.getBoundingClientRect().left - el.role.getBoundingClientRect().right;
      if (el.strip.offsetHeight > m.row * 1.5 || gap < Math.max(16, 40 * k)) root.classList.add('h6--wrap');
    }

    // Gold fingers: two runs split by the key notch under the lockup's bar; whole fingers only.
    const fp = m.fw * (G.fingers.pitch / G.fingers.finger);
    el.fingers.style.setProperty('--fw', `${m.fw}px`);
    el.fingers.style.setProperty('--fp', `${fp}px`);
    [G.fingers.a, G.fingers.b].forEach(([x0, x1], i) => {
      const n = Math.max(1, Math.floor((x1 * k - x0 * k + (fp - m.fw)) / fp));
      Object.assign(el.runs[i].style, { left: `${x0 * k}px`, width: `${n * fp - (fp - m.fw)}px` });
    });

    m.H = root.offsetHeight;
    m.contentH = el.content.offsetHeight;
    m.padY = m.padTop + m.row / 2;
    drawTrim(m);
    if (wasHidden) {
      setHidden(root, true);
      root.style.visibility = '';
    }
    return m;
  }

  function cornerPaths(m, d) {
    const { W, H, chamfer: C, arm: A } = m;
    const t = d * TAN;
    return {
      tl: `M${d} ${d + A}V${d}H${d + A}`,
      tr: `M${W - d - C - A + t} ${d}H${W - d - C + t}L${W - d} ${d + C - t}V${d + C + A - t}`,
      br: `M${W - d} ${H - d - A}V${H - d}H${W - d - A}`,
      bl: `M${d} ${H - d - C - A + t}V${H - d - C + t}L${d + C - t} ${H - d}H${d + C + A - t}`,
    };
  }

  function drawTrim(m) {
    const svg = el.trim;
    svg.setAttribute('width', m.W);
    svg.setAttribute('height', m.H);
    svg.setAttribute('viewBox', `0 0 ${m.W} ${m.H}`);
    const outer = cornerPaths(m, m.dOut);
    const inner = cornerPaths(m, m.dOut + m.gap);
    for (const c of ['tl', 'tr', 'br', 'bl']) {
      el.corners[c].innerHTML =
        `<path d="${outer[c]}" fill="none" stroke="#8a7140" stroke-width="${m.lineOut}"/>` +
        `<path d="${inner[c]}" fill="none" stroke="#2e4945" stroke-width="${m.lineIn}"/>`;
    }
    const set = (n, a) => Object.entries(a).forEach(([k, v]) => n.setAttribute(k, v));
    set(el.padTR, { cx: m.W - m.padOff, cy: m.padY, r: m.padR, fill: '#d7ae60' });
    set(el.padBL, { cx: m.padOff, cy: m.H - m.padY, r: m.padR, fill: '#d7ae60' });
  }

  function place(m, o, compact) {
    const left = o.gutter - m.dOut; // the outer corner line sits on the page gutter
    let top;
    if (compact && o.anchorBottom != null) top = o.anchorBottom - m.H;
    else if (compact) top = o.bandBottom - m.H;
    else top = o.bandTop + (o.bandBottom - o.bandTop - m.H) * G.alpha;
    return { left, top };
  }

  // The trace, written from the crown end so the draw-in starts at the crown.
  function route(m, box, crown, vw) {
    const pad = { x: box.left + m.W - m.padOff, y: box.top + m.padY };
    const end = pad.x + m.padR;
    const g = m.ringGap;
    const c = m.cut;
    // Desktop: from the pad straight right, then 45° into the ring's left side.
    const turnX = crown.x - g - Math.abs(crown.y - pad.y);
    if (turnX >= end + 4) return `M${crown.x - g} ${crown.y}L${turnX} ${pad.y}H${end}`;
    // Otherwise (phones, odd ratios): out of the pad to a column just right of the frame, along
    // the column, then 45° into the side of the ring that faces it.
    const xg = clamp(box.left + m.W + m.colGap, end + c + 2, vw - 4);
    const sx = Math.sign(xg - crown.x) || 1;
    const sy = Math.sign(pad.y - crown.y) || 1;
    const e = { x: crown.x + sx * g * Math.SQRT1_2, y: crown.y + sy * g * Math.SQRT1_2 };
    const by = e.y + sy * Math.abs(xg - e.x);
    if (sy * (pad.y - by) >= c) {
      return `M${e.x} ${e.y}L${xg} ${by}V${pad.y - sy * c}L${xg - c} ${pad.y}H${end}`;
    }
    // Last resort: square route at the crown's height, corners cut at 45°.
    return `M${crown.x + sx * g} ${crown.y}H${xg - sx * c}L${xg} ${crown.y + sy * c}V${pad.y - sy * c}L${xg - c} ${pad.y}H${end}`;
  }

  function drawLeader(m, box, crown, vw, vh) {
    leader.setAttribute('width', vw);
    leader.setAttribute('height', vh);
    leader.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    if (!crown) {
      el.trace.removeAttribute('d');
      return;
    }
    el.trace.setAttribute('d', route(m, box, crown, vw));
    el.trace.setAttribute('pathLength', '1'); // dash maths in fractions of the path, whatever its length
    el.trace.setAttribute('stroke-width', m.traceW);
    for (const [n, r] of [[el.ring, m.ringR], [el.ping, m.ringR], [el.core, m.coreR]]) {
      n.setAttribute('cx', crown.x);
      n.setAttribute('cy', crown.y);
      n.setAttribute('r', r);
    }
    el.ring.setAttribute('stroke-width', m.ringStroke);
    el.ping.setAttribute('stroke-width', m.ringStroke * 0.8);
  }

  // Can the panel be measured right now? Not if its layer (or any parent) is display: none.
  function canMeasure() {
    const was = isHidden(root);
    if (was) {
      root.style.visibility = 'hidden';
      setHidden(root, false);
    }
    const ok = root.getClientRects().length > 0;
    if (was) {
      setHidden(root, true);
      root.style.visibility = '';
    }
    return ok;
  }

  /**
   * vw, vh        the viewport the panel's layer covers (CSS px)
   * crown         {x, y}: the crown point projected with the Power on rest camera (no sway or shake),
   *               or null for no leader
   * gutter        page gutter: the x where the nav logo and the route strip start
   * bandTop       bottom of the top bar
   * bandBottom    top of the route strip
   * compact       force the phone layout on or off (default: portrait-ish, or narrower than 600 px)
   * anchorBottom  phones: where the panel's bottom edge goes (default bandBottom)
   *
   * Returns { k, compact, frame } or null if the layer isn't rendered; the layout is then kept and
   * re-run with these options on the next enter() or show().
   */
  function layout(o) {
    const opt = { gutter: 64, bandTop: 0, bandBottom: o.vh, crown: null, ...o };
    if (!canMeasure()) {
      state.pending = opt;
      return null;
    }
    const compact = opt.compact ?? (opt.vw < 600 || opt.vw / opt.vh < 1.1);
    const avail = (compact ? opt.anchorBottom ?? opt.bandBottom : opt.bandBottom) - opt.bandTop;
    const kFloor = compact ? 0.15 : G.kFloor;
    let k = compact
      ? (opt.vw - 2 * opt.gutter) / G.W
      : Math.min(opt.vw / 2551, opt.vh / 1265, avail / 880, G.kMax);
    k = Math.max(kFloor, k);
    let m;
    let box;
    for (let i = 0; i < 40; i++) {
      m = apply(k, compact);
      box = place(m, opt, compact);
      const tooTall = m.H > avail; // px floors can make the panel taller than 818u
      let noRoom = false;          // the trace must run right of the frame before it turns
      if (!compact && opt.crown) {
        const turnX = opt.crown.x - m.ringGap - Math.abs(opt.crown.y - (box.top + m.padY));
        noRoom = turnX - (box.left + m.W) < G.minRun * k;
      }
      if ((!tooTall && !noRoom) || k <= kFloor) break;
      k = Math.max(kFloor, k * 0.95);
    }
    root.style.left = `${box.left}px`;
    root.style.top = `${box.top}px`;
    Object.assign(state, { k, compact, m, box, crown: opt.crown, vw: opt.vw, vh: opt.vh, pending: null });
    drawLeader(m, box, opt.crown, opt.vw, opt.vh);
    if (!isHidden(root)) setHidden(leader, !opt.crown);
    return { k, compact, frame: { x: box.left, y: box.top, w: m.W, h: m.H } };
  }

  // Before showing: catch up on a deferred layout; refuse to show an unplaced panel.
  function ready() {
    if (state.pending) layout(state.pending);
    if (!state.m) {
      console.error('hero: call layout() while the panel\'s layer is rendered, before enter() or show()');
      return false;
    }
    return true;
  }

  // ---------- animation ----------

  function run(node, keyframes, opts = {}) {
    const a = node.animate(keyframes, { fill: 'both', easing: 'linear', ...opts });
    anims.push(a);
    return a;
  }
  function runStepped(node, seq, prop, opts = {}, fmt) {
    const [kf, dur] = stepped(seq, prop, fmt);
    return run(node, kf, { duration: dur, ...opts });
  }

  function stop() {
    anims.forEach((a) => a.cancel());
    anims = [];
    temps.forEach((n) => n.remove());
    temps = [];
    el.art.style.visibility = '';
    el.trace.style.strokeDasharray = '';
    frozen = false;
  }

  function settle(after) {
    const list = anims.slice();
    return Promise.all(list.map((a) => a.finished)).then(
      () => {
        if (frozen) return;
        after?.();
        list.forEach((a) => a.cancel());
        anims = anims.filter((a) => !list.includes(a));
        temps.forEach((n) => n.remove());
        temps = [];
        el.art.style.visibility = '';
        el.trace.style.strokeDasharray = '';
      },
      () => {} // cancelled by a newer enter()/leave()
    );
  }

  const reducedDefault = () => doc.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const poly = (p) => `polygon(-6% 0%, 106% 0%, 106% ${p}%, -6% ${p}%)`;
  const tx = (px) => `translateX(${px}px)`;

  // Absolute-time stepped sequence → delay + relative keyframes.
  function runSeq(node, seq, prop, fmt) {
    const t0 = seq[0][0];
    return runStepped(node, seq.map(([t, v]) => [t - t0, v]), prop, { delay: t0 }, fmt);
  }

  function enter({ reduced = reducedDefault() } = {}) {
    stop();
    if (!ready()) return Promise.resolve();
    setHidden(root, false);
    setHidden(leader, !state.crown);
    const T = TIMELINE;

    if (reduced) {
      run(root, [{ opacity: 0 }, { opacity: 1 }], { duration: T.reduced.enter });
      if (state.crown) run(leader, [{ opacity: 0 }, { opacity: 1 }], { duration: T.reduced.enter });
      return settle();
    }

    const k = state.k;
    const H = state.m.contentH;
    const pop = [{ transform: 'scale(0)' }, { transform: 'scale(1.5)', offset: 0.55 }, { transform: 'scale(1)' }];

    // 1 · Link. A ring pings at the crown and the trace runs from the crown down to the PWR pad.
    if (state.crown) {
      el.trace.style.strokeDasharray = '1 2';
      run(el.trace, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
        delay: T.trace.at, duration: T.trace.dur, easing: 'cubic-bezier(.35,.6,.25,1)',
      });
      run(el.ping, [{ opacity: 0.9, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(3)' }], {
        delay: T.ping.at, duration: T.ping.dur, easing: 'cubic-bezier(.2,.6,.3,1)',
      });
    }

    // 2 · Power. The pad pops, PWR flickers on, the corner marks come up one after another.
    run(el.padTR, pop, { delay: T.pad.at, duration: T.pad.dur, easing: 'ease-out' });
    runStepped(el.pwr, T.pwr.flicker, 'opacity', { delay: T.pwr.at });
    T.corners.order.forEach((c, i) =>
      runStepped(el.corners[c], T.corners.flicker, 'opacity', { delay: T.corners.at + i * T.corners.stagger })
    );

    // 3 · Projection. A beam sweeps down; the content arrives behind it as scanlit light.
    const { at: S, dur: D, easing: E } = T.sweep;
    run(el.content, [{ clipPath: poly(0) }, { clipPath: poly(100) }], { delay: S, duration: D, easing: E });
    run(el.beam, [{ transform: 'translateY(0px)' }, { transform: `translateY(${H}px)` }], { delay: S, duration: D, easing: E });
    runStepped(el.beam, [[0, 1], [D, 1], [D + T.beamOff, 0]], 'opacity', { delay: S });
    runSeq(el.holo, T.holo, 'opacity');
    runSeq(el.content, T.flicker, 'opacity');

    // 4 · Lock-in glitch, once each part is on screen: bands of the name slip sideways for a frame
    //     or two, colour fringes close in on it, the lockup jolts once. The copies are temporary.
    const slices = T.bands.map(([a, b]) => {
      const c = el.art.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.style.clipPath = `polygon(-6% ${a}%, 106% ${a}%, 106% ${b}%, -6% ${b}%)`;
      el.name.append(c);
      temps.push(c);
      return c;
    });
    el.art.style.visibility = 'hidden';
    T.slices.forEach(([i, t0, t1, dx]) => runSeq(slices[i], [[0, 0], [t0, dx * k], [t1, 0]], 'transform', tx));
    const [l0, l1, ldx] = T.lockup;
    runSeq(el.lk, [[0, 0], [l0, ldx * k], [l1, 0]], 'transform', tx);

    for (const [cls, sign] of [['h6__ghost', -1], ['h6__ghost h6__ghost--verm', 1]]) {
      const wrap = doc.createElement('span');
      wrap.className = 'h6__art';
      wrap.setAttribute('aria-hidden', 'true');
      const g = doc.createElement('span');
      g.className = cls;
      g.textContent = el.face.textContent;
      wrap.append(g);
      el.name.prepend(wrap);
      temps.push(wrap);
      run(wrap, [{ transform: tx(sign * T.ghosts.shift * k), opacity: T.ghosts.opacity }, { transform: tx(0), opacity: 0 }], {
        delay: T.ghosts.at, duration: T.ghosts.dur, easing: 'steps(5, end)',
      });
    }

    // 5 · Settle. The fingers light left to right, then the far pad.
    run(el.fingers, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], {
      delay: T.fingers.at, duration: T.fingers.dur, easing: `steps(${T.fingers.steps}, end)`,
    });
    run(el.padBL, pop, { delay: T.farPad.at, duration: T.farPad.dur, easing: 'ease-out' });

    return settle();
  }

  function leave({ reduced = reducedDefault() } = {}) {
    stop();
    if (isHidden(root)) {
      setHidden(leader, true);
      return Promise.resolve();
    }
    const L = TIMELINE.leave;
    if (reduced) {
      run(root, [{ opacity: 1 }, { opacity: 0 }], { duration: TIMELINE.reduced.leave });
      if (state.crown) run(leader, [{ opacity: 1 }, { opacity: 0 }], { duration: TIMELINE.reduced.leave });
    } else {
      runStepped(root, L.flicker, 'opacity');
      if (state.crown) {
        el.trace.style.strokeDasharray = '1 2';
        run(el.trace, [{ strokeDashoffset: 0 }, { strokeDashoffset: 1 }], {
          duration: L.trace, easing: 'cubic-bezier(.5,0,.75,0)',
        });
        for (const n of [el.ring, el.core]) runStepped(n, L.ring, 'opacity');
      }
    }
    return settle(() => {
      setHidden(root, true);
      setHidden(leader, true);
    });
  }

  // Cheap per-frame update when only the crown moves (camera sway, impact shake): redraws the leader
  // without measuring the panel again. Call layout() for anything else (resize, rotation, fonts).
  function setCrown(crown) {
    if (!state.m) return;
    state.crown = crown;
    drawLeader(state.m, state.box, crown, state.vw, state.vh);
    setHidden(leader, !crown || isHidden(root));
  }

  // Static final state, no animation (first paint, or when the panel should just be there).
  function show() {
    stop();
    if (!ready()) return;
    setHidden(root, false);
    setHidden(leader, !state.crown);
  }
  function hide() {
    stop();
    setHidden(root, true);
    setHidden(leader, true);
  }

  // Captures: freeze the running entrance at `ms`. Call it in the same tick as enter().
  function seek(ms) {
    frozen = true;
    anims.forEach((a) => {
      a.pause();
      a.currentTime = ms;
    });
  }

  function destroy() {
    stop();
    root.remove();
    leader.remove();
  }

  return { root, leader, layout, setCrown, enter, leave, show, hide, seek, destroy, state };
}
