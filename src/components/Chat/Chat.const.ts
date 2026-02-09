export const CHAT_DEFAULTS = {
  PLACEHOLDER: 'Type a message...',
  HEIGHT: 400,
  TYPING_TEXT: 'is typing...',
} as const;

export const MESSAGE_STATUS_ICONS = {
  sending: '○',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  error: '!',
} as const;

export const SENDER_COLORS = {
  user: {
    bg: 'var(--bear-primary-500)',
    text: 'white',
  },
  bot: {
    bg: 'var(--bear-bg-secondary)',
    text: 'var(--bear-text-primary)',
  },
  system: {
    bg: 'transparent',
    text: 'var(--bear-text-tertiary)',
  },
} as const;
