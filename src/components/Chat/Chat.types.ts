/**
 * Chat component types
 */

import type { ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  content: string | ReactNode;
  sender: 'user' | 'bot' | 'system';
  timestamp?: Date;
  avatar?: string;
  name?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  metadata?: Record<string, unknown>;
}

export interface ChatProps {
  /** Array of messages */
  messages: ChatMessage[];
  /** Callback when user sends a message */
  onSend?: (message: string) => void;
  /** Loading state (e.g., waiting for bot response) */
  isLoading?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Chat header content */
  header?: ReactNode;
  /** Chat footer content (below input) */
  footer?: ReactNode;
  /** Show timestamps */
  showTimestamps?: boolean;
  /** Show message status */
  showStatus?: boolean;
  /** Show avatars */
  showAvatars?: boolean;
  /** User avatar URL */
  userAvatar?: string;
  /** Bot avatar URL */
  botAvatar?: string;
  /** Typing indicator */
  isTyping?: boolean;
  /** Typing indicator text */
  typingText?: string;
  /** Custom class name */
  className?: string;
  /** Height of the chat container */
  height?: number | string;
  /** Test ID */
  testId?: string;
  /** Disable input */
  disabled?: boolean;
}

export interface ChatBubbleProps {
  message: ChatMessage;
  showTimestamp?: boolean;
  showStatus?: boolean;
  showAvatar?: boolean;
  userAvatar?: string;
  botAvatar?: string;
}
