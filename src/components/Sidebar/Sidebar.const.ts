import type { SidebarVariant, SidebarActiveVariant } from './Sidebar.types';

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

export const SIDEBAR_ITEM_ACTIVE_FILL = 'bear-bg-bear-500 bear-text-white bear-shadow-md';
export const SIDEBAR_ITEM_ACTIVE_BORDER = 'bear-bg-bear-50 dark:bear-bg-bear-900/30 bear-text-bear-700 dark:bear-text-bear-200 bear-border-l-2 bear-border-bear-500 -bear-ml-px bear-pl-[11px]';
export const SIDEBAR_ITEM_ACTIVE_INDICATOR = 'bear-relative bear-bg-bear-100 dark:bear-bg-bear-900/40 bear-text-bear-700 dark:bear-text-bear-200 before:bear-content-[\'\'] before:bear-absolute before:bear-left-0 before:bear-top-1/2 before:-bear-translate-y-1/2 before:bear-w-1 before:bear-h-6 before:bear-rounded-full before:bear-bg-bear-500';

export const SIDEBAR_ITEM_ACTIVE_CLASSES = SIDEBAR_ITEM_ACTIVE_FILL;

export const SIDEBAR_ITEM_ACTIVE_BY_VARIANT: Record<SidebarActiveVariant, string> = {
  fill: SIDEBAR_ITEM_ACTIVE_FILL,
  border: SIDEBAR_ITEM_ACTIVE_BORDER,
  indicator: SIDEBAR_ITEM_ACTIVE_INDICATOR,
};

export const SIDEBAR_ITEM_INACTIVE_CLASSES = 'bear-text-zinc-600 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 hover:bear-text-zinc-900 dark:hover:bear-text-zinc-100';

export const SIDEBAR_ITEM_DISABLED_CLASSES = 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none';

// Group styles
export const SIDEBAR_GROUP_TITLE_CLASSES = 'bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-zinc-400 dark:bear-text-zinc-500';

// Header/Footer styles  
export const SIDEBAR_HEADER_CLASSES = 'bear-px-3 bear-py-4 bear-border-b bear-border-zinc-100 dark:bear-border-zinc-800 bear-flex bear-items-center bear-justify-between';

export const SIDEBAR_FOOTER_CLASSES = 'bear-px-3 bear-py-3 bear-border-t bear-border-zinc-100 dark:bear-border-zinc-800 bear-mt-auto';

export const SIDEBAR_TOGGLE_CLASSES = 'bear-p-1.5 bear-rounded-lg bear-text-zinc-400 dark:bear-text-zinc-500 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 hover:bear-text-zinc-600 dark:hover:bear-text-zinc-300 bear-transition-colors';

