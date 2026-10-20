import type { Lang } from '../i18n/ui';
import { email, socials } from '../data/profile';

/** Same Google Analytics 4 property as luitiescobar.com, so both sites report together. Loaded only after consent. */
export const GA_ID = 'G-J1EW2HGLJB';

export const SITE = 'https://dev.luitiescobar.com';
/** the design portfolio holds the canonical Person entity; this site points to it */
export const MAIN_SITE = 'https://luitiescobar.com';

const jobTitle: Record<Lang, string> = { en: 'AI Developer', es: 'Desarrollador de IA' };
const bio: Record<Lang, string> = {
  en: 'AI developer and multidisciplinary designer. Builds AI agents, web apps and games with Claude Code, after 15 years designing for brands such as Samsung, Marvel, Xbox, Disney and PlayStation.',
  es: 'Desarrollador de IA y diseñador multidisciplinario. Crea agentes de IA, apps web y juegos con Claude Code, después de 15 años diseñando para marcas como Samsung, Marvel, Xbox, Disney y PlayStation.',
};

/** schema.org Person + WebSite, shared by every page. */
export function siteGraph(lang: Lang) {
  const person = {
    '@type': 'Person',
    '@id': `${MAIN_SITE}/#person`,
    name: 'Luiti Escobar',
    alternateName: 'Luis Escobar',
    jobTitle: jobTitle[lang],
    description: bio[lang],
    url: SITE,
    image: `${SITE}/og-default.jpg`,
    email,
    sameAs: [MAIN_SITE, 'https://github.com/leimagen', ...socials.map((s) => s.href)],
    knowsAbout: [
      'AI Agents', 'Agentic Coding', 'Claude Code', 'Claude Agent SDK', 'Model Context Protocol', 'Prompt Engineering',
      'Python', 'TypeScript', 'Astro', 'React', 'Three.js', 'Godot', 'Cloudflare Workers', 'Spec-Driven Development',
      'UI Design', 'Motion Design', 'ActionScript 3.0',
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
  };
  const website = {
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'Luiti Escobar, AI Developer',
    inLanguage: ['en', 'es'], publisher: { '@id': `${MAIN_SITE}/#person` },
  };
  return [person, website];
}
