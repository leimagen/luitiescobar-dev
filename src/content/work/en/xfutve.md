## The idea

Venezuelan football gets little coverage outside local media. I wanted to run a small X account with news about the national team, the local league and Venezuelan players abroad, without spending hours a day on it and without letting a bot publish on its own.

## The loop

Twice a day a scheduled task reads news feeds by topic and by player. It filters them by keywords, a watchlist and a list of trusted sources, and ranks what's left. For the best article it reads the text, and Claude Haiku drafts a post in the account's voice, guided by a few text files that describe the style.

The draft arrives on Telegram with three buttons: approve, edit or reject. A rejected draft gets rewritten. A rejected article goes on a blocklist and the next one from the ranked pool takes its place. Only approved posts reach X.

## Cost

The system prompt is cached once per run, so a month of drafts costs about fifty cents in API calls. The code has an automatic mode that skips the approval. I keep it off.

## Things that broke

After a rejection there was sometimes nothing left to propose, so I added an overflow pool of ranked articles. The Windows scheduler failed with exit code 1 because the logs folder didn't exist yet, and now each task runs through a small batch wrapper that creates it. There's also a dry-run flag, which saved me from posting test drafts more than once.
