import { SIZE_LG, SIZE_MD, SIZE_SM, VARIANT_DEFAULT, VARIANT_PILLS, VARIANT_UNDERLINE } from '@const';
import type { ActiveBarVariant, CompactBearSize } from '@types';

export const ACTIVE_BAR_SIZE_CLASSES: Record<CompactBearSize, string> = {
  [SIZE_SM]: 'bear-text-sm bear-px-3 bear-py-1.5',
  [SIZE_MD]: 'bear-text-sm bear-px-4 bear-py-2',
  [SIZE_LG]: 'bear-text-base bear-px-5 bear-py-2.5',
};

export const ACTIVE_BAR_VARIANT_CLASSES: Record<ActiveBarVariant, { active: string; inactive: string }> = {
  [VARIANT_PILLS]: {
    active: 'bear-bg-primary-500 bear-text-white bear-shadow-lg bear-shadow-primary-500/30',
    inactive: 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800',
  },
  [VARIANT_UNDERLINE]: {
    active: 'bear-text-primary-500 bear-font-medium',
    inactive: 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-gray-200',
  },
  [VARIANT_DEFAULT]: {
    active: 'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-gray-900 dark:bear-text-white bear-font-medium',
    inactive: 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-50 dark:hover:bear-bg-gray-800/50',
  },
};

export const ACTIVE_BAR_SHAPE_CLASSES: Record<ActiveBarVariant, string> = {
  [VARIANT_PILLS]: 'bear-rounded-full',
  [VARIANT_UNDERLINE]: 'bear-relative bear-pb-3',
  [VARIANT_DEFAULT]: 'bear-rounded-lg',
};
