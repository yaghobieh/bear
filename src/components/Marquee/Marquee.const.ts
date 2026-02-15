import type { MarqueeDirection } from './Marquee.types';

/** Default speed in pixels per second */
export const DEFAULT_SPEED = 50;

/** Default gradient width in pixels */
export const DEFAULT_GRADIENT_WIDTH = 40;

/** Default gap between items in pixels */
export const DEFAULT_GAP = 24;

/** Animation name per direction */
export const MARQUEE_ANIMATION: Record<MarqueeDirection, string> = {
  left: 'bear-marquee-left',
  right: 'bear-marquee-right',
  up: 'bear-marquee-up',
  down: 'bear-marquee-down',
};

/** Full content duplication count for seamless loop */
export const DUPLICATE_COUNT = 1;
