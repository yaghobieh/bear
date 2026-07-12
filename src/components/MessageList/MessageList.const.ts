import type { MessageListTranslations } from './MessageList.types';

export const MESSAGE_LIST_ROOT_CLASS = 'Bear-MessageList';

export const MESSAGE_LIST_DEFAULT_HEIGHT = 400;

export const MESSAGE_LIST_GROUP_WINDOW_MS = 5 * 60 * 1000;

export const MESSAGE_LIST_BOTTOM_THRESHOLD_PX = 40;

export const MESSAGE_LIST_MS_PER_DAY = 24 * 60 * 60 * 1000;

export const MESSAGE_LIST_DEFAULT_TRANSLATIONS: MessageListTranslations = {
  newMessages: 'New messages',
  today: 'Today',
  yesterday: 'Yesterday',
  emptyLabel: 'No messages yet',
};

export const MESSAGE_LIST_BASE_CLASSES =
  'bear-relative bear-flex bear-flex-col bear-rounded-xl bear-border bear-overflow-hidden';

export const MESSAGE_LIST_SCROLLER_CLASSES =
  'bear-flex-1 bear-overflow-y-auto bear-p-4 bear-flex bear-flex-col bear-gap-3';

export const MESSAGE_LIST_DAY_SEPARATOR_CLASSES =
  'bear-flex bear-items-center bear-gap-3 bear-my-1';

export const MESSAGE_LIST_DAY_LINE_CLASSES = 'bear-flex-1 bear-h-px';

export const MESSAGE_LIST_DAY_LABEL_CLASSES =
  'bear-text-xs bear-font-medium bear-whitespace-nowrap';

export const MESSAGE_LIST_GROUP_CLASSES = 'bear-flex bear-gap-2';

export const MESSAGE_LIST_GROUP_OWN_CLASSES = 'bear-flex-row-reverse';

export const MESSAGE_LIST_GROUP_BODY_CLASSES =
  'bear-flex bear-flex-col bear-gap-1 bear-min-w-0 bear-flex-1';

export const MESSAGE_LIST_GROUP_BODY_OWN_CLASSES = 'bear-items-end';

export const MESSAGE_LIST_BUBBLE_CLASSES =
  'bear-px-4 bear-py-2 bear-rounded-2xl bear-text-sm bear-max-w-[70%] bear-w-fit';

export const MESSAGE_LIST_BUBBLE_OWN_CLASSES = 'bear-self-end';

export const MESSAGE_LIST_META_CLASSES =
  'bear-flex bear-items-baseline bear-gap-2 bear-mb-1';

export const MESSAGE_LIST_AUTHOR_CLASSES = 'bear-text-xs bear-font-semibold';

export const MESSAGE_LIST_TIMESTAMP_CLASSES = 'bear-text-xs';

export const MESSAGE_LIST_NEW_MESSAGES_CLASSES =
  'bear-absolute-x-center bear-bottom-4 bear-flex bear-items-center bear-gap-2 bear-px-4 bear-py-2 bear-rounded-full bear-border-none bear-cursor-pointer bear-shadow-lg bear-text-xs bear-font-medium hover:bear-opacity-90';

export const MESSAGE_LIST_EMPTY_CLASSES =
  'bear-flex-1 bear-flex bear-items-center bear-justify-center bear-text-sm';
