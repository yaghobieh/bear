import type { HTMLAttributes, ReactNode, ElementType } from 'react';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline' | 'code';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant;
  /** HTML element to render as */
  component?: ElementType;
  /** Text alignment */
  align?: TypographyAlign;
  /** Font weight override */
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  /** Text color */
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'warning' | string;
  /** Whether text should truncate with ellipsis */
  truncate?: boolean;
  /** Max lines before truncation (requires truncate) */
  maxLines?: number;
  /** Make text italic */
  italic?: boolean;
  /** Make text underlined */
  underline?: boolean;
  /** Make text strikethrough */
  strikethrough?: boolean;
  /** Disable text wrapping */
  noWrap?: boolean;
  /** Whether to render as inline element */
  inline?: boolean;
  /** Paragraph mode (adds bottom margin) */
  paragraph?: boolean;
  /** Custom line height */
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /** Content */
  children?: ReactNode;
  /** Test ID */
  testId?: string;
}

