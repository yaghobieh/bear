import type { DiffSpacing } from './DiffViewer.types';

export const DIFF_COLORS = {
  add: {
    bg: 'rgba(34, 197, 94, 0.15)',
    border: 'rgba(34, 197, 94, 0.4)',
    text: '#22c55e',
  },
  remove: {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.4)',
    text: '#ef4444',
  },
  context: {
    bg: 'transparent',
    border: 'transparent',
    text: 'inherit',
  },
} as const;

export const LINE_NUMBER_WIDTH = 50;

export const LINE_SPACING: Record<DiffSpacing, string> = {
  compact: 'py-0',
  comfortable: 'py-1',
  spacious: 'py-2',
};

export const LINE_HOVER_LABELS: Record<string, string> = {
  add: 'Added',
  remove: 'Removed',
  context: 'Unchanged',
};

export const DEFAULT_OLD_TITLE = 'Original';
export const DEFAULT_NEW_TITLE = 'Modified';
export const DEFAULT_SPACING: DiffSpacing = 'comfortable';
