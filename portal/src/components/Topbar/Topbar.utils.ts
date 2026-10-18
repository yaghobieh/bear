import { DOCS_ACTIVE_PREFIXES, PATH_ABOUT, PATH_BLOG, PATH_DOCS, PATH_HOOKS, PATH_LIBRARIES, PATH_PRODUCTS, PATH_TEMPLATES } from './Topbar.const';

export const isDocsPath = (pathname: string): boolean =>
  DOCS_ACTIVE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export const isProductPath = (pathname: string): boolean =>
  pathname === PATH_LIBRARIES
  || pathname.startsWith(`${PATH_LIBRARIES}/`)
  || pathname === PATH_TEMPLATES
  || pathname.startsWith(`${PATH_TEMPLATES}/`)
  || pathname === PATH_PRODUCTS
  || pathname.startsWith(`${PATH_PRODUCTS}/`)
  || pathname === PATH_HOOKS
  || pathname.startsWith(`${PATH_HOOKS}/`);

export const isTopNavActive = (path: string, pathname: string): boolean => {
  if (path === PATH_DOCS) return isDocsPath(pathname);
  if (path === PATH_ABOUT || path === PATH_BLOG) return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
};
