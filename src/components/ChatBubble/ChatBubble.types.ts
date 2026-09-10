import type { ChatMessage } from '../Chat/Chat.types';

export interface ChatBubbleProps {
  id?: string;
  testId?: string;
  message: ChatMessage;
  showTimestamp?: boolean;
  showStatus?: boolean;
  showAvatar?: boolean;
  userAvatar?: string;
  botAvatar?: string;
  className?: string;
}
