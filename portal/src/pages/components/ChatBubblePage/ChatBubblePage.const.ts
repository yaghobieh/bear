import type { PropRow } from '@/components/PropsTable';
import type { ChatMessage } from '@forgedevstack/bear';

export const CHAT_BUBBLE_BOT: ChatMessage = {
  id: 'bot-1',
  content: 'Hello! How can I help you today?',
  sender: 'bot',
};

export const CHAT_BUBBLE_USER: ChatMessage = {
  id: 'user-1',
  content: 'Show me the Chart component.',
  sender: 'user',
  status: 'read',
};

export const CHAT_BUBBLE_PROPS: PropRow[] = [
  { name: 'message', type: 'ChatMessage', description: 'Message to render' },
  { name: 'showAvatar', type: 'boolean', default: 'true', description: 'Show sender avatar' },
  { name: 'showTimestamp', type: 'boolean', default: 'true', description: 'Show time' },
  { name: 'showStatus', type: 'boolean', default: 'true', description: 'Show delivery status' },
];

export const CHAT_BUBBLE_CODE = `import { ChatBubble, Flex } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <Flex direction="column" gap={3}>
      <ChatBubble
        message={{ id: 'bot-1', content: 'Hello! How can I help you today?', sender: 'bot' }}
      />
      <ChatBubble
        message={{ id: 'user-1', content: 'Show me the Chart component.', sender: 'user', status: 'read' }}
      />
    </Flex>
  );
}
`;
