import { CascaderTranslations } from './Cascader.types';

/**
 * Default translations for Cascader
 */
export const CASCADER_DEFAULT_TRANSLATIONS: CascaderTranslations = {
  placeholder: 'Select option',
  noOptions: 'No options available',
  loading: 'Loading...',
  clear: 'Clear',
};

/**
 * Size classes for Cascader trigger
 */
export const CASCADER_SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4 bear-text-sm',
  lg: 'bear-py-2.5 bear-px-5 bear-text-base',
} as const;

/**
 * Variant classes for Cascader trigger (light/dark)
 */
export const CASCADER_VARIANT_CLASSES = {
  default: 'bear-bg-white dark:bear-bg-zinc-800 bear-border-zinc-300 dark:bear-border-zinc-600',
  filled: 'bear-bg-zinc-100 dark:bear-bg-zinc-700 bear-border-transparent',
  outline: 'bear-bg-transparent bear-border-zinc-300 dark:bear-border-zinc-500',
} as const;

/**
 * Z-index for dropdown
 */
export const CASCADER_DROPDOWN_Z_INDEX = 9999;

/**
 * Default path separator
 */
export const CASCADER_PATH_SEPARATOR = ' / ';

/**
 * Animation duration in ms
 */
export const CASCADER_ANIMATION_DURATION = 200;
