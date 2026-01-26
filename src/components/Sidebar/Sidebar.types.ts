import { ReactNode, CSSProperties } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
  badge?: ReactNode;
  disabled?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number | string;
  collapsedWidth?: number | string;
  header?: ReactNode;
  footer?: ReactNode;
  activeItemId?: string;
  onItemClick?: (item: SidebarItem) => void;
  variant?: 'default' | 'bordered' | 'floating';
  position?: 'left' | 'right';
  className?: string;
  style?: CSSProperties;
}

export interface SidebarGroupProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export interface SidebarItemProps {
  item: SidebarItem;
  isActive?: boolean;
  collapsed?: boolean;
  depth?: number;
  onClick?: (item: SidebarItem) => void;
}

