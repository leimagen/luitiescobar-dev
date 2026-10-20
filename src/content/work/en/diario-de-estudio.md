## Why a second study diary

A day after Laboratorio de Estudio I built the same idea again, as small as I could: plain HTML, CSS and JavaScript, with no dependencies and no build step. It even opens straight from a file on your disk. I used it to practice spec-driven development with Claude Code on something small enough to watch every step.

## The workflow

The repo starts with a constitution of six rules the agent can't break. Then nine slash commands take a feature through its life: constitution, spec, clarify, plan, tasks, implement, validate, change and status. Each phase waits for my approval before the next one starts.

Two MCP servers let the agent check its own work. Chrome DevTools opens the real page, including a check at 375 px for mobile. Context7 gives it current documentation, so it reads the API instead of guessing it.

I brought the workflow over from opencode conventions to Claude Code, which meant rewriting how the commands read their arguments and how they hand work to sub-agents.

## The first feature

Spec 001 added a GitHub-style heatmap of the last 12 weeks, with five intensity levels and tooltips that screen readers can use. The spec has 14 functional requirements and the plan breaks it into 8 tasks. For the interface tasks, "tests first" meant writing the DevTools check before writing the code that makes it pass.

## Small rules that matter

Dates are where this kind of app breaks. Two rules came out of it: never use `toISOString()`, and never parse a "YYYY-MM-DD" string with `new Date()`. Both shift the day to UTC, and a session logged late at night lands on the wrong date. The logic takes "today" as a parameter, so 48 tests can check streaks for any day of the year.

The project is three commits long. Most of the value is in the process files around the code: the constitution, the commands and the approved spec.
