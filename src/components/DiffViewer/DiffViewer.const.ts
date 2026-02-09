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
