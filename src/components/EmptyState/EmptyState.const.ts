export const EMPTY_STATE_ROOT_CLASS = 'Bear-EmptyState';

export const EMPTY_STATE_BASE_CLASSES =
  'bear-flex bear-flex-col bear-items-center bear-text-center';

export const EMPTY_STATE_CARD_CLASSES =
  'bear-bg-[var(--bear-bg-secondary)] bear-rounded-xl bear-border bear-border-[var(--bear-border-default)]';

export const EMPTY_STATE_ICON_CLASSES = 'bear-text-[var(--bear-text-muted)] bear-mb-4';

export const EMPTY_STATE_TITLE_CLASSES =
  'bear-font-semibold bear-text-[var(--bear-text-primary)] bear-mb-2';

export const EMPTY_STATE_DESCRIPTION_CLASSES =
  'bear-text-[var(--bear-text-secondary)] bear-max-w-md bear-mb-6';

export const EMPTY_STATE_SIZE_CLASSES = {
  sm: {
    icon: 'bear-w-12 bear-h-12',
    title: 'bear-text-lg',
    desc: 'bear-text-sm',
    padding: 'bear-py-6 bear-px-4',
  },
  md: {
    icon: 'bear-w-16 bear-h-16',
    title: 'bear-text-xl',
    desc: 'bear-text-base',
    padding: 'bear-py-10 bear-px-6',
  },
  lg: {
    icon: 'bear-w-20 bear-h-20',
    title: 'bear-text-2xl',
    desc: 'bear-text-lg',
    padding: 'bear-py-14 bear-px-8',
  },
} as const;
