import type { ReactNode } from 'react';

export interface SpotlightAction {
  /** Unique ID */
  id: string;
  /** Display label */
  label: string;
  /** Description text */
  description?: string;
  /** Left icon */
  icon?: ReactNode;
  /** Right-side content (e.g. shortcut badge) */
  rightSection?: ReactNode;
  /** Group/category name */
  group?: string;
  /** Keywords for search matching */
  keywords?: string[];
  /** Callback when selected */
  onTrigger: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
  /** Nested actions (submenu) */
  children?: SpotlightAction[];
}

export interface SpotlightProps {
  /** Available actions */
  actions: SpotlightAction[];
  /** Whether spotlight is open */
  open?: boolean;
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void;
  /** Search placeholder */
  placeholder?: string;
  /** Keyboard shortcut to trigger (default: 'k') */
  shortcutKey?: string;
  /** Whether shortcut needs Cmd/Ctrl */
  shortcutMod?: boolean;
  /** Nothing found message */
  nothingFoundMessage?: string;
  /** Whether to highlight matches */
  highlightMatches?: boolean;
  /** Limit number of results */
  limit?: number;
  /** Custom filter function */
  filter?: (query: string, actions: SpotlightAction[]) => SpotlightAction[];
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
