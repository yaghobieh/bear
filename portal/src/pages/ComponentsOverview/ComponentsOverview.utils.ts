import type { NavItem } from '@/constants/navigation.const';
import { NAVIGATION } from '@/constants/navigation.const';
import { CATALOG_ALL, CATALOG_NAV_GROUPS } from './ComponentsOverview.const';
import type { CatalogEntry } from './ComponentsOverview.types';

const flattenNavItems = (items: NavItem[], category: string, groupTitle: string): CatalogEntry[] => {
  const result: CatalogEntry[] = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        result.push({
          label: child.label,
          path: child.path,
          badge: child.badge,
          category: item.label,
          groupTitle,
        });
      }
      continue;
    }
    result.push({
      label: item.label,
      path: item.path,
      badge: item.badge,
      category,
      groupTitle,
    });
  }
  return result;
};

export const buildCatalogEntries = (): CatalogEntry[] => {
  const groups = NAVIGATION.filter((group) =>
    CATALOG_NAV_GROUPS.includes(group.title as (typeof CATALOG_NAV_GROUPS)[number])
  );
  const seen = new Set<string>();
  const entries: CatalogEntry[] = [];
  for (const group of groups) {
    const flattened = flattenNavItems(group.items, group.title, group.title);
    for (const entry of flattened) {
      if (seen.has(entry.path)) {
        continue;
      }
      seen.add(entry.path);
      entries.push(entry);
    }
  }
  return entries;
};

export const uniqueCategories = (entries: CatalogEntry[]): string[] => {
  const names = new Set<string>();
  for (const entry of entries) {
    names.add(entry.category);
  }
  return Array.from(names);
};

export const filterCatalogEntries = (
  entries: CatalogEntry[],
  query: string,
  category: string
): CatalogEntry[] => {
  const normalized = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesCategory = category === CATALOG_ALL || entry.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    return (
      entry.label.toLowerCase().includes(normalized) ||
      entry.path.toLowerCase().includes(normalized) ||
      entry.category.toLowerCase().includes(normalized)
    );
  });
};

export const formatCatalogCount = (template: string, count: number): string =>
  template.replace('{count}', String(count));
