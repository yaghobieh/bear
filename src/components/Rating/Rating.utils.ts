import type { ReactNode } from 'react';
import {
  EMPTY_STRING,
  HALF,
  ONE,
  RATING_STAR_STATE_EMPTY,
  RATING_STAR_STATE_FILLED,
  RATING_STAR_STATE_HALF,
  ZERO,
} from '@const';
import type { RatingCustomIcons, RatingStarState } from './Rating.types';

export const getStarState = (
  displayValue: number,
  index: number,
  allowHalf: boolean
): RatingStarState => {
  if (displayValue >= index + ONE) {
    return RATING_STAR_STATE_FILLED;
  }
  if (allowHalf && displayValue >= index + HALF) {
    return RATING_STAR_STATE_HALF;
  }
  return RATING_STAR_STATE_EMPTY;
};

export const formatRatingLabel = (
  displayValue: number,
  labels: string[],
  labelFormatter?: (value: number) => string
): string => {
  if (labelFormatter) {
    return labelFormatter(displayValue);
  }
  const labelIndex = Math.ceil(displayValue) - ONE;
  if (labelIndex < ZERO) {
    return EMPTY_STRING;
  }
  return labels[labelIndex] ?? EMPTY_STRING;
};

export const resolveRatingIcon = (
  state: RatingStarState,
  icons: RatingCustomIcons
): ReactNode => {
  const iconByState: Record<RatingStarState, ReactNode> = {
    filled: icons.filled,
    half: icons.half,
    empty: icons.empty,
  };
  return iconByState[state];
};

export const isLeftHalfClick = (clientX: number, left: number, width: number): boolean => {
  return clientX - left < width * HALF;
};
