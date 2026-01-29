import { RefObject, CSSProperties } from 'react';

export interface UseShakeOptions {
  /** Shake intensity in pixels */
  intensity?: number;
  /** Duration of shake (in ms) */
  duration?: number;
  /** Number of shakes */
  count?: number;
}

export interface UseShakeReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Whether shaking is active */
  isShaking: boolean;
  /** Trigger shake */
  shake: () => void;
}

