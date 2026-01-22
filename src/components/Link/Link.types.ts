import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { BearVariant } from '../../types';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link color variant */
  variant?: BearVariant | 'inherit';
  /** Whether link has underline */
  underline?: 'none' | 'hover' | 'always';
  /** Custom color override */
  color?: string;
  /** Whether link opens in new tab */
  external?: boolean;
  /** Whether to show external icon */
  showExternalIcon?: boolean;
  /** Link content */
  children?: ReactNode;
  /** Test ID */
  testId?: string;
}

