import type { ReactNode } from 'react';

export type GradientDirection =
  | 'to-r' | 'to-l' | 'to-t' | 'to-b'
  | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';

export type GradientPreset =
  | 'primary' | 'sunset' | 'ocean' | 'forest'
  | 'fire' | 'purple' | 'neon' | 'candy'
  | 'aurora' | 'midnight';

export interface GradientTextProps {
  /** Content to render with gradient */
  children: ReactNode;
  /** Gradient preset name */
  preset?: GradientPreset | (string & {});
  /** Custom colors array (overrides preset) */
  colors?: string[];
  /** Gradient direction */
  direction?: GradientDirection;
  /** Whether to animate the gradient */
  animate?: boolean;
  /** Animation speed in seconds */
  animationSpeed?: number;
  /** HTML tag to render */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
