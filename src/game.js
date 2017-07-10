import path from 'path';
import { spawn } from 'child_process';

import constants from './constants';
import config from './appConfig';
import util from './util';
import { renderBufferWindow, renderGridWindow } from './renderer';

export default {
  process: null,
  gen: 0,
  windows: [],
  inputs: [],
  content: { grids: {}, buffers: {} },
  lastCommand: null,
  lastUpdate: null,

  initState() {
    this.process = null;
    this.gen = 0;
    this.windows = [];
    this.inputs = [];
    this.content.grids = {};
    this.content.buffers = {};
    this.lastCommand = null;
    this.lastUpdate = null;
  },

  start(file, channel) {
    this.initState();
    this.process = spawn(util.getInterpreter(file), [file]);
    this.process.stdout.on('data', chunk => {
      let data = {};
      if (chunk instanceof Buffer) {
        data = JSON.parse(chunk.toString());
      } else {
        data = JSON.parse(chunk);
      }
      this.update(data);
      // this.lastCommand && channel.send({'embed': {
      //   color: config.colors.success,
      //   description: `> ${this.lastCommand}`
      // }});
      channel.send({embed: {
        color: config.colors.info,
        description: this.render(),
      }});
    });
    this.process.on('close', (code) => {
      channel.send('***The game has ended.***');
      console.log(`child process exited with code ${code}`);
    });
    this.process.on('error', (err) => {
      console.log('Failed to start child process.');
      console.log(err);
    });

    this.accept({
      type: 'init',
      gen: this.gen,
      metrics: { width: 80, height: 24 }
    });
  },

  accept(json) {
    this.process.stdin.write(JSON.stringify(json));
  },

  handleCommand(command) {
    const charInputs = this.input.filter(i => i.type === constants.inputTypes.char);
    const lineInputs = this.input.filter(i => i.type === constants.inputTypes.line);
    let targetInput;

    this.lastCommand = command;
    if (lineInputs.length) {
      targetInput = lineInputs[0];
    }
    if (charInputs.length) {
      targetInput = charInputs[0];
    }

    this.accept({
      type: targetInput.type,
      gen: targetInput.gen,
      window: targetInput.id,
      value: targetInput.type === 'char' ? command[0] : command,
    });
  },

  updateWindows(windows) {
    this.windows = windows;
  },

  updateInput(input) {
    this.input = input;
  },

  updateContent(content) {
    for (let update of content) {
      const win = this.getWindow(update.id);
      if (win.type === constants.windowTypes.grid) {
        this.updateGridContent(update);
      } else if (win.type === constants.windowTypes.buffer) {
        this.updateBufferContent(update);
      }
    }
  },

  updateGridContent(update) {
    const win = this.getWindow(update.id);
    let grid = this.content.grids[update.id];
    if (! grid) {
      grid = { id: update.id, lines: [], updateHistory: [] };
      this.content.grids[update.id] = grid;
    }

    for (let newLine of update.lines) {
      let line = grid.lines.find(l => l.line === newLine.line);
      if (! line) {
        line = { line: newLine.line };
        grid.lines[newLine.line] = line;
      }
      line.content = newLine.content || [];
    }
  },

  updateBufferContent(update) {
    const win = this.getWindow(update.id);
    let buffer = this.content.buffers[update.id];
    if (! buffer) {
      buffer = { id: update.id, text: [], updateHistory: [] };
      this.content.buffers[update.id] = buffer;
    }
    if (update.clear) {
      buffer.text = [];
    }
    buffer.text = buffer.text.concat(update.text);
    buffer.updateHistory.push(update);
  },

  getWindow(id) {
    return this.windows.find(win => win.id === id);
  },

  render() {
    const renderedWindows = [];
    for (let win of this.getWindowsToRender()) {
      if (win.type === constants.windowTypes.buffer) {
        const buffer = this.content.buffers[win.id];
        const lastUpdate = buffer.updateHistory.slice(-1)[0];
        let lineCount;
        if (lastUpdate) {
          lineCount = lastUpdate.text.length;
        }
        renderedWindows.push(renderBufferWindow(buffer, lineCount));
      } else if (win.type === constants.windowTypes.grid) {
        const grid = this.content.grids[win.id];
        if (this.getWindow(grid.id)) {
          renderedWindows.push(renderGridWindow(grid));
        }
      }
    }
    return renderedWindows.join('\n');
  },

  getWindowsToRender() {
    const toRender = this.windows.slice();
    toRender.sort((a, b) => {
      if (a.top < b.top) {
        return -1;
      } else if (a.top > b.top) {
        return 1;
      }
      return 0;
    });
    return toRender;
  },

  update(data) {
    if (data.gen > this.gen) {
      this.lastUpdate = data;
      switch (data.type) {
        case constants.updateTypes.pass:
          break;
        case constants.updateTypes.error:
          throw new Error(data.message);
          break;
        case constants.updateTypes.retry:
          // TODO
          break; 
        case constants.updateTypes.update:
          this.gen = data.gen;
          data.windows && this.updateWindows(data.windows);
          data.input && this.updateInput(data.input);
          data.content && this.updateContent(data.content);
          break;
      }
    }
  },
};
