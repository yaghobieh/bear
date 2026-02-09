/**
 * useIdle hook types
 */

export interface UseIdleOptions {
  /** Timeout in milliseconds before user is considered idle (default: 60000 = 1 min) */
  timeout?: number;
  /** Events to listen for as activity (default: mouse, keyboard, touch, scroll) */
  events?: (keyof WindowEventMap)[];
  /** Initial idle state */
  initialState?: boolean;
  /** Callback when user becomes idle */
  onIdle?: () => void;
  /** Callback when user becomes active */
  onActive?: () => void;
}

export interface UseIdleReturn {
  /** Whether the user is currently idle */
  isIdle: boolean;
  /** Time remaining until idle (ms) */
  remaining: number;
  /** Last activity timestamp */
  lastActive: number;
  /** Reset the idle timer */
  reset: () => void;
  /** Pause idle detection */
  pause: () => void;
  /** Resume idle detection */
  resume: () => void;
}
