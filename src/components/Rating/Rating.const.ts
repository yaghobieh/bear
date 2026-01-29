import type { RatingSize } from './Rating.types';

// Base classes
export const RATING_BASE_CLASSES = 'Bear-Rating inline-flex items-center gap-1';

// Size configurations
export const RATING_SIZE_CLASSES: Record<RatingSize, { icon: number; text: string }> = {
  sm: { icon: 16, text: 'text-xs' },
  md: { icon: 20, text: 'text-sm' },
  lg: { icon: 28, text: 'text-base' },
};

// Star classes
export const RATING_STAR_BASE_CLASSES = 'Bear-Rating__star cursor-pointer transition-all duration-150';
export const RATING_STAR_DISABLED_CLASSES = 'cursor-not-allowed opacity-50';
export const RATING_STAR_READONLY_CLASSES = 'cursor-default';

// Colors
export const RATING_DEFAULT_COLOR = '#fbbf24'; // amber-400
export const RATING_DEFAULT_EMPTY_COLOR = '#d1d5db'; // gray-300
export const RATING_DEFAULT_EMPTY_COLOR_DARK = '#52525b'; // zinc-600

// Default max
export const RATING_DEFAULT_MAX = 5;

// Default labels
export const RATING_DEFAULT_LABELS = [
  'Terrible',
  'Bad',
  'Average',
  'Good',
  'Excellent',
];

