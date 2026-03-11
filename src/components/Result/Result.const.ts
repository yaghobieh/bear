import type { ResultStatus } from './Result.types';

export const ROOT_CLASS = 'Bear-Result';

export const CONTAINER_CLASSES =
  'bear-flex bear-flex-col bear-items-center bear-justify-center bear-text-center bear-py-16 bear-px-6';

export const ICON_WRAPPER_CLASSES = 'bear-mb-4 bear-flex bear-items-center bear-justify-center';

export const ICON_SIZE_CLASSES = 'bear-w-16 bear-h-16';

export const STATUS_ICON_COLORS: Record<ResultStatus, string> = {
  success: 'bear-text-green-500 dark:bear-text-green-400',
  error: 'bear-text-red-500 dark:bear-text-red-400',
  info: 'bear-text-blue-500 dark:bear-text-blue-400',
  warning: 'bear-text-amber-500 dark:bear-text-amber-400',
  '404': 'bear-text-gray-500 dark:bear-text-zinc-400',
  '403': 'bear-text-orange-500 dark:bear-text-orange-400',
  '500': 'bear-text-red-600 dark:bear-text-red-500',
};

export const TITLE_CLASSES = 'bear-mb-2';

export const SUBTITLE_CLASSES = 'bear-mb-6 bear-max-w-md';

export const EXTRA_CLASSES = 'bear-flex bear-flex-wrap bear-gap-2 bear-justify-center';

export const STATUS_TEXT_CLASSES = 'bear-text-5xl bear-font-bold bear-leading-none';
