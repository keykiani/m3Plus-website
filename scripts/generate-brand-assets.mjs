/**
 * Generates favicon, Apple touch icon, and the Open Graph share card from the
 * brand logo. Run with: node scripts/generate-brand-assets.mjs
 *
 * Outputs (committed to the repo, so this only needs re-running when the logo
 * or brand colors change):
 *   src/app/icon.png        512x512  — browser tab / PWA icon
 *   src/app/apple-icon.png  180x180  — iOS home screen
 *   public/og-image.png    1200x630  — link previews (LinkedIn, Slack, X)
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

async function writeIcon(size, outPath, background) {
  // Logo occupies ~72% of the canvas, leaving optical padding.
  const logo = await logoBuffer(Math.round(size * 0.72));

  await sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(outPath);

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
  if (!fs.existsSync(LOGO)) {
    throw new Error(`Logo not found at ${LOGO}`);
  }

  fs.mkdirSync(path.join(root, "src/app"), { recursive: true });
  fs.mkdirSync(path.join(root, "public"), { recursive: true });

  // Transparent favicon reads correctly on light and dark browser chrome.
  await writeIcon(512, path.join(root, "src/app/icon.png"), {
    r: 0, g: 0, b: 0, alpha: 0,
  });

  // iOS composites transparency onto black, so give the Apple icon a solid bg.
  await writeIcon(180, path.join(root, "src/app/apple-icon.png"), {
    r: 248, g: 245, b: 232, alpha: 1, // cream
  });

  await writeOgImage(path.join(root, "public/og-image.png"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
