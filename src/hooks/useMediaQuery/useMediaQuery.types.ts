export interface UseMediaQueryOptions {
  /** Default value for SSR */
  defaultValue?: boolean;
  /** Initialize with window check */
  initializeWithValue?: boolean;
}

export type UseMediaQueryReturn = boolean;

/** Predefined breakpoints matching Tailwind */
export const BREAKPOINTS = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

