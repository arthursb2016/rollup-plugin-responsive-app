'use strict';

var require$$0 = require('path');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var utils = {};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	const path = require$$0;
	const WIN_SLASH = '\\\\/';
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

	/**
	 * Posix glob regex
	 */

	const DOT_LITERAL = '\\.';
	const PLUS_LITERAL = '\\+';
	const QMARK_LITERAL = '\\?';
	const SLASH_LITERAL = '\\/';
	const ONE_CHAR = '(?=.)';
	const QMARK = '[^/]';
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;

	const POSIX_CHARS = {
	  DOT_LITERAL,
	  PLUS_LITERAL,
	  QMARK_LITERAL,
	  SLASH_LITERAL,
	  ONE_CHAR,
	  QMARK,
	  END_ANCHOR,
	  DOTS_SLASH,
	  NO_DOT,
	  NO_DOTS,
	  NO_DOT_SLASH,
	  NO_DOTS_SLASH,
	  QMARK_NO_DOT,
	  STAR,
	  START_ANCHOR
	};

	/**
	 * Windows glob regex
	 */

	const WINDOWS_CHARS = {
	  ...POSIX_CHARS,

	  SLASH_LITERAL: `[${WIN_SLASH}]`,
	  QMARK: WIN_NO_SLASH,
	  STAR: `${WIN_NO_SLASH}*?`,
	  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
	  NO_DOT: `(?!${DOT_LITERAL})`,
	  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
	  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
	  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
	  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
	};

	/**
	 * POSIX Bracket Regex
	 */

	const POSIX_REGEX_SOURCE = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  ascii: '\\x00-\\x7F',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E ',
	  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word: 'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9'
	};

	constants = {
	  MAX_LENGTH: 1024 * 64,
	  POSIX_REGEX_SOURCE,

	  // regular expressions
	  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
	  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
	  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
	  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
	  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
	  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

	  // Replace globs with equivalent patterns to reduce parsing time.
	  REPLACEMENTS: {
	    '***': '*',
	    '**/**': '**',
	    '**/**/**': '**'
	  },

	  // Digits
	  CHAR_0: 48, /* 0 */
	  CHAR_9: 57, /* 9 */

	  // Alphabet chars.
	  CHAR_UPPERCASE_A: 65, /* A */
	  CHAR_LOWERCASE_A: 97, /* a */
	  CHAR_UPPERCASE_Z: 90, /* Z */
	  CHAR_LOWERCASE_Z: 122, /* z */

	  CHAR_LEFT_PARENTHESES: 40, /* ( */
	  CHAR_RIGHT_PARENTHESES: 41, /* ) */

	  CHAR_ASTERISK: 42, /* * */

	  // Non-alphabetic chars.
	  CHAR_AMPERSAND: 38, /* & */
	  CHAR_AT: 64, /* @ */
	  CHAR_BACKWARD_SLASH: 92, /* \ */
	  CHAR_CARRIAGE_RETURN: 13, /* \r */
	  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
	  CHAR_COLON: 58, /* : */
	  CHAR_COMMA: 44, /* , */
	  CHAR_DOT: 46, /* . */
	  CHAR_DOUBLE_QUOTE: 34, /* " */
	  CHAR_EQUAL: 61, /* = */
	  CHAR_EXCLAMATION_MARK: 33, /* ! */
	  CHAR_FORM_FEED: 12, /* \f */
	  CHAR_FORWARD_SLASH: 47, /* / */
	  CHAR_GRAVE_ACCENT: 96, /* ` */
	  CHAR_HASH: 35, /* # */
	  CHAR_HYPHEN_MINUS: 45, /* - */
	  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
	  CHAR_LEFT_CURLY_BRACE: 123, /* { */
	  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
	  CHAR_LINE_FEED: 10, /* \n */
	  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
	  CHAR_PERCENT: 37, /* % */
	  CHAR_PLUS: 43, /* + */
	  CHAR_QUESTION_MARK: 63, /* ? */
	  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
	  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
	  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
	  CHAR_SEMICOLON: 59, /* ; */
	  CHAR_SINGLE_QUOTE: 39, /* ' */
	  CHAR_SPACE: 32, /*   */
	  CHAR_TAB: 9, /* \t */
	  CHAR_UNDERSCORE: 95, /* _ */
	  CHAR_VERTICAL_LINE: 124, /* | */
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

	  SEP: path.sep,

	  /**
	   * Create EXTGLOB_CHARS
	   */

	  extglobChars(chars) {
	    return {
	      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
	      '?': { type: 'qmark', open: '(?:', close: ')?' },
	      '+': { type: 'plus', open: '(?:', close: ')+' },
	      '*': { type: 'star', open: '(?:', close: ')*' },
	      '@': { type: 'at', open: '(?:', close: ')' }
	    };
	  },

	  /**
	   * Create GLOB_CHARS
	   */

	  globChars(win32) {
	    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
	  }
	};
	return constants;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {

		const path = require$$0;
		const win32 = process.platform === 'win32';
		const {
		  REGEX_BACKSLASH,
		  REGEX_REMOVE_BACKSLASH,
		  REGEX_SPECIAL_CHARS,
		  REGEX_SPECIAL_CHARS_GLOBAL
		} = requireConstants();

		exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
		exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
		exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
		exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
		exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

		exports.removeBackslashes = str => {
		  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
		    return match === '\\' ? '' : match;
		  });
		};

		exports.supportsLookbehinds = () => {
		  const segs = process.version.slice(1).split('.').map(Number);
		  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
		    return true;
		  }
		  return false;
		};

		exports.isWindows = options => {
		  if (options && typeof options.windows === 'boolean') {
		    return options.windows;
		  }
		  return win32 === true || path.sep === '\\';
		};

		exports.escapeLast = (input, char, lastIdx) => {
		  const idx = input.lastIndexOf(char, lastIdx);
		  if (idx === -1) return input;
		  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
		  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
		};

		exports.removePrefix = (input, state = {}) => {
		  let output = input;
		  if (output.startsWith('./')) {
		    output = output.slice(2);
		    state.prefix = './';
		  }
		  return output;
		};

		exports.wrapOutput = (input, state = {}, options = {}) => {
		  const prepend = options.contains ? '' : '^';
		  const append = options.contains ? '' : '$';

		  let output = `${prepend}(?:${input})${append}`;
		  if (state.negated === true) {
		    output = `(?:^(?!${output}).*$)`;
		  }
		  return output;
		}; 
	} (utils));
	return utils;
}

var scan_1;
var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan_1;
	hasRequiredScan = 1;

	const utils = requireUtils();
	const {
	  CHAR_ASTERISK,             /* * */
	  CHAR_AT,                   /* @ */
	  CHAR_BACKWARD_SLASH,       /* \ */
	  CHAR_COMMA,                /* , */
	  CHAR_DOT,                  /* . */
	  CHAR_EXCLAMATION_MARK,     /* ! */
	  CHAR_FORWARD_SLASH,        /* / */
	  CHAR_LEFT_CURLY_BRACE,     /* { */
	  CHAR_LEFT_PARENTHESES,     /* ( */
	  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
	  CHAR_PLUS,                 /* + */
	  CHAR_QUESTION_MARK,        /* ? */
	  CHAR_RIGHT_CURLY_BRACE,    /* } */
	  CHAR_RIGHT_PARENTHESES,    /* ) */
	  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
	} = requireConstants();

	const isPathSeparator = code => {
	  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};

	const depth = token => {
	  if (token.isPrefix !== true) {
	    token.depth = token.isGlobstar ? Infinity : 1;
	  }
	};

	/**
	 * Quickly scans a glob pattern and returns an object with a handful of
	 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	 *
	 * ```js
	 * const pm = require('picomatch');
	 * console.log(pm.scan('foo/bar/*.js'));
	 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	 * ```
	 * @param {String} `str`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with tokens and regex source string.
	 * @api public
	 */

	const scan = (input, options) => {
	  const opts = options || {};

	  const length = input.length - 1;
	  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
	  const slashes = [];
	  const tokens = [];
	  const parts = [];

	  let str = input;
	  let index = -1;
	  let start = 0;
	  let lastIndex = 0;
	  let isBrace = false;
	  let isBracket = false;
	  let isGlob = false;
	  let isExtglob = false;
	  let isGlobstar = false;
	  let braceEscaped = false;
	  let backslashes = false;
	  let negated = false;
	  let negatedExtglob = false;
	  let finished = false;
	  let braces = 0;
	  let prev;
	  let code;
	  let token = { value: '', depth: 0, isGlob: false };

	  const eos = () => index >= length;
	  const peek = () => str.charCodeAt(index + 1);
	  const advance = () => {
	    prev = code;
	    return str.charCodeAt(++index);
	  };

	  while (index < length) {
	    code = advance();
	    let next;

	    if (code === CHAR_BACKWARD_SLASH) {
	      backslashes = token.backslashes = true;
	      code = advance();

	      if (code === CHAR_LEFT_CURLY_BRACE) {
	        braceEscaped = true;
	      }
	      continue;
	    }

	    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
	      braces++;

	      while (eos() !== true && (code = advance())) {
	        if (code === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (code === CHAR_LEFT_CURLY_BRACE) {
	          braces++;
	          continue;
	        }

	        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (braceEscaped !== true && code === CHAR_COMMA) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (code === CHAR_RIGHT_CURLY_BRACE) {
	          braces--;

	          if (braces === 0) {
	            braceEscaped = false;
	            isBrace = token.isBrace = true;
	            finished = true;
	            break;
	          }
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (code === CHAR_FORWARD_SLASH) {
	      slashes.push(index);
	      tokens.push(token);
	      token = { value: '', depth: 0, isGlob: false };

	      if (finished === true) continue;
	      if (prev === CHAR_DOT && index === (start + 1)) {
	        start += 2;
	        continue;
	      }

	      lastIndex = index + 1;
	      continue;
	    }

	    if (opts.noext !== true) {
	      const isExtglobChar = code === CHAR_PLUS
	        || code === CHAR_AT
	        || code === CHAR_ASTERISK
	        || code === CHAR_QUESTION_MARK
	        || code === CHAR_EXCLAMATION_MARK;

	      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
	        isGlob = token.isGlob = true;
	        isExtglob = token.isExtglob = true;
	        finished = true;
	        if (code === CHAR_EXCLAMATION_MARK && index === start) {
	          negatedExtglob = true;
	        }

	        if (scanToEnd === true) {
	          while (eos() !== true && (code = advance())) {
	            if (code === CHAR_BACKWARD_SLASH) {
	              backslashes = token.backslashes = true;
	              code = advance();
	              continue;
	            }

	            if (code === CHAR_RIGHT_PARENTHESES) {
	              isGlob = token.isGlob = true;
	              finished = true;
	              break;
	            }
	          }
	          continue;
	        }
	        break;
	      }
	    }

	    if (code === CHAR_ASTERISK) {
	      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_QUESTION_MARK) {
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_LEFT_SQUARE_BRACKET) {
	      while (eos() !== true && (next = advance())) {
	        if (next === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
	          isBracket = token.isBracket = true;
	          isGlob = token.isGlob = true;
	          finished = true;
	          break;
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
	      negated = token.negated = true;
	      start++;
	      continue;
	    }

	    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
	      isGlob = token.isGlob = true;

	      if (scanToEnd === true) {
	        while (eos() !== true && (code = advance())) {
	          if (code === CHAR_LEFT_PARENTHESES) {
	            backslashes = token.backslashes = true;
	            code = advance();
	            continue;
	          }

	          if (code === CHAR_RIGHT_PARENTHESES) {
	            finished = true;
	            break;
	          }
	        }
	        continue;
	      }
	      break;
	    }

	    if (isGlob === true) {
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }
	  }

	  if (opts.noext === true) {
	    isExtglob = false;
	    isGlob = false;
	  }

	  let base = str;
	  let prefix = '';
	  let glob = '';

	  if (start > 0) {
	    prefix = str.slice(0, start);
	    str = str.slice(start);
	    lastIndex -= start;
	  }

	  if (base && isGlob === true && lastIndex > 0) {
	    base = str.slice(0, lastIndex);
	    glob = str.slice(lastIndex);
	  } else if (isGlob === true) {
	    base = '';
	    glob = str;
	  } else {
	    base = str;
	  }

	  if (base && base !== '' && base !== '/' && base !== str) {
	    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
	      base = base.slice(0, -1);
	    }
	  }

	  if (opts.unescape === true) {
	    if (glob) glob = utils.removeBackslashes(glob);

	    if (base && backslashes === true) {
	      base = utils.removeBackslashes(base);
	    }
	  }

	  const state = {
	    prefix,
	    input,
	    start,
	    base,
	    glob,
	    isBrace,
	    isBracket,
	    isGlob,
	    isExtglob,
	    isGlobstar,
	    negated,
	    negatedExtglob
	  };

	  if (opts.tokens === true) {
	    state.maxDepth = 0;
	    if (!isPathSeparator(code)) {
	      tokens.push(token);
	    }
	    state.tokens = tokens;
	  }

	  if (opts.parts === true || opts.tokens === true) {
	    let prevIndex;

	    for (let idx = 0; idx < slashes.length; idx++) {
	      const n = prevIndex ? prevIndex + 1 : start;
	      const i = slashes[idx];
	      const value = input.slice(n, i);
	      if (opts.tokens) {
	        if (idx === 0 && start !== 0) {
	          tokens[idx].isPrefix = true;
	          tokens[idx].value = prefix;
	        } else {
	          tokens[idx].value = value;
	        }
	        depth(tokens[idx]);
	        state.maxDepth += tokens[idx].depth;
	      }
	      if (idx !== 0 || value !== '') {
	        parts.push(value);
	      }
	      prevIndex = i;
	    }

	    if (prevIndex && prevIndex + 1 < input.length) {
	      const value = input.slice(prevIndex + 1);
	      parts.push(value);

	      if (opts.tokens) {
	        tokens[tokens.length - 1].value = value;
	        depth(tokens[tokens.length - 1]);
	        state.maxDepth += tokens[tokens.length - 1].depth;
	      }
	    }

	    state.slashes = slashes;
	    state.parts = parts;
	  }

	  return state;
	};

	scan_1 = scan;
	return scan_1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const constants = requireConstants();
	const utils = requireUtils();

	/**
	 * Constants
	 */

	const {
	  MAX_LENGTH,
	  POSIX_REGEX_SOURCE,
	  REGEX_NON_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_BACKREF,
	  REPLACEMENTS
	} = constants;

	/**
	 * Helpers
	 */

	const expandRange = (args, options) => {
	  if (typeof options.expandRange === 'function') {
	    return options.expandRange(...args, options);
	  }

	  args.sort();
	  const value = `[${args.join('-')}]`;

	  try {
	    /* eslint-disable-next-line no-new */
	    new RegExp(value);
	  } catch (ex) {
	    return args.map(v => utils.escapeRegex(v)).join('..');
	  }

	  return value;
	};

	/**
	 * Create the message for a syntax error
	 */

	const syntaxError = (type, char) => {
	  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};

	/**
	 * Parse the given input string.
	 * @param {String} input
	 * @param {Object} options
	 * @return {Object}
	 */

	const parse = (input, options) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected a string');
	  }

	  input = REPLACEMENTS[input] || input;

	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

	  let len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
	  const tokens = [bos];

	  const capture = opts.capture ? '' : '?:';
	  const win32 = utils.isWindows(options);

	  // create constants based on platform, for windows or posix
	  const PLATFORM_CHARS = constants.globChars(win32);
	  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

	  const {
	    DOT_LITERAL,
	    PLUS_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOT_SLASH,
	    NO_DOTS_SLASH,
	    QMARK,
	    QMARK_NO_DOT,
	    STAR,
	    START_ANCHOR
	  } = PLATFORM_CHARS;

	  const globstar = opts => {
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const nodot = opts.dot ? '' : NO_DOT;
	  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
	  let star = opts.bash === true ? globstar(opts) : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  // minimatch options support
	  if (typeof opts.noext === 'boolean') {
	    opts.noextglob = opts.noext;
	  }

	  const state = {
	    input,
	    index: -1,
	    start: 0,
	    dot: opts.dot === true,
	    consumed: '',
	    output: '',
	    prefix: '',
	    backtrack: false,
	    negated: false,
	    brackets: 0,
	    braces: 0,
	    parens: 0,
	    quotes: 0,
	    globstar: false,
	    tokens
	  };

	  input = utils.removePrefix(input, state);
	  len = input.length;

	  const extglobs = [];
	  const braces = [];
	  const stack = [];
	  let prev = bos;
	  let value;

	  /**
	   * Tokenizing helpers
	   */

	  const eos = () => state.index === len - 1;
	  const peek = state.peek = (n = 1) => input[state.index + n];
	  const advance = state.advance = () => input[++state.index] || '';
	  const remaining = () => input.slice(state.index + 1);
	  const consume = (value = '', num = 0) => {
	    state.consumed += value;
	    state.index += num;
	  };

	  const append = token => {
	    state.output += token.output != null ? token.output : token.value;
	    consume(token.value);
	  };

	  const negate = () => {
	    let count = 1;

	    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
	      advance();
	      state.start++;
	      count++;
	    }

	    if (count % 2 === 0) {
	      return false;
	    }

	    state.negated = true;
	    state.start++;
	    return true;
	  };

	  const increment = type => {
	    state[type]++;
	    stack.push(type);
	  };

	  const decrement = type => {
	    state[type]--;
	    stack.pop();
	  };

	  /**
	   * Push tokens onto the tokens array. This helper speeds up
	   * tokenizing by 1) helping us avoid backtracking as much as possible,
	   * and 2) helping us avoid creating extra tokens when consecutive
	   * characters are plain text. This improves performance and simplifies
	   * lookbehinds.
	   */

	  const push = tok => {
	    if (prev.type === 'globstar') {
	      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
	      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

	      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
	        state.output = state.output.slice(0, -prev.output.length);
	        prev.type = 'star';
	        prev.value = '*';
	        prev.output = star;
	        state.output += prev.output;
	      }
	    }

	    if (extglobs.length && tok.type !== 'paren') {
	      extglobs[extglobs.length - 1].inner += tok.value;
	    }

	    if (tok.value || tok.output) append(tok);
	    if (prev && prev.type === 'text' && tok.type === 'text') {
	      prev.value += tok.value;
	      prev.output = (prev.output || '') + tok.value;
	      return;
	    }

	    tok.prev = prev;
	    tokens.push(tok);
	    prev = tok;
	  };

	  const extglobOpen = (type, value) => {
	    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

	    token.prev = prev;
	    token.parens = state.parens;
	    token.output = state.output;
	    const output = (opts.capture ? '(' : '') + token.open;

	    increment('parens');
	    push({ type, value, output: state.output ? '' : ONE_CHAR });
	    push({ type: 'paren', extglob: true, value: advance(), output });
	    extglobs.push(token);
	  };

	  const extglobClose = token => {
	    let output = token.close + (opts.capture ? ')' : '');
	    let rest;

	    if (token.type === 'negate') {
	      let extglobStar = star;

	      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
	        extglobStar = globstar(opts);
	      }

	      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
	        output = token.close = `)$))${extglobStar}`;
	      }

	      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
	        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
	        // In this case, we need to parse the string and use it in the output of the original pattern.
	        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
	        //
	        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
	        const expression = parse(rest, { ...options, fastpaths: false }).output;

	        output = token.close = `)${expression})${extglobStar})`;
	      }

	      if (token.prev.type === 'bos') {
	        state.negatedExtglob = true;
	      }
	    }

	    push({ type: 'paren', extglob: true, value, output });
	    decrement('parens');
	  };

	  /**
	   * Fast paths
	   */

	  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
	    let backslashes = false;

	    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
	      if (first === '\\') {
	        backslashes = true;
	        return m;
	      }

	      if (first === '?') {
	        if (esc) {
	          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        if (index === 0) {
	          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        return QMARK.repeat(chars.length);
	      }

	      if (first === '.') {
	        return DOT_LITERAL.repeat(chars.length);
	      }

	      if (first === '*') {
	        if (esc) {
	          return esc + first + (rest ? star : '');
	        }
	        return star;
	      }
	      return esc ? m : `\\${m}`;
	    });

	    if (backslashes === true) {
	      if (opts.unescape === true) {
	        output = output.replace(/\\/g, '');
	      } else {
	        output = output.replace(/\\+/g, m => {
	          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
	        });
	      }
	    }

	    if (output === input && opts.contains === true) {
	      state.output = input;
	      return state;
	    }

	    state.output = utils.wrapOutput(output, state, options);
	    return state;
	  }

	  /**
	   * Tokenize input until we reach end-of-string
	   */

	  while (!eos()) {
	    value = advance();

	    if (value === '\u0000') {
	      continue;
	    }

	    /**
	     * Escaped characters
	     */

	    if (value === '\\') {
	      const next = peek();

	      if (next === '/' && opts.bash !== true) {
	        continue;
	      }

	      if (next === '.' || next === ';') {
	        continue;
	      }

	      if (!next) {
	        value += '\\';
	        push({ type: 'text', value });
	        continue;
	      }

	      // collapse slashes to reduce potential for exploits
	      const match = /^\\+/.exec(remaining());
	      let slashes = 0;

	      if (match && match[0].length > 2) {
	        slashes = match[0].length;
	        state.index += slashes;
	        if (slashes % 2 !== 0) {
	          value += '\\';
	        }
	      }

	      if (opts.unescape === true) {
	        value = advance();
	      } else {
	        value += advance();
	      }

	      if (state.brackets === 0) {
	        push({ type: 'text', value });
	        continue;
	      }
	    }

	    /**
	     * If we're inside a regex character class, continue
	     * until we reach the closing bracket.
	     */

	    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
	      if (opts.posix !== false && value === ':') {
	        const inner = prev.value.slice(1);
	        if (inner.includes('[')) {
	          prev.posix = true;

	          if (inner.includes(':')) {
	            const idx = prev.value.lastIndexOf('[');
	            const pre = prev.value.slice(0, idx);
	            const rest = prev.value.slice(idx + 2);
	            const posix = POSIX_REGEX_SOURCE[rest];
	            if (posix) {
	              prev.value = pre + posix;
	              state.backtrack = true;
	              advance();

	              if (!bos.output && tokens.indexOf(prev) === 1) {
	                bos.output = ONE_CHAR;
	              }
	              continue;
	            }
	          }
	        }
	      }

	      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
	        value = `\\${value}`;
	      }

	      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
	        value = `\\${value}`;
	      }

	      if (opts.posix === true && value === '!' && prev.value === '[') {
	        value = '^';
	      }

	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * If we're inside a quoted string, continue
	     * until we reach the closing double quote.
	     */

	    if (state.quotes === 1 && value !== '"') {
	      value = utils.escapeRegex(value);
	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * Double quotes
	     */

	    if (value === '"') {
	      state.quotes = state.quotes === 1 ? 0 : 1;
	      if (opts.keepQuotes === true) {
	        push({ type: 'text', value });
	      }
	      continue;
	    }

	    /**
	     * Parentheses
	     */

	    if (value === '(') {
	      increment('parens');
	      push({ type: 'paren', value });
	      continue;
	    }

	    if (value === ')') {
	      if (state.parens === 0 && opts.strictBrackets === true) {
	        throw new SyntaxError(syntaxError('opening', '('));
	      }

	      const extglob = extglobs[extglobs.length - 1];
	      if (extglob && state.parens === extglob.parens + 1) {
	        extglobClose(extglobs.pop());
	        continue;
	      }

	      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
	      decrement('parens');
	      continue;
	    }

	    /**
	     * Square brackets
	     */

	    if (value === '[') {
	      if (opts.nobracket === true || !remaining().includes(']')) {
	        if (opts.nobracket !== true && opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('closing', ']'));
	        }

	        value = `\\${value}`;
	      } else {
	        increment('brackets');
	      }

	      push({ type: 'bracket', value });
	      continue;
	    }

	    if (value === ']') {
	      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      if (state.brackets === 0) {
	        if (opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('opening', '['));
	        }

	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      decrement('brackets');

	      const prevValue = prev.value.slice(1);
	      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
	        value = `/${value}`;
	      }

	      prev.value += value;
	      append({ value });

	      // when literal brackets are explicitly disabled
	      // assume we should match with a regex character class
	      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
	        continue;
	      }

	      const escaped = utils.escapeRegex(prev.value);
	      state.output = state.output.slice(0, -prev.value.length);

	      // when literal brackets are explicitly enabled
	      // assume we should escape the brackets to match literal characters
	      if (opts.literalBrackets === true) {
	        state.output += escaped;
	        prev.value = escaped;
	        continue;
	      }

	      // when the user specifies nothing, try to match both
	      prev.value = `(${capture}${escaped}|${prev.value})`;
	      state.output += prev.value;
	      continue;
	    }

	    /**
	     * Braces
	     */

	    if (value === '{' && opts.nobrace !== true) {
	      increment('braces');

	      const open = {
	        type: 'brace',
	        value,
	        output: '(',
	        outputIndex: state.output.length,
	        tokensIndex: state.tokens.length
	      };

	      braces.push(open);
	      push(open);
	      continue;
	    }

	    if (value === '}') {
	      const brace = braces[braces.length - 1];

	      if (opts.nobrace === true || !brace) {
	        push({ type: 'text', value, output: value });
	        continue;
	      }

	      let output = ')';

	      if (brace.dots === true) {
	        const arr = tokens.slice();
	        const range = [];

	        for (let i = arr.length - 1; i >= 0; i--) {
	          tokens.pop();
	          if (arr[i].type === 'brace') {
	            break;
	          }
	          if (arr[i].type !== 'dots') {
	            range.unshift(arr[i].value);
	          }
	        }

	        output = expandRange(range, opts);
	        state.backtrack = true;
	      }

	      if (brace.comma !== true && brace.dots !== true) {
	        const out = state.output.slice(0, brace.outputIndex);
	        const toks = state.tokens.slice(brace.tokensIndex);
	        brace.value = brace.output = '\\{';
	        value = output = '\\}';
	        state.output = out;
	        for (const t of toks) {
	          state.output += (t.output || t.value);
	        }
	      }

	      push({ type: 'brace', value, output });
	      decrement('braces');
	      braces.pop();
	      continue;
	    }

	    /**
	     * Pipes
	     */

	    if (value === '|') {
	      if (extglobs.length > 0) {
	        extglobs[extglobs.length - 1].conditions++;
	      }
	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Commas
	     */

	    if (value === ',') {
	      let output = value;

	      const brace = braces[braces.length - 1];
	      if (brace && stack[stack.length - 1] === 'braces') {
	        brace.comma = true;
	        output = '|';
	      }

	      push({ type: 'comma', value, output });
	      continue;
	    }

	    /**
	     * Slashes
	     */

	    if (value === '/') {
	      // if the beginning of the glob is "./", advance the start
	      // to the current index, and don't add the "./" characters
	      // to the state. This greatly simplifies lookbehinds when
	      // checking for BOS characters like "!" and "." (not "./")
	      if (prev.type === 'dot' && state.index === state.start + 1) {
	        state.start = state.index + 1;
	        state.consumed = '';
	        state.output = '';
	        tokens.pop();
	        prev = bos; // reset "prev" to the first token
	        continue;
	      }

	      push({ type: 'slash', value, output: SLASH_LITERAL });
	      continue;
	    }

	    /**
	     * Dots
	     */

	    if (value === '.') {
	      if (state.braces > 0 && prev.type === 'dot') {
	        if (prev.value === '.') prev.output = DOT_LITERAL;
	        const brace = braces[braces.length - 1];
	        prev.type = 'dots';
	        prev.output += value;
	        prev.value += value;
	        brace.dots = true;
	        continue;
	      }

	      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
	        push({ type: 'text', value, output: DOT_LITERAL });
	        continue;
	      }

	      push({ type: 'dot', value, output: DOT_LITERAL });
	      continue;
	    }

	    /**
	     * Question marks
	     */

	    if (value === '?') {
	      const isGroup = prev && prev.value === '(';
	      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('qmark', value);
	        continue;
	      }

	      if (prev && prev.type === 'paren') {
	        const next = peek();
	        let output = value;

	        if (next === '<' && !utils.supportsLookbehinds()) {
	          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
	        }

	        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
	          output = `\\${value}`;
	        }

	        push({ type: 'text', value, output });
	        continue;
	      }

	      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
	        push({ type: 'qmark', value, output: QMARK_NO_DOT });
	        continue;
	      }

	      push({ type: 'qmark', value, output: QMARK });
	      continue;
	    }

	    /**
	     * Exclamation
	     */

	    if (value === '!') {
	      if (opts.noextglob !== true && peek() === '(') {
	        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
	          extglobOpen('negate', value);
	          continue;
	        }
	      }

	      if (opts.nonegate !== true && state.index === 0) {
	        negate();
	        continue;
	      }
	    }

	    /**
	     * Plus
	     */

	    if (value === '+') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('plus', value);
	        continue;
	      }

	      if ((prev && prev.value === '(') || opts.regex === false) {
	        push({ type: 'plus', value, output: PLUS_LITERAL });
	        continue;
	      }

	      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
	        push({ type: 'plus', value });
	        continue;
	      }

	      push({ type: 'plus', value: PLUS_LITERAL });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value === '@') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        push({ type: 'at', extglob: true, value, output: '' });
	        continue;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value !== '*') {
	      if (value === '$' || value === '^') {
	        value = `\\${value}`;
	      }

	      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
	      if (match) {
	        value += match[0];
	        state.index += match[0].length;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Stars
	     */

	    if (prev && (prev.type === 'globstar' || prev.star === true)) {
	      prev.type = 'star';
	      prev.star = true;
	      prev.value += value;
	      prev.output = star;
	      state.backtrack = true;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    let rest = remaining();
	    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
	      extglobOpen('star', value);
	      continue;
	    }

	    if (prev.type === 'star') {
	      if (opts.noglobstar === true) {
	        consume(value);
	        continue;
	      }

	      const prior = prev.prev;
	      const before = prior.prev;
	      const isStart = prior.type === 'slash' || prior.type === 'bos';
	      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

	      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
	      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
	      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      // strip consecutive `/**/`
	      while (rest.slice(0, 3) === '/**') {
	        const after = input[state.index + 4];
	        if (after && after !== '/') {
	          break;
	        }
	        rest = rest.slice(3);
	        consume('/**', 3);
	      }

	      if (prior.type === 'bos' && eos()) {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = globstar(opts);
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
	        prev.value += value;
	        state.globstar = true;
	        state.output += prior.output + prev.output;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
	        const end = rest[1] !== void 0 ? '|$' : '';

	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
	        prev.value += value;

	        state.output += prior.output + prev.output;
	        state.globstar = true;

	        consume(value + advance());

	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      if (prior.type === 'bos' && rest[0] === '/') {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value + advance());
	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      // remove single star from output
	      state.output = state.output.slice(0, -prev.output.length);

	      // reset previous token to globstar
	      prev.type = 'globstar';
	      prev.output = globstar(opts);
	      prev.value += value;

	      // reset output with globstar
	      state.output += prev.output;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    const token = { type: 'star', value, output: star };

	    if (opts.bash === true) {
	      token.output = '.*?';
	      if (prev.type === 'bos' || prev.type === 'slash') {
	        token.output = nodot + token.output;
	      }
	      push(token);
	      continue;
	    }

	    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
	      token.output = value;
	      push(token);
	      continue;
	    }

	    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
	      if (prev.type === 'dot') {
	        state.output += NO_DOT_SLASH;
	        prev.output += NO_DOT_SLASH;

	      } else if (opts.dot === true) {
	        state.output += NO_DOTS_SLASH;
	        prev.output += NO_DOTS_SLASH;

	      } else {
	        state.output += nodot;
	        prev.output += nodot;
	      }

	      if (peek() !== '*') {
	        state.output += ONE_CHAR;
	        prev.output += ONE_CHAR;
	      }
	    }

	    push(token);
	  }

	  while (state.brackets > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
	    state.output = utils.escapeLast(state.output, '[');
	    decrement('brackets');
	  }

	  while (state.parens > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
	    state.output = utils.escapeLast(state.output, '(');
	    decrement('parens');
	  }

	  while (state.braces > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
	    state.output = utils.escapeLast(state.output, '{');
	    decrement('braces');
	  }

	  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
	    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
	  }

	  // rebuild the output if we had to backtrack at any point
	  if (state.backtrack === true) {
	    state.output = '';

	    for (const token of state.tokens) {
	      state.output += token.output != null ? token.output : token.value;

	      if (token.suffix) {
	        state.output += token.suffix;
	      }
	    }
	  }

	  return state;
	};

	/**
	 * Fast paths for creating regular expressions for common glob patterns.
	 * This can significantly speed up processing and has very little downside
	 * impact when none of the fast paths match.
	 */

	parse.fastpaths = (input, options) => {
	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
	  const len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  input = REPLACEMENTS[input] || input;
	  const win32 = utils.isWindows(options);

	  // create constants based on platform, for windows or posix
	  const {
	    DOT_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOTS,
	    NO_DOTS_SLASH,
	    STAR,
	    START_ANCHOR
	  } = constants.globChars(win32);

	  const nodot = opts.dot ? NO_DOTS : NO_DOT;
	  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
	  const capture = opts.capture ? '' : '?:';
	  const state = { negated: false, prefix: '' };
	  let star = opts.bash === true ? '.*?' : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  const globstar = opts => {
	    if (opts.noglobstar === true) return star;
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const create = str => {
	    switch (str) {
	      case '*':
	        return `${nodot}${ONE_CHAR}${star}`;

	      case '.*':
	        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*.*':
	        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*/*':
	        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

	      case '**':
	        return nodot + globstar(opts);

	      case '**/*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

	      case '**/*.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '**/.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

	      default: {
	        const match = /^(.*?)\.(\w+)$/.exec(str);
	        if (!match) return;

	        const source = create(match[1]);
	        if (!source) return;

	        return source + DOT_LITERAL + match[2];
	      }
	    }
	  };

	  const output = utils.removePrefix(input, state);
	  let source = create(output);

	  if (source && opts.strictSlashes !== true) {
	    source += `${SLASH_LITERAL}?`;
	  }

	  return source;
	};

	parse_1 = parse;
	return parse_1;
}

var picomatch_1;
var hasRequiredPicomatch$1;

function requirePicomatch$1 () {
	if (hasRequiredPicomatch$1) return picomatch_1;
	hasRequiredPicomatch$1 = 1;

	const path = require$$0;
	const scan = requireScan();
	const parse = requireParse();
	const utils = requireUtils();
	const constants = requireConstants();
	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	/**
	 * Creates a matcher function from one or more glob patterns. The
	 * returned function takes a string to match as its first argument,
	 * and returns true if the string is a match. The returned matcher
	 * function also takes a boolean as the second argument that, when true,
	 * returns an object with additional information.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch(glob[, options]);
	 *
	 * const isMatch = picomatch('*.!(*a)');
	 * console.log(isMatch('a.a')); //=> false
	 * console.log(isMatch('a.b')); //=> true
	 * ```
	 * @name picomatch
	 * @param {String|Array} `globs` One or more glob patterns.
	 * @param {Object=} `options`
	 * @return {Function=} Returns a matcher function.
	 * @api public
	 */

	const picomatch = (glob, options, returnState = false) => {
	  if (Array.isArray(glob)) {
	    const fns = glob.map(input => picomatch(input, options, returnState));
	    const arrayMatcher = str => {
	      for (const isMatch of fns) {
	        const state = isMatch(str);
	        if (state) return state;
	      }
	      return false;
	    };
	    return arrayMatcher;
	  }

	  const isState = isObject(glob) && glob.tokens && glob.input;

	  if (glob === '' || (typeof glob !== 'string' && !isState)) {
	    throw new TypeError('Expected pattern to be a non-empty string');
	  }

	  const opts = options || {};
	  const posix = utils.isWindows(options);
	  const regex = isState
	    ? picomatch.compileRe(glob, options)
	    : picomatch.makeRe(glob, options, false, true);

	  const state = regex.state;
	  delete regex.state;

	  let isIgnored = () => false;
	  if (opts.ignore) {
	    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
	    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
	  }

	  const matcher = (input, returnObject = false) => {
	    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
	    const result = { glob, state, regex, posix, input, output, match, isMatch };

	    if (typeof opts.onResult === 'function') {
	      opts.onResult(result);
	    }

	    if (isMatch === false) {
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (isIgnored(input)) {
	      if (typeof opts.onIgnore === 'function') {
	        opts.onIgnore(result);
	      }
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (typeof opts.onMatch === 'function') {
	      opts.onMatch(result);
	    }
	    return returnObject ? result : true;
	  };

	  if (returnState) {
	    matcher.state = state;
	  }

	  return matcher;
	};

	/**
	 * Test `input` with the given `regex`. This is used by the main
	 * `picomatch()` function to test the input string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.test(input, regex[, options]);
	 *
	 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp} `regex`
	 * @return {Object} Returns an object with matching info.
	 * @api public
	 */

	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected input to be a string');
	  }

	  if (input === '') {
	    return { isMatch: false, output: '' };
	  }

	  const opts = options || {};
	  const format = opts.format || (posix ? utils.toPosixSlashes : null);
	  let match = input === glob;
	  let output = (match && format) ? format(input) : input;

	  if (match === false) {
	    output = format ? format(input) : input;
	    match = output === glob;
	  }

	  if (match === false || opts.capture === true) {
	    if (opts.matchBase === true || opts.basename === true) {
	      match = picomatch.matchBase(input, regex, options, posix);
	    } else {
	      match = regex.exec(output);
	    }
	  }

	  return { isMatch: Boolean(match), match, output };
	};

	/**
	 * Match the basename of a filepath.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.matchBase(input, glob[, options]);
	 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	 * @return {Boolean}
	 * @api public
	 */

	picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
	  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
	  return regex.test(path.basename(input));
	};

	/**
	 * Returns true if **any** of the given glob `patterns` match the specified `string`.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.isMatch(string, patterns[, options]);
	 *
	 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	 * ```
	 * @param {String|Array} str The string to test.
	 * @param {String|Array} patterns One or more glob patterns to use for matching.
	 * @param {Object} [options] See available [options](#options).
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

	/**
	 * Parse a glob pattern to create the source string for a regular
	 * expression.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const result = picomatch.parse(pattern[, options]);
	 * ```
	 * @param {String} `pattern`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	 * @api public
	 */

	picomatch.parse = (pattern, options) => {
	  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
	  return parse(pattern, { ...options, fastpaths: false });
	};

	/**
	 * Scan a glob pattern to separate the pattern into segments.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.scan(input[, options]);
	 *
	 * const result = picomatch.scan('!./foo/*.js');
	 * console.log(result);
	 * { prefix: '!./',
	 *   input: '!./foo/*.js',
	 *   start: 3,
	 *   base: 'foo',
	 *   glob: '*.js',
	 *   isBrace: false,
	 *   isBracket: false,
	 *   isGlob: true,
	 *   isExtglob: false,
	 *   isGlobstar: false,
	 *   negated: true }
	 * ```
	 * @param {String} `input` Glob pattern to scan.
	 * @param {Object} `options`
	 * @return {Object} Returns an object with
	 * @api public
	 */

	picomatch.scan = (input, options) => scan(input, options);

	/**
	 * Compile a regular expression from the `state` object returned by the
	 * [parse()](#parse) method.
	 *
	 * @param {Object} `state`
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
	  if (returnOutput === true) {
	    return state.output;
	  }

	  const opts = options || {};
	  const prepend = opts.contains ? '' : '^';
	  const append = opts.contains ? '' : '$';

	  let source = `${prepend}(?:${state.output})${append}`;
	  if (state && state.negated === true) {
	    source = `^(?!${source}).*$`;
	  }

	  const regex = picomatch.toRegex(source, options);
	  if (returnState === true) {
	    regex.state = state;
	  }

	  return regex;
	};

	/**
	 * Create a regular expression from a parsed glob pattern.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const state = picomatch.parse('*.js');
	 * // picomatch.compileRe(state[, options]);
	 *
	 * console.log(picomatch.compileRe(state));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `state` The object returned from the `.parse` method.
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	 * @return {RegExp} Returns a regex created from the given pattern.
	 * @api public
	 */

	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
	  if (!input || typeof input !== 'string') {
	    throw new TypeError('Expected a non-empty string');
	  }

	  let parsed = { negated: false, fastpaths: true };

	  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
	    parsed.output = parse.fastpaths(input, options);
	  }

	  if (!parsed.output) {
	    parsed = parse(input, options);
	  }

	  return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};

	/**
	 * Create a regular expression from the given regex source string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.toRegex(source[, options]);
	 *
	 * const { output } = picomatch.parse('*.js');
	 * console.log(picomatch.toRegex(output));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `source` Regular expression source string.
	 * @param {Object} `options`
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.toRegex = (source, options) => {
	  try {
	    const opts = options || {};
	    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
	  } catch (err) {
	    if (options && options.debug === true) throw err;
	    return /$^/;
	  }
	};

	/**
	 * Picomatch constants.
	 * @return {Object}
	 */

	picomatch.constants = constants;

	/**
	 * Expose "picomatch"
	 */

	picomatch_1 = picomatch;
	return picomatch_1;
}

var picomatch;
var hasRequiredPicomatch;

function requirePicomatch () {
	if (hasRequiredPicomatch) return picomatch;
	hasRequiredPicomatch = 1;

	picomatch = requirePicomatch$1();
	return picomatch;
}

var picomatchExports = requirePicomatch();
var pm = /*@__PURE__*/getDefaultExportFromCjs(picomatchExports);

// Helper since Typescript can't detect readonly arrays with Array.isArray
function isArray(arg) {
    return Array.isArray(arg);
}
function ensureArray(thing) {
    if (isArray(thing))
        return thing;
    if (thing == null)
        return [];
    return [thing];
}

const normalizePath = function normalizePath(filename) {
    return filename.split(require$$0.win32.sep).join(require$$0.posix.sep);
};

function getMatcherString(id, resolutionBase) {
    if (resolutionBase === false || require$$0.isAbsolute(id) || id.startsWith('**')) {
        return normalizePath(id);
    }
    // resolve('') is valid and will default to process.cwd()
    const basePath = normalizePath(require$$0.resolve(resolutionBase || ''))
        // escape all possible (posix + win) path characters that might interfere with regex
        .replace(/[-^$*+?.()|[\]{}]/g, '\\$&');
    // Note that we use posix.join because:
    // 1. the basePath has been normalized to use /
    // 2. the incoming glob (id) matcher, also uses /
    // otherwise Node will force backslash (\) on windows
    return require$$0.posix.join(basePath, normalizePath(id));
}
const createFilter = function createFilter(include, exclude, options) {
    const resolutionBase = options && options.resolve;
    const getMatcher = (id) => id instanceof RegExp
        ? id
        : {
            test: (what) => {
                // this refactor is a tad overly verbose but makes for easy debugging
                const pattern = getMatcherString(id, resolutionBase);
                const fn = pm(pattern, { dot: true });
                const result = fn(what);
                return result;
            }
        };
    const includeMatchers = ensureArray(include).map(getMatcher);
    const excludeMatchers = ensureArray(exclude).map(getMatcher);
    return function result(id) {
        if (typeof id !== 'string')
            return false;
        if (/\0/.test(id))
            return false;
        const pathId = normalizePath(id);
        for (let i = 0; i < excludeMatchers.length; ++i) {
            const matcher = excludeMatchers[i];
            if (matcher.test(pathId))
                return false;
        }
        for (let i = 0; i < includeMatchers.length; ++i) {
            const matcher = includeMatchers[i];
            if (matcher.test(pathId))
                return true;
        }
        return !includeMatchers.length;
    };
};

const reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public';
const builtins = 'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl';
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(' '));
forbiddenIdentifiers.add('');

var core = {};

var sourcemapCodec_umd$1 = {exports: {}};

var sourcemapCodec_umd = sourcemapCodec_umd$1.exports;

var hasRequiredSourcemapCodec_umd;

function requireSourcemapCodec_umd () {
	if (hasRequiredSourcemapCodec_umd) return sourcemapCodec_umd$1.exports;
	hasRequiredSourcemapCodec_umd = 1;
	(function (module, exports) {
		(function (global, factory) {
		    factory(exports) ;
		})(sourcemapCodec_umd, (function (exports) {
		    const comma = ','.charCodeAt(0);
		    const semicolon = ';'.charCodeAt(0);
		    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		    const intToChar = new Uint8Array(64); // 64 possible chars.
		    const charToInt = new Uint8Array(128); // z is 122 in ASCII
		    for (let i = 0; i < chars.length; i++) {
		        const c = chars.charCodeAt(i);
		        intToChar[i] = c;
		        charToInt[c] = i;
		    }
		    function decodeInteger(reader, relative) {
		        let value = 0;
		        let shift = 0;
		        let integer = 0;
		        do {
		            const c = reader.next();
		            integer = charToInt[c];
		            value |= (integer & 31) << shift;
		            shift += 5;
		        } while (integer & 32);
		        const shouldNegate = value & 1;
		        value >>>= 1;
		        if (shouldNegate) {
		            value = -0x80000000 | -value;
		        }
		        return relative + value;
		    }
		    function encodeInteger(builder, num, relative) {
		        let delta = num - relative;
		        delta = delta < 0 ? (-delta << 1) | 1 : delta << 1;
		        do {
		            let clamped = delta & 0b011111;
		            delta >>>= 5;
		            if (delta > 0)
		                clamped |= 0b100000;
		            builder.write(intToChar[clamped]);
		        } while (delta > 0);
		        return num;
		    }
		    function hasMoreVlq(reader, max) {
		        if (reader.pos >= max)
		            return false;
		        return reader.peek() !== comma;
		    }

		    const bufLength = 1024 * 16;
		    // Provide a fallback for older environments.
		    const td = typeof TextDecoder !== 'undefined'
		        ? /* #__PURE__ */ new TextDecoder()
		        : typeof Buffer !== 'undefined'
		            ? {
		                decode(buf) {
		                    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
		                    return out.toString();
		                },
		            }
		            : {
		                decode(buf) {
		                    let out = '';
		                    for (let i = 0; i < buf.length; i++) {
		                        out += String.fromCharCode(buf[i]);
		                    }
		                    return out;
		                },
		            };
		    class StringWriter {
		        constructor() {
		            this.pos = 0;
		            this.out = '';
		            this.buffer = new Uint8Array(bufLength);
		        }
		        write(v) {
		            const { buffer } = this;
		            buffer[this.pos++] = v;
		            if (this.pos === bufLength) {
		                this.out += td.decode(buffer);
		                this.pos = 0;
		            }
		        }
		        flush() {
		            const { buffer, out, pos } = this;
		            return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
		        }
		    }
		    class StringReader {
		        constructor(buffer) {
		            this.pos = 0;
		            this.buffer = buffer;
		        }
		        next() {
		            return this.buffer.charCodeAt(this.pos++);
		        }
		        peek() {
		            return this.buffer.charCodeAt(this.pos);
		        }
		        indexOf(char) {
		            const { buffer, pos } = this;
		            const idx = buffer.indexOf(char, pos);
		            return idx === -1 ? buffer.length : idx;
		        }
		    }

		    const EMPTY = [];
		    function decodeOriginalScopes(input) {
		        const { length } = input;
		        const reader = new StringReader(input);
		        const scopes = [];
		        const stack = [];
		        let line = 0;
		        for (; reader.pos < length; reader.pos++) {
		            line = decodeInteger(reader, line);
		            const column = decodeInteger(reader, 0);
		            if (!hasMoreVlq(reader, length)) {
		                const last = stack.pop();
		                last[2] = line;
		                last[3] = column;
		                continue;
		            }
		            const kind = decodeInteger(reader, 0);
		            const fields = decodeInteger(reader, 0);
		            const hasName = fields & 0b0001;
		            const scope = (hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind]);
		            let vars = EMPTY;
		            if (hasMoreVlq(reader, length)) {
		                vars = [];
		                do {
		                    const varsIndex = decodeInteger(reader, 0);
		                    vars.push(varsIndex);
		                } while (hasMoreVlq(reader, length));
		            }
		            scope.vars = vars;
		            scopes.push(scope);
		            stack.push(scope);
		        }
		        return scopes;
		    }
		    function encodeOriginalScopes(scopes) {
		        const writer = new StringWriter();
		        for (let i = 0; i < scopes.length;) {
		            i = _encodeOriginalScopes(scopes, i, writer, [0]);
		        }
		        return writer.flush();
		    }
		    function _encodeOriginalScopes(scopes, index, writer, state) {
		        const scope = scopes[index];
		        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
		        if (index > 0)
		            writer.write(comma);
		        state[0] = encodeInteger(writer, startLine, state[0]);
		        encodeInteger(writer, startColumn, 0);
		        encodeInteger(writer, kind, 0);
		        const fields = scope.length === 6 ? 0b0001 : 0;
		        encodeInteger(writer, fields, 0);
		        if (scope.length === 6)
		            encodeInteger(writer, scope[5], 0);
		        for (const v of vars) {
		            encodeInteger(writer, v, 0);
		        }
		        for (index++; index < scopes.length;) {
		            const next = scopes[index];
		            const { 0: l, 1: c } = next;
		            if (l > endLine || (l === endLine && c >= endColumn)) {
		                break;
		            }
		            index = _encodeOriginalScopes(scopes, index, writer, state);
		        }
		        writer.write(comma);
		        state[0] = encodeInteger(writer, endLine, state[0]);
		        encodeInteger(writer, endColumn, 0);
		        return index;
		    }
		    function decodeGeneratedRanges(input) {
		        const { length } = input;
		        const reader = new StringReader(input);
		        const ranges = [];
		        const stack = [];
		        let genLine = 0;
		        let definitionSourcesIndex = 0;
		        let definitionScopeIndex = 0;
		        let callsiteSourcesIndex = 0;
		        let callsiteLine = 0;
		        let callsiteColumn = 0;
		        let bindingLine = 0;
		        let bindingColumn = 0;
		        do {
		            const semi = reader.indexOf(';');
		            let genColumn = 0;
		            for (; reader.pos < semi; reader.pos++) {
		                genColumn = decodeInteger(reader, genColumn);
		                if (!hasMoreVlq(reader, semi)) {
		                    const last = stack.pop();
		                    last[2] = genLine;
		                    last[3] = genColumn;
		                    continue;
		                }
		                const fields = decodeInteger(reader, 0);
		                const hasDefinition = fields & 0b0001;
		                const hasCallsite = fields & 0b0010;
		                const hasScope = fields & 0b0100;
		                let callsite = null;
		                let bindings = EMPTY;
		                let range;
		                if (hasDefinition) {
		                    const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
		                    definitionScopeIndex = decodeInteger(reader, definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0);
		                    definitionSourcesIndex = defSourcesIndex;
		                    range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
		                }
		                else {
		                    range = [genLine, genColumn, 0, 0];
		                }
		                range.isScope = !!hasScope;
		                if (hasCallsite) {
		                    const prevCsi = callsiteSourcesIndex;
		                    const prevLine = callsiteLine;
		                    callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
		                    const sameSource = prevCsi === callsiteSourcesIndex;
		                    callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
		                    callsiteColumn = decodeInteger(reader, sameSource && prevLine === callsiteLine ? callsiteColumn : 0);
		                    callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
		                }
		                range.callsite = callsite;
		                if (hasMoreVlq(reader, semi)) {
		                    bindings = [];
		                    do {
		                        bindingLine = genLine;
		                        bindingColumn = genColumn;
		                        const expressionsCount = decodeInteger(reader, 0);
		                        let expressionRanges;
		                        if (expressionsCount < -1) {
		                            expressionRanges = [[decodeInteger(reader, 0)]];
		                            for (let i = -1; i > expressionsCount; i--) {
		                                const prevBl = bindingLine;
		                                bindingLine = decodeInteger(reader, bindingLine);
		                                bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
		                                const expression = decodeInteger(reader, 0);
		                                expressionRanges.push([expression, bindingLine, bindingColumn]);
		                            }
		                        }
		                        else {
		                            expressionRanges = [[expressionsCount]];
		                        }
		                        bindings.push(expressionRanges);
		                    } while (hasMoreVlq(reader, semi));
		                }
		                range.bindings = bindings;
		                ranges.push(range);
		                stack.push(range);
		            }
		            genLine++;
		            reader.pos = semi + 1;
		        } while (reader.pos < length);
		        return ranges;
		    }
		    function encodeGeneratedRanges(ranges) {
		        if (ranges.length === 0)
		            return '';
		        const writer = new StringWriter();
		        for (let i = 0; i < ranges.length;) {
		            i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
		        }
		        return writer.flush();
		    }
		    function _encodeGeneratedRanges(ranges, index, writer, state) {
		        const range = ranges[index];
		        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, isScope, callsite, bindings, } = range;
		        if (state[0] < startLine) {
		            catchupLine(writer, state[0], startLine);
		            state[0] = startLine;
		            state[1] = 0;
		        }
		        else if (index > 0) {
		            writer.write(comma);
		        }
		        state[1] = encodeInteger(writer, range[1], state[1]);
		        const fields = (range.length === 6 ? 0b0001 : 0) | (callsite ? 0b0010 : 0) | (isScope ? 0b0100 : 0);
		        encodeInteger(writer, fields, 0);
		        if (range.length === 6) {
		            const { 4: sourcesIndex, 5: scopesIndex } = range;
		            if (sourcesIndex !== state[2]) {
		                state[3] = 0;
		            }
		            state[2] = encodeInteger(writer, sourcesIndex, state[2]);
		            state[3] = encodeInteger(writer, scopesIndex, state[3]);
		        }
		        if (callsite) {
		            const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
		            if (sourcesIndex !== state[4]) {
		                state[5] = 0;
		                state[6] = 0;
		            }
		            else if (callLine !== state[5]) {
		                state[6] = 0;
		            }
		            state[4] = encodeInteger(writer, sourcesIndex, state[4]);
		            state[5] = encodeInteger(writer, callLine, state[5]);
		            state[6] = encodeInteger(writer, callColumn, state[6]);
		        }
		        if (bindings) {
		            for (const binding of bindings) {
		                if (binding.length > 1)
		                    encodeInteger(writer, -binding.length, 0);
		                const expression = binding[0][0];
		                encodeInteger(writer, expression, 0);
		                let bindingStartLine = startLine;
		                let bindingStartColumn = startColumn;
		                for (let i = 1; i < binding.length; i++) {
		                    const expRange = binding[i];
		                    bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
		                    bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
		                    encodeInteger(writer, expRange[0], 0);
		                }
		            }
		        }
		        for (index++; index < ranges.length;) {
		            const next = ranges[index];
		            const { 0: l, 1: c } = next;
		            if (l > endLine || (l === endLine && c >= endColumn)) {
		                break;
		            }
		            index = _encodeGeneratedRanges(ranges, index, writer, state);
		        }
		        if (state[0] < endLine) {
		            catchupLine(writer, state[0], endLine);
		            state[0] = endLine;
		            state[1] = 0;
		        }
		        else {
		            writer.write(comma);
		        }
		        state[1] = encodeInteger(writer, endColumn, state[1]);
		        return index;
		    }
		    function catchupLine(writer, lastLine, line) {
		        do {
		            writer.write(semicolon);
		        } while (++lastLine < line);
		    }

		    function decode(mappings) {
		        const { length } = mappings;
		        const reader = new StringReader(mappings);
		        const decoded = [];
		        let genColumn = 0;
		        let sourcesIndex = 0;
		        let sourceLine = 0;
		        let sourceColumn = 0;
		        let namesIndex = 0;
		        do {
		            const semi = reader.indexOf(';');
		            const line = [];
		            let sorted = true;
		            let lastCol = 0;
		            genColumn = 0;
		            while (reader.pos < semi) {
		                let seg;
		                genColumn = decodeInteger(reader, genColumn);
		                if (genColumn < lastCol)
		                    sorted = false;
		                lastCol = genColumn;
		                if (hasMoreVlq(reader, semi)) {
		                    sourcesIndex = decodeInteger(reader, sourcesIndex);
		                    sourceLine = decodeInteger(reader, sourceLine);
		                    sourceColumn = decodeInteger(reader, sourceColumn);
		                    if (hasMoreVlq(reader, semi)) {
		                        namesIndex = decodeInteger(reader, namesIndex);
		                        seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
		                    }
		                    else {
		                        seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
		                    }
		                }
		                else {
		                    seg = [genColumn];
		                }
		                line.push(seg);
		                reader.pos++;
		            }
		            if (!sorted)
		                sort(line);
		            decoded.push(line);
		            reader.pos = semi + 1;
		        } while (reader.pos <= length);
		        return decoded;
		    }
		    function sort(line) {
		        line.sort(sortComparator);
		    }
		    function sortComparator(a, b) {
		        return a[0] - b[0];
		    }
		    function encode(decoded) {
		        const writer = new StringWriter();
		        let sourcesIndex = 0;
		        let sourceLine = 0;
		        let sourceColumn = 0;
		        let namesIndex = 0;
		        for (let i = 0; i < decoded.length; i++) {
		            const line = decoded[i];
		            if (i > 0)
		                writer.write(semicolon);
		            if (line.length === 0)
		                continue;
		            let genColumn = 0;
		            for (let j = 0; j < line.length; j++) {
		                const segment = line[j];
		                if (j > 0)
		                    writer.write(comma);
		                genColumn = encodeInteger(writer, segment[0], genColumn);
		                if (segment.length === 1)
		                    continue;
		                sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
		                sourceLine = encodeInteger(writer, segment[2], sourceLine);
		                sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
		                if (segment.length === 4)
		                    continue;
		                namesIndex = encodeInteger(writer, segment[4], namesIndex);
		            }
		        }
		        return writer.flush();
		    }

		    exports.decode = decode;
		    exports.decodeGeneratedRanges = decodeGeneratedRanges;
		    exports.decodeOriginalScopes = decodeOriginalScopes;
		    exports.encode = encode;
		    exports.encodeGeneratedRanges = encodeGeneratedRanges;
		    exports.encodeOriginalScopes = encodeOriginalScopes;

		    Object.defineProperty(exports, '__esModule', { value: true });

		}));
		
	} (sourcemapCodec_umd$1, sourcemapCodec_umd$1.exports));
	return sourcemapCodec_umd$1.exports;
}

var magicString_cjs;
var hasRequiredMagicString_cjs;

function requireMagicString_cjs () {
	if (hasRequiredMagicString_cjs) return magicString_cjs;
	hasRequiredMagicString_cjs = 1;

	var sourcemapCodec = requireSourcemapCodec_umd();

	class BitSet {
		constructor(arg) {
			this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
		}

		add(n) {
			this.bits[n >> 5] |= 1 << (n & 31);
		}

		has(n) {
			return !!(this.bits[n >> 5] & (1 << (n & 31)));
		}
	}

	class Chunk {
		constructor(start, end, content) {
			this.start = start;
			this.end = end;
			this.original = content;

			this.intro = '';
			this.outro = '';

			this.content = content;
			this.storeName = false;
			this.edited = false;

			{
				this.previous = null;
				this.next = null;
			}
		}

		appendLeft(content) {
			this.outro += content;
		}

		appendRight(content) {
			this.intro = this.intro + content;
		}

		clone() {
			const chunk = new Chunk(this.start, this.end, this.original);

			chunk.intro = this.intro;
			chunk.outro = this.outro;
			chunk.content = this.content;
			chunk.storeName = this.storeName;
			chunk.edited = this.edited;

			return chunk;
		}

		contains(index) {
			return this.start < index && index < this.end;
		}

		eachNext(fn) {
			let chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.next;
			}
		}

		eachPrevious(fn) {
			let chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.previous;
			}
		}

		edit(content, storeName, contentOnly) {
			this.content = content;
			if (!contentOnly) {
				this.intro = '';
				this.outro = '';
			}
			this.storeName = storeName;

			this.edited = true;

			return this;
		}

		prependLeft(content) {
			this.outro = content + this.outro;
		}

		prependRight(content) {
			this.intro = content + this.intro;
		}

		reset() {
			this.intro = '';
			this.outro = '';
			if (this.edited) {
				this.content = this.original;
				this.storeName = false;
				this.edited = false;
			}
		}

		split(index) {
			const sliceIndex = index - this.start;

			const originalBefore = this.original.slice(0, sliceIndex);
			const originalAfter = this.original.slice(sliceIndex);

			this.original = originalBefore;

			const newChunk = new Chunk(index, this.end, originalAfter);
			newChunk.outro = this.outro;
			this.outro = '';

			this.end = index;

			if (this.edited) {
				// after split we should save the edit content record into the correct chunk
				// to make sure sourcemap correct
				// For example:
				// '  test'.trim()
				//     split   -> '  ' + 'test'
				//   ✔️ edit    -> '' + 'test'
				//   ✖️ edit    -> 'test' + '' 
				// TODO is this block necessary?...
				newChunk.edit('', false);
				this.content = '';
			} else {
				this.content = originalBefore;
			}

			newChunk.next = this.next;
			if (newChunk.next) newChunk.next.previous = newChunk;
			newChunk.previous = this;
			this.next = newChunk;

			return newChunk;
		}

		toString() {
			return this.intro + this.content + this.outro;
		}

		trimEnd(rx) {
			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) return true;

			const trimmed = this.content.replace(rx, '');

			if (trimmed.length) {
				if (trimmed !== this.content) {
					this.split(this.start + trimmed.length).edit('', undefined, true);
					if (this.edited) {
						// save the change, if it has been edited
						this.edit(trimmed, this.storeName, true);
					}
				}
				return true;
			} else {
				this.edit('', undefined, true);

				this.intro = this.intro.replace(rx, '');
				if (this.intro.length) return true;
			}
		}

		trimStart(rx) {
			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) return true;

			const trimmed = this.content.replace(rx, '');

			if (trimmed.length) {
				if (trimmed !== this.content) {
					const newChunk = this.split(this.end - trimmed.length);
					if (this.edited) {
						// save the change, if it has been edited
						newChunk.edit(trimmed, this.storeName, true);
					}
					this.edit('', undefined, true);
				}
				return true;
			} else {
				this.edit('', undefined, true);

				this.outro = this.outro.replace(rx, '');
				if (this.outro.length) return true;
			}
		}
	}

	function getBtoa() {
		if (typeof globalThis !== 'undefined' && typeof globalThis.btoa === 'function') {
			return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
		} else if (typeof Buffer === 'function') {
			return (str) => Buffer.from(str, 'utf-8').toString('base64');
		} else {
			return () => {
				throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
			};
		}
	}

	const btoa = /*#__PURE__*/ getBtoa();

	class SourceMap {
		constructor(properties) {
			this.version = 3;
			this.file = properties.file;
			this.sources = properties.sources;
			this.sourcesContent = properties.sourcesContent;
			this.names = properties.names;
			this.mappings = sourcemapCodec.encode(properties.mappings);
			if (typeof properties.x_google_ignoreList !== 'undefined') {
				this.x_google_ignoreList = properties.x_google_ignoreList;
			}
		}

		toString() {
			return JSON.stringify(this);
		}

		toUrl() {
			return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
		}
	}

	function guessIndent(code) {
		const lines = code.split('\n');

		const tabbed = lines.filter((line) => /^\t+/.test(line));
		const spaced = lines.filter((line) => /^ {2,}/.test(line));

		if (tabbed.length === 0 && spaced.length === 0) {
			return null;
		}

		// More lines tabbed than spaced? Assume tabs, and
		// default to tabs in the case of a tie (or nothing
		// to go on)
		if (tabbed.length >= spaced.length) {
			return '\t';
		}

		// Otherwise, we need to guess the multiple
		const min = spaced.reduce((previous, current) => {
			const numSpaces = /^ +/.exec(current)[0].length;
			return Math.min(numSpaces, previous);
		}, Infinity);

		return new Array(min + 1).join(' ');
	}

	function getRelativePath(from, to) {
		const fromParts = from.split(/[/\\]/);
		const toParts = to.split(/[/\\]/);

		fromParts.pop(); // get dirname

		while (fromParts[0] === toParts[0]) {
			fromParts.shift();
			toParts.shift();
		}

		if (fromParts.length) {
			let i = fromParts.length;
			while (i--) fromParts[i] = '..';
		}

		return fromParts.concat(toParts).join('/');
	}

	const toString = Object.prototype.toString;

	function isObject(thing) {
		return toString.call(thing) === '[object Object]';
	}

	function getLocator(source) {
		const originalLines = source.split('\n');
		const lineOffsets = [];

		for (let i = 0, pos = 0; i < originalLines.length; i++) {
			lineOffsets.push(pos);
			pos += originalLines[i].length + 1;
		}

		return function locate(index) {
			let i = 0;
			let j = lineOffsets.length;
			while (i < j) {
				const m = (i + j) >> 1;
				if (index < lineOffsets[m]) {
					j = m;
				} else {
					i = m + 1;
				}
			}
			const line = i - 1;
			const column = index - lineOffsets[line];
			return { line, column };
		};
	}

	const wordRegex = /\w/;

	class Mappings {
		constructor(hires) {
			this.hires = hires;
			this.generatedCodeLine = 0;
			this.generatedCodeColumn = 0;
			this.raw = [];
			this.rawSegments = this.raw[this.generatedCodeLine] = [];
			this.pending = null;
		}

		addEdit(sourceIndex, content, loc, nameIndex) {
			if (content.length) {
				const contentLengthMinusOne = content.length - 1;
				let contentLineEnd = content.indexOf('\n', 0);
				let previousContentLineEnd = -1;
				// Loop through each line in the content and add a segment, but stop if the last line is empty,
				// else code afterwards would fill one line too many
				while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
					const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
					if (nameIndex >= 0) {
						segment.push(nameIndex);
					}
					this.rawSegments.push(segment);

					this.generatedCodeLine += 1;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
					this.generatedCodeColumn = 0;

					previousContentLineEnd = contentLineEnd;
					contentLineEnd = content.indexOf('\n', contentLineEnd + 1);
				}

				const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
				if (nameIndex >= 0) {
					segment.push(nameIndex);
				}
				this.rawSegments.push(segment);

				this.advance(content.slice(previousContentLineEnd + 1));
			} else if (this.pending) {
				this.rawSegments.push(this.pending);
				this.advance(content);
			}

			this.pending = null;
		}

		addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
			let originalCharIndex = chunk.start;
			let first = true;
			// when iterating each char, check if it's in a word boundary
			let charInHiresBoundary = false;

			while (originalCharIndex < chunk.end) {
				if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
					const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];

					if (this.hires === 'boundary') {
						// in hires "boundary", group segments per word boundary than per char
						if (wordRegex.test(original[originalCharIndex])) {
							// for first char in the boundary found, start the boundary by pushing a segment
							if (!charInHiresBoundary) {
								this.rawSegments.push(segment);
								charInHiresBoundary = true;
							}
						} else {
							// for non-word char, end the boundary by pushing a segment
							this.rawSegments.push(segment);
							charInHiresBoundary = false;
						}
					} else {
						this.rawSegments.push(segment);
					}
				}

				if (original[originalCharIndex] === '\n') {
					loc.line += 1;
					loc.column = 0;
					this.generatedCodeLine += 1;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
					this.generatedCodeColumn = 0;
					first = true;
				} else {
					loc.column += 1;
					this.generatedCodeColumn += 1;
					first = false;
				}

				originalCharIndex += 1;
			}

			this.pending = null;
		}

		advance(str) {
			if (!str) return;

			const lines = str.split('\n');

			if (lines.length > 1) {
				for (let i = 0; i < lines.length - 1; i++) {
					this.generatedCodeLine++;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
				}
				this.generatedCodeColumn = 0;
			}

			this.generatedCodeColumn += lines[lines.length - 1].length;
		}
	}

	const n = '\n';

	const warned = {
		insertLeft: false,
		insertRight: false,
		storeName: false,
	};

	class MagicString {
		constructor(string, options = {}) {
			const chunk = new Chunk(0, string.length, string);

			Object.defineProperties(this, {
				original: { writable: true, value: string },
				outro: { writable: true, value: '' },
				intro: { writable: true, value: '' },
				firstChunk: { writable: true, value: chunk },
				lastChunk: { writable: true, value: chunk },
				lastSearchedChunk: { writable: true, value: chunk },
				byStart: { writable: true, value: {} },
				byEnd: { writable: true, value: {} },
				filename: { writable: true, value: options.filename },
				indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
				sourcemapLocations: { writable: true, value: new BitSet() },
				storedNames: { writable: true, value: {} },
				indentStr: { writable: true, value: undefined },
				ignoreList: { writable: true, value: options.ignoreList },
			});

			this.byStart[0] = chunk;
			this.byEnd[string.length] = chunk;
		}

		addSourcemapLocation(char) {
			this.sourcemapLocations.add(char);
		}

		append(content) {
			if (typeof content !== 'string') throw new TypeError('outro content must be a string');

			this.outro += content;
			return this;
		}

		appendLeft(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

			this._split(index);

			const chunk = this.byEnd[index];

			if (chunk) {
				chunk.appendLeft(content);
			} else {
				this.intro += content;
			}
			return this;
		}

		appendRight(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

			this._split(index);

			const chunk = this.byStart[index];

			if (chunk) {
				chunk.appendRight(content);
			} else {
				this.outro += content;
			}
			return this;
		}

		clone() {
			const cloned = new MagicString(this.original, { filename: this.filename });

			let originalChunk = this.firstChunk;
			let clonedChunk = (cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone());

			while (originalChunk) {
				cloned.byStart[clonedChunk.start] = clonedChunk;
				cloned.byEnd[clonedChunk.end] = clonedChunk;

				const nextOriginalChunk = originalChunk.next;
				const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

				if (nextClonedChunk) {
					clonedChunk.next = nextClonedChunk;
					nextClonedChunk.previous = clonedChunk;

					clonedChunk = nextClonedChunk;
				}

				originalChunk = nextOriginalChunk;
			}

			cloned.lastChunk = clonedChunk;

			if (this.indentExclusionRanges) {
				cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
			}

			cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);

			cloned.intro = this.intro;
			cloned.outro = this.outro;

			return cloned;
		}

		generateDecodedMap(options) {
			options = options || {};

			const sourceIndex = 0;
			const names = Object.keys(this.storedNames);
			const mappings = new Mappings(options.hires);

			const locate = getLocator(this.original);

			if (this.intro) {
				mappings.advance(this.intro);
			}

			this.firstChunk.eachNext((chunk) => {
				const loc = locate(chunk.start);

				if (chunk.intro.length) mappings.advance(chunk.intro);

				if (chunk.edited) {
					mappings.addEdit(
						sourceIndex,
						chunk.content,
						loc,
						chunk.storeName ? names.indexOf(chunk.original) : -1,
					);
				} else {
					mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
				}

				if (chunk.outro.length) mappings.advance(chunk.outro);
			});

			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
				sources: [
					options.source ? getRelativePath(options.file || '', options.source) : options.file || '',
				],
				sourcesContent: options.includeContent ? [this.original] : undefined,
				names,
				mappings: mappings.raw,
				x_google_ignoreList: this.ignoreList ? [sourceIndex] : undefined,
			};
		}

		generateMap(options) {
			return new SourceMap(this.generateDecodedMap(options));
		}

		_ensureindentStr() {
			if (this.indentStr === undefined) {
				this.indentStr = guessIndent(this.original);
			}
		}

		_getRawIndentString() {
			this._ensureindentStr();
			return this.indentStr;
		}

		getIndentString() {
			this._ensureindentStr();
			return this.indentStr === null ? '\t' : this.indentStr;
		}

		indent(indentStr, options) {
			const pattern = /^[^\r\n]/gm;

			if (isObject(indentStr)) {
				options = indentStr;
				indentStr = undefined;
			}

			if (indentStr === undefined) {
				this._ensureindentStr();
				indentStr = this.indentStr || '\t';
			}

			if (indentStr === '') return this; // noop

			options = options || {};

			// Process exclusion ranges
			const isExcluded = {};

			if (options.exclude) {
				const exclusions =
					typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
				exclusions.forEach((exclusion) => {
					for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
						isExcluded[i] = true;
					}
				});
			}

			let shouldIndentNextCharacter = options.indentStart !== false;
			const replacer = (match) => {
				if (shouldIndentNextCharacter) return `${indentStr}${match}`;
				shouldIndentNextCharacter = true;
				return match;
			};

			this.intro = this.intro.replace(pattern, replacer);

			let charIndex = 0;
			let chunk = this.firstChunk;

			while (chunk) {
				const end = chunk.end;

				if (chunk.edited) {
					if (!isExcluded[charIndex]) {
						chunk.content = chunk.content.replace(pattern, replacer);

						if (chunk.content.length) {
							shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
						}
					}
				} else {
					charIndex = chunk.start;

					while (charIndex < end) {
						if (!isExcluded[charIndex]) {
							const char = this.original[charIndex];

							if (char === '\n') {
								shouldIndentNextCharacter = true;
							} else if (char !== '\r' && shouldIndentNextCharacter) {
								shouldIndentNextCharacter = false;

								if (charIndex === chunk.start) {
									chunk.prependRight(indentStr);
								} else {
									this._splitChunk(chunk, charIndex);
									chunk = chunk.next;
									chunk.prependRight(indentStr);
								}
							}
						}

						charIndex += 1;
					}
				}

				charIndex = chunk.end;
				chunk = chunk.next;
			}

			this.outro = this.outro.replace(pattern, replacer);

			return this;
		}

		insert() {
			throw new Error(
				'magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)',
			);
		}

		insertLeft(index, content) {
			if (!warned.insertLeft) {
				console.warn(
					'magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead',
				); // eslint-disable-line no-console
				warned.insertLeft = true;
			}

			return this.appendLeft(index, content);
		}

		insertRight(index, content) {
			if (!warned.insertRight) {
				console.warn(
					'magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead',
				); // eslint-disable-line no-console
				warned.insertRight = true;
			}

			return this.prependRight(index, content);
		}

		move(start, end, index) {
			if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');

			this._split(start);
			this._split(end);
			this._split(index);

			const first = this.byStart[start];
			const last = this.byEnd[end];

			const oldLeft = first.previous;
			const oldRight = last.next;

			const newRight = this.byStart[index];
			if (!newRight && last === this.lastChunk) return this;
			const newLeft = newRight ? newRight.previous : this.lastChunk;

			if (oldLeft) oldLeft.next = oldRight;
			if (oldRight) oldRight.previous = oldLeft;

			if (newLeft) newLeft.next = first;
			if (newRight) newRight.previous = last;

			if (!first.previous) this.firstChunk = last.next;
			if (!last.next) {
				this.lastChunk = first.previous;
				this.lastChunk.next = null;
			}

			first.previous = newLeft;
			last.next = newRight || null;

			if (!newLeft) this.firstChunk = first;
			if (!newRight) this.lastChunk = last;
			return this;
		}

		overwrite(start, end, content, options) {
			options = options || {};
			return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
		}

		update(start, end, content, options) {
			if (typeof content !== 'string') throw new TypeError('replacement content must be a string');

			if (this.original.length !== 0) {
				while (start < 0) start += this.original.length;
				while (end < 0) end += this.original.length;
			}

			if (end > this.original.length) throw new Error('end is out of bounds');
			if (start === end)
				throw new Error(
					'Cannot overwrite a zero-length range – use appendLeft or prependRight instead',
				);

			this._split(start);
			this._split(end);

			if (options === true) {
				if (!warned.storeName) {
					console.warn(
						'The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string',
					); // eslint-disable-line no-console
					warned.storeName = true;
				}

				options = { storeName: true };
			}
			const storeName = options !== undefined ? options.storeName : false;
			const overwrite = options !== undefined ? options.overwrite : false;

			if (storeName) {
				const original = this.original.slice(start, end);
				Object.defineProperty(this.storedNames, original, {
					writable: true,
					value: true,
					enumerable: true,
				});
			}

			const first = this.byStart[start];
			const last = this.byEnd[end];

			if (first) {
				let chunk = first;
				while (chunk !== last) {
					if (chunk.next !== this.byStart[chunk.end]) {
						throw new Error('Cannot overwrite across a split point');
					}
					chunk = chunk.next;
					chunk.edit('', false);
				}

				first.edit(content, storeName, !overwrite);
			} else {
				// must be inserting at the end
				const newChunk = new Chunk(start, end, '').edit(content, storeName);

				// TODO last chunk in the array may not be the last chunk, if it's moved...
				last.next = newChunk;
				newChunk.previous = last;
			}
			return this;
		}

		prepend(content) {
			if (typeof content !== 'string') throw new TypeError('outro content must be a string');

			this.intro = content + this.intro;
			return this;
		}

		prependLeft(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

			this._split(index);

			const chunk = this.byEnd[index];

			if (chunk) {
				chunk.prependLeft(content);
			} else {
				this.intro = content + this.intro;
			}
			return this;
		}

		prependRight(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

			this._split(index);

			const chunk = this.byStart[index];

			if (chunk) {
				chunk.prependRight(content);
			} else {
				this.outro = content + this.outro;
			}
			return this;
		}

		remove(start, end) {
			if (this.original.length !== 0) {
				while (start < 0) start += this.original.length;
				while (end < 0) end += this.original.length;
			}

			if (start === end) return this;

			if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
			if (start > end) throw new Error('end must be greater than start');

			this._split(start);
			this._split(end);

			let chunk = this.byStart[start];

			while (chunk) {
				chunk.intro = '';
				chunk.outro = '';
				chunk.edit('');

				chunk = end > chunk.end ? this.byStart[chunk.end] : null;
			}
			return this;
		}

		reset(start, end) {
			if (this.original.length !== 0) {
				while (start < 0) start += this.original.length;
				while (end < 0) end += this.original.length;
			}

			if (start === end) return this;

			if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
			if (start > end) throw new Error('end must be greater than start');

			this._split(start);
			this._split(end);

			let chunk = this.byStart[start];

			while (chunk) {
				chunk.reset();

				chunk = end > chunk.end ? this.byStart[chunk.end] : null;
			}
			return this;
		}

		lastChar() {
			if (this.outro.length) return this.outro[this.outro.length - 1];
			let chunk = this.lastChunk;
			do {
				if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
				if (chunk.content.length) return chunk.content[chunk.content.length - 1];
				if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
			} while ((chunk = chunk.previous));
			if (this.intro.length) return this.intro[this.intro.length - 1];
			return '';
		}

		lastLine() {
			let lineIndex = this.outro.lastIndexOf(n);
			if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
			let lineStr = this.outro;
			let chunk = this.lastChunk;
			do {
				if (chunk.outro.length > 0) {
					lineIndex = chunk.outro.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.outro + lineStr;
				}

				if (chunk.content.length > 0) {
					lineIndex = chunk.content.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.content + lineStr;
				}

				if (chunk.intro.length > 0) {
					lineIndex = chunk.intro.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.intro + lineStr;
				}
			} while ((chunk = chunk.previous));
			lineIndex = this.intro.lastIndexOf(n);
			if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
			return this.intro + lineStr;
		}

		slice(start = 0, end = this.original.length) {
			if (this.original.length !== 0) {
				while (start < 0) start += this.original.length;
				while (end < 0) end += this.original.length;
			}

			let result = '';

			// find start chunk
			let chunk = this.firstChunk;
			while (chunk && (chunk.start > start || chunk.end <= start)) {
				// found end chunk before start
				if (chunk.start < end && chunk.end >= end) {
					return result;
				}

				chunk = chunk.next;
			}

			if (chunk && chunk.edited && chunk.start !== start)
				throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);

			const startChunk = chunk;
			while (chunk) {
				if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
					result += chunk.intro;
				}

				const containsEnd = chunk.start < end && chunk.end >= end;
				if (containsEnd && chunk.edited && chunk.end !== end)
					throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);

				const sliceStart = startChunk === chunk ? start - chunk.start : 0;
				const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

				result += chunk.content.slice(sliceStart, sliceEnd);

				if (chunk.outro && (!containsEnd || chunk.end === end)) {
					result += chunk.outro;
				}

				if (containsEnd) {
					break;
				}

				chunk = chunk.next;
			}

			return result;
		}

		// TODO deprecate this? not really very useful
		snip(start, end) {
			const clone = this.clone();
			clone.remove(0, start);
			clone.remove(end, clone.original.length);

			return clone;
		}

		_split(index) {
			if (this.byStart[index] || this.byEnd[index]) return;

			let chunk = this.lastSearchedChunk;
			const searchForward = index > chunk.end;

			while (chunk) {
				if (chunk.contains(index)) return this._splitChunk(chunk, index);

				chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
			}
		}

		_splitChunk(chunk, index) {
			if (chunk.edited && chunk.content.length) {
				// zero-length edited chunks are a special case (overlapping replacements)
				const loc = getLocator(this.original)(index);
				throw new Error(
					`Cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`,
				);
			}

			const newChunk = chunk.split(index);

			this.byEnd[index] = chunk;
			this.byStart[index] = newChunk;
			this.byEnd[newChunk.end] = newChunk;

			if (chunk === this.lastChunk) this.lastChunk = newChunk;

			this.lastSearchedChunk = chunk;
			return true;
		}

		toString() {
			let str = this.intro;

			let chunk = this.firstChunk;
			while (chunk) {
				str += chunk.toString();
				chunk = chunk.next;
			}

			return str + this.outro;
		}

		isEmpty() {
			let chunk = this.firstChunk;
			do {
				if (
					(chunk.intro.length && chunk.intro.trim()) ||
					(chunk.content.length && chunk.content.trim()) ||
					(chunk.outro.length && chunk.outro.trim())
				)
					return false;
			} while ((chunk = chunk.next));
			return true;
		}

		length() {
			let chunk = this.firstChunk;
			let length = 0;
			do {
				length += chunk.intro.length + chunk.content.length + chunk.outro.length;
			} while ((chunk = chunk.next));
			return length;
		}

		trimLines() {
			return this.trim('[\\r\\n]');
		}

		trim(charType) {
			return this.trimStart(charType).trimEnd(charType);
		}

		trimEndAborted(charType) {
			const rx = new RegExp((charType || '\\s') + '+$');

			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) return true;

			let chunk = this.lastChunk;

			do {
				const end = chunk.end;
				const aborted = chunk.trimEnd(rx);

				// if chunk was trimmed, we have a new lastChunk
				if (chunk.end !== end) {
					if (this.lastChunk === chunk) {
						this.lastChunk = chunk.next;
					}

					this.byEnd[chunk.end] = chunk;
					this.byStart[chunk.next.start] = chunk.next;
					this.byEnd[chunk.next.end] = chunk.next;
				}

				if (aborted) return true;
				chunk = chunk.previous;
			} while (chunk);

			return false;
		}

		trimEnd(charType) {
			this.trimEndAborted(charType);
			return this;
		}
		trimStartAborted(charType) {
			const rx = new RegExp('^' + (charType || '\\s') + '+');

			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) return true;

			let chunk = this.firstChunk;

			do {
				const end = chunk.end;
				const aborted = chunk.trimStart(rx);

				if (chunk.end !== end) {
					// special case...
					if (chunk === this.lastChunk) this.lastChunk = chunk.next;

					this.byEnd[chunk.end] = chunk;
					this.byStart[chunk.next.start] = chunk.next;
					this.byEnd[chunk.next.end] = chunk.next;
				}

				if (aborted) return true;
				chunk = chunk.next;
			} while (chunk);

			return false;
		}

		trimStart(charType) {
			this.trimStartAborted(charType);
			return this;
		}

		hasChanged() {
			return this.original !== this.toString();
		}

		_replaceRegexp(searchValue, replacement) {
			function getReplacement(match, str) {
				if (typeof replacement === 'string') {
					return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
						// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
						if (i === '$') return '$';
						if (i === '&') return match[0];
						const num = +i;
						if (num < match.length) return match[+i];
						return `$${i}`;
					});
				} else {
					return replacement(...match, match.index, str, match.groups);
				}
			}
			function matchAll(re, str) {
				let match;
				const matches = [];
				while ((match = re.exec(str))) {
					matches.push(match);
				}
				return matches;
			}
			if (searchValue.global) {
				const matches = matchAll(searchValue, this.original);
				matches.forEach((match) => {
					if (match.index != null) {
						const replacement = getReplacement(match, this.original);
						if (replacement !== match[0]) {
							this.overwrite(
								match.index,
								match.index + match[0].length,
								replacement
							);
						}
					}
				});
			} else {
				const match = this.original.match(searchValue);
				if (match && match.index != null) {
					const replacement = getReplacement(match, this.original);
					if (replacement !== match[0]) {
						this.overwrite(
							match.index,
							match.index + match[0].length,
							replacement
						);
					}
				}
			}
			return this;
		}

		_replaceString(string, replacement) {
			const { original } = this;
			const index = original.indexOf(string);

			if (index !== -1) {
				this.overwrite(index, index + string.length, replacement);
			}

			return this;
		}

		replace(searchValue, replacement) {
			if (typeof searchValue === 'string') {
				return this._replaceString(searchValue, replacement);
			}

			return this._replaceRegexp(searchValue, replacement);
		}

		_replaceAllString(string, replacement) {
			const { original } = this;
			const stringLength = string.length;
			for (
				let index = original.indexOf(string);
				index !== -1;
				index = original.indexOf(string, index + stringLength)
			) {
				const previous = original.slice(index, index + stringLength);
				if (previous !== replacement)
					this.overwrite(index, index + stringLength, replacement);
			}

			return this;
		}

		replaceAll(searchValue, replacement) {
			if (typeof searchValue === 'string') {
				return this._replaceAllString(searchValue, replacement);
			}

			if (!searchValue.global) {
				throw new TypeError(
					'MagicString.prototype.replaceAll called with a non-global RegExp argument',
				);
			}

			return this._replaceRegexp(searchValue, replacement);
		}
	}

	const hasOwnProp = Object.prototype.hasOwnProperty;

	class Bundle {
		constructor(options = {}) {
			this.intro = options.intro || '';
			this.separator = options.separator !== undefined ? options.separator : '\n';
			this.sources = [];
			this.uniqueSources = [];
			this.uniqueSourceIndexByFilename = {};
		}

		addSource(source) {
			if (source instanceof MagicString) {
				return this.addSource({
					content: source,
					filename: source.filename,
					separator: this.separator,
				});
			}

			if (!isObject(source) || !source.content) {
				throw new Error(
					'bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`',
				);
			}

			['filename', 'ignoreList', 'indentExclusionRanges', 'separator'].forEach((option) => {
				if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
			});

			if (source.separator === undefined) {
				// TODO there's a bunch of this sort of thing, needs cleaning up
				source.separator = this.separator;
			}

			if (source.filename) {
				if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
					this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
					this.uniqueSources.push({ filename: source.filename, content: source.content.original });
				} else {
					const uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
					if (source.content.original !== uniqueSource.content) {
						throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
					}
				}
			}

			this.sources.push(source);
			return this;
		}

		append(str, options) {
			this.addSource({
				content: new MagicString(str),
				separator: (options && options.separator) || '',
			});

			return this;
		}

		clone() {
			const bundle = new Bundle({
				intro: this.intro,
				separator: this.separator,
			});

			this.sources.forEach((source) => {
				bundle.addSource({
					filename: source.filename,
					content: source.content.clone(),
					separator: source.separator,
				});
			});

			return bundle;
		}

		generateDecodedMap(options = {}) {
			const names = [];
			let x_google_ignoreList = undefined;
			this.sources.forEach((source) => {
				Object.keys(source.content.storedNames).forEach((name) => {
					if (!~names.indexOf(name)) names.push(name);
				});
			});

			const mappings = new Mappings(options.hires);

			if (this.intro) {
				mappings.advance(this.intro);
			}

			this.sources.forEach((source, i) => {
				if (i > 0) {
					mappings.advance(this.separator);
				}

				const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1;
				const magicString = source.content;
				const locate = getLocator(magicString.original);

				if (magicString.intro) {
					mappings.advance(magicString.intro);
				}

				magicString.firstChunk.eachNext((chunk) => {
					const loc = locate(chunk.start);

					if (chunk.intro.length) mappings.advance(chunk.intro);

					if (source.filename) {
						if (chunk.edited) {
							mappings.addEdit(
								sourceIndex,
								chunk.content,
								loc,
								chunk.storeName ? names.indexOf(chunk.original) : -1,
							);
						} else {
							mappings.addUneditedChunk(
								sourceIndex,
								chunk,
								magicString.original,
								loc,
								magicString.sourcemapLocations,
							);
						}
					} else {
						mappings.advance(chunk.content);
					}

					if (chunk.outro.length) mappings.advance(chunk.outro);
				});

				if (magicString.outro) {
					mappings.advance(magicString.outro);
				}

				if (source.ignoreList && sourceIndex !== -1) {
					if (x_google_ignoreList === undefined) {
						x_google_ignoreList = [];
					}
					x_google_ignoreList.push(sourceIndex);
				}
			});

			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
				sources: this.uniqueSources.map((source) => {
					return options.file ? getRelativePath(options.file, source.filename) : source.filename;
				}),
				sourcesContent: this.uniqueSources.map((source) => {
					return options.includeContent ? source.content : null;
				}),
				names,
				mappings: mappings.raw,
				x_google_ignoreList,
			};
		}

		generateMap(options) {
			return new SourceMap(this.generateDecodedMap(options));
		}

		getIndentString() {
			const indentStringCounts = {};

			this.sources.forEach((source) => {
				const indentStr = source.content._getRawIndentString();

				if (indentStr === null) return;

				if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
				indentStringCounts[indentStr] += 1;
			});

			return (
				Object.keys(indentStringCounts).sort((a, b) => {
					return indentStringCounts[a] - indentStringCounts[b];
				})[0] || '\t'
			);
		}

		indent(indentStr) {
			if (!arguments.length) {
				indentStr = this.getIndentString();
			}

			if (indentStr === '') return this; // noop

			let trailingNewline = !this.intro || this.intro.slice(-1) === '\n';

			this.sources.forEach((source, i) => {
				const separator = source.separator !== undefined ? source.separator : this.separator;
				const indentStart = trailingNewline || (i > 0 && /\r?\n$/.test(separator));

				source.content.indent(indentStr, {
					exclude: source.indentExclusionRanges,
					indentStart, //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
				});

				trailingNewline = source.content.lastChar() === '\n';
			});

			if (this.intro) {
				this.intro =
					indentStr +
					this.intro.replace(/^[^\n]/gm, (match, index) => {
						return index > 0 ? indentStr + match : match;
					});
			}

			return this;
		}

		prepend(str) {
			this.intro = str + this.intro;
			return this;
		}

		toString() {
			const body = this.sources
				.map((source, i) => {
					const separator = source.separator !== undefined ? source.separator : this.separator;
					const str = (i > 0 ? separator : '') + source.content.toString();

					return str;
				})
				.join('');

			return this.intro + body;
		}

		isEmpty() {
			if (this.intro.length && this.intro.trim()) return false;
			if (this.sources.some((source) => !source.content.isEmpty())) return false;
			return true;
		}

		length() {
			return this.sources.reduce(
				(length, source) => length + source.content.length(),
				this.intro.length,
			);
		}

		trimLines() {
			return this.trim('[\\r\\n]');
		}

		trim(charType) {
			return this.trimStart(charType).trimEnd(charType);
		}

		trimStart(charType) {
			const rx = new RegExp('^' + (charType || '\\s') + '+');
			this.intro = this.intro.replace(rx, '');

			if (!this.intro) {
				let source;
				let i = 0;

				do {
					source = this.sources[i++];
					if (!source) {
						break;
					}
				} while (!source.content.trimStartAborted(charType));
			}

			return this;
		}

		trimEnd(charType) {
			const rx = new RegExp((charType || '\\s') + '+$');

			let source;
			let i = this.sources.length - 1;

			do {
				source = this.sources[i--];
				if (!source) {
					this.intro = this.intro.replace(rx, '');
					break;
				}
			} while (!source.content.trimEndAborted(charType));

			return this;
		}
	}

	MagicString.Bundle = Bundle;
	MagicString.SourceMap = SourceMap;
	MagicString.default = MagicString; // work around TypeScript bug https://github.com/Rich-Harris/magic-string/pull/121

	magicString_cjs = MagicString;
	
	return magicString_cjs;
}

var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;

	var MagicString = requireMagicString_cjs();

	const optionDefaults = {
	    appEntry: undefined,
	    handleMobile: true,
	    transformPixels: true
	};
	const handleMobileDefaults = {
	    ignoreSelectors: [],
	    centralizeText: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
	    breakpoint: '480px'
	};
	const transformPixelsDefault = {
	    ignoreAttributes: [],
	    ignoreSelectors: []
	};

	const htmlTagBaseFontSize = 16;
	const ignoreResponsiveAppClass = 'ignore-responsive-app';
	const indexHtmlFile = '/index.html';
	const appEntryPoints = [indexHtmlFile, '/app.js', '/main.js', 'bundle.js', 'src/index.js'];
	const browserFontSizeDiffVarName = '--browser-font-size-diff';

	const cssSelectorRegExp = /([.#\w\-\s,:]+)\s*\{([^}]+?)\}/gs;
	function getRemValue(value) {
	    return (value / htmlTagBaseFontSize).toFixed(4).replace(/[.,]0+$/, "");
	}
	function getPropertyRemValue(value) {
	    return value.replace(/[0-9]+px/g, (match) => {
	        return getRemValue(Number(match.replace('px', ''))) + 'rem';
	    });
	}
	function transformPixels(code, options) {
	    const cssMap = new Map();
	    let match;
	    const curatedCode = code.replace(/\\n/g, '');
	    while ((match = cssSelectorRegExp.exec(curatedCode)) !== null) {
	        const selector = match[1].trim();
	        const propValue = match[2].trim();
	        if (options.ignoreSelectors.some(i => selector.includes(i))) {
	            continue;
	        }
	        const pxProperties = [];
	        const properties = propValue.split(';');
	        properties.forEach((property) => {
	            const arr = property.split(':');
	            const key = arr[0].trim();
	            const value = (arr[1] || '').trim();
	            if (value && value.includes('px') && !options.ignoreAttributes.includes(key)) {
	                pxProperties.push({ key, value });
	            }
	        });
	        if (pxProperties.length > 0) {
	            cssMap.set(selector, pxProperties);
	        }
	    }
	    let transformationDefinitions = '';
	    if (cssMap.size > 0) {
	        cssMap.forEach((properties, key) => {
	            transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){`;
	            properties.forEach((prop, index) => {
	                const isLast = index === properties.length - 1;
	                const isFontSizeKey = ['fontSize', 'font-size'].includes(prop.key);
	                let propValue = getPropertyRemValue(prop.value);
	                if (isFontSizeKey) {
	                    propValue = `calc(${getPropertyRemValue(prop.value)} + var(${browserFontSizeDiffVarName}))`;
	                }
	                transformationDefinitions += `${prop.key}:${propValue}${isLast ? '' : ';'}`;
	            });
	            transformationDefinitions += '}';
	        });
	    }
	    return transformationDefinitions;
	}
	function handleMobile(code, options) {
	    const selectors = new Set();
	    let match;
	    while ((match = cssSelectorRegExp.exec(code)) !== null) {
	        const selector = match[1].trim();
	        const properties = match[2].trim();
	        if (options.ignoreSelectors.some(i => selector.includes(i))) {
	            continue;
	        }
	        const propertiesString = properties.replace(/ /g, '');
	        const requiresRule = propertiesString.includes('display:flex') && !propertiesString.includes('flex-direction:column');
	        if (requiresRule) {
	            selectors.add(selector);
	        }
	    }
	    let transformationDefinitions = '';
	    if (selectors.size > 0) {
	        transformationDefinitions = `@media only screen and (max-width: ${options.breakpoint}) and (orientation: portrait){`;
	        selectors.forEach((key) => {
	            transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){flex-direction: column; flex-wrap: nowrap; margin-left: 0; margin-right: 0}`;
	        });
	        transformationDefinitions += '}';
	    }
	    return transformationDefinitions;
	}
	function findInsertionIndex(str) {
	    const openingQuoteStatements = [
	        'const __vite__css = "',
	        'export default "'
	    ];
	    let closingQuoteIndex = -1;
	    let searchString;
	    let startIndex;
	    do {
	        searchString = openingQuoteStatements.pop();
	        startIndex = searchString ? str.indexOf(searchString) : -1;
	        if (searchString && startIndex !== -1) {
	            const openQuoteIndex = startIndex + searchString.length - 1;
	            closingQuoteIndex = str.indexOf('"', openQuoteIndex + 1);
	        }
	    } while (searchString && startIndex === -1);
	    return closingQuoteIndex;
	}
	var cssHandler = (options, code, id) => {
	    const transformPixelsParams = {
	        ...transformPixelsDefault,
	        ...(typeof options.transformPixels === 'object' ? options.transformPixels : {})
	    };
	    const handleMobileParams = {
	        ...handleMobileDefaults,
	        ...(typeof options.handleMobile === 'object' ? options.handleMobile : {})
	    };
	    let transformedCode = '';
	    transformedCode += options.transformPixels ? transformPixels(code, transformPixelsParams) : '';
	    transformedCode += options.handleMobile ? handleMobile(code, handleMobileParams) : '';
	    if (transformedCode) {
	        const magicString = new MagicString(code);
	        const index = findInsertionIndex(code);
	        if (index !== -1) {
	            magicString.prependLeft(index, transformedCode);
	        }
	        else if (code.charAt(code.length - 1) === '"') {
	            magicString.replace(/"$/, `${transformedCode}"`);
	        }
	        else {
	            magicString.append(transformedCode);
	        }
	        return {
	            code: magicString.toString(),
	            transformations: transformedCode,
	            map: magicString.generateMap({
	                source: id,
	                file: id,
	                includeContent: true
	            })
	        };
	    }
	    return null;
	};

	var queries = `
:root {
  --v-rem: 32;
}
@media (orientation: landscape) and (max-width: 2480px), (orientation: landscape) and (max-height: 1395px) {
  :root {
    --v-rem: 31;
 }
}
@media (orientation: landscape) and (max-width: 2400px), (orientation: landscape) and (max-height: 1350px) {
  :root {
    --v-rem: 30;
 }
}
@media (orientation: landscape) and (max-width: 2320px), (orientation: landscape) and (max-height: 1305px) {
  :root {
    --v-rem: 29;
 }
}
@media (orientation: landscape) and (max-width: 2240px), (orientation: landscape) and (max-height: 1260px) {
  :root {
    --v-rem: 28;
 }
}
@media (orientation: landscape) and (max-width: 2160px), (orientation: landscape) and (max-height: 1215px) {
  :root {
    --v-rem: 27;
 }
}
@media (orientation: landscape) and (max-width: 2080px), (orientation: landscape) and (max-height: 1170px) {
  :root {
    --v-rem: 26;
 }
}
@media (orientation: landscape) and (max-width: 2000px), (orientation: landscape) and (max-height: 1125px) {
  :root {
    --v-rem: 25;
 }
}
@media (orientation: landscape) and (max-width: 1920px), (orientation: landscape) and (max-height: 1080px) {
  :root {
    --v-rem: 24;
 }
}
@media (orientation: landscape) and (max-width: 1840px), (orientation: landscape) and (max-height: 1035px) {
  :root {
    --v-rem: 23;
 }
}
@media (orientation: landscape) and (max-width: 1760px), (orientation: landscape) and (max-height: 990px) {
  :root {
    --v-rem: 22;
 }
}
@media (orientation: landscape) and (max-width: 1680px), (orientation: landscape) and (max-height: 945px) {
  :root {
    --v-rem: 21;
 }
}
@media (orientation: landscape) and (max-width: 1600px), (orientation: landscape) and (max-height: 900px) {
  :root {
    --v-rem: 20;
 }
}
@media (orientation: landscape) and (max-width: 1520px), (orientation: landscape) and (max-height: 855px) {
  :root {
    --v-rem: 19;
 }
}
@media (orientation: landscape) and (max-width: 1440px), (orientation: landscape) and (max-height: 810px) {
  :root {
    --v-rem: 18;
 }
}
@media (orientation: landscape) and (max-width: 1320px), (orientation: landscape) and (max-height: 720px) {
  :root {
    --v-rem: 17;
 }
}
@media (orientation: landscape) and (max-width: 1200px), (orientation: landscape) and (max-height: 675px) {
  :root {
    --v-rem: 16;
 }
}
@media (orientation: landscape) and (max-width: 1080px), (orientation: landscape) and (max-height: 630px) {
  :root {
    --v-rem: 15;
 }
}
@media (orientation: landscape) and (max-width: 960px), (orientation: landscape) and (max-height: 540px) {
  :root {
    --v-rem: 14;
 }
}
@media (orientation: landscape) and (max-width: 840px), (orientation: landscape) and (max-height: 495px) {
  :root {
    --v-rem: 13;
 }
}
@media (orientation: landscape) and (max-width: 720px), (orientation: landscape) and (max-height: 450px) {
  :root {
    --v-rem: 12;
 }
}
@media (orientation: landscape) and (max-width: 600px), (orientation: landscape) and (max-height: 360px) {
  :root {
    --v-rem: 11;
 }
}
@media (orientation: landscape) and (max-width: 480px), (orientation: landscape) and (max-height: 315px) {
  :root {
    --v-rem: 10;
 }
}
@media (orientation: landscape) and (max-width: 480px), (orientation: landscape) and (max-height: 270px) {
  :root {
    --v-rem: 9;
 }
}
@media (orientation: landscape) and (max-width: 360px), (orientation: landscape) and (max-height: 180px) {
  :root {
    --v-rem: 8;
 }
}
@media (orientation: landscape) and (max-width: 240px), (orientation: landscape) and (max-height: 135px) {
  :root {
    --v-rem: 7;
 }
}
@media (orientation: landscape) and (max-width: 120px), (orientation: landscape) and (max-height: 90px) {
  :root {
    --v-rem: 6;
 }
}
@media (orientation: portrait) and (max-width: 1395px), (orientation: portrait) and (max-height: 2480px) {
  :root {
    --v-rem: 31;
 }
}
@media (orientation: portrait) and (max-width: 1350px), (orientation: portrait) and (max-height: 2400px) {
  :root {
    --v-rem: 30;
 }
}
@media (orientation: portrait) and (max-width: 1305px), (orientation: portrait) and (max-height: 2320px) {
  :root {
    --v-rem: 29;
 }
}
@media (orientation: portrait) and (max-width: 1260px), (orientation: portrait) and (max-height: 2240px) {
  :root {
    --v-rem: 28;
 }
}
@media (orientation: portrait) and (max-width: 1215px), (orientation: portrait) and (max-height: 2160px) {
  :root {
    --v-rem: 27;
 }
}
@media (orientation: portrait) and (max-width: 1170px), (orientation: portrait) and (max-height: 2080px) {
  :root {
    --v-rem: 26;
 }
}
@media (orientation: portrait) and (max-width: 1125px), (orientation: portrait) and (max-height: 2000px) {
  :root {
    --v-rem: 25;
 }
}
@media (orientation: portrait) and (max-width: 1080px), (orientation: portrait) and (max-height: 1920px) {
  :root {
    --v-rem: 24;
 }
}
@media (orientation: portrait) and (max-width: 1035px), (orientation: portrait) and (max-height: 1840px) {
  :root {
    --v-rem: 23;
 }
}
@media (orientation: portrait) and (max-width: 990px), (orientation: portrait) and (max-height: 1760px) {
  :root {
    --v-rem: 22;
 }
}
@media (orientation: portrait) and (max-width: 945px), (orientation: portrait) and (max-height: 1680px) {
  :root {
    --v-rem: 21;
 }
}
@media (orientation: portrait) and (max-width: 900px), (orientation: portrait) and (max-height: 1600px) {
  :root {
    --v-rem: 20;
 }
}
@media (orientation: portrait) and (max-width: 855px), (orientation: portrait) and (max-height: 1520px) {
  :root {
    --v-rem: 19;
 }
}
@media (orientation: portrait) and (max-width: 810px), (orientation: portrait) and (max-height: 1440px) {
  :root {
    --v-rem: 18;
 }
}
@media (orientation: portrait) and (max-width: 740px), (orientation: portrait) and (max-height: 1280px) {
  :root {
    --v-rem: 17;
 }
}
@media (orientation: portrait) and (max-width: 675px), (orientation: portrait) and (max-height: 1200px) {
  :root {
    --v-rem: 16;
 }
}
@media (orientation: portrait) and (max-width: 630px), (orientation: portrait) and (max-height: 1120px) {
  :root {
    --v-rem: 15;
 }
}
@media (orientation: portrait) and (max-width: 540px), (orientation: portrait) and (max-height: 960px) {
  :root {
    --v-rem: 14;
 }
}
@media (orientation: portrait) and (max-width: 495px), (orientation: portrait) and (max-height: 880px) {
  :root {
    --v-rem: 13;
 }
}
@media (orientation: portrait) and (max-width: 450px), (orientation: portrait) and (max-height: 800px) {
  :root {
    --v-rem: 12;
 }
}
@media (orientation: portrait) and (max-width: 360px), (orientation: portrait) and (max-height: 640px) {
  :root {
    --v-rem: 11;
 }
}
@media (orientation: portrait) and (max-width: 315px), (orientation: portrait) and (max-height: 560px) {
  :root {
    --v-rem: 10;
 }
}
@media (orientation: portrait) and (max-width: 270px), (orientation: portrait) and (max-height: 480px) {
  :root {
    --v-rem: 9;
 }
}
@media (orientation: portrait) and (max-width: 180px), (orientation: portrait) and (max-height: 320px) {
  :root {
    --v-rem: 8;
 }
}
@media (orientation: portrait) and (max-width: 135px), (orientation: portrait) and (max-height: 240px) {
  :root {
    --v-rem: 7;
 }
}
@media (orientation: portrait) and (max-width: 90px), (orientation: portrait) and (max-height: 160px) {
  :root {
    --v-rem: 6;
 }
}
`;

	var getResponsiveScript = (mobileQueries, transformations) => {
	    return `
    if (typeof window !== 'undefined') {
      const baseFontSize = 16
    
      const updateHtmlFontSize = function() {
        const htmlElement = document.querySelector('html');
        htmlElement.style.removeProperty('font-size');
        const browserFontSize = window.getComputedStyle(htmlElement).getPropertyValue('font-size');

        const browserDifference = Number(browserFontSize.replace('px', '')) - baseFontSize;
        document.documentElement.style.setProperty('${browserFontSizeDiffVarName}', browserDifference + 'px')

        const vRem = window.getComputedStyle(document.documentElement).getPropertyValue('--v-rem');
        htmlElement.style.setProperty('font-size', vRem + 'px')
      }

      const addVirtualRemQueries = function() {
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app', 'true')
        style.textContent = \"${queries.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const addMobileCentralization = function() {
        if ('${mobileQueries}' === 'null') return
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app-mobile', 'true')
        style.textContent = \"${mobileQueries.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const addTransformations = function() {
        if ('${transformations}' === 'undefined' || '${transformations}' === '') return
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app-transformations', 'true')
        style.textContent = \"${transformations.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const initResponsive = function() {
        window.addEventListener('resize', updateHtmlFontSize)
        addVirtualRemQueries()
        addMobileCentralization()
        addTransformations()
        updateHtmlFontSize()
      }

      if (window.document.readyState !== 'loading') {
        initResponsive();
      } else {
        window.document.addEventListener('DOMContentLoaded', function() {
          initResponsive();
        });
      }
    }`;
	};

	function getMobileQueries(options) {
	    if (!options.handleMobile)
	        return null;
	    const params = {
	        ...handleMobileDefaults,
	        ...(typeof options.handleMobile === 'object' ? options.handleMobile : {})
	    };
	    let queries = `@media (orientation: portrait) and (max-width: ${params.breakpoint}) {`;
	    params.centralizeText.forEach(function (selector) {
	        queries += `${selector}:not(.${ignoreResponsiveAppClass}) { text-align: center }`;
	    });
	    queries += '}';
	    return queries;
	}
	var jsHandler = (options, code, id, transformations) => {
	    const magicString = new MagicString(code);
	    const isHtmlFile = id.includes(indexHtmlFile);
	    const mobileQueries = getMobileQueries(options);
	    if (isHtmlFile) {
	        const index = code.indexOf('</body>');
	        magicString.prependLeft(index, `<script>${getResponsiveScript(mobileQueries, transformations)}</script>`);
	    }
	    else {
	        magicString.append(`\n\n(function() {\n${getResponsiveScript(mobileQueries, transformations)}\n}())`);
	    }
	    return {
	        code: magicString.toString(),
	        map: magicString.generateMap({
	            source: id,
	            file: id,
	            includeContent: true
	        })
	    };
	};

	function isDefaultEntryPoint(options, name) {
	    return !options.appEntry && appEntryPoints.some(i => name.includes(i)) && !name.includes('/server');
	}

	core.handleCss = cssHandler;
	core.handleJs = jsHandler;
	core.isDefaultEntryPoint = isDefaultEntryPoint;
	core.optionDefaults = optionDefaults;
	return core;
}

var coreExports = requireCore();

let hasAddedScript = false;
const transformedCssFiles = new Set();
function index (data) {
    const options = {
        ...coreExports.optionDefaults,
        ...(data || {})
    };
    return {
        name: 'responsive-app-rollup-plugin',
        transform: {
            order: 'post',
            handler(code, id) {
                if ((options.handleMobile || options.transformPixels) && id.includes('.css') && !transformedCssFiles.has(id)) {
                    transformedCssFiles.add(id);
                    return coreExports.handleCss(options, code, id);
                }
                const isOptionEntryPoint = options.appEntry && id.includes(options.appEntry);
                if (!hasAddedScript && (isOptionEntryPoint || coreExports.isDefaultEntryPoint(options, id))) {
                    hasAddedScript = true;
                    return coreExports.handleJs(options, code, id);
                }
                return null;
            },
        },
        async generateBundle(bundleOptions, bundle) {
            const cssFilter = createFilter('**/*.css');
            for (const id of Object.keys(bundle)) {
                if (cssFilter(id)) {
                    const cssAsset = bundle[id];
                    if (cssAsset && cssAsset.type === 'asset' && !transformedCssFiles.has(id)) {
                        const cssBuffer = cssAsset.source;
                        const cssContent = typeof cssBuffer === 'string' ? cssBuffer : (Buffer.from(cssBuffer)).toString();
                        const transformedCSS = coreExports.handleCss(options, cssContent, id);
                        if (transformedCSS) {
                            transformedCssFiles.add(id);
                            cssAsset.source = transformedCSS.code;
                        }
                    }
                }
            }
        }
    };
}

module.exports = index;
