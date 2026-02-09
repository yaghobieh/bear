/**
 * useOnline hook types
 */

export interface UseOnlineOptions {
  /** Callback when going online */
  onOnline?: () => void;
  /** Callback when going offline */
  onOffline?: () => void;
}

export interface UseOnlineReturn {
  /** Whether the browser is currently online */
  isOnline: boolean;
  /** Time since last status change (ms) */
  since: number | null;
}
