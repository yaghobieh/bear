import type { CodeEditorTheme, CodeEditorLanguage } from './CodeEditor.types';

/** Default font size */
export const DEFAULT_FONT_SIZE = 14;

/** Default font family */
export const DEFAULT_FONT_FAMILY = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace";

/** Default tab size */
export const DEFAULT_TAB_SIZE = 2;

/** Gutter width */
export const GUTTER_WIDTH = 56;

/** Line height multiplier */
export const LINE_HEIGHT = 1.6;

/** Dark theme */
export const DARK_THEME: CodeEditorTheme = {
  background: '#1e1e2e',
  foreground: '#cdd6f4',
  cursor: '#f5e0dc',
  selection: 'rgba(137, 180, 250, 0.2)',
  lineNumber: '#585b70',
  lineNumberActive: '#a6adc8',
  gutterBackground: '#181825',
  gutterBorder: '#313244',
  tokens: {
    keyword: '#cba6f7',
    string: '#a6e3a1',
    number: '#fab387',
    comment: '#6c7086',
    operator: '#89dceb',
    punctuation: '#a6adc8',
    function: '#89b4fa',
    variable: '#f5e0dc',
    tag: '#f38ba8',
    attribute: '#f9e2af',
    property: '#89b4fa',
    builtin: '#f5c2e7',
    regex: '#a6e3a1',
    boolean: '#fab387',
    null: '#f38ba8',
    type: '#f9e2af',
    default: '#cdd6f4',
  },
};

/** Light theme */
export const LIGHT_THEME: CodeEditorTheme = {
  background: '#eff1f5',
  foreground: '#4c4f69',
  cursor: '#dc8a78',
  selection: 'rgba(114, 135, 253, 0.15)',
  lineNumber: '#9ca0b0',
  lineNumberActive: '#4c4f69',
  gutterBackground: '#e6e9ef',
  gutterBorder: '#ccd0da',
  tokens: {
    keyword: '#8839ef',
    string: '#40a02b',
    number: '#fe640b',
    comment: '#9ca0b0',
    operator: '#04a5e5',
    punctuation: '#6c6f85',
    function: '#1e66f5',
    variable: '#dc8a78',
    tag: '#d20f39',
    attribute: '#df8e1d',
    property: '#1e66f5',
    builtin: '#ea76cb',
    regex: '#40a02b',
    boolean: '#fe640b',
    null: '#d20f39',
    type: '#df8e1d',
    default: '#4c4f69',
  },
};

/** Auto-close pairs */
export const AUTO_CLOSE_PAIRS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '"': '"',
  "'": "'",
  '`': '`',
};

/** Keywords per language */
export const LANGUAGE_KEYWORDS: Partial<Record<CodeEditorLanguage, string[]>> = {
  javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'delete', 'typeof', 'instanceof', 'in', 'of', 'class', 'extends', 'super', 'this', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield', 'void', 'null', 'undefined', 'true', 'false', 'NaN', 'Infinity'],
  typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'delete', 'typeof', 'instanceof', 'in', 'of', 'class', 'extends', 'super', 'this', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield', 'void', 'null', 'undefined', 'true', 'false', 'interface', 'type', 'enum', 'implements', 'abstract', 'private', 'protected', 'public', 'readonly', 'static', 'as', 'is', 'keyof', 'never', 'unknown', 'any', 'string', 'number', 'boolean', 'object', 'symbol', 'bigint'],
  jsx: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'super', 'null', 'undefined', 'true', 'false'],
  tsx: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'super', 'null', 'undefined', 'true', 'false', 'interface', 'type', 'enum', 'as', 'is', 'keyof'],
  python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'pass', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'global', 'nonlocal', 'assert', 'del', 'in', 'not', 'and', 'or', 'is', 'True', 'False', 'None', 'async', 'await', 'self'],
  html: ['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'input', 'button', 'form', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'header', 'footer', 'nav', 'main', 'article', 'aside', 'script', 'style', 'link', 'meta'],
  css: ['color', 'background', 'margin', 'padding', 'border', 'display', 'position', 'width', 'height', 'font', 'text', 'flex', 'grid', 'align', 'justify', 'overflow', 'transition', 'animation', 'transform', 'opacity', 'z-index', 'box-shadow', 'cursor'],
  sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'BETWEEN', 'LIKE', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'SET', 'VALUES', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'],
  json: [],
  markdown: [],
  shell: ['echo', 'cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'sed', 'awk', 'find', 'chmod', 'chown', 'export', 'source', 'alias', 'if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'case', 'esac', 'function', 'return', 'exit', 'sudo', 'apt', 'npm', 'yarn', 'git'],
};

/** Builtin functions */
export const BUILTIN_FUNCTIONS: string[] = [
  'console', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number',
  'Boolean', 'Date', 'RegExp', 'Error', 'Map', 'Set', 'Promise',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'fetch', 'require',
  'document', 'window', 'navigator', 'alert', 'confirm', 'prompt',
];
