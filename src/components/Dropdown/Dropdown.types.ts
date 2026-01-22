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
  /** Click handler */
  onClick?: () => void;
  /** Nested items for submenu */
  items?: DropdownItem[];
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
  /** Test ID */
  testId?: string;
}

