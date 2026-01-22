import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Radio label */
  label?: ReactNode;
  /** Size of the radio */
  size?: BearSize;
  /** Color variant */
  variant?: BearVariant;
  /** Custom color override */
  color?: string;
  /** Whether radio is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text shown below */
  helperText?: string;
  /** Test ID */
  testId?: string;
}

export interface RadioGroupProps {
  /** Group name for all radios */
  name: string;
  /** Current selected value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Radio options */
  children?: ReactNode;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Size applied to all radios */
  size?: BearSize;
  /** Variant applied to all radios */
  variant?: BearVariant;
  /** Whether all radios are disabled */
  disabled?: boolean;
  /** Gap between items */
  gap?: number;
  /** Label for the group */
  label?: ReactNode;
  /** Error state for the group */
  error?: boolean;
  /** Helper text for the group */
  helperText?: string;
  /** Additional class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

