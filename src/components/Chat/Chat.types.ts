import type { ReactNode } from 'react';
import type { ChatBubbleProps as ChatBubbleComponentProps } from '../ChatBubble/ChatBubble.types';
import type { PromptSuggestionItem } from '../PromptSuggestions/PromptSuggestions.types';

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

export interface ChatTranslations {
  placeholder: string;
  typingText: string;
  newMessagesLabel: string;
}

export interface ChatProps {
  id?: string;
  testId?: string;
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  onStop?: () => void;
  onAttach?: (files: File[]) => void;
  isLoading?: boolean;
  isStreaming?: boolean;
  isTyping?: boolean;
  placeholder?: string;
  header?: ReactNode;
  footer?: ReactNode;
  showTimestamps?: boolean;
  showStatus?: boolean;
  showAvatars?: boolean;
  userAvatar?: string;
  botAvatar?: string;
  typingText?: string;
  className?: string;
  height?: number | string;
  disabled?: boolean;
  allowAttach?: boolean;
  suggestions?: PromptSuggestionItem[];
  onSuggestionSelect?: (id: string) => void;
  errorTitle?: string;
  errorMessage?: ReactNode;
  onRetry?: () => void;
  translations?: Partial<ChatTranslations>;
}

export type ChatBubbleProps = ChatBubbleComponentProps;
