import { useState } from 'react';
import { ChatError } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CHAT_ERROR_CODE, CHAT_ERROR_PROPS, CHAT_ERROR_STATIC_CODE } from './ChatErrorPage.const';

const ChatErrorPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [retries, setRetries] = useState(0);

  return (
    <DocPage title="ChatError" description={t.chatErrorDesc} componentName="ChatError">
      <ComponentPreview title={t.basic} description={t.chatErrorLiveDesc} code={CHAT_ERROR_CODE}>
        <ChatError title={t.chatErrorTitle} onRetry={() => setRetries((count) => count + 1)}>
          {t.chatErrorBody} {retries}
        </ChatError>
      </ComponentPreview>
      <ComponentPreview title={t.anotherExample} description={t.chatErrorDesc} code={CHAT_ERROR_STATIC_CODE}>
        <ChatError title={t.chatErrorTitle}>{t.chatErrorBody}</ChatError>
      </ComponentPreview>
      <PropsTable title={t.props} rows={CHAT_ERROR_PROPS} />
    </DocPage>
  );
};

export default ChatErrorPage;
