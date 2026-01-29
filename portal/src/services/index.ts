// Ember CMS API Services
export {
  api,
  // Types
  type Page,
  type PageContent,
  type Theme,
  type ThemeColors,
  type SiteConfig,
  // Functions
  getPages,
  getPageBySlug,
  getActiveTheme,
  getSiteConfig,
  getContent,
  // Hooks
  useContent,
  usePage,
  useTheme,
} from './api';

