import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Switch label */
  label?: string;
  /** Whether switch is checked */
  checked?: boolean;
  /** Callback when switch changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to show when unchecked (on left side) */
  uncheckedIcon?: ReactNode;
  /** Icon to show when checked (on right side) */
  checkedIcon?: ReactNode;
  /** Show icons inside thumb */
  showIconsInThumb?: boolean;
  /** Additional class names */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Element ID */
  id?: string;
}

