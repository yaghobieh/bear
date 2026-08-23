import { ONE, TREE_SELECT_INDENT_PX, TREE_SELECT_NODE_PAD_PX, ZERO } from '@const';
import { cn } from '@utils';
import { Box } from '../../../Box';
import { Flex } from '../../../Flex';
import { Typography } from '../../../Typography';
import type { TreeNodeRowProps } from '../../TreeSelect.types';
import { TreeSelectExpandControl } from '../TreeSelectExpandControl';

export const TreeNodeRow = (props: TreeNodeRowProps) => {
  const { node, depth, selected, expanded, multiple, onToggleExpand, onSelect } = props;
  const hasChildren = Boolean(node.children && node.children.length > ZERO);
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);

  return (
    <Box>
      <Flex
        className={cn(
          'bear-items-center bear-py-1.5 bear-px-3 bear-cursor-pointer bear-transition-colors hover:bear-bg-gray-50 dark:hover:bear-bg-zinc-700 bear-text-sm bear-text-gray-700 dark:bear-text-zinc-300',
          isSelected && 'bear-bg-primary-50 dark:bear-bg-primary-900/20 bear-text-primary-700 dark:bear-text-primary-300',
          node.disabled && 'bear-opacity-40 bear-cursor-not-allowed',
        )}
        style={{ paddingLeft: depth * TREE_SELECT_INDENT_PX + TREE_SELECT_NODE_PAD_PX }}
        onClick={() => !node.disabled && onSelect(node.id)}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <TreeSelectExpandControl
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          nodeId={node.id}
          onToggleExpand={onToggleExpand}
        />
        {multiple && (
          <Box
            className={cn(
              'bear-w-4 bear-h-4 bear-mr-2 bear-border bear-rounded bear-flex bear-items-center bear-justify-center bear-text-xs',
              isSelected
                ? 'bear-bg-primary-500 bear-border-primary-500 bear-text-white'
                : 'bear-border-gray-300 dark:bear-border-zinc-600',
            )}
          >
            {isSelected ? '✓' : null}
          </Box>
        )}
        {node.icon ? <Box className="bear-mr-1.5">{node.icon}</Box> : null}
        <Typography className="bear-truncate">{node.label}</Typography>
      </Flex>
      {hasChildren && isExpanded
        ? node.children?.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + ONE}
              selected={selected}
              expanded={expanded}
              multiple={multiple}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))
        : null}
    </Box>
  );
};
