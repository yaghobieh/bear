import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  INSTALL_COMPONENT_CODE,
  INSTALL_ICONS_FROM_BEAR_CODE,
  INSTALL_ICONS_ONLY_CODE,
  INSTALL_NPX_BEAR,
  INSTALL_NPM_BEAR,
  INSTALL_NPM_BEAR_NO_ICONS,
  INSTALL_NPM_ICONS,
  INSTALL_PNPM_BEAR,
  INSTALL_PNPM_BEAR_NO_ICONS,
  INSTALL_PNPM_ICONS,
  INSTALL_PROVIDER_CODE,
  INSTALL_STYLES_CODE,
  INSTALL_YARN_BEAR,
  INSTALL_YARN_BEAR_NO_ICONS,
  INSTALL_YARN_ICONS,
} from './Installation.const';

const Installation: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.installTitle} description={t.installDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installNpxTitle}</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">{t.installNpxDesc}</Typography>
        <CodeBlock code={INSTALL_NPX_BEAR} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installRequirements}</Typography>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>{t.installReqReact}</li>
          <li>{t.installReqNode}</li>
          <li>{t.installReqAero}</li>
        </ul>
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installWithBearTitle}</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">{t.installWithBearDesc}</Typography>
        <Typography variant="caption" className="mb-2 block">{t.installNpm}</Typography>
        <CodeBlock code={INSTALL_NPM_BEAR} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installYarn}</Typography>
        <CodeBlock code={INSTALL_YARN_BEAR} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installPnpm}</Typography>
        <CodeBlock code={INSTALL_PNPM_BEAR} language="bash" showLineNumbers={false} />
        <Typography variant="body2" className="mt-4 mb-3 text-gray-600 dark:text-gray-400">{t.installIconsFromBearDesc}</Typography>
        <CodeBlock code={INSTALL_ICONS_FROM_BEAR_CODE} language="tsx" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installNoIconsTitle}</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">{t.installNoIconsDesc}</Typography>
        <Typography variant="caption" className="mb-2 block">{t.installNpm}</Typography>
        <CodeBlock code={INSTALL_NPM_BEAR_NO_ICONS} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installYarn}</Typography>
        <CodeBlock code={INSTALL_YARN_BEAR_NO_ICONS} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installPnpm}</Typography>
        <CodeBlock code={INSTALL_PNPM_BEAR_NO_ICONS} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installIconsOnlyTitle}</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">{t.installIconsOnlyDesc}</Typography>
        <Typography variant="caption" className="mb-2 block">{t.installNpm}</Typography>
        <CodeBlock code={INSTALL_NPM_ICONS} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installYarn}</Typography>
        <CodeBlock code={INSTALL_YARN_ICONS} language="bash" showLineNumbers={false} />
        <Typography variant="caption" className="mb-2 mt-4 block">{t.installPnpm}</Typography>
        <CodeBlock code={INSTALL_PNPM_ICONS} language="bash" showLineNumbers={false} />
        <Typography variant="body2" className="mt-4 mb-3 text-gray-600 dark:text-gray-400">{t.installIconsOnlyUsage}</Typography>
        <CodeBlock code={INSTALL_ICONS_ONLY_CODE} language="tsx" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.installSetupTitle}</Typography>
        <Typography variant="h5" className="mb-2">{t.installStylesTitle}</Typography>
        <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">{t.installStylesDesc}</Typography>
        <CodeBlock code={INSTALL_STYLES_CODE} language="tsx" showLineNumbers={false} />
        <Typography variant="h5" className="mb-2 mt-6">{t.installProviderTitle}</Typography>
        <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">{t.installProviderDesc}</Typography>
        <CodeBlock code={INSTALL_PROVIDER_CODE} language="tsx" showLineNumbers={false} />
        <Typography variant="h5" className="mb-2 mt-6">{t.installComponentsTitle}</Typography>
        <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">{t.installComponentsDesc}</Typography>
        <CodeBlock code={INSTALL_COMPONENT_CODE} language="tsx" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default Installation;
