import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import type { NavigableSelectProps, NavigableSelectOption } from './NavigableSelect.types';
import {
  DEFAULT_PLACEHOLDER,
  DEFAULT_EMPTY_TEXT,
  DEFAULT_MAX_VISIBLE,
  OPTION_HEIGHT,
  TRIGGER_SIZE_CLASSES,
  OPTION_SIZE_CLASSES,
  TAG_SIZE_CLASSES,
  DROPDOWN_Z_INDEX,
  SCROLL_BLOCK,
  ICON_SIZE,
} from './NavigableSelect.const';

/**
 * NavigableSelect - Keyboard-navigable select with single and multi-select.
 * Arrow up/down navigation, Enter to select, type-ahead search, and theming via BearProvider.
 */
export const NavigableSelect: FC<NavigableSelectProps> = (props) => {
  const {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    multiple = false,
    searchable = true,
    placeholder = DEFAULT_PLACEHOLDER,
    label,
    helperText,
    error,
    disabled = false,
    size = 'md',
    fullWidth = false,
    maxVisible = DEFAULT_MAX_VISIBLE,
    maxSelections,
    emptyText = DEFAULT_EMPTY_TEXT,
    className,
    style,
    testId,
  } = props;

  const isControlled = controlledValue !== undefined;
  const normalizeValue = (v?: string | string[]): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [internalValue, setInternalValue] = useState<string[]>(normalizeValue(defaultValue));
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [search, setSearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedValues = isControlled ? normalizeValue(controlledValue) : internalValue;

  // Group and filter options
  const filtered = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)
    );
  }, [options, search]);

  // Group by group name
  const groups = useMemo(() => {
    const map = new Map<string, NavigableSelectOption[]>();
    filtered.forEach((o) => {
      const g = o.group || '';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(o);
    });
    return map;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatOptions = useMemo(() => filtered.filter((o) => !o.disabled), [filtered]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll active option into view
  useEffect(() => {
    if (!listRef.current || activeIndex < 0) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: SCROLL_BLOCK });
  }, [activeIndex]);

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const toggleOption = useCallback(
    (value: string) => {
      let next: string[];

      if (multiple) {
        if (selectedValues.includes(value)) {
          next = selectedValues.filter((v) => v !== value);
        } else {
          if (maxSelections && selectedValues.length >= maxSelections) return;
          next = [...selectedValues, value];
        }
      } else {
        next = [value];
        close();
      }

      if (!isControlled) setInternalValue(next);
      onChange?.(multiple ? next : next[0] ?? '');
    },
    [selectedValues, multiple, isControlled, maxSelections, onChange, close]
  );

  const removeTag = useCallback(
    (value: string) => {
      const next = selectedValues.filter((v) => v !== value);
      if (!isControlled) setInternalValue(next);
      onChange?.(multiple ? next : next[0] ?? '');
    },
    [selectedValues, multiple, isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatOptions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && flatOptions[activeIndex]) {
            toggleOption(flatOptions[activeIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Backspace':
          if (search === '' && multiple && selectedValues.length > 0) {
            removeTag(selectedValues[selectedValues.length - 1]);
          }
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(flatOptions.length - 1);
          break;
        default:
          break;
      }
    },
    [isOpen, activeIndex, flatOptions, toggleOption, close, open, search, multiple, selectedValues, removeTag]
  );

  const isSelected = useCallback((v: string) => selectedValues.includes(v), [selectedValues]);

  const selectedLabels = selectedValues
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as NavigableSelectOption[];

  const hasError = Boolean(error);
  const triggerCls = TRIGGER_SIZE_CLASSES[size];
  const optionCls = OPTION_SIZE_CLASSES[size];
  const tagCls = TAG_SIZE_CLASSES[size];
  const iconCls = ICON_SIZE[size];
  const maxH = maxVisible * OPTION_HEIGHT[size];

  let flatIdx = -1;

  return (
    <div
      ref={containerRef}
      className={cn(
        'Bear-NavigableSelect',
        'bear-relative bear-flex bear-flex-col bear-gap-1.5',
        fullWidth && 'bear-w-full',
        className,
      )}
      style={style}
      data-testid={testId}
    >
      {/* Label */}
      {label && (
        <label className="Bear-NavigableSelect__label bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-300">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        className={cn(
          'Bear-NavigableSelect__trigger',
          'bear-flex bear-items-center bear-justify-between bear-w-full',
          'bear-rounded-lg bear-border bear-text-left bear-outline-none',
          'bear-transition-all bear-duration-200',
          'bear-bg-white dark:bear-bg-gray-900',
          'bear-text-gray-900 dark:bear-text-white',
          hasError
            ? 'bear-border-red-500 focus:bear-ring-2 focus:bear-ring-red-500/20'
            : 'bear-border-gray-300 dark:bear-border-gray-600 focus:bear-border-[var(--bear-primary-500)] focus:bear-ring-2 focus:bear-ring-[var(--bear-primary-500)]/20',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          triggerCls,
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="Bear-NavigableSelect__value bear-flex bear-items-center bear-gap-1.5 bear-flex-wrap bear-flex-1 bear-min-w-0 bear-overflow-hidden">
          {/* Multi-select tags */}
          {multiple && selectedLabels.length > 0 && selectedLabels.map((opt) => (
            <span
              key={opt.value}
              className={cn(
                'Bear-NavigableSelect__tag',
                'bear-inline-flex bear-items-center bear-gap-1 bear-rounded-md',
                'bear-bg-[var(--bear-primary-100,#fce7f3)] dark:bear-bg-[var(--bear-primary-900,#831843)]/30',
                'bear-text-[var(--bear-primary-700,#be185d)] dark:bear-text-[var(--bear-primary-300,#f9a8d4)]',
                tagCls,
              )}
            >
              {opt.label}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeTag(opt.value); }}
                  className="bear-ml-0.5 hover:bear-opacity-70"
                  aria-label={`Remove ${opt.label}`}
                >
                  ×
                </button>
              )}
            </span>
          ))}

          {/* Single select display */}
          {!multiple && selectedLabels.length > 0 && (
            <span className="bear-truncate">
              {selectedLabels[0].icon && <span className="bear-mr-1.5">{selectedLabels[0].icon}</span>}
              {selectedLabels[0].label}
            </span>
          )}

          {/* Placeholder */}
          {selectedLabels.length === 0 && (
            <span className="bear-text-gray-400 dark:bear-text-gray-500">{placeholder}</span>
          )}
        </span>

        {/* Chevron */}
        <svg
          className={cn(
            iconCls,
            'bear-text-gray-400 dark:bear-text-gray-500 bear-transition-transform bear-shrink-0 bear-ml-2',
            isOpen && 'bear-rotate-180',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'Bear-NavigableSelect__dropdown',
            'bear-absolute bear-top-full bear-left-0 bear-w-full bear-mt-1',
            'bear-bg-white dark:bear-bg-gray-900',
            'bear-border bear-border-gray-200 dark:bear-border-gray-700',
            'bear-rounded-lg bear-shadow-lg bear-overflow-hidden',
          )}
          style={{ zIndex: DROPDOWN_Z_INDEX }}
        >
          {/* Search */}
          {searchable && (
            <div className="Bear-NavigableSelect__search bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-border-b bear-border-gray-200 dark:bear-border-gray-700">
              <svg
                className="bear-w-4 bear-h-4 bear-text-gray-400 dark:bear-text-gray-500 bear-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Type to search..."
                className={cn(
                  'Bear-NavigableSelect__input',
                  'bear-flex-1 bear-bg-transparent bear-outline-none bear-text-sm',
                  'bear-text-gray-900 dark:bear-text-white',
                  'placeholder:bear-text-gray-400 dark:placeholder:bear-text-gray-500',
                )}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}

          {/* Options list */}
          <div
            ref={listRef}
            className="Bear-NavigableSelect__list bear-overflow-y-auto bear-py-1"
            style={{ maxHeight: maxH }}
            role="listbox"
            aria-multiselectable={multiple}
          >
            {filtered.length === 0 && (
              <div className="Bear-NavigableSelect__empty bear-px-3 bear-py-4 bear-text-center bear-text-sm bear-text-gray-500 dark:bear-text-gray-400">
                {emptyText}
              </div>
            )}

            {Array.from(groups.entries()).map(([group, groupOptions]) => (
              <div key={group} className="Bear-NavigableSelect__group">
                {group && (
                  <div className="Bear-NavigableSelect__group-title bear-px-3 bear-py-1 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-gray-400 dark:bear-text-gray-500">
                    {group}
                  </div>
                )}
                {groupOptions.map((option) => {
                  const isDisabled = option.disabled;
                  const isFocusable = !isDisabled;
                  if (isFocusable) flatIdx++;
                  const isActive = flatIdx === activeIndex;
                  const selected = isSelected(option.value);
                  const currentFlatIdx = flatIdx;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={isDisabled}
                      className={cn(
                        'Bear-NavigableSelect__option',
                        'bear-w-full bear-flex bear-items-center bear-gap-2.5 bear-text-left bear-cursor-pointer',
                        'bear-transition-colors bear-duration-100',
                        optionCls,
                        isActive && 'bear-bg-gray-100 dark:bear-bg-gray-800',
                        selected && !isActive && 'bear-bg-[var(--bear-primary-50,#fdf2f8)] dark:bear-bg-[var(--bear-primary-950,#500724)]/20',
                        isDisabled && 'bear-opacity-40 bear-cursor-not-allowed',
                      )}
                      data-active={isActive}
                      onMouseEnter={() => { if (isFocusable) setActiveIndex(currentFlatIdx); }}
                      onClick={() => { if (!isDisabled) toggleOption(option.value); }}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={isDisabled}
                    >
                      {/* Checkbox for multi-select */}
                      {multiple && (
                        <span
                          className={cn(
                            'Bear-NavigableSelect__checkbox',
                            'bear-flex bear-items-center bear-justify-center bear-w-4 bear-h-4 bear-rounded bear-border bear-shrink-0',
                            'bear-transition-colors',
                            selected
                              ? 'bear-bg-[var(--bear-primary-500)] bear-border-[var(--bear-primary-500)] bear-text-white'
                              : 'bear-border-gray-300 dark:bear-border-gray-600',
                          )}
                        >
                          {selected && (
                            <svg className="bear-w-3 bear-h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      )}

                      {/* Icon */}
                      {option.icon && (
                        <span className="Bear-NavigableSelect__option-icon bear-shrink-0 bear-text-gray-500 dark:bear-text-gray-400">
                          {option.icon}
                        </span>
                      )}

                      {/* Label + description */}
                      <div className="Bear-NavigableSelect__option-body bear-flex-1 bear-min-w-0">
                        <div className={cn(
                          'Bear-NavigableSelect__option-label bear-truncate',
                          selected
                            ? 'bear-text-[var(--bear-primary-700,#be185d)] dark:bear-text-[var(--bear-primary-300,#f9a8d4)] bear-font-medium'
                            : 'bear-text-gray-900 dark:bear-text-white',
                        )}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="Bear-NavigableSelect__option-desc bear-text-xs bear-text-gray-500 dark:bear-text-gray-400 bear-truncate">
                            {option.description}
                          </div>
                        )}
                      </div>

                      {/* Single select checkmark */}
                      {!multiple && selected && (
                        <svg
                          className={cn(iconCls, 'bear-text-[var(--bear-primary-500)] bear-shrink-0')}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="Bear-NavigableSelect__footer bear-flex bear-items-center bear-gap-3 bear-px-3 bear-py-1.5 bear-border-t bear-border-gray-200 dark:bear-border-gray-700 bear-text-[11px] bear-text-gray-400 dark:bear-text-gray-500">
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
      )}

      {/* Helper / Error */}
      {(helperText || error) && (
        <p className={cn(
          'Bear-NavigableSelect__helper bear-text-xs',
          error ? 'bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400',
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
