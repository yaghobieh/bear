import type { ModalSize } from './Modal.types';

// Z-index
export const MODAL_Z_INDEX = 50;

// Size classes
export const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'bear-max-w-sm',
  md: 'bear-max-w-md',
  lg: 'bear-max-w-lg',
  xl: 'bear-max-w-xl',
  full: 'bear-max-w-full bear-mx-4',
};

// Backdrop
export const MODAL_BACKDROP_CLASSES = 'bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity';

// Container
export const MODAL_CONTAINER_CLASSES = 'bear-relative bear-w-full bear-bg-white dark:bear-bg-zinc-900 bear-rounded-xl bear-shadow-2xl bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-transform bear-transition-all bear-animate-in bear-fade-in bear-zoom-in-95';

// Header
export const MODAL_HEADER_CLASSES = 'bear-flex bear-items-center bear-justify-between bear-px-6 bear-py-4 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700';

// Title
export const MODAL_TITLE_CLASSES = 'bear-text-lg bear-font-semibold bear-text-gray-900 dark:bear-text-white';

// Close button
export const MODAL_CLOSE_CLASSES = 'bear-p-1 bear-rounded-lg bear-text-gray-400 dark:bear-text-zinc-500 hover:bear-text-gray-600 dark:hover:bear-text-white hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700 bear-transition-colors';

// Body
export const MODAL_BODY_CLASSES = 'bear-px-6 bear-py-4 bear-text-gray-600 dark:bear-text-gray-300';

// Footer
export const MODAL_FOOTER_CLASSES = 'bear-flex bear-items-center bear-justify-end bear-gap-3 bear-px-6 bear-py-4 bear-border-t bear-border-gray-200 dark:bear-border-zinc-700';

