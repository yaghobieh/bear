import type { SidebarItem } from './Sidebar.types';

export const sidebarItemContainsId = (item: SidebarItem, activeItemId?: string): boolean => {
  if (!activeItemId) {
    return false;
  }
  if (item.id === activeItemId) {
    return true;
  }
  const children = item.children;
  if (!children || children.length === 0) {
    return false;
  }
  return children.some((child) => sidebarItemContainsId(child, activeItemId));
};
