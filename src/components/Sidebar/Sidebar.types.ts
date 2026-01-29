import { ReactNode, CSSProperties } from 'react';

export type SidebarVariant = 'default' | 'bordered' | 'floating';
export type SidebarPosition = 'left' | 'right';
export type SidebarActiveVariant = 'fill' | 'border' | 'indicator';

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
  /** When false, header (e.g. logo + title) is not rendered. Default true. */
  showHeader?: boolean;
  activeItemId?: string;
  onItemClick?: (item: SidebarItem) => void;
  /** How the active item is highlighted: fill (solid bg), border (left border), indicator (pill). Default fill. */
  activeVariant?: SidebarActiveVariant;
  /** When true, sidebar uses min-h-full so it fills viewport height. Default false. */
  fullHeight?: boolean;
  variant?: SidebarVariant;
  position?: SidebarPosition;
  className?: string;
  style?: CSSProperties;
  testId?: string;
  id?: string;
}

export interface SidebarGroupProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export interface SidebarItemComponentProps {
  item: SidebarItem;
  isActive?: boolean;
  collapsed?: boolean;
  depth?: number;
  onClick?: (item: SidebarItem) => void;
  /** How active state is shown. Passed from Sidebar activeVariant. */
  activeVariant?: SidebarActiveVariant;
}
