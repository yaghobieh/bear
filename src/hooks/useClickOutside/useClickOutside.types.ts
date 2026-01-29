import { RefObject } from 'react';

export interface UseClickOutsideOptions {
  /** Event type to listen for */
  events?: ('mousedown' | 'mouseup' | 'touchstart' | 'touchend')[];
  /** Ignore elements with these selectors */
  ignoreSelectors?: string[];
  /** Whether the hook is enabled */
  enabled?: boolean;
}

export type UseClickOutsideRef<T extends HTMLElement> = RefObject<T>;

