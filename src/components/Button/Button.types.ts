import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BearSize, BearVariant } from '../../types';
import type { BisProp } from '../../types/bis.types';
import type { TypographyVariant } from '../Typography/Typography.types';

export type ButtonRadius = 'default' | 'pill' | 'square' | 'none';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'prefix'> {
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
  /** Text to display while loading (replaces children during loading) */
  loadingText?: string;
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
  /**
   * Typography variant for the button label (e.g. h1, h2, body1).
   * Use with BearProvider customTypography to add your own variants.
   * @default 'inherit'
   */
  textVariant?: TypographyVariant;
  /** Enable mouse-follow spotlight hover effect */
  spotlight?: boolean;
  /** Spotlight color (default: rgba(255, 255, 255, 0.15)) */
  spotlightColor?: string;
  /** Spotlight size in pixels (default: 120) */
  spotlightSize?: number;
  iconOnly?: boolean;
  /** Border radius preset */
  radius?: ButtonRadius;
  /** Enable material-design-style ripple effect on click */
  ripple?: boolean;
  /** Shorthand tooltip — renders a native title attribute and Bear Tooltip wrapper */
  tooltip?: string;
  /** Compact mode — reduces padding for dense layouts */
  compact?: boolean;
  /** Gradient background — array of two colors, overrides variant bg */
  gradient?: [string, string];
  /** Gradient direction in degrees (default: 135) */
  gradientDirection?: number;
  /** Prefix content rendered before children inside the button */
  prefix?: ReactNode;
  /** Suffix content rendered after children inside the button */
  suffix?: ReactNode;
  /** Test ID for testing */
  testId?: string;
  /** Bear Inner Style - sx-like overrides */
  bis?: BisProp;
  /** Inline styles */
  style?: React.CSSProperties;
}
