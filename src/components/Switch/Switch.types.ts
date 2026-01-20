import type { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Switch label */
  label?: string;
  /** Whether switch is checked */
  checked?: boolean;
  /** Callback when switch changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
}

