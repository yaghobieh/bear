import type { BearSize, BearVariant } from '../../types';
import type { CheckboxIndicator } from './Checkbox.types';

export const C_H_E_C_K_B_O_X_ROOT_CLASS = 'Bear-Checkbox';

export const CHECKBOX_SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-w-3.5 bear-h-3.5',
  sm: 'bear-w-4 bear-h-4',
  md: 'bear-w-5 bear-h-5',
  lg: 'bear-w-6 bear-h-6',
  xl: 'bear-w-7 bear-h-7',
};

export const CHECKBOX_ICON_SIZE: Record<BearSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 22,
};

export const CHECKBOX_LABEL_SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-text-xs',
  sm: 'bear-text-sm',
  md: 'bear-text-base',
  lg: 'bear-text-lg',
  xl: 'bear-text-xl',
};

export const CHECKBOX_VARIANT_COLORS: Record<BearVariant, string> = {
  primary: 'var(--bear-primary-500, #ec4899)',
  secondary: '#6b7280',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  ghost: '#9ca3af',
  outline: '#374151',
  error: '#ef4444',
};

export const CHECKBOX_ROOT_CLASSES = 'bear-flex bear-flex-col';
export const CHECKBOX_LABEL_CLASSES = 'bear-inline-flex bear-items-center bear-gap-2 bear-cursor-pointer';
export const CHECKBOX_LABEL_DISABLED = 'bear-opacity-50 bear-cursor-not-allowed';
export const CHECKBOX_BOX_WRAPPER = 'bear-relative bear-flex bear-items-center bear-justify-center';
export const CHECKBOX_BOX_BASE = 'bear-rounded bear-border-2 bear-transition-all bear-flex bear-items-center bear-justify-center';
export const CHECKBOX_BOX_ERROR_BORDER = 'bear-border-red-500';
export const CHECKBOX_BOX_DEFAULT_BORDER = 'bear-border-gray-300 dark:bear-border-gray-600';
export const CHECKBOX_BOX_CHECKED = 'bear-border-transparent';
export const CHECKBOX_BOX_HOVER = 'hover:bear-border-gray-400';
export const CHECKBOX_LABEL_TEXT = 'bear-text-gray-700 dark:bear-text-gray-300';
export const CHECKBOX_LABEL_ERROR = 'bear-text-red-500';
export const CHECKBOX_HELPER_BASE = 'bear-text-xs bear-mt-1 bear-ml-7';
export const CHECKBOX_HELPER_ERROR = 'bear-text-red-500';
export const CHECKBOX_HELPER_DEFAULT = 'bear-text-gray-500';
export const CHECKBOX_ERROR_COLOR = '#ef4444';

export const CHECKBOX_INDICATOR_STROKE = {
  width: 3,
  color: 'white',
  linecap: 'round' as const,
  linejoin: 'round' as const,
};

export const CHECKBOX_INDICATOR_VIEWBOX = '0 0 24 24';

export const DEFAULT_CHECKBOX_INDICATOR: CheckboxIndicator = 'check';
