import { ReactNode } from 'react';

export interface ChipProps {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'soft';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  avatar?: ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

