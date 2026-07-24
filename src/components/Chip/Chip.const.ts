export const C_H_I_P_ROOT_CLASS = 'Bear-Chip';

export const CHIP_COLOR_CLASSES = {
  filled: {
    default: 'bear-bg-gray-600 bear-text-white dark:bear-bg-zinc-600',
    primary: 'bear-bg-primary-500 bear-text-white',
    secondary: 'bear-bg-purple-500 bear-text-white',
    success: 'bear-bg-green-500 bear-text-white',
    warning: 'bear-bg-yellow-500 bear-text-black',
    error: 'bear-bg-red-500 bear-text-white',
    info: 'bear-bg-blue-500 bear-text-white',
  },
  outlined: {
    default: 'bear-border bear-border-gray-400 bear-text-gray-700 dark:bear-border-zinc-500 dark:bear-text-zinc-300',
    primary: 'bear-border bear-border-primary-500 bear-text-primary-600 dark:bear-text-primary-400',
    secondary: 'bear-border bear-border-purple-500 bear-text-purple-600 dark:bear-text-purple-400',
    success: 'bear-border bear-border-green-500 bear-text-green-700 dark:bear-text-green-400',
    warning: 'bear-border bear-border-yellow-500 bear-text-yellow-700 dark:bear-text-yellow-400',
    error: 'bear-border bear-border-red-500 bear-text-red-600 dark:bear-text-red-400',
    info: 'bear-border bear-border-blue-500 bear-text-blue-600 dark:bear-text-blue-400',
  },
  soft: {
    default: 'bear-bg-gray-500/15 bear-text-gray-700 dark:bear-bg-zinc-500/20 dark:bear-text-zinc-300',
    primary: 'bear-bg-primary-500/15 bear-text-primary-700 dark:bear-bg-primary-500/20 dark:bear-text-primary-400',
    secondary: 'bear-bg-purple-500/15 bear-text-purple-700 dark:bear-bg-purple-500/20 dark:bear-text-purple-400',
    success: 'bear-bg-green-500/15 bear-text-green-700 dark:bear-bg-green-500/20 dark:bear-text-green-400',
    warning: 'bear-bg-yellow-500/15 bear-text-yellow-800 dark:bear-bg-yellow-500/20 dark:bear-text-yellow-400',
    error: 'bear-bg-red-500/15 bear-text-red-700 dark:bear-bg-red-500/20 dark:bear-text-red-400',
    info: 'bear-bg-blue-500/15 bear-text-blue-700 dark:bear-bg-blue-500/20 dark:bear-text-blue-400',
  },
} as const;

export const CHIP_SIZE_CLASSES = {
  sm: 'bear-h-6 bear-text-xs bear-px-2 bear-gap-1',
  md: 'bear-h-8 bear-text-sm bear-px-3 bear-gap-1.5',
  lg: 'bear-h-10 bear-text-base bear-px-4 bear-gap-2',
} as const;

export const CHIP_DELETE_ICON_SIZES = {
  sm: 'bear-w-3 bear-h-3',
  md: 'bear-w-4 bear-h-4',
  lg: 'bear-w-5 bear-h-5',
} as const;
