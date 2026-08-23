import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EIGHT,
  ELEVEN_THOUSAND,
  EMPTY_STRING,
  FOUR,
  SIZE_MD,
  TREE_SELECT_MAX_HEIGHT_PX,
  ZERO,
} from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ChevronDownIcon } from '../Icon';
import { Flex } from '../Flex';
import { Portal } from '../Portal';
import { Typography } from '../Typography';
import { TreeNodeRow } from './components';
import { SIZE_CLASSES } from './TreeSelect.const';
import type { TreeSelectProps } from './TreeSelect.types';
import { findNodeById, filterNodes, collectAllIds } from './TreeSelect.utils';

export const TreeSelect = (props: TreeSelectProps) => {
  const {
    nodes,
    value,
    onChange,
    multiple = BOOLEAN_FALSE,
    label,
    placeholder = 'Select…',
    disabled = BOOLEAN_FALSE,
    clearable = BOOLEAN_TRUE,
    searchable = BOOLEAN_TRUE,
    expandAll = BOOLEAN_FALSE,
    size = SIZE_MD,
    error,
    helperText,
    maxHeight = TREE_SELECT_MAX_HEIGHT_PX,
    className,
    testId,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(BOOLEAN_FALSE);
  const [search, setSearch] = useState(EMPTY_STRING);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: ZERO, left: ZERO, width: ZERO });

  const allIds = useMemo(() => collectAllIds(nodes), [nodes]);
  const [expanded, setExpanded] = useState<Set<string>>(() => (expandAll ? allIds : new Set()));

  const selected = useMemo(() => {
    if (!value) return new Set<string>();
    return new Set(Array.isArray(value) ? value : [value]);
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPosition({
        top: rect.bottom + FOUR,
        left: Math.max(EIGHT, Math.min(rect.left, window.innerWidth - rect.width - EIGHT)),
        width: rect.width,
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setIsOpen(BOOLEAN_FALSE);
      setSearch(EMPTY_STRING);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const onToggleExpand = useCallback((id: string) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const onSelect = useCallback(
    (id: string) => {
      if (multiple) {
        const next = new Set(selected);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        onChange?.(Array.from(next));
        return;
      }
      onChange?.(id);
      setIsOpen(BOOLEAN_FALSE);
      setSearch(EMPTY_STRING);
    },
    [multiple, selected, onChange],
  );

  const handleClear = useCallback(() => {
    onChange?.(multiple ? [] : EMPTY_STRING);
  }, [multiple, onChange]);

  const filteredNodes = search ? filterNodes(nodes, search) : nodes;
  const selectedNode = findNodeById(nodes, Array.from(selected)[ZERO] ?? EMPTY_STRING);
  const hasSelection = selected.size > ZERO;

  return (
    <Box
      ref={containerRef}
      className={cn('Bear-TreeSelect bear-relative bear-inline-block bear-w-full', className)}
      data-testid={testId}
      {...rest}
    >
      {label ? (
        <Typography className="Bear-TreeSelect__label bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-zinc-300 bear-mb-1.5">
          {label}
        </Typography>
      ) : null}
      <Button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white bear-transition-colors focus:bear-ring-2 focus:bear-ring-primary-500 bear-outline-none',
          SIZE_CLASSES[size],
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        )}
      >
        <Typography className="bear-flex-1 bear-text-left bear-truncate">
          {hasSelection && multiple ? (
            <Flex className="bear-flex-wrap bear-gap-1">
              {Array.from(selected).map((id) => {
                const node = findNodeById(nodes, id);
                return node ? (
                  <Typography
                    key={id}
                    className="bear-inline-flex bear-items-center bear-gap-1 bear-bg-primary-100 dark:bear-bg-primary-900/30 bear-text-primary-700 dark:bear-text-primary-300 bear-rounded bear-px-1.5 bear-py-0.5 bear-text-xs"
                  >
                    {node.label}
                  </Typography>
                ) : null;
              })}
            </Flex>
          ) : null}
          {hasSelection && !multiple ? selectedNode?.label ?? placeholder : null}
          {hasSelection ? null : (
            <Typography className="bear-text-gray-400 dark:bear-text-zinc-500">{placeholder}</Typography>
          )}
        </Typography>
        <Flex align="center" className="bear-gap-1">
          {clearable && hasSelection ? (
            <Box
              className="bear-text-gray-400 hover:bear-text-gray-600 bear-cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
            >
              ✕
            </Box>
          ) : null}
          <ChevronDownIcon
            className={cn('bear-w-4 bear-h-4 bear-text-gray-400 bear-transition-transform', isOpen && 'bear-rotate-180')}
          />
        </Flex>
      </Button>

      {isOpen ? (
        <Portal>
          <Box
            ref={dropdownRef}
            className="bear-fixed bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-xl bear-shadow-xl bear-overflow-hidden"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              zIndex: ELEVEN_THOUSAND,
            }}
          >
            {searchable ? (
              <input
                className="bear-w-full bear-px-3 bear-py-2 bear-text-sm bear-bg-transparent bear-border-b bear-border-gray-200 dark:bear-border-zinc-700 bear-outline-none bear-text-gray-900 dark:bear-text-white"
                placeholder="Search…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoFocus
              />
            ) : null}
            <Box style={{ maxHeight }} className="bear-overflow-y-auto" role="tree">
              {filteredNodes.length > ZERO ? (
                filteredNodes.map((node) => (
                  <TreeNodeRow
                    key={node.id}
                    node={node}
                    depth={ZERO}
                    selected={selected}
                    expanded={expanded}
                    multiple={multiple}
                    onToggleExpand={onToggleExpand}
                    onSelect={onSelect}
                  />
                ))
              ) : (
                <Typography className="bear-py-6 bear-text-center bear-text-sm bear-text-gray-400">No results</Typography>
              )}
            </Box>
          </Box>
        </Portal>
      ) : null}

      {error ? <Typography className="bear-mt-1 bear-text-xs bear-text-red-500">{error}</Typography> : null}
      {!error && helperText ? (
        <Typography className="bear-mt-1 bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500">{helperText}</Typography>
      ) : null}
    </Box>
  );
};
