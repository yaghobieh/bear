import type { IndicatorPosition } from './Indicator.types';

export const DEFAULT_SIZE = 10;
export const DEFAULT_COLOR = 'bear-bg-pink-500 dark:bear-bg-pink-400';

export const POSITION_MAP: Record<IndicatorPosition, string> = {
  'top-start': 'bear-top-0 bear-left-0 bear-translate-x-[-50%] bear-translate-y-[-50%]',
  'top-center': 'bear-top-0 bear-left-1/2 bear-translate-x-[-50%] bear-translate-y-[-50%]',
  'top-end': 'bear-top-0 bear-right-0 bear-translate-x-[50%] bear-translate-y-[-50%]',
  'middle-start': 'bear-top-1/2 bear-left-0 bear-translate-x-[-50%] bear-translate-y-[-50%]',
  'middle-end': 'bear-top-1/2 bear-right-0 bear-translate-x-[50%] bear-translate-y-[-50%]',
  'bottom-start': 'bear-bottom-0 bear-left-0 bear-translate-x-[-50%] bear-translate-y-[50%]',
  'bottom-center': 'bear-bottom-0 bear-left-1/2 bear-translate-x-[-50%] bear-translate-y-[50%]',
  'bottom-end': 'bear-bottom-0 bear-right-0 bear-translate-x-[50%] bear-translate-y-[50%]',
};

export const RADIUS_MAP = {
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  full: 'bear-rounded-full',
} as const;

export const ROOT_CLASS = 'Bear-Indicator bear-relative';
export const ROOT_INLINE_CLASS = 'Bear-Indicator bear-relative bear-inline-flex';
export const INDICATOR_CLASS =
  'Bear-Indicator__dot bear-absolute bear-flex bear-items-center bear-justify-center bear-pointer-events-none';
export const BORDER_CLASS =
  'bear-ring-2 bear-ring-white dark:bear-ring-zinc-900';
export const PROCESSING_CLASS = 'bear-animate-pulse';
