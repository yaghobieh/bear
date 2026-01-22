/**
 * List Component Types
 */
import type { HTMLAttributes, ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** List variant */
  variant?: 'default' | 'bordered' | 'divided';
  /** List size */
  size?: BearSize;
  /** Whether items are hoverable */
  hoverable?: boolean;
  /** Whether list is dense */
  dense?: boolean;
  /** Disable padding */
  disablePadding?: boolean;
  /** Test ID */
  testId?: string;
}

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Primary text content */
  primary?: ReactNode;
  /** Secondary text content */
  secondary?: ReactNode;
  /** Leading content (icon, avatar) */
  leading?: ReactNode;
  /** Trailing content (icon, button, badge) */
  trailing?: ReactNode;
  /** Whether item is selected */
  selected?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is clickable */
  clickable?: boolean;
  /** Divider after item */
  divider?: boolean;
  /** Dense mode */
  dense?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Test ID */
  testId?: string;
}

export interface ListSubheaderProps extends HTMLAttributes<HTMLLIElement> {
  /** Sticky position */
  sticky?: boolean;
  /** Inset for alignment with ListItemText */
  inset?: boolean;
  /** Test ID */
  testId?: string;
}

export interface ListItemTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary text */
  primary?: ReactNode;
  /** Secondary text */
  secondary?: ReactNode;
  /** Inset for alignment */
  inset?: boolean;
  /** Dense mode */
  dense?: boolean;
}

export interface ListItemIconProps extends HTMLAttributes<HTMLDivElement> {
  /** Align icon */
  align?: 'top' | 'center';
}

export interface ListItemButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Whether button is selected */
  selected?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Dense mode */
  dense?: boolean;
  /** Click handler */
  onClick?: () => void;
}

