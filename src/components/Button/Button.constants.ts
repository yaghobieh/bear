import type { EmberSize, EmberVariant } from '../../types';

export const BUTTON_SIZE: Record<EmberSize, string> = {
  xs: 'bear-px-2 bear-py-1 bear-text-xs bear-gap-1',
  sm: 'bear-px-3 bear-py-1.5 bear-text-sm bear-gap-1.5',
  md: 'bear-px-4 bear-py-2 bear-text-sm bear-gap-2',
  lg: 'bear-px-5 bear-py-2.5 bear-text-base bear-gap-2',
  xl: 'bear-px-6 bear-py-3 bear-text-lg bear-gap-2.5',
};

export const BUTTON_VARIANT: Record<EmberVariant, string> = {
  primary: `
    bear-bg-bear-500 bear-text-white
    hover:bear-bg-bear-600
    focus:bear-ring-2 focus:bear-ring-bear-500/50 focus:bear-ring-offset-2
    active:bear-bg-bear-700
    disabled:bear-bg-bear-300 disabled:bear-cursor-not-allowed
  `,
  secondary: `
    bear-bg-forge-500 bear-text-white
    hover:bear-bg-forge-600
    focus:bear-ring-2 focus:bear-ring-forge-500/50 focus:bear-ring-offset-2
    active:bear-bg-forge-700
    disabled:bear-bg-forge-300 disabled:bear-cursor-not-allowed
  `,
  success: `
    bear-bg-green-500 bear-text-white
    hover:bear-bg-green-600
    focus:bear-ring-2 focus:bear-ring-green-500/50 focus:bear-ring-offset-2
    active:bear-bg-green-700
    disabled:bear-bg-green-300 disabled:bear-cursor-not-allowed
  `,
  warning: `
    bear-bg-yellow-500 bear-text-white
    hover:bear-bg-yellow-600
    focus:bear-ring-2 focus:bear-ring-yellow-500/50 focus:bear-ring-offset-2
    active:bear-bg-yellow-700
    disabled:bear-bg-yellow-300 disabled:bear-cursor-not-allowed
  `,
  danger: `
    bear-bg-red-500 bear-text-white
    hover:bear-bg-red-600
    focus:bear-ring-2 focus:bear-ring-red-500/50 focus:bear-ring-offset-2
    active:bear-bg-red-700
    disabled:bear-bg-red-300 disabled:bear-cursor-not-allowed
  `,
  info: `
    bear-bg-blue-500 bear-text-white
    hover:bear-bg-blue-600
    focus:bear-ring-2 focus:bear-ring-blue-500/50 focus:bear-ring-offset-2
    active:bear-bg-blue-700
    disabled:bear-bg-blue-300 disabled:bear-cursor-not-allowed
  `,
  ghost: `
    bear-bg-transparent bear-text-gray-700
    hover:bear-bg-gray-100
    focus:bear-ring-2 focus:bear-ring-gray-500/50
    active:bear-bg-gray-200
    disabled:bear-text-gray-400 disabled:bear-cursor-not-allowed
    dark:bear-text-gray-300 dark:hover:bear-bg-gray-800 dark:active:bear-bg-gray-700
  `,
  outline: `
    bear-bg-transparent bear-text-bear-500 bear-border bear-border-bear-500
    hover:bear-bg-bear-50
    focus:bear-ring-2 focus:bear-ring-bear-500/50
    active:bear-bg-bear-100
    disabled:bear-text-bear-300 disabled:bear-border-bear-300 disabled:bear-cursor-not-allowed
    dark:bear-text-bear-400 dark:bear-border-bear-400 dark:hover:bear-bg-bear-950 dark:active:bear-bg-bear-900 dark:disabled:bear-border-bear-700 dark:disabled:bear-text-bear-700
  `,
  error: `
    bear-bg-red-500 bear-text-white
    hover:bear-bg-red-600
    focus:bear-ring-2 focus:bear-ring-red-500/50 focus:bear-ring-offset-2
    active:bear-bg-red-700
    disabled:bear-bg-red-300 disabled:bear-cursor-not-allowed
  `,
};
