import type { RefObject } from 'react';

/**
 * useLazyLoad options
 */
export interface UseLazyLoadOptions {
  /** Root margin for IntersectionObserver (e.g. '100px' to trigger before visible) */
  rootMargin?: string;
  /** Threshold 0–1 for how much must be visible */
  threshold?: number;
  /** Once in view, stay loaded (default: true) */
  once?: boolean;
  /** Enable observer */
  enabled?: boolean;
}

/**
 * useLazyLoad return value
 */
export interface UseLazyLoadReturn<T extends HTMLElement> {
  /** Ref to attach to the element to observe */
  ref: RefObject<T | null>;
  /** Whether element is currently in viewport */
  isInView: boolean;
  /** Whether element has ever been in view (stays true once loaded) */
  hasBeenViewed: boolean;
}
