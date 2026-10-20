# dev.luitiescobar.com: notes for Claude

- Read `MEMORY.md` first (status, structure, what's pending), then `MEMORY.private.md` if it exists (git-ignored:
  local paths, privacy rules for the case studies, security notes). The repo is public: personal or sensitive notes go
  in MEMORY.private.md, never in MEMORY.md or any committed file.
- Update `MEMORY.md` at every milestone (new page or feature, deploy, content or infra change, user decision),
  bumping "Last update" and the Milestones list. Commit it together with the related work.
- Talk to the user in Spanish; code, file names and project structure stay in English.
- Copy rules: no em dashes ("—") in any visible text, human first-person tone, only claims backed by the repos.
  Run `npm run lint:copy` before every commit that touches text.
- Don't touch the design portfolio (`../luitiescobar-portfolio-2026`) from this project; read it for reference only.
- See `AGENTS.md` for the dev-server notes.
