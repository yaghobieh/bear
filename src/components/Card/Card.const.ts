import type { BearSize } from '../../types';

export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';

// Padding classes
export const CARD_PADDING_CLASSES: Record<BearSize | 'none', string> = {
  none: '',
  xs: 'bear-p-2',
  sm: 'bear-p-3',
  md: 'bear-p-4',
  lg: 'bear-p-6',
  xl: 'bear-p-8',
};

// Radius classes
export const CARD_RADIUS_CLASSES: Record<CardRadius, string> = {
  none: '',
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  xl: 'bear-rounded-xl',
  '2xl': 'bear-rounded-2xl',
};

// Variant classes
export const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  elevated: 'bear-bg-white dark:bear-bg-zinc-900 bear-shadow-md',
  outlined: 'bear-bg-white dark:bear-bg-zinc-900 bear-border bear-border-gray-200 dark:bear-border-zinc-700',
  filled: 'bear-bg-gray-100 dark:bear-bg-zinc-800',
  ghost: 'bear-bg-transparent',
};

// Interactive classes
export const CARD_INTERACTIVE_CLASSES = 'bear-transition-all bear-duration-200 bear-cursor-pointer hover:bear-shadow-lg hover:bear-scale-[1.02]';

// Header classes
export const CARD_HEADER_CLASSES = 'bear-flex bear-items-start bear-justify-between bear-p-4 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700';

// Title classes
export const CARD_TITLE_CLASSES = 'bear-text-lg bear-font-semibold bear-text-gray-900 dark:bear-text-white bear-truncate';

// Subtitle classes
export const CARD_SUBTITLE_CLASSES = 'bear-text-sm bear-text-gray-500 dark:bear-text-gray-400 bear-mt-1';

// Body classes
export const CARD_BODY_CLASSES = 'bear-p-4';

// Footer classes
export const CARD_FOOTER_CLASSES = 'bear-p-4';

// Footer divider classes
export const CARD_FOOTER_DIVIDER_CLASSES = 'bear-border-t bear-border-gray-200 dark:bear-border-zinc-700';

