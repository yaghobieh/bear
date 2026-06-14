import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  PACKAGE_JSON_IMPORTS,
  TSCONFIG_IMPORTS,
  COMPONENTS_JSON_ALIASES,
  PACKAGE_IMPORTS_USAGE,
} from '@/constants/docs';

const PackageImportsDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.packageImportsTitle} description={t.packageImportsDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsPackageJson}</Typography>
        <CodeBlock code={PACKAGE_JSON_IMPORTS} language="json" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsTsconfig}</Typography>
        <CodeBlock code={TSCONFIG_IMPORTS} language="json" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsComponentsJson}</Typography>
        <CodeBlock code={COMPONENTS_JSON_ALIASES} language="json" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsUsage}</Typography>
        <CodeBlock code={PACKAGE_IMPORTS_USAGE} language="tsx" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default PackageImportsDocsPage;
