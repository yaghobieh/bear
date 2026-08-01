import type { BearBreakpointKey } from './useBreakpoint.const';

export interface UseBreakpointResult {
  breakpoint: BearBreakpointKey | 'base';
  isSmUp: boolean;
  isMdUp: boolean;
  isLgUp: boolean;
  isXlUp: boolean;
  is2xlUp: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
