import type { ReactNode, HTMLAttributes } from 'react';
import type { BearVariant, BearSize } from '../../types';

export interface BackTopProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Distance from bottom of viewport */
  bottom?: number | string;
  /** Distance from right of viewport */
  right?: number | string;
  /** Show threshold - scroll distance before button appears */
  visibleAt?: number;
  /** Scroll duration in ms */
  duration?: number;
  /** Target element to scroll (defaults to window) */
  target?: () => HTMLElement | null;
  /** Custom icon or content */
  children?: ReactNode;
  /** Button size - uses Bear Button sizes */
  size?: Extract<BearSize, 'sm' | 'md' | 'lg'>;
  /** Button variant - uses Bear Button variants */
  variant?: BearVariant;
  /** Show/hide animation */
  animated?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Callback when clicked */
  onClick?: () => void;
}
