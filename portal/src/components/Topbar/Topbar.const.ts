import { BEAR_VERSION } from '@/constants/navigation.const';

export interface TopNavLink {
  label: string;
  path: string;
}

export const TOP_NAV_LINKS: TopNavLink[] = [
  { label: 'Docs', path: '/installation' },
  { label: 'Components', path: '/components' },
  { label: 'Hooks', path: '/hooks' },
  { label: 'Skills', path: '/skills' },
  { label: 'Changelog', path: '/changelog' },
];

export const THEME_TOAST_DURATION_MS = 10000;
export const VERSION_POPUP_KEY = `bear-version-seen-${BEAR_VERSION}`;
export const COOKIE_CONSENT_KEY = 'bear-cookie-consent';
export const SEARCH_FOCUS_DELAY_MS = 100;

export const BANNER_SESSION_PREFIX = 'bear-banner-';
export const BANNER_SESSION_SUFFIX = '-dismissed';
