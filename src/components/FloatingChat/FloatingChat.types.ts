/**
 * FloatingChat component types
 */

import type { ReactNode } from 'react';
import type { ChatMessage } from '../Chat/Chat.types';

export interface FloatingChatProps {
  /** Chat messages */
  messages: ChatMessage[];
  /** Callback when user sends a message */
  onSend?: (message: string) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Typing indicator */
  isTyping?: boolean;
  /** Chat title */
  title?: string;
  /** Chat subtitle */
  subtitle?: string;
  /** Avatar URL */
  avatar?: string;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left';
  /** Distance from bottom */
  bottom?: number;
  /** Distance from side */
  side?: number;
  /** Initial open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom trigger button */
  trigger?: ReactNode;
  /** Badge count (e.g., unread messages) */
  badgeCount?: number;
  /** Header content */
  header?: ReactNode;
  /** Welcome message */
  welcomeMessage?: string;
  /** Show powered by */
  poweredBy?: string;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
