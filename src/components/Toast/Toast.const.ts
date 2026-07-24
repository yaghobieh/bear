import type { ToastSeverity } from './Toast.types';

export const T_O_A_S_T_ROOT_CLASS = 'Bear-Toast';

export const TOAST_ARIA_LIVE: Record<ToastSeverity, 'polite' | 'assertive'> = {
  success: 'polite',
  info: 'polite',
  warning: 'polite',
  error: 'assertive',
};

export const TOAST_ARIA_ROLE: Record<ToastSeverity, 'status' | 'alert'> = {
  success: 'status',
  info: 'status',
  warning: 'status',
  error: 'alert',
};

export const TOAST_EXIT_MS = 200;
