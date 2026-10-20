## The game

You run a small design agency. Your employees live in a pixel-art office, work at their desks, talk to each other and send you emails, and you answer them. I've spent years inside agencies, so I knew the material well.

## How it runs

A Python simulator moves the world forward in five-second ticks, eight ticks to a working day. Each employee has a role, skills, traits and a nationality, and their routines are staggered so the whole office never changes at the same moment.

Claude Haiku is only called for events that matter: an email to the boss, a conversation between two people, a reply to something you wrote. Cooldowns keep it from flooding your inbox. The Phaser 4 front end draws the office, sorts sprites by depth and shows speech bubbles in an HTML layer, with pauses so they don't overlap.

## Where it stands

A two-day prototype where the office, the inbox and the conversations work. The design document goes much further, with hiring, a bigger office, an economy and real email delivery. It's the project I come back to when I want to think of agents as characters with a life of their own.
