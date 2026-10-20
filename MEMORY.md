# Project memory: dev.luitiescobar.com

Living log of what has been built, where everything lives, what was decided and what's pending.
**Update this file at every milestone** (new page or feature, deploy, content change, user decision),
bump "Last update" and the Milestones list, and commit it with the related work.
Last update: 2026-10-20 (session 2: repo made public, private notes split out to MEMORY.private.md)

---

## 1. What this is

Bilingual (EN `/`, ES `/es/`) portfolio for **Luiti Escobar as an AI Developer**. It lives next to the
design portfolio (luitiescobar.com, repo `luitiescobar-portfolio-2026`, sibling local folder
`../luitiescobar-portfolio-2026`), which stays untouched. This site is a **dark version
of luitiescobar.com without the graphic-design visuals** (no colored blobs, glass lenses, dot grids or patterns).

- Live target: https://dev.luitiescobar.com (Worker `luitiescobar-dev`, custom domain) + workers.dev preview.
- Repo: https://github.com/leimagen/luitiescobar-dev (public since 2026-10-20, branch `main`).
- Private notes: `MEMORY.private.md` (git-ignored, local only): local paths, privacy rules for the case studies,
  security notes. **Read it too at the start of every session if it exists.** Never move its content here.
- Cloudflare: same account as luitiescobar.com (see that repo's MEMORY.md). wrangler is logged in on this machine.
  The Cloudflare MCP available in Claude Code is the deprecated "Workers Bindings" one: it can list Workers but not
  manage DNS/domains, so deploys and the custom domain go through wrangler (`routes` in wrangler.jsonc).
- Figma: see section 8.

## 2. Stack

| Piece | Choice |
|---|---|
| Site | Astro 7, fully static (`output: 'static'`), no adapter |
| Hosting | Cloudflare Workers static assets (`assets.directory: ./dist`, `not_found_handling: 404-page`) |
| Content | Case study bodies in Markdown (content collection `work`), project metadata in `src/data/projects.ts` |
| Fonts | Outfit 200-500 + JetBrains Mono via `@fontsource` (same as luitiescobar.com) |
| Images | Astro `<Image>` (sharp at build) from `src/assets/` |
| Analytics | GA4 **G-J1EW2HGLJB** (same property as luitiescobar.com), loaded only after cookie consent |
| Worker | `worker/index.ts` runs only for `/cv/*` (`assets.run_worker_first`): serves the PDF + CV download notice |
| DB | Cloudflare D1 `luitiescobar-dev-events` (id 2ea39142-f78b-430c-8e15-8ca06fd515c5, WEUR), table `cv_downloads` |

## 3. Where things are

```
src/
  pages/            index, about, cookies, work/[slug], 404, sitemap.xml.ts; es/ mirrors (not 404/sitemap)
  views/            Home, Project, About, Cookies, NotFound (page bodies shared by EN/ES routes)
  components/       Nav, Footer, Hero, ProjectIndex (filterable list), Timeline (commit history chart),
                    Cover (screenshot or typographic tile), EarlierWork (ModOp, MVP Lean), ContactStrip, CookieConsent
  content/work/     {en,es}/{slug}.md  case study bodies (## headings + paragraphs)
  data/projects.ts  every project: dates (first/last commit), commits, stack, AI tools, status, role, links, cover
  data/profile.ts   email, socials, earlier jobs, training, languages, skills, "how I work" workflow
  i18n/             ui.ts (all UI strings EN/ES), utils.ts (t(), localizePath, switchLangPath)
  lib/seo.ts        GA id, SITE, MAIN_SITE, schema.org Person + WebSite
  assets/work/      project covers (screenshots of live sites, repo assets)
  styles/global.css tokens (mirror of the Figma "Tokens" collection)
scripts/
  favicon.mjs       "le+" favicon set from the real Outfit outlines (npm run favicon)
  og.mjs            default share images og-default(-es).jpg (headless Edge)
  lint-copy.mjs     house-style check: fails on em dashes, warns on AI tells (npm run lint:copy)
cv/                 CV generator (see section 9)
```

## 4. Content: projects and case studies

All GitHub repos with activity in the last year (May-Oct 2026) became case studies, 11 in total.
Dates and commit counts come from `git log` (first and last author date). Research done by 3 sub-agents on 2026-10-20.

| slug | repo(s) | dates | commits | public? |
|---|---|---|---|---|
| luitiescobar-com | luitiescobar-portfolio-2026 | 2026-10-15 to 10-19 | 20 | public |
| te-para-dos | TeParaDos-Steam (Unity prototype in local `TeParaDos`, not a repo) | 09-26 to 10-02 | 29 | private, itch.io live |
| study-lab | study-diary-logger | 09-29 to 09-30 | 26 | public + GitHub Pages |
| diario-de-estudio | diario-de-estudio | 09-30 to 10-01 | 3 | public |
| abril | abril (v1), abril-v2, abril-v3 | 06-09/06-15, 06-15/06-22, 09-26 | 72+36+3 | private |
| fwc2026-live | FWC2026 (local `WC2026-Live`) | 06-20 to 06-23 | 25 | public, fwc2026live.com |
| esco-playground | esco-playground (local `abril-old`) | 06-08 | 8 | public |
| xfutve | xfutve (local `x-futve`) | 05-22 to 05-25 | 4 | private |
| gmail-cleaner | gmail-cleaner (local `Gmail Cleaner`) | 05-24 | 1 | public |
| annie | annie-agent | 05-15 to 05-22 | 40 | private |
| whos-the-jefe | whos-the-jefe | 05-14 to 05-15 | 4 | public (design doc kept out of git) |

Skipped: `luitiescobar` (old static landing, no dev story; mentioned inside the luitiescobar-com case study).

**Adding a project:** add an entry to `src/data/projects.ts`, write `src/content/work/en/<slug>.md` and
`src/content/work/es/<slug>.md`, optionally a cover in `src/assets/work/`, run `npm run lint:copy`, build, deploy.
The timeline, index, sitemap, about page and prev/next links update by themselves.

### Privacy rules for the case studies
- Several case studies cover private repos. The detailed rules for what must never be published are in
  MEMORY.private.md. Only link repos that are public. Private ones show
  "The repository is private. Ask me for a walkthrough."

## 5. Design

- Tokens: bg `#141414` (= luitiescobar.com ink), surface `#1c1c1b`, raised `#242423`, ink `#fafaf7` (= its paper),
  ink-2 `#b4b4ad`, muted `#7c7c76`, line `#2a2a28`, line-2 `#3a3a37`. No accent color on purpose (white is the accent).
- Same skeleton as luitiescobar.com: 142px header that compacts to 76px on scroll, bleeding B/W photo with the
  rounded bottom-right corner, huge thin uppercase title on the right (font size fits the longest line).
- Logo `luiti escobar+` (the "+" marks the dev site). Favicon "le+": l in Outfit 500, e and + in Outfit 300,
  light on a `#141414` rounded tile (luitiescobar.com uses "le").
- Signature element: **Commit history** chart (one bar per stretch of commits per project). It is data, not decoration.
- Projects are an editorial list (date and commits / name, summary, tags / cover), filterable by type
  (AI agents, Automation, Web apps, Games). Hero chips jump to the list with the filter applied.
- Projects without shareable visuals get a typographic cover tile in the list and no cover on their page.

## 6. Copy rules (user's request, keep enforcing)

- **No em dashes ("—") anywhere visible.** Use commas, colons, periods or parentheses. Ranges use " - ".
- Human structure, first person, plain verbs. Avoid AI tells: "it's not X, it's Y", "no X, no Y, no Z" lists,
  self-answered questions, stock openers, words like seamless/robust/leverage/unlock. `npm run lint:copy` checks this.
- Every claim must come from the repos (commit messages, code, READMEs). No invented metrics.
- Spanish copy is written as natural Spanish (Spain-friendly, "tú"), not a literal translation.
- Skills used for this: `copywriting` and `copy-editing` (coreyhaines31/marketingskills, installed globally on
  2026-10-20 with `npx skills add ... -g -y`), `frontend-design`, `seo-audit`.

## 7. SEO and analytics

- Per page: title (" | Luiti Escobar"), description, canonical, hreflang en/es/x-default, Open Graph + Twitter
  (default `public/og-default(-es).jpg`, project pages use their cover cropped to 1200×630), keywords.
- JSON-LD: Person (shares `@id` https://luitiescobar.com/#person with the design site) + WebSite on every page,
  ItemList on Home, CreativeWork + BreadcrumbList on projects, ProfilePage on About.
- `/sitemap.xml` (EN + ES with alternates), `public/robots.txt`, `site.webmanifest`, 404 page (noindex).
- GA4 `G-J1EW2HGLJB` shared with luitiescobar.com. GA cookies live on `.luitiescobar.com`, so visits across both
  sites are one user. Consent is per site (localStorage `consent:analytics`). Cookie policy at /cookies, /es/cookies.
- GA overview stays unified on purpose (user decision 2026-10-20): both sites in one property, no hostname split.
- **Pending (needs the user's Google login):** add dev.luitiescobar.com in Search Console (the domain property for
  luitiescobar.com covers it if it's a Domain property) and submit https://dev.luitiescobar.com/sitemap.xml.
  In GA4 the hostname dimension separates both sites; optionally add a "dev" data filter or comparison.

## 8. Figma

File **luitiescobar-dev**: https://www.figma.com/design/Wu0BfdzseYsJleAvINSI8y (team "Luiti E.'s team", created 2026-10-20).
- Page **Tokens** (1:2): variable collection "Tokens" (mode Dark) with color/*, space/*, size/*, radius/* mirroring
  global.css; color swatches, type scale, favicon, and local components **Chip** (2:81, props Label/Count/Show count),
  **Project row** (2:84, props Date/Commits/Name/Summary/Tags) and **Timeline row** (2:93).
- Page **Concepts** (0:1): Home - Desktop 1440 (5:2), Case study - Desktop 1440 (8:68), Home - Mobile 375 (8:154).
  Uploaded images (photo + covers) sit at x=-600 as reusable image fills.
- Built with the Figma MCP (use_figma, skills figma-use + figma-generate-design). Gotchas met: new auto-layout frames
  get a white fill (set `fills = []`), you can't append children inside an instance (detach first), switching a
  frame to HORIZONTAL resets its height to fixed (set counterAxisSizingMode = 'AUTO'), wrap rows need HUG height.
- If the user edits the concepts in Figma, port the changes to code by hand (no Code Connect set up).

## 9. CV

`cv/content.mjs` (bilingual content) + `cv/build.mjs` (adapted from the design site's generator: HTML printed to
A4 PDF with headless Edge, one column, ATS-readable, light paper). `node cv/build.mjs` writes:
- `cv/out/` (git-ignored): EN and ES, with and without photo, **with phone**, 2 pages each.
- `public/cv/luiti-escobar-cv-{en,es}.pdf`: web copies **without phone**, linked from the About page button
  (the button only renders when the file exists).
Experience = 6 main projects (dates from first/last commit) + 5 in "More projects", then MVP Lean and ModOp.
Training: "Desarrollo con IA: El nuevo programador" (BIG school, 3-day course by Brais Moure), EF SET C2 74/100 (2021), ActionScript 3.0 (MVC and OOP).
The phone lives in the git-ignored `cv/private.mjs` (`export const phone = '+34 ...'`); never commit it or put it in a web PDF.
When projects or texts change, update cv/content.mjs too and rebuild.

## 10. Commands

```
npm run dev                    # dev server (or "astro dev --background")
npm run build                  # static build to dist/
npm run preview                # serve dist/ locally (port 4323 in .claude/launch.json)
npm run lint:copy              # house style check (em dashes = error)
npm run favicon                # regenerate the favicon set
node scripts/og.mjs            # regenerate share images
npm run deploy                 # refresh activity data + build + wrangler deploy (rm -rf dist before)
npm run activity               # regenerate src/data/github-activity.json from the gh CLI
```

Always `rm -rf dist` (PowerShell: `Remove-Item -Recurse -Force dist`) before a production build, as on the design site.

## 11. Decisions worth remembering

- Spanish title "Desarrollador de IA"; English "AI Developer".
- Hero copy says Claude Code writes most of the lines and the user decides what ships (true for the newer repos;
  abril-v2 was built with Codex, which the Abril case study says).
- Training (user correction 2026-10-20): NOT the BIG school master. It was the 3-day course "Desarrollo con IA: El nuevo programador" taught by Brais Moure with BIG school.
- Design skills include Photoshop, Illustrator and After Effects (user request).
- FWC2026 Live and Annie are written in the **past tense** (World Cup over; Annie retired). Annie is framed as an experiment with agents and automated web interaction.
- Abril screenshots from Discord supplied by the user (src/assets/work/abril-discord-*.png): approved for publishing. Cover = the old proactive mode.
- Security notes about private repos are in MEMORY.private.md.

## 12. CV download notices (Telegram)

- Same idea as the likes on luitiescobar.com. `worker/index.ts` serves `/cv/luiti-escobar-cv-{en,es}.pdf` from the
  assets and, with `ctx.waitUntil`, records the download in D1 (`cv_downloads`: salted SHA-256 of IP + user agent,
  language, time; nothing personal) and sends a Telegram message: CV language, total downloads, approximate city and
  country, device + browser, page it came from. Once per visitor and language, max 30 per hour; bots, link previews
  and HEAD requests are ignored. **Downloads from data-center networks are neither counted nor announced** (user decision
  2026-10-20, after a download from Boydton, VA = Microsoft Azure, i.e. an Outlook/Defender link scanner): ASN list +
  `asOrganization` regex in `fromDatacenter()`. Side effect: someone on a corporate VPN hosted in a cloud is skipped too. Tested locally with `wrangler dev` (dedupe and bot filter work).
- Secrets on the Worker: `CV_SALT` (random, set by Claude 2026-10-20). **`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` must be
  set by the user** (same bot and chat as luitiescobar.com; Claude never handles the token):
  `Get-Clipboard | npx wrangler secret put TELEGRAM_BOT_TOKEN` and `npx wrangler secret put TELEGRAM_CHAT_ID`.
  Without them downloads are still counted, but no message is sent.
- Count downloads: `npx wrangler d1 execute luitiescobar-dev-events --remote --command "SELECT lang, COUNT(*) FROM cv_downloads GROUP BY lang"`.
- The cookie policy (/cookies) describes the notice. Migrations live in `migrations/` (`npx wrangler d1 migrations apply luitiescobar-dev-events --remote`).

## 13. Profile pills and activity grid

- `src/components/ProfileLinks.astro`: GitHub, LinkedIn and "Download CV" pills with icons, in the hero and the contact block.
- `src/components/Activity.astro`: GitHub-style grid (53 weeks × 7 days, monochrome, more commits = whiter) at the top
  of the Commit history section. GitHub's own calendar and API only count public work (49 contributions), so the data
  comes from `scripts/github-activity.mjs`: commits per day across every repo owned by leimagen, private included,
  via the `gh` CLI → `src/data/github-activity.json` (committed). `npm run deploy` regenerates it before building;
  `npm run activity` refreshes it by hand. First run: 278 commits, 34 active days, 15 repos.

## 14. Milestones

- [x] Research of 14 repos (3 parallel sub-agents) and asset collection (2026-10-20)
- [x] Site: Home, 11 case studies EN/ES, About, cookie policy, 404, sitemap, robots, favicon, OG images
- [x] GitHub repo https://github.com/leimagen/luitiescobar-dev (private) + first push (c0998fb)
- [x] Deployed: Worker `luitiescobar-dev`, live at https://dev.luitiescobar.com (custom domain created by wrangler,
      2026-10-20) and the workers.dev preview. luitiescobar.com checked afterwards: unaffected.
- [x] Figma concepts (Tokens + components + Home desktop/mobile + Case study)
- [x] CV EN/ES (private with phone in cv/out, web without phone in public/cv)
- [x] GitHub/LinkedIn/CV pills, CV download Telegram notice (Worker + D1), GitHub-style activity grid (2026-10-20)
- [x] User set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (2026-10-20). Claude tested 2 live downloads (es, en): 200, rows in D1, Worker outcome ok, no Telegram errors in the logs. User confirmed both messages arrived; counter reset to 0 afterwards (rows deleted)
- [x] Search Console linked to GA by the user (2026-10-20), via a Domain property luitiescobar.com that covers dev.luitiescobar.com
- [x] Both sitemaps submitted in the Search Console Domain property (user, 2026-10-20)
- [x] Repos made public after cleanup (2026-10-20): luitiescobar-dev, luitiescobar-portfolio-2026, whos-the-jefe, esco-playground, gmail-cleaner (+ study-diary-logger history cleaned). History rewritten by the user with a script Claude prepared (Claude's own force pushes are blocked by the permission classifier), verified from fresh clones. Case studies link their code; the footer links this repo.
- [ ] Optional: refresh the activity grid daily (GitHub Action or Worker cron) instead of on each deploy
- [x] User review round 1 (2026-10-20): design skills, BIG school course, FWC2026 and Annie in past tense, Abril screenshots
