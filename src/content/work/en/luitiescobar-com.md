## From one page to a real site

My design portfolio used to be a single static HTML page. In October 2026 I rebuilt it as a bilingual site with four disciplines, case studies and a CMS I can edit from my phone. It took five days and 20 commits, and it has been live since October 17.

## Stack

Astro 7 prerenders every page from Sanity at build time, and Cloudflare Workers serves them. The Sanity Studio lives on its own subdomain. The only server code is the like button: one like per visitor per project, stored in Cloudflare D1 as a salted hash instead of anything personal, plus a Telegram message to me when someone new likes a project.

I designed the pages in Figma first, through the Figma MCP, and reviewed them before any code was written.

## Moving 15 years of work

A script imported 35 old projects from Behance and the previous site into Sanity as drafts, with copy in both languages, so I could check each one before publishing. The AI Media section has three case studies of my own work with Kling AI, made from my illustrations and Blender models.

## Details that took time

Analytics only load after you accept cookies, and rejecting takes the same single click as accepting. Share previews, structured data, a sitemap with both languages and a favicon drawn from the logo font. Videos stay out of the CMS to avoid bandwidth costs. One deploy pushed old placeholder pages to production because the build folder wasn't being cleaned, so the rule now is to delete it before every build.

## How the agent remembers

The repo has a MEMORY.md that Claude Code reads at the start of each session and updates at every milestone: what's live, where things are, what I decided and why. This site was built the same way, starting from that file.
