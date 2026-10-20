// Builds the "le+" favicon set from the real Outfit outlines (the logo font):
// "l" in weight 500, "e" and "+" in weight 300, same recipe as the "le" icon of luitiescobar.com.
// Output: public/favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180), icon-512.png
// Run: npm run favicon
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';
import sharp from 'sharp';

const font = (w) => {
  const buf = readFileSync(`node_modules/@fontsource/outfit/files/outfit-latin-${w}-normal.woff`);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const regular = font(500);
const light = font(300);

const BG = '#141414';
const INK = '#fafaf7';
const SIZE = 64;
const PAD_X = 6;

// lay the glyphs out on one baseline at a reference size, then fit the group into the tile
const ref = 100;
const parts = [
  { f: regular, ch: 'l' },
  { f: light, ch: 'e' },
  { f: light, ch: '+', gap: -2 },
];
let x = 0;
const laid = parts.map(({ f, ch, gap = 0 }) => {
  x += gap;
  const glyph = f.charToGlyph(ch);
  const path = glyph.getPath(x, 0, ref);
  x += (glyph.advanceWidth / f.unitsPerEm) * ref;
  return path;
});
const box = laid.map((p) => p.getBoundingBox()).reduce((a, b) => ({
  x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1), x2: Math.max(a.x2, b.x2), y2: Math.max(a.y2, b.y2),
}));
const scale = (SIZE - PAD_X * 2) / (box.x2 - box.x1);
const height = (box.y2 - box.y1) * scale;
const tx = PAD_X - box.x1 * scale;
const ty = (SIZE - height) / 2 - box.y1 * scale;

const d = laid.map((p) => {
  // re-run the path at the final transform for clean coordinates
  p.commands.forEach((c) => {
    for (const k of ['x', 'y', 'x1', 'y1', 'x2', 'y2']) {
      if (k in c) c[k] = k.startsWith('x') ? c[k] * scale + tx : c[k] * scale + ty;
    }
  });
  return p.toPathData(2);
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="14" fill="${BG}"/>${d.map((p) => `<path fill="${INK}" d="${p}"/>`).join('')}</svg>\n`;
writeFileSync('public/favicon.svg', svg);

const png = (s, opts = {}) => sharp(Buffer.from(svg), { density: Math.ceil((72 * s) / SIZE) * 2 }).resize(s, s).png(opts).toBuffer();

writeFileSync('public/apple-touch-icon.png', await png(180));
writeFileSync('public/icon-512.png', await png(512));

// ICO with embedded PNGs (supported by every current browser)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.concat(sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
}));
writeFileSync('public/favicon.ico', Buffer.concat([header, dir, ...images]));
console.log('favicon set written to public/');
