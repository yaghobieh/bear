import { FC, useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { cn } from '../../utils/cn';
import type { AutocompleteOption, AutocompleteProps } from './Autocomplete.types';

const defaultFilter = (options: AutocompleteOption[], inputValue: string) => {
  const lower = inputValue.toLowerCase();
  return options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(lower) ||
      opt.value.toLowerCase().includes(lower) ||
      opt.description?.toLowerCase().includes(lower)
  );
};

/**
 * Autocomplete - Text input with suggestions
 * 
 * @example
 * ```tsx
 * <Autocomplete
 *   label="Country"
 *   options={countries}
 *   value={country}
 *   onChange={setCountry}
 *   onSelect={(opt) => console.log('Selected:', opt)}
 * />
 * ```
 */
export const Autocomplete: FC<AutocompleteProps> = ({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Start typing...',
  label,
  helperText,
  error,
  disabled = false,
  freeSolo = false,
  loading = false,
  filterOptions = defaultFilter,
  className,
  testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = filterOptions(options, value);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [value]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    setIsOpen(true);
  };

  const handleSelect = (option: AutocompleteOption) => {
    onChange?.(option.label);
    onSelect?.(option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (freeSolo && value) {
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={cn('bear-w-full bear-relative', className)} ref={containerRef} data-testid={testId}>
      {label && (
        <label className="bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200 bear-mb-1.5">
          {label}
        </label>
      )}

      <div className="bear-relative">
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
            'bear-bg-white dark:bear-bg-gray-900',
            'bear-text-sm bear-text-gray-900 dark:bear-text-white',
            'placeholder:bear-text-gray-400',
            'bear-transition-colors bear-outline-none',
            error
              ? 'bear-border-red-500 focus:bear-ring-2 focus:bear-ring-red-500/20'
              : 'bear-border-gray-300 dark:bear-border-gray-600 focus:bear-border-amber-500 focus:bear-ring-2 focus:bear-ring-amber-500/20',
            disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-bg-gray-100 dark:bear-bg-gray-800'
          )}
        />

        <div className="bear-absolute bear-right-3 bear-top-1/2 bear-transform bear--translate-y-1/2">
          {loading ? (
            <svg className="bear-animate-spin bear-w-4 bear-h-4 bear-text-gray-400" viewBox="0 0 24 24" fill="none">
              <circle className="bear-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="bear-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="bear-w-4 bear-h-4 bear-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {isOpen && !disabled && filteredOptions.length > 0 && (
        <div
          ref={listRef}
          className="bear-absolute bear-z-50 bear-w-full bear-mt-1 bear-py-1 bear-bg-white dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-shadow-lg bear-max-h-60 bear-overflow-auto"
        >
          {filteredOptions.map((opt, idx) => (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => handleSelect(opt)}
              className={cn(
                'bear-w-full bear-px-4 bear-py-2 bear-text-left bear-text-sm bear-transition-colors',
                'bear-text-gray-900 dark:bear-text-white',
                idx === highlightedIndex
                  ? 'bear-bg-amber-50 dark:bear-bg-amber-900/20'
                  : 'hover:bear-bg-gray-50 dark:hover:bear-bg-gray-700',
                opt.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
              )}
            >
              <div className="bear-font-medium">{opt.label}</div>
              {opt.description && (
                <div className="bear-text-xs bear-text-gray-500 dark:bear-text-gray-400 bear-mt-0.5">
                  {opt.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && !disabled && filteredOptions.length === 0 && value && !loading && (
        <div className="bear-absolute bear-z-50 bear-w-full bear-mt-1 bear-py-3 bear-px-4 bear-bg-white dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-shadow-lg bear-text-sm bear-text-gray-500">
          {freeSolo ? 'Press Enter to use this value' : 'No results found'}
        </div>
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

