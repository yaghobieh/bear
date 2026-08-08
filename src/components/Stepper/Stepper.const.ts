import type { StepperSize, StepStatus, StepperOrientation } from './Stepper.types';

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

export const CHECK_ICON_SIZE = 16;
export const CHECK_ICON_VIEWBOX = '0 0 24 24';
export const CHECK_ICON_POINTS = '20 6 9 17 4 12';

export const ERROR_ICON_SIZE = 16;
export const ERROR_ICON_VIEWBOX = '0 0 24 24';

export const STEPPER_BASE_CLASSES = 'Bear-Stepper';
export const STEPPER_HORIZONTAL_CLASSES = 'bear-flex bear-w-full bear-items-center';
export const STEPPER_VERTICAL_CLASSES = 'bear-flex bear-flex-col';

export const STEP_WRAPPER_HORIZONTAL = 'bear-relative bear-shrink-0 bear-flex-1 bear-min-w-[80px]';
export const STEP_WRAPPER_HORIZONTAL_WINDOW = 'bear-relative bear-min-w-[5rem] bear-max-w-[9rem] bear-shrink-0';
export const STEP_WRAPPER_VERTICAL = 'bear-relative bear-flex bear-items-start bear-pb-8 last:bear-pb-0';

export const STEP_INDICATOR_BASE =
  'Bear-Stepper__indicator bear-flex bear-items-center bear-justify-center bear-rounded-full bear-font-medium bear-transition-all';

export const STEP_INDICATOR_SIZES: Record<StepperSize, string> = {
  sm: 'bear-w-6 bear-h-6 bear-text-xs',
  md: 'bear-w-8 bear-h-8 bear-text-sm',
  lg: 'bear-w-10 bear-h-10 bear-text-base',
};

export const STEP_STATUS_CLASSES: Record<StepStatus, { indicator: string; label: string }> = {
  pending: {
    indicator:
      'bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-gray-600 dark:bear-text-gray-400',
    label: 'bear-text-gray-500 dark:bear-text-gray-400',
  },
  active: {
    indicator:
      'bear-bg-primary-500 dark:bear-bg-primary-500 bear-text-white bear-shadow-lg bear-shadow-primary-500/30',
    label: 'bear-text-gray-900 dark:bear-text-white bear-font-medium',
  },
  completed: {
    indicator: 'bear-bg-green-500 bear-text-white',
    label: 'bear-text-gray-700 dark:bear-text-gray-300',
  },
  error: {
    indicator: 'bear-bg-red-500 bear-text-white',
    label: 'bear-text-red-500 dark:bear-text-red-400',
  },
};

export const CONNECTOR_BASE = 'Bear-Stepper__connector bear-absolute bear-transition-colors';
export const CONNECTOR_HORIZONTAL = 'bear-top-4 bear-h-0.5 -bear-translate-y-1/2';
export const CONNECTOR_VERTICAL = 'bear-left-4 bear-top-8 bear-w-0.5 bear-h-full -bear-translate-x-1/2';

export const CONNECTOR_STYLES = {
  solid: '',
  dashed: 'bear-border-dashed',
};

export const CONNECTOR_STATUS = {
  pending: 'bear-bg-gray-200 dark:bear-bg-zinc-700',
  completed: 'bear-bg-green-500',
};

export const STEP_LABEL_BASE = 'Bear-Stepper__label bear-transition-colors';
export const STEP_LABEL_SIZES: Record<StepperSize, { label: string; description: string }> = {
  sm: { label: 'bear-text-xs', description: 'bear-text-[10px]' },
  md: { label: 'bear-text-sm', description: 'bear-text-xs' },
  lg: { label: 'bear-text-base', description: 'bear-text-sm' },
};

export const STEP_DESCRIPTION_CLASSES = 'bear-text-gray-500 dark:bear-text-gray-400 bear-mt-0.5';

export const STEP_CLICKABLE_CLASSES = 'bear-cursor-pointer hover:bear-scale-105';
export const CONNECTOR_HORIZONTAL_LAYOUT =
  'Bear-Stepper__connector bear-flex-1 bear-self-center bear-mx-1 bear-h-0.5 bear-min-w-[12px] bear-transition-colors';
export const CONNECTOR_DASHED_CLASSES = 'bear-border-t-2 bear-border-dashed bear-bg-transparent';
export const STEP_CONTENT_BASE = 'Bear-Stepper__content bear-flex bear-shrink-0';
export const STEP_CONTENT_ALTERNATIVE = 'bear-flex-col bear-items-center';
export const STEP_CONTENT_INLINE = 'bear-items-center bear-gap-2';
export const STEP_LABEL_ALTERNATIVE = 'bear-text-center bear-mt-2 bear-whitespace-nowrap';
export const STEP_LABEL_INLINE = 'bear-whitespace-nowrap';
export const STEP_VERTICAL_INDICATOR_WRAP = 'bear-flex-shrink-0 bear-mr-4';
export const STEP_VERTICAL_BODY = 'bear-flex-1 bear-pt-0.5';
export const STEP_VERTICAL_CONTENT = 'bear-mt-4';
export const STEP_OVERFLOW_ROOT = 'Bear-Stepper__overflow bear-shrink-0';
