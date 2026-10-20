// House style check for every user-facing text (case studies, UI strings, data, CV).
// Fails on em dashes and flags common AI-writing tells. Run: npm run lint:copy
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src/content', 'src/i18n', 'src/data', 'src/views', 'src/components', 'cv'];
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === 'out' || name === 'node_modules') continue;
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(md|ts|astro|mjs)$/.test(name)) files.push(p);
  }
};
roots.forEach((r) => { try { walk(r); } catch { /* folder not created yet */ } });

// [pattern, message, hard error?]
const rules = [
  [/—/g, 'em dash (house rule: never)', true],
  [/ – /g, 'spaced en dash used as a dash', true],
  [/\b(it'?s|this is|that'?s) not (just )?\w+[^.]*?, (it'?s|but)\b/gi, 'contrast reveal "it\'s not X, it\'s Y"', false],
  [/\bnot just\b/gi, '"not just X but Y"', false],
  [/\b(in today'?s|whether you'?re|here'?s the thing|let'?s dive|unlock the power|take it to the next level)\b/gi, 'stock opener', false],
  [/\b(seamless(ly)?|robust|leverag(e|ing)|delve|empower(s|ing)?|cutting-edge|game-?changer|elevate)\b/gi, 'AI vocabulary', false],
  [/\b(no es solo|no solo .{3,40} sino)\b/gi, 'contraste "no solo X sino Y"', false],
  [/\b(en el mundo actual|sin lugar a dudas|cabe destacar|potenciar|de vanguardia)\b/gi, 'muletilla de IA', false],
  [/\?\s(Because|Porque)\b/g, 'self-answered question', false],
];

let errors = 0;
let warnings = 0;
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // code comments may explain the rule itself
    if (/^\s*(\/\/|\*|\/\*)/.test(line) || f.endsWith('lint-copy.mjs')) return;
    for (const [re, msg, hard] of rules) {
      re.lastIndex = 0;
      if (re.test(line)) {
        console.log(`${hard ? 'ERROR' : 'warn '} ${f}:${i + 1}  ${msg}\n        ${line.trim().slice(0, 140)}`);
        hard ? errors++ : warnings++;
      }
    }
  });
}
console.log(`\n${files.length} files checked: ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
