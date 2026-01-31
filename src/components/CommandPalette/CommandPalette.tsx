import { FC, useState, useRef, useEffect, useMemo, useCallback, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { CommandPaletteProps, CommandItem, CommandItemComponentProps } from './CommandPalette.types';
import {
  COMMAND_PALETTE_DEFAULT_TRANSLATIONS,
  COMMAND_PALETTE_TRIGGER_KEY,
  COMMAND_PALETTE_MAX_RECENT,
  COMMAND_PALETTE_Z_INDEX,
} from './CommandPalette.const';
import {
  defaultFilterFn,
  groupCommandsByCategory,
  formatShortcut,
} from './CommandPalette.utils';

/**
 * CommandItemComponent - Single command item
 */
const CommandItemComponent: FC<CommandItemComponentProps> = ({
  command,
  isHighlighted,
  onSelect,
}) => (
  <button
    type="button"
    onClick={onSelect}
    disabled={command.disabled}
    className={cn(
      'Bear-CommandPalette__item bear-w-full bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-2.5 bear-text-left bear-transition-colors',
      isHighlighted
        ? 'bear-bg-pink-500/20 bear-text-pink-400'
        : 'bear-text-zinc-300 hover:bear-bg-zinc-700',
      command.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
    )}
  >
    {command.icon && (
      <span className="Bear-CommandPalette__item-icon bear-text-zinc-400 bear-shrink-0">
        {command.icon}
      </span>
    )}
    <div className="Bear-CommandPalette__item-content bear-flex-1 bear-min-w-0">
      <div className="Bear-CommandPalette__item-label bear-text-sm bear-font-medium bear-truncate">
        {command.label}
      </div>
      {command.description && (
        <div className="Bear-CommandPalette__item-description bear-text-xs bear-text-zinc-500 bear-truncate">
          {command.description}
        </div>
      )}
    </div>
    {command.shortcut && (
      <div className="Bear-CommandPalette__item-shortcut bear-flex bear-gap-1 bear-shrink-0">
        {formatShortcut(command.shortcut).map((key, idx) => (
          <kbd
            key={idx}
            className="bear-px-1.5 bear-py-0.5 bear-text-xs bear-font-mono bear-bg-zinc-700 bear-rounded bear-text-zinc-400"
          >
            {key}
          </kbd>
        ))}
      </div>
    )}
  </button>
);

/**
 * CommandPalette - Command palette component (Cmd+K style)
 *
 * @example
 * ```tsx
 * <CommandPalette
 *   commands={[
 *     { id: '1', label: 'New File', shortcut: 'Ctrl+N', onSelect: () => {} },
 *     { id: '2', label: 'Open Settings', shortcut: 'Ctrl+,', onSelect: () => {} },
 *   ]}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 */
export const CommandPalette: FC<CommandPaletteProps> = ({
  commands,
  open: controlledOpen,
  onOpenChange,
  placeholder,
  showRecent = true,
  maxRecent = COMMAND_PALETTE_MAX_RECENT,
  recentIds: controlledRecentIds,
  onRecentChange,
  groupByCategory = false,
  filterFn = defaultFilterFn,
  triggerKey = COMMAND_PALETTE_TRIGGER_KEY,
  className,
  testId,
  translations,
  icon,
  footer,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [internalRecentIds, setInternalRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = useCallback((open: boolean) => {
    onOpenChange?.(open);
    setInternalOpen(open);
  }, [onOpenChange]);

  const recentIds = controlledRecentIds ?? internalRecentIds;
  const setRecentIds = useCallback((ids: string[]) => {
    onRecentChange?.(ids);
    setInternalRecentIds(ids);
  }, [onRecentChange]);

  const t = useMemo(() => ({
    ...COMMAND_PALETTE_DEFAULT_TRANSLATIONS,
    ...translations,
  }), [translations]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      return commands;
    }
    return commands.filter((cmd) => filterFn(cmd, query));
  }, [commands, query, filterFn]);

  // Get recent commands
  const recentCommands = useMemo(() => {
    if (!showRecent || query.trim()) return [];
    return recentIds
      .slice(0, maxRecent)
      .map((id) => commands.find((c) => c.id === id))
      .filter(Boolean) as CommandItem[];
  }, [showRecent, query, recentIds, maxRecent, commands]);

  // Group commands if enabled
  const groupedCommands = useMemo(() => {
    if (!groupByCategory) return null;
    return groupCommandsByCategory(filteredCommands);
  }, [filteredCommands, groupByCategory]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => {
    const list: CommandItem[] = [];
    if (recentCommands.length > 0) {
      list.push(...recentCommands);
    }
    list.push(...filteredCommands.filter((c) => !recentIds.includes(c.id)));
    return list;
  }, [recentCommands, filteredCommands, recentIds]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === triggerKey) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, triggerKey, setIsOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlightedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-command-item]');
      const item = items[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = useCallback((command: CommandItem) => {
    // Add to recent
    const newRecent = [command.id, ...recentIds.filter((id) => id !== command.id)].slice(0, maxRecent);
    setRecentIds(newRecent);
    
    // Close palette
    setIsOpen(false);
    
    // Execute command
    command.onSelect();
  }, [recentIds, maxRecent, setRecentIds, setIsOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (flatList[highlightedIndex] && !flatList[highlightedIndex].disabled) {
          handleSelect(flatList[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  }, [flatList, highlightedIndex, handleSelect, setIsOpen]);

  if (!isOpen) return null;

  return typeof document !== 'undefined' ? createPortal(
    <div
      className={cn('Bear-CommandPalette bear-fixed bear-inset-0 bear-flex bear-items-start bear-justify-center bear-pt-[15vh]', className)}
      style={{ zIndex: COMMAND_PALETTE_Z_INDEX }}
      data-testid={testId}
    >
      <div
        className="Bear-CommandPalette__backdrop bear-absolute bear-inset-0 bear-bg-black/50 bear-backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="Bear-CommandPalette__content bear-relative bear-w-full bear-max-w-xl bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-xl bear-shadow-2xl bear-overflow-hidden"        >
        <div className="Bear-CommandPalette__search bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-3 bear-border-b bear-border-zinc-700">
          {icon ?? (
            <svg className="bear-w-5 bear-h-5 bear-text-zinc-400 bear-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t.placeholder}
            className="Bear-CommandPalette__input bear-flex-1 bear-bg-transparent bear-border-0 bear-outline-none bear-text-white placeholder:bear-text-zinc-500"
          />
          <kbd className="bear-px-2 bear-py-1 bear-text-xs bear-font-mono bear-bg-zinc-700 bear-rounded bear-text-zinc-400">
            esc
          </kbd>
        </div>

        <div
          ref={listRef}
          className="Bear-CommandPalette__list bear-max-h-[60vh] bear-overflow-y-auto"
        >
          {flatList.length === 0 ? (
            <div className="Bear-CommandPalette__empty bear-px-4 bear-py-8 bear-text-center bear-text-sm bear-text-zinc-500">
              {t.noResults}
            </div>
          ) : (
            <>
              {recentCommands.length > 0 && !query.trim() && (
                <div className="Bear-CommandPalette__group">
                  <div className="Bear-CommandPalette__group-header bear-px-4 bear-py-2 bear-text-xs bear-font-medium bear-text-zinc-500 bear-uppercase bear-tracking-wider bear-bg-zinc-800/50">
                    {t.recentCommands}
                  </div>
                  {recentCommands.map((cmd, idx) => (
                    <div key={`recent-${cmd.id}`} data-command-item>
                      <CommandItemComponent
                        command={cmd}
                        isHighlighted={highlightedIndex === idx}
                        onSelect={() => handleSelect(cmd)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {groupByCategory && groupedCommands ? (
                groupedCommands.map((group) => {
                  const startIdx = recentCommands.length + 
                    groupedCommands
                      .slice(0, groupedCommands.indexOf(group))
                      .reduce((sum, g) => sum + g.commands.length, 0);
                  
                  return (
                    <div key={group.name} className="Bear-CommandPalette__group">
                      <div className="Bear-CommandPalette__group-header bear-px-4 bear-py-2 bear-text-xs bear-font-medium bear-text-zinc-500 bear-uppercase bear-tracking-wider bear-bg-zinc-800/50">
                        {group.name}
                      </div>
                      {group.commands.map((cmd, idx) => (
                        <div key={cmd.id} data-command-item>
                          <CommandItemComponent
                            command={cmd}
                            isHighlighted={highlightedIndex === startIdx + idx}
                            onSelect={() => handleSelect(cmd)}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="Bear-CommandPalette__group">
                  {!query.trim() && recentCommands.length > 0 && (
                    <div className="Bear-CommandPalette__group-header bear-px-4 bear-py-2 bear-text-xs bear-font-medium bear-text-zinc-500 bear-uppercase bear-tracking-wider bear-bg-zinc-800/50">
                      {t.allCommands}
                    </div>
                  )}
                  {filteredCommands
                    .filter((c) => !recentIds.includes(c.id) || query.trim())
                    .map((cmd, idx) => (
                      <div key={cmd.id} data-command-item>
                        <CommandItemComponent
                          command={cmd}
                          isHighlighted={highlightedIndex === recentCommands.length + idx}
                          onSelect={() => handleSelect(cmd)}
                        />
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>

        {footer && (
          <div className="Bear-CommandPalette__footer bear-px-4 bear-py-2 bear-border-t bear-border-zinc-700 bear-text-xs bear-text-zinc-500">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;
};
