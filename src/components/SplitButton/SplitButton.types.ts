import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface SplitButtonOption {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick: () => void;
}

export interface SplitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon?: ReactNode;
  options: SplitButtonOption[];
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  dropdownAlign?: 'left' | 'right';
  testId?: string;
}
