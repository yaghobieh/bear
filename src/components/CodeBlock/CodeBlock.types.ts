import { HTMLAttributes } from 'react';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** Code content to display */
  code: string;
  /** Programming language for display label */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Title displayed in header */
  title?: string;
  /** Show copy button */
  copyable?: boolean;
  /** Maximum height with scroll */
  maxHeight?: number | string;
  /** Theme: 'auto' follows system, 'light' or 'dark' forces theme */
  theme?: 'auto' | 'dark' | 'light';
  /** Test ID for testing */
  testId?: string;
  /** Element ID */
  id?: string;
}

