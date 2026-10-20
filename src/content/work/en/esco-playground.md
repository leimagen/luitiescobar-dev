## The starting point

Before Abril there was this. I wanted to know what local models could do on my own laptop, with no cloud bill, if I gave them names, memories and each other.

## What it does

Esco Playground is an Electron desktop app with a Python backend. You create agents with a name, a picture, a list of skills and a model from Ollama, then invite them to a chat. Mention one with @ and it replies. If its reply mentions another agent, that one answers too.

After each conversation a small model pulls out facts and saves them for that agent in a SQLite full-text index. The relevant ones come back in the next prompt. You can see, add and delete those memories from the interface. Replies stream token by token from Ollama through FastAPI to the React UI.

## Problems with small models

Small local models drift out of character fast. A four-message example exchange at the start of every prompt, plus memories injected as a note from the assistant, kept each one in role. The fact extractor returned broken JSON often enough that I added a repair step. Agents answered in third person or started chains from casual mentions, so mentions are now parsed as explicit calls. And on Windows, `localhost` resolved to IPv6 and the health check failed until it used 127.0.0.1.

## Why it stopped here

Eight commits in one day. It showed me that memory and routing between agents are the interesting part, and that I wanted stronger models behind them. The next day I started Abril on Claude.
