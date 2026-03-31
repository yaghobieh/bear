import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import type { UseMediaQueryOptions, UseMediaQueryReturn, BreakpointKey } from './useMediaQuery.types';
import { BREAKPOINTS } from './useMediaQuery.types';
import { BearContext } from '../../context/BearProvider';

const getMatches = (query: string): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

/**
 * useMediaQuery - Track media query matches
 *
 * Resolves breakpoint keys (sm, md, lg, xl, 2xl, dark, etc.) to media queries.
 * When used inside a BearProvider, breakpoints from the theme are used,
 * so you can override `xl` or add custom keys like `xxl`.
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isLg = useMediaQuery('lg');
 *
 * // With BearProvider breakpoints override:
 * // <BearProvider theme={{ breakpoints: { xl: '2500px', xxl: '3000px' } }}>
 * const isXl = useMediaQuery('xl'); // now matches 2500px
 * ```
 */
export const useMediaQuery = (
  query: string | BreakpointKey,
  options: UseMediaQueryOptions = {}
): UseMediaQueryReturn => {
  const { defaultValue = false, initializeWithValue = true } = options;

  const ctx = useContext(BearContext);

  const resolvedQuery = useMemo(() => {
    const key = query as string;

    if (ctx?.theme?.breakpoints && key in ctx.theme.breakpoints) {
      return `(min-width: ${ctx.theme.breakpoints[key]})`;
    }

    return BREAKPOINTS[key as BreakpointKey] || key;
  }, [query, ctx?.theme?.breakpoints]);

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

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [resolvedQuery, handleChange]);

  return matches;
};

export default useMediaQuery;
