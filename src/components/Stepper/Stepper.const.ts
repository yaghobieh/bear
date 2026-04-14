import type { StepperSize, StepStatus, StepperOrientation } from './Stepper.types';

// ── Defaults ─────────────────────────────────────────────
export const DEFAULT_ORIENTATION: StepperOrientation = 'horizontal';
export const DEFAULT_SIZE: StepperSize = 'md';
export const DEFAULT_SHOW_NUMBERS = true;
export const DEFAULT_SHOW_CONNECTORS = true;
export const DEFAULT_CONNECTOR_STYLE = 'solid' as const;
export const DEFAULT_CLICKABLE = false;
export const DEFAULT_ALTERNATIVE_LABEL = false;

export const DEFAULT_PREV_LABEL = 'Previous';
export const DEFAULT_NEXT_LABEL = 'Next';
export const DEFAULT_COMPLETE_LABEL = 'Complete';
export const DEFAULT_INDICATOR_FORMAT = (current: number, total: number) => `Step ${current} of ${total}`;

export const FIRST_STEP_INDEX = 0;
export const STEP_NUMBER_OFFSET = 1;
export const LAST_STEP_OFFSET = 1;

export const OVERFLOW_LEFT_LABEL = 'Previous steps';
export const OVERFLOW_RIGHT_LABEL = 'More steps';

// ── Icon SVGs ────────────────────────────────────────────
export const CHECK_ICON_SIZE = 16;
export const CHECK_ICON_VIEWBOX = '0 0 24 24';
export const CHECK_ICON_POINTS = '20 6 9 17 4 12';

export const ERROR_ICON_SIZE = 16;
export const ERROR_ICON_VIEWBOX = '0 0 24 24';

// ── Base classes ─────────────────────────────────────────
export const STEPPER_BASE_CLASSES = 'Bear-Stepper';
export const STEPPER_HORIZONTAL_CLASSES = 'flex w-full items-center';
export const STEPPER_VERTICAL_CLASSES = 'flex flex-col';

// ── Step wrapper classes ─────────────────────────────────
export const STEP_WRAPPER_HORIZONTAL = 'relative shrink-0 flex-1 min-w-[80px]';
export const STEP_WRAPPER_HORIZONTAL_WINDOW = 'relative min-w-[5rem] max-w-[9rem] shrink-0';
export const STEP_WRAPPER_VERTICAL = 'relative flex items-start pb-8 last:pb-0';

// ── Step indicator classes ───────────────────────────────
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

// ── Connector classes ────────────────────────────────────
export const CONNECTOR_BASE = 'Bear-Stepper__connector absolute transition-colors';
export const CONNECTOR_HORIZONTAL = 'top-4 h-0.5 -translate-y-1/2';
export const CONNECTOR_VERTICAL = 'left-4 top-8 w-0.5 h-full -translate-x-1/2';

export const CONNECTOR_STYLES = {
  solid: '',
  dashed: 'border-dashed',
};

export const CONNECTOR_STATUS = {
  pending: 'bg-gray-200 dark:bg-zinc-700',
  completed: 'bg-green-500',
};

// ── Step label classes ───────────────────────────────────
export const STEP_LABEL_BASE = 'Bear-Stepper__label transition-colors';
export const STEP_LABEL_SIZES: Record<StepperSize, { label: string; description: string }> = {
  sm: { label: 'text-xs', description: 'text-[10px]' },
  md: { label: 'text-sm', description: 'text-xs' },
  lg: { label: 'text-base', description: 'text-sm' },
};

// ── Step description ─────────────────────────────────────
export const STEP_DESCRIPTION_CLASSES = 'text-gray-500 dark:text-gray-400 mt-0.5';
