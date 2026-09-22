import type { HTMLAttributes, ReactNode } from 'react';
import type { OverlayMotionEffect, OverlayEffectConfig } from '@hooks/useFixedAnchorPosition';

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
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
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
  /** Min width of the menu */
  minWidth?: number;
  /** Max height before scrolling */
  maxHeight?: number;
  /** Transition effect when opening */
  openEffect?: OverlayMotionEffect;
  /** Transition effect when closing */
  closeEffect?: OverlayMotionEffect;
  /** Config for open and close transition effects */
  effect?: OverlayEffectConfig;
  /** Test ID */
  testId?: string;
}

export interface MenuDividerProps {
  /** Additional class name */
  className?: string;
}
