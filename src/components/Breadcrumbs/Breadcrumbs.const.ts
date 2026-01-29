export const BREADCRUMBS_SIZE = {
  sm: 'bear-text-xs',
  md: 'bear-text-sm',
  lg: 'bear-text-base',
} as const;

export const BREADCRUMBS_ICON_SIZE = {
  sm: 'bear-w-3 bear-h-3',
  md: 'bear-w-4 bear-h-4',
  lg: 'bear-w-5 bear-h-5',
} as const;

export const BREADCRUMBS_DEFAULTS = {
  SIZE: 'md' as const,
  ITEMS_BEFORE_COLLAPSE: 1,
  ITEMS_AFTER_COLLAPSE: 1,
  SHOW_HOME_ICON: false,
};

