import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { REGISTRY_DIRECTORY_LINKS } from '@/constants/docs';

const RegistryDirectoryDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.registryDirectoryTitle} description={t.registryDirectoryDesc}>
      <section className="doc-section mb-10">
        <Typography variant="body2" color="muted" className="mb-6 leading-relaxed">
          {t.registryDirectoryDesc}
        </Typography>
        <div className="grid gap-3">
          {REGISTRY_DIRECTORY_LINKS.map((item) => {
            const cardClass =
              'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:border-pink-300 dark:hover:border-pink-700 transition-colors block';
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="body2" className="font-mono font-semibold text-pink-600 dark:text-pink-400">
                    {item.name}
                  </Typography>
                  {'badgeKey' in item && item.badgeKey && <span className="doc-page__badge">{t[item.badgeKey]}</span>}
                </div>
                <Typography variant="body2" color="muted">{t[item.descKey]}</Typography>
              </>
            );
            if (item.external) {
              return (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  {inner}
                </a>
              );
            }
            return (
              <Link key={item.name} to={item.href} className={cardClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryDirectoryAddTitle}</Typography>
        <Typography variant="body2" color="muted" className="leading-relaxed">
          {t.registryDirectoryAddDesc}{' '}
          <Link to="/docs/registry/github" className="text-pink-600 dark:text-pink-400 hover:underline">
            {t.registryGithubTitle}
          </Link>
        </Typography>
      </section>
    </DocPage>
  );
};

export default RegistryDirectoryDocsPage;
