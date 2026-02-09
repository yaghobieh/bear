import type { BearSize, BearVariant } from '../../types';

/** Dot size utility classes (bear-w-1.5 bear-h-1.5). */
export const BADGE_DOT_SIZE_CLASSES = 'bear-w-1.5 bear-h-1.5';

export const sizeClasses: Record<Exclude<BearSize, 'xl'>, string> = {
  xs: 'bear-px-1.5 bear-py-0.5 bear-text-[10px]',
  sm: 'bear-px-2 bear-py-0.5 bear-text-xs',
  md: 'bear-px-2.5 bear-py-1 bear-text-xs',
  lg: 'bear-px-3 bear-py-1.5 bear-text-sm',
};

export const variantClasses: Record<BearVariant | 'neutral', string> = {
  primary: 'bear-bg-bear-100 bear-text-bear-700 dark:bear-bg-bear-900/30 dark:bear-text-bear-400',
  secondary: 'bear-bg-forge-100 bear-text-forge-700 dark:bear-bg-forge-900/30 dark:bear-text-forge-400',
  success: 'bear-bg-green-100 bear-text-green-700 dark:bear-bg-green-900/30 dark:bear-text-green-400',
  warning: 'bear-bg-yellow-100 bear-text-yellow-700 dark:bear-bg-yellow-900/30 dark:bear-text-yellow-400',
  danger: 'bear-bg-red-100 bear-text-red-700 dark:bear-bg-red-900/30 dark:bear-text-red-400',
  info: 'bear-bg-blue-100 bear-text-blue-700 dark:bear-bg-blue-900/30 dark:bear-text-blue-400',
  ghost: 'bear-bg-gray-100 bear-text-gray-700 dark:bear-bg-gray-800 dark:bear-text-gray-300',
  outline: 'bear-bg-transparent bear-text-gray-700 bear-border bear-border-gray-300 dark:bear-text-gray-300 dark:bear-border-gray-600',
  error: 'bear-bg-red-100 bear-text-red-700 dark:bear-bg-red-900/30 dark:bear-text-red-400',
  neutral: 'bear-bg-gray-100 bear-text-gray-600 dark:bear-bg-gray-800 dark:bear-text-gray-400',
};

export const dotVariantColors: Record<BearVariant | 'neutral', string> = {
  primary: 'bear-bg-bear-500',
  secondary: 'bear-bg-forge-500',
  success: 'bear-bg-green-500',
  warning: 'bear-bg-yellow-500',
  danger: 'bear-bg-red-500',
  info: 'bear-bg-blue-500',
  ghost: 'bear-bg-gray-500',
  outline: 'bear-bg-gray-500',
  error: 'bear-bg-red-500',
  neutral: 'bear-bg-gray-500',
};
