import type { NavItem, NavGroup } from '@/constants/navigation.const';

export type { NavItem, NavGroup };

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  topOffset?: number;
  hiddenDesktop?: boolean;
}

export interface NestedNavItemProps {
  item: NavItem;
  onItemClick?: () => void;
  searchQuery?: string;
}

export interface CollapsibleGroupProps {
  group: NavGroup;
  onItemClick?: () => void;
  defaultOpen?: boolean;
  searchQuery?: string;
}
