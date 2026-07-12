import type {
  MessageListItem,
  MessageListMessage,
  MessageListTranslations,
} from './MessageList.types';
import { MESSAGE_LIST_MS_PER_DAY } from './MessageList.const';

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
