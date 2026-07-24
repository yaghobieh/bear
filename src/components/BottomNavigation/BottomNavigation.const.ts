export const BOTTOM_NAVIGATION_ROOT_CLASS = 'Bear-BottomNavigation';

export const BOTTOM_NAVIGATION_VARIANT_CLASSES = {
  default:
    'bear-bg-white dark:bear-bg-zinc-900 bear-border-t bear-border-gray-200 dark:bear-border-zinc-800',
  elevated:
    'bear-bg-white dark:bear-bg-zinc-900 bear-shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:bear-shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
  transparent:
    'bear-bg-white/80 dark:bear-bg-zinc-900/80 bear-backdrop-blur-md bear-border-t bear-border-gray-200/70 dark:bear-border-zinc-800/50',
} as const;

export const BOTTOM_NAVIGATION_ACTIVE_CLASSES = 'bear-text-primary-600 dark:bear-text-primary-400';

export const BOTTOM_NAVIGATION_INACTIVE_CLASSES =
  'bear-text-gray-500 hover:bear-text-gray-800 dark:bear-text-zinc-500 dark:hover:bear-text-zinc-300';
