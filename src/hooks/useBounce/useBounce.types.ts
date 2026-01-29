import { RefObject, CSSProperties } from 'react';

export interface UseBounceOptions {
  /** Bounce height in pixels */
  height?: number;
  /** Duration of one bounce cycle (in ms) */
  duration?: number;
  /** Number of bounces (0 for infinite) */
  count?: number;
  /** Delay before starting (in ms) */
  delay?: number;
  /** Start animation on mount */
  autoStart?: boolean;
}

export interface UseBounceReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Whether bouncing is active */
  isActive: boolean;
  /** Start bouncing */
  start: () => void;
  /** Stop bouncing */
  stop: () => void;
  /** Toggle bouncing */
  toggle: () => void;
}

