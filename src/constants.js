const constants = {
  nonCollapsingSpace: ' ',
  invisibleNonWhitespaceCharacter: '⠀',
  interpreters: {
    zcode: 'zcode',
    glulx: 'glulx',
  },

  // Glk
  windowTypes: {
    grid: 'grid',
    buffer: 'buffer',
  },
  updateTypes: {
    pass: 'pass',
    error: 'error',
    retry: 'retry',
    update: 'update',
  },
  inputTypes: {
    line: 'line',
    char: 'char',
  },
  styles: {
    normal: 'normal',
    emphasized: 'emphasized',
    preformatted: 'preformatted',
    header: 'header',
    subheader: 'subheader',
    alert: 'alert',
    note: 'note',
    blockQuote: 'block_quote',
    input: 'input',
  },
};

constants.extensionInterpreterMap = {
  z1: constants.interpreters.zcode,
  z2: constants.interpreters.zcode,
  z3: constants.interpreters.zcode,
  z4: constants.interpreters.zcode,
  z5: constants.interpreters.zcode,
  z6: constants.interpreters.zcode,
  z7: constants.interpreters.zcode,
  z8: constants.interpreters.zcode,
  dat: constants.interpreters.zcode,
  zip: constants.interpreters.zcode,

  ulx: constants.interpreters.glulx,
  blb: constants.interpreters.glulx,
  blorb: constants.interpreters.glulx,
  glb: constants.interpreters.glulx,
  gblorb: constants.interpreters.glulx,
};

export default constants;
