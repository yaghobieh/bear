import { Flex } from '../../Flex';
import { Typography } from '../../Typography';
import { TYPING_DOT_COUNT } from '@const';

export const ChatTypingIndicator = (props: { text: string }) => {
  const { text } = props;
  const dots = Array.from({ length: TYPING_DOT_COUNT }, (_, index) => index);

  return (
    <Flex className="Bear-ChatTyping" align="center" gap={2}>
      <Flex className="Bear-ChatTyping__dots" align="center">
        {dots.map((dotIndex) => (
          <Typography key={dotIndex} component="span" className="Bear-ChatTyping__dot" />
        ))}
      </Flex>
      <Typography variant="caption" color="muted">
        {text}
      </Typography>
    </Flex>
  );
};
