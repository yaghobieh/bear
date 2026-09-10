import { useState } from 'react';
import { Chat } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  CHAT_BASIC_CODE,
  CHAT_DEMO_HEIGHT,
  CHAT_DEMO_MESSAGES,
  CHAT_DEMO_SUGGESTIONS,
  CHAT_PROPS,
  CHAT_REPLY_DELAY_MS,
} from './ChatPage.const';
import type { ChatPageMessage } from './ChatPage.types';
import { createChatBotMessage, createChatUserMessage } from './ChatPage.utils';

const ChatPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [messages, setMessages] = useState<ChatPageMessage[]>(CHAT_DEMO_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (content: string) => {
    setMessages((prev) => [...prev, createChatUserMessage(content)]);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, createChatBotMessage(`You said: ${content}`)]);
      setIsTyping(false);
    }, CHAT_REPLY_DELAY_MS);
  };

  const handleSuggestion = (id: string) => {
    const selected = CHAT_DEMO_SUGGESTIONS.find((item) => item.id === id);
    if (selected) {
      handleSend(selected.label);
    }
  };

  return (
    <DocPage title="Chat" badge="New" description={t.chatDesc} componentName="Chat">
      <ComponentPreview title={t.chatPreview} description={t.chatPreviewDesc} code={CHAT_BASIC_CODE}>
        <Chat
          messages={messages}
          onSend={handleSend}
          isTyping={isTyping}
          showAvatars
          showTimestamps
          showStatus
          suggestions={CHAT_DEMO_SUGGESTIONS}
          onSuggestionSelect={handleSuggestion}
          height={CHAT_DEMO_HEIGHT}
        />
      </ComponentPreview>
      <PropsTable title={t.props} rows={CHAT_PROPS} />
    </DocPage>
  );
};

export default ChatPage;
