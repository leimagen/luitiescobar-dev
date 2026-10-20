import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export const email = 'info@luitiescobar.com';
export const location: L = { en: 'Valencia, Spain', es: 'Valencia, España' };

export const socials = [
  { label: 'GitHub', href: 'https://github.com/leimagen' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lesco' },
];

export interface Job {
  /** YYYY-MM */
  start: string;
  end: string;
  company: string;
  role: L;
  place: L;
  points: L[];
}

/** Development jobs before AI (from LinkedIn). The full design career lives on luitiescobar.com. */
export const earlierJobs: Job[] = [
  {
    start: '2017-10', end: '2019-04', company: 'MVP Lean',
    role: { en: 'UI Designer & Frontend Developer', es: 'Diseñador UI y Desarrollador Frontend' },
    place: { en: 'Panama · Remote', es: 'Panamá · Remoto' },
    points: [
      { en: 'Built features for a data warehouse application for an e-commerce venture capital firm.', es: 'Desarrollé funcionalidades de una aplicación de data warehouse para un fondo de capital riesgo de e-commerce.' },
      { en: 'Built an online video course platform from scratch, and edited and post-produced the lessons.', es: 'Construí desde cero una plataforma de cursos en vídeo, y edité y postproduje las lecciones.' },
      { en: 'Designed the company identity and developed the Fromzero Academy website.', es: 'Diseñé la identidad de la empresa y desarrollé el sitio web de Fromzero Academy.' },
    ],
  },
  {
    start: '2011-11', end: '2014-10', company: 'ModOp',
    role: { en: 'Flash Developer & Flash Motion Designer', es: 'Flash Developer y Flash Motion Designer' },
    place: { en: 'Panama · On-site', es: 'Panamá · Presencial' },
    points: [
      { en: 'Flash animation and interactive development for entertainment brands including Marvel, Xbox, Disney, Hallmark and PlayStation.', es: 'Animación Flash y desarrollo interactivo para marcas de entretenimiento como Marvel, Xbox, Disney, Hallmark y PlayStation.' },
      { en: 'Built interactive web experiences and mini-games in ActionScript 3.0.', es: 'Construí experiencias web interactivas y minijuegos en ActionScript 3.0.' },
    ],
  },
];

export const training: { title: string; issuer?: string; detail?: L }[] = [
  { title: 'Máster en Desarrollo con IA', issuer: 'BIG school', detail: { en: 'AI-assisted software development', es: 'Desarrollo de software asistido por IA' } },
  { title: 'EF SET English Certificate', issuer: 'EF', detail: { en: '74/100, C2 Proficient (2021)', es: '74/100, C2 Proficient (2021)' } },
  { title: 'ActionScript 3.0', detail: { en: 'Online training: MVC and object-oriented programming principles', es: 'Formación online: principios de MVC y programación orientada a objetos' } },
];

export const languages: { name: L; level: L }[] = [
  { name: { en: 'Spanish', es: 'Castellano' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'C2 Proficient', es: 'C2 Proficient' } },
];

export const skills: { group: L; items: string[] }[] = [
  { group: { en: 'Agents and LLMs', es: 'Agentes y LLMs' }, items: ['Claude API', 'Claude Agent SDK', 'Claude Code', 'MCP', 'Tool use', 'Prompt caching', 'pgvector memory', 'Ollama'] },
  { group: { en: 'Languages', es: 'Lenguajes' }, items: ['Python', 'TypeScript', 'JavaScript', 'GDScript', 'GLSL', 'SQL', 'ActionScript 3.0'] },
  { group: { en: 'Frameworks', es: 'Frameworks' }, items: ['Astro', 'React', 'Three.js', 'Phaser', 'Godot', 'FastAPI', 'Electron'] },
  { group: { en: 'Infrastructure', es: 'Infraestructura' }, items: ['Cloudflare Workers, Pages, D1, Tunnel', 'GitHub Actions', 'Docker', 'PostgreSQL', 'SQLite', 'Raspberry Pi'] },
  { group: { en: 'Design', es: 'Diseño' }, items: ['Figma', 'UI and UX', 'Motion design', 'Blender', 'Art direction'] },
];

/** How I work with coding agents. Every point is backed by a project on this site. */
export const workflow: { title: L; text: L }[] = [
  {
    title: { en: 'Memory before code', es: 'Memoria antes que código' },
    text: {
      en: 'Every repo gets a CLAUDE.md or AGENTS.md with the rules, and a MEMORY.md the agent updates at each milestone. A new session reads it and picks up where the last one stopped.',
      es: 'Cada repo tiene un CLAUDE.md o AGENTS.md con las reglas y un MEMORY.md que el agente actualiza en cada hito. Una sesión nueva lo lee y retoma donde quedó la anterior.',
    },
  },
  {
    title: { en: 'Specs I approve', es: 'Especificaciones que apruebo' },
    text: {
      en: 'For anything bigger than a fix, the agent writes a spec, a plan and a task list, and waits for my OK at each step. I review direction early, when changing it is cheap.',
      es: 'Para todo lo que sea más que un arreglo, el agente escribe una especificación, un plan y una lista de tareas, y espera mi OK en cada paso. Reviso el rumbo pronto, cuando cambiarlo sale barato.',
    },
  },
  {
    title: { en: 'Logic the agent can test', es: 'Lógica que el agente puede probar' },
    text: {
      en: 'Rules and data stay apart from the interface, so they run in plain Node or headless. That gave Té Para Dos 300 simulated games and Laboratorio de Estudio 117 checks before each deploy.',
      es: 'Las reglas y los datos van separados de la interfaz, para que corran en Node o sin pantalla. Así Té Para Dos tuvo 300 partidas simuladas y Laboratorio de Estudio 117 comprobaciones antes de cada despliegue.',
    },
  },
  {
    title: { en: 'Eyes for the agent', es: 'Ojos para el agente' },
    text: {
      en: 'MCP servers let the agent look at its own work: Chrome DevTools for the real page, Figma for the designs, Context7 for current docs. Scripted clicks and screenshots cover what a test can\'t.',
      es: 'Los servidores MCP dejan que el agente vea su propio trabajo: Chrome DevTools para la página real, Figma para los diseños, Context7 para la documentación actual. Los clics automatizados y las capturas cubren lo que un test no ve.',
    },
  },
  {
    title: { en: 'A security pass before publishing', es: 'Revisión de seguridad antes de publicar' },
    text: {
      en: 'Secrets stay out of prompts, logs and git history, and tools run with the least access they need. Abril only got hardened after a full audit of version 1.',
      es: 'Los secretos se quedan fuera de los prompts, los logs y el historial de git, y las herramientas corren con el mínimo acceso que necesitan. Abril se reforzó después de una auditoría completa de la versión 1.',
    },
  },
];

/** "Oct 2017 - Apr 2019" */
export function formatJob(j: Job, lang: Lang) {
  const fmt = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const d = (ym: string) => fmt.format(new Date(`${ym}-01T00:00:00Z`)).replace('.', '');
  return `${d(j.start)} - ${d(j.end)}`;
}
