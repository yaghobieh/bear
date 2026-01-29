export interface UseDebounceOptions {
  /** Delay in milliseconds */
  delay?: number;
  /** Execute on leading edge */
  leading?: boolean;
  /** Execute on trailing edge */
  trailing?: boolean;
  /** Maximum time to wait */
  maxWait?: number;
}

export interface UseDebouncedCallbackReturn<T extends (...args: unknown[]) => unknown> {
  /** Debounced function */
  callback: T;
  /** Cancel pending execution */
  cancel: () => void;
  /** Flush pending execution immediately */
  flush: () => void;
  /** Check if pending */
  isPending: () => boolean;
}

