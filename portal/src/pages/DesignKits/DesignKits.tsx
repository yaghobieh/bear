import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { DESIGN_KITS_GITHUB } from './DesignKits.const';

const DesignKits: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="font-lato">
      <Typography variant="h2" className="mb-3">{t.designKitsTitle}</Typography>
      <Typography variant="body1" className="mb-6 text-gray-600 dark:text-gray-400">{t.designKitsDesc}</Typography>
      <Typography variant="body2" className="mb-4">{t.designKitsFigmaSoon}</Typography>
      <a
        href={DESIGN_KITS_GITHUB}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex text-sm font-semibold text-pink-600 dark:text-pink-400"
      >
        {t.designKitsGithub}
      </a>
    </div>
  );
};

export default DesignKits;
