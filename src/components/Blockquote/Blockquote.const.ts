import type { BlockquoteColor } from './Blockquote.types';

export const BORDER_COLOR_MAP: Record<BlockquoteColor, string> = {
  default:
    'bear-border-l-gray-300 dark:bear-border-l-zinc-600',
  primary:
    'bear-border-l-pink-500 dark:bear-border-l-pink-400',
  success:
    'bear-border-l-green-500 dark:bear-border-l-green-400',
  warning:
    'bear-border-l-amber-500 dark:bear-border-l-amber-400',
  error:
    'bear-border-l-red-500 dark:bear-border-l-red-400',
};

export const ICON_COLOR_MAP: Record<BlockquoteColor, string> = {
  default:
    'bear-text-gray-500 dark:bear-text-zinc-400',
  primary:
    'bear-text-pink-500 dark:bear-text-pink-400',
  success:
    'bear-text-green-500 dark:bear-text-green-400',
  warning:
    'bear-text-amber-500 dark:bear-text-amber-400',
  error:
    'bear-text-red-500 dark:bear-text-red-400',
};

export const ROOT_CLASS =
  'Bear-Blockquote bear-pl-4 bear-py-2 bear-border-l-4 bear-bg-gray-50 dark:bear-bg-zinc-800/50 bear-rounded-r bear-not-italic';
export const CITE_CLASS = 'Bear-Blockquote__cite bear-mt-2';
