const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Ensure the icons directory exists
  const iconsDir = path.join(process.cwd(), 'public', 'icons');
  await fs.mkdir(iconsDir, { recursive: true });

  // Read the SVG file
  const svgBuffer = await fs.readFile(path.join(process.cwd(), 'public', 'favicon.svg'));

  // Generate PNG icons for each size
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));

    console.log(`Generated ${size}x${size} icon`);
  }

  // Generate favicon.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'favicon.png'));

  console.log('Generated favicon.png');
}

generateIcons().catch(console.error);
