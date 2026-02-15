import type { GradientPreset, GradientDirection } from './GradientText.types';

/** Gradient presets — primary uses CSS variables for theme integration */
export const GRADIENT_PRESETS: Record<GradientPreset, string[]> = {
  primary: ['var(--bear-primary-400, #f472b6)', 'var(--bear-primary-600, #db2777)'],
  sunset: ['#f97316', '#ef4444', '#ec4899'],
  ocean: ['#06b6d4', '#3b82f6', '#8b5cf6'],
  forest: ['#22c55e', '#10b981', '#14b8a6'],
  fire: ['#fbbf24', '#f97316', '#ef4444'],
  purple: ['#a855f7', '#7c3aed', '#6366f1'],
  neon: ['#22d3ee', '#a78bfa', '#f472b6'],
  candy: ['#f472b6', '#fb923c', '#fbbf24'],
  aurora: ['#34d399', '#22d3ee', '#818cf8', '#c084fc'],
  midnight: ['#6366f1', '#8b5cf6', '#a78bfa'],
};

/** Direction to CSS gradient mapping */
export const DIRECTION_MAP: Record<GradientDirection, string> = {
  'to-r': 'to right',
  'to-l': 'to left',
  'to-t': 'to top',
  'to-b': 'to bottom',
  'to-tr': 'to top right',
  'to-tl': 'to top left',
  'to-br': 'to bottom right',
  'to-bl': 'to bottom left',
};

/** Default animation speed in seconds */
export const DEFAULT_ANIMATION_SPEED = 3;

/** Animated background size */
export const ANIMATED_BG_SIZE = '200% 200%';

/** Font weight map */
export const WEIGHT_MAP: Record<string, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

/** Default font weight */
export const DEFAULT_WEIGHT = 700;

/** Number of color repetitions for seamless animation */
export const COLOR_REPEAT_COUNT = 3;
