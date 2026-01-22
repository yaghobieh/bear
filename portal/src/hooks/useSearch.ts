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

  // Flatten navigation for search
  const allItems = useMemo((): SearchResult[] => {
    const items: SearchResult[] = [];
    
    NAVIGATION.forEach(group => {
      const flatten = (navItems: NavItem[], category: string) => {
        navItems.forEach(item => {
          items.push({
            path: item.path,
            label: item.label,
            category,
          });
          if (item.children) {
            flatten(item.children, category);
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
    ).slice(0, 10);
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

