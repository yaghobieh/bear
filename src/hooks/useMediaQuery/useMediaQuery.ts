import { useState, useEffect, useCallback } from 'react';
import type { UseMediaQueryOptions, UseMediaQueryReturn, BreakpointKey } from './useMediaQuery.types';
import { BREAKPOINTS } from './useMediaQuery.types';

const getMatches = (query: string): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

/**
 * useMediaQuery - Track media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDark = useMediaQuery('dark'); // Uses predefined breakpoint
 * ```
 */
export const useMediaQuery = (
  query: string | BreakpointKey,
  options: UseMediaQueryOptions = {}
): UseMediaQueryReturn => {
  const { defaultValue = false, initializeWithValue = true } = options;

  // Resolve query from breakpoints if it's a key
  const resolvedQuery = BREAKPOINTS[query as BreakpointKey] || query;

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(resolvedQuery);
    }
    return defaultValue;
  });

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(resolvedQuery);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [resolvedQuery, handleChange]);

  return matches;
};

export default useMediaQuery;

