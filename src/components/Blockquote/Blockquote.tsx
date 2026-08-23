import { COLOR_DEFAULT } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { QuoteIcon } from '../Icon';
import { Typography } from '../Typography';
import type { BlockquoteProps } from './Blockquote.types';
import { BORDER_COLOR_MAP, ICON_COLOR_MAP } from './Blockquote.const';

export const Blockquote = (props: BlockquoteProps) => {
  const {
    cite,
    icon,
    color = COLOR_DEFAULT,
    children,
    className,
    testId,
    ...rest
  } = props;

  return (
    <blockquote
      className={cn(
        'Bear-Blockquote bear-pl-4 bear-py-2 bear-border-l-4 bear-bg-gray-50 dark:bear-bg-zinc-800/50 bear-rounded-r bear-not-italic',
        BORDER_COLOR_MAP[color],
        className
      )}
      data-testid={testId}
      cite={cite}
      {...rest}
    >
      <Flex className="bear-gap-3">
        <Box as="span" className={cn('bear-flex-shrink-0', ICON_COLOR_MAP[color])}>
          {icon ?? <QuoteIcon className="bear-w-6 bear-h-6" />}
        </Box>
        <Box className="bear-flex-1 bear-min-w-0">
          <Typography variant="body1" component="span">
            {children}
          </Typography>
          {cite && (
            <Typography
              variant="caption"
              color="secondary"
              component="cite"
              className="Bear-Blockquote__cite bear-mt-2 bear-block"
            >
              — {cite}
            </Typography>
          )}
        </Box>
      </Flex>
    </blockquote>
  );
};

export default Blockquote;
