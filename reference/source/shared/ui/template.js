import { site, beats, featured, moreProjects, monthYear } from '../data/content.js';

// Semantic content for every concept. Concepts restyle it and add decoration through hooks;
// the copy and structure stay identical so concepts compare fairly.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (href, label, cls = '') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}<span class="sr"> (opens in a new tab)</span></a>`;

export const SECTION_IDS = ['top', 'systems', 'ai', 'security', 'work', 'contact'];
export const RAIL = [
  { id: 'top', n: '00', label: 'Xini' },
  { id: 'systems', n: '01', label: 'Systems' },
  { id: 'ai', n: '02', label: 'AI' },
  { id: 'security', n: '03', label: 'Security' },
  { id: 'work', n: '04', label: 'Work' },
  { id: 'contact', n: '05', label: 'Contact' },
];

const soundIcon = `<svg viewBox="0 0 32 32" aria-hidden="true"><path class="spk" d="M5 12h5l7-6v20l-7-6H5z"/><path class="w1" d="M21 11c2 2.6 2 7.4 0 10"/><path class="w2" d="M24.5 7.5c4.2 4.6 4.2 12.4 0 17"/><path class="x" d="M21 12l7 8M28 12l-7 8"/></svg>`;

export function renderSite(h = {}) {
  const more = moreProjects();
  const deco = (name, ...a) => (h[name] ? h[name](...a) : '');
  return `
<a class="skip" href="#work">Skip to work</a>
<header class="bar">
  <a class="bar__mark" href="#top" aria-label="Xini, back to top">${h.mark ? h.mark() : ''}<span class="bar__name" aria-hidden="true">Xini</span></a>
  <nav class="bar__nav" aria-label="Primary">
    <a href="#work">Work</a><a href="#systems">About</a>${ext(site.saltancy, 'Consultancy<span class="arr" aria-hidden="true">↗</span>')}<a href="#contact">Contact</a>
  </nav>
  <button class="bar__sound" type="button" aria-pressed="false" aria-label="Sound">${soundIcon}<span class="bar__soundtxt" aria-hidden="true">Sound</span></button>
</header>
<main class="secs">
  <section class="sec sec--hero" data-sec="top" id="top" aria-labelledby="h-top">
    ${deco('heroDeco')}
    <div class="sec__inner">
      <p class="kicker"><span class="kicker__tab">${esc(site.name)}</span><span class="kicker__role">${esc(site.role)}</span></p>
      <h1 id="h-top" class="hero__statement">${h.statement ? h.statement(site.statement) : esc(site.statement)}</h1>
      <p class="hero__cred">${site.credentials.map((c) => `<span>${esc(c)}</span>`).join('')}</p>
    </div>
    ${deco('heroAfter')}
  </section>
  ${beats.map((b, i) => `
  <section class="sec sec--beat sec--${b.id}" data-sec="${b.id}" id="${b.id}" aria-labelledby="h-${b.id}">
    ${deco('beatDeco', b, i)}
    <div class="sec__inner">
      <p class="beat__num" aria-hidden="true"><span class="beat__n">0${i + 1}</span><span class="beat__jp" lang="ja">${b.jp}</span></p>
      <p class="beat__label">${esc(b.label)}</p>
      <h2 id="h-${b.id}" class="beat__h">${esc(b.heading)}</h2>
      <p class="beat__body">${esc(b.body)}</p>
      <ul class="tags" aria-label="Focus">${b.support.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
  </section>`).join('')}
  <section class="sec sec--work" data-sec="work" id="work" aria-labelledby="h-work">
    ${deco('workDeco')}
    <div class="sec__inner">
      <p class="beat__num" aria-hidden="true"><span class="beat__n">04</span><span class="beat__jp" lang="ja">作品</span></p>
      <h2 id="h-work" class="work__title">Work</h2>
      <ol class="work__list">
        ${featured.map((p, i) => `
        <li class="proj${i === 0 ? ' is-current' : ''}" data-i="${i}" style="--accent:${p.accent}">
          <p class="proj__kicker"><span class="proj__count">${String(i + 1).padStart(2, '0')}/${String(featured.length).padStart(2, '0')}</span>${esc(p.kicker)}</p>
          <h3 class="proj__name">${esc(p.name)}</h3>
          <p class="proj__summary">${esc(p.summary)}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="proj__links">${ext(p.url, esc(p.linkLabel) + '<span class="arr" aria-hidden="true">↗</span>', 'btn')}${p.credit ? `<span class="proj__credit">${esc(p.credit)}</span>` : ''}</p>
        </li>`).join('')}
      </ol>
      <div class="work__pager">
        <button class="pager__btn pager__prev" type="button" aria-label="Previous project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg></button>
        <button class="pager__btn pager__next" type="button" aria-label="Next project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg></button>
        <button class="btn btn--ghost work__all" type="button" aria-controls="index" aria-expanded="false">All projects <span class="work__allcount">${more.recent.length + more.older.length}</span></button>
      </div>
    </div>
    ${deco('workAfter')}
  </section>
  <section class="sec sec--contact" data-sec="contact" id="contact" aria-labelledby="h-contact">
    ${deco('contactDeco')}
    <div class="sec__inner">
      <p class="beat__num" aria-hidden="true"><span class="beat__n">05</span><span class="beat__jp" lang="ja">連絡</span></p>
      <h2 id="h-contact" class="contact__h">Get in touch</h2>
      <p class="contact__mail"><a href="mailto:${site.email}">${site.email}</a></p>
      <p class="contact__line">I take on client projects through my consultancy, ${ext(site.saltancy, 'Saltancy')}.</p>
      <ul class="contact__links">
        <li>${ext(site.github, 'GitHub')}</li>
        <li>${ext(site.linkedin, 'LinkedIn')}</li>
      </ul>
      <p class="contact__copy">© 2026 Xini</p>
    </div>
    ${deco('contactAfter')}
  </section>
</main>
<nav class="rail" aria-label="Sections">
  <ol>${RAIL.map((r, i) => `<li><a href="#${r.id}" data-i="${i}"${i === 0 ? ' aria-current="true"' : ''}><span class="rail__n">${r.n}</span><span class="rail__l">${r.label}</span></a></li>`).join('')}</ol>
</nav>
<aside class="index" id="index" aria-label="All projects" hidden>
  <div class="index__sheet" data-scroll>
    <header class="index__head"><h2>All projects</h2><button class="index__close" type="button" aria-label="Close">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'}</button></header>
    <ol class="index__list">
      ${more.recent.map((r) => `<li>${ext(r.url, `<span class="ix__name">${esc(r.name)}</span><span class="ix__desc">${esc(r.description)}</span><span class="ix__meta">${esc(r.language || '')}${r.language ? ' · ' : ''}Updated ${monthYear(r.date)}</span>`, 'ix')}</li>`).join('')}
    </ol>
    <details class="index__older"><summary>Older projects (${more.older.length})</summary>
      <ol class="index__list">
        ${more.older.map((r) => `<li>${ext(r.url, `<span class="ix__name">${esc(r.name)}</span><span class="ix__desc">${esc(r.description)}</span><span class="ix__meta">${esc(r.language || '')}${r.language ? ' · ' : ''}Updated ${monthYear(r.date)}</span>`, 'ix')}</li>`).join('')}
      </ol>
    </details>
  </div>
</aside>`;
}

// Shared behaviour: rail state, project pager, index drawer, sound toggle.
export function wireSite({ nav, sfx, onProject, count = featured.length }) {
  const rail = [...document.querySelectorAll('.rail a')];
  nav.on((i) => rail.forEach((a, k) => (k === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'))));
  const projs = [...document.querySelectorAll('.proj')];
  let cur = 0;
  const setProject = (i, dir = 1) => {
    i = (i + count) % count;
    if (i === cur) return false;
    projs[cur].classList.remove('is-current'); projs[cur].classList.add(dir > 0 ? 'is-out-l' : 'is-out-r');
    const old = projs[cur]; setTimeout(() => old.classList.remove('is-out-l', 'is-out-r'), 450);
    cur = i;
    projs[cur].classList.add('is-current');
    projs[cur].dataset.dir = dir > 0 ? 'r' : 'l';
    onProject?.(cur, dir);
    sfx.play('fold');
    return true;
  };
  document.querySelector('.pager__prev').addEventListener('click', () => setProject(cur - 1, -1));
  document.querySelector('.pager__next').addEventListener('click', () => setProject(cur + 1, 1));
  const index = document.getElementById('index');
  const allBtn = document.querySelector('.work__all');
  const open = (on) => {
    if (on) { index.hidden = false; requestAnimationFrame(() => index.classList.add('is-open')); sfx.play('whoosh'); index.querySelector('.index__close').focus(); }
    else { index.classList.remove('is-open'); setTimeout(() => { index.hidden = true; }, 380); allBtn.focus(); }
    allBtn.setAttribute('aria-expanded', String(on));
    nav.enabled = !on;
  };
  allBtn.addEventListener('click', () => open(true));
  index.querySelector('.index__close').addEventListener('click', () => open(false));
  index.addEventListener('click', (e) => { if (e.target === index) open(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !index.hidden) open(false); });
  const sb = document.querySelector('.bar__sound');
  const sync = (on) => { sb.setAttribute('aria-pressed', String(on)); document.documentElement.classList.toggle('sound-on', on); };
  sb.addEventListener('click', () => { sfx.toggle(); if (sfx.on) sfx.play('snap'); });
  sfx.onChange(sync); sync(false);
  document.addEventListener('pointerover', (e) => { if (e.target.closest && e.target.closest('a, button')) sfx.play('tick'); });
  return { setProject: (i, d) => setProject(i, d), get project() { return cur; } };
}
