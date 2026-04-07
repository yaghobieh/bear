import { FC, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '@utils';
import { Portal } from '../Portal';
import type { MultiSelectProps } from './MultiSelect.types';

const MULTI_SELECT_PANEL_Z = 10000;

/**
 * MultiSelect - Select multiple options with tags
 * 
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Skills"
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Select options...',
  label,
  helperText,
  error,
  disabled = false,
  maxSelections,
  searchable = true,
  className,
  testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

  const isControlled = controlledValue !== undefined;
  const selectedValues = isControlled ? controlledValue : internalValue;

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) &&
      !selectedValues.includes(opt.value)
  );

  const showOptionsPanel = isOpen && !disabled && filteredOptions.length > 0;
  const showEmptyPanel = isOpen && !disabled && filteredOptions.length === 0 && Boolean(search);

  useEffect(() => {
    if (!showOptionsPanel && !showEmptyPanel) return;
    const updatePosition = () => {
      const rect = fieldRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPosition({
        top: rect.bottom + 4,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
        width: Math.max(rect.width, 160),
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [showOptionsPanel, showEmptyPanel]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setIsOpen(false);
      setSearch('');
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle option selection
  const handleSelect = (optValue: string) => {
    if (disabled) return;
    if (maxSelections && selectedValues.length >= maxSelections) return;

    const newValues = [...selectedValues, optValue];
    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
    setSearch('');
    inputRef.current?.focus();
  };

  // Handle option removal
  const handleRemove = (optValue: string) => {
    if (disabled) return;
    const newValues = selectedValues.filter((v) => v !== optValue);
    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && search === '' && selectedValues.length > 0) {
      handleRemove(selectedValues[selectedValues.length - 1]);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(filteredOptions[0].value);
    }
  };

  const selectedLabels = selectedValues.map(
    (v) => options.find((o) => o.value === v)?.label || v
  );

  return (
    <div className={cn('bear-w-full', className)} ref={containerRef} data-testid={testId}>
      {label && (
        <label className="bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-200 bear-mb-1.5">
          {label}
        </label>
      )}

      <div
        ref={fieldRef}
        className={cn(
          'bear-relative bear-flex bear-flex-wrap bear-items-center bear-gap-1.5 bear-min-h-[42px] bear-px-3 bear-py-2',
          'bear-rounded-lg bear-border bear-bg-white dark:bear-bg-gray-900',
          'bear-transition-colors bear-cursor-text',
          error
            ? 'bear-border-red-500 focus-within:bear-ring-2 focus-within:bear-ring-red-500/20'
            : 'bear-border-gray-300 dark:bear-border-gray-600 focus-within:bear-border-amber-500 focus-within:bear-ring-2 focus-within:bear-ring-amber-500/20',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-bg-gray-100 dark:bear-bg-gray-800'
        )}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        {selectedLabels.map((lbl, idx) => (
          <span
            key={selectedValues[idx]}
            className="bear-inline-flex bear-items-center bear-gap-1 bear-px-2 bear-py-0.5 bear-text-sm bear-rounded-md bear-bg-amber-100 dark:bear-bg-amber-900/30 bear-text-amber-800 dark:bear-text-amber-200"
          >
            {lbl}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(selectedValues[idx]);
                }}
                className="bear-ml-0.5 bear-text-amber-600 hover:bear-text-amber-800 dark:bear-text-amber-400 dark:hover:bear-text-amber-200"
              >
                ×
              </button>
            )}
          </span>
        ))}

        {searchable && !disabled && (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            disabled={disabled || (maxSelections !== undefined && selectedValues.length >= maxSelections)}
            className="bear-flex-1 bear-min-w-[80px] bear-bg-transparent bear-outline-none bear-text-sm bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-400"
          />
        )}

        <svg
          className={cn(
            'bear-w-4 bear-h-4 bear-text-gray-400 bear-transition-transform bear-ml-auto',
            isOpen && 'bear-rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {showOptionsPanel && (
        <Portal>
          <div
            ref={panelRef}
            className="bear-fixed bear-py-1 bear-bg-white dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-shadow-lg bear-max-h-60 bear-overflow-auto"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              zIndex: MULTI_SELECT_PANEL_Z,
            }}
          >
            {filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                disabled={opt.disabled}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'bear-w-full bear-px-3 bear-py-2 bear-text-left bear-text-sm',
                  'hover:bear-bg-amber-50 dark:hover:bear-bg-amber-900/20',
                  'bear-text-gray-900 dark:bear-text-white',
                  opt.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Portal>
      )}

      {showEmptyPanel && (
        <Portal>
          <div
            ref={panelRef}
            className="bear-fixed bear-py-3 bear-px-4 bear-bg-white dark:bear-bg-gray-800 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-shadow-lg bear-text-sm bear-text-gray-500"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              zIndex: MULTI_SELECT_PANEL_Z,
            }}
          >
            No options found
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

