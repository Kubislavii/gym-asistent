// Generates the PWA icons (orange square with a white dumbbell) without extra packages.
// Usage: node scripts/make-icons.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const BG = [0xc2, 0x41, 0x0c]
const FG = [0xff, 0xff, 0xff]

// Dumbbell shapes in a 0..1 coordinate space, kept inside the maskable safe zone (center 80 %).
const SHAPES = [
  { x: 0.24, y: 0.47, w: 0.52, h: 0.06, r: 0.03 }, // bar
  { x: 0.27, y: 0.33, w: 0.08, h: 0.34, r: 0.03 }, // inner plates
  { x: 0.65, y: 0.33, w: 0.08, h: 0.34, r: 0.03 },
  { x: 0.2, y: 0.39, w: 0.06, h: 0.22, r: 0.025 }, // outer plates
  { x: 0.74, y: 0.39, w: 0.06, h: 0.22, r: 0.025 },
]

function insideRoundedRect(px, py, { x, y, w, h, r }) {
  if (px < x || px > x + w || py < y || py > y + h) return false
  const cx = Math.min(Math.max(px, x + r), x + w - r)
  const cy = Math.min(Math.max(py, y + r), y + h - r)
  return (px - cx) ** 2 + (py - cy) ** 2 <= r * r
}

function crc32(buf) {
  let c = ~0
  for (const b of buf) {
    c ^= b
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function renderPng(size) {
  const SS = 4 // supersampling for smooth edges
  const raw = Buffer.alloc(size * (size * 3 + 1))
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0
    for (let x = 0; x < size; x++) {
      let hits = 0
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / size
          const py = (y + (sy + 0.5) / SS) / size
          if (SHAPES.some((s) => insideRoundedRect(px, py, s))) hits++
        }
      const a = hits / (SS * SS)
      const o = y * (size * 3 + 1) + 1 + x * 3
      for (let i = 0; i < 3; i++) raw[o + i] = Math.round(BG[i] * (1 - a) + FG[i] * a)
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // RGB, no alpha (iOS fills transparency with black)
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

mkdirSync('public/icons', { recursive: true })
writeFileSync('public/icons/apple-touch-icon.png', renderPng(180))
writeFileSync('public/icons/icon-512.png', renderPng(512))
console.log('Icons written to public/icons/')
