import type { HTMLAttributes, ReactNode } from 'react';

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon to show before the label */
  icon?: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is selected/active */
  selected?: boolean;
  /** Whether the item shows a divider below */
  divider?: boolean;
  /** Label/content */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Test ID */
  testId?: string;
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether menu is open */
  open?: boolean;
  /** Anchor element for positioning */
  anchorEl?: HTMLElement | null;
  /** Callback when menu should close */
  onClose?: () => void;
  /** Menu items */
  children?: ReactNode;
  /** Position relative to anchor */
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Min width of the menu */
  minWidth?: number;
  /** Max height before scrolling */
  maxHeight?: number;
  /** Test ID */
  testId?: string;
}

export interface MenuDividerProps {
  /** Additional class name */
  className?: string;
}

