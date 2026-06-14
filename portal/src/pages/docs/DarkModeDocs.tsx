import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { DARK_MODE_VITE, DARK_MODE_PROVIDER, DARK_MODE_PERSIST, DARK_MODE_CSS_VARS } from '@/constants/docs';

const DarkModeDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.darkModeTitle} description={t.darkModeDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.darkModeVite}</Typography>
        <CodeBlock code={DARK_MODE_VITE} language="tsx" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.darkModeProvider}</Typography>
        <CodeBlock code={DARK_MODE_PROVIDER} language="tsx" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.darkModePersist}</Typography>
        <CodeBlock code={DARK_MODE_PERSIST} language="tsx" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.darkModeCssVars}</Typography>
        <Typography variant="body2" color="muted" className="mb-4">
          {t.darkModeThemingLink}{' '}
          <Link to="/theming" className="text-pink-600 dark:text-pink-400 hover:underline">Theming</Link>
        </Typography>
        <CodeBlock code={DARK_MODE_CSS_VARS} language="css" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default DarkModeDocsPage;
