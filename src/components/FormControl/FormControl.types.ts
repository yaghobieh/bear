import type { HTMLAttributes, ReactNode } from 'react';

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
  testId?: string;
  children?: ReactNode;
}

export interface FormControlContextValue {
  disabled: boolean;
  error: boolean;
  required: boolean;
  labelId?: string;
  helperId?: string;
}
