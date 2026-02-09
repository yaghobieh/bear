import type { BearSize, BearVariant } from '../../types';

export const BUTTON_SIZE: Record<BearSize, string> = {
  xs: 'bear-px-2 bear-py-1 bear-text-xs bear-gap-1',
  sm: 'bear-px-3 bear-py-1.5 bear-text-sm bear-gap-1.5',
  md: 'bear-px-4 bear-py-2 bear-text-sm bear-gap-2',
  lg: 'bear-px-5 bear-py-2.5 bear-text-base bear-gap-2',
  xl: 'bear-px-6 bear-py-3 bear-text-lg bear-gap-2.5',
};

/**
 * Button variants using CSS variables for full customization
 * Colors can be overridden via:
 * 1. BearProvider theme prop: theme={{ colors: { primary: { 500: '#...' } } }}
 * 2. BearProvider variants prop: variants={{ Button: { primary: { bg: '#...' } } }}
 * 3. CSS variables: --bear-btn-primary-bg, --bear-primary-500, etc.
 */
export const BUTTON_VARIANT: Record<BearVariant, string> = {
  primary: `
    bear-btn-primary
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  secondary: `
    bear-btn-secondary
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  success: `
    bear-btn-success
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  warning: `
    bear-btn-warning
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  danger: `
    bear-btn-danger
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  info: `
    bear-btn-info
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  ghost: `
    bear-btn-ghost
    bear-bg-transparent bear-relative bear-overflow-hidden
    focus:bear-ring-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
    dark:bear-text-gray-300 dark:hover:bear-bg-gray-800 dark:active:bear-bg-gray-700
  `,
  outline: `
    bear-btn-outline
    bear-bg-transparent bear-border bear-relative bear-overflow-hidden
    focus:bear-ring-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
  error: `
    bear-btn-error
    bear-text-white bear-relative bear-overflow-hidden
    focus:bear-ring-2 focus:bear-ring-offset-2
    disabled:bear-opacity-50 disabled:bear-cursor-not-allowed
  `,
};

/**
 * Default variant colors (used when CSS variables are not set)
 */
export interface VariantDefault {
  bg: string;
  hover: string;
  active: string;
  ring: string;
  text?: string;
  border?: string;
}

export const VARIANT_DEFAULTS: Record<string, VariantDefault> = {
  primary: { bg: 'var(--bear-primary-500)', hover: 'var(--bear-primary-600)', active: 'var(--bear-primary-700)', ring: 'var(--bear-primary-500)' },
  secondary: { bg: 'var(--bear-secondary-500)', hover: 'var(--bear-secondary-600)', active: 'var(--bear-secondary-700)', ring: 'var(--bear-secondary-500)' },
  success: { bg: 'var(--bear-success-500)', hover: 'var(--bear-success-600)', active: 'var(--bear-success-700)', ring: 'var(--bear-success-500)' },
  warning: { bg: 'var(--bear-warning-500)', hover: 'var(--bear-warning-600)', active: 'var(--bear-warning-700)', ring: 'var(--bear-warning-500)' },
  danger: { bg: 'var(--bear-danger-500)', hover: 'var(--bear-danger-600)', active: 'var(--bear-danger-700)', ring: 'var(--bear-danger-500)' },
  info: { bg: 'var(--bear-info-500)', hover: 'var(--bear-info-600)', active: 'var(--bear-info-700)', ring: 'var(--bear-info-500)' },
  error: { bg: 'var(--bear-danger-500)', hover: 'var(--bear-danger-600)', active: 'var(--bear-danger-700)', ring: 'var(--bear-danger-500)' },
  ghost: { bg: 'transparent', hover: 'var(--bear-neutral-100)', active: 'var(--bear-neutral-200)', text: 'var(--bear-text-primary)', ring: 'var(--bear-neutral-500)' },
  outline: { bg: 'transparent', hover: 'var(--bear-primary-50)', active: 'var(--bear-primary-100)', border: 'var(--bear-primary-500)', text: 'var(--bear-primary-500)', ring: 'var(--bear-primary-500)' },
};
