import type { ChatPageMessage } from './ChatPage.types';

export const createChatUserMessage = (content: string): ChatPageMessage => ({
  id: `user-${Date.now()}`,
  content,
  sender: 'user',
  timestamp: new Date(),
  status: 'sent',
});

export const createChatBotMessage = (content: string): ChatPageMessage => ({
  id: `bot-${Date.now()}`,
  content,
  sender: 'bot',
  timestamp: new Date(),
});
