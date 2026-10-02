import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { LETTERS, CAP_HEIGHT } from '../src/lattice/forms/letters.ts';
import { colour } from '../src/styles/tokens.ts';

const X = LETTERS[0]!.poly;
const X_WIDTH = Math.max(...X.map(([x]) => x));

function svg(size: number, glyphHeight: number) {
  const k = glyphHeight / CAP_HEIGHT;
  const ox = (size - X_WIDTH * k) / 2;
  const oy = (size - glyphHeight) / 2;
  const points = X.map(([x, y]) => `${+(ox + x * k).toFixed(3)},${+(oy + (CAP_HEIGHT - y) * k).toFixed(3)}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${colour.void}"/><polygon fill="${colour.signal}" points="${points}"/></svg>`;
}

const png = (size: number, share: number) => sharp(Buffer.from(svg(size, size * share))).png({ compressionLevel: 9 }).toBuffer();

function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const at = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, at);
    header.writeUInt8(size >= 256 ? 0 : size, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(data.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

const GLYPH = 0.72;
writeFileSync('public/favicon.svg', svg(64, 64 * GLYPH));
writeFileSync('public/apple-touch-icon.png', await png(180, 0.62));
writeFileSync('public/icon-512-maskable.png', await png(512, 0.6));
writeFileSync('public/favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size, GLYPH) })))));
writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Xini',
      short_name: 'Xini',
      start_url: '/',
      display: 'browser',
      background_color: colour.void,
      theme_color: colour.void,
      icons: [
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('icons written to public/');
