import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { ChevronRightIcon } from '../../../Icon';
import { cn } from '@utils';
import type { TreeViewExpandControlProps } from '../../TreeView.types';

export const TreeViewExpandControl = (props: TreeViewExpandControlProps) => {
  const { hasChildren, isExpanded, nodeId, iconClassName, onToggle } = props;

  if (!hasChildren) {
    return <Box className={cn(iconClassName, 'bear-opacity-0')} />;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      iconOnly
      className="bear-p-0.5 bear-rounded hover:bear-bg-zinc-600"
      onClick={(event) => {
        event.stopPropagation();
        onToggle(nodeId);
      }}
    >
      <ChevronRightIcon className={cn('bear-transition-transform', isExpanded && 'bear-rotate-90', iconClassName)} />
    </Button>
  );
};
