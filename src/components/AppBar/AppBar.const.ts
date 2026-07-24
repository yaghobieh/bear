export const APP_BAR_ROOT_CLASS = 'Bear-AppBar';
export const APP_BAR_DENSE_MODIFIER_CLASS = 'Bear-AppBar--dense';
export const APP_BAR_SECTION_CLASS = 'Bear-AppBar__section';
export const APP_BAR_SECTION_CENTER_CLASS = 'Bear-AppBar__section--center';
export const APP_BAR_SECTION_END_CLASS = 'Bear-AppBar__section--end';

export const DEFAULT_APP_BAR_POSITION = 'sticky' as const;
export const DEFAULT_APP_BAR_VARIANT = 'default' as const;
export const DEFAULT_APP_BAR_COLOR = 'primary' as const;
export const DEFAULT_APP_BAR_ELEVATION = true;
export const DEFAULT_APP_BAR_DISABLE_GUTTERS = false;
export const DEFAULT_APP_BAR_ENABLE_COLOR_ON_DARK = false;

export const APP_BAR_HEIGHT_COMFORTABLE = 'bear-h-16';
export const APP_BAR_HEIGHT_DENSE = 'bear-h-12';
export const APP_BAR_GUTTER_X = 'bear-px-4';
export const APP_BAR_GUTTER_X_DENSE = 'bear-px-3';

export const APP_BAR_POSITION_CLASSES = {
  fixed: 'bear-fixed bear-top-0 bear-left-0 bear-right-0 bear-z-50',
  sticky: 'bear-sticky bear-top-0 bear-z-50',
  static: 'bear-static',
  relative: 'bear-relative',
} as const;

export const APP_BAR_VARIANT_CLASSES = {
  default: '',
  transparent: 'bear-bg-transparent',
  blur: 'bear-backdrop-blur-md',
} as const;

export const APP_BAR_COLOR_CLASSES = {
  default: 'bear-bg-white bear-text-gray-900 dark:bear-bg-zinc-900 dark:bear-text-white',
  primary: 'bear-bg-primary-600 bear-text-white',
  dark: 'bear-bg-gray-900 bear-text-white dark:bear-bg-black',
} as const;

export const APP_BAR_COLOR_ON_DARK_CLASS = 'dark:bear-bg-primary-600 dark:bear-text-white';
export const APP_BAR_ELEVATION_CLASS = 'bear-shadow-md bear-border-b bear-border-gray-200/10 dark:bear-border-gray-800/40';
export const APP_BAR_BASE_CLASS = 'bear-w-full bear-flex bear-items-center';
export const APP_BAR_SECTION_BASE_CLASS = 'bear-flex bear-items-center bear-gap-4';
export const APP_BAR_SECTION_GROW_CLASS = 'bear-flex-1 bear-justify-center';
