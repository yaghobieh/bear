import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { DOCS_HUB_LINKS } from './DocsHub.const';

const DocsHub: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="font-lato">
      <Typography variant="h2" className="mb-3">{t.docsHubTitle}</Typography>
      <Typography variant="body1" className="mb-10 text-gray-600 dark:text-gray-400">{t.docsHubDesc}</Typography>
      <Flex wrap="wrap" gap={4}>
        {DOCS_HUB_LINKS.map((link) => (
          <Card key={link.path} className="w-full md:w-[calc(50%-0.5rem)] p-6">
            <Typography variant="h5" className="mb-2">{t[link.titleKey]}</Typography>
            <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">{t[link.descKey]}</Typography>
            <Link to={link.path} className="text-sm font-semibold text-pink-600 dark:text-pink-400">
              {t[link.titleKey]}
            </Link>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default DocsHub;
