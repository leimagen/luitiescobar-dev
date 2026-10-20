## Why I built it

I wanted one place to ask about my calendar, my mail, my expenses and the next bus home, and I wanted it to answer like a person. So in June 2026 I built Abril and gave her a Raspberry Pi 4 in my living room, running all day as a system service.

## Version 1: five agents in a week

The first version was a small team. Abril was the orchestrator, and four specialists had their own Slack bots: one for mail, calendar and YouTube, one for research, one for money (it reads photos of receipts and logs them in a spreadsheet) and one for health notes. Each specialist was a Claude tool loop that Abril could call like any other tool. Abril ran on Claude Sonnet and moved up to Opus for hard requests. The specialists ran on Haiku.

Around that I added long-term memory with pgvector and Voyage embeddings, session summaries, reminders, live bus times for Valencia, voice in and out with ElevenLabs, and a proactive mode where she started conversations on her own. That was 72 commits in seven days.

A lot of those commits were prompt fixes. The model liked to answer from memory instead of calling a tool, so I wrote rules that force the tool call. One tool was named `list_google_tasks` and the model kept mixing it up with something it knew from training. Renaming it to `get_pending_tasks` fixed it. Small things like that are most of the work.

## The audit

Before adding more, I had the code audited from top to bottom. It found real problems: tool loops with no limit, reminders that could repeat or disappear after a restart, a confirmation step that only existed in the prompt, and no check on who was talking to the bot. It also showed that my five agents were five wrappers around the same API client. The delegation cost money and time and gave nothing back.

## Version 2: one agent with harder edges

Version 2 folded the team into a single agent that keeps every tool. I added prompt caching on the tools and the system prompt, logged token usage per call, and wrote regression tests (80 passing at handoff). Passwords and documents moved into a local encrypted vault that is checked before the model sees a message, so a secret never reaches a prompt, the memory or a log. External tools come in through an MCP client that runs as a subprocess with no API keys in its environment. Discord joined Slack as a second way to talk to her.

I built this version with OpenAI Codex. Working on the same codebase with two different agents taught me a lot about what each one needs in its instructions.

## Version 3: off the Pi, onto the subscription

In September the Pi stopped booting. I rescued its SSD through WSL and used the moment to change two things. Abril moved to my Windows laptop, and from pay-per-call API keys to my Claude subscription through the Claude Agent SDK. Her tools now run as an in-process MCP server and Claude Code's own shell and file tools are switched off, so she can only do what her tools allow. Tool loops stop at eight steps. A PowerShell launcher starts Docker, waits for Postgres, restarts her with backoff and removes API keys from the environment so the subscription is always the one in use.

I also removed features on purpose. She no longer writes first, and she only speaks when I ask for audio. This is the version I use every day.

## What I took from it

Version 1 showed me what an assistant can do. Version 2 decided what it should be allowed to do. A diagram with five agents looks better on a slide, and one well-scoped agent works better in real life.
