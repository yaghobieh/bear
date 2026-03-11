import type { ReactNode, HTMLAttributes } from 'react';

export interface CheckboxCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

export interface CheckboxCardGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  children: ReactNode;
  columns?: number;
  gap?: number;
  testId?: string;
}
