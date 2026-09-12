import { StreamingMessage } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  STREAMING_MESSAGE_CODE,
  STREAMING_MESSAGE_DEMO,
  STREAMING_MESSAGE_PROPS,
} from './StreamingMessagePage.const';

const StreamingMessagePage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="StreamingMessage" badge="New" description={t.aiChatStreaming} componentName="StreamingMessage">
      <ComponentPreview title={t.aiChatStreaming} description={t.aiChatStreaming} code={STREAMING_MESSAGE_CODE}>
        <StreamingMessage content={STREAMING_MESSAGE_DEMO} isStreaming />
      </ComponentPreview>
      <PropsTable title={t.props} rows={STREAMING_MESSAGE_PROPS} />
    </DocPage>
  );
};

export default StreamingMessagePage;
