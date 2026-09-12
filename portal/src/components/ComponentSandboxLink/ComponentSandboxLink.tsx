import { useLocation } from 'react-router-dom';
import { SandboxIcon, StorybookIcon } from '@forgedevstack/bear';
import { isComponentDocsPath, resolveStorybookHrefForPath } from '@/constants/navigation.const';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { openCodeSandbox } from '@/pages/Sandbox/openCodeSandbox';
import { DOCS_LINK_ICON_SIZE } from './ComponentSandboxLink.const';

const LINK_CLASS_NAME =
  'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-800 transition-colors';

export const ComponentSandboxLink = () => {
  const { pathname } = useLocation();
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  if (!isComponentDocsPath(pathname)) {
    return null;
  }

  const storybookHref = resolveStorybookHrefForPath(pathname);

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
