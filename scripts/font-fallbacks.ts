import { readFileSync, writeFileSync } from 'node:fs';
import * as fontkit from 'fontkit';
import { chromium } from '@playwright/test';

const SAMPLE =
  'I build complete, self-hosted products with modern AI woven in. Whole systems, built solo. ' +
  'AI that does real work. Secure by default. Featured work. More on GitHub. Get in touch. ' +
  'MSc Artificial Intelligence, St Andrews. BSc Computer Science, Warwick.';

const ARCHIVO = 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2';

const FACES = [
  { family: 'Archivo Fallback 125', wdth: 125, wght: 760, bold: true },
  { family: 'Archivo Fallback 100', wdth: 100, wght: 400, bold: false },
  { family: 'Archivo Fallback 92', wdth: 92, wght: 400, bold: false },
  { family: 'Archivo Fallback 90', wdth: 90, wght: 400, bold: false },
  { family: 'Archivo Fallback 88', wdth: 88, wght: 450, bold: false },
];

const metrics = fontkit.openSync(ARCHIVO) as fontkit.Font;
const fontUrl = `data:font/woff2;base64,${readFileSync(ARCHIVO).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<style>@font-face{font-family:A;src:url(${fontUrl}) format('woff2');font-stretch:62% 125%;font-weight:100 900}
span{font-size:100px;white-space:nowrap;position:absolute}</style><body></body>`);
const widths = await page.evaluate(async ({ faces, sample }) => {
  await document.fonts.load('400 100px A');
  const measure = (css: string) => {
    const s = document.createElement('span');
    s.style.cssText = css;
    s.textContent = sample;
    document.body.append(s);
    const w = s.getBoundingClientRect().width;
    s.remove();
    return w;
  };
  return faces.map((f) => ({
    archivo: measure(`font-family:A;font-stretch:${f.wdth}%;font-weight:${f.wght}`),
    arial: measure(`font-family:Arial;font-weight:${f.bold ? 700 : 400}`),
  }));
}, { faces: FACES, sample: SAMPLE });
await browser.close();

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
const upm = metrics.unitsPerEm;
const faces = FACES.map((f, i) => {
  const sizeAdjust = widths[i]!.archivo / widths[i]!.arial;
  return {
    family: f.family,
    local: f.bold ? ['Arial Bold', 'Arial-BoldMT'] : ['Arial', 'ArialMT'],
    sizeAdjust: pct(sizeAdjust),
    ascentOverride: pct(metrics.ascent / upm / sizeAdjust),
    descentOverride: pct(Math.abs(metrics.descent) / upm / sizeAdjust),
    lineGapOverride: pct(metrics.lineGap / upm / sizeAdjust),
  };
});

writeFileSync('src/styles/fallbacks.ts', `export const fallbackFaces = ${JSON.stringify(faces, null, 2)} as const;\n`);
console.log(faces.map((f) => `${f.family}: size ${f.sizeAdjust}, ascent ${f.ascentOverride}, descent ${f.descentOverride}`).join('\n'));
