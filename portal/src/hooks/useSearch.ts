import { useState, useMemo, useCallback } from 'react';
import { NAVIGATION, NavItem } from '@/constants/navigation.const';

const SEARCH_HISTORY_KEY = 'bear-search-history';
const MAX_HISTORY = 8;

export interface SearchResult {
  path: string;
  label: string;
  category: string;
}

export interface GroupedResults {
  category: string;
  items: SearchResult[];
}

function loadHistory(): SearchResult[] {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: SearchResult[]) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<SearchResult[]>(loadHistory);

  const allItems = useMemo((): SearchResult[] => {
    const items: SearchResult[] = [];
    const seen = new Set<string>();

    NAVIGATION.forEach(group => {
      const flatten = (navItems: NavItem[], category: string) => {
        navItems.forEach(item => {
          if (item.children && item.children.length > 0) {
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
    ).slice(0, 16);
  }, [query, allItems]);

  const grouped = useMemo((): GroupedResults[] => {
    const map = new Map<string, SearchResult[]>();
    for (const r of results) {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list);
    }
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, [results]);

  const addToHistory = useCallback((item: SearchResult) => {
    setHistory(prev => {
      const next = [item, ...prev.filter(h => h.path !== item.path)].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    grouped,
    history,
    addToHistory,
    clearHistory,
    isOpen,
    openSearch,
    closeSearch,
  };
}
