import { RefObject, CSSProperties } from 'react';

export interface UseParallaxOptions {
  /** Speed multiplier (negative for reverse direction) */
  speed?: number;
  /** Direction of parallax */
  direction?: 'vertical' | 'horizontal';
  /** Disable on mobile */
  disableOnMobile?: boolean;
  /** Use transform instead of position */
  useTransform?: boolean;
}

export interface UseParallaxReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Current offset value */
  offset: number;
}

