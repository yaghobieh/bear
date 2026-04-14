import type { ReactNode } from 'react';
import type { InputProps } from '../Input/Input.types';

export interface CurrencyInputProps extends Omit<InputProps, 'onChange' | 'value' | 'type'> {
  /** Current numeric value */
  value?: number;
  /** Change handler receiving the numeric value */
  onChange?: (value: number | undefined) => void;
  /** Currency code (e.g. 'USD', 'EUR', 'GBP') or a custom ReactNode for the symbol */
  currency?: string | ReactNode;
  /** Locale for formatting */
  locale?: string;
  /** Maximum decimals */
  decimals?: number;
  /** Allow negative values */
  allowNegative?: boolean;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Test ID */
  testId?: string;
}
