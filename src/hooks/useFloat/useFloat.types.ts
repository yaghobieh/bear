import { RefObject, CSSProperties } from 'react';

export interface UseFloatOptions {
  /** Float distance in pixels */
  distance?: number;
  /** Duration of one float cycle (in ms) */
  duration?: number;
  /** Delay before starting (in ms) */
  delay?: number;
  /** Direction of float */
  direction?: 'vertical' | 'horizontal' | 'diagonal';
  /** Start animation on mount */
  autoStart?: boolean;
}

export interface UseFloatReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Whether floating is active */
  isActive: boolean;
  /** Start floating */
  start: () => void;
  /** Stop floating */
  stop: () => void;
}

