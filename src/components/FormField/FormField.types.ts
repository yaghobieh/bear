import type { InputHTMLAttributes, ReactNode } from 'react';

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Floating label text */
  label: string;
  /** Helper text below the field */
  helperText?: string;
  /** Error message (replaces helperText, turns border red) */
  error?: string;
  /** Success message (turns border green) */
  success?: string;
  /** Field size */
  size?: 'sm' | 'md' | 'lg';
  /** Left addon inside the field */
  leftAddon?: ReactNode;
  /** Right addon inside the field */
  rightAddon?: ReactNode;
  /** Full width mode */
  fullWidth?: boolean;
  /** Whether the field is required (shows asterisk in label) */
  required?: boolean;
  /** Variant of the floating label */
  variant?: 'outlined' | 'filled' | 'standard';
}
