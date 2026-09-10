import type { ReactNode } from 'react';
import type { ChatMessage, ChatTranslations } from '../Chat/Chat.types';

export interface FloatingChatTranslations extends ChatTranslations {
  closeLabel: string;
  openLabel: string;
}

export interface FloatingChatProps {
  id?: string;
  testId?: string;
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  onStop?: () => void;
  onAttach?: (files: File[]) => void;
  isLoading?: boolean;
  isStreaming?: boolean;
  isTyping?: boolean;
  title?: string;
  subtitle?: string;
  avatar?: string;
  position?: 'bottom-right' | 'bottom-left';
  bottom?: number;
  side?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  badgeCount?: number;
  header?: ReactNode;
  welcomeMessage?: string;
  poweredBy?: string;
  allowAttach?: boolean;
  className?: string;
  translations?: Partial<FloatingChatTranslations>;
}
