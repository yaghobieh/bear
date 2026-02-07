import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { EmberSize, EmberVariant } from '../../types';
import type { BisProp } from '../../types/bis.types';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Button variant style */
  variant?: EmberVariant;
  /** Button size */
  size?: EmberSize;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Icon (shorthand for leftIcon or rightIcon based on iconPosition) */
  icon?: ReactNode;
  /** Position of icon when using icon prop (default: left) */
  iconPosition?: 'left' | 'right';
  /** Icon to show before text */
  leftIcon?: ReactNode;
  /** Icon to show after text */
  rightIcon?: ReactNode;
  /** Test ID for testing */
  testId?: string;
  /** Bear Inner Style - sx-like overrides */
  bis?: BisProp;
  /** Inline styles */
  style?: React.CSSProperties;
}

