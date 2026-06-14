import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  selected?: boolean;
  size?: BearSize;
  fullWidth?: boolean;
  id?: string;
  testId?: string;
  children?: ReactNode;
}

export interface ToggleButtonGroupProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  exclusive?: boolean;
  size?: BearSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  testId?: string;
  children?: ReactNode;
}

export interface ToggleButtonContextValue {
  selectedValues: string[];
  toggleValue: (value: string) => void;
  size: BearSize;
  disabled: boolean;
}
