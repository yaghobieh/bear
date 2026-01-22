import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Checkbox label */
  label?: ReactNode;
  /** Size of the checkbox */
  size?: BearSize;
  /** Color variant */
  variant?: BearVariant;
  /** Custom color override */
  color?: string;
  /** Whether checkbox is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Whether checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Whether checkbox is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text shown below */
  helperText?: string;
  /** Callback when checkbox changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Test ID */
  testId?: string;
}

