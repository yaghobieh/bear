export const ROOT_CLASS = 'Bear-Descriptions';

export const DEFAULT_COLUMNS = 3;

export const TITLE_CLASSES = 'bear-mb-4';

export const TABLE_CLASSES = 'bear-w-full';

export const BORDERED_TABLE_CLASSES =
  'bear-border-collapse bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-lg bear-overflow-hidden';

export const UNBORDERED_TABLE_CLASSES = 'bear-border-separate';

export const SIZE_CLASSES = {
  sm: {
    cell: 'bear-px-3 bear-py-2 bear-text-sm',
    label: 'bear-px-3 bear-py-2 bear-text-sm',
  },
  md: {
    cell: 'bear-px-4 bear-py-3 bear-text-sm',
    label: 'bear-px-4 bear-py-3 bear-text-sm',
  },
  lg: {
    cell: 'bear-px-5 bear-py-4 bear-text-base',
    label: 'bear-px-5 bear-py-4 bear-text-base',
  },
} as const;

export const BORDERED_LABEL_CELL_CLASSES =
  'bear-bg-gray-50 dark:bear-bg-zinc-800/50 bear-text-gray-600 dark:bear-text-zinc-400 bear-font-medium bear-border-b bear-border-r bear-border-gray-200 dark:bear-border-zinc-700';

export const BORDERED_VALUE_CELL_CLASSES =
  'bear-border-b bear-border-r bear-border-gray-200 dark:bear-border-zinc-700 bear-text-gray-900 dark:bear-text-zinc-100';

export const UNBORDERED_LABEL_CELL_CLASSES =
  'bear-text-gray-600 dark:bear-text-zinc-400 bear-font-medium';

export const UNBORDERED_VALUE_CELL_CLASSES = 'bear-text-gray-900 dark:bear-text-zinc-100';
