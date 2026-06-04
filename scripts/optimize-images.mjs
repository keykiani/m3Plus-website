import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = './public';
const QUALITY = 80;

async function optimizeImage(filePath) {
  try {
    const ext = filePath.toLowerCase().split('.').pop();
    let buffer;

    if (ext === 'jpg' || ext === 'jpeg') {
      buffer = await sharp(filePath)
        .jpeg({ quality: QUALITY, progressive: true })
        .toBuffer();
    } else if (ext === 'png') {
      buffer = await sharp(filePath)
        .png({ compressionLevel: 9 })
        .toBuffer();
    }

    if (buffer) {
      writeFileSync(filePath, buffer);
      console.log(`✓ Optimized: ${filePath}`);
    }
  } catch (err) {
    console.error(`✗ Failed: ${filePath}`, err.message);
  }
}

function walkDir(dir) {
  const files = [];
  const items = readdirSync(dir);

  items.forEach((item) => {
    const path = join(dir, item);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      files.push(...walkDir(path));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      files.push(path);
    }
  });

  return files;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const files = walkDir(PUBLIC_DIR);
  console.log(`Found ${files.length} images to optimize\n`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log(`\n✅ Image optimization complete!`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
