export const PROGRESS_ROOT_CLASS = 'Bear-Progress';

export const PROGRESS_SIZE_CLASSES = {
  sm: 'bear-h-1.5',
  md: 'bear-h-2.5',
  lg: 'bear-h-4',
} as const;

export const PROGRESS_COLOR_CLASSES = {
  default: 'bear-bg-bear-500',
  success: 'bear-bg-green-500',
  warning: 'bear-bg-amber-500',
  danger: 'bear-bg-red-500',
  info: 'bear-bg-blue-500',
} as const;

export const PROGRESS_BUFFER_CLASSES = 'bear-bg-bear-500/30 dark:bear-bg-bear-400/25';

export const PROGRESS_TRACK_CLASSES =
  'bear-w-full bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full bear-overflow-hidden bear-relative';

export const PROGRESS_DEFAULT_LABEL = 'Progress';
