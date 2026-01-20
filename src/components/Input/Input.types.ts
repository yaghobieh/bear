import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Left addon */
  leftAddon?: ReactNode;
  /** Right addon */
  rightAddon?: ReactNode;
  /** Whether input is full width */
  fullWidth?: boolean;
}

