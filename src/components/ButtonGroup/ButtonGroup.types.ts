import type { HTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Button elements */
  children: ReactNode;
  /** Size applied to all buttons */
  size?: BearSize;
  /** Variant applied to all buttons */
  variant?: BearVariant | 'outline' | 'ghost';
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Whether all buttons are disabled */
  disabled?: boolean;
  /** Whether buttons should be full width */
  fullWidth?: boolean;
  /** Test ID */
  testId?: string;
}

