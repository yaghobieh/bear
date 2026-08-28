export const PATH_HOME = '/';
export const PATH_PRODUCTS = '/products';
export const PATH_DESIGN_KITS = '/products/design-kits';
export const PATH_DOCS = '/docs';
export const PATH_BLOG = '/blog';
export const PATH_PRICING = '/pricing';
export const PATH_COMPONENTS = '/components';
export const PATH_ICONS = '/icons';
export const PATH_CHARTS = '/components/chart';
export const PATH_INSTALLATION = '/installation';

export const MARKETING_EXACT_PATHS = [
  PATH_HOME,
  PATH_PRODUCTS,
  PATH_DESIGN_KITS,
  PATH_DOCS,
  PATH_BLOG,
  PATH_PRICING,
] as const;

export const isMarketingPath = (pathname: string): boolean => {
  return MARKETING_EXACT_PATHS.some((path) => pathname === path);
};

export const FIGMA_KIT_URL = PATH_DESIGN_KITS;

export const NPX_BEAR_COMMAND = 'npx @forgedevstack/bear';
export const NPM_INSTALL_BEAR = 'npm install @forgedevstack/bear';
export const NPM_INSTALL_ICONS = 'npm install @forgedevstack/bear-icons';
export const AUTHOR_GITHUB_URL = 'https://github.com/yaghobieh';
export const AUTHOR_DISPLAY_NAME = 'John Yaghobieh';

export const GITHUB_COMPONENT_TREE = 'https://github.com/yaghobieh/bear/tree/main/src/components';
