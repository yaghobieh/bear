import type { HTMLAttributes } from 'react';
import type { TypographyProps } from '../Typography/Typography.types';

export type AnimatedCounterEasing = 'linear' | 'easeOut' | 'easeInOut';

export interface AnimatedCounterProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  id?: string;
  value: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  easing?: AnimatedCounterEasing;
  animateOnView?: boolean;
  typographyProps?: Partial<TypographyProps>;
  testId?: string;
}
