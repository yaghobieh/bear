export interface UseIntersectionObserverOptions {
  /** Threshold(s) at which to trigger callback */
  threshold?: number | number[];
  /** Root element for intersection */
  root?: Element | Document | null;
  /** Margin around root */
  rootMargin?: string;
  /** Freeze updates after first intersection */
  freezeOnceVisible?: boolean;
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Callback when intersection changes */
  onChange?: (entry: IntersectionObserverEntry) => void;
}

export interface UseIntersectionObserverReturn {
  /** Whether element is visible */
  isIntersecting: boolean;
  /** Current intersection entry */
  entry: IntersectionObserverEntry | null;
  /** Intersection ratio (0-1) */
  intersectionRatio: number;
}

