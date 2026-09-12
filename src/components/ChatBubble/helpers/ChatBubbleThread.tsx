import { Avatar } from '../../Avatar';
import { Flex } from '../../Flex';
import { Typography } from '../../Typography';
import {
  CHAT_BUBBLE_STATUS_MARK,
} from '../ChatBubble.const';
import type { ChatBubbleProps } from '../ChatBubble.types';
import {
  formatChatBubbleTime,
  isChatUserSender,
  resolveChatBubbleAvatar,
  resolveChatBubbleInitial,
} from '../ChatBubble.utils';
import { cn } from '@utils';

export const ChatBubbleThread = (props: ChatBubbleProps & { domId: string }) => {
  const {
    domId,
    testId,
    message,
    showTimestamp,
    showStatus,
    showAvatar,
    userAvatar,
    botAvatar,
    className,
  } = props;

  const isUser = isChatUserSender(message.sender);
  const timeLabel = formatChatBubbleTime(message.timestamp);
  const statusMark = message.status ? CHAT_BUBBLE_STATUS_MARK[message.status] : undefined;

  return (
    <Flex
      id={domId}
      testId={testId}
      className={cn('Bear-ChatBubble', `Bear-ChatBubble--${message.sender}`, className)}
      align="start"
      gap={2}
    >
      {showAvatar && (
        <Avatar
          src={resolveChatBubbleAvatar(message, userAvatar, botAvatar)}
          initials={resolveChatBubbleInitial(message)}
          size="sm"
        />
      )}
      <Flex className="Bear-ChatBubble__body" direction="column" gap={1}>
        {message.name && (
          <Typography variant="caption" color="muted">
            {message.name}
          </Typography>
        )}
        <Typography variant="body2" className="Bear-ChatBubble__bubble">
          {message.content}
        </Typography>
        <Flex className="Bear-ChatBubble__meta" align="center" gap={1}>
          {showTimestamp && timeLabel && (
            <Typography variant="caption" color="muted">
              {timeLabel}
            </Typography>
          )}
          {showStatus && statusMark && isUser && (
            <Typography
              variant="caption"
              className={cn(
                'Bear-ChatBubble__status',
                message.status && `Bear-ChatBubble__status--${message.status}`
              )}
            >
              {statusMark}
            </Typography>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
