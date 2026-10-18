import { FC } from 'react';
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
  BEAR_PACKAGE_INSTALLS,
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
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsLibraries}</Typography>
        <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">
          The default install is every Bear component except icons and charts. Tree stays in Core. Map, kanban, AI, and code are included unless the CLI is started with --exclude. Charts and icons are added by name.
        </Typography>
        <CodeBlock code={BEAR_PACKAGE_INSTALLS} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.packageImportsUsage}</Typography>
        <CodeBlock code={PACKAGE_IMPORTS_USAGE} language="tsx" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default PackageImportsDocsPage;
