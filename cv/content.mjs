// CV content (EN/ES) for the AI Developer profile. Projects are the experience: their dates are the
// first and last commit in each repo (see src/data/projects.ts). No em dashes anywhere (house style).
// Build: node cv/build.mjs  →  cv/out/*.pdf (with phone, git-ignored) + public/cv/*.pdf (web, no phone)

export const contact = {
  name: 'Luiti Escobar',
  // the phone only goes in the private PDFs (cv/out), never in the ones published on the site
  phone: '',
  email: 'info@luitiescobar.com',
  web: 'dev.luitiescobar.com',
  design: 'luitiescobar.com',
  github: 'github.com/leimagen',
  linkedin: 'linkedin.com/in/lesco',
};

export const cv = {
  en: {
    lang: 'en',
    title: 'AI Developer',
    areas: ['AI agents', 'Web apps', 'Games', 'Automation'],
    location: 'Valencia, Spain',
    availability: 'Open to AI development roles, freelance and remote work.',
    labels: {
      profile: 'Profile', experience: 'Projects', more: 'More projects', earlier: 'Earlier development',
      skills: 'Skills', training: 'Training', languages: 'Languages', links: 'Portfolio', present: 'Present',
    },
    summary: [
      'AI developer with a 15-year background in digital design and motion. Since May 2026 I have shipped 11 projects with Claude Code as my development team: personal AI agents, live web apps, a 3D web experience and a desktop game.',
      'I set the product, the architecture and the rules the agents work by (project memory, approved specs, tests they can run, a security pass before publishing) and I review every change before it ships. My first code was ActionScript 3.0 at ModOp, followed by UI design and frontend development at MVP Lean.',
    ],
    projects: [
      {
        name: 'Abril', role: 'Personal AI assistant', stack: 'Python, Claude Agent SDK, MCP, PostgreSQL + pgvector, Docker', start: '2026-06-09', end: '2026-09-26',
        bullets: [
          'Built a personal assistant I use every day on Discord: calendar, mail, tasks, expenses, reminders and long-term memory with pgvector.',
          'v1 was an orchestrator with four Claude sub-agents on a Raspberry Pi (72 commits in 7 days). After a code audit, v2 merged them into one agent with an encrypted local vault, a sandboxed MCP client, prompt caching and 80 regression tests.',
          'v3 runs on the Claude Agent SDK with a Claude subscription, its tools served as an in-process MCP server and tool loops capped at 8 steps.',
        ],
      },
      {
        name: 'Té Para Dos', role: 'Desktop card game', stack: 'Godot 4.7, GDScript, GLSL, Python tooling', start: '2026-09-26', end: '2026-10-02',
        bullets: [
          'Designed and shipped a 3D family card game with a rule-based opponent, a 9-step tutorial and three languages. v1.0 is on itch.io (29 commits in 6 days).',
          'Kept the rules engine apart from the graphics so a headless script could play more than 300 games and catch rule bugs.',
          'Replaced card art whose licence blocked sales with AI-generated faces and code-drawn cards, so every asset can be sold.',
        ],
      },
      {
        name: 'FWC2026 Live', role: 'Live web app', stack: 'Astro, React, TypeScript, Python, Cloudflare, Web Push', start: '2026-06-20', end: '2026-06-23',
        bullets: [
          'Built a bilingual World Cup 2026 app that recalculated the 12 groups, the best third-placed teams and the round of 32 on every live goal, following FIFA tiebreak rules.',
          'Ran a Python feed on a Raspberry Pi behind a Cloudflare Tunnel, with API keys that never left the device, plus push notifications and an installable PWA. 25 commits in 4 days, used throughout the tournament.',
        ],
      },
      {
        name: 'Laboratorio de Estudio', role: '3D web app', stack: 'Three.js, GLSL, Web Audio API, Vite, GitHub Actions', start: '2026-09-29', end: '2026-09-30',
        bullets: [
          'Gamified study diary inside a procedural 3D vault: GPU wave simulation, raymarched volumetric fog and spatial audio synthesized live.',
          '117 logic checks run in GitHub Actions before each deploy to GitHub Pages.',
        ],
      },
      {
        name: 'Annie', role: 'Job-search agent (experiment)', stack: 'Python, Claude API, GitHub Actions, Gmail API, Google Sheets', start: '2026-05-15', end: '2026-05-22',
        bullets: [
          'Built to experiment with agents and automated web interaction: an agent with her own inbox that read more than 11 job sources every morning, scored offers with Claude Haiku in structured JSON and sent a tailored CV and cover letter for each one.',
          'Answered replies every 15 minutes, logged everything in Google Sheets and emailed a suggested code change when asked for something she couldn\'t do. 40 commits in a week.',
        ],
      },
      {
        name: 'luitiescobar.com', role: 'Portfolio site and CMS', stack: 'Astro, Sanity, Cloudflare Workers, D1, Figma', start: '2026-10-15', end: '2026-10-19',
        bullets: [
          'Rebuilt my design portfolio as a bilingual Astro site with a Sanity CMS, privacy-preserving likes on Cloudflare D1 and analytics that load only after consent. 35 older projects imported by script. Live since 17 October 2026.',
        ],
      },
    ],
    more: [
      ['Diario de Estudio', 'Spec-driven development workflow for Claude Code: constitution, 9 slash commands, MCP checks', '2026'],
      ['Esco Playground', 'Desktop app with local AI personas on Ollama, shared chat and per-agent memory', '2026'],
      ['xfutve', 'Editorial assistant that drafts sports posts with Claude and waits for approval on Telegram', '2026'],
      ['Gmail Cleaner', 'Local inbox cleanup and data-breach check with Gmail API and Claude', '2026'],
      ["Who's The Jefe", 'Agency simulation game where Claude writes the employees\' emails and conversations', '2026'],
    ],
    earlier: [
      {
        company: 'MVP Lean', role: 'UI Designer & Frontend Developer', place: 'Panama · Remote', start: '2017-10', end: '2019-04',
        bullets: [
          'Built features for a data warehouse application for an e-commerce venture capital firm.',
          'Built an online video course platform from scratch, and designed the company identity and the Fromzero Academy website.',
        ],
      },
      {
        company: 'ModOp', role: 'Flash Developer & Flash Motion Designer', place: 'Panama · On-site', start: '2011-11', end: '2014-10',
        bullets: [
          'Interactive web experiences and mini-games in ActionScript 3.0 for Marvel, Xbox, Disney, Hallmark and PlayStation.',
        ],
      },
    ],
    skills: [
      ['Agents', 'Claude API, Claude Agent SDK, Claude Code, MCP servers and clients, tool use, prompt caching, pgvector memory, Ollama'],
      ['Languages', 'Python, TypeScript, JavaScript, GDScript, GLSL, SQL, ActionScript 3.0'],
      ['Frameworks', 'Astro, React, Three.js, Phaser, Godot, FastAPI, Electron'],
      ['Infrastructure', 'Cloudflare (Workers, Pages, D1, Tunnel), GitHub Actions, Docker, PostgreSQL, SQLite, Raspberry Pi'],
      ['Workflow', 'Agent instructions and project memory, spec-driven development, headless tests and simulations, security reviews'],
      ['Design', 'Figma, Photoshop, Illustrator, After Effects, Blender, UI and UX, motion design, art direction'],
    ],
    training: [
      ['Desarrollo con IA: El nuevo programador', 'BIG school · Brais Moure (3-day course)'],
      ['EF SET English Certificate', '74/100 · C2 Proficient (2021)'],
      ['ActionScript 3.0 training', 'MVC and OOP principles'],
    ],
    languages: [['Spanish', 'Native'], ['English', 'C2 Proficient']],
    linksNote: 'Case studies with stack, dates and lessons for every project.',
  },
  es: {
    lang: 'es',
    title: 'Desarrollador de IA',
    areas: ['Agentes de IA', 'Apps web', 'Juegos', 'Automatización'],
    location: 'Valencia, España',
    availability: 'Disponible para puestos de desarrollo con IA, freelance y remoto.',
    labels: {
      profile: 'Perfil', experience: 'Proyectos', more: 'Otros proyectos', earlier: 'Desarrollo previo',
      skills: 'Habilidades', training: 'Formación', languages: 'Idiomas', links: 'Portafolio', present: 'Actualidad',
    },
    summary: [
      'Desarrollador de IA con 15 años de experiencia previa en diseño digital y motion. Desde mayo de 2026 he publicado 11 proyectos con Claude Code como equipo de desarrollo: agentes de IA personales, apps web en vivo, una experiencia web en 3D y un juego de escritorio.',
      'Defino el producto, la arquitectura y las reglas con las que trabajan los agentes (memoria del proyecto, especificaciones aprobadas, tests que pueden ejecutar, revisión de seguridad antes de publicar) y reviso cada cambio antes de que salga. Mi primer código fue ActionScript 3.0 en ModOp, y después trabajé en diseño UI y desarrollo frontend en MVP Lean.',
    ],
    projects: [
      {
        name: 'Abril', role: 'Asistente personal de IA', stack: 'Python, Claude Agent SDK, MCP, PostgreSQL + pgvector, Docker', start: '2026-06-09', end: '2026-09-26',
        bullets: [
          'Construí un asistente personal que uso cada día en Discord: agenda, correo, tareas, gastos, recordatorios y memoria a largo plazo con pgvector.',
          'La v1 era una orquestadora con cuatro subagentes de Claude en una Raspberry Pi (72 commits en 7 días). Tras una auditoría del código, la v2 los unió en un solo agente con baúl cifrado local, cliente MCP aislado, prompt caching y 80 tests de regresión.',
          'La v3 corre sobre el Claude Agent SDK con una suscripción de Claude, con sus herramientas servidas como servidor MCP en el mismo proceso y bucles limitados a 8 pasos.',
        ],
      },
      {
        name: 'Té Para Dos', role: 'Juego de cartas de escritorio', stack: 'Godot 4.7, GDScript, GLSL, herramientas en Python', start: '2026-09-26', end: '2026-10-02',
        bullets: [
          'Diseñé y publiqué un juego de cartas familiar en 3D con rival por reglas, tutorial de 9 pasos y tres idiomas. La v1.0 está en itch.io (29 commits en 6 días).',
          'Separé el motor de reglas de los gráficos para que un script sin interfaz jugara más de 300 partidas y detectara errores de reglas.',
          'Sustituí un arte de cartas cuya licencia impedía vender el juego por figuras generadas con IA y cartas dibujadas por código, así todos los recursos se pueden vender.',
        ],
      },
      {
        name: 'FWC2026 Live', role: 'App web en vivo', stack: 'Astro, React, TypeScript, Python, Cloudflare, Web Push', start: '2026-06-20', end: '2026-06-23',
        bullets: [
          'Creé una app bilingüe del Mundial 2026 que recalculaba los 12 grupos, los mejores terceros y los dieciseisavos con cada gol en vivo, siguiendo los desempates de la FIFA.',
          'Feed en Python en una Raspberry Pi tras un Cloudflare Tunnel (las claves nunca salieron del dispositivo), push y PWA instalable. 25 commits en 4 días.',
        ],
      },
      {
        name: 'Laboratorio de Estudio', role: 'App web 3D', stack: 'Three.js, GLSL, Web Audio API, Vite, GitHub Actions', start: '2026-09-29', end: '2026-09-30',
        bullets: [
          'Diario de estudio gamificado dentro de una bóveda 3D procedural: simulación de ondas en GPU, niebla volumétrica con raymarching y audio espacial sintetizado en vivo.',
          '117 comprobaciones de lógica en GitHub Actions antes de cada despliegue a GitHub Pages.',
        ],
      },
      {
        name: 'Annie', role: 'Agente de búsqueda de empleo (experimento)', stack: 'Python, Claude API, GitHub Actions, Gmail API, Google Sheets', start: '2026-05-15', end: '2026-05-22',
        bullets: [
          'Experimento con agentes e interacción web automatizada: leía más de 11 fuentes de empleo cada mañana, puntuaba ofertas con Claude Haiku en JSON y enviaba un CV y una carta a medida.',
          'Respondía correos cada 15 minutos, lo registraba todo en Google Sheets y proponía cambios de código cuando le pedían algo que no sabía hacer. 40 commits en una semana.',
        ],
      },
      {
        name: 'luitiescobar.com', role: 'Portafolio y CMS', stack: 'Astro, Sanity, Cloudflare Workers, D1, Figma', start: '2026-10-15', end: '2026-10-19',
        bullets: [
          'Reconstruí mi portafolio de diseño como sitio Astro bilingüe con CMS Sanity, likes que respetan la privacidad en Cloudflare D1 y analítica que solo carga con consentimiento. 35 proyectos antiguos importados por script. En producción desde el 17 de octubre de 2026.',
        ],
      },
    ],
    more: [
      ['Diario de Estudio', 'Flujo de desarrollo guiado por especificaciones para Claude Code: constitución, 9 comandos, comprobaciones con MCP', '2026'],
      ['Esco Playground', 'App de escritorio con personas de IA locales en Ollama, chat compartido y memoria por agente', '2026'],
      ['xfutve', 'Asistente editorial que redacta posts deportivos con Claude y espera aprobación en Telegram', '2026'],
      ['Gmail Cleaner', 'Limpieza de bandeja local y revisión de filtraciones con Gmail API y Claude', '2026'],
      ["Who's The Jefe", 'Juego de simulación de agencia donde Claude escribe los correos y conversaciones de los empleados', '2026'],
    ],
    earlier: [
      {
        company: 'MVP Lean', role: 'Diseñador UI y Desarrollador Frontend', place: 'Panamá · Remoto', start: '2017-10', end: '2019-04',
        bullets: [
          'Desarrollé funcionalidades de una aplicación de data warehouse para un fondo de capital riesgo de e-commerce.',
          'Construí desde cero una plataforma de cursos en vídeo, y diseñé la identidad de la empresa y el sitio web de Fromzero Academy.',
        ],
      },
      {
        company: 'ModOp', role: 'Flash Developer y Flash Motion Designer', place: 'Panamá · Presencial', start: '2011-11', end: '2014-10',
        bullets: [
          'Experiencias web interactivas y minijuegos en ActionScript 3.0 para Marvel, Xbox, Disney, Hallmark y PlayStation.',
        ],
      },
    ],
    skills: [
      ['Agentes', 'Claude API, Claude Agent SDK, Claude Code, servidores y clientes MCP, tool use, prompt caching, memoria con pgvector, Ollama'],
      ['Lenguajes', 'Python, TypeScript, JavaScript, GDScript, GLSL, SQL, ActionScript 3.0'],
      ['Frameworks', 'Astro, React, Three.js, Phaser, Godot, FastAPI, Electron'],
      ['Infraestructura', 'Cloudflare (Workers, Pages, D1, Tunnel), GitHub Actions, Docker, PostgreSQL, SQLite, Raspberry Pi'],
      ['Método', 'Instrucciones y memoria para agentes, desarrollo guiado por especificaciones, tests y simulaciones sin interfaz, revisiones de seguridad'],
      ['Diseño', 'Figma, Photoshop, Illustrator, After Effects, Blender, UI y UX, motion design, dirección de arte'],
    ],
    training: [
      ['Desarrollo con IA: El nuevo programador', 'BIG school · Brais Moure (curso de 3 días)'],
      ['EF SET English Certificate', '74/100 · C2 Proficient (2021)'],
      ['Formación en ActionScript 3.0', 'Principios de MVC y POO'],
    ],
    languages: [['Castellano', 'Nativo'], ['Inglés', 'C2 Proficient']],
    linksNote: 'Case studies con stack, fechas y aprendizajes de cada proyecto.',
  },
};
