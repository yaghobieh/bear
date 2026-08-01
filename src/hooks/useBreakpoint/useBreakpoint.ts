import { useContext } from 'react';
import { BearContext } from '../../context/BearProvider';
import { useMediaQuery } from '../useMediaQuery';
import { DEFAULT_BREAKPOINTS_PX } from './useBreakpoint.const';
import type { UseBreakpointResult } from './useBreakpoint.types';

const parseBreakpointPx = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const useBreakpoint = (): UseBreakpointResult => {
  const ctx = useContext(BearContext);
  const bp = ctx?.theme?.breakpoints;

  const smPx = parseBreakpointPx(bp?.sm, DEFAULT_BREAKPOINTS_PX.sm);
  const mdPx = parseBreakpointPx(bp?.md, DEFAULT_BREAKPOINTS_PX.md);
  const lgPx = parseBreakpointPx(bp?.lg, DEFAULT_BREAKPOINTS_PX.lg);
  const xlPx = parseBreakpointPx(bp?.xl, DEFAULT_BREAKPOINTS_PX.xl);
  const xxlPx = parseBreakpointPx(bp?.['2xl'], DEFAULT_BREAKPOINTS_PX['2xl']);

  const isSmUp = useMediaQuery(`(min-width: ${smPx}px)`);
  const isMdUp = useMediaQuery(`(min-width: ${mdPx}px)`);
  const isLgUp = useMediaQuery(`(min-width: ${lgPx}px)`);
  const isXlUp = useMediaQuery(`(min-width: ${xlPx}px)`);
  const is2xlUp = useMediaQuery(`(min-width: ${xxlPx}px)`);

  const breakpoint = is2xlUp
    ? '2xl'
    : isXlUp
      ? 'xl'
      : isLgUp
        ? 'lg'
        : isMdUp
          ? 'md'
          : isSmUp
            ? 'sm'
            : 'base';

  return {
    breakpoint,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2xlUp,
    isMobile: !isMdUp,
    isTablet: isMdUp && !isLgUp,
    isDesktop: isLgUp,
  };
};
