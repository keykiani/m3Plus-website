/**
 * Image optimization script — converts oversized JPG/PNG source files to WebP.
 *
 * Usage:
 *   npm install --save-dev sharp
 *   node scripts/optimize-images.mjs
 *
 * The script writes .webp files alongside the originals. After verifying they
 * look correct, delete the original JPG/PNG files and update the image paths
 * in the code (or just keep both — Next.js Image will serve WebP automatically
 * when you update the src paths to .webp).
 *
 * Note: Next.js <Image> already converts to WebP for the browser at request
 * time, but the SERVER still has to read the full-size original. Resizing the
 * source files is the real performance win.
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, relative, extname, basename, dirname } from "path";

const PUBLIC = new URL("../public/images", import.meta.url).pathname;

// Resize targets — [ glob pattern, maxWidth, quality ]
// Images are constrained to maxWidth; height scales proportionally.
// Squares (team/squad) use maxWidth as max for both dimensions.
const TARGETS = [
  // Team headshots — displayed at ~500px in a 2-col grid
  { dir: "team",          maxWidth: 600,  quality: 82 },
  // Journey cards — displayed at ~400px in a 3-col grid
  { dir: "",              files: ["journey-leading.jpg", "journey-starting.jpg", "journey-growing.jpg"], maxWidth: 900, quality: 82 },
  // About page content images — displayed at half of 1280px max = ~640px
  { dir: "",              files: ["about-mission.jpg", "about-workshop.jpg"],  maxWidth: 1200, quality: 82 },
  // Hero image — displayed at ~384px (max-w-sm)
  { dir: "",              files: ["hero.jpg", "events-hero.jpg"],              maxWidth: 800,  quality: 82 },
  // Talk / adam / drew — check usage and resize accordingly
  { dir: "",              files: ["talk.jpg", "adam.jpg", "drew.jpg"],         maxWidth: 1200, quality: 82 },
  // Event thumbnails — displayed at 180px in archive, 280px in upcoming
  { dir: "events",        maxWidth: 400,  quality: 80 },
  // Testimonial avatars — displayed at ~80px
  { dir: "testimonials",  maxWidth: 200,  quality: 80 },
  // Logo PNGs — keep as PNG (transparency needed), skip WebP conversion
  // Squad photos — already small, but convert for format consistency
  { dir: "squad",         maxWidth: 600,  quality: 82 },
  // Social logos
  { dir: "",              files: ["linkedIn_logo.png", "slack_logo.png", "luma_logo.png"], maxWidth: 120, quality: 80 },
  // Subscribe sticker
  { dir: "",              files: ["subscribe-sticker.png"], maxWidth: 256, quality: 80 },
];

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await getAllImages(full)));
    } else if (/\.(jpg|jpeg|png)$/i.test(e.name) && !e.name.startsWith(".")) {
      files.push(full);
    }
  }
  return files;
}

async function convert(srcPath, maxWidth, quality) {
  const ext = extname(srcPath);
  const outPath = srcPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const relSrc = relative(PUBLIC, srcPath);
  const relOut = relative(PUBLIC, outPath);

  try {
    const meta = await sharp(srcPath).metadata();
    const resizeWidth = Math.min(meta.width, maxWidth);

    await sharp(srcPath)
      .resize(resizeWidth, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

    const beforeKB = Math.round((await stat(srcPath)).size / 1024);
    const afterKB  = Math.round((await stat(outPath)).size / 1024);
    const saved    = Math.round((1 - afterKB / beforeKB) * 100);
    console.log(`✓  ${relSrc} (${beforeKB}KB) → ${relOut} (${afterKB}KB, -${saved}%)`);
  } catch (err) {
    console.error(`✗  ${relSrc}: ${err.message}`);
  }
}

// Build a flat list of { path, maxWidth, quality } to process
async function buildQueue() {
  const allImages = await getAllImages(PUBLIC);
  const queue = [];

  for (const imgPath of allImages) {
    const rel = relative(PUBLIC, imgPath);
    const parts = rel.split("/");
    const file = parts[parts.length - 1];
    const subdir = parts.length > 1 ? parts[0] : "";

    // Skip logos directory — they need transparency, keep as PNG
    if (subdir === "logos") continue;

    for (const target of TARGETS) {
      if (target.files) {
        if (target.files.includes(file)) {
          queue.push({ path: imgPath, maxWidth: target.maxWidth, quality: target.quality });
          break;
        }
      } else if (target.dir !== undefined && subdir === target.dir) {
        queue.push({ path: imgPath, maxWidth: target.maxWidth, quality: target.quality });
        break;
      }
    }
  }
  return queue;
}

const queue = await buildQueue();
console.log(`\nOptimizing ${queue.length} images...\n`);
for (const item of queue) {
  await convert(item.path, item.maxWidth, item.quality);
}
console.log("\nDone! Review the .webp files, then update src= paths in your components.");
console.log("After updating paths, delete the original JPG/PNG source files.");
