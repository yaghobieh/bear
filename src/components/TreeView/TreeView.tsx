import { useState, useCallback } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, SIZE_MD, ZERO } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { TreeViewNode } from './components';
import type { TreeViewProps } from './TreeView.types';

export const TreeView = (props: TreeViewProps) => {
  const {
    data,
    onSelect,
    onExpand,
    selectedId,
    defaultExpandedIds = [],
    showCheckboxes = BOOLEAN_FALSE,
    onCheck,
    checkedIds = [],
    className,
    size = SIZE_MD,
    showLines = BOOLEAN_FALSE,
  } = props;

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));

  const onToggle = useCallback(
    (nodeId: string) => {
      setExpandedIds((previous) => {
        const next = new Set(previous);
        if (next.has(nodeId)) {
          next.delete(nodeId);
          onExpand?.(nodeId, BOOLEAN_FALSE);
        } else {
          next.add(nodeId);
          onExpand?.(nodeId, BOOLEAN_TRUE);
        }
        return next;
      });
    },
    [onExpand],
  );

  return (
    <Box className={cn('Bear-TreeView bear-select-none', className)}>
      {data.map((node) => (
        <TreeViewNode
          key={node.id}
          node={node}
          depth={ZERO}
          size={size}
          selectedId={selectedId}
          checkedIds={checkedIds}
          expandedIds={expandedIds}
          showCheckboxes={showCheckboxes}
          showLines={showLines}
          onSelect={onSelect}
          onCheck={onCheck}
          onToggle={onToggle}
        />
      ))}
    </Box>
  );
};
