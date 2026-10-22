// v5 #8–#10: each card's text against docs/v5/COPY.md (rendered DOM, case-insensitive: CSS sets the caps).
//   node tools/v5/check-copy.mjs [stops=1,2,3,5]
import { launch, open } from './lib.mjs';

const WANT = {
  1: { place: 'The core', h: 'From design to deployment.', body: 'I take big ideas all the way to production on my own: AI integration, real-time 3D, multiplayer backends, data, infrastructure and polished interfaces.', tags: ['AI Integration', 'Real-time 3D', 'Multiplayer'] },
  2: { place: 'Neural core', h: 'Intelligence built in.', body: 'I build AI into products: agents that act on real systems, MCP servers that give models tools, and local models for private data.', tags: ['Agents', 'MCP servers', 'Local models'] },
  3: { place: 'Enclave', h: 'Safe & secure.', body: 'I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.', tags: ['Self-hosting', 'OWASP', 'Zero Trust'] },
  5: { place: 'I/O', h: 'Get in touch', mail: 'xini@saltancy.com', body: null, links: [['Saltancy', 'https://saltancy.com/'], ['GitHub', 'https://github.com/XiniDev'], ['LinkedIn', 'https://www.linkedin.com/in/xinidev'], ['Back to start', '#top']], copy: '© 2026 Xini' },
};
const IDS = ['top', 'systems', 'ai', 'security', 'work', 'contact'];
const stops = (process.argv[2] || '1,2,3,5').split(',').map(Number);
const n = (s) => (s ?? '').replace(/\s+/g, ' ').replace(/↗|↺/g, '').trim().toLowerCase();

const browser = await launch();
const { page, context } = await open(browser);
let fail = 0;
for (const i of stops) {
  const w = WANT[i];
  const got = await page.evaluate((id) => {
    const c = document.querySelector(`.stop--${id} .card`), q = (s) => c.querySelector(s);
    return {
      place: q('.card__place')?.textContent, h: q('.card__h')?.textContent, body: q('.card__body')?.textContent ?? null,
      tags: [...c.querySelectorAll('.tags li')].map((l) => l.textContent), mail: q('.contact__mail')?.textContent,
      links: [...c.querySelectorAll('.contact__links a')].map((a) => [a.childNodes[0]?.nodeType === 3 || a.querySelector('svg') ? a.innerText : a.textContent, a.getAttribute('href'), a.target]),
      copy: q('.contact__copy')?.textContent,
    };
  }, IDS[i]);
  const bad = [];
  if (n(got.place) !== n(w.place)) bad.push(`place "${got.place}"`);
  if (n(got.h) !== n(w.h)) bad.push(`heading "${got.h}"`);
  if (w.body === null ? got.body !== null : n(got.body) !== n(w.body)) bad.push(`body "${got.body}"`);
  if (w.tags && n(got.tags.join('|')) !== n(w.tags.join('|'))) bad.push(`tags ${JSON.stringify(got.tags)}`);
  if (w.mail && n(got.mail) !== n(w.mail)) bad.push(`mail "${got.mail}"`);
  if (w.links) {
    const L = got.links.map(([t, h]) => [n(t), h]);
    w.links.forEach(([t, h], k) => { if (!L[k] || L[k][0] !== n(t) || (L[k][1] !== h && L[k][1] !== h.replace(/\/$/, ''))) bad.push(`link ${k + 1} ${JSON.stringify(got.links[k])}`); });
    if (L.length !== w.links.length) bad.push(`${L.length} links`);
    got.links.filter(([, h]) => h.startsWith('http')).forEach(([t, h, tg]) => { if (tg !== '_blank') bad.push(`${t} opens in place`); });
  }
  if (w.copy && n(got.copy) !== n(w.copy)) bad.push(`copyright "${got.copy}"`);
  if (bad.length) fail++;
  console.log(`0${i + 1} ${w.place}: ${bad.length ? bad.join('; ') : 'matches COPY.md'}  ${bad.length ? 'FAIL' : 'PASS'}`);
}
await context.close(); await browser.close();
process.exit(fail ? 1 : 0);
