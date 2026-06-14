import type { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchOrientation = 'horizontal' | 'vertical';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  orientation?: SwitchOrientation;
  uncheckedIcon?: ReactNode;
  checkedIcon?: ReactNode;
  showIconsInThumb?: boolean;
  className?: string;
  testId?: string;
  id?: string;
}

export interface SwitchGroupOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SwitchGroupProps {
  value: string;
  options: SwitchGroupOption[];
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  orientation?: SwitchOrientation;
  disabled?: boolean;
  className?: string;
  testId?: string;
  'aria-label'?: string;
}

