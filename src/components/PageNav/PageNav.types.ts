import type { ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface PageNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface PageNavProps {
  prev?: PageNavItem | null;
  next?: PageNavItem | null;
  size?: BearSize;
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  testId?: string;
  'aria-label'?: string;
}
