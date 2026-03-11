import type { ReactNode, HTMLAttributes } from 'react';

export type BlockquoteColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface BlockquoteProps extends HTMLAttributes<HTMLElement> {
  cite?: string;
  icon?: ReactNode;
  color?: BlockquoteColor;
  children: ReactNode;
  testId?: string;
}
