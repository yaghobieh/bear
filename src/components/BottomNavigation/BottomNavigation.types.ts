import { ReactNode } from 'react';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  value?: string;
  onChange?: (id: string) => void;
  showLabels?: boolean | 'always' | 'active';
  variant?: 'default' | 'elevated' | 'transparent';
  className?: string;
}

