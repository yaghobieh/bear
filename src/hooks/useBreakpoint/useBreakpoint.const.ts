export const DEFAULT_BREAKPOINTS_PX = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BearBreakpointKey = keyof typeof DEFAULT_BREAKPOINTS_PX;
