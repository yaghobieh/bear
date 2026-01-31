import { ReactNode } from 'react';

/**
 * Command item interface
 */
export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Keyboard shortcut (e.g., 'Ctrl+K') */
  shortcut?: string;
  /** Category/group name */
  category?: string;
  /** Handler when command is selected */
  onSelect: () => void;
  /** Whether the command is disabled */
  disabled?: boolean;
  /** Keywords for search (in addition to label) */
  keywords?: string[];
  /** Custom metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Command group interface
 */
export interface CommandGroup {
  /** Group name */
  name: string;
  /** Commands in this group */
  commands: CommandItem[];
}

/**
 * CommandPalette translations
 */
export interface CommandPaletteTranslations {
  placeholder: string;
  noResults: string;
  recentCommands: string;
  allCommands: string;
  closeHint: string;
}

/**
 * CommandPalette component props
 */
export interface CommandPaletteProps {
  /** Available commands */
  commands: CommandItem[];
  /** Whether the palette is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show recent commands */
  showRecent?: boolean;
  /** Maximum recent commands to show */
  maxRecent?: number;
  /** Recent command IDs */
  recentIds?: string[];
  /** Callback when recent commands change */
  onRecentChange?: (ids: string[]) => void;
  /** Whether to group commands by category */
  groupByCategory?: boolean;
  /** Custom filter function */
  filterFn?: (command: CommandItem, query: string) => boolean;
  /** Trigger keyboard shortcut */
  triggerKey?: string;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Translation strings */
  translations?: Partial<CommandPaletteTranslations>;
  /** Custom search icon */
  icon?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
}

/**
 * CommandItem component props
 */
export interface CommandItemComponentProps {
  command: CommandItem;
  isHighlighted: boolean;
  onSelect: () => void;
}
