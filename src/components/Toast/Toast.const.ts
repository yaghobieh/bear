import type { ToastSeverity, ToastPosition } from './Toast.types';
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

export const TOAST_SEVERITY_MODIFIER: Record<ToastSeverity, string> = {
  success: `${T_O_A_S_T_ROOT_CLASS}--success`,
  info: `${T_O_A_S_T_ROOT_CLASS}--info`,
  warning: `${T_O_A_S_T_ROOT_CLASS}--warning`,
  error: `${T_O_A_S_T_ROOT_CLASS}--error`,
};

export const TOAST_POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-left': 'bear-top-4 bear-left-4',
  'top-center': 'bear-top-4 bear-left-1/2 bear-transform bear--translate-x-1/2',
  'top-right': 'bear-top-4 bear-right-4',
  'bottom-left': 'bear-bottom-4 bear-left-4',
  'bottom-center': 'bear-bottom-4 bear-left-1/2 bear-transform bear--translate-x-1/2',
  'bottom-right': 'bear-bottom-4 bear-right-4',
};

export const TOAST_ITEM_CLASSES =
  'bear-flex bear-items-start bear-gap-3 bear-p-4 bear-rounded-lg bear-shadow-lg bear-min-w-[300px] bear-max-w-[400px] bear-transition-all bear-duration-200';
