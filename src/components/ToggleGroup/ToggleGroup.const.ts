import type {
  ToggleGroupOrientation,
  ToggleGroupSize,
  ToggleGroupVariant,
} from './ToggleGroup.types';

export const TOGGLE_GROUP_TYPE_SINGLE = 'single';
export const TOGGLE_GROUP_TYPE_MULTIPLE = 'multiple';

export const TOGGLE_GROUP_ORIENTATION_HORIZONTAL = 'horizontal';
export const TOGGLE_GROUP_ORIENTATION_VERTICAL = 'vertical';

export const TOGGLE_GROUP_DEFAULT_SIZE: ToggleGroupSize = 'md';
export const TOGGLE_GROUP_DEFAULT_VARIANT: ToggleGroupVariant = 'subtle';

export const COMPONENT_NAME_TOGGLE_GROUP = 'ToggleGroup';
export const COMPONENT_NAME_TOGGLE_GROUP_ITEM = 'ToggleGroupItem';

export const SIZE_CLASS_MAP: Record<ToggleGroupSize, string> = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-base',
};

export const VARIANT_CLASS_MAP: Record<ToggleGroupVariant, { base: string; active: string }> = {
  subtle: {
    base: 'text-[var(--bear-text-secondary)] hover:bg-[var(--bear-bg-subtle)] hover:text-[var(--bear-text-primary)]',
    active: 'bg-[var(--bear-bg-subtle)] text-[var(--bear-text-primary)] font-medium',
  },
  outline: {
    base: 'text-[var(--bear-text-secondary)] hover:bg-[var(--bear-bg-subtle)] hover:text-[var(--bear-text-primary)] border border-transparent',
    active: 'border-[var(--bear-primary-500)] text-[var(--bear-primary-600)] dark:text-[var(--bear-primary-400)] bg-[var(--bear-primary-50)] dark:bg-[var(--bear-primary-950)] font-medium',
  },
  filled: {
    base: 'text-[var(--bear-text-secondary)] hover:bg-[var(--bear-bg-subtle)]',
    active: 'bg-[var(--bear-primary-500)] text-white hover:bg-[var(--bear-primary-600)] font-medium',
  },
};

export const ORIENTATION_CLASS_MAP: Record<ToggleGroupOrientation, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
};
