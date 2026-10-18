import { GITHUB_URL, NPM_URL } from '@/constants/navigation.const';
import { PATH_BLOG, PATH_DOCS, PATH_LIBRARIES } from '@/components/Topbar/Topbar.const';
import type { AboutLink, AboutPrinciple, AboutStat } from './About.types';

export const ABOUT_LINKS: AboutLink[] = [
  { id: 'github', href: GITHUB_URL, labelKey: 'aboutGithub', external: true },
  { id: 'npm', href: NPM_URL, labelKey: 'aboutNpm', external: true },
  { id: 'docs', href: PATH_DOCS, labelKey: 'aboutDocs', external: false },
  { id: 'libraries', href: PATH_LIBRARIES, labelKey: 'productCatalog', external: false },
  { id: 'blog', href: PATH_BLOG, labelKey: 'navBlog', external: false },
];

export const ABOUT_STATS: AboutStat[] = [
  { id: 'components', value: '190+', labelKey: 'aboutStatComponents' },
  { id: 'icons', value: '550+', labelKey: 'aboutStatIcons' },
  { id: 'hooks', value: '25+', labelKey: 'aboutStatHooks' },
  { id: 'license', value: 'MIT', labelKey: 'aboutStatLicense' },
];

export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  { id: 'design', titleKey: 'aboutPrincipleDesign', bodyKey: 'aboutPrincipleDesignBody', path: '/theming' },
  { id: 'a11y', titleKey: 'aboutPrincipleA11y', bodyKey: 'aboutPrincipleA11yBody', path: '/guides/accessibility' },
  { id: 'ts', titleKey: 'aboutPrincipleTs', bodyKey: 'aboutPrincipleTsBody', path: '/typescript' },
  { id: 'packages', titleKey: 'aboutPrinciplePackages', bodyKey: 'aboutPrinciplePackagesBody', path: PATH_LIBRARIES },
];
