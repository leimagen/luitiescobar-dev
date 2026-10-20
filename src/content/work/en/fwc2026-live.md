## The question

During a World Cup group stage everyone asks the same thing: if the games ended right now, who goes through? With 12 groups, eight best third-placed teams and matches played at the same time, it's hard to work out in your head. FWC2026 Live answers it while the games are still being played.

## How it works

Every live score is treated as the final score. The app recalculates the twelve tables, ranks the third-placed teams and projects the round of 32, including what happens when two matches in the same group change at once. Tiebreaks follow FIFA's 2026 order: head to head first, applied again to teams that are still tied, then goal difference, goals scored, fair play and ranking. I wrote that engine myself instead of trusting the standings from a feed.

Each group has a simulation panel where you can add or remove goals without touching the live data. A marquee shows goals, scorers, assists and cards as they happen, and push notifications cover goals, red cards and kickoffs, with a mute per match. The site installs as an app, on iPhone too.

## Infrastructure on a budget

The site is static Astro and React on Cloudflare Pages. The live data comes from a small Python service on a Raspberry Pi at home. It polls API-Football every ten seconds while a match is on, sleeps when nothing is being played and wakes up before kickoff. The API key and the push keys never leave the Pi. Visitors don't reach it either: a Cloudflare Tunnel exposes one clean JSON endpoint and Cloudflare's cache absorbs the traffic.

Analytics only load after consent, and the pages carry hreflang, a sitemap and share cards in both languages.

## Four days

25 commits between June 20 and 23, 2026. Day one brought the prototype, the data source and the projection engine. Day two added push notifications, faster updates, analytics with consent and real flags. The last fix made the tables move correctly when a real score changed.
