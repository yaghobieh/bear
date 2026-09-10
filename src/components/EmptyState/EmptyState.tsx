import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { cn, resolveBearId, useBearId } from '@utils';
import {
  EMPTY_STATE_DEFAULT_PRESET,
  EMPTY_STATE_DEFAULT_SIZE,
  EMPTY_STATE_DEFAULT_VARIANT,
  EMPTY_STATE_PRESET_ICON,
  EMPTY_STATE_SIZE_CLASSES,
} from './EmptyState.const';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState = (props: EmptyStateProps) => {
  const {
    icon,
    title,
    description,
    action,
    secondaryAction,
    className,
    size = EMPTY_STATE_DEFAULT_SIZE,
    variant = EMPTY_STATE_DEFAULT_VARIANT,
    preset = EMPTY_STATE_DEFAULT_PRESET,
    id,
    testId,
  } = props;

  const generatedId = useBearId('EmptyState');
  const domId = resolveBearId(id, generatedId);
  const sizeClasses = EMPTY_STATE_SIZE_CLASSES[size];
  const PresetIcon = EMPTY_STATE_PRESET_ICON[preset];
  const iconNode = icon ?? <PresetIcon className="bear-w-full bear-h-full" />;

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-EmptyState',
        variant === 'card' && 'Bear-EmptyState--card',
        `Bear-EmptyState--${preset}`,
        sizeClasses.padding,
        className
      )}
    >
      <Box className={cn('Bear-EmptyState__icon', sizeClasses.icon)}>{iconNode}</Box>
      <Typography className={cn('Bear-EmptyState__title', sizeClasses.title)}>{title}</Typography>
      {description && (
        <Typography className={cn('Bear-EmptyState__description', sizeClasses.desc)}>
          {description}
        </Typography>
      )}
      {(action || secondaryAction) && (
        <Flex className="Bear-EmptyState__actions" align="center" gap={3}>
          {action}
          {secondaryAction}
        </Flex>
      )}
    </Box>
  );
};
