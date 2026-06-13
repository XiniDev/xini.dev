// Build-time, one-shot image optimizer (devDependency: sharp).
// Resizes the project screenshots to 800px-wide WebP so the static export
// (images: { unoptimized: true }) ships light assets. Run: npm run optimize-images
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/projects"
);

const SRC_EXT = [".png", ".jpg", ".jpeg"];

const files = await readdir(dir);
let count = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!SRC_EXT.includes(ext)) continue;

  const base = path.basename(file, ext);
  const input = path.join(dir, file);
  const output = path.join(dir, `${base}.webp`);
  // The photographic wsmath shot compresses fine at a slightly lower quality.
  const quality = base === "wsmath" ? 72 : 80;

  await sharp(input)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);

  console.log(`✓ ${file} → ${base}.webp`);
  count += 1;
}

console.log(`\nOptimized ${count} image(s) → WebP in public/projects/`);
console.log("Next: confirm the .webp files, update image paths, delete the originals.");
