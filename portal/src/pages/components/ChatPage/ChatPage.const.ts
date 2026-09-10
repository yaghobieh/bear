import type { PropRow } from '@/components/PropsTable';
import type { PromptSuggestionItem } from '@forgedevstack/bear';
import type { ChatPageMessage } from './ChatPage.types';

export const CHAT_REPLY_DELAY_MS = 800;
export const CHAT_DEMO_HEIGHT = 400;
export const CHAT_BOT_OFFSET_MS = 60000;
export const CHAT_USER_OFFSET_MS = 30000;

export const CHAT_DEMO_MESSAGES: ChatPageMessage[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - CHAT_BOT_OFFSET_MS),
  },
  {
    id: '2',
    content: 'I need a chat surface that can stream and stop.',
    sender: 'user',
    timestamp: new Date(Date.now() - CHAT_USER_OFFSET_MS),
    status: 'read',
  },
];

export const CHAT_DEMO_SUGGESTIONS: PromptSuggestionItem[] = [
  { id: 'stream', label: 'Show a streaming reply' },
  { id: 'tools', label: 'Explain tool calls' },
];

export const CHAT_PROPS: PropRow[] = [
  { name: 'messages', type: 'ChatMessage[]', description: 'Conversation in chronological order' },
  { name: 'onSend', type: '(message: string) => void', description: 'Fired when the composer submits' },
  { name: 'onStop', type: '() => void', description: 'Stop a streaming reply' },
  { name: 'onAttach', type: '(files: File[]) => void', description: 'Optional file attachments' },
  { name: 'isStreaming', type: 'boolean', default: 'false', description: 'Model is generating; shows stop' },
  { name: 'isLoading', type: 'boolean', default: 'false', description: 'Alias that also disables send' },
  { name: 'isTyping', type: 'boolean', default: 'false', description: 'Someone is composing, not generating' },
  { name: 'suggestions', type: 'PromptSuggestionItem[]', description: 'Prompt chips above the composer' },
  { name: 'errorMessage', type: 'ReactNode', description: 'Inline ChatError body' },
  { name: 'height', type: 'number | string', default: '400', description: 'Chat pane height' },
  { name: 'id', type: 'string', description: 'Optional root id' },
  { name: 'testId', type: 'string', description: 'data-testid on the root' },
];

export const CHAT_BASIC_CODE = `import { Chat } from '@forgedevstack/bear';

<Chat
  messages={messages}
  onSend={handleSend}
  onStop={handleStop}
  isStreaming={isStreaming}
  suggestions={suggestions}
/>`;
