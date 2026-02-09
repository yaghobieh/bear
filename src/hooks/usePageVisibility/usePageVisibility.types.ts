/**
 * usePageVisibility hook types
 */

export interface UsePageVisibilityOptions {
  /** Callback when page becomes visible */
  onVisible?: () => void;
  /** Callback when page becomes hidden */
  onHidden?: () => void;
}

export interface UsePageVisibilityReturn {
  /** Whether the page is currently visible */
  isVisible: boolean;
  /** Document visibility state */
  visibilityState: DocumentVisibilityState;
}
