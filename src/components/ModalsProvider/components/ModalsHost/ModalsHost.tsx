import { Box } from '../../../Box';
import { MODALS_HOST_CLASSNAME } from '../../ModalsProvider.const';
import type { ModalsHostProps } from '../../ModalsProvider.types';
import { isTopStackIndex } from '../../ModalsProvider.utils';
import { StackedModal } from '../StackedModal';

export const ModalsHost = (props: ModalsHostProps) => {
  const { stack, loadingId, labels, onDismiss, onConfirm, id, testId } = props;

  return (
    <Box className={MODALS_HOST_CLASSNAME} id={id} data-testid={testId}>
      {stack.map((entry, index) => (
        <StackedModal
          key={entry.id}
          entry={entry}
          index={index}
          isTop={isTopStackIndex(index, stack.length)}
          loading={loadingId === entry.id}
          labels={labels}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
        />
      ))}
    </Box>
  );
};
