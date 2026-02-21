import type { ElementType } from 'react';
import type { BuiltInTypographyVariant } from './Typography.types';

/** Default variant when not specified */
export const DEFAULT_VARIANT: BuiltInTypographyVariant = 'body1';

/** Default color when not specified */
export const DEFAULT_COLOR = 'primary';

/** Map from built-in variant to HTML element type */
export const VARIANT_MAP: Record<BuiltInTypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
  inherit: 'span',
};

/** Tailwind classes per built-in variant (supports dark mode) */
export const VARIANT_CLASSES: Record<BuiltInTypographyVariant, string> = {
  h1: 'bear-text-5xl bear-font-bold bear-tracking-tight',
  h2: 'bear-text-4xl bear-font-bold bear-tracking-tight',
  h3: 'bear-text-3xl bear-font-semibold',
  h4: 'bear-text-2xl bear-font-semibold',
  h5: 'bear-text-xl bear-font-medium',
  h6: 'bear-text-lg bear-font-medium',
  subtitle1: 'bear-text-lg bear-font-normal',
  subtitle2: 'bear-text-base bear-font-medium',
  body1: 'bear-text-base bear-font-normal',
  body2: 'bear-text-sm bear-font-normal',
  caption: 'bear-text-xs',
  overline: 'bear-text-xs bear-uppercase bear-tracking-wider',
  code: 'bear-text-sm bear-font-mono bear-bg-gray-100 dark:bear-bg-gray-800 bear-px-1.5 bear-py-0.5 bear-rounded',
  inherit: '',
};

/** Font weight class names */
export const WEIGHT_CLASSES: Record<string, string> = {
  thin: 'bear-font-thin',
  light: 'bear-font-light',
  normal: 'bear-font-normal',
  medium: 'bear-font-medium',
  semibold: 'bear-font-semibold',
  bold: 'bear-font-bold',
  extrabold: 'bear-font-extrabold',
};

/** Numeric font weight values */
export const WEIGHT_VALUES: Record<string, number> = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

/** Text alignment classes */
export const ALIGN_CLASSES: Record<string, string> = {
  left: 'bear-text-left',
  center: 'bear-text-center',
  right: 'bear-text-right',
  justify: 'bear-text-justify',
};

/** Text color classes (light and dark mode) */
export const COLOR_CLASSES: Record<string, string> = {
  primary: 'bear-text-gray-900 dark:bear-text-gray-100',
  secondary: 'bear-text-gray-600 dark:bear-text-gray-400',
  muted: 'bear-text-gray-400 dark:bear-text-gray-500',
  success: 'bear-text-green-600 dark:bear-text-green-400',
  danger: 'bear-text-red-600 dark:bear-text-red-400',
  warning: 'bear-text-amber-600 dark:bear-text-amber-400',
};

/** Line height classes */
export const LINE_HEIGHT_CLASSES: Record<string, string> = {
  tight: 'bear-leading-tight',
  normal: 'bear-leading-normal',
  relaxed: 'bear-leading-relaxed',
  loose: 'bear-leading-loose',
};

/** List of built-in variant names for validation */
export const BUILT_IN_VARIANTS: BuiltInTypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2', 'body1', 'body2',
  'caption', 'overline', 'code', 'inherit',
];
