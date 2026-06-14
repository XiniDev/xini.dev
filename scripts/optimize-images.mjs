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
  const quality = base === "wsmath" ? 72 : 80;

  await sharp(path.join(dir, file))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality })
    .toFile(path.join(dir, `${base}.webp`));

  console.log(`${file} -> ${base}.webp`);
  count += 1;
}

console.log(`Optimized ${count} image(s) -> WebP in public/projects/`);
