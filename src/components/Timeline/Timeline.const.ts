import type { TimelineSize } from './Timeline.types';

// Base classes
export const TIMELINE_BASE_CLASSES = 'Bear-Timeline relative';

// Item classes
export const TIMELINE_ITEM_BASE = 'Bear-Timeline__item relative pb-8 last:pb-0';

// Position classes
export const TIMELINE_POSITIONS = {
  left: {
    wrapper: 'pl-8',
    content: 'text-left',
    dot: 'left-0',
    line: 'left-3',
  },
  right: {
    wrapper: 'pr-8 text-right',
    content: 'text-right',
    dot: 'right-0',
    line: 'right-3',
  },
  alternate: {
    wrapper: '',
    content: '',
    dot: '',
    line: 'left-1/2 -translate-x-1/2',
  },
};

// Dot classes
export const TIMELINE_DOT_BASE = 'Bear-Timeline__dot absolute rounded-full border-2 border-white dark:border-zinc-900 z-10 transition-all';

export const TIMELINE_DOT_SIZES: Record<TimelineSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const TIMELINE_DOT_ICON_SIZES: Record<TimelineSize, string> = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export const TIMELINE_DOT_COLORS = {
  pink: 'bg-pink-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  gray: 'bg-gray-400 dark:bg-zinc-600',
};

// Line classes
export const TIMELINE_LINE_BASE = 'Bear-Timeline__line absolute top-0 w-0.5 h-full';
export const TIMELINE_LINE_COLOR = 'bg-gray-200 dark:bg-zinc-700';

// Content classes
export const TIMELINE_CONTENT_BASE = 'Bear-Timeline__content';

export const TIMELINE_TITLE_SIZES: Record<TimelineSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const TIMELINE_DESC_SIZES: Record<TimelineSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// Time label classes
export const TIMELINE_TIME_CLASSES = 'text-xs text-gray-500 dark:text-gray-400';

