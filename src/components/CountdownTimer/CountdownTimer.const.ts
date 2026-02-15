import type { CountdownTimerSize } from './CountdownTimer.types';

/** Milliseconds in time units */
export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

/** Default labels */
export const DEFAULT_LABELS = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
} as const;

/** Default separator */
export const DEFAULT_SEPARATOR = ':';

/** Pad length for digits */
export const PAD_LENGTH = 2;

/** Digit classes per size */
export const SIZE_DIGIT_CLASSES: Record<CountdownTimerSize, string> = {
  sm: 'bear-text-lg bear-font-bold',
  md: 'bear-text-3xl bear-font-bold',
  lg: 'bear-text-5xl bear-font-bold',
  xl: 'bear-text-7xl bear-font-bold',
};

/** Label classes per size */
export const SIZE_LABEL_CLASSES: Record<CountdownTimerSize, string> = {
  sm: 'bear-text-[10px]',
  md: 'bear-text-xs',
  lg: 'bear-text-sm',
  xl: 'bear-text-base',
};

/** Gap classes per size */
export const SIZE_GAP_CLASSES: Record<CountdownTimerSize, string> = {
  sm: 'bear-gap-2',
  md: 'bear-gap-3',
  lg: 'bear-gap-4',
  xl: 'bear-gap-5',
};

/** Separator horizontal margin */
export const SEPARATOR_MARGIN = 'bear-mx-1';

/** Update interval in ms */
export const UPDATE_INTERVAL = 1000;
