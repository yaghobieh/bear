import { FC, useEffect, useRef, useState } from 'react';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import type {
  MessageListGroupItem,
  MessageListMessage,
  MessageListProps,
} from './MessageList.types';
import {
  MESSAGE_LIST_AUTHOR_CLASSES,
  MESSAGE_LIST_BASE_CLASSES,
  MESSAGE_LIST_BOTTOM_THRESHOLD_PX,
  MESSAGE_LIST_BUBBLE_CLASSES,
  MESSAGE_LIST_BUBBLE_OWN_CLASSES,
  MESSAGE_LIST_DAY_LABEL_CLASSES,
  MESSAGE_LIST_DAY_LINE_CLASSES,
  MESSAGE_LIST_DAY_SEPARATOR_CLASSES,
  MESSAGE_LIST_DEFAULT_HEIGHT,
  MESSAGE_LIST_DEFAULT_TRANSLATIONS,
  MESSAGE_LIST_EMPTY_CLASSES,
  MESSAGE_LIST_GROUP_BODY_CLASSES,
  MESSAGE_LIST_GROUP_BODY_OWN_CLASSES,
  MESSAGE_LIST_GROUP_CLASSES,
  MESSAGE_LIST_GROUP_OWN_CLASSES,
  MESSAGE_LIST_GROUP_WINDOW_MS,
  MESSAGE_LIST_META_CLASSES,
  MESSAGE_LIST_NEW_MESSAGES_CLASSES,
  MESSAGE_LIST_ROOT_CLASS,
  MESSAGE_LIST_SCROLLER_CLASSES,
  MESSAGE_LIST_TIMESTAMP_CLASSES,
} from './MessageList.const';
import {
  buildMessageListItems,
  getDefaultDayLabel,
  getDefaultTimestamp,
} from './MessageList.utils';
import { cn, resolveBearId, useBearId } from '@utils';

/**
 * MessageList - Chat message list with consecutive-author grouping,
 * day separators, and auto-scroll with a "new messages" affordance.
 *
 * Rendering is plain (non-virtualized); virtualization is planned as
 * future work for very long conversations.
 *
 * @example
 * ```tsx
 * <MessageList
 *   messages={messages}
 *   currentUserId="me"
 *   height={420}
 * />
 * ```
 */
export const MessageList: FC<MessageListProps> = ({
  id,
  testId,
  messages,
  currentUserId,
  groupWindowMs = MESSAGE_LIST_GROUP_WINDOW_MS,
  showDaySeparators = true,
  showAvatars = true,
  showTimestamps = true,
  autoScroll = true,
  height = MESSAGE_LIST_DEFAULT_HEIGHT,
  renderMessage,
  emptyState,
  formatDayLabel,
  formatTimestamp,
  translations,
  onNewMessagesClick,
  className,
}) => {
  const generatedId = useBearId('MessageList');
  const domId = resolveBearId(id, generatedId);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const lastMessageIdRef = useRef<string | null>(null);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const t = { ...MESSAGE_LIST_DEFAULT_TRANSLATIONS, ...translations };
  const items = buildMessageListItems(messages, currentUserId, groupWindowMs, showDaySeparators);
  const dayLabel = (date: Date) => formatDayLabel?.(date) ?? getDefaultDayLabel(date, t);
  const timeLabel = (date: Date) => formatTimestamp?.(date) ?? getDefaultTimestamp(date);

  const scrollToBottom = (smooth: boolean) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const distanceFromBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    const atBottom = distanceFromBottom <= MESSAGE_LIST_BOTTOM_THRESHOLD_PX;
    isAtBottomRef.current = atBottom;
    if (atBottom) {
      setHasNewMessages(false);
    }
  };

  useEffect(() => {
    const lastId = messages.length > 0 ? messages[messages.length - 1].id : null;
    const isFirstRender = lastMessageIdRef.current === null;
    const hasAppended = lastId !== null && lastId !== lastMessageIdRef.current;
    lastMessageIdRef.current = lastId;

    if (!hasAppended) return;

    if (isFirstRender || (autoScroll && isAtBottomRef.current)) {
      scrollToBottom(!isFirstRender);
      return;
    }
    setHasNewMessages(true);
  }, [messages, autoScroll]);

  const handleNewMessagesClick = () => {
    scrollToBottom(true);
    setHasNewMessages(false);
    onNewMessagesClick?.();
  };

  const renderGroup = (group: MessageListGroupItem) => (
    <div
      key={group.key}
      className={cn(
        `${MESSAGE_LIST_ROOT_CLASS}__group`,
        MESSAGE_LIST_GROUP_CLASSES,
        group.isOwn && MESSAGE_LIST_GROUP_OWN_CLASSES
      )}
    >
      {showAvatars && !group.isOwn && (
        <Avatar
          src={group.author.avatar}
          initials={group.author.name[0]}
          size="sm"
          className="bear-flex-shrink-0"
        />
      )}
      <div
        className={cn(
          `${MESSAGE_LIST_ROOT_CLASS}__group-body`,
          MESSAGE_LIST_GROUP_BODY_CLASSES,
          group.isOwn && MESSAGE_LIST_GROUP_BODY_OWN_CLASSES
        )}
      >
        {!group.isOwn && (
          <div className={cn(`${MESSAGE_LIST_ROOT_CLASS}__meta`, MESSAGE_LIST_META_CLASSES)}>
            <Typography
              variant="caption"
              component="span"
              className={cn(`${MESSAGE_LIST_ROOT_CLASS}__author`, MESSAGE_LIST_AUTHOR_CLASSES)}
            >
              {group.author.name}
            </Typography>
            {showTimestamps && (
              <Typography
                variant="caption"
                component="span"
                className={cn(`${MESSAGE_LIST_ROOT_CLASS}__timestamp`, MESSAGE_LIST_TIMESTAMP_CLASSES)}
              >
                {timeLabel(group.messages[0].timestamp)}
              </Typography>
            )}
          </div>
        )}
        {group.messages.map((message: MessageListMessage) => (
          <div
            key={message.id}
            className={cn(
              `${MESSAGE_LIST_ROOT_CLASS}__bubble`,
              MESSAGE_LIST_BUBBLE_CLASSES,
              group.isOwn && `${MESSAGE_LIST_ROOT_CLASS}__bubble--own`,
              group.isOwn && MESSAGE_LIST_BUBBLE_OWN_CLASSES
            )}
          >
            {renderMessage?.(message) ?? message.content}
          </div>
        ))}
        {group.isOwn && showTimestamps && (
          <Typography
            variant="caption"
            component="span"
            className={cn(`${MESSAGE_LIST_ROOT_CLASS}__timestamp`, MESSAGE_LIST_TIMESTAMP_CLASSES)}
          >
            {timeLabel(group.messages[group.messages.length - 1].timestamp)}
          </Typography>
        )}
      </div>
    </div>
  );

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn(MESSAGE_LIST_ROOT_CLASS, MESSAGE_LIST_BASE_CLASSES, className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={cn(`${MESSAGE_LIST_ROOT_CLASS}__scroller`, MESSAGE_LIST_SCROLLER_CLASSES)}
        role="log"
        aria-live="polite"
      >
        {items.length === 0 && (
          <div className={cn(`${MESSAGE_LIST_ROOT_CLASS}__empty`, MESSAGE_LIST_EMPTY_CLASSES)}>
            {emptyState ?? (
              <Typography variant="body2" component="span">
                {t.emptyLabel}
              </Typography>
            )}
          </div>
        )}
        {items.map((item) =>
          item.kind === 'day' ? (
            <div
              key={item.key}
              className={cn(
                `${MESSAGE_LIST_ROOT_CLASS}__day-separator`,
                MESSAGE_LIST_DAY_SEPARATOR_CLASSES
              )}
            >
              <span className={cn(`${MESSAGE_LIST_ROOT_CLASS}__day-line`, MESSAGE_LIST_DAY_LINE_CLASSES)} />
              <span className={cn(`${MESSAGE_LIST_ROOT_CLASS}__day-label`, MESSAGE_LIST_DAY_LABEL_CLASSES)}>
                {dayLabel(item.date)}
              </span>
              <span className={cn(`${MESSAGE_LIST_ROOT_CLASS}__day-line`, MESSAGE_LIST_DAY_LINE_CLASSES)} />
            </div>
          ) : (
            renderGroup(item)
          )
        )}
      </div>

      {hasNewMessages && (
        <button
          type="button"
          onClick={handleNewMessagesClick}
          className={cn(
            `${MESSAGE_LIST_ROOT_CLASS}__new-messages`,
            MESSAGE_LIST_NEW_MESSAGES_CLASSES
          )}
        >
          {t.newMessages}
        </button>
      )}
    </div>
  );
};
