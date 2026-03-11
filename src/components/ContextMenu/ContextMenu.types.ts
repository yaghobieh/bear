import type { ReactNode } from 'react';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  children?: ContextMenuItem[];
  onClick?: () => void;
}

export interface ContextMenuDivider {
  id: string;
  type: 'divider';
}

export type ContextMenuEntry = ContextMenuItem | ContextMenuDivider;

export interface ContextMenuProps {
  items: ContextMenuEntry[];
  children: ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  testId?: string;
}
