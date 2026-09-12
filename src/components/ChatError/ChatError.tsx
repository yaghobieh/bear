import { COMPONENT_NAME_CHAT_ERROR } from '@const';
import { cn, getBearLiveRegionProps, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { CHAT_ERROR_DEFAULT_TRANSLATIONS } from './ChatError.const';
import type { ChatErrorProps } from './ChatError.types';

export const ChatError = (props: ChatErrorProps) => {
  const { id, testId, title, children, onRetry, translations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_CHAT_ERROR);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...CHAT_ERROR_DEFAULT_TRANSLATIONS, ...translations };
  const heading = title ?? labels.title;
  const liveProps = getBearLiveRegionProps('error');

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-ChatError', className)}
      {...liveProps}
    >
      <Flex direction="column" gap={2} align="start">
        <Typography variant="subtitle2">{heading}</Typography>
        {children && <Typography variant="body2">{children}</Typography>}
        {onRetry && (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            {labels.retryLabel}
          </Button>
        )}
      </Flex>
    </Box>
  );
};
