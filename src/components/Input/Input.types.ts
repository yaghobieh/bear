import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ValidationRule } from '../Form/Form.types';

export type AutoFormatType =
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'titleCase'
  | 'sentenceCase'
  | 'none';

export type InputVariant = 'outline' | 'filled' | 'underline';

export type InputRadius = 'default' | 'pill' | 'square' | 'none';

export interface InputPropsInput {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onCopy'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: InputVariant;
  radius?: InputRadius;
  InputProps?: InputPropsInput;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showCharCount?: boolean;
  charCountMax?: number;
  autoFormat?: AutoFormatType;
  validation?: ValidationRule;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  loading?: boolean;
  copyable?: boolean;
  onCopy?: (value: string) => void;
  floatingLabel?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  readOnly?: boolean;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  id?: string;
  testId?: string;
}
