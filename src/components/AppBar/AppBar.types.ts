import { ReactNode } from 'react';

export interface AppBarProps {
  testId?: string;
  id?: string;
  children?: ReactNode;
  position?: 'fixed' | 'sticky' | 'static' | 'relative';
  variant?: 'default' | 'transparent' | 'blur';
  color?: 'default' | 'primary' | 'dark';
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
  elevation?: boolean;
}

