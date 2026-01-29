import { RefObject, CSSProperties } from 'react';

export interface UsePulseOptions {
  /** Scale factor on pulse */
  scale?: number;
  /** Duration of one pulse cycle (in ms) */
  duration?: number;
  /** Delay before starting (in ms) */
  delay?: number;
  /** Number of pulses (0 for infinite) */
  count?: number;
  /** Start animation on mount */
  autoStart?: boolean;
}

export interface UsePulseReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Whether pulsing is active */
  isActive: boolean;
  /** Start pulsing */
  start: () => void;
  /** Stop pulsing */
  stop: () => void;
  /** Toggle pulsing */
  toggle: () => void;
  /** Trigger single pulse */
  pulse: () => void;
}

