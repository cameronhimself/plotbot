# PlotBot

## Overview
A Discord bot for playing interactive fiction games (text adventures). Different from bots that do the same thing in that it doesn't use a "dumb" text-only version of Glk--it renders Glk windows and text styles to the extent that they can be rendered in Discord's markdown.

## Installing and running
1. Clone with git.
2. `npm install`
3. Edit `src/config.js` with your credentials and any other changes you desire.
4. Put some game files in the `games` dir.
3. `npm run serve`

Note that you must have a RemGlk-enabled Z-code and Glulx interpreter installed on your server. I recommend [fizmo](https://github.com/chrender/fizmo) and [Glulxe](https://github.com/erkyrath/glulxe), respectively.

## Usage
In discord, type `>play game.z5`, where `game.z5` is any game file you previously put in the `games` dir. Send game commands like so: `>> take lantern`. If you need to input a space or other invisible character, use quotes: `>> " "`

Note that the `>` command prefix can be modified. See `src/config.js`.

## Future development
* Saving and loading
* Images
* Playing games from the web
* In-game timers
