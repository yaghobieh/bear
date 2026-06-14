export const S_W_I_T_C_H_ROOT_CLASS = 'Bear-Switch';

export const SWITCH_THUMB_TRANSLATE_PX = {
  sm: 16,
  md: 20,
  lg: 28,
} as const;

export const SWITCH_TRACK_WIDTH_PX = {
  sm: 32,
  md: 44,
  lg: 56,
} as const;

export const SWITCH_THUMB_SIZE_PX = {
  sm: 12,
  md: 20,
  lg: 24,
} as const;

export const SWITCH_THUMB_OFFSET_PX = 2;

export const SWITCH_ROOT_CLASSES = 'Bear-Switch bear-inline-flex bear-cursor-pointer';
export const SWITCH_ROOT_HORIZONTAL = 'bear-items-center bear-gap-3';
export const SWITCH_ROOT_VERTICAL = 'bear-flex-col bear-items-start bear-gap-2';
export const SWITCH_DISABLED_CLASSES = 'bear-opacity-50 bear-cursor-not-allowed';

export const SWITCH_TRACK_BASE_CLASSES = 'Bear-Switch__track bear-relative bear-inline-flex bear-items-center bear-shrink-0 bear-rounded-full bear-transition-colors bear-duration-200 focus-within:bear-ring-2 focus-within:bear-ring-primary-500 focus-within:bear-ring-offset-2 focus-within:bear-ring-offset-white dark:focus-within:bear-ring-offset-zinc-900';
export const SWITCH_TRACK_CHECKED_CLASSES = 'bear-bg-primary-500';
export const SWITCH_TRACK_UNCHECKED_CLASSES = 'bear-bg-gray-300 dark:bear-bg-gray-600';

export const SWITCH_THUMB_BASE_CLASSES = 'Bear-Switch__thumb bear-absolute bear-rounded-full bear-bg-white bear-shadow bear-transition-transform bear-duration-200 bear-flex bear-items-center bear-justify-center bear-will-change-transform';

export const SWITCH_LABEL_CLASSES = 'Bear-Switch__label bear-text-sm bear-text-gray-700 dark:bear-text-gray-300';

export const SWITCH_ICON_CLASSES = 'Bear-Switch__icon bear-flex bear-items-center bear-justify-center';
export const SWITCH_ICON_LEFT_CLASSES = 'bear-absolute bear-left-1 bear-transition-colors bear-duration-200';
export const SWITCH_ICON_RIGHT_CLASSES = 'bear-absolute bear-right-1 bear-transition-colors bear-duration-200';
export const SWITCH_ICON_CHECKED_VISIBLE = 'bear-text-white';
export const SWITCH_ICON_CHECKED_HIDDEN = 'bear-text-transparent';
export const SWITCH_ICON_UNCHECKED_VISIBLE = 'bear-text-gray-600 dark:bear-text-gray-400';
export const SWITCH_ICON_THUMB_CHECKED = 'bear-text-primary-500';
export const SWITCH_ICON_THUMB_UNCHECKED = 'bear-text-gray-400';

export const SWITCH_SIZE_CLASSES = {
  sm: { track: 'bear-w-8 bear-h-4', thumb: 'bear-w-3 bear-h-3' },
  md: { track: 'bear-w-11 bear-h-6', thumb: 'bear-w-5 bear-h-5' },
  lg: { track: 'bear-w-14 bear-h-7', thumb: 'bear-w-6 bear-h-6' },
} as const;

export const SWITCH_GROUP_ROOT = 'Bear-SwitchGroup bear-inline-flex bear-rounded-full bear-bg-gray-200 dark:bear-bg-gray-700 bear-p-0.5';
export const SWITCH_GROUP_VERTICAL = 'bear-flex-col bear-rounded-lg';
export const SWITCH_GROUP_DISABLED = 'bear-opacity-50 bear-pointer-events-none';
export const SWITCH_GROUP_OPTION = 'Bear-SwitchGroup__option bear-relative bear-z-[1] bear-px-3 bear-py-1.5 bear-text-xs bear-font-medium bear-rounded-full bear-transition-colors bear-cursor-pointer bear-border-0 bear-bg-transparent';
export const SWITCH_GROUP_OPTION_ACTIVE = 'bear-bg-white dark:bear-bg-gray-900 bear-text-gray-900 dark:bear-text-white bear-shadow-sm';
export const SWITCH_GROUP_OPTION_INACTIVE = 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-white';
