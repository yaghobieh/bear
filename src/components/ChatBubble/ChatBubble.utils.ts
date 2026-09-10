import {
  CHAT_BUBBLE_BOT_INITIAL,
  CHAT_BUBBLE_TIME_DIGIT,
  CHAT_BUBBLE_USER_INITIAL,
} from './ChatBubble.const';
import type { ChatMessage } from '../Chat/Chat.types';

export const isChatUserSender = (sender: ChatMessage['sender']) => sender === 'user';

export const isChatSystemSender = (sender: ChatMessage['sender']) => sender === 'system';

export const resolveChatBubbleAvatar = (
  message: ChatMessage,
  userAvatar?: string,
  botAvatar?: string
) => {
  if (message.avatar) {
    return message.avatar;
  }
  return isChatUserSender(message.sender) ? userAvatar : botAvatar;
};

export const resolveChatBubbleInitial = (message: ChatMessage) => {
  if (message.name) {
    return message.name[0];
  }
  return isChatUserSender(message.sender) ? CHAT_BUBBLE_USER_INITIAL : CHAT_BUBBLE_BOT_INITIAL;
};

export const formatChatBubbleTime = (timestamp?: Date) => {
  if (!timestamp) {
    return undefined;
  }
  return timestamp.toLocaleTimeString([], {
    hour: CHAT_BUBBLE_TIME_DIGIT,
    minute: CHAT_BUBBLE_TIME_DIGIT,
  });
};
