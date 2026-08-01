export type BearLiveSeverity = 'success' | 'info' | 'warning' | 'error' | 'default';

export type BearAriaLive = 'polite' | 'assertive';

export type BearAriaRole = 'status' | 'alert';

export const BEAR_ARIA_LIVE_BY_SEVERITY: Record<BearLiveSeverity, BearAriaLive> = {
  success: 'polite',
  info: 'polite',
  warning: 'polite',
  error: 'assertive',
  default: 'polite',
};

export const BEAR_ARIA_ROLE_BY_SEVERITY: Record<BearLiveSeverity, BearAriaRole> = {
  success: 'status',
  info: 'status',
  warning: 'status',
  error: 'alert',
  default: 'status',
};
