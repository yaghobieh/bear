/**
 * Dropdown Component Types
 */
import type { HTMLAttributes, ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface DropdownItem {
  /** Unique key */
  key: string;
  /** Display label */
  label: ReactNode;
  /** Searchable text (defaults to label if string) */
  searchLabel?: string;
  /** Description shown below label */
  description?: string;
  /** Item icon */
  icon?: ReactNode;
  /** Trailing content */
  trailing?: ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether this is a divider */
  divider?: boolean;
  /** Whether this is a header */
  header?: boolean;
  /** Danger/destructive action */
  danger?: boolean;
  /** Selected/active visual state */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Nested items for submenu */
  items?: DropdownItem[];
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  /** Dropdown trigger element */
  trigger: ReactNode;
  /** Dropdown items */
  items: DropdownItem[];
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' | 'left' | 'right';
  /** Offset from trigger */
  offset?: number;
  /** Whether dropdown should match trigger width */
  matchWidth?: boolean;
  /** Min width of dropdown */
  minWidth?: number;
  /** Max height before scroll */
  maxHeight?: number;
  /** Size variant */
  size?: BearSize;
  /** Close on item click */
  closeOnSelect?: boolean;
  /** Close on outside click */
  closeOnClickOutside?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Handler for open/close */
  onOpenChange?: (open: boolean) => void;
  /** Enable search/filter within dropdown items */
  searchable?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Custom filter function; return true to include the item */
  filterFn?: (item: DropdownItem, query: string) => boolean;
  /** Show loading spinner inside dropdown */
  loading?: boolean;
  /** Loading text shown while loading */
  loadingText?: string;
  /** Text shown when no items match the search */
  emptyText?: string;
  /** Custom render function for each item */
  renderItem?: (item: DropdownItem, index: number) => ReactNode;
  /** Enable multi-select mode — items toggle on click */
  multiSelect?: boolean;
  /** Callback when selected keys change (multiSelect mode) */
  onSelectionChange?: (keys: string[]) => void;
  /** Currently selected keys (controlled, multiSelect mode) */
  selectedKeys?: string[];
  /** Header content above items */
  header?: ReactNode;
  /** Footer content below items */
  footer?: ReactNode;
  /** Virtual scrolling for large lists (renders only visible items) */
  virtualized?: boolean;
  /** Test ID */
  testId?: string;
}

