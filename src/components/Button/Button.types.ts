import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';
import type { BisProp } from '../../types/bis.types';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * Button variant style
   * Can be a built-in variant or a custom variant defined in BearProvider
   * @example
   * ```tsx
   * // Built-in variants
   * <Button variant="primary">Primary</Button>
   * <Button variant="success">Success</Button>
   * 
   * // Custom variant (defined in BearProvider's customVariants)
   * <Button variant="redBrand">Custom</Button>
   * ```
   */
  variant?: BearVariant | (string & {});
  /** Button size */
  size?: BearSize;
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
  /** Enable mouse-follow spotlight hover effect */
  spotlight?: boolean;
  /** Spotlight color (default: rgba(255, 255, 255, 0.15)) */
  spotlightColor?: string;
  /** Spotlight size in pixels (default: 120) */
  spotlightSize?: number;
  /** Test ID for testing */
  testId?: string;
  /** Bear Inner Style - sx-like overrides */
  bis?: BisProp;
  /** Inline styles */
  style?: React.CSSProperties;
}
