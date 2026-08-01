import type { ToastSeverity } from './Toast.types';
import {
  BEAR_ARIA_LIVE_BY_SEVERITY,
  BEAR_ARIA_ROLE_BY_SEVERITY,
} from '../../utils/liveRegion.const';

export const T_O_A_S_T_ROOT_CLASS = 'Bear-Toast';

export const TOAST_ARIA_LIVE: Record<ToastSeverity, 'polite' | 'assertive'> = {
  success: BEAR_ARIA_LIVE_BY_SEVERITY.success,
  info: BEAR_ARIA_LIVE_BY_SEVERITY.info,
  warning: BEAR_ARIA_LIVE_BY_SEVERITY.warning,
  error: BEAR_ARIA_LIVE_BY_SEVERITY.error,
};

export const TOAST_ARIA_ROLE: Record<ToastSeverity, 'status' | 'alert'> = {
  success: BEAR_ARIA_ROLE_BY_SEVERITY.success,
  info: BEAR_ARIA_ROLE_BY_SEVERITY.info,
  warning: BEAR_ARIA_ROLE_BY_SEVERITY.warning,
  error: BEAR_ARIA_ROLE_BY_SEVERITY.error,
};

export const TOAST_EXIT_MS = 200;
