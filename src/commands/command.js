import path from 'path';
import DiscordCommando from 'discord.js-commando';
import config from '../appConfig';
import game from '../game';

class CommandCommand extends DiscordCommando.Command {
  constructor(client) {
    super(client, {
      name: '>',
      group: 'game',
      memberName: 'command',
      description: 'Sends a command to the running game.',
      argsPromptLimit: 0,
      examples: ['>> take lantern'],

      args: [
        {
          key: 'command',
          label: 'command',
          prompt: 'Enter your command.',
          type: 'string'
        }
      ]
    });
  }

  async run(msg, args) {
    if (['save', 'restore'].indexOf(args.command.trim().toLowerCase()) != -1) {
      msg.channel.send({embed: {
        color: config.colors.error,
        description: 'Saves are not currently implemented.',
      }});
    } else {
      game.handleCommand(args.command);
    }
  }
}

export default CommandCommand;
