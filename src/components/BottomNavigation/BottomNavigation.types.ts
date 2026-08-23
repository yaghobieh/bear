import { ReactNode } from 'react';

export type BottomNavigationVariant = 'default' | 'elevated' | 'transparent';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomNavigationProps {
  testId?: string;
  id?: string;
  items: BottomNavItem[];
  value?: string;
  onChange?: (id: string) => void;
  showLabels?: boolean | 'always' | 'active';
  variant?: BottomNavigationVariant;
  className?: string;
}

