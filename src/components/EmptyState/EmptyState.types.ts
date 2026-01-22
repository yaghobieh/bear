import { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
}

