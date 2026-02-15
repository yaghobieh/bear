import { FC, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { cn } from '@utils';
import type { SpotlightProps, SpotlightAction } from './Spotlight.types';
import {
  DEFAULT_SHORTCUT_KEY,
  DEFAULT_PLACEHOLDER,
  DEFAULT_NOTHING_FOUND,
  DEFAULT_LIMIT,
  SPOTLIGHT_Z_INDEX,
  FOCUS_DELAY,
} from './Spotlight.const';

const matchAction = (action: SpotlightAction, query: string): boolean => {
  const q = query.toLowerCase();
  if (action.label.toLowerCase().includes(q)) return true;
  if (action.description?.toLowerCase().includes(q)) return true;
  if (action.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
};

const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="Bear-Spotlight__highlight bear-bg-yellow-200 dark:bear-bg-yellow-800 bear-text-inherit bear-rounded-sm bear-px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
};

/**
 * Spotlight - macOS-style search overlay (Cmd+K).
 * Supports grouped actions, highlighting, keyboard navigation, and theming via BearProvider.
 */
export const Spotlight: FC<SpotlightProps> = (props) => {
  const {
    actions,
    open: controlledOpen,
    onOpenChange,
    placeholder = DEFAULT_PLACEHOLDER,
    shortcutKey = DEFAULT_SHORTCUT_KEY,
    shortcutMod = true,
    nothingFoundMessage = DEFAULT_NOTHING_FOUND,
    highlightMatches = true,
    limit = DEFAULT_LIMIT,
    filter,
    className,
    style,
    testId,
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v);
      onOpenChange?.(v);
      if (!v) {
        setQuery('');
        setActiveIndex(0);
      }
    },
    [onOpenChange]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = shortcutMod ? (e.metaKey || e.ctrlKey) : true;
      if (mod && e.key.toLowerCase() === shortcutKey.toLowerCase()) {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcutKey, shortcutMod, isOpen, setOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), FOCUS_DELAY);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (filter) return filter(query, actions).slice(0, limit);
    if (!query) return actions.slice(0, limit);
    return actions.filter((a) => matchAction(a, query)).slice(0, limit);
  }, [actions, query, filter, limit]);

  // Group actions
  const groups = useMemo(() => {
    const map = new Map<string, SpotlightAction[]>();
    filtered.forEach((a) => {
      const group = a.group || '';
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(a);
    });
    return map;
  }, [filtered]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        const action = filtered[activeIndex];
        if (!action.disabled) {
          action.onTrigger();
          setOpen(false);
        }
      }
    },
    [filtered, activeIndex, setOpen]
  );

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div
      className={cn(
        'Bear-Spotlight',
        'bear-fixed bear-inset-0 bear-flex bear-items-start bear-justify-center bear-pt-[15vh]',
      )}
      style={{ zIndex: SPOTLIGHT_Z_INDEX }}
      data-testid={testId}
    >
      {/* Backdrop */}
      <div
        className="Bear-Spotlight__backdrop bear-absolute bear-inset-0 bear-bg-black/50 dark:bear-bg-black/70 bear-backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className={cn(
          'Bear-Spotlight__dialog',
          'bear-relative bear-w-full bear-max-w-[560px] bear-mx-4',
          'bear-bg-white dark:bear-bg-gray-900',
          'bear-rounded-xl bear-shadow-2xl',
          'bear-border bear-border-gray-200 dark:bear-border-gray-700',
          'bear-overflow-hidden',
          className,
        )}
        style={style}
        role="dialog"
        aria-label="Search"
      >
        {/* Search Input */}
        <div className="Bear-Spotlight__search bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-3 bear-border-b bear-border-gray-200 dark:bear-border-gray-700">
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="bear-text-gray-400 dark:bear-text-gray-500 bear-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'Bear-Spotlight__input',
              'bear-flex-1 bear-bg-transparent bear-outline-none bear-text-base',
              'bear-text-gray-900 dark:bear-text-white',
              'placeholder:bear-text-gray-400 dark:placeholder:bear-text-gray-500',
            )}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="bear-hidden sm:bear-inline-flex bear-items-center bear-px-1.5 bear-py-0.5 bear-rounded bear-text-[10px] bear-font-mono bear-text-gray-400 dark:bear-text-gray-500 bear-bg-gray-100 dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="Bear-Spotlight__results bear-max-h-[400px] bear-overflow-y-auto bear-py-2"
          role="listbox"
        >
          {filtered.length === 0 && (
            <div className="Bear-Spotlight__empty bear-px-4 bear-py-8 bear-text-center bear-text-gray-500 dark:bear-text-gray-400 bear-text-sm">
              {nothingFoundMessage}
            </div>
          )}
          {Array.from(groups.entries()).map(([group, items]) => (
            <div key={group} className="Bear-Spotlight__group">
              {group && (
                <div className="Bear-Spotlight__group-title bear-px-4 bear-py-1.5 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-gray-400 dark:bear-text-gray-500">
                  {group}
                </div>
              )}
              {items.map((action) => {
                flatIndex++;
                const isActive = flatIndex === activeIndex;
                const currentIdx = flatIndex;
                return (
                  <button
                    key={action.id}
                    className={cn(
                      'Bear-Spotlight__action',
                      'bear-w-full bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-2.5 bear-text-left bear-cursor-pointer',
                      'bear-transition-colors bear-duration-100',
                      isActive
                        ? 'bear-bg-gray-100 dark:bear-bg-gray-800'
                        : 'hover:bear-bg-gray-50 dark:hover:bear-bg-gray-800/50',
                      action.disabled && 'bear-opacity-50 bear-cursor-not-allowed',
                    )}
                    data-active={isActive}
                    onMouseEnter={() => setActiveIndex(currentIdx)}
                    onClick={() => {
                      if (!action.disabled) {
                        action.onTrigger();
                        setOpen(false);
                      }
                    }}
                    role="option"
                    aria-selected={isActive}
                    aria-disabled={action.disabled}
                  >
                    {action.icon && (
                      <span className="Bear-Spotlight__action-icon bear-text-gray-500 dark:bear-text-gray-400 bear-shrink-0">
                        {action.icon}
                      </span>
                    )}
                    <div className="Bear-Spotlight__action-body bear-flex-1 bear-min-w-0">
                      <div className="Bear-Spotlight__action-label bear-text-sm bear-font-medium bear-text-gray-900 dark:bear-text-white bear-truncate">
                        {highlightMatches ? highlightText(action.label, query) : action.label}
                      </div>
                      {action.description && (
                        <div className="Bear-Spotlight__action-desc bear-text-xs bear-text-gray-500 dark:bear-text-gray-400 bear-truncate">
                          {highlightMatches ? highlightText(action.description, query) : action.description}
                        </div>
                      )}
                    </div>
                    {action.rightSection && (
                      <span className="Bear-Spotlight__action-right bear-shrink-0">{action.rightSection}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="Bear-Spotlight__footer bear-border-t bear-border-gray-200 dark:bear-border-gray-700 bear-px-4 bear-py-2 bear-flex bear-items-center bear-gap-4 bear-text-[11px] bear-text-gray-400 dark:bear-text-gray-500">
          <span className="bear-flex bear-items-center bear-gap-1">
            <kbd className="bear-px-1 bear-rounded bear-bg-gray-100 dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700">↑↓</kbd>
            navigate
          </span>
          <span className="bear-flex bear-items-center bear-gap-1">
            <kbd className="bear-px-1 bear-rounded bear-bg-gray-100 dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700">↵</kbd>
            select
          </span>
          <span className="bear-flex bear-items-center bear-gap-1">
            <kbd className="bear-px-1 bear-rounded bear-bg-gray-100 dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
};
