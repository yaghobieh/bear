import type { BearSize } from '../../types';

export const L_I_S_T_ROOT_CLASS = 'Bear-List';

export const LIST_SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-text-xs',
  sm: 'bear-text-sm',
  md: 'bear-text-base',
  lg: 'bear-text-lg',
  xl: 'bear-text-xl',
};

export const LIST_VARIANT_CLASSES = {
  default: '',
  bordered: 'bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg',
  divided: '[&>li:not(:last-child)]:bear-border-b [&>li:not(:last-child)]:bear-border-gray-200 dark:[&>li:not(:last-child)]:bear-border-gray-700',
  laminated: 'bear-space-y-2 [&>li]:bear-rounded-lg [&>li]:bear-border [&>li]:bear-border-gray-200 dark:[&>li]:bear-border-gray-700 [&>li]:bear-shadow-sm [&>li]:bear-bg-white dark:[&>li]:bear-bg-gray-900',
} as const;

export const LIST_BASE_CLASSES = 'bear-list-none bear-m-0';
export const LIST_PADDING_CLASSES = 'bear-py-2';
