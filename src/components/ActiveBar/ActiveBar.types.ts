import { HTMLAttributes, ReactNode } from 'react';

export interface ActiveBarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

export interface ActiveBarProps extends HTMLAttributes<HTMLDivElement> {
  items: ActiveBarItem[];
  activeId?: string;
  onItemClick?: (item: ActiveBarItem) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  animated?: boolean;
}

