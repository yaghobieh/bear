/**
 * Rating Component Types
 * 
 * @module Rating
 */
import type { HTMLAttributes } from 'react';
import type { BearSize } from '../../types';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value */
  value?: number;
  /** Default rating value (uncontrolled) */
  defaultValue?: number;
  /** Maximum rating value */
  max?: number;
  /** Rating size */
  size?: BearSize;
  /** Whether rating is read-only */
  readOnly?: boolean;
  /** Whether rating is disabled */
  disabled?: boolean;
  /** Precision for half stars (1 or 0.5) */
  precision?: 1 | 0.5;
  /** Color of filled stars */
  color?: string;
  /** Empty star color */
  emptyColor?: string;
  /** Custom filled icon */
  filledIcon?: React.ReactNode;
  /** Custom empty icon */
  emptyIcon?: React.ReactNode;
  /** Custom half icon */
  halfIcon?: React.ReactNode;
  /** Whether to highlight on hover */
  highlightOnHover?: boolean;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Show rating label */
  showLabel?: boolean;
  /** Custom label formatter */
  formatLabel?: (value: number) => string;
  /** Test ID */
  testId?: string;
}
