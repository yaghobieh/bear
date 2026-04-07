export const COLOR_PICKER_DEFAULT_VALUE = '#ec4899';
export const COLOR_PICKER_HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export const COLOR_PICKER_DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#64748b', '#1e293b', '#000000', '#ffffff',
];

export const COLOR_PICKER_SWATCH_SIZE = {
  sm: { swatch: 'bear-w-6 bear-h-6', presetSwatch: 'bear-w-5 bear-h-5' },
  md: { swatch: 'bear-w-8 bear-h-8', presetSwatch: 'bear-w-6 bear-h-6' },
  lg: { swatch: 'bear-w-10 bear-h-10', presetSwatch: 'bear-w-7 bear-h-7' },
} as const;

export const COLOR_PICKER_LABEL_CLASSES =
  'bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-zinc-300 bear-mb-1.5';

export const COLOR_PICKER_INPUT_CLASSES =
  'bear-px-3 bear-py-1.5 bear-rounded-lg bear-border bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white bear-text-sm bear-font-mono bear-w-24 bear-outline-none bear-border-gray-300 dark:bear-border-zinc-600 focus:bear-border-pink-500';

export const COLOR_PICKER_SWATCH_CLASSES =
  'bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-transition-all hover:bear-scale-105 bear-shadow-sm';

export const COLOR_PICKER_POPUP_CLASSES =
  'bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-xl bear-shadow-xl bear-p-4 bear-animate-in bear-fade-in bear-duration-150 bear-w-64';

export const COLOR_PICKER_HUE_STRIP_CLASSES =
  'bear-w-full bear-h-2 bear-rounded-full bear-cursor-pointer bear-appearance-none bear-border-0 bear-mb-3';

export const COLOR_PICKER_PRESET_ACTIVE_CLASSES =
  'bear-border-gray-900 dark:bear-border-white bear-ring-2 bear-ring-pink-500';

export const COLOR_PICKER_PRESET_INACTIVE_CLASSES =
  'bear-border-gray-300 dark:bear-border-zinc-600';

export const COLOR_PICKER_PRESET_ITEM_CLASSES =
  'bear-rounded bear-border bear-transition-transform hover:bear-scale-110 bear-shadow-sm';

export const COLOR_PICKER_GRID_CLASSES =
  'bear-grid bear-grid-cols-6 bear-gap-1.5';

export const COLOR_PICKER_POPUP_Z_INDEX = 11000;

export const COLOR_PICKER_HUE_BACKGROUND =
  'linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)';
