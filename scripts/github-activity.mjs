// Builds src/data/github-activity.json: commits per day over the last 365 days across every repo owned by
// leimagen, private ones included (GitHub's public calendar only shows public contributions).
// Uses the authenticated `gh` CLI. Run: npm run activity  (also runs before every `npm run deploy`)
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const OWNER = 'leimagen';
const gh = (args) => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));

const today = new Date();
const since = new Date(today.getTime() - 364 * 864e5);
const sinceIso = `${since.toISOString().slice(0, 10)}T00:00:00Z`;

const repos = gh(['repo', 'list', OWNER, '--limit', '200', '--json', 'name,pushedAt,isFork'])
  .filter((r) => !r.isFork && r.pushedAt >= sinceIso);

const days = {};
const perRepo = {};
for (const { name } of repos) {
  let commits = [];
  try {
    // --paginate + --slurp returns one array per page
    commits = gh(['api', '--paginate', '--slurp', `repos/${OWNER}/${name}/commits?since=${sinceIso}&per_page=100`]).flat();
  } catch {
    continue; // empty repository
  }
  for (const c of commits) {
    // the date as the author wrote it (keeps their local day)
    const d = (c.commit?.author?.date ?? '').slice(0, 10);
    if (!d || d < sinceIso.slice(0, 10)) continue;
    days[d] = (days[d] ?? 0) + 1;
  }
  perRepo[name] = commits.length;
}

const total = Object.values(days).reduce((a, b) => a + b, 0);
const out = { generated: today.toISOString().slice(0, 10), from: sinceIso.slice(0, 10), total, repos: perRepo, days };
writeFileSync('src/data/github-activity.json', JSON.stringify(out, null, 2) + '\n');
console.log(`${total} commits in ${Object.keys(days).length} active days across ${repos.length} repos`);
