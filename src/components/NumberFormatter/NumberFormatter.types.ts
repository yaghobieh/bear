import type { HTMLAttributes } from 'react';

export type NumberFormatStyle = 'decimal' | 'currency' | 'percent' | 'compact' | 'unit';

export interface NumberFormatterProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  formatStyle?: NumberFormatStyle;
  locale?: string;
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol';
  unit?: string;
  unitDisplay?: 'short' | 'long' | 'narrow';
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  prefix?: string;
  suffix?: string;
  animated?: boolean;
  animationDuration?: number;
  testId?: string;
}
