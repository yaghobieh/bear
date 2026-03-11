export const VARIANT_CLASSES: Record<'default' | 'filled' | 'unstyled', string> = {
  default:
    'bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-bg-transparent',
  filled:
    'bear-border-0 bear-bg-gray-50 dark:bear-bg-gray-800/50',
  unstyled:
    'bear-border-0 bear-bg-transparent',
};

export const RADIUS_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
};

export const LEGEND_CLASSES =
  'bear-px-2 bear-ml-2 bear-text-gray-900 dark:bear-text-gray-100';

export const DESCRIPTION_CLASSES =
  'bear-mt-1 bear-mb-3 bear-text-gray-600 dark:bear-text-gray-400';

export const ROOT_CLASS =
  'Bear-Fieldset bear-w-full bear-p-4 bear-pt-5';
