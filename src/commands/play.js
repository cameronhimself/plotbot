import path from 'path';
import DiscordCommando from 'discord.js-commando';
import config from '../appConfig';
import game from '../game';

class PlayCommand extends DiscordCommando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'game',
      memberName: 'play',
      description: 'Starts a new game from a file path.',
      argsPromptLimit: 0,
      examples: ['>play zork.z5'],

      args: [
        {
          key: 'game',
          label: 'game name',
          prompt: "Enter the name of the game file you'd like to play.",
          type: 'string'
        }
      ]
    });
  }

  async run(msg, args) {
    msg.channel.send({embed: {
      color: config.colors.success,
      description: 'Starting game...',
    }});
    game.start(path.join(__dirname, `../../games/${args.game}`), msg.channel);
  }
}

export default PlayCommand;
