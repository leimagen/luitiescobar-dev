## A game from home

Té Para Dos is a card game my family plays. The rules lived in people's heads until I wrote them down. I wanted a version my relatives could play on a computer against the machine, with a table that looks like the real one and text big enough for older eyes.

## From Unity to Godot

A Unity prototype in the spring got the rules working and little else. In late September I started over in Godot 4.7, which is free and asks for no royalties if the game ever sells. The rules came across from the prototype. Everything else took six days and 29 commits.

## How it's built

The rules engine sits in its own folder and knows nothing about graphics: 108 cards (two decks plus four jokers), wildcards, runs from ace to queen, a personal draw pile for each player and a four-slot discard. On top of it there's a 3D table seen from above. Cards fly in arcs, flip, deal and cascade, with a directional motion blur shader for the flights. You can drag a card or click it, valid targets glow gold, and if you sit still for eight seconds the game gives you a hint.

The opponent is a set of priority rules with no model behind it. It plays fast and in a predictable way, which suits a family game.

There's a nine-step tutorial with small animated tables, a guided first game, three languages (English, Spanish and Portuguese) and a handpan piece in D Kurd that a Python script synthesizes from scratch.

## Testing without a tester

Claude can't play the game, so we made the game play itself. A headless script runs more than 300 games of computer against computer and reports any broken rule. The first run came back clean. A later one caught a bug in how the opponent used wildcards. Two more scripts drive real mouse clicks through the menus and the guided game and save screenshots, so I could review the flow without clicking through it every time.

## The licence problem

Halfway through I read the licence of the card art I was using and saw it didn't allow selling the game. We replaced the whole deck. I generated the face cards, jokers and backs with ChatGPT, and a script draws the number cards in the same style. The felts come from CC0 fabric textures. Every asset in the game can now be sold.

## My part

I designed the game and directed the art. Claude Code wrote the code, with game-specific skills for card logic, game feel, Godot animation and audio loaded into each session. A project log kept every decision so the next session could pick up where the last one stopped.

Version 1.0 is on itch.io for Windows, with a macOS build ready. Steam comes next.
