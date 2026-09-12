import { COMPONENT_NAME_TOOL_CALL } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import {
  TOOL_CALL_DEFAULT_KIND,
  TOOL_CALL_DEFAULT_STATUS,
  TOOL_CALL_DEFAULT_TRANSLATIONS,
  TOOL_CALL_STATUS_LABEL_KEY,
} from './ToolCall.const';
import type { ToolCallProps } from './ToolCall.types';

export const ToolCall = (props: ToolCallProps) => {
  const {
    id,
    testId,
    name,
    status = TOOL_CALL_DEFAULT_STATUS,
    kind = TOOL_CALL_DEFAULT_KIND,
    input,
    output,
    translations,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_TOOL_CALL);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...TOOL_CALL_DEFAULT_TRANSLATIONS, ...translations };
  const statusLabel = labels[TOOL_CALL_STATUS_LABEL_KEY[status]];

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-ToolCall', `Bear-ToolCall--${status}`, `Bear-ToolCall--${kind}`, className)}
    >
      <Flex align="center" justify="between" gap={2}>
        <Typography variant="subtitle2">{name}</Typography>
        <Badge size="sm">{statusLabel}</Badge>
      </Flex>
      {input && (
        <Box className="Bear-ToolCall__input">
          {typeof input === 'string' ? <Typography variant="body2">{input}</Typography> : input}
        </Box>
      )}
      {output && (
        <Box className="Bear-ToolCall__output">
          {typeof output === 'string' ? <Typography variant="body2">{output}</Typography> : output}
        </Box>
      )}
    </Box>
  );
};
