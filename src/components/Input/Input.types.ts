import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ValidationRule } from '../Form/Form.types';

export type AutoFormatType =
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'titleCase'
  | 'sentenceCase'
  | 'none';

export interface InputPropsInput {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Success message (green helper text) */
  success?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Start/end slots (takes precedence over leftAddon/rightAddon when set) */
  InputProps?: InputPropsInput;
  /** Left addon (legacy; use InputProps.startAdornment for start slot) */
  leftAddon?: ReactNode;
  /** Right addon (legacy; use InputProps.endAdornment for end slot) */
  rightAddon?: ReactNode;
  /** Whether input is full width */
  fullWidth?: boolean;
  /** Show a clear (X) button when input has value */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Show live character count (requires maxLength or charCountMax) */
  showCharCount?: boolean;
  /** Max chars for counter display (alternative to maxLength when you don't want native enforcement) */
  charCountMax?: number;
  /** Auto-format text on change using Anvil string utils */
  autoFormat?: AutoFormatType;
  /** Validation rules (reuses Form's ValidationRule) */
  validation?: ValidationRule;
  /** Run validation on blur (default true when validation is set) */
  validateOnBlur?: boolean;
  /** Run validation on change */
  validateOnChange?: boolean;
}
