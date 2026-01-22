import { HTMLAttributes } from 'react';
import { BearSize, BearVariant } from '../../types';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size of the slider */
  size?: BearSize;
  /** Color theme */
  color?: BearVariant;
  /** Whether to show value label */
  showValue?: boolean;
  /** Whether to show marks at steps */
  marks?: boolean | { value: number; label?: string }[];
  /** Disabled state */
  disabled?: boolean;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Callback when slider is released */
  onChangeCommitted?: (value: number) => void;
  /** Format function for value display */
  valueFormatter?: (value: number) => string;
  /** Label for accessibility */
  ariaLabel?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

