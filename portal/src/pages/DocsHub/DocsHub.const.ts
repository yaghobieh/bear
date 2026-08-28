import { PATH_COMPONENTS, PATH_INSTALLATION } from '@/constants/marketing.const';

export const PATH_THEMING = '/theming';
export const PATH_CLI_DOCS = '/docs/cli';

export const DOCS_HUB_LINKS = [
  { path: PATH_INSTALLATION, titleKey: 'docsHubInstall' as const, descKey: 'docsHubInstallDesc' as const },
  { path: PATH_COMPONENTS, titleKey: 'docsHubComponents' as const, descKey: 'docsHubComponentsDesc' as const },
  { path: PATH_THEMING, titleKey: 'docsHubTheming' as const, descKey: 'docsHubThemingDesc' as const },
  { path: PATH_CLI_DOCS, titleKey: 'docsHubCli' as const, descKey: 'docsHubCliDesc' as const },
];
