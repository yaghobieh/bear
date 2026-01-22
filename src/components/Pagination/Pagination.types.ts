import { HTMLAttributes } from 'react';
import { BearSize, BearVariant } from '../../types';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of pages */
  count: number;
  /** Current page (1-indexed) */
  page?: number;
  /** Default page for uncontrolled mode */
  defaultPage?: number;
  /** Number of pages to show at the boundaries */
  boundaryCount?: number;
  /** Number of pages to show around current page */
  siblingCount?: number;
  /** Size of pagination buttons */
  size?: BearSize;
  /** Variant style */
  variant?: 'text' | 'outlined' | 'contained';
  /** Color theme */
  color?: BearVariant;
  /** Shape of buttons */
  shape?: 'circular' | 'rounded';
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Show previous/next buttons */
  showPrevNext?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when page changes */
  onChange?: (page: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

