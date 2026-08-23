import type { RatingSize } from './Rating.types';
import { SIXTEEN, TWENTY, TWENTY_EIGHT } from '@const';

export const RATING_SIZE_ICON: Record<RatingSize, number> = {
  sm: SIXTEEN,
  md: TWENTY,
  lg: TWENTY_EIGHT,
};

export const RATING_SIZE_TEXT: Record<RatingSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const RATING_THEME_FILLED_SHADE = 400 as const;
export const RATING_THEME_EMPTY_SHADE = 300 as const;

export const RATING_DEFAULT_LABELS = [
  'Terrible',
  'Bad',
  'Average',
  'Good',
  'Excellent',
];
