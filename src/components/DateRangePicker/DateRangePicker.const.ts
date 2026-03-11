import type { DateRangePreset } from './DateRangePicker.types';

export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
export const CALENDAR_ROWS = 6;

export const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export const SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4 bear-text-base',
  lg: 'bear-py-2.5 bear-px-5 bear-text-lg',
} as const;

export const ROOT_CLASSES = 'Bear-DateRangePicker bear-relative bear-inline-block';
export const TRIGGER_CLASSES = 'bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white bear-transition-colors focus:bear-ring-2 focus:bear-ring-pink-500 bear-outline-none';
export const DROPDOWN_CLASSES = 'bear-absolute bear-z-[9999] bear-mt-1 bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-xl bear-shadow-xl bear-p-4';
export const CALENDAR_HEADER_CLASSES = 'bear-flex bear-items-center bear-justify-between bear-mb-2';
export const NAV_BTN_CLASSES = 'bear-p-1 bear-rounded hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700 bear-text-gray-500 dark:bear-text-zinc-400';
export const DAY_BASE_CLASSES = 'bear-w-8 bear-h-8 bear-text-sm bear-rounded-full bear-transition-colors bear-cursor-pointer';
export const DAY_SELECTED_CLASSES = 'bear-bg-pink-500 bear-text-white';
export const DAY_IN_RANGE_CLASSES = 'bear-bg-pink-100 dark:bear-bg-pink-900/30 bear-text-pink-800 dark:bear-text-pink-200';
export const DAY_HOVER_CLASSES = 'hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700';
export const DAY_DISABLED_CLASSES = 'bear-text-gray-300 dark:bear-text-zinc-600 bear-cursor-not-allowed';
export const DAY_TODAY_CLASSES = 'bear-ring-1 bear-ring-pink-400';
export const PRESET_BTN_CLASSES = 'bear-w-full bear-text-left bear-px-3 bear-py-1.5 bear-text-sm bear-rounded bear-transition-colors hover:bear-bg-pink-50 dark:hover:bear-bg-pink-900/20 bear-text-gray-700 dark:bear-text-zinc-300';
export const LABEL_CLASSES = 'Bear-DateRangePicker__label bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-zinc-300 bear-mb-1.5';
export const ERROR_CLASSES = 'bear-mt-1 bear-text-xs bear-text-red-500';
export const HELPER_CLASSES = 'bear-mt-1 bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500';

export const getDefaultPresets = (): DateRangePreset[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return [
    {
      label: 'Today',
      range: () => ({ start: new Date(today), end: new Date(today) }),
    },
    {
      label: 'Last 7 days',
      range: () => {
        const s = new Date(today);
        s.setDate(s.getDate() - 6);
        return { start: s, end: new Date(today) };
      },
    },
    {
      label: 'Last 30 days',
      range: () => {
        const s = new Date(today);
        s.setDate(s.getDate() - 29);
        return { start: s, end: new Date(today) };
      },
    },
    {
      label: 'This month',
      range: () => ({ start: new Date(today.getFullYear(), today.getMonth(), 1), end: new Date(today) }),
    },
    {
      label: 'Last month',
      range: () => {
        const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const e = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: s, end: e };
      },
    },
  ];
};
