import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { JAVASCRIPT_JSCONFIG, JAVASCRIPT_COMPONENT } from '@/constants/docs';

const JavaScriptDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.javascriptTitle} description={t.javascriptDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.javascriptTsconfig}</Typography>
        <CodeBlock code={JAVASCRIPT_JSCONFIG} language="json" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.javascriptOptOut}</Typography>
        <Typography variant="body2" color="muted" className="mb-4">{t.javascriptDesc}</Typography>
        <CodeBlock code={JAVASCRIPT_COMPONENT} language="jsx" />
      </section>
    </DocPage>
  );
};

export default JavaScriptDocsPage;
