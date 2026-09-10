import { ThinkingBlock } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { THINKING_BLOCK_CODE, THINKING_BLOCK_DEMO, THINKING_BLOCK_PROPS } from './ThinkingBlockPage.const';

const ThinkingBlockPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ThinkingBlock" badge="New" description={t.aiChatStreaming} componentName="ThinkingBlock">
      <ComponentPreview title={t.aiChatStreaming} description={t.aiChatStreaming} code={THINKING_BLOCK_CODE}>
        <ThinkingBlock defaultOpen isStreaming>
          {THINKING_BLOCK_DEMO}
        </ThinkingBlock>
      </ComponentPreview>
      <PropsTable title={t.props} rows={THINKING_BLOCK_PROPS} />
    </DocPage>
  );
};

export default ThinkingBlockPage;
