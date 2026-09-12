import { ChatBubble, Flex } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CHAT_BUBBLE_BOT, CHAT_BUBBLE_CODE, CHAT_BUBBLE_PROPS, CHAT_BUBBLE_USER } from './ChatBubblePage.const';

const ChatBubblePage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ChatBubble" description={t.chatBubbleDesc} componentName="ChatBubble">
      <ComponentPreview title={t.basic} description={t.chatBubbleDesc} code={CHAT_BUBBLE_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <ChatBubble message={CHAT_BUBBLE_BOT} />
          <ChatBubble message={CHAT_BUBBLE_USER} />
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={CHAT_BUBBLE_PROPS} />
    </DocPage>
  );
};

export default ChatBubblePage;
