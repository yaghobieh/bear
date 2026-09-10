import type { ReactNode } from 'react';

export type StreamingMessageSender = 'user' | 'assistant' | 'bot' | 'system';

export interface StreamingMessageTranslations {
  streamingLabel: string;
}

export interface StreamingMessageProps {
  id?: string;
  testId?: string;
  content: ReactNode;
  isStreaming?: boolean;
  sender?: StreamingMessageSender;
  live?: boolean;
  translations?: Partial<StreamingMessageTranslations>;
  className?: string;
}
