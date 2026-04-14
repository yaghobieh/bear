import type { HTMLAttributes } from 'react';
import type { TypographyProps } from '../Typography/Typography.types';

export interface AnimatedCounterProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Target value to count to */
  value: number;
  /** Starting value */
  from?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Decimal places */
  decimals?: number;
  /** Prefix string (e.g. '$') */
  prefix?: string;
  /** Suffix string (e.g. '%') */
  suffix?: string;
  /** Thousand separator */
  separator?: string;
  /** Easing function */
  easing?: 'linear' | 'easeOut' | 'easeInOut';
  /** Start animation when element enters viewport */
  animateOnView?: boolean;
  /** Typography props for the number */
  typographyProps?: Partial<TypographyProps>;
  /** Test ID */
  testId?: string;
}
