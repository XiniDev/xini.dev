import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
});

export const WIDTHS = [480, 800, 1200] as const;
export const ASPECT = 10 / 16;

export function sourceFor(slug: string): ImageMetadata | undefined {
  const key = Object.keys(files).find((k) => k.replace(/^.*\//, '').replace(/\.[a-z]+$/, '') === slug);
  return key ? files[key]?.default : undefined;
}

export async function pictureFor(slug: string) {
  const src = sourceFor(slug);
  if (!src) return undefined;
  const widths = WIDTHS.filter((w) => w <= src.width);
  const render = async (format: 'avif' | 'webp') =>
    Promise.all(
      widths.map(async (width) => {
        const img = await getImage({ src, width, height: Math.round(width * ASPECT), fit: 'cover', format });
        return { width, src: img.src };
      }),
    );
  const [avif, webp] = await Promise.all([render('avif'), render('webp')]);
  const srcset = (list: { width: number; src: string }[]) => list.map((i) => `${i.src} ${i.width}w`).join(', ');
  const largest = webp.at(-1);
  const fallback = webp.find((i) => i.width === 800) ?? largest;
  if (!fallback) return undefined;
  return {
    sources: [
      { type: 'image/avif', srcset: srcset(avif) },
      { type: 'image/webp', srcset: srcset(webp) },
    ],
    fallback: {
      src: fallback.src,
      srcset: srcset(webp),
      width: fallback.width,
      height: Math.round(fallback.width * ASPECT),
    },
  };
}
