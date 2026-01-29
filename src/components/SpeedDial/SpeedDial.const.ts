import type { SpeedDialDirection, SpeedDialSize } from './SpeedDial.types';

// Base classes
export const SPEED_DIAL_BASE = 'Bear-SpeedDial relative inline-flex flex-col items-center';

// Position classes for fixed positioning
export const SPEED_DIAL_POSITIONS = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'top-right': 'fixed top-6 right-6',
  'top-left': 'fixed top-6 left-6',
};

// Direction classes
export const SPEED_DIAL_DIRECTIONS: Record<SpeedDialDirection, { container: string; item: string }> = {
  up: {
    container: 'flex-col-reverse',
    item: '-translate-y-2 mb-2',
  },
  down: {
    container: 'flex-col',
    item: 'translate-y-2 mt-2',
  },
  left: {
    container: 'flex-row-reverse',
    item: '-translate-x-2 mr-2',
  },
  right: {
    container: 'flex-row',
    item: 'translate-x-2 ml-2',
  },
};

// Main button classes
export const SPEED_DIAL_MAIN_BUTTON = 'Bear-SpeedDial__trigger rounded-full shadow-lg transition-all duration-200';

export const SPEED_DIAL_MAIN_SIZES: Record<SpeedDialSize, string> = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
};

export const SPEED_DIAL_MAIN_COLORS = 'bg-pink-500 hover:bg-pink-600 text-white';

// Action button classes
export const SPEED_DIAL_ACTION = 'Bear-SpeedDial__action rounded-full shadow-md transition-all duration-200';

export const SPEED_DIAL_ACTION_SIZES: Record<SpeedDialSize, string> = {
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const SPEED_DIAL_ACTION_COLORS = 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700';

// Actions container
export const SPEED_DIAL_ACTIONS_CONTAINER = 'Bear-SpeedDial__actions absolute flex items-center gap-2';

// Label classes
export const SPEED_DIAL_LABEL = 'Bear-SpeedDial__label px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded shadow-md whitespace-nowrap';

// Animation
export const SPEED_DIAL_ENTER = 'animate-in fade-in zoom-in-95';
export const SPEED_DIAL_EXIT = 'animate-out fade-out zoom-out-95';

