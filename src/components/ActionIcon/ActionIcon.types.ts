import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ActionIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'filled' | 'outline' | 'subtle' | 'transparent';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  disabled?: boolean;
  testId?: string;
}
