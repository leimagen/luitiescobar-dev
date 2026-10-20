import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

import teParaDosGame from '../assets/work/te-para-dos-game.png';
import studyLab from '../assets/work/study-lab-live.png';
import diario from '../assets/work/diario-live.png';
import fwc from '../assets/work/fwc-live.png';
import portfolio from '../assets/work/portfolio-live.png';
import gmailCleaner from '../assets/work/gmail-cleaner-logo.jpg';

type L = Record<Lang, string>;

export type Category = 'agents' | 'automation' | 'web' | 'games';

export const categories: { id: Category; label: L }[] = [
  { id: 'agents', label: { en: 'AI agents', es: 'Agentes de IA' } },
  { id: 'automation', label: { en: 'Automation', es: 'Automatización' } },
  { id: 'web', label: { en: 'Web apps', es: 'Apps web' } },
  { id: 'games', label: { en: 'Games', es: 'Juegos' } },
];

/** One stretch of commits. Dates are the first and last commit (author date) in the repo. */
export interface Span {
  start: string;
  end: string;
  commits: number;
  label?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: Category;
  /** repo activity; a project rewritten in several repos has several spans */
  spans: Span[];
  summary: L;
  status: L;
  role: L;
  stack: string[];
  /** models and AI tooling, in the product or in the build */
  ai: string[];
  links: { label: L; href: string }[];
  cover?: { src: ImageMetadata; alt: L; position?: string; fit?: 'contain' };
  /** featured on the home index (all projects still get a page) */
  featured?: boolean;
}

const repo = (name: string) => `https://github.com/leimagen/${name}`;
const code: L = { en: 'Source code', es: 'Código fuente' };

export const projects: Project[] = [
  {
    slug: 'luitiescobar-com',
    name: 'luitiescobar.com',
    category: 'web',
    spans: [{ start: '2026-10-15', end: '2026-10-19', commits: 20 }],
    summary: {
      en: 'My design portfolio, rebuilt from a static page into a bilingual Astro site with a CMS, likes and analytics that wait for consent.',
      es: 'Mi portafolio de diseño, de una página estática a un sitio Astro bilingüe con CMS, likes y analítica que espera el consentimiento.',
    },
    status: { en: 'Live', es: 'En producción' },
    role: { en: 'Design, development, content migration', es: 'Diseño, desarrollo, migración de contenido' },
    stack: ['Astro 7', 'Sanity v6', 'Cloudflare Workers', 'D1', 'TypeScript', 'Figma'],
    ai: ['Claude Code', 'Figma MCP', 'Kling AI'],
    links: [{ label: { en: 'Visit the site', es: 'Ver el sitio' }, href: 'https://luitiescobar.com' }],
    cover: { src: portfolio, alt: { en: 'Home page of luitiescobar.com', es: 'Portada de luitiescobar.com' } },
    featured: true,
  },
  {
    slug: 'te-para-dos',
    name: 'Té Para Dos',
    category: 'games',
    spans: [{ start: '2026-09-26', end: '2026-10-02', commits: 29 }],
    summary: {
      en: 'A family card game turned into a 3D desktop game in Godot, with a computer opponent, a tutorial and its own music.',
      es: 'Un juego de cartas familiar convertido en juego 3D de escritorio en Godot, con rival de computadora, tutorial y música propia.',
    },
    status: { en: 'v1.0 on itch.io, Steam pending', es: 'v1.0 en itch.io, Steam pendiente' },
    role: { en: 'Game design, art direction, development', es: 'Diseño de juego, dirección de arte, desarrollo' },
    stack: ['Godot 4.7', 'GDScript', 'GLSL shaders', 'Python tooling'],
    ai: ['Claude Code', 'ChatGPT images'],
    links: [{ label: { en: 'Play it on itch.io', es: 'Jugar en itch.io' }, href: 'https://lu1-t.itch.io/te-para-dos' }],
    cover: { src: teParaDosGame, alt: { en: 'A game of Té Para Dos on the green felt table', es: 'Una partida de Té Para Dos en la mesa de fieltro verde' } },
    featured: true,
  },
  {
    slug: 'study-lab',
    name: 'Laboratorio de Estudio',
    category: 'web',
    spans: [{ start: '2026-09-29', end: '2026-09-30', commits: 26 }],
    summary: {
      en: 'A study diary that lives inside a 3D vault: the water, fog and towers react to the hours you log.',
      es: 'Un diario de estudio dentro de una bóveda 3D: el agua, la niebla y las torres reaccionan a las horas que registras.',
    },
    status: { en: 'Live demo', es: 'Demo en vivo' },
    role: { en: 'Concept, 3D art direction, development', es: 'Concepto, dirección de arte 3D, desarrollo' },
    stack: ['Three.js', 'GLSL', 'Web Audio API', 'Vite', 'GitHub Actions'],
    ai: ['Claude Code', 'OpenCode', 'ComfyUI'],
    links: [
      { label: { en: 'Open the demo', es: 'Abrir la demo' }, href: 'https://leimagen.github.io/study-diary-logger/' },
      { label: code, href: repo('study-diary-logger') },
    ],
    cover: { src: studyLab, alt: { en: 'The vault scene with the reactor and the session form', es: 'La bóveda con el reactor y el formulario de sesión' } },
    featured: true,
  },
  {
    slug: 'diario-de-estudio',
    name: 'Diario de Estudio',
    category: 'web',
    spans: [{ start: '2026-09-30', end: '2026-10-01', commits: 3 }],
    summary: {
      en: 'A minimal study log with a streak counter, built to practice spec-driven development with Claude Code from start to finish.',
      es: 'Un registro de estudio mínimo con contador de racha, hecho para practicar desarrollo guiado por especificaciones con Claude Code de principio a fin.',
    },
    status: { en: 'Finished exercise', es: 'Ejercicio terminado' },
    role: { en: 'Workflow design, development', es: 'Diseño del flujo de trabajo, desarrollo' },
    stack: ['HTML', 'CSS', 'JavaScript', 'node:test'],
    ai: ['Claude Code', 'Chrome DevTools MCP', 'Context7 MCP'],
    links: [{ label: code, href: repo('diario-de-estudio') }],
    cover: { src: diario, alt: { en: 'Diario de Estudio on its graph paper background', es: 'Diario de Estudio sobre su fondo de papel cuadriculado' } },
  },
  {
    slug: 'abril',
    name: 'Abril',
    category: 'agents',
    spans: [
      { start: '2026-06-09', end: '2026-06-15', commits: 72, label: 'v1' },
      { start: '2026-06-15', end: '2026-06-22', commits: 36, label: 'v2' },
      { start: '2026-09-26', end: '2026-09-26', commits: 3, label: 'v3' },
    ],
    summary: {
      en: 'My personal assistant. It started as five agents on a Raspberry Pi and ended as one calm agent on my laptop.',
      es: 'Mi asistente personal. Empezó como cinco agentes en una Raspberry Pi y terminó como un solo agente tranquilo en mi portátil.',
    },
    status: { en: 'In daily use (v3)', es: 'En uso diario (v3)' },
    role: { en: 'Architecture, prompts, development, hosting', es: 'Arquitectura, prompts, desarrollo, hosting' },
    stack: ['Python', 'PostgreSQL + pgvector', 'Docker', 'Discord', 'Slack', 'Raspberry Pi', 'Google APIs'],
    ai: ['Claude API', 'Claude Agent SDK', 'MCP', 'Voyage embeddings', 'ElevenLabs', 'Codex'],
    links: [],
    featured: true,
  },
  {
    slug: 'fwc2026-live',
    name: 'FWC2026 Live',
    category: 'web',
    spans: [{ start: '2026-06-20', end: '2026-06-23', commits: 25 }],
    summary: {
      en: 'World Cup 2026 standings that recalculate with every live goal, including the best third-placed teams and the round of 32.',
      es: 'La clasificación del Mundial 2026 recalculada con cada gol en vivo, incluidos los mejores terceros y los dieciseisavos.',
    },
    status: { en: 'Live', es: 'En producción' },
    role: { en: 'Product, design, development, infrastructure', es: 'Producto, diseño, desarrollo, infraestructura' },
    stack: ['Astro 6', 'React 19', 'TypeScript', 'Python', 'Raspberry Pi', 'Cloudflare Tunnel', 'Web Push'],
    ai: [],
    links: [
      { label: { en: 'Visit the site', es: 'Ver el sitio' }, href: 'https://fwc2026live.com' },
      { label: code, href: repo('FWC2026') },
    ],
    cover: { src: fwc, alt: { en: 'FWC2026 Live showing Group E and the simulation panel', es: 'FWC2026 Live con el Grupo E y el panel de simulación' }, position: '50% 0%' },
    featured: true,
  },
  {
    slug: 'esco-playground',
    name: 'Esco Playground',
    category: 'agents',
    spans: [{ start: '2026-06-08', end: '2026-06-08', commits: 8 }],
    summary: {
      en: 'A desktop app where several local AI personas share a chat, mention each other and remember what you told them.',
      es: 'Una app de escritorio donde varias personas de IA locales comparten un chat, se mencionan entre sí y recuerdan lo que les dices.',
    },
    status: { en: 'Prototype (v0.1)', es: 'Prototipo (v0.1)' },
    role: { en: 'Concept, development', es: 'Concepto, desarrollo' },
    stack: ['Electron', 'React', 'TypeScript', 'FastAPI', 'SQLite FTS5'],
    ai: ['Ollama', 'Gemma 2', 'Phi-3', 'nomic-embed-text', 'Claude Code'],
    links: [],
  },
  {
    slug: 'xfutve',
    name: 'xfutve',
    category: 'automation',
    spans: [{ start: '2026-05-22', end: '2026-05-25', commits: 4 }],
    summary: {
      en: 'An editorial assistant for a Venezuelan football account: it reads the news, drafts a post and waits for my OK on Telegram.',
      es: 'Un asistente editorial para una cuenta de fútbol venezolano: lee las noticias, redacta un post y espera mi OK en Telegram.',
    },
    status: { en: 'Working, run locally', es: 'Funcionando en local' },
    role: { en: 'Concept, prompts, development', es: 'Concepto, prompts, desarrollo' },
    stack: ['Python', 'RSS', 'Telegram Bot API', 'X API', 'Windows Task Scheduler'],
    ai: ['Claude Haiku 4.5', 'Prompt caching', 'Claude Code'],
    links: [],
  },
  {
    slug: 'gmail-cleaner',
    name: 'Gmail Cleaner',
    category: 'automation',
    spans: [{ start: '2026-05-24', end: '2026-05-24', commits: 1 }],
    summary: {
      en: 'A local tool that sorts spam, phishing and newsletters in Gmail, unsubscribes or blocks them and checks for data breaches.',
      es: 'Una herramienta local que separa spam, phishing y newsletters en Gmail, se desuscribe o los bloquea y revisa filtraciones de datos.',
    },
    status: { en: 'Local prototype', es: 'Prototipo local' },
    role: { en: 'Concept, design, development', es: 'Concepto, diseño, desarrollo' },
    stack: ['Python', 'FastAPI', 'Gmail API', 'SQLite', 'Chrome extension'],
    ai: ['Claude Haiku 4.5', 'Claude Code'],
    links: [],
    cover: { src: gmailCleaner, alt: { en: 'Gmail Cleaner logo', es: 'Logo de Gmail Cleaner' }, fit: 'contain' },
  },
  {
    slug: 'annie',
    name: 'Annie',
    category: 'agents',
    spans: [{ start: '2026-05-15', end: '2026-05-22', commits: 40 }],
    summary: {
      en: 'A job-hunting agent with her own inbox. Every morning she reads job boards, scores offers and sends a tailored CV for each one.',
      es: 'Una agente de búsqueda de empleo con su propio correo. Cada mañana lee portales, puntúa ofertas y envía un CV adaptado a cada una.',
    },
    status: { en: 'Working prototype, paused', es: 'Prototipo funcional, en pausa' },
    role: { en: 'Concept, prompts, development', es: 'Concepto, prompts, desarrollo' },
    stack: ['Python', 'GitHub Actions', 'Gmail API', 'Google Sheets', 'ReportLab'],
    ai: ['Claude Haiku 4.5', 'Prompt caching', 'Claude Code'],
    links: [],
    featured: true,
  },
  {
    slug: 'whos-the-jefe',
    name: "Who's The Jefe",
    category: 'games',
    spans: [{ start: '2026-05-14', end: '2026-05-15', commits: 4 }],
    summary: {
      en: 'A pixel-art office sim where you run a design agency and the employees, written by Claude, chat with each other and email you.',
      es: 'Un simulador de oficina en pixel art donde diriges una agencia y los empleados, escritos por Claude, conversan entre ellos y te escriben.',
    },
    status: { en: 'Prototype (v0.1)', es: 'Prototipo (v0.1)' },
    role: { en: 'Game design, pixel art direction, development', es: 'Diseño de juego, dirección de pixel art, desarrollo' },
    stack: ['Phaser 4', 'JavaScript', 'Python'],
    ai: ['Claude Haiku 4.5'],
    links: [],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;

export const firstCommit = (p: Project) => p.spans[0].start;
export const lastCommit = (p: Project) => p.spans[p.spans.length - 1].end;
export const totalCommits = (p: Project) => p.spans.reduce((n, s) => n + s.commits, 0);

/** most recent activity first */
export const byRecent = [...projects].sort((a, b) => lastCommit(b).localeCompare(lastCommit(a)));

/** "Oct 2026" or "Jun - Sep 2026" */
export function formatSpan(p: Project, lang: Lang) {
  const m = new Intl.DateTimeFormat(lang, { month: 'short', timeZone: 'UTC' });
  const y = (d: string) => d.slice(0, 4);
  const month = (d: string) => m.format(new Date(`${d}T00:00:00Z`)).replace('.', '');
  const a = firstCommit(p);
  const b = lastCommit(p);
  if (a.slice(0, 7) === b.slice(0, 7)) return `${month(a)} ${y(a)}`;
  return y(a) === y(b) ? `${month(a)} - ${month(b)} ${y(b)}` : `${month(a)} ${y(a)} - ${month(b)} ${y(b)}`;
}

/** "20 Oct 2026" */
export function formatDay(d: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${d}T00:00:00Z`)).replace('.', '');
}

/** calendar days between first and last commit, both included */
export const activeDays = (s: Span) => Math.round((Date.parse(s.end) - Date.parse(s.start)) / 864e5) + 1;
