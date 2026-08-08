import type { BannerPosition, BannerSeverity, BannerTranslations } from './Banner.types';

export const BANNER_ROOT_CLASS = 'Bear-Banner';

export const BANNER_DEFAULT_SEVERITY: BannerSeverity = 'info';

export const BANNER_DEFAULT_POSITION: BannerPosition = 'static';

export const BANNER_DEFAULT_DISMISSIBLE = false;

export const BANNER_DEFAULT_FULL_WIDTH = true;

export const BANNER_DEFAULT_SHOW_ICON = true;

export const BANNER_DEFAULT_OPEN = true;

export const BANNER_DEFAULT_TRANSLATIONS: BannerTranslations = {
  dismissLabel: 'Dismiss',
};

export const BANNER_BASE_CLASSES =
  'bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-3 bear-border-b bear-border-[var(--bear-border-default)]';

export const BANNER_FULL_WIDTH_CLASS = 'bear-w-full';

export const BANNER_POSITION_CLASSES: Record<BannerPosition, string> = {
  static: '',
  sticky: 'bear-sticky bear-top-0 bear-z-40',
};

export const BANNER_SEVERITY_CLASSES: Record<BannerSeverity, string> = {
  info: 'bear-bg-[var(--bear-info-50,#eff6ff)] bear-text-[var(--bear-info-800,#1e40af)]',
  success: 'bear-bg-[var(--bear-success-50,#f0fdf4)] bear-text-[var(--bear-success-800,#166534)]',
  warning: 'bear-bg-[var(--bear-warning-50,#fffbeb)] bear-text-[var(--bear-warning-800,#92400e)]',
  error: 'bear-bg-[var(--bear-danger-50,#fef2f2)] bear-text-[var(--bear-danger-800,#991b1b)]',
};

export const BANNER_ICON_CLASS = `${BANNER_ROOT_CLASS}__icon bear-flex-shrink-0 bear-w-5 bear-h-5`;

export const BANNER_CONTENT_CLASS = `${BANNER_ROOT_CLASS}__content bear-flex-1 bear-min-w-0 bear-text-sm`;

export const BANNER_TITLE_CLASS = `${BANNER_ROOT_CLASS}__title bear-font-semibold bear-mb-0.5`;

export const BANNER_MESSAGE_CLASS = `${BANNER_ROOT_CLASS}__message`;

export const BANNER_ACTION_CLASS = `${BANNER_ROOT_CLASS}__action bear-flex-shrink-0`;

export const BANNER_DISMISS_CLASS = `${BANNER_ROOT_CLASS}__dismiss bear-flex-shrink-0`;

export const BANNER_ICON_SIZE = 20;

export const BANNER_ICON_STROKE_WIDTH = 2;
