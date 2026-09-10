import {
  BOOLEAN_FALSE,
  CHAT_BADGE_MAX,
  LABEL_CLOSE,
  LABEL_NEW_MESSAGES,
  PLACEHOLDER_START_TYPING,
  TWENTY,
} from '@const';
import type { FloatingChatTranslations } from './FloatingChat.types';

export const FLOATING_CHAT_DEFAULTS = {
  POSITION: 'bottom-right' as const,
  BOTTOM: TWENTY,
  SIDE: TWENTY,
  TITLE: 'Chat',
  SUBTITLE: 'We typically reply in a few minutes',
  WELCOME_MESSAGE: 'Hi! How can we help you today?',
} as const;

export const CHAT_WINDOW_SIZE = {
  width: 360,
  height: 520,
} as const;

export const FLOATING_CHAT_CHROME_PX = 140;
export const FLOATING_CHAT_WELCOME_ID = 'welcome';

export const FLOATING_CHAT_DEFAULT_OPEN = BOOLEAN_FALSE;
export const FLOATING_CHAT_POWERED_BY = 'Forge';
export const FLOATING_CHAT_BADGE_MAX = CHAT_BADGE_MAX;
export const FLOATING_CHAT_BOTTOM_VAR = '--Bear-FloatingChat-bottom';
export const FLOATING_CHAT_SIDE_VAR = '--Bear-FloatingChat-side';
export const FLOATING_CHAT_WIDTH_VAR = '--Bear-FloatingChat-width';
export const FLOATING_CHAT_HEIGHT_VAR = '--Bear-FloatingChat-height';

export const FLOATING_CHAT_DEFAULT_TRANSLATIONS: FloatingChatTranslations = {
  placeholder: PLACEHOLDER_START_TYPING,
  typingText: 'is typing...',
  newMessagesLabel: LABEL_NEW_MESSAGES,
  closeLabel: LABEL_CLOSE,
  openLabel: FLOATING_CHAT_DEFAULTS.TITLE,
};
