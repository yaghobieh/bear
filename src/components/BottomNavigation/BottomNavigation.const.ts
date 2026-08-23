import type { BottomNavigationVariant } from './BottomNavigation.types';

export const BOTTOM_NAVIGATION_VARIANT_CLASSES: Record<BottomNavigationVariant, string> = {
  default:
    'bear-bg-white dark:bear-bg-zinc-900 bear-border-t bear-border-gray-200 dark:bear-border-zinc-800',
  elevated:
    'bear-bg-white dark:bear-bg-zinc-900 bear-shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:bear-shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
  transparent:
    'bear-bg-white/80 dark:bear-bg-zinc-900/80 bear-backdrop-blur-md bear-border-t bear-border-gray-200/70 dark:bear-border-zinc-800/50',
};
