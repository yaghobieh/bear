import type { HTMLAttributes, ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Text to display in the middle of the divider */
  children?: ReactNode;
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Variant style */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Color of the divider */
  color?: string;
  /** Text alignment when children present */
  textAlign?: 'left' | 'center' | 'right';
  /** Thickness of the divider line */
  thickness?: number;
  /** Spacing around the divider */
  spacing?: number;
  /** Test ID */
  testId?: string;
}

