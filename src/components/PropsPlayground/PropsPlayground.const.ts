import type { BearSize } from '../../types';

export const ROOT_CLASS = 'Bear-PropsPlayground';

export const SIZE_CLASSES: Record<BearSize, { padding: string; text: string; gap: string; label: string; input: string }> = {
  xs: { padding: 'bear-p-2', text: 'bear-text-[10px]', gap: 'bear-gap-2', label: 'bear-text-[9px]', input: 'bear-px-1.5 bear-py-0.5 bear-text-[10px]' },
  sm: { padding: 'bear-p-3', text: 'bear-text-xs', gap: 'bear-gap-2', label: 'bear-text-[10px]', input: 'bear-px-2 bear-py-1 bear-text-xs' },
  md: { padding: 'bear-p-4', text: 'bear-text-sm', gap: 'bear-gap-3', label: 'bear-text-[11px]', input: 'bear-px-2.5 bear-py-1.5 bear-text-xs' },
  lg: { padding: 'bear-p-5', text: 'bear-text-sm', gap: 'bear-gap-3', label: 'bear-text-xs', input: 'bear-px-3 bear-py-2 bear-text-sm' },
  xl: { padding: 'bear-p-6', text: 'bear-text-base', gap: 'bear-gap-4', label: 'bear-text-sm', input: 'bear-px-3.5 bear-py-2.5 bear-text-base' },
};

export const COLUMN_CLASSES: Record<number, string> = {
  1: 'bear-grid-cols-1',
  2: 'bear-grid-cols-2',
  3: 'bear-grid-cols-3',
  4: 'bear-grid-cols-4',
};

export const TYPE_LABELS: Record<string, string> = {
  boolean: 'bool',
  select: 'select',
  number: 'num',
  string: 'str',
};
