import type { SidebarVariant } from './Sidebar.types';

// Layout dimensions
export const SIDEBAR_WIDTH = 256;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const SIDEBAR_PADDING_BASE = 16;
export const SIDEBAR_DEPTH_INDENT = 12;
export const SIDEBAR_ICON_SIZE = 14;
export const SIDEBAR_TOGGLE_ICON_SIZE = 18;

// Variant styles
export const SIDEBAR_VARIANT_STYLES: Record<SidebarVariant, string> = {
  default: 'bear-bg-white dark:bear-bg-zinc-900 bear-border-zinc-200 dark:bear-border-zinc-700',
  bordered: 'bear-bg-white dark:bear-bg-zinc-900 bear-border-2 bear-border-zinc-300 dark:bear-border-zinc-600 bear-rounded-xl bear-m-2',
  floating: 'bear-bg-white/95 dark:bear-bg-zinc-900/95 bear-backdrop-blur-sm bear-shadow-2xl bear-rounded-xl bear-m-3',
};

// Item styles
export const SIDEBAR_ITEM_BASE_CLASSES = 'bear-flex bear-items-center bear-gap-3 bear-py-2.5 bear-px-3 bear-rounded-lg bear-text-sm bear-transition-all bear-duration-200 bear-cursor-pointer';

export const SIDEBAR_ITEM_ACTIVE_CLASSES = 'bear-bg-pink-500 bear-text-white bear-shadow-md';

export const SIDEBAR_ITEM_INACTIVE_CLASSES = 'bear-text-zinc-600 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 hover:bear-text-zinc-900 dark:hover:bear-text-zinc-100';

export const SIDEBAR_ITEM_DISABLED_CLASSES = 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none';

// Group styles
export const SIDEBAR_GROUP_TITLE_CLASSES = 'bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-zinc-400 dark:bear-text-zinc-500';

// Header/Footer styles  
export const SIDEBAR_HEADER_CLASSES = 'bear-px-3 bear-py-4 bear-border-b bear-border-zinc-100 dark:bear-border-zinc-800 bear-flex bear-items-center bear-justify-between';

export const SIDEBAR_FOOTER_CLASSES = 'bear-px-3 bear-py-3 bear-border-t bear-border-zinc-100 dark:bear-border-zinc-800 bear-mt-auto';

export const SIDEBAR_TOGGLE_CLASSES = 'bear-p-1.5 bear-rounded-lg bear-text-zinc-400 dark:bear-text-zinc-500 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 hover:bear-text-zinc-600 dark:hover:bear-text-zinc-300 bear-transition-colors';

