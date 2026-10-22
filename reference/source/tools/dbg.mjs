import { launch } from './browser.mjs';
const b = await launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('pageerror', (e) => console.log('pageerror:', e.message));
await p.goto('http://127.0.0.1:5173/concepts/loop/index.html?skipintro&dpr=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__xini && window.__xini.ready, null, { timeout: 60000 });
await p.evaluate(() => window.__xini.goto(1));
await p.evaluate(() => window.__xini.advance(4.2));
await p.waitForTimeout(800);
console.log(await p.evaluate(() => {
  const W = window.__xini.world; const st = W.route.stops[1];
  const card = document.querySelector('#systems'); const el = card.firstElementChild; const cs = getComputedStyle(el);
  return JSON.stringify({ idx: W.rig.index, flying: W.rig.flying, pending: !!W.pending, cls: card.className, ax: card.style.getPropertyValue('--ax'), ay: card.style.getPropertyValue('--ay'), vis: cs.visibility, op: cs.opacity, rect: el.getBoundingClientRect().toJSON(), anchor: st.anchor, scr: W.toScreen(new (W.camera.position.constructor)(...st.anchor)) });
}));
await b.close();
