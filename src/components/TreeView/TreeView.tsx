import { FC, useState, useCallback } from 'react';
import { TreeViewProps, TreeNode } from './TreeView.types';
import { cn } from '../../utils/cn';

const ChevronIcon: FC<{ expanded: boolean; className?: string }> = ({ expanded, className }) => (
  <svg className={cn('bear-transition-transform', expanded && 'bear-rotate-90', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FolderIcon: FC<{ open: boolean; className?: string }> = ({ open, className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    )}
  </svg>
);

export const TreeView: FC<TreeViewProps> = ({
  data,
  onSelect,
  onExpand,
  selectedId,
  defaultExpandedIds = [],
  showCheckboxes = false,
  onCheck,
  checkedIds = [],
  className,
  size = 'md',
  showLines = false,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
        onExpand?.(nodeId, false);
      } else {
        next.add(nodeId);
        onExpand?.(nodeId, true);
      }
      return next;
    });
  }, [onExpand]);

  const sizeClasses = {
    sm: { text: 'bear-text-xs', icon: 'bear-w-3 bear-h-3', padding: 'bear-py-0.5 bear-px-1', indent: 12 },
    md: { text: 'bear-text-sm', icon: 'bear-w-4 bear-h-4', padding: 'bear-py-1 bear-px-2', indent: 16 },
    lg: { text: 'bear-text-base', icon: 'bear-w-5 bear-h-5', padding: 'bear-py-1.5 bear-px-3', indent: 20 },
  };

  const renderNode = (node: TreeNode, depth: number = 0): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const isChecked = checkedIds.includes(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            'bear-flex bear-items-center bear-gap-1 bear-rounded bear-transition-colors bear-cursor-pointer',
            sizeClasses[size].padding,
            sizeClasses[size].text,
            isSelected ? 'bear-bg-pink-500/20 bear-text-pink-400' : 'bear-text-zinc-300 hover:bear-bg-zinc-700/50',
            node.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
          )}
          style={{ paddingLeft: depth * sizeClasses[size].indent + 8 }}
          onClick={() => !node.disabled && onSelect?.(node)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
              className="bear-p-0.5 bear-rounded hover:bear-bg-zinc-600"
            >
              <ChevronIcon expanded={isExpanded} className={sizeClasses[size].icon} />
            </button>
          ) : (
            <span className={cn(sizeClasses[size].icon, 'bear-opacity-0')} />
          )}
          {showCheckboxes && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => { e.stopPropagation(); onCheck?.(node.id, e.target.checked); }}
              className="bear-accent-pink-500"
              disabled={node.disabled}
            />
          )}
          {node.icon || (hasChildren && <FolderIcon open={isExpanded} className={cn(sizeClasses[size].icon, 'bear-text-yellow-500')} />)}
          <span className="bear-flex-1">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className={cn(showLines && 'bear-border-l bear-border-zinc-700 bear-ml-4')}>
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('bear-select-none', className)}>
      {data.map(node => renderNode(node))}
    </div>
  );
};

