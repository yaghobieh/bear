import { useLocation } from 'react-router-dom';
import { SandboxIcon, StorybookIcon } from '@forgedevstack/bear';
import { isComponentDocsPath, resolveStorybookHref, resolveStorybookHrefForPath, STORYBOOK_DOCS_PREFIX, STORYBOOK_QUERY_PATH } from '@/constants/navigation.const';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { openCodeSandbox } from '@/pages/Sandbox/openCodeSandbox';
import { DOCS_LINK_ICON_SIZE } from './ComponentSandboxLink.const';

const PACKAGE_STORY_ID: Record<string, string> = {
  '/products/flutter': 'packages-bear-flutter-tokens--docs',
  '/products/grid': 'packages-bear-grid-beargrid--docs',
  '/products/blocks': 'packages-bear-blocks-dashboardblock--docs',
  '/pricing': 'packages-bear-grid-beargrid--docs',
  '/products/charts': 'packages-bear-x-charts-barchart--docs',
  '/products/code': 'packages-bear-x-code-codeeditor--docs',
  '/products/calendar': 'packages-calendar-eventcalendar--docs',
};

const storyHrefForPath = (pathname: string): string => {
  const storyId = PACKAGE_STORY_ID[pathname];
  if (!storyId) return resolveStorybookHrefForPath(pathname);
  const base = resolveStorybookHref();
  const root = base.endsWith('/') ? base : `${base}/`;
  return `${root}?${STORYBOOK_QUERY_PATH}=${STORYBOOK_DOCS_PREFIX}${storyId}`;
};

const LINK_CLASS_NAME =
  'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-800 transition-colors';

export const ComponentSandboxLink = () => {
  const { pathname } = useLocation();
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  const showLinks = isComponentDocsPath(pathname) || pathname in PACKAGE_STORY_ID;
  if (!showLinks) {
    return null;
  }

  const storybookHref = storyHrefForPath(pathname);

  return (
    <span className="inline-flex items-center gap-1.5">
      <a
        href={storybookHref}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS_NAME}
      >
        <StorybookIcon size={DOCS_LINK_ICON_SIZE} />
        {t.storybookLink}
      </a>
      <button
        type="button"
        className={LINK_CLASS_NAME}
        onClick={() => openCodeSandbox(pathname)}
      >
        <SandboxIcon size={DOCS_LINK_ICON_SIZE} />
        {t.sandboxLink}
      </button>
    </span>
  );
};
