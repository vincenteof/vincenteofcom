/**
 * Generate site icons from public/me.png (master portrait).
 * The source has a transparent background — flatten onto pure white so
 * favicons and header avatars match (no black showing through alpha).
 * Usage: pnpm icons
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'public', 'me.png')
const outDir = path.join(root, 'public')

/** Favicon / app icon plate — pure white */
const PLATE = { r: 255, g: 255, b: 255 }

/**
 * Find a square crop around the chalk portrait (skip empty/transparent bg).
 * @param {Buffer} opaque flattened image buffer
 * @param {number} padPx padding around detected subject
 */
async function subjectSquare(opaque, padPx = 28) {
  const { data, info } = await sharp(opaque)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const sat = max - min
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

      // Skip near-white plate background
      const nearWhite = r > 245 && g > 245 && b > 245 && sat < 12
      if (nearWhite) continue

      const isDark = lum < 55
      const isSkinOrBlue = sat > 28 && (r > g + 10 || b > r + 15)
      const isGlow = lum > 160 && sat > 15
      if (!isDark && !isSkinOrBlue && !isGlow) continue

      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }

  if (maxX <= minX || maxY <= minY) {
    const size = Math.round(Math.min(width, height) * 0.6)
    return {
      left: Math.round((width - size) / 2),
      top: Math.round((height - size) / 2),
      width: size,
      height: size,
    }
  }

  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  let half = Math.max(maxX - minX, maxY - minY) / 2 + padPx
  half = Math.min(half, cx, cy, width - cx, height - cy)

  const size = Math.max(1, Math.round(half * 2))
  return {
    left: Math.round(cx - size / 2),
    top: Math.round(cy - size / 2),
    width: size,
    height: size,
  }
}

async function writePng(cropped, size, filename) {
  const out = path.join(outDir, filename)
  await sharp(cropped)
    .resize(size, size, {
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(out)

  const kb = (fs.statSync(out).size / 1024).toFixed(1)
  console.log(`  ${filename}  ${size}×${size}  ${kb} KB`)
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Missing public/me.png — place the master portrait there first.')
    process.exit(1)
  }

  console.log('Generating icons from public/me.png …')
  console.log('  flattening transparent bg → pure white')

  // Flatten alpha onto white so icons never depend on page/CSS background
  const opaque = await sharp(src)
    .flatten({ background: PLATE })
    .png()
    .toBuffer()

  const cropLarge = await subjectSquare(opaque, 36)
  const cropFav = await subjectSquare(opaque, 12)
  console.log('  crop (large):', cropLarge)
  console.log('  crop (favicon):', cropFav)

  const largeBuf = await sharp(opaque).extract(cropLarge).png().toBuffer()
  const favBuf = await sharp(opaque).extract(cropFav).png().toBuffer()

  await writePng(largeBuf, 512, 'logo512.png')
  await writePng(largeBuf, 192, 'logo192.png')
  await writePng(largeBuf, 180, 'apple-touch-icon.png')
  await writePng(favBuf, 32, 'favicon-32x32.png')
  await writePng(favBuf, 16, 'favicon-16x16.png')

  const ico = await pngToIco([
    await sharp(favBuf).resize(16, 16).png().toBuffer(),
    await sharp(favBuf).resize(32, 32).png().toBuffer(),
    await sharp(favBuf).resize(48, 48).png().toBuffer(),
  ])
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), ico)
  console.log(`  favicon.ico  multi-size  ${(ico.length / 1024).toFixed(1)} KB`)
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
