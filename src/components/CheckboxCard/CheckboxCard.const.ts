export const SIZE_PADDING_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bear-p-3',
  md: 'bear-p-4',
  lg: 'bear-p-5',
};

export const VARIANT_CLASSES: Record<'default' | 'outline' | 'filled', string> = {
  default: 'bear-border bear-border-gray-200 dark:bear-border-gray-700',
  outline: 'bear-border bear-border-dashed bear-border-gray-300 dark:bear-border-gray-600',
  filled: 'bear-bg-gray-50 dark:bear-bg-gray-800/50',
};

export const CHECKED_CLASSES =
  'bear-border-pink-500 dark:bear-border-pink-400 bear-ring-2 bear-ring-pink-500/30 dark:bear-ring-pink-400/30 bear-bg-pink-50 dark:bear-bg-pink-950/30';

export const ROOT_CLASS =
  'Bear-CheckboxCard bear-relative bear-rounded-lg bear-transition-all bear-duration-200 bear-cursor-pointer bear-text-left';

export const CHECKBOX_INDICATOR_SIZE_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bear-w-4 bear-h-4',
  md: 'bear-w-5 bear-h-5',
  lg: 'bear-w-6 bear-h-6',
};

export const DEFAULT_COLUMNS = 1;
export const DEFAULT_GAP = 4;
