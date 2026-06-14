import { FC, useState } from 'react';
import { Typography, Tabs, TabList, Tab, TabPanel } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { MCP_CONFIG_EXAMPLE, MCP_CLIENT_COMMANDS, type McpClientId } from '@/constants/docs';

const MCP_TABS: { id: McpClientId; labelKey: string }[] = [
  { id: 'cursor', labelKey: 'registryMcpClientCursor' },
  { id: 'vscode', labelKey: 'registryMcpClientVscode' },
  { id: 'codex', labelKey: 'registryMcpClientCodex' },
  { id: 'opencode', labelKey: 'registryMcpClientOpencode' },
  { id: 'claude', labelKey: 'registryMcpClientClaude' },
];

const RegistryMcpDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [client, setClient] = useState<McpClientId>('cursor');

  return (
    <DocPage title={t.registryMcpTitle} badge={t.soon} description={t.registryMcpDesc}>
      <section className="doc-section mb-10">
        <Typography variant="body2" color="muted" className="leading-relaxed">{t.registryMcpIntro}</Typography>
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryMcpIndexHint}</Typography>
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryMcpComponentsJson}</Typography>
        <CodeBlock code={MCP_CONFIG_EXAMPLE} language="json" showLineNumbers={false} />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.registryMcpQuickStart}</Typography>
        <Tabs value={client} defaultTab="cursor" onChange={(v) => setClient(v as McpClientId)}>
          <TabList>
            {MCP_TABS.map((tab) => (
              <Tab key={tab.id} id={tab.id}>{t[tab.labelKey]}</Tab>
            ))}
          </TabList>
          {MCP_TABS.map((tab) => (
            <TabPanel key={tab.id} tabId={tab.id}>
              <div className="pt-4">
                <CodeBlock code={MCP_CLIENT_COMMANDS[tab.id]} language="bash" showLineNumbers={false} />
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </section>
    </DocPage>
  );
};

export default RegistryMcpDocsPage;
