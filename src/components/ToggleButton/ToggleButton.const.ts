export const TOGGLE_BUTTON_ROOT_CLASS = 'Bear-ToggleButton';

export const TOGGLE_BUTTON_GROUP_ROOT_CLASS = 'Bear-ToggleButtonGroup';

export const TOGGLE_BUTTON_SIZE_CLASSES: Record<'sm' | 'md' | 'lg' | 'xs' | 'xl', string> = {
  xs: 'bear-h-7 bear-px-2 bear-text-xs',
  sm: 'bear-h-8 bear-px-3 bear-text-sm',
  md: 'bear-h-10 bear-px-4 bear-text-base',
  lg: 'bear-h-12 bear-px-5 bear-text-lg',
  xl: 'bear-h-14 bear-px-6 bear-text-lg',
};

export const TOGGLE_BUTTON_SELECTED_CLASSES =
  'bear-bg-[var(--bear-primary-500)] bear-text-[var(--bear-text-inverted,#fff)] bear-border-[var(--bear-primary-500)] bear-shadow-sm';

export const TOGGLE_BUTTON_BASE_CLASSES =
  'bear-inline-flex bear-items-center bear-justify-center bear-font-medium bear-rounded-md bear-border bear-transition-all bear-duration-200 bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-primary)] bear-text-[var(--bear-text-primary)] hover:bear-bg-[var(--bear-bg-tertiary)]';

export const TOGGLE_BUTTON_GROUP_BASE_CLASSES =
  'bear-inline-flex bear-rounded-lg bear-border bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)] bear-overflow-hidden';
