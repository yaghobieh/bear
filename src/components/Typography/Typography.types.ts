import type { HTMLAttributes, ReactNode, ElementType } from 'react';

/** Built-in typography variants */
export type BuiltInTypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline' | 'code'
  | 'inherit';

/** Typography variant - can be built-in or custom (string) */
export type TypographyVariant = BuiltInTypographyVariant | (string & {});

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Custom typography variant definition
 * Define your own text styles like "b250", "display1", etc.
 */
export interface CustomTypography {
  /** Font size in px, rem, or em (e.g., "25px", "1.5rem") */
  fontSize?: string;
  /** Font weight */
  fontWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | number;
  /** Line height (e.g., "1.2", "1.5", "32px") */
  lineHeight?: string;
  /** Letter spacing (e.g., "0.05em", "1px") */
  letterSpacing?: string;
  /** Text transform */
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Font family override */
  fontFamily?: string;
  /** HTML element to render as */
  component?: ElementType;
}

/** Map of custom typography variants */
export type CustomTypographyMap = {
  [key: string]: CustomTypography;
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant - built-in or custom */
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

