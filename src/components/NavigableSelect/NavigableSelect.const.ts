import type { NavigableSelectSize } from './NavigableSelect.types';

/** Default placeholder */
export const DEFAULT_PLACEHOLDER = 'Select an option...';

/** Default empty text */
export const DEFAULT_EMPTY_TEXT = 'No options found';

/** Default max visible options */
export const DEFAULT_MAX_VISIBLE = 8;

/** Option height per size (approx pixels for scroll calculation) */
export const OPTION_HEIGHT: Record<NavigableSelectSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

/** Trigger button size classes */
export const TRIGGER_SIZE_CLASSES: Record<NavigableSelectSize, string> = {
  sm: 'bear-h-8 bear-text-sm bear-px-2.5',
  md: 'bear-h-10 bear-text-sm bear-px-3',
  lg: 'bear-h-12 bear-text-base bear-px-4',
};

/** Option size classes */
export const OPTION_SIZE_CLASSES: Record<NavigableSelectSize, string> = {
  sm: 'bear-px-2.5 bear-py-1.5 bear-text-sm',
  md: 'bear-px-3 bear-py-2 bear-text-sm',
  lg: 'bear-px-4 bear-py-2.5 bear-text-base',
};

/** Tag size classes (multi-select chips) */
export const TAG_SIZE_CLASSES: Record<NavigableSelectSize, string> = {
  sm: 'bear-text-xs bear-px-1.5 bear-py-0.5',
  md: 'bear-text-xs bear-px-2 bear-py-0.5',
  lg: 'bear-text-sm bear-px-2 bear-py-1',
};

/** Dropdown z-index */
export const DROPDOWN_Z_INDEX = 50;

/** Search input debounce delay */
export const SEARCH_DEBOUNCE = 0;

/** Scroll into view block setting */
export const SCROLL_BLOCK = 'nearest' as const;

/** Icon size per component size */
export const ICON_SIZE: Record<NavigableSelectSize, string> = {
  sm: 'bear-w-3.5 bear-h-3.5',
  md: 'bear-w-4 bear-h-4',
  lg: 'bear-w-5 bear-h-5',
};
