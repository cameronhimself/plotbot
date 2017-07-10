import constants from './constants';
import config from './appConfig';

export default {
  getInterpreter(file) {
    const ext = file.split('.').pop();
    return config.interpreters[constants.extensionInterpreterMap[ext]];
  }
};
