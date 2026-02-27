import type { InputHTMLAttributes, ReactNode } from 'react';

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
  /** Left addon */
  leftAddon?: ReactNode;
  /** Right addon */
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
}

