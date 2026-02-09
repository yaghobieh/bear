import type { HTMLAttributes } from 'react';
import type { BearSize, BearVariant } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BearVariant | 'neutral';
  /** Badge size */
  size?: Exclude<BearSize, 'xl'>;
  /** Whether badge is pill shaped */
  pill?: boolean;
  /** Whether badge has a dot indicator */
  dot?: boolean;
  /** Test ID */
  testId?: string;
}

