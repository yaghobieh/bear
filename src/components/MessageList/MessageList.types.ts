import type { ReactNode } from 'react';

export interface MessageListAuthor {
  /** Unique author identifier — used for consecutive message grouping */
  id: string;
  /** Display name */
  name: string;
  /** Avatar image URL */
  avatar?: string;
}

export interface MessageListMessage {
  /** Unique message identifier */
  id: string;
  /** Message author */
  author: MessageListAuthor;
  /** Message content */
  content: ReactNode;
  /** Message timestamp — required for grouping and day separators */
  timestamp: Date;
}

export interface MessageListTranslations {
  newMessages: string;
  today: string;
  yesterday: string;
  emptyLabel: string;
}

export interface MessageListDayItem {
  kind: 'day';
  key: string;
  date: Date;
}

export interface MessageListGroupItem {
  kind: 'group';
  key: string;
  author: MessageListAuthor;
  isOwn: boolean;
  messages: MessageListMessage[];
}

export type MessageListItem = MessageListDayItem | MessageListGroupItem;

export interface MessageListProps {
  id?: string;
  testId?: string;
  /** Messages in chronological order (oldest first) */
  messages: MessageListMessage[];
  /** Author id whose messages are aligned right as "own" messages */
  currentUserId?: string;
  /** Max gap in ms between consecutive messages of the same author to stay in one group */
  groupWindowMs?: number;
  /** Show day separator rows between messages of different days */
  showDaySeparators?: boolean;
  /** Show author avatars */
  showAvatars?: boolean;
  /** Show group timestamps */
  showTimestamps?: boolean;
  /** Auto-scroll to bottom on new messages when already at the bottom */
  autoScroll?: boolean;
  /** Enable windowed rendering for long conversations (auto when message count exceeds threshold) */
  virtualized?: boolean;
  /** Height of the scrollable area */
  height?: number | string;
  /** Custom message content renderer */
  renderMessage?: (message: MessageListMessage) => ReactNode;
  /** Content rendered when there are no messages */
  emptyState?: ReactNode;
  /** Custom day separator label formatter */
  formatDayLabel?: (date: Date) => string;
  /** Custom timestamp formatter */
  formatTimestamp?: (date: Date) => string;
  /** Replaceable user-facing strings */
  translations?: Partial<MessageListTranslations>;
  /** Callback when the "new messages" affordance is clicked */
  onNewMessagesClick?: () => void;
  /** Additional CSS class */
  className?: string;
}
