import {
  BEAR_ARIA_LIVE_BY_SEVERITY,
  BEAR_ARIA_ROLE_BY_SEVERITY,
  type BearAriaLive,
  type BearAriaRole,
  type BearLiveSeverity,
} from './liveRegion.const';

export const getBearAriaLive = (severity: BearLiveSeverity = 'default'): BearAriaLive =>
  BEAR_ARIA_LIVE_BY_SEVERITY[severity];

export const getBearAriaRole = (severity: BearLiveSeverity = 'default'): BearAriaRole =>
  BEAR_ARIA_ROLE_BY_SEVERITY[severity];

export const getBearLiveRegionProps = (severity: BearLiveSeverity = 'default') => ({
  role: getBearAriaRole(severity),
  'aria-live': getBearAriaLive(severity),
});
