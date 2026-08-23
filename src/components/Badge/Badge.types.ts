import type { HTMLAttributes } from 'react';
import type { BearSize, BearVariant } from '@types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  id?: string;
  variant?: BearVariant | 'neutral';
  size?: Exclude<BearSize, 'xl'>;
  pill?: boolean;
  dot?: boolean;
  testId?: string;
}
