import { useMemo, useContext } from 'react';
import type { ResponsiveProp } from '../types/theme.types';
import { useMediaQuery } from './useMediaQuery';
import { BearContext } from '../context/BearProvider';

const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

function parseBreakpointPx(value: string): number {
  return parseInt(value, 10) || 0;
}

/**
 * useResponsive - Resolves responsive prop values based on current viewport
 *
 * Reads breakpoint values from BearProvider when available, so overrides
 * (e.g. `xl: '2500px'`) and custom keys (e.g. `xxl: '3000px'`) are respected.
 *
 * @example
 * ```tsx
 * const columns = useResponsive({ base: 1, sm: 2, md: 3, lg: 4 });
 * ```
 */
export function useResponsive<T>(prop: ResponsiveProp<T>): T {
  const ctx = useContext(BearContext);
  const bp = ctx?.theme?.breakpoints;

  const smPx = bp ? parseBreakpointPx(bp.sm) : DEFAULT_BREAKPOINTS.sm;
  const mdPx = bp ? parseBreakpointPx(bp.md) : DEFAULT_BREAKPOINTS.md;
  const lgPx = bp ? parseBreakpointPx(bp.lg) : DEFAULT_BREAKPOINTS.lg;
  const xlPx = bp ? parseBreakpointPx(bp.xl) : DEFAULT_BREAKPOINTS.xl;
  const xxlPx = bp ? parseBreakpointPx(bp['2xl']) : DEFAULT_BREAKPOINTS['2xl'];

  const isSm = useMediaQuery(`(min-width: ${smPx}px)`);
  const isMd = useMediaQuery(`(min-width: ${mdPx}px)`);
  const isLg = useMediaQuery(`(min-width: ${lgPx}px)`);
  const isXl = useMediaQuery(`(min-width: ${xlPx}px)`);
  const is2xl = useMediaQuery(`(min-width: ${xxlPx}px)`);

  return useMemo(() => {
    if (prop === null || prop === undefined || typeof prop !== 'object') {
      return prop as T;
    }

    const responsive = prop as Record<string, T>;

    const hasBreakpointKeys = 'base' in responsive || 'sm' in responsive || 'md' in responsive || 'lg' in responsive || 'xl' in responsive || '2xl' in responsive;

    if (!hasBreakpointKeys) return prop as T;

    if (is2xl && responsive['2xl'] !== undefined) return responsive['2xl'];
    if (isXl && responsive.xl !== undefined) return responsive.xl;
    if (isLg && responsive.lg !== undefined) return responsive.lg;
    if (isMd && responsive.md !== undefined) return responsive.md;
    if (isSm && responsive.sm !== undefined) return responsive.sm;
    if (responsive.base !== undefined) return responsive.base;

    for (const key of ['sm', 'md', 'lg', 'xl', '2xl'] as const) {
      if (responsive[key] !== undefined) return responsive[key];
    }

    return prop as T;
  }, [prop, isSm, isMd, isLg, isXl, is2xl]);
}

/**
 * useResponsiveProps - Resolves multiple responsive props at once
 */
export function useResponsiveProps<T extends Record<string, ResponsiveProp<unknown>>>(
  props: T
): { [K in keyof T]: T[K] extends ResponsiveProp<infer V> ? V : T[K] } {
  const ctx = useContext(BearContext);
  const bp = ctx?.theme?.breakpoints;

  const smPx = bp ? parseBreakpointPx(bp.sm) : DEFAULT_BREAKPOINTS.sm;
  const mdPx = bp ? parseBreakpointPx(bp.md) : DEFAULT_BREAKPOINTS.md;
  const lgPx = bp ? parseBreakpointPx(bp.lg) : DEFAULT_BREAKPOINTS.lg;
  const xlPx = bp ? parseBreakpointPx(bp.xl) : DEFAULT_BREAKPOINTS.xl;
  const xxlPx = bp ? parseBreakpointPx(bp['2xl']) : DEFAULT_BREAKPOINTS['2xl'];

  const isSm = useMediaQuery(`(min-width: ${smPx}px)`);
  const isMd = useMediaQuery(`(min-width: ${mdPx}px)`);
  const isLg = useMediaQuery(`(min-width: ${lgPx}px)`);
  const isXl = useMediaQuery(`(min-width: ${xlPx}px)`);
  const is2xl = useMediaQuery(`(min-width: ${xxlPx}px)`);

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
