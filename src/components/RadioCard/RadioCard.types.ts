import type { ReactNode, HTMLAttributes } from 'react';

export interface RadioCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

export interface RadioCardGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  columns?: number;
  gap?: number;
  name?: string;
  testId?: string;
}
