import type { ReactNode } from 'react';

export type EmptyStatePreset =
  | 'empty'
  | 'search'
  | 'inbox'
  | 'error'
  | 'no-data'
  | '404'
  | 'offline'
  | 'filter-empty';

export interface EmptyStateProps {
  testId?: string;
  id?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  preset?: EmptyStatePreset;
}
