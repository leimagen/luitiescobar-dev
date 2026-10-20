// Renders the default share images (public/og-default.jpg and og-default-es.jpg, 1200×630)
// from a small HTML card with the site fonts and photo, screenshotted by headless Edge.
// Run: node scripts/og.mjs   (Windows, Edge installed)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = (p) => pathToFileURL(resolve(p)).href;
const font = (w) => url(`node_modules/@fontsource/outfit/files/outfit-latin-${w}-normal.woff2`);
const mono = url('node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2');
const tmp = mkdtempSync(join(tmpdir(), 'og-'));

const cards = {
  en: { greet: "hi, I'm Luiti Escobar", l1: 'AI', l2: 'Developer', foot: 'Agents, web apps and games built with Claude Code' },
  es: { greet: 'hola, soy Luiti Escobar', l1: 'Desarrollador', l2: 'de IA', foot: 'Agentes, apps web y juegos hechos con Claude Code' },
};

for (const [lang, c] of Object.entries(cards)) {
  const html = `<!doctype html><meta charset="utf-8"><style>
    @font-face { font-family: O; font-weight: 200; src: url(${font(200)}); }
    @font-face { font-family: O; font-weight: 300; src: url(${font(300)}); }
    @font-face { font-family: O; font-weight: 400; src: url(${font(400)}); }
    @font-face { font-family: M; src: url(${mono}); }
    * { margin: 0; box-sizing: border-box; }
    html, body { width: 1200px; height: 630px; background: #141414; color: #fafaf7; font-family: O; overflow: hidden; }
    img { position: absolute; left: 0; top: 0; width: 430px; height: 630px; object-fit: cover; object-position: 50% 18%; border-radius: 0 0 220px 0; filter: grayscale(1); }
    .copy { position: absolute; left: 500px; right: 60px; top: 150px; }
    .g { font-size: 30px; font-weight: 300; color: #b4b4ad; }
    h1 { margin-top: 14px; font-weight: 200; text-transform: uppercase; line-height: .92; letter-spacing: -.03em; font-size: ${lang === 'es' ? 78 : 128}px; }
    h1 span { display: block; } .em { font-weight: 400; } b { font-weight: 200; color: #7c7c76; }
    .f { position: absolute; left: 500px; bottom: 56px; font-family: M; font-size: 20px; color: #7c7c76; }
    .logo { position: absolute; left: 500px; top: 60px; font-size: 30px; font-weight: 400; } .logo span { font-weight: 200; }
  </style>
  <img src="${url('src/assets/images/profile.jpg')}">
  <div class="logo">luiti<span>escobar</span>+</div>
  <div class="copy"><p class="g">${c.greet}</p><h1><span class="${lang === 'en' ? 'em' : ''}">${c.l1}</span><span class="${lang === 'es' ? 'em' : ''}">${c.l2}<b>+</b></span></h1></div>
  <p class="f">${c.foot}</p>`;
  const page = join(tmp, `og-${lang}.html`);
  const png = join(tmp, `og-${lang}.png`);
  writeFileSync(page, html);
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${join(tmp, 'edge')}`,
    '--allow-file-access-from-files', '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${png}`, pathToFileURL(page).href]);
  await sharp(png).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/og-default${lang === 'es' ? '-es' : ''}.jpg`);
  console.log(`public/og-default${lang === 'es' ? '-es' : ''}.jpg`);
}
