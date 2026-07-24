import type {
  MessageListItem,
  MessageListMessage,
  MessageListTranslations,
} from './MessageList.types';
import {
  MESSAGE_LIST_BUBBLE_ESTIMATE_PX,
  MESSAGE_LIST_DAY_ESTIMATE_PX,
  MESSAGE_LIST_GROUP_BASE_ESTIMATE_PX,
  MESSAGE_LIST_ITEM_GAP_PX,
  MESSAGE_LIST_MS_PER_DAY,
} from './MessageList.const';

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const getDayKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const getDefaultDayLabel = (
  date: Date,
  translations: MessageListTranslations
): string => {
  const now = new Date();
  if (isSameDay(date, now)) {
    return translations.today;
  }
  const yesterday = new Date(now.getTime() - MESSAGE_LIST_MS_PER_DAY);
  if (isSameDay(date, yesterday)) {
    return translations.yesterday;
  }
  return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
};

export const getDefaultTimestamp = (date: Date): string =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const buildMessageListItems = (
  messages: MessageListMessage[],
  currentUserId: string | undefined,
  groupWindowMs: number,
  showDaySeparators: boolean
): MessageListItem[] => {
  const items: MessageListItem[] = [];
  let lastDate: Date | null = null;

  for (const message of messages) {
    const startsNewDay = lastDate === null || !isSameDay(lastDate, message.timestamp);
    if (showDaySeparators && startsNewDay) {
      items.push({
        kind: 'day',
        key: `day-${getDayKey(message.timestamp)}`,
        date: message.timestamp,
      });
    }

    const last = items[items.length - 1];
    const canJoinGroup =
      last !== undefined &&
      last.kind === 'group' &&
      last.author.id === message.author.id &&
      message.timestamp.getTime() -
        last.messages[last.messages.length - 1].timestamp.getTime() <=
        groupWindowMs;

    if (last !== undefined && last.kind === 'group' && canJoinGroup) {
      last.messages.push(message);
    } else {
      items.push({
        kind: 'group',
        key: `group-${message.id}`,
        author: message.author,
        isOwn: message.author.id === currentUserId,
        messages: [message],
      });
    }

    lastDate = message.timestamp;
  }

  return items;
};

export const estimateMessageListItemHeight = (item: MessageListItem): number => {
  if (item.kind === 'day') {
    return MESSAGE_LIST_DAY_ESTIMATE_PX + MESSAGE_LIST_ITEM_GAP_PX;
  }
  return (
    MESSAGE_LIST_GROUP_BASE_ESTIMATE_PX +
    item.messages.length * MESSAGE_LIST_BUBBLE_ESTIMATE_PX +
    MESSAGE_LIST_ITEM_GAP_PX
  );
};

export const getMessageListWindow = (
  items: MessageListItem[],
  scrollTop: number,
  viewportHeight: number,
  overscan: number
): { startIndex: number; endIndex: number; offsetTop: number; totalHeight: number } => {
  const heights = items.map(estimateMessageListItemHeight);
  const totalHeight = heights.reduce((sum, h) => sum + h, 0);
  let offset = 0;
  let startIndex = 0;
  for (let i = 0; i < heights.length; i += 1) {
    if (offset + heights[i] > scrollTop) {
      startIndex = Math.max(0, i - overscan);
      break;
    }
    offset += heights[i];
  }
  let offsetTop = 0;
  for (let i = 0; i < startIndex; i += 1) {
    offsetTop += heights[i];
  }
  let endIndex = startIndex;
  let covered = offsetTop;
  while (endIndex < heights.length && covered < scrollTop + viewportHeight) {
    covered += heights[endIndex];
    endIndex += 1;
  }
  endIndex = Math.min(heights.length - 1, endIndex + overscan);
  return { startIndex, endIndex, offsetTop, totalHeight };
};
