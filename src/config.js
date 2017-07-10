import constants from './constants';

// Update with your credentials.
export const credentials = {
  bot: {
    token: 'aA1bB2cC3dD4eE5fF6gG7hH8.aA1bB2.aA1bB2cC3dD4eE.aA1bB2cC3dD4',
    ownerId: '123456789012345678',
  },
};

// You'll need to change these if you're using different interpreters, or if
// your interpreters are not in your PATH (in which case provide an abs path).
export const interpreters = {
  [constants.interpreters.zcode]: 'fizmo-remglk',
  [constants.interpreters.glulx]: 'glulxe',
};

// Purely aesthetic. Change if you're particular.
export const colors = {
  info:    0x4283b2, // informational messages, game output.
  success: 0x53bc49, // success messages
  error:   0xba3737, // error messages
};

// Options for the bot. See per-option comments.
export const botOptions = {
  commandPrefix: '>',  // The prefix the bot looks for to execute commands. For
                       // example, if you changed this to '~', you would start
                       // games with '~play advent.z5` and send commands with
                       // `~> take lantern`.
};
