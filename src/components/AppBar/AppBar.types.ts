import type { ReactNode } from 'react';

export type AppBarPosition = 'fixed' | 'sticky' | 'static' | 'relative';
export type AppBarVariant = 'default' | 'transparent' | 'blur';
export type AppBarColor = 'default' | 'primary' | 'dark';

export interface AppBarProps {
  testId?: string;
  id?: string;
  children?: ReactNode;
  position?: AppBarPosition;
  variant?: AppBarVariant;
  color?: AppBarColor;
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
  elevation?: boolean;
  dense?: boolean;
  disableGutters?: boolean;
  enableColorOnDark?: boolean;
}
