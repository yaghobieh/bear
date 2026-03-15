export interface UseResizeObserverOptions {
  enabled?: boolean;
}

export interface UseResizeObserverReturn {
  width: number;
  height: number;
  contentRect: DOMRectReadOnly | null;
}
