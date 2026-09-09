import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BearIcons } from '@forgedevstack/bear';
import { CopyImport } from '@/components/CopyImport';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { isExternalHref, resolveDocFigmaUrl, resolveDocGithubUrl } from '@/constants/marketing.utils';
import { FigmaMarkSvg } from './helpers';
import type { DocPageProps } from './DocPage.types';

export const DocPage: FC<DocPageProps> = (props) => {
  const {
    title,
    description,
    badge,
    icon,
    componentName,
    githubHref,
    figmaHref,
    showExamples = true,
    children,
  } = props;
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const githubUrl = resolveDocGithubUrl(componentName, githubHref);
  const figmaUrl = resolveDocFigmaUrl(figmaHref);

  return (
    <article className="doc-page fade-in">
      <header className="doc-page__header">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h1 className="doc-page__title">{title}</h1>
          {badge && <span className="doc-page__badge">{badge}</span>}
        </div>
        <p className="doc-page__description">{description}</p>
        {showExamples && (
          <div className="flex flex-wrap gap-2 mt-4">
            {isExternalHref(figmaUrl) ? (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <FigmaMarkSvg />
                {t.figmaExample}
              </a>
            ) : (
              <Link
                to={figmaUrl}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <FigmaMarkSvg />
                {t.figmaExample}
              </Link>
            )}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <BearIcons.GithubIcon size={16} />
              {t.githubExample}
            </a>
          </div>
        )}
        {componentName && (
          <div className="doc-page__import mt-6">
            <CopyImport componentName={componentName} />
          </div>
        )}
      </header>
      <div className="doc-page__body">{children}</div>
    </article>
  );
};
