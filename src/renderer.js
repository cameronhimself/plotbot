import constants from './constants';

function replaceSpaces(text) {
  const space = constants.nonCollapsingSpace;

  return text
    // Replace multiple spaces
    .replace(/ {2,}/, match => Array(match.length).join(space))
    // Replace single leading space
    .replace(/^ /, space)
    // Replace single trailing space
    .replace(/ $/, space);
}

function wrap(text, prefixArg, suffixArg) {
  const prefix = prefixArg;
  const suffix = suffixArg || prefixArg;
  return `${prefix}${text}${suffix}`;
}

function discordItalic(text) {
  return wrap(text, '*');
}

function discordBold(text) {
  return wrap(text, '**');
}

function discordUnderline(text) {
  return wrap(text, '__');
}

function discordCode(text) {
  return wrap(text, '`');
}

function discordCodeBlock(text) {
  return wrap(text, '```\n', '\n```');
}

function renderRun(run, idx, line) {
  switch(run.style) {
    case constants.styles.normal:
      return replaceSpaces(run.text);
    case constants.styles.emphasized:
      return discordBold(discordItalic(replaceSpaces(run.text)));
    case constants.styles.preformatted:
      return discordCode(run.text);
    case constants.styles.header:
      return discordBold(replaceSpaces(run.text));
    case constants.styles.subheader:
      return discordBold(replaceSpaces(run.text));
    case constants.styles.alert:
      return discordBold(discordItalic(replaceSpaces(run.text)));
    case constants.styles.note:
      return discordItalic(replaceSpaces(run.text));
    case constants.styles.blockQuote:
      return discordCodeBlock(run.text);
    case constants.styles.input:
      return replaceSpaces(run.text);
    default:
      return replaceSpaces(run.text);
  }
}

function renderLine(line, idx, win) {
  let rendered = '';
  if (line.content) {
    const normalizedContent = [];
    let skipNext = false;
    let initial = '';

    line.content.forEach((val, i) => {
      if (skipNext) {
        skipNext = false;
        return;
      }

      if (typeof val === 'string') {
        normalizedContent.push({ style: val, text: line.content[++i] });
        skipNext = true;
      } else {
        normalizedContent.push(val);
      }
    });

    // If first character of first line is blank
    if (idx === 0 && normalizedContent[0].text.search(/\S/)) {
      initial = constants.invisibleNonWhitespaceCharacter;
    }

    rendered = normalizedContent.reduce(
      (acc, run, idx) => `${acc}${renderRun(run, idx, line)} `, initial
    );
  }

  if (line.append === true) {
    return rendered;
  }
  return `\n${rendered}`;
}

function renderBufferWindow(bufferWindow, lineCount) {
  let toRender = bufferWindow.text;
  if (lineCount) {
    toRender = toRender.slice(toRender.length - (lineCount - 1));
  }

  return toRender.reduce(
    (acc, line, idx) => `${acc}${renderLine(line, idx, bufferWindow)}`, ''
  );
}

function renderGridWindow(gridWindow) {
  return gridWindow.lines.reduce(
    (acc, line, idx) => `${acc}${renderLine(line, idx, gridWindow)}`, ''
  );
}

export { renderBufferWindow, renderGridWindow };
