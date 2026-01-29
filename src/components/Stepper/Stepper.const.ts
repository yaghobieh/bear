import type { StepperSize, StepStatus } from './Stepper.types';

// Base classes
export const STEPPER_BASE_CLASSES = 'Bear-Stepper';
export const STEPPER_HORIZONTAL_CLASSES = 'flex items-start';
export const STEPPER_VERTICAL_CLASSES = 'flex flex-col';

// Step wrapper classes
export const STEP_WRAPPER_HORIZONTAL = 'flex-1 relative';
export const STEP_WRAPPER_VERTICAL = 'relative flex items-start pb-8 last:pb-0';

// Step indicator classes
export const STEP_INDICATOR_BASE = 'Bear-Stepper__indicator flex items-center justify-center rounded-full font-medium transition-all';

export const STEP_INDICATOR_SIZES: Record<StepperSize, string> = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

export const STEP_STATUS_CLASSES: Record<StepStatus, { indicator: string; label: string }> = {
  pending: {
    indicator: 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400',
    label: 'text-gray-500 dark:text-gray-400',
  },
  active: {
    indicator: 'bg-pink-500 text-white shadow-lg shadow-pink-500/30',
    label: 'text-gray-900 dark:text-white font-medium',
  },
  completed: {
    indicator: 'bg-green-500 text-white',
    label: 'text-gray-700 dark:text-gray-300',
  },
  error: {
    indicator: 'bg-red-500 text-white',
    label: 'text-red-500 dark:text-red-400',
  },
};

// Connector classes
export const CONNECTOR_BASE = 'Bear-Stepper__connector absolute transition-colors';
export const CONNECTOR_HORIZONTAL = 'top-4 left-1/2 right-0 h-0.5 -translate-y-1/2';
export const CONNECTOR_VERTICAL = 'left-4 top-8 w-0.5 h-full -translate-x-1/2';

export const CONNECTOR_STYLES = {
  solid: '',
  dashed: 'border-dashed',
};

export const CONNECTOR_STATUS = {
  pending: 'bg-gray-200 dark:bg-zinc-700',
  completed: 'bg-green-500',
};

// Step label classes
export const STEP_LABEL_BASE = 'Bear-Stepper__label transition-colors';
export const STEP_LABEL_SIZES: Record<StepperSize, { label: string; description: string }> = {
  sm: { label: 'text-xs', description: 'text-[10px]' },
  md: { label: 'text-sm', description: 'text-xs' },
  lg: { label: 'text-base', description: 'text-sm' },
};

// Step description
export const STEP_DESCRIPTION_CLASSES = 'text-gray-500 dark:text-gray-400 mt-0.5';

