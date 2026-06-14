import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { REGISTRY_JSON_EXAMPLE, REGISTRY_INSTALL_CMD, REGISTRY_VALIDATE_CMD } from '@/constants/docs';

const RegistryGithubDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.registryGithubTitle} description={t.registryGithubDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryGithubStep1}</Typography>
        <CodeBlock code={REGISTRY_JSON_EXAMPLE} language="json" />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryGithubStep2}</Typography>
        <CodeBlock code={REGISTRY_INSTALL_CMD} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryGithubValidate}</Typography>
        <CodeBlock code={REGISTRY_VALIDATE_CMD} language="bash" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default RegistryGithubDocsPage;
