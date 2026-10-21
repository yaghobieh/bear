import { BEAR_VERSION } from '@/constants/navigation.const';
import type { ProductMenuGroup, TopNavLink } from './Topbar.types';

export const PATH_DOCS = '/installation';
export const PATH_ABOUT = '/about';
export const PATH_BLOG = '/blog';
export const PATH_LIBRARIES = '/libraries';
export const PATH_HOOKS = '/hooks';
export const PATH_TEMPLATES = '/templates';
export const PATH_PRODUCTS = '/products';
export const PRODUCT_MENU_CLOSE_DELAY_MS = 200;
export const DOCS_MENU_CHILD_LIMIT = 6;

export const TOP_NAV_LINKS: TopNavLink[] = [
  { labelKey: 'navDocs', path: PATH_DOCS },
  { labelKey: 'navAbout', path: PATH_ABOUT },
  { labelKey: 'navBlog', path: PATH_BLOG },
];

export const DOCS_ACTIVE_PREFIXES = [
  PATH_DOCS,
  '/docs',
  '/theming',
  '/typescript',
  '/components',
  '/guides',
  '/customization',
  '/skills',
  '/changelog',
  '/whats-new',
];

export const PRODUCT_MENU: ProductMenuGroup[] = [
  {
    id: 'core',
    titleKey: 'productGroupCore',
    items: [
      { id: 'core', path: '/components', nameKey: 'productCoreName', descKey: 'productCoreDesc', icon: 'package' },
      { id: 'icons', path: '/icons', nameKey: 'productIconsName', descKey: 'productIconsDesc', icon: 'sparkles' },
    ],
  },
  {
    id: 'x',
    titleKey: 'productGroupX',
    items: [
      { id: 'charts', path: '/products/charts', nameKey: 'productChartsName', descKey: 'productChartsDesc', icon: 'layers' },
      { id: 'ai', path: '/products/ai', nameKey: 'productAiName', descKey: 'productAiDesc', icon: 'sparkles' },
      { id: 'code', path: '/products/code', nameKey: 'productCodeName', descKey: 'productCodeDesc', icon: 'code' },
    ],
  },
  {
    id: 'libraries',
    titleKey: 'productGroupLibraries',
    items: [
      { id: 'hooks', path: PATH_HOOKS, nameKey: 'productHooksName', descKey: 'productHooksDesc', icon: 'wrench' },
      { id: 'map', path: '/products/map', nameKey: 'productMapName', descKey: 'productMapDesc', icon: 'globe' },
      { id: 'calendar', path: '/products/calendar', nameKey: 'productCalendarName', descKey: 'productCalendarDesc', icon: 'calendar' },
      { id: 'ink', path: '/products/ink', nameKey: 'productInkName', descKey: 'productInkDesc', icon: 'edit' },
      { id: 'kanban', path: '/products/kanban', nameKey: 'productKanbanName', descKey: 'productKanbanDesc', icon: 'inbox' },
      { id: 'templates', path: PATH_TEMPLATES, nameKey: 'productTemplatesName', descKey: 'productTemplatesDesc', icon: 'palette' },
    ],
  },
];

export const THEME_TOAST_DURATION_MS = 10000;
export const VERSION_POPUP_KEY = `bear-version-seen-${BEAR_VERSION}`;
export const COOKIE_CONSENT_KEY = 'bear-cookie-consent';
export const SEARCH_FOCUS_DELAY_MS = 100;

export const BANNER_SESSION_PREFIX = 'bear-banner-';
export const BANNER_SESSION_SUFFIX = '-dismissed';
