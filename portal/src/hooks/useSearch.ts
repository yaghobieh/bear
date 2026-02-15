import { useState, useMemo, useCallback } from 'react';
import { NAVIGATION, NavItem } from '@/constants/navigation.const';

export interface SearchResult {
  path: string;
  label: string;
  category: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Flatten navigation for search — skip parent items that have children (they are groups, not pages)
  const allItems = useMemo((): SearchResult[] => {
    const items: SearchResult[] = [];
    const seen = new Set<string>();

    NAVIGATION.forEach(group => {
      const flatten = (navItems: NavItem[], category: string) => {
        navItems.forEach(item => {
          if (item.children && item.children.length > 0) {
            // Only add children, skip the parent (it's just a group label)
            flatten(item.children, category);
          } else if (!seen.has(item.path)) {
            seen.add(item.path);
            items.push({
              path: item.path,
              label: item.label,
              category,
            });
          }
        });
      };
      flatten(group.items, group.title);
    });

    return items;
  }, []);

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return allItems.filter(item =>
      item.label.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 12);
  }, [query, allItems]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    isOpen,
    openSearch,
    closeSearch,
  };
}
