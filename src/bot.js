import path from 'path';
import { spawn } from 'child_process';

import Discord from 'discord.js';
import DiscordCommando from 'discord.js-commando';
import config from './appConfig';

const client = new DiscordCommando.Client({
  owner: config.bot.ownerId,
  commandPrefix: config.bot.commandPrefix,
});

console.log('Firing up the bot...');

client.on('ready', () => {
  console.log('Bot is ready.');
});

client.registry
  .registerGroups([
      ['game', 'Game Control']
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

export default client;
