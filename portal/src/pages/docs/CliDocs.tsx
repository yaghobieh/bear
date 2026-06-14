import { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { CLI_CREATE_CMD, CLI_ADD_CMD, CLI_COMMANDS } from '@/constants/docs';

const CliDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title={t.cliTitle} description={t.cliDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.cliInit}</Typography>
        <CodeBlock code={CLI_CREATE_CMD} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.cliAdd}</Typography>
        <CodeBlock code={CLI_ADD_CMD} language="bash" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.cliCommands}</Typography>
        <CodeBlock code={CLI_COMMANDS} language="bash" showLineNumbers={false} />
      </section>
    </DocPage>
  );
};

export default CliDocsPage;
