import { HTMLAttributes } from 'react';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  copyable?: boolean;
  maxHeight?: number | string;
  theme?: 'dark' | 'light';
}

