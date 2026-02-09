export const CONFETTI_DEFAULTS = {
  COUNT: 100,
  DURATION: 3000,
  ORIGIN_X: 0.5,
  ORIGIN_Y: 0.5,
  SPREAD: 60,
  VELOCITY: 30,
  GRAVITY: 0.5,
  AUTO_HIDE: true,
} as const;

export const CONFETTI_COLORS = [
  '#ec4899', // Pink (Bear primary)
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#f97316', // Orange
] as const;

export const CONFETTI_SHAPES = ['square', 'circle', 'triangle'] as const;

export const CONFETTI_SIZE_RANGE = {
  min: 8,
  max: 14,
} as const;
