import { Flex } from '../../Flex';
import { Typography } from '../../Typography';
import type { ChatBubbleProps } from '../ChatBubble.types';
import { cn } from '@utils';

export const ChatBubbleSystem = (props: Pick<ChatBubbleProps, 'id' | 'testId' | 'message' | 'className'>) => {
  const { id, testId, message, className } = props;

  return (
    <Flex
      id={id}
      testId={testId}
      className={cn('Bear-ChatBubble', 'Bear-ChatBubble--system', className)}
      justify="center"
    >
      <Typography variant="caption" className="Bear-ChatBubble__bubble">
        {message.content}
      </Typography>
    </Flex>
  );
};
