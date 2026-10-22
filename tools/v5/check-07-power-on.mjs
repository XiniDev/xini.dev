// v5 #7: the Power on card reads as COPY.md at 1440x900 and 390x844; on a phone the label stays inside the card and
// wraps only after its dot; no retired string is left outside docs/ and reference/.
import { launch, open } from './lib.mjs';
import { sweep } from './retired.mjs';

const WANT = { kicker: 'XINI SOFTWARE ENGINEER · AI INTEGRATION', head: 'AMBITIOUS IDEAS, AMBITIOUS SOFTWARE.', spec: 'Developer · Designer · Creator' };
const norm = (s) => s.replace(/\s+/g, ' ').trim();
let fail = 0;
const report = (ok, msg) => { if (!ok) fail++; console.log(`${msg}  ${ok ? 'PASS' : 'FAIL'}`); };

const browser = await launch();
for (const size of ['desktop', 'phone']) {
  const { page, context } = await open(browser, { size });
  const r = await page.evaluate(() => {
    const card = document.querySelector('.stop--top .card'), k = card.querySelector('.card__kicker'), role = k.lastElementChild;
    // where the role's text breaks: the characters on its first line
    const tn = role.firstChild, rg = document.createRange(); let first = '';
    let top = null;
    for (let i = 0; i < tn.length; i++) { rg.setStart(tn, i); rg.setEnd(tn, i + 1); const rc = rg.getClientRects()[0]; if (!rc) continue; if (top === null) top = rc.top; if (rc.top > top + 2) break; first += tn.data[i]; }
    const cr = card.getBoundingClientRect(), rr = role.getBoundingClientRect();
    return {
      kicker: k.innerText, head: card.querySelector('.card__statement').innerText, spec: card.querySelector('.card__cred').innerText,
      firstLine: first.replace(/ /g, ' '), lines: role.getClientRects().length, inside: rr.right <= cr.right && k.scrollWidth <= k.clientWidth + 1,
    };
  });
  const ok = norm(r.kicker) === WANT.kicker && norm(r.head) === WANT.head && norm(r.spec).toLowerCase() === WANT.spec.toLowerCase();
  report(ok, `${size}: "${norm(r.kicker)}" / "${norm(r.head)}" / "${norm(r.spec)}"`);
  const whole = norm(r.kicker).replace(/^XINI\s*/i, '').toLowerCase();
  const wrapOk = r.inside && (norm(r.firstLine).toLowerCase() === whole || r.firstLine.trim().endsWith('·'));
  report(wrapOk, `${size}: label inside the card: ${r.inside}; its first line reads "${r.firstLine.trim()}"`);
  await context.close();
}
await browser.close();

const hits = sweep();
console.log(`\nretired strings outside docs/ and reference/: ${hits.length}`);
hits.forEach((h) => console.log(`  ${h.file}:${h.line}  [${h.match}]  ${h.text}`));
process.exit(fail ? 1 : 0);
