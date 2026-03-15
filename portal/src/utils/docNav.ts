import { NAVIGATION, NavItem } from '@/constants/navigation.const';

export interface DocNavItem {
  path: string;
  label: string;
}

/** Flatten NAVIGATION into an ordered list of doc pages (path + label) for prev/next. */
export function getFlatDocNav(): DocNavItem[] {
  const items: DocNavItem[] = [];

  function add(item: NavItem) {
    if (item.children && item.children.length > 0) {
      item.children.forEach(add);
    } else {
      items.push({ path: item.path, label: item.label });
    }
  }

  NAVIGATION.forEach((group) => {
    group.items.forEach(add);
  });

  return items;
}

const FLAT_DOC_NAV = getFlatDocNav();

export function getPrevNext(pathname: string): { prev: DocNavItem | null; next: DocNavItem | null } {
  const idx = FLAT_DOC_NAV.findIndex((item) => item.path === pathname);
  if (idx < 0) {
    return { prev: null, next: null };
  }
  return {
    prev: idx > 0 ? FLAT_DOC_NAV[idx - 1]! : null,
    next: idx < FLAT_DOC_NAV.length - 1 ? FLAT_DOC_NAV[idx + 1]! : null,
  };
}
