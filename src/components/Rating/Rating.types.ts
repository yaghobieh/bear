import { HTMLAttributes, ReactNode } from 'react';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value (0-max) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Maximum rating value */
  max?: number;
  /** Size of rating icons */
  size?: RatingSize;
  /** Called when value changes */
  onChange?: (value: number) => void;
  /** Allow half values */
  allowHalf?: boolean;
  /** Allow clearing the rating */
  allowClear?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Custom filled icon */
  filledIcon?: ReactNode;
  /** Custom empty icon */
  emptyIcon?: ReactNode;
  /** Custom half-filled icon */
  halfIcon?: ReactNode;
  /** Color of filled stars */
  color?: string;
  /** Color of empty stars */
  emptyColor?: string;
  /** Show value text */
  showValue?: boolean;
  /** Custom label formatter */
  labelFormatter?: (value: number) => string;
  /** Test ID */
  testId?: string;
  /** Accessibility labels for each rating */
  labels?: string[];
}
