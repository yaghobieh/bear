export const FLOATING_CHAT_DEFAULTS = {
  POSITION: 'bottom-right' as const,
  BOTTOM: 20,
  SIDE: 20,
  TITLE: 'Chat',
  SUBTITLE: 'We typically reply in a few minutes',
  WELCOME_MESSAGE: 'Hi! How can we help you today?',
} as const;

export const CHAT_WINDOW_SIZE = {
  width: 380,
  height: 520,
} as const;
