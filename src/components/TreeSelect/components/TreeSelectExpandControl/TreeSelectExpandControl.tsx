import { ZERO } from '@const';
import { cn } from '@utils';
import { Button } from '../../../Button';
import { ChevronRightIcon } from '../../../Icon';
import { Box } from '../../../Box';
import type { TreeSelectExpandControlProps } from '../../TreeSelect.types';

export const TreeSelectExpandControl = (props: TreeSelectExpandControlProps) => {
  const { hasChildren, isExpanded, nodeId, onToggleExpand } = props;

  if (!hasChildren) {
    return <Box className="bear-w-4 bear-mr-1" />;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      iconOnly
      className={cn(
        'bear-w-4 bear-h-4 bear-mr-1 bear-p-0 bear-text-gray-400 dark:bear-text-zinc-500 bear-transition-transform',
        isExpanded && 'bear-rotate-90',
      )}
      onClick={(event) => {
        event.stopPropagation();
        onToggleExpand(nodeId);
      }}
      tabIndex={ZERO}
    >
      <ChevronRightIcon className="bear-w-4 bear-h-4" />
    </Button>
  );
};
