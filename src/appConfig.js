import { credentials, interpreters, colors, botOptions } from './config';

export default {
  interpreters: interpreters,
  colors: colors,
  bot: { ...botOptions, ...credentials.bot },
};
