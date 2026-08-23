import type { HTMLAttributes, ReactNode } from 'react';
import type { ActiveBarVariant, CompactBearSize } from '@types';

export type { ActiveBarVariant, CompactBearSize };

export interface ActiveBarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

export interface ActiveBarProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string;
  id?: string;
  items: ActiveBarItem[];
  activeId?: string;
  onItemClick?: (item: ActiveBarItem) => void;
  variant?: ActiveBarVariant;
  size?: CompactBearSize;
  fullWidth?: boolean;
  animated?: boolean;
}
