import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Generates authoritative website favicon assets using the exact standalone
 * Aestific symbol (@-like mark) from the project's official logo asset.
 *
 * Requirements strictly enforced:
 * - Standalone symbol ONLY — no text, no wordmark.
 * - Exact vector path and proportions preserved from public/aestific-logo.svg.
 * - No arbitrary bounding boxes or rounded rectangles.
 * - Light and dark mode support in SVG for modern browser tabs.
 * - Multi-resolution PNGs (48x48, 96x96, 192x192, 512x512) for Google Search eligibility.
 * - Multi-size favicon.ico for root crawler fallbacks.
 * - Apple Touch Icon (180x180) for iOS.
 */
async function generateFavicons() {
  const publicDir = path.resolve(process.cwd(), 'public');

  // Exact path extracted from public/aestific-logo.svg
  const emblemPath =
    'M 54 79.5 A 32 32 0 1 1 82 48 L 82 64 A 7.5 7.5 0 0 1 67 64 L 67 48 A 17 17 0 0 0 33 48 A 17 17 0 0 0 67 48';

  // 1. Standalone SVG Favicon with dynamic browser tab theme adaptation
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" fill="none">
  <style>
    .aestific-symbol { stroke: #000000; }
    @media (prefers-color-scheme: dark) {
      .aestific-symbol { stroke: #ffffff; }
    }
  </style>
  <path
    d="${emblemPath}"
    class="aestific-symbol"
    stroke-width="6.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon);
  console.log('✅ Generated public/favicon.svg');

  // Helper for generating transparent PNGs of the symbol
  const makeRasterSvg = (strokeColor = '#000000') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" fill="none">
  <path
    d="${emblemPath}"
    stroke="${strokeColor}"
    stroke-width="6.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  // 2. Google Search & Browser PNGs (multiples of 48px square)
  const sizes = [48, 96, 192, 512];
  for (const size of sizes) {
    await sharp(Buffer.from(makeRasterSvg('#000000')), { density: 300 })
      .resize(size, size)
      .png({ quality: 100 })
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
    console.log(`✅ Generated public/favicon-${size}x${size}.png`);
  }

  // 3. Default standard favicon.png & /favicon (192x192 PNG)
  const png192Buffer = await sharp(Buffer.from(makeRasterSvg('#000000')), { density: 300 })
    .resize(192, 192)
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), png192Buffer);
  fs.writeFileSync(path.join(publicDir, 'favicon'), png192Buffer);
  console.log('✅ Generated public/favicon.png and public/favicon (192x192)');

  // 4. Apple Touch Icon (180x180, white canvas for iOS home screen)
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="180" height="180" fill="none">
  <rect width="100" height="100" fill="#ffffff" />
  <path
    d="${emblemPath}"
    stroke="#000000"
    stroke-width="6.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;
  await sharp(Buffer.from(appleSvg), { density: 300 })
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✅ Generated public/apple-touch-icon.png');

  // 5. Multi-resolution favicon.ico containing 16x16, 32x32, 48x48
  const p16 = await sharp(Buffer.from(makeRasterSvg('#000000'))).resize(16, 16).png().toBuffer();
  const p32 = await sharp(Buffer.from(makeRasterSvg('#000000'))).resize(32, 32).png().toBuffer();
  const p48 = await sharp(Buffer.from(makeRasterSvg('#000000'))).resize(48, 48).png().toBuffer();

  const icoImages = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved (must be 0)
  header.writeUInt16LE(1, 2); // Image type (1 = icon)
  header.writeUInt16LE(icoImages.length, 4); // Number of images

  let offset = 6 + icoImages.length * 16;
  const dirEntries: Buffer[] = [];
  for (const img of icoImages) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Image offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...icoImages.map((img) => img.buffer)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`✅ Generated public/favicon.ico (${icoBuffer.length} bytes)`);
}

generateFavicons().catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
