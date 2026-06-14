import { formatDocTitleFromPath } from '@/utils/formatDocTitle.utils';
import type { NavItem } from '@/constants/navigation.const';
import { SIDEBAR_NAV_STORAGE_PREFIX, SIDEBAR_GROUP_STORAGE_PREFIX } from './Sidebar.const';

export const getNavLabel = (item: NavItem): string => {
  if (item.path.startsWith('/components/')) {
    return formatDocTitleFromPath(item.path);
  }
  return item.label;
};

export const getNavItemStorageKey = (label: string): string =>
  `${SIDEBAR_NAV_STORAGE_PREFIX}${label.toLowerCase().replace(/\s+/g, '-')}`;

export const getGroupStorageKey = (title: string): string =>
  `${SIDEBAR_GROUP_STORAGE_PREFIX}${title.toLowerCase().replace(/\s+/g, '-')}`;
