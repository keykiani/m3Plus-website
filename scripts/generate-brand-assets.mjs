/**
 * Generates the favicon, Apple touch icon, and the Open Graph share card.
 * Run with: node scripts/generate-brand-assets.mjs
 *
 * Outputs (committed to the repo, so this only needs re-running when the logo
 * or brand colors change):
 *   src/app/favicon.ico      16/32/48  — browser tab, and the bare
 *                                        /favicon.ico that browsers and
 *                                        crawlers request directly
 *   src/app/apple-icon.png  180x180    — iOS home screen
 *   public/og-image.png    1200x630    — link previews (LinkedIn, Slack, X)
 *
 * `src/app/icon.png` is NOT generated here — it is a hand-made favicon
 * committed to the repo. The Apple icon is derived from it so the two stay
 * visually identical; replace icon.png and re-run to update both.
 *
 * NOTE ON TYPE: the brand heading font is Manrope, which is loaded at runtime
 * via `next/font/google` and is not available to this script as a font file.
 * The card text therefore renders in the best available system grotesque.
 * To use real Manrope: drop `Manrope-ExtraBold.ttf` into `scripts/fonts/`,
 * install it (`fc-cache`), and set HEADING_FONT below to "Manrope".
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const LOGO = path.join(root, "public/images/m3-circle.svg");
const FAVICON = path.join(root, "src/app/icon.png");

// Brand tokens — keep in sync with tailwind.config.ts
const CREAM = "#F8F5E8";
const NAVY = "#122849";
const BLUE = "#2977BD";

const HEADING_FONT = "Liberation Sans, DejaVu Sans, sans-serif";

const NAME = "M3+ Mutual Mentoring";
const TAGLINE = "Connect. Grow. Lead.";
const FOOTER = "Design mentorship in Plano & Dallas, TX";

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]
  );

/** Render the logo SVG at a given height, preserving aspect ratio. */
async function logoBuffer(height) {
  return sharp(LOGO, { density: 600 })
    .resize({ height, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

/**
 * Pack PNG buffers into a single .ico.
 *
 * A modern ICO is just a small header plus embedded PNGs, so this needs no
 * dependency — sharp cannot write ICO. Layout is ICONDIR (6 bytes), then one
 * 16-byte ICONDIRENTRY per image, then the PNG payloads.
 */
function buildIco(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    // 256px is encoded as 0 in a single byte; these are all smaller.
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size — 0 for truecolor
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

/**
 * Favicon .ico at the sizes browsers actually pick from.
 *
 * The 512px icon.png alone renders mushy when a browser downscales it to a
 * 16px tab, and nothing answered a bare /favicon.ico request.
 */
async function writeFaviconIco(outPath) {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map(async (size) => ({
      size,
      data: await sharp(FAVICON)
        .resize(size, size, { fit: "cover", kernel: "lanczos3" })
        .png({ compressionLevel: 9 })
        .toBuffer(),
    }))
  );

  fs.writeFileSync(outPath, buildIco(images));
  console.log(`✓ ${path.relative(root, outPath)} (${sizes.join("/")})`);
}

/** Apple touch icon — a straight downscale of the committed favicon. */
async function writeAppleIcon(size, outPath) {
  await sharp(FAVICON).resize(size, size, { fit: "cover" }).png().toFile(outPath);

  console.log(`✓ ${path.relative(root, outPath)} (${size}x${size})`);
}

async function writeOgImage(outPath) {
  const W = 1200;
  const H = 630;
  const logo = await logoBuffer(150);

  const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${W}" height="14" fill="${BLUE}"/>
  <text x="100" y="380" font-family="${HEADING_FONT}" font-size="82" font-weight="bold" fill="${NAVY}">${escapeXml(NAME)}</text>
  <text x="100" y="462" font-family="${HEADING_FONT}" font-size="46" font-weight="bold" fill="${BLUE}">${escapeXml(TAGLINE)}</text>
  <text x="100" y="536" font-family="${HEADING_FONT}" font-size="28" fill="${NAVY}" opacity="0.7">${escapeXml(FOOTER)}</text>
</svg>`;

  await sharp(Buffer.from(textSvg))
    .composite([{ input: logo, top: 90, left: 100 }])
    .png()
    .toFile(outPath);

  console.log(`✓ ${path.relative(root, outPath)} (${W}x${H})`);
}

async function main() {
  for (const [label, file] of [["Logo", LOGO], ["Favicon", FAVICON]]) {
    if (!fs.existsSync(file)) throw new Error(`${label} not found at ${file}`);
  }

  fs.mkdirSync(path.join(root, "public"), { recursive: true });

  await writeFaviconIco(path.join(root, "src/app/favicon.ico"));
  await writeAppleIcon(180, path.join(root, "src/app/apple-icon.png"));
  await writeOgImage(path.join(root, "public/og-image.png"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
