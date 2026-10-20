// Renders the AI Developer CV (EN/ES) to HTML and prints it to A4 PDF with headless Edge/Chrome.
//   node cv/build.mjs   → cv/out/*.pdf (with phone, git-ignored) and public/cv/*.pdf (web copies, no phone)
// Adapted from luitiescobar-portfolio-2026/cv/build.mjs: Outfit + JetBrains Mono, ink on white paper
// (printable and ATS-readable: one column of real text), without the design portfolio's colored dots.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { contact, cv } from './content.mjs';

// phone number from the git-ignored cv/private.mjs; without it the private PDFs are built without a phone
try { contact.phone = (await import('./private.mjs')).phone ?? ''; } catch { /* no private file */ }

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'cv', 'out');
const pub = join(root, 'public', 'cv');
mkdirSync(out, { recursive: true });
mkdirSync(pub, { recursive: true });

const font = (pkg, file) => pathToFileURL(join(root, 'node_modules', '@fontsource', pkg, 'files', file)).href;
const photo = `data:image/jpeg;base64,${(
  await sharp(join(root, 'src', 'assets', 'images', 'profile.jpg')).resize(360, 432, { fit: 'cover', position: 'top' }).grayscale().jpeg({ quality: 86 }).toBuffer()
).toString('base64')}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const months = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
};
const month = (d, lang) => `${months[lang][Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;
/** "Jun 2026", "Jun - Sep 2026", "Oct 2017 - Apr 2019" */
const period = (a, b, lang) => {
  if (a.slice(0, 7) === b.slice(0, 7)) return month(a, lang);
  if (a.slice(0, 4) === b.slice(0, 4)) return `${months[lang][Number(a.slice(5, 7)) - 1]} - ${month(b, lang)}`;
  return `${month(a, lang)} - ${month(b, lang)}`;
};

function html(c, { withPhoto, withPhone }) {
  const L = c.labels;
  const link = (href, text) => `<a href="${href}">${esc(text)}</a>`;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<title>${esc(contact.name)} · CV · ${esc(c.title)}</title>
<meta name="author" content="${esc(contact.name)}">
<style>
  @font-face { font-family: Outfit; font-weight: 200; src: url(${font('outfit', 'outfit-latin-200-normal.woff2')}); }
  @font-face { font-family: Outfit; font-weight: 300; src: url(${font('outfit', 'outfit-latin-300-normal.woff2')}); }
  @font-face { font-family: Outfit; font-weight: 400; src: url(${font('outfit', 'outfit-latin-400-normal.woff2')}); }
  @font-face { font-family: Outfit; font-weight: 500; src: url(${font('outfit', 'outfit-latin-500-normal.woff2')}); }
  @font-face { font-family: Mono; font-weight: 400; src: url(${font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2')}); }

  @page { size: A4; margin: 13mm 16mm 12mm; }
  :root { --ink: #141414; --ink-2: #4a4a47; --muted: #85857f; --line: #e2e1da; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font: 300 9pt/1.4 Outfit, system-ui, sans-serif; color: var(--ink-2); }
  a { color: inherit; text-decoration: none; }
  strong { font-weight: 500; color: var(--ink); }
  .mono { font-family: Mono, ui-monospace, monospace; font-size: 7pt; letter-spacing: .05em; text-transform: uppercase; color: var(--muted); }

  header { display: flex; gap: 7mm; align-items: center; padding-bottom: 4.6mm; border-bottom: 1px solid var(--line); }
  .photo { width: 28mm; aspect-ratio: 5 / 6; object-fit: cover; border-radius: 0 2mm 14mm 0; flex: none; }
  h1 { font-size: 29pt; font-weight: 200; line-height: 1; letter-spacing: -.02em; color: var(--ink); }
  h1 b { font-weight: 400; }
  h1 i { font-style: normal; font-weight: 200; color: var(--muted); }
  .role { margin-top: 1.8mm; font-size: 12.5pt; font-weight: 400; color: var(--ink); }
  .areas { margin-top: 1.6mm; font-size: 8.6pt; color: var(--ink-2); }
  .areas span:not(:last-child)::after { content: '  /  '; color: var(--muted); }
  .contact { display: flex; flex-wrap: wrap; gap: 1mm 3.2mm; margin-top: 3mm; font-size: 8.2pt; color: var(--ink); }
  .contact a { border-bottom: .6pt solid var(--line); }
  .avail { margin-top: 1.3mm; font-size: 8.3pt; color: var(--muted); }

  section { display: grid; grid-template-columns: 27mm 1fr; gap: 7mm; padding: 3.6mm 0; border-bottom: 1px solid var(--line); }
  section:last-of-type { border-bottom: 0; }
  h2 { padding-top: .8mm; }
  .summary p + p { margin-top: 1.5mm; }
  .summary p:first-child { font-size: 10.4pt; color: var(--ink); line-height: 1.4; }

  .job { break-inside: avoid; }
  .job + .job { margin-top: 2.9mm; }
  .job__head { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
  .job__title { font-size: 10.2pt; color: var(--ink); }
  .job__meta { white-space: nowrap; flex: none; }
  .job__stack { margin-top: .3mm; font-size: 8.3pt; color: var(--muted); }
  ul { margin-top: 1.2mm; padding-left: 3.6mm; }
  li + li { margin-top: .7mm; }
  li::marker { color: var(--muted); }

  .list { list-style: none; padding: 0; margin: 0; }
  .list li { display: flex; justify-content: space-between; gap: 4mm; }
  .list li + li { margin-top: 1.1mm; }
  .list .mono { white-space: nowrap; flex: none; padding-top: .5mm; }

  dl { display: grid; grid-template-columns: 24mm 1fr; gap: 1.4mm 4mm; }
  dt { font-weight: 500; color: var(--ink); }
  .langs { display: flex; gap: 8mm; color: var(--ink); }
  .langs span span { color: var(--muted); margin-left: 1.6mm; }
  .links a { font-size: 11pt; color: var(--ink); border-bottom: .8pt solid var(--ink); margin-right: 5mm; }
  .links p { margin-top: 1.2mm; }
</style>
</head>
<body>
<header>
  ${withPhoto ? `<img class="photo" src="${photo}" alt="${esc(contact.name)}">` : ''}
  <div>
    <h1>Luiti <b>Escobar</b><i>+</i></h1>
    <p class="role">${esc(c.title)}</p>
    <p class="areas">${c.areas.map((d) => `<span>${esc(d)}</span>`).join('')}</p>
    <p class="contact">
      ${withPhone && contact.phone ? link(`tel:${contact.phone.replace(/\s/g, '')}`, contact.phone) : ''}
      ${link(`mailto:${contact.email}`, contact.email)}
      ${link(`https://${contact.web}${c.lang === 'es' ? '/es/' : '/'}`, contact.web)}
      ${link(`https://${contact.github}`, contact.github)}
      ${link(`https://www.${contact.linkedin}`, contact.linkedin)}
    </p>
    <p class="avail">${esc(c.location)} · ${esc(c.availability)}</p>
  </div>
</header>

<section class="summary"><h2 class="mono">${L.profile}</h2><div>${c.summary.map((p) => `<p>${esc(p)}</p>`).join('')}</div></section>

<section><h2 class="mono">${L.experience}</h2><div>
${c.projects.map((j) => `  <article class="job">
    <div class="job__head"><p class="job__title"><strong>${esc(j.name)}</strong> · ${esc(j.role)}</p><p class="job__meta mono">${period(j.start, j.end, c.lang)}</p></div>
    <p class="job__stack">${esc(j.stack)}</p>
    <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </article>`).join('\n')}
</div></section>

<section><h2 class="mono">${L.more}</h2><ul class="list">
${c.more.map(([n, d, y]) => `  <li><span><strong>${esc(n)}</strong> · ${esc(d)}</span><span class="mono">${y}</span></li>`).join('\n')}
</ul></section>

<section><h2 class="mono">${L.earlier}</h2><div>
${c.earlier.map((j) => `  <article class="job">
    <div class="job__head"><p class="job__title"><strong>${esc(j.role)}</strong> · ${esc(j.company)}</p><p class="job__meta mono">${period(j.start, j.end, c.lang)}</p></div>
    <p class="job__stack">${esc(j.place)}</p>
    <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </article>`).join('\n')}
</div></section>

<section><h2 class="mono">${L.skills}</h2><dl>${c.skills.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section>

<section><h2 class="mono">${L.training}</h2><ul class="list">${c.training.map(([t, d]) => `<li><span><strong>${esc(t)}</strong></span><span>${esc(d)}</span></li>`).join('')}</ul></section>

<section><h2 class="mono">${L.languages}</h2><p class="langs">${c.languages.map(([n, l]) => `<span>${esc(n)}<span>${esc(l)}</span></span>`).join('')}</p></section>

<section class="links"><h2 class="mono">${L.links}</h2><div>${link(`https://${contact.web}${c.lang === 'es' ? '/es/' : '/'}`, contact.web)}${link(`https://${contact.design}${c.lang === 'es' ? '/es/' : '/'}`, contact.design)}<p>${esc(c.linksNote)}</p></div></section>
</body>
</html>`;
}

const browser = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => existsSync(p));
if (!browser) throw new Error('Edge or Chrome is needed to print the PDFs');

const variants = [
  { lang: 'en', withPhoto: true, withPhone: true, file: 'LuitiEscobar_CV_AI-Developer_EN' },
  { lang: 'en', withPhoto: false, withPhone: true, file: 'LuitiEscobar_CV_AI-Developer_EN_no-photo' },
  { lang: 'es', withPhoto: true, withPhone: true, file: 'LuitiEscobar_CV_Desarrollador-IA_ES' },
  { lang: 'es', withPhoto: false, withPhone: true, file: 'LuitiEscobar_CV_Desarrollador-IA_ES_sin-foto' },
  // published on the site (About page "Download CV"): no phone number
  { lang: 'en', withPhoto: true, withPhone: false, file: 'web-en', publish: 'luiti-escobar-cv-en.pdf' },
  { lang: 'es', withPhoto: true, withPhone: false, file: 'web-es', publish: 'luiti-escobar-cv-es.pdf' },
];

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
/** Edge on Windows may hand the job to a background process and return early: wait for a finished file */
function waitForFile(file, timeout = 60_000) {
  let last = -1;
  for (const until = Date.now() + timeout; Date.now() < until; sleep(400)) {
    const size = existsSync(file) ? statSync(file).size : -1;
    if (size > 0 && size === last) return;
    last = size;
  }
  throw new Error(`Timed out waiting for ${file}`);
}

const profile = mkdtempSync(join(tmpdir(), 'cv-print-'));
for (const v of variants) {
  const page = join(out, `${v.file}.html`);
  const pdf = join(out, `${v.file}.pdf`);
  writeFileSync(page, html(cv[v.lang], v));
  rmSync(pdf, { force: true });
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, '--no-pdf-header-footer', '--allow-file-access-from-files', `--print-to-pdf=${pdf}`, pathToFileURL(page).href], { stdio: 'ignore' });
  waitForFile(pdf);
  const pages = (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (v.publish) copyFileSync(pdf, join(pub, v.publish));
  console.log(`${v.file}.pdf · ${pages} page${pages === 1 ? '' : 's'}${v.publish ? ` → public/cv/${v.publish}` : ''}`);
}
rmSync(profile, { recursive: true, force: true });
