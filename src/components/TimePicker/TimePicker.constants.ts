export const TIMEPICKER_HOURS_12H = 12;
export const TIMEPICKER_HOURS_24H = 24;
export const TIMEPICKER_MINUTES_DIVISOR = 60;

export const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4',
  lg: 'bear-py-2.5 bear-px-5 bear-text-lg',
};

export const variantClasses: Record<'default' | 'filled' | 'outline', string> = {
  default: 'bear-bg-white dark:bear-bg-zinc-800 bear-border-gray-300 dark:bear-border-zinc-600',
  filled: 'bear-bg-gray-100 dark:bear-bg-zinc-700 bear-border-transparent',
  outline: 'bear-bg-transparent bear-border-gray-400 dark:bear-border-zinc-500',
};

// CSS class constants
export const TIMEPICKER_ROOT_CLASSES = 'Bear-TimePicker bear-relative';

export const TIMEPICKER_LABEL_CLASSES = 'Bear-TimePicker__label bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-zinc-300 bear-mb-1.5';

export const TIMEPICKER_BUTTON_CLASSES = 'Bear-TimePicker__trigger bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-text-left bear-transition-colors';

export const TIMEPICKER_DROPDOWN_CLASSES = 'Bear-TimePicker__dropdown bear-absolute bear-z-50 bear-mt-1 bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3 bear-w-64';

export const TIMEPICKER_COLUMN_HEADER_CLASSES = 'Bear-TimePicker__column-header bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500 bear-mb-1 bear-text-center';

export const TIMEPICKER_COLUMN_CLASSES = 'Bear-TimePicker__column bear-h-32 bear-overflow-y-auto bear-space-y-1';

export const TIMEPICKER_OPTION_CLASSES = 'Bear-TimePicker__option bear-w-full bear-py-1 bear-rounded bear-text-sm bear-transition-colors';

export const TIMEPICKER_OPTION_ACTIVE_CLASSES = 'bear-bg-pink-500 bear-text-white';

export const TIMEPICKER_OPTION_INACTIVE_CLASSES = 'bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700';

export const TIMEPICKER_FOOTER_CLASSES = 'Bear-TimePicker__footer bear-flex bear-gap-2 bear-pt-2 bear-border-t bear-border-gray-200 dark:bear-border-zinc-700';

export const TIMEPICKER_CLEAR_BUTTON_CLASSES = 'Bear-TimePicker__clear bear-flex-1 bear-py-1.5 bear-text-sm bear-text-gray-500 dark:bear-text-zinc-400 hover:bear-text-gray-700 dark:hover:bear-text-white bear-rounded bear-border bear-border-gray-300 dark:bear-border-zinc-600';

export const TIMEPICKER_CONFIRM_BUTTON_CLASSES = 'Bear-TimePicker__confirm bear-flex-1 bear-py-1.5 bear-text-sm bear-bg-pink-500 bear-text-white bear-rounded hover:bear-bg-pink-600';

export const TIMEPICKER_ERROR_CLASSES = 'Bear-TimePicker__error bear-mt-1 bear-text-xs bear-text-red-500';

export const TIMEPICKER_HELPER_CLASSES = 'Bear-TimePicker__helper bear-mt-1 bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500';
