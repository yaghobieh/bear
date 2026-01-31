import { CommandPaletteTranslations } from './CommandPalette.types';

/**
 * Default translations
 */
export const COMMAND_PALETTE_DEFAULT_TRANSLATIONS: CommandPaletteTranslations = {
  placeholder: 'Type a command or search...',
  noResults: 'No commands found',
  recentCommands: 'Recent',
  allCommands: 'All Commands',
  closeHint: 'Press ESC to close',
};

/**
 * Default trigger key
 */
export const COMMAND_PALETTE_TRIGGER_KEY = 'k';

/**
 * Maximum recent commands
 */
export const COMMAND_PALETTE_MAX_RECENT = 5;

/**
 * Z-index for palette
 */
export const COMMAND_PALETTE_Z_INDEX = 9999;

/**
 * Animation duration
 */
export const COMMAND_PALETTE_ANIMATION_DURATION = 150;

/**
 * Maximum visible commands
 */
export const COMMAND_PALETTE_MAX_VISIBLE = 10;
