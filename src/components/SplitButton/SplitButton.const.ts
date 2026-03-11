export const VARIANT_CLASSES = {
  primary: 'bear-bg-pink-500 bear-text-white hover:bear-bg-pink-600',
  secondary: 'bear-bg-gray-600 bear-text-white hover:bear-bg-gray-700',
  outline: 'bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-50 dark:hover:bear-bg-zinc-700',
  danger: 'bear-bg-red-500 bear-text-white hover:bear-bg-red-600',
} as const;

export const SIZE_CLASSES = {
  sm: 'bear-text-sm bear-py-1.5 bear-px-3',
  md: 'bear-text-sm bear-py-2 bear-px-4',
  lg: 'bear-text-base bear-py-2.5 bear-px-5',
} as const;

export const ARROW_SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-2',
  md: 'bear-py-2 bear-px-2.5',
  lg: 'bear-py-2.5 bear-px-3',
} as const;

export const ROOT_CLASSES = 'Bear-SplitButton bear-relative bear-inline-flex';
export const MAIN_BTN_CLASSES = 'bear-font-medium bear-transition-colors bear-rounded-l-lg bear-flex bear-items-center bear-gap-1.5';
export const ARROW_BTN_CLASSES = 'bear-rounded-r-lg bear-border-l bear-border-white/20 bear-transition-colors bear-flex bear-items-center bear-justify-center';
export const DROPDOWN_CLASSES = 'bear-absolute bear-z-[9999] bear-mt-1 bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-py-1 bear-min-w-[160px] bear-animate-in';
export const OPTION_CLASSES = 'bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-1.5 bear-text-sm bear-cursor-pointer bear-transition-colors bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-50 dark:hover:bear-bg-zinc-700';
export const OPTION_DANGER_CLASSES = 'bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-50 dark:hover:bear-bg-red-900/20';
export const OPTION_DISABLED_CLASSES = 'bear-opacity-40 bear-cursor-not-allowed';
export const DIVIDER_CLASSES = 'bear-border-l bear-border-white/30';
export const SPINNER_CLASSES = 'bear-w-4 bear-h-4 bear-border-2 bear-border-current/30 bear-border-t-current bear-rounded-full bear-animate-spin';
