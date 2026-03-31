import type { ReactNode } from 'react';
import type { BearVariant, BearSize } from '../../types';

export interface ThemeIconProps {
  /** The icon element to render inside */
  children: ReactNode;
  /** Color variant */
  variant?: BearVariant | (string & {});
  /** Size of the wrapper */
  size?: BearSize | number;
  /** Border radius style */
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Gradient background (overrides variant) */
  gradient?: { from: string; to: string; deg?: number };
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
