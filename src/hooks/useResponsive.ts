import { useMemo } from 'react';
import type { ResponsiveProp } from '../types/theme.types';
import { useMediaQuery } from './useMediaQuery';

/**
 * Breakpoint values in px
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * useResponsive - Resolves responsive prop values based on current viewport
 *
 * @description
 * Takes a ResponsiveProp value (which can be a single value or an object
 * with breakpoint keys) and resolves it to the current value based on
 * the viewport width.
 *
 * @example
 * ```tsx
 * const columns = useResponsive({ base: 1, sm: 2, md: 3, lg: 4 });
 * // Returns 1 on mobile, 2 on sm, 3 on md, 4 on lg+
 *
 * const size = useResponsive('md');
 * // Returns 'md' always (non-responsive)
 * ```
 */
export function useResponsive<T>(prop: ResponsiveProp<T>): T {
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`);

  return useMemo(() => {
    // If it's not an object with breakpoint keys, return as-is
    if (prop === null || prop === undefined || typeof prop !== 'object') {
      return prop as T;
    }

    const responsive = prop as Record<string, T>;

    // Check if it looks like a responsive object (has breakpoint keys)
    const hasBreakpointKeys = 'base' in responsive || 'sm' in responsive || 'md' in responsive || 'lg' in responsive || 'xl' in responsive || '2xl' in responsive;

    if (!hasBreakpointKeys) return prop as T;

    // Resolve from largest to smallest
    if (is2xl && responsive['2xl'] !== undefined) return responsive['2xl'];
    if (isXl && responsive.xl !== undefined) return responsive.xl;
    if (isLg && responsive.lg !== undefined) return responsive.lg;
    if (isMd && responsive.md !== undefined) return responsive.md;
    if (isSm && responsive.sm !== undefined) return responsive.sm;
    if (responsive.base !== undefined) return responsive.base;

    // Fallback: return first defined value
    for (const key of ['sm', 'md', 'lg', 'xl', '2xl'] as const) {
      if (responsive[key] !== undefined) return responsive[key];
    }

    return prop as T;
  }, [prop, isSm, isMd, isLg, isXl, is2xl]);
}

/**
 * useResponsiveProps - Resolves multiple responsive props at once
 *
 * @example
 * ```tsx
 * const { columns, gap, size } = useResponsiveProps({
 *   columns: { base: 1, md: 2, lg: 4 },
 *   gap: { base: 2, md: 4 },
 *   size: 'md', // non-responsive value
 * });
 * ```
 */
export function useResponsiveProps<T extends Record<string, ResponsiveProp<unknown>>>(
  props: T
): { [K in keyof T]: T[K] extends ResponsiveProp<infer V> ? V : T[K] } {
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`);

  return useMemo(() => {
    const result: Record<string, unknown> = {};

    for (const [key, prop] of Object.entries(props)) {
      if (prop === null || prop === undefined || typeof prop !== 'object') {
        result[key] = prop;
        continue;
      }

      const responsive = prop as Record<string, unknown>;
      const hasBreakpointKeys = 'base' in responsive || 'sm' in responsive || 'md' in responsive || 'lg' in responsive || 'xl' in responsive || '2xl' in responsive;

      if (!hasBreakpointKeys) {
        result[key] = prop;
        continue;
      }

      if (is2xl && responsive['2xl'] !== undefined) { result[key] = responsive['2xl']; continue; }
      if (isXl && responsive.xl !== undefined) { result[key] = responsive.xl; continue; }
      if (isLg && responsive.lg !== undefined) { result[key] = responsive.lg; continue; }
      if (isMd && responsive.md !== undefined) { result[key] = responsive.md; continue; }
      if (isSm && responsive.sm !== undefined) { result[key] = responsive.sm; continue; }
      if (responsive.base !== undefined) { result[key] = responsive.base; continue; }
      result[key] = prop;
    }

    return result as any;
  }, [props, isSm, isMd, isLg, isXl, is2xl]);
}

export type { ResponsiveProp };
