import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { NEXTJS_LAYOUT, NEXTJS_CLIENT_COMPONENT, NEXTJS_CONFIG } from '@/constants/docs';

const NextJsDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.nextjsTitle} description={t.nextjsDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.nextjsLayout}</Typography>
        <CodeBlock code={NEXTJS_LAYOUT} language="tsx" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.nextjsClient}</Typography>
        <CodeBlock code={NEXTJS_CLIENT_COMPONENT} language="tsx" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.nextjsConfig}</Typography>
        <CodeBlock code={NEXTJS_CONFIG} language="javascript" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default NextJsDocsPage;
