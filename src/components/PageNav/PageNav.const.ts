import type { BearSize } from '../../types';

export const ROOT_CLASS = 'Bear-PageNav';

export const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-text-xs bear-py-3',
  sm: 'bear-text-sm bear-py-4',
  md: 'bear-text-sm bear-py-6',
  lg: 'bear-text-base bear-py-8',
  xl: 'bear-text-lg bear-py-10',
};

export const LINK_SIZE: Record<BearSize, string> = {
  xs: 'bear-px-2 bear-py-1',
  sm: 'bear-px-3 bear-py-1.5',
  md: 'bear-px-4 bear-py-2',
  lg: 'bear-px-5 bear-py-2.5',
  xl: 'bear-px-6 bear-py-3',
};

export const VARIANT_CLASSES = {
  default: {
    link: 'bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors',
    label: 'bear-text-zinc-500',
    icon: 'bear-text-pink-500',
  },
  outlined: {
    link: 'bear-border bear-border-zinc-700 bear-rounded-lg hover:bear-border-pink-500 hover:bear-text-pink-400 bear-transition-all',
    label: 'bear-text-zinc-500',
    icon: 'bear-text-pink-500',
  },
  filled: {
    link: 'bear-bg-zinc-800/50 bear-rounded-lg hover:bear-bg-pink-500/10 hover:bear-text-pink-400 bear-transition-all',
    label: 'bear-text-zinc-500',
    icon: 'bear-text-pink-500',
  },
};

export const ICON_SIZE: Record<BearSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};
