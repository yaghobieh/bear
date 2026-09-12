import { BOOLEAN_FALSE } from '@const';
import { COMPONENT_NAME_STREAMING_MESSAGE } from '@const';
import { cn, getBearLiveRegionProps, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Typography } from '../Typography';
import {
  STREAMING_MESSAGE_DEFAULT_LIVE,
  STREAMING_MESSAGE_DEFAULT_SENDER,
  STREAMING_MESSAGE_DEFAULT_STREAMING,
  STREAMING_MESSAGE_DEFAULT_TRANSLATIONS,
} from './StreamingMessage.const';
import type { StreamingMessageProps } from './StreamingMessage.types';

export const StreamingMessage = (props: StreamingMessageProps) => {
  const {
    id,
    testId,
    content,
    isStreaming = STREAMING_MESSAGE_DEFAULT_STREAMING,
    sender = STREAMING_MESSAGE_DEFAULT_SENDER,
    live = STREAMING_MESSAGE_DEFAULT_LIVE,
    translations,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_STREAMING_MESSAGE);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...STREAMING_MESSAGE_DEFAULT_TRANSLATIONS, ...translations };
  const liveProps = live && isStreaming ? getBearLiveRegionProps('info') : {};
  const contentText = typeof content === 'string' ? content : undefined;

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-StreamingMessage', `Bear-StreamingMessage--${sender}`, className)}
      {...liveProps}
    >
      <Typography variant="body2">
        {content}
        {isStreaming && (
          <Box
            as="span"
            className="Bear-StreamingMessage__cursor"
            aria-hidden={BOOLEAN_FALSE}
          />
        )}
      </Typography>
      {isStreaming && contentText && (
        <Typography variant="caption" className="Bear-StreamingMessage__status">
          {labels.streamingLabel}
        </Typography>
      )}
    </Box>
  );
};
