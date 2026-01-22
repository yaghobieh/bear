import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BearVariant } from '../../types';

export interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon or content */
  children: ReactNode;
  /** Size of the FAB */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: BearVariant;
  /** Custom color override */
  color?: string;
  /** Extended FAB with label */
  extended?: boolean;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center' | 'relative';
  /** Whether FAB is disabled */
  disabled?: boolean;
  /** Show shadow */
  shadow?: boolean;
  /** Animation on hover */
  animated?: boolean;
  /** Test ID */
  testId?: string;
}

