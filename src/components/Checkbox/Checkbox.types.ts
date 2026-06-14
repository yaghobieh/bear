import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';

export type CheckboxIndicator = 'check' | 'x' | 'minus';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id?: string;
  label?: ReactNode;
  size?: BearSize;
  variant?: BearVariant;
  color?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  indicator?: CheckboxIndicator;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
}

