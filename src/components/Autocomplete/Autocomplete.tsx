import type { KeyboardEvent, ChangeEvent } from 'react';
import {
  BACKDROP_DEFAULT_Z_INDEX,
  BOOLEAN_FALSE,
  EMPTY_STRING,
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_ENTER,
  KEY_ESCAPE,
  PLACEHOLDER_START_TYPING,
} from '@const';
import { cn } from '@utils';
import { Portal } from '../Portal';
import type { AutocompleteProps } from './Autocomplete.types';
import { useAutocomplete } from './hooks';

const KEY_HANDLERS: Record<string, 'next' | 'previous' | 'confirm' | 'close'> = {
  [KEY_ARROW_DOWN]: 'next',
  [KEY_ARROW_UP]: 'previous',
  [KEY_ENTER]: 'confirm',
  [KEY_ESCAPE]: 'close',
};

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    options,
    value = EMPTY_STRING,
    onChange,
    onSelect,
    placeholder = PLACEHOLDER_START_TYPING,
    label,
    helperText,
    error,
    disabled = BOOLEAN_FALSE,
    freeSolo = BOOLEAN_FALSE,
    loading = BOOLEAN_FALSE,
    filterOptions,
    className,
    testId,
  } = props;

  const {
    isOpen,
    setIsOpen,
    highlightedIndex,
    containerRef,
    inputWrapRef,
    panelRef,
    inputRef,
    listRef,
    filteredOptions,
    showListPanel,
    showEmptyPanel,
    overlayStyle,
    handleSelect,
    highlightNext,
    highlightPrevious,
    confirmHighlight,
  } = useAutocomplete({
    options,
    value,
    onChange,
    onSelect,
    disabled,
    freeSolo,
    loading,
    filterOptions,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === KEY_ARROW_DOWN || e.key === KEY_ARROW_UP) {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    const action = KEY_HANDLERS[e.key];
    if (!action) {
      return;
    }
    e.preventDefault();
    if (action === 'next') {
      highlightNext();
      return;
    }
    if (action === 'previous') {
      highlightPrevious();
      return;
    }
    if (action === 'confirm') {
      confirmHighlight();
      return;
    }
    setIsOpen(BOOLEAN_FALSE);
  };

  return (
    <div className={cn('Bear-Autocomplete bear-w-full bear-relative', className)} ref={containerRef} data-testid={testId}>
      {label && (
        <label className="Bear-Autocomplete__label bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200 bear-mb-1.5">
          {label}
        </label>
      )}

      <div className="Bear-Autocomplete__field bear-relative" ref={inputWrapRef}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'bear-w-full bear-px-4 bear-py-2.5 bear-pr-10 bear-rounded-lg bear-border',
            'bear-bg-[var(--bear-bg-primary)]',
            'bear-text-sm bear-text-[var(--bear-text-primary)]',
            'placeholder:bear-text-[var(--bear-text-muted)]',
            'bear-transition-colors bear-outline-none',
            error
              ? 'bear-border-red-500 focus:bear-ring-2 focus:bear-ring-red-500/20'
              : 'bear-border-[var(--bear-border-default)] focus:bear-border-amber-500 focus:bear-ring-2 focus:bear-ring-amber-500/20',
            disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-bg-[var(--bear-bg-secondary)]'
          )}
        />
      </div>

      {showListPanel && (
        <Portal>
          <div
            ref={panelRef}
            className="Bear-Autocomplete__panel bear-fixed bear-rounded-lg bear-border bear-border-[var(--bear-border-default)] bear-shadow-lg bear-bg-[var(--bear-bg-primary)]"
            style={{
              ...overlayStyle,
              zIndex: BACKDROP_DEFAULT_Z_INDEX,
            }}
          >
            <div ref={listRef} className="bear-max-h-60 bear-overflow-auto bear-py-1">
              {filteredOptions.map((opt, idx) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    'bear-w-full bear-px-4 bear-py-2 bear-text-left bear-text-sm bear-transition-colors',
                    'bear-text-[var(--bear-text-primary)]',
                    idx === highlightedIndex
                      ? 'bear-bg-[var(--bear-bg-tertiary)]'
                      : 'hover:bear-bg-[var(--bear-bg-secondary)]',
                    opt.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
                  )}
                >
                  <div className="bear-font-medium">{opt.label}</div>
                  {opt.description && (
                    <div className="bear-text-xs bear-text-[var(--bear-text-muted)] bear-mt-0.5">
                      {opt.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}

      {showEmptyPanel && (
        <Portal>
          <div
            ref={panelRef}
            className="Bear-Autocomplete__empty bear-fixed bear-py-3 bear-px-4 bear-bg-white dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-shadow-lg bear-text-sm bear-text-gray-500"
            style={{
              ...overlayStyle,
              zIndex: BACKDROP_DEFAULT_Z_INDEX,
            }}
          >
            {freeSolo ? 'Press Enter to use this value' : 'No results found'}
          </div>
        </Portal>
      )}

      {(helperText || error) && (
        <p className={cn(
          'bear-mt-1.5 bear-text-xs',
          error ? 'bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
