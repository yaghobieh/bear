import { formatDocTitleFromPath } from '@/utils/formatDocTitle.utils';
import { SEO_AUTHOR_NAME } from '@/constants/seo.const';
import type { SEOEntry } from './RouteSEO.const';
import { SEO_MAP, SEO_FALLBACK } from './RouteSEO.const';

const slugToTitle = (pathname: string): string =>
  pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? '';

const PREFIX_RESOLVER_MAP: Record<string, (pathname: string) => SEOEntry> = {
  '/components/': (pathname) => {
    const name = formatDocTitleFromPath(pathname);
    return { title: name, description: `${name} — Bear UI component by ${SEO_AUTHOR_NAME}. Usage, examples, props, and API reference.` };
  },
  '/hooks/': (pathname) => {
    const name = slugToTitle(pathname);
    return { title: name, description: `${name} hook — usage, examples, and API.` };
  },
  '/api/': (pathname) => {
    const name = slugToTitle(pathname);
    return { title: `${name} API`, description: `${name} API reference — all props, types, and examples.` };
  },
  '/customization/': (pathname) => {
    const name = slugToTitle(pathname);
    return { title: name, description: `Customize ${name} in Bear UI.` };
  },
};

export const getPageSEO = (pathname: string): SEOEntry => {
  if (SEO_MAP[pathname]) return SEO_MAP[pathname];

  const matchedPrefix = Object.keys(PREFIX_RESOLVER_MAP).find((prefix) => pathname.startsWith(prefix));
  if (matchedPrefix) return PREFIX_RESOLVER_MAP[matchedPrefix](pathname);

  return SEO_FALLBACK;
};
