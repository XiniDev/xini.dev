// Cards printed by the board, as plug-in cards: solder mask, chamfered corners, silkscreen outline and
// legend, fiducials, gold fingers along the bottom edge. A leader trace runs from the current card to the
// part it describes and ends in a via; a packet runs along it.
const NS = 'http://www.w3.org/2000/svg';

export function initCards({ parts }) {
  const root = document.documentElement;
  root.dataset.card = 'pcb';
  const cards = [...document.querySelectorAll('.stop .card')];
  // ---- silk layer inside every card: outline with chamfers, an inner legend line, fiducials
  cards.forEach((c, i) => {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'card__silk'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `<defs><pattern id="hatch${i}" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle class="silk__hatchline" cx="2.25" cy="2.25" r="0.85"/></pattern>`
      + `<pattern id="fing${i}" width="12" height="10" patternUnits="userSpaceOnUse"><rect class="silk__finger" width="8" height="10"/></pattern></defs>`
      + `<path class="silk__shadow"/><path class="silk__mask"/><path class="silk__hatch" fill="url(#hatch${i})"/>`
      // (the fingers print over the legend lines: under them, a green line ran through every pad)
      + `<path class="silk__ink"/><path class="silk__edge"/><path class="silk__line"/><rect class="silk__fingers" fill="url(#fing${i})" height="10"/><circle class="silk__fid"/><circle class="silk__fid"/>`;
    c.prepend(svg);
  });
  const draw = (c) => {
    const svg = c.querySelector('.card__silk'), w = c.offsetWidth, h = c.offsetHeight;
    if (!w || !h) return;
    // the card is printed like a panel: an ink keyline round it and a hard ink shadow offset down and right
    const k = 16, o = 4, W = w - o, H = h - o;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`); svg.setAttribute('width', w); svg.setAttribute('height', h);
    const shape = (i, kk, d = 0) => `M${d + i},${d + i} H${d + W - i - kk} L${d + W - i},${d + i + kk} V${d + H - i} H${d + i + kk} L${d + i},${d + H - i - kk} Z`;
    svg.querySelector('.silk__shadow').setAttribute('d', shape(0, k, o));
    svg.querySelector('.silk__mask').setAttribute('d', shape(0, k));
    svg.querySelector('.silk__hatch').setAttribute('d', shape(0, k));
    const fg = svg.querySelector('.silk__fingers'); fg.setAttribute('x', 30); fg.setAttribute('y', H - 12); fg.setAttribute('width', Math.max(0, W - 60));
    svg.querySelector('.silk__ink').setAttribute('d', shape(1, k));
    svg.querySelector('.silk__edge').setAttribute('d', shape(4, k - 1));
    svg.querySelector('.silk__line').setAttribute('d', shape(9, k - 4));
    const [f1, f2] = svg.querySelectorAll('.silk__fid');
    f1.setAttribute('cx', W - 24); f1.setAttribute('cy', 24); f2.setAttribute('cx', 24); f2.setAttribute('cy', H - 24);
    f1.setAttribute('r', 4); f2.setAttribute('r', 4);
  };
  const ro = new ResizeObserver((es) => es.forEach((e) => draw(e.target)));
  cards.forEach((c) => { ro.observe(c); draw(c); });
  // ---- the leader: one overlay for the page
  const lead = document.createElementNS(NS, 'svg');
  lead.setAttribute('class', 'lead'); lead.setAttribute('aria-hidden', 'true');
  // the trace leaves the card from a pad on its edge and ends in a via just off the part; the via is keyed in ink
  // so it holds against light or dark behind it
  lead.innerHTML = '<path class="lead__trace" pathLength="100"/><path class="lead__packet" pathLength="100"/><rect class="lead__pad" width="8" height="8"/><circle class="lead__hole" r="7"/><circle class="lead__via" r="7"/>';
  document.body.appendChild(lead);
  const trace = lead.querySelector('.lead__trace'), packet = lead.querySelector('.lead__packet');
  const via = lead.querySelector('.lead__via'), hole = lead.querySelector('.lead__hole'), pad = lead.querySelector('.lead__pad');
  let shownFor = -1;
  // route a trace the way a board would: out of the card, a 45 degree run, then straight into the via
  const route = (x0, y0, x1, y1, side) => {
    // a part right beside the card gets a straight trace (the stub and the 45 degree run need room)
    if (side === 'h' && Math.abs(x1 - x0) < 60) return `M${x0},${y0} L${x1},${y1}`;
    if (side === 'v' && Math.abs(y1 - y0) < 60) return `M${x0},${y0} L${x1},${y1}`;
    if (side === 'v') {
      const sy = Math.sign(y1 - y0) || 1, stub = 18 * sy, dx = x1 - x0, ady = Math.abs(y1 - y0 - stub);
      const d = Math.min(Math.abs(dx), ady);
      return `M${x0},${y0} V${y0 + stub} l${Math.sign(dx) * d},${sy * d} L${x1},${y1}`;
    }
    const sx = Math.sign(x1 - x0) || 1, stub = 22 * sx, dy = y1 - y0, adx = Math.abs(x1 - x0 - stub);
    const d = Math.min(Math.abs(dy), adx);
    return `M${x0},${y0} H${x0 + stub} l${sx * d},${Math.sign(dy) * d} L${x1},${y1}`;
  };
  // the trace draws in once per arrival: any moment it cannot be drawn (the part off screen, under the card) only
  // hides it, so it never restarts half-drawn. On portrait screens the card docks under the hero and needs no trace.
  const hide = (on) => lead.classList.toggle('is-hidden', on);
  const api = {
    update(world) {
      const i = world.rig.index, c = cards[i], cand = parts(i);
      if (world.rig.flying || world.director.intro || !cand || !c) { if (shownFor !== -1) { lead.classList.remove('is-on'); shownFor = -1; } return; }
      if (!c.closest('.stop').classList.contains('is-current') || innerHeight > innerWidth * 1.05) { hide(true); return; }
      // the card's printed edge (its ink shadow hangs 4px off the right and bottom of the box)
      const b = c.getBoundingClientRect(), r = { left: b.left, top: b.top, right: b.right - 4, bottom: b.bottom - 4 };
      // the part may offer several anchors, outermost first: take the first that lands clear of the card on screen
      // (on a narrower screen the card can cover the hero's edge, and the trace then lands a little further in)
      const clear = (q) => !q.behind && q.x > -40 && q.x < innerWidth + 40 && q.y > -40 && q.y < innerHeight + 40
        && (q.x > r.right + 12 || q.x < r.left - 12 || q.y < r.top - 12 || q.y > r.bottom + 12);
      // (and one that leaves the trace at least 60px long, so it reads as a lead and not a stub; failing that, the first clear)
      const gap = (q) => Math.max(q.x - r.right, r.left - q.x, r.top - q.y, q.y - r.bottom);
      let s = null, first = null;
      for (const part of Array.isArray(cand) ? cand : [cand]) { const q = world.toScreen(part.clone()); if (!clear(q)) continue; first = first || q; if (gap(q) >= 60) { s = q; break; } }
      s = s || first;
      if (!s) { hide(true); return; }
      let d, x0, y0;
      if (s.x > r.right + 12) { x0 = r.right; y0 = Math.min(r.bottom - 34, Math.max(r.top + 34, s.y)); d = route(x0, y0, s.x, s.y, 'h'); }
      else if (s.x < r.left - 12) { x0 = r.left; y0 = Math.min(r.bottom - 34, Math.max(r.top + 34, s.y)); d = route(x0, y0, s.x, s.y, 'h'); }
      else if (s.y < r.top - 12) { x0 = Math.min(r.right - 34, Math.max(r.left + 34, s.x)); y0 = r.top; d = route(x0, y0, s.x, s.y, 'v'); }
      else if (s.y > r.bottom + 12) { x0 = Math.min(r.right - 34, Math.max(r.left + 34, s.x)); y0 = r.bottom; d = route(x0, y0, s.x, s.y, 'v'); }
      else { hide(true); return; }
      hide(false);
      trace.setAttribute('d', d); packet.setAttribute('d', d);
      pad.setAttribute('x', (x0 - 4).toFixed(1)); pad.setAttribute('y', (y0 - 4).toFixed(1));
      for (const e of [via, hole]) { e.setAttribute('cx', s.x.toFixed(1)); e.setAttribute('cy', s.y.toFixed(1)); }
      if (shownFor !== i) { lead.classList.remove('is-on'); void lead.getBoundingClientRect(); lead.classList.add('is-on'); shownFor = i; }
    },
  };
  return api;
}
