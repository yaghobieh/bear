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
  pink: 'bg-primary-500',
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

export const TIMELINE_DOT_TOP_WITH_ICON_PX = 2;
export const TIMELINE_DOT_TOP_DEFAULT_PX = 6;
export const TIMELINE_DOT_OFFSET_WITH_ICON_PX = -4;
export const TIMELINE_DOT_OFFSET_DEFAULT_PX = 0;

export const TIMELINE_DOT_ICON_EXTRA = 'bear-flex bear-items-center bear-justify-center bear-text-white';
export const TIMELINE_DOT_ACTIVE_RING = 'bear-ring-4 bear-ring-primary-500/30';
export const TIMELINE_DOT_INTERACTIVE = 'bear-cursor-pointer';
export const TIMELINE_DOT_HOVER_SCALE = 'hover:bear-scale-125 bear-transition-transform';
export const TIMELINE_DOT_ACTIVE_SCALE = 'bear-scale-125';

export const TIMELINE_HOVER_CARD_CONTENT = 'bear-text-sm bear-space-y-1';
export const TIMELINE_HOVER_CARD_DATE = 'bear-font-semibold bear-text-gray-900 dark:bear-text-white';

export const TIMELINE_ALTERNATE_EVEN_WRAPPER = 'bear-pr-8 bear-text-right bear-w-1/2';
export const TIMELINE_ALTERNATE_ODD_WRAPPER = 'bear-pl-8 bear-text-left bear-w-1/2 bear-ml-auto';
export const TIMELINE_ALTERNATE_EVEN_CONTENT = 'bear-text-right';
export const TIMELINE_ALTERNATE_ODD_CONTENT = 'bear-text-left';

export const TIMELINE_TITLE_BASE = 'Bear-Timeline__title bear-font-medium bear-text-gray-900 dark:bear-text-white';
export const TIMELINE_TITLE_ACTIVE = 'bear-text-primary-600 dark:bear-text-primary-400';
export const TIMELINE_DESC_BASE = 'Bear-Timeline__description bear-text-gray-600 dark:bear-text-gray-400 bear-mt-1';
export const TIMELINE_EXTRA_CLASSES = 'Bear-Timeline__extra bear-mt-3';
export const TIMELINE_TIME_MARGIN = 'bear-mb-1';
export const TIMELINE_PENDING_TITLE = 'Loading...';

