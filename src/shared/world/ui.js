import { site, beats, featured, moreProjects, monthYear } from '../data/content.js';

// Page structure for the worlds: no numbers, no slides. Each stop is a place with a name; the copy
// sits on a card that lives in the scene. The DOM keeps the full content in reading order.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (href, label, cls = '') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}<span class="sr"> (opens in a new tab)</span></a>`;
export const STOP_IDS = ['top', 'systems', 'ai', 'security', 'work', 'contact'];
/** a label in parts ("A · B") that may only wrap after a dot */
const nowrapParts = (s) => String(s).split(' · ').map((p) => esc(p).replace(/ /g, '&nbsp;')).join('&nbsp;· ');

// the contact buttons' marks, one size and one ink: Saltancy's crystal redrawn as a line icon (shell and spokes in
// line, the core solid), GitHub's and LinkedIn's own single-colour marks
const icon = (body) => `<svg class="contact__icon" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
const ICON = {
  saltancy: icon('<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" d="M12 2l8.66 5v10L12 22l-8.66-5V7zM12 12L3.34 7M12 12l8.66-5M12 12v10"/><path fill="currentColor" d="M12 7.24l4.12 2.38v4.76L12 16.76l-4.12-2.38V9.62z"/>'),
  github: icon('<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'),
  linkedin: icon('<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'),
};

const soundIcon = `<svg viewBox="0 0 32 32" aria-hidden="true"><path class="spk" d="M5 12h5l7-6v20l-7-6H5z"/><path class="w1" d="M21 11c2 2.6 2 7.4 0 10"/><path class="w2" d="M24.5 7.5c4.2 4.6 4.2 12.4 0 17"/><path class="x" d="M21 12l7 8M28 12l-7 8"/></svg>`;

/**
 * @param {object} o
 * @param {string[]} o.places   six place names, in stop order
 * @param {string} o.mark       svg markup for the logo
 * @param {{viewBox:string, path:string, nodes:number[][]}} o.route  the route drawn as a small map
 * @param {object} [o.deco]     optional per-stop decoration html { [id]: string }
 */
export function renderWorld({ places, mark, route, deco = {} }) {
  const more = moreProjects();
  const ix = (r) => ext(r.url, `<span class="ix__name">${esc(r.name)}</span><span class="ix__desc">${esc(r.description)}</span><span class="ix__meta">${esc(r.language || '')}${r.language ? ' · ' : ''}Updated ${monthYear(r.date)}</span>`, 'ix');
  const [vbx, vby, vbw, vbh] = route.viewBox.split(' ').map(Number);
  return `
<a class="skip" href="#work">Skip to work</a>
<header class="bar">
  <a class="bar__mark" href="#top" aria-label="Xini, back to the start">${mark}<span class="bar__name" aria-hidden="true">Xini</span></a>
  <nav class="bar__nav" aria-label="Primary">
    <a href="#work">Work</a><a href="#systems">About</a>${ext(site.saltancy, 'Consultancy<span class="arr" aria-hidden="true">↗</span>')}<a href="#contact">Contact</a>
  </nav>
  <button class="bar__sound" type="button" aria-pressed="false" aria-label="Sound">${soundIcon}</button>
</header>
<main class="stops">
  <section class="stop stop--top" id="top" data-stop="top" aria-labelledby="h-top">
    <div class="card card--hero">${deco.top || ''}
      <p class="card__place" aria-hidden="true">${esc(places[0])}</p>
      <p class="card__kicker"><span>${esc(site.name)}</span><span>${nowrapParts(site.role)}</span></p>
      <h1 id="h-top" class="card__statement">${esc(site.statement)}</h1>
      <p class="card__cred"><span>${esc(site.spec)}</span></p>
    </div>
  </section>
  ${beats.map((b, i) => `
  <section class="stop stop--${b.id}" id="${b.id}" data-stop="${b.id}" aria-labelledby="h-${b.id}">
    <div class="card">${deco[b.id] || ''}
      <p class="card__place">${esc(places[i + 1])}</p>
      <h2 id="h-${b.id}" class="card__h">${esc(b.heading)}</h2>
      <p class="card__body">${esc(b.body)}</p>
      <ul class="tags" aria-label="Focus">${b.support.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
  </section>`).join('')}
  <section class="stop stop--work" id="work" data-stop="work" aria-labelledby="h-work">
    <div class="card card--work">${deco.work || ''}
      <p class="card__place">${esc(places[4])}</p>
      <h2 id="h-work" class="sr">Work</h2>
      <ol class="work__list">
        ${featured.map((p, i) => `
        <li class="proj${i === 0 ? ' is-current' : ''}" data-i="${i}" style="--accent:${p.accent}">
          <p class="proj__kicker">${esc(p.kicker)}</p>
          <h3 class="proj__name">${esc(p.name)}</h3>
          <p class="proj__summary">${esc(p.summary)}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="proj__links">${ext(p.url, esc(p.linkLabel) + '<span class="arr" aria-hidden="true">↗</span>', 'btn')}${p.credit ? `<span class="proj__credit">${esc(p.credit)}</span>` : ''}</p>
        </li>`).join('')}
      </ol>
      <div class="work__pager">
        <button class="pager__btn pager__prev" type="button" aria-label="Previous project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg></button>
        <span class="pager__dots" aria-hidden="true">${featured.map((_, i) => `<i${i === 0 ? ' class="on"' : ''}></i>`).join('')}</span>
        <button class="pager__btn pager__next" type="button" aria-label="Next project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg></button>
        <button class="btn btn--ghost work__all" type="button" aria-controls="index" aria-expanded="false">All projects <span class="work__allcount">${more.recent.length + more.older.length}</span></button>
      </div>
    </div>
  </section>
  <section class="stop stop--contact" id="contact" data-stop="contact" aria-labelledby="h-contact">
    <div class="card card--contact">${deco.contact || ''}
      <p class="card__place">${esc(places[5])}</p>
      <h2 id="h-contact" class="card__h">Get in touch</h2>
      <p class="contact__mail"><a href="mailto:${site.email}">${site.email}</a></p>
      <ul class="contact__links"><li>${ext(site.saltancy, ICON.saltancy + 'Saltancy')}</li><li>${ext(site.github, ICON.github + 'GitHub')}</li><li>${ext(site.linkedin, ICON.linkedin + 'LinkedIn')}</li></ul>
      <p class="contact__copy">© 2026 Xini</p>
    </div>
  </section>
</main>
<nav class="route" aria-label="Places">
  <svg class="route__map" viewBox="${route.viewBox}" aria-hidden="true"><path class="route__path" d="${route.path}"/><path class="route__done" d="${route.path}"/></svg>
  <ol class="route__list">${STOP_IDS.map((id, i) => {
    const [x, y] = route.nodes[i];
    return `<li style="--x:${((x - vbx) / vbw) * 100}%;--y:${((y - vby) / vbh) * 100}%"><a href="#${id}" data-i="${i}"${i === 0 ? ' aria-current="true"' : ''}><i aria-hidden="true"></i><span>${esc(places[i])}</span></a></li>`;
  }).join('')}</ol>
</nav>
<div class="title" aria-hidden="true"><span class="title__text"></span></div>
<aside class="index" id="index" aria-label="All projects" hidden>
  <div class="index__sheet" data-scroll>
    <header class="index__head"><h2>All projects</h2><button class="index__close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button></header>
    <ol class="index__list">${more.recent.map((r) => `<li>${ix(r)}</li>`).join('')}</ol>
    <details class="index__older"><summary>Older projects (${more.older.length})</summary><ol class="index__list">${more.older.map((r) => `<li>${ix(r)}</li>`).join('')}</ol></details>
  </div>
</aside>`;
}

/** Wire the route nav, project pager, drawer and sound toggle to the world. */
export function wireWorld({ nav, sfx, onProject, places }) {
  const links = [...document.querySelectorAll('.route__list a')];
  const done = document.querySelector('.route__done');
  const total = done ? done.getTotalLength() : 0;
  const nodes = [...document.querySelectorAll('.route__list li')];
  // fraction of the route path at each node, measured once
  const path = document.querySelector('.route__path');
  const fracs = nodes.map((li, i) => {
    if (!path) return i / (nodes.length - 1);
    const svg = path.ownerSVGElement, vb = svg.viewBox.baseVal;
    const x = vb.x + (parseFloat(li.style.getPropertyValue('--x')) / 100) * vb.width, y = vb.y + (parseFloat(li.style.getPropertyValue('--y')) / 100) * vb.height;
    let best = 0, bd = Infinity;
    for (let k = 0; k <= 200; k++) { const p = path.getPointAtLength((k / 200) * total); const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = k / 200; } }
    return best;
  });
  const setRoute = (i) => {
    links.forEach((a, k) => (k === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    if (done) { done.style.strokeDasharray = `${total}`; done.style.strokeDashoffset = `${total * (1 - fracs[i])}`; }
  };
  nav.on((i) => setRoute(i)); setRoute(0);
  // projects
  const projs = [...document.querySelectorAll('.proj')], dots = [...document.querySelectorAll('.pager__dots i')];
  let cur = 0;
  const setProject = (i, dir = 1) => {
    i = (i + projs.length) % projs.length;
    if (i === cur) return false;
    projs[cur].classList.remove('is-current'); dots[cur]?.classList.remove('on');
    cur = i;
    projs[cur].classList.add('is-current'); projs[cur].dataset.dir = dir > 0 ? 'r' : 'l'; dots[cur]?.classList.add('on');
    onProject?.(cur, dir);
    sfx.play('pager'); sfx.activity();
    return true;
  };
  document.querySelector('.pager__prev').addEventListener('click', () => setProject(cur - 1, -1));
  document.querySelector('.pager__next').addEventListener('click', () => setProject(cur + 1, 1));
  // drawer
  const index = document.getElementById('index'), allBtn = document.querySelector('.work__all');
  const open = (on) => {
    if (on) { index.hidden = false; requestAnimationFrame(() => index.classList.add('is-open')); sfx.play('index'); index.querySelector('.index__close').focus(); }
    else { index.classList.remove('is-open'); setTimeout(() => { index.hidden = true; }, 380); allBtn.focus(); }
    allBtn.setAttribute('aria-expanded', String(on)); nav.enabled = !on;
  };
  allBtn.addEventListener('click', () => open(true));
  index.querySelector('.index__close').addEventListener('click', () => open(false));
  index.addEventListener('click', (e) => { if (e.target === index) open(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !index.hidden) open(false); });
  // sound
  const sb = document.querySelector('.bar__sound');
  const sync = (on) => { sb.setAttribute('aria-pressed', String(on)); document.documentElement.classList.toggle('sound-on', on); };
  sb.addEventListener('click', () => { sfx.toggle(); if (sfx.on) sfx.play('toggle'); });
  sfx.onChange(sync); sync(false);
  document.addEventListener('pointerover', (e) => { if (e.target.closest && e.target.closest('a, button')) sfx.play('hover'); });
  document.addEventListener('pointerdown', () => sfx.activity(), { passive: true });
  // the place title that sweeps in mid-flight
  const title = document.querySelector('.title'), titleText = document.querySelector('.title__text');
  const showTitle = (i) => {
    titleText.textContent = places[i];
    title.classList.remove('is-on'); void title.offsetWidth; title.classList.add('is-on');
  };
  return { setProject: (i, d) => setProject(i, d), get project() { return cur; }, showTitle, open };
}
