import { BEAR_VERSION } from '@/constants/navigation.const';
import {
  PATH_BLOG,
  PATH_DOCS,
  PATH_PRICING,
  PATH_PRODUCTS,
} from '@/constants/marketing.const';

export interface TopNavLink {
  labelKey: 'navProducts' | 'navDocs' | 'navBlog' | 'navPricing';
  path: string;
}

export const TOP_NAV_LINKS: TopNavLink[] = [
  { labelKey: 'navProducts', path: PATH_PRODUCTS },
  { labelKey: 'navDocs', path: PATH_DOCS },
  { labelKey: 'navBlog', path: PATH_BLOG },
  { labelKey: 'navPricing', path: PATH_PRICING },
];

export const THEME_TOAST_DURATION_MS = 10000;
export const VERSION_POPUP_KEY = `bear-version-seen-${BEAR_VERSION}`;
export const COOKIE_CONSENT_KEY = 'bear-cookie-consent';
export const SEARCH_FOCUS_DELAY_MS = 100;

export const BANNER_SESSION_PREFIX = 'bear-banner-';
export const BANNER_SESSION_SUFFIX = '-dismissed';
