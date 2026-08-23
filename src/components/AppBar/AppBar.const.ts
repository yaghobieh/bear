import type { AppBarColor, AppBarPosition, AppBarVariant } from './AppBar.types';

export const APP_BAR_POSITION_CLASSES: Record<AppBarPosition, string> = {
  fixed: 'bear-fixed bear-top-0 bear-left-0 bear-right-0 bear-z-50',
  sticky: 'bear-sticky bear-top-0 bear-z-50',
  static: 'bear-static',
  relative: 'bear-relative',
};

export const APP_BAR_VARIANT_CLASSES: Record<AppBarVariant, string> = {
  default: '',
  transparent: 'bear-bg-transparent',
  blur: 'bear-backdrop-blur-md',
};

export const APP_BAR_COLOR_CLASSES: Record<AppBarColor, string> = {
  default: 'bear-bg-white bear-text-gray-900 dark:bear-bg-zinc-900 dark:bear-text-white',
  primary: 'bear-bg-primary-600 bear-text-white',
  dark: 'bear-bg-gray-900 bear-text-white dark:bear-bg-black',
};
