import type { HTMLAttributes } from 'react';
import type { EmberSize, EmberVariant } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: EmberVariant | 'neutral';
  /** Badge size */
  size?: Exclude<EmberSize, 'xl'>;
  /** Whether badge is pill shaped */
  pill?: boolean;
  /** Whether badge has a dot indicator */
  dot?: boolean;
  /** Test ID */
  testId?: string;
}

