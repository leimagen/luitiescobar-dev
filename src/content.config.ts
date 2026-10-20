import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Case study bodies, one Markdown file per project and language: src/content/work/{en,es}/{slug}.md.
 * Entry ids look like "en/abril". Everything else about a project (dates, stack, links) is in src/data/projects.ts.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
});

export const collections = { work };
