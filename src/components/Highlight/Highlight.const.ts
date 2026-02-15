import type { HighlightColor } from './Highlight.types';

/**
 * Highlight color classes — uses CSS variables for theme integration.
 * 'primary' maps to BearProvider's primary color.
 */
export const HIGHLIGHT_COLOR_CLASSES: Record<HighlightColor, string> = {
  primary: 'bear-bg-[var(--bear-primary-100,#fce7f3)] dark:bear-bg-[var(--bear-primary-900,#831843)]/30',
  yellow: 'bear-bg-yellow-200 dark:bear-bg-yellow-500/30',
  pink: 'bear-bg-pink-200 dark:bear-bg-pink-500/30',
  blue: 'bear-bg-blue-200 dark:bear-bg-blue-500/30',
  green: 'bear-bg-green-200 dark:bear-bg-green-500/30',
  purple: 'bear-bg-purple-200 dark:bear-bg-purple-500/30',
  orange: 'bear-bg-orange-200 dark:bear-bg-orange-500/30',
  red: 'bear-bg-red-200 dark:bear-bg-red-500/30',
  cyan: 'bear-bg-cyan-200 dark:bear-bg-cyan-500/30',
};

/** Default highlight color */
export const DEFAULT_COLOR: HighlightColor = 'yellow';
