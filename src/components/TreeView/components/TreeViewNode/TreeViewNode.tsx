import { EIGHT, ONE, ZERO } from '@const';
import { cn } from '@utils';
import { Box } from '../../../Box';
import { Flex } from '../../../Flex';
import { Typography } from '../../../Typography';
import { TREE_VIEW_SIZE } from '../../TreeView.const';
import type { TreeViewNodeProps } from '../../TreeView.types';
import { TreeViewExpandControl } from '../TreeViewExpandControl';
import { TreeViewNodeIcon } from '../TreeViewNodeIcon';

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const {
    node,
    depth,
    size,
    selectedId,
    checkedIds,
    expandedIds,
    showCheckboxes,
    showLines,
    onSelect,
    onCheck,
    onToggle,
  } = props;
  const sizeToken = TREE_VIEW_SIZE[size];
  const hasChildren = Boolean(node.children && node.children.length > ZERO);
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isChecked = checkedIds.includes(node.id);

  return (
    <Box>
      <Flex
        align="center"
        className={cn(
          'bear-gap-1 bear-rounded bear-transition-colors bear-cursor-pointer',
          sizeToken.padding,
          sizeToken.text,
          isSelected ? 'bear-bg-primary-500/20 bear-text-primary-400' : 'bear-text-zinc-300 hover:bear-bg-zinc-700/50',
          node.disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        )}
        style={{ paddingLeft: depth * sizeToken.indent + EIGHT }}
        onClick={() => !node.disabled && onSelect?.(node)}
      >
        <TreeViewExpandControl
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          nodeId={node.id}
          iconClassName={sizeToken.icon}
          onToggle={onToggle}
        />
        {showCheckboxes ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(event) => {
              event.stopPropagation();
              onCheck?.(node.id, event.target.checked);
            }}
            className="bear-accent-primary-500"
            disabled={node.disabled}
          />
        ) : null}
        <TreeViewNodeIcon
          icon={node.icon}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          iconClassName={sizeToken.icon}
        />
        <Typography className="bear-flex-1">{node.label}</Typography>
      </Flex>
      {hasChildren && isExpanded ? (
        <Box className={cn(showLines && 'bear-border-l bear-border-zinc-700 bear-ml-4')}>
          {node.children?.map((child) => (
            <TreeViewNode
              key={child.id}
              node={child}
              depth={depth + ONE}
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
      ) : null}
    </Box>
  );
};
