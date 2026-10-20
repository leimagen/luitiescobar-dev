## The question

During the group stage of the 2026 World Cup everyone asked the same thing: if the games ended right now, who goes through? With 12 groups, eight best third-placed teams and matches played at the same time, it was hard to work out in your head. FWC2026 Live answered it while the games were still being played.

## How it worked

Every live score was treated as the final score. The app recalculated the twelve tables, ranked the third-placed teams and projected the round of 32, including what happened when two matches in the same group changed at once. Tiebreaks followed FIFA's 2026 order: head to head first, applied again to teams that were still tied, then goal difference, goals scored, fair play and ranking. I wrote that engine myself instead of trusting the standings from a feed.

Each group had a simulation panel where you could add or remove goals without touching the live data. A marquee showed goals, scorers, assists and cards as they happened, and push notifications covered goals, red cards and kickoffs, with a mute per match. The site could be installed as an app, on iPhone too.

## Infrastructure on a budget

The site was static Astro and React on Cloudflare Pages. The live data came from a small Python service on a Raspberry Pi at home. It polled API-Football every ten seconds while a match was on, slept when nothing was being played and woke up before kickoff. The API key and the push keys never left the Pi. Visitors didn't reach it either: a Cloudflare Tunnel exposed one clean JSON endpoint and Cloudflare's cache absorbed the traffic.

Analytics only loaded after consent, and the pages carried hreflang, a sitemap and share cards in both languages.

## Four days

25 commits between June 20 and 23, 2026, in the middle of the group stage. Day one brought the prototype, the data source and the projection engine. Day two added push notifications, faster updates, analytics with consent and real flags. The last fix made the tables move correctly when a real score changed.

The tournament ended months ago. The site is still online, and the live feed was switched off after the final.
