import { COMPONENT_NAME_MESSAGE_ACTIONS } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { MESSAGE_ACTIONS_DEFAULT_TRANSLATIONS } from './MessageActions.const';
import type { MessageActionsProps } from './MessageActions.types';

export const MessageActions = (props: MessageActionsProps) => {
  const { id, testId, onCopy, onRetry, onGood, onBad, translations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_MESSAGE_ACTIONS);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...MESSAGE_ACTIONS_DEFAULT_TRANSLATIONS, ...translations };

  return (
    <Flex
      id={domId}
      testId={testId}
      className={cn('Bear-MessageActions', className)}
      align="center"
      gap={1}
    >
      {onCopy && (
        <Button type="button" variant="ghost" size="sm" onClick={onCopy}>
          {labels.copyLabel}
        </Button>
      )}
      {onRetry && (
        <Button type="button" variant="ghost" size="sm" onClick={onRetry}>
          {labels.retryLabel}
        </Button>
      )}
      {onGood && (
        <Button type="button" variant="ghost" size="sm" onClick={onGood}>
          {labels.goodLabel}
        </Button>
      )}
      {onBad && (
        <Button type="button" variant="ghost" size="sm" onClick={onBad}>
          {labels.badLabel}
        </Button>
      )}
    </Flex>
  );
};
