import type { CSSProperties } from 'react';

/**
 * Supported programming languages
 */
export type CodeEditorLanguage =
  | 'javascript'
  | 'typescript'
  | 'jsx'
  | 'tsx'
  | 'html'
  | 'css'
  | 'json'
  | 'python'
  | 'markdown'
  | 'sql'
  | 'shell'
  | 'yaml'
  | 'xml'
  | 'plaintext';

/**
 * Syntax token type for highlighting
 */
export type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'function'
  | 'variable'
  | 'tag'
  | 'attribute'
  | 'property'
  | 'builtin'
  | 'regex'
  | 'boolean'
  | 'null'
  | 'type'
  | 'default';

/**
 * Token from syntax analysis
 */
export interface SyntaxToken {
  type: TokenType;
  value: string;
}

/**
 * Theme colors for the editor
 */
export interface CodeEditorTheme {
  background: string;
  foreground: string;
  cursor: string;
  selection: string;
  lineNumber: string;
  lineNumberActive: string;
  gutterBackground: string;
  gutterBorder: string;
  tokens: Partial<Record<TokenType, string>>;
}

export interface CodeEditorProps {
  /** Current value */
  value: string;
  /** Called on value change */
  onChange?: (value: string) => void;
  /** Programming language for syntax highlighting */
  language?: CodeEditorLanguage;
  /** Editor theme ('dark' | 'light') */
  theme?: 'dark' | 'light';
  /** Custom theme overrides */
  customTheme?: Partial<CodeEditorTheme>;
  /** Placeholder text */
  placeholder?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show gutter (line number area) */
  showGutter?: boolean;
  /** Highlight active line */
  highlightActiveLine?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Font size in px */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Tab size (spaces) */
  tabSize?: number;
  /** Auto-indent on new line */
  autoIndent?: boolean;
  /** Auto-close brackets */
  autoCloseBrackets?: boolean;
  /** Word wrap */
  wordWrap?: boolean;
  /** Min height */
  minHeight?: string | number;
  /** Max height */
  maxHeight?: string | number;
  /** Height */
  height?: string | number;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID */
  testId?: string;
  /** Called on focus */
  onFocus?: () => void;
  /** Called on blur */
  onBlur?: () => void;
}
