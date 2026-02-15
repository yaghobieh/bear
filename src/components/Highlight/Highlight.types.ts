import type { HTMLAttributes, ReactNode } from 'react';

export type HighlightColor = 'primary' | 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';

export interface HighlightProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content to highlight */
  children?: ReactNode;
  /** Highlight color — 'primary' uses theme color from BearProvider */
  color?: HighlightColor;
  /** Whether to animate with pulse */
  animated?: boolean;
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
