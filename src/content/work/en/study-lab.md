## The brief I gave myself

A study diary is usually a form and a list. I wanted to see how far the same data could go inside a scene: a sealed museum vault, lit like a product shot, that changes as you study. It was also a public test of what I can direct in real-time 3D.

## What the scene shows

You log a session with its subject, topic, duration, difficulty and energy, and the vault reacts. The towers grow with your total hours on a log scale. The reactor in the middle shows your streak, which forgives one missed day. There are 30 levels, 22 achievements, a heatmap and a weekly view. Everything is stored in your browser and you can export it as JSON.

## The graphics

The water is a real wave simulation on the GPU, a 256 by 256 grid with walls that bounce the waves back and caustics on the floor. The fog is raymarched against the depth buffer, and 24,000 dust motes move inside the vertex shader. Materials are PBR, with roughness and normal maps painted on a canvas at load time.

The sound uses no audio files. The hum of the reactor, the wind, the drips and a shortwave radio with a synthesized voice and Morse code are all built live with the Web Audio API.

## Two days of fighting the light

Most of the 26 commits are about making it look right. A milky veil over everything turned out to be bloom from emissive values fourteen times too bright. Walls ignored the lights because the canvas textures were read in the wrong color space. The metal floor looked like water because of the normal maps. Layers of fog read as rings climbing the towers until we swapped them for volumetric fog. In the end I gave the agent a reference image and we removed things until the scene matched it.

One detail I like: the agent couldn't hear the sound it was designing, so it measured levels in dBFS with an analyser node and balanced the mix by numbers.

## Process

The logic is pure JavaScript that runs in Node, so it has 117 checks of its own, and GitHub Actions runs them before every deploy to GitHub Pages. I started the project in OpenCode and continued in Claude Code. A MEMORY.md file carried the context between sessions and between models, including the agent's own mistakes, written down so they wouldn't happen twice.

I also tried ComfyUI on my laptop's 4 GB GPU to pre-generate textures. The final scene doesn't use them, because the procedural version looked better.
