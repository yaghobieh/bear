import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import type { TreeSelectProps, TreeNode } from './TreeSelect.types';
import {
  DEFAULT_MAX_HEIGHT, INDENT_PX, SIZE_CLASSES,
  ROOT_CLASSES, TRIGGER_CLASSES, DROPDOWN_CLASSES, SEARCH_CLASSES,
  NODE_CLASSES, NODE_SELECTED_CLASSES, NODE_DISABLED_CLASSES,
  CHEVRON_CLASSES, TAG_CLASSES, LABEL_CLASSES, ERROR_CLASSES, HELPER_CLASSES,
} from './TreeSelect.const';
import { findNodeById, filterNodes, collectAllIds } from './TreeSelect.utils';

const TreeNodeRow: FC<{
  node: TreeNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  multiple: boolean;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
}> = ({ node, depth, selected, expanded, multiple, onToggleExpand, onSelect }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);

  return (
    <>
      <div
        className={cn(NODE_CLASSES, isSelected && NODE_SELECTED_CLASSES, node.disabled && NODE_DISABLED_CLASSES)}
        style={{ paddingLeft: depth * INDENT_PX + 12 }}
        onClick={() => !node.disabled && onSelect(node.id)}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {hasChildren ? (
          <svg
            className={cn(CHEVRON_CLASSES, isExpanded && 'bear-rotate-90')}
            onClick={(e) => { e.stopPropagation(); onToggleExpand(node.id); }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <span className="bear-w-4 bear-mr-1" />
        )}
        {multiple && (
          <span className={cn('bear-w-4 bear-h-4 bear-mr-2 bear-border bear-rounded bear-flex bear-items-center bear-justify-center bear-text-xs', isSelected ? 'bear-bg-pink-500 bear-border-pink-500 bear-text-white' : 'bear-border-gray-300 dark:bear-border-zinc-600')}>
            {isSelected && '✓'}
          </span>
        )}
        {node.icon && <span className="bear-mr-1.5">{node.icon}</span>}
        <span className="bear-truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && node.children!.map((child) => (
        <TreeNodeRow key={child.id} node={child} depth={depth + 1} selected={selected} expanded={expanded} multiple={multiple} onToggleExpand={onToggleExpand} onSelect={onSelect} />
      ))}
    </>
  );
};

export const TreeSelect: FC<TreeSelectProps> = (props) => {
  const {
    nodes, value, onChange, multiple = false, label, placeholder = 'Select…',
    disabled = false, clearable = true, searchable = true, expandAll = false,
    size = 'md', error, helperText, maxHeight = DEFAULT_MAX_HEIGHT,
    className, testId, ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const allIds = useMemo(() => collectAllIds(nodes), [nodes]);
  const [expanded, setExpanded] = useState<Set<string>>(() => expandAll ? allIds : new Set());

  const selected = useMemo(() => {
    if (!value) return new Set<string>();
    return new Set(Array.isArray(value) ? value : [value]);
  }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const onToggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const onSelect = useCallback((id: string) => {
    if (multiple) {
      const next = new Set(selected);
      next.has(id) ? next.delete(id) : next.add(id);
      onChange?.(Array.from(next));
    } else {
      onChange?.(id);
      setIsOpen(false);
      setSearch('');
    }
  }, [multiple, selected, onChange]);

  const handleClear = useCallback(() => {
    onChange?.(multiple ? [] : '');
  }, [multiple, onChange]);

  const filteredNodes = search ? filterNodes(nodes, search) : nodes;

  const displayValue = (): React.ReactNode => {
    if (selected.size === 0) return <span className="bear-text-gray-400 dark:bear-text-zinc-500">{placeholder}</span>;
    if (multiple) {
      return (
        <div className="bear-flex bear-flex-wrap bear-gap-1">
          {Array.from(selected).map((id) => {
            const node = findNodeById(nodes, id);
            return node ? <span key={id} className={TAG_CLASSES}>{node.label}</span> : null;
          })}
        </div>
      );
    }
    const node = findNodeById(nodes, Array.from(selected)[0]);
    return node?.label ?? placeholder;
  };

  return (
    <div ref={containerRef} className={cn(ROOT_CLASSES, className)} data-testid={testId} {...rest}>
      {label && <label className={LABEL_CLASSES}>{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(TRIGGER_CLASSES, SIZE_CLASSES[size], disabled && 'bear-opacity-50 bear-cursor-not-allowed')}
      >
        <span className="bear-flex-1 bear-text-left bear-truncate">{displayValue()}</span>
        <div className="bear-flex bear-items-center bear-gap-1">
          {clearable && selected.size > 0 && (
            <span className="bear-text-gray-400 hover:bear-text-gray-600 bear-cursor-pointer" onClick={(e) => { e.stopPropagation(); handleClear(); }}>✕</span>
          )}
          <svg className={cn('bear-w-4 bear-h-4 bear-text-gray-400 bear-transition-transform', isOpen && 'bear-rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className={DROPDOWN_CLASSES}>
          {searchable && (
            <input
              className={SEARCH_CLASSES}
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          )}
          <div style={{ maxHeight }} className="bear-overflow-y-auto" role="tree">
            {filteredNodes.length > 0 ? filteredNodes.map((node) => (
              <TreeNodeRow key={node.id} node={node} depth={0} selected={selected} expanded={expanded} multiple={multiple} onToggleExpand={onToggleExpand} onSelect={onSelect} />
            )) : (
              <div className="bear-py-6 bear-text-center bear-text-sm bear-text-gray-400">No results</div>
            )}
          </div>
        </div>
      )}

      {error && <p className={ERROR_CLASSES}>{error}</p>}
      {!error && helperText && <p className={HELPER_CLASSES}>{helperText}</p>}
    </div>
  );
};

export default TreeSelect;
