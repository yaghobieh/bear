import { BOOLEAN_TRUE } from '@const';

export const CHAT_BUBBLE_DEFAULT_SHOW_TIMESTAMP = BOOLEAN_TRUE;
export const CHAT_BUBBLE_DEFAULT_SHOW_STATUS = BOOLEAN_TRUE;
export const CHAT_BUBBLE_DEFAULT_SHOW_AVATAR = BOOLEAN_TRUE;

export const CHAT_BUBBLE_STATUS_MARK = {
  sending: '○',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  error: '!',
} as const;

export const CHAT_BUBBLE_USER_INITIAL = 'U';
export const CHAT_BUBBLE_BOT_INITIAL = 'B';
export const CHAT_BUBBLE_TIME_DIGIT = '2-digit';
