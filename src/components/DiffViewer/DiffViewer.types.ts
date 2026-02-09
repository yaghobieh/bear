/**
 * DiffViewer component types
 */

export type DiffViewMode = 'split' | 'unified';
export type DiffLineType = 'add' | 'remove' | 'context';

export interface DiffViewerProps {
  /** Original text (left side) */
  oldValue: string;
  /** New text (right side) */
  newValue: string;
  /** View mode (default: 'split') */
  viewMode?: DiffViewMode;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Highlight syntax (for code) */
  syntaxHighlight?: boolean;
  /** Language for syntax highlighting */
  language?: string;
  /** Old value title */
  oldTitle?: string;
  /** New value title */
  newTitle?: string;
  /** Show diff statistics */
  showStats?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface DiffLine {
  type: DiffLineType;
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
}
