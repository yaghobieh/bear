import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { CascaderProps, CascaderOption, CascaderPanelProps } from './Cascader.types';
import {
  CASCADER_DEFAULT_TRANSLATIONS,
  CASCADER_SIZE_CLASSES,
  CASCADER_VARIANT_CLASSES,
  CASCADER_DROPDOWN_Z_INDEX,
  CASCADER_PATH_SEPARATOR,
} from './Cascader.const';

/**
 * CascaderPanel - Renders a single level of options
 */
const CascaderPanel: FC<CascaderPanelProps> = ({
  options,
  selectedPath,
  expandedPath,
  onSelect,
  onExpand,
  expandTrigger,
  level,
}) => {
  const handleClick = (option: CascaderOption) => {
    onSelect(option, level);
    if (option.children?.length) {
      onExpand(option, level);
    }
  };

  const handleMouseEnter = (option: CascaderOption) => {
    if (expandTrigger === 'hover' && option.children?.length) {
      onExpand(option, level);
    }
  };

  return (
    <div className="Bear-Cascader__panel bear-min-w-[180px] bear-max-h-[280px] bear-overflow-y-auto bear-border-r bear-border-zinc-200 dark:bear-border-zinc-700 last:bear-border-r-0">
      {options.map((option) => {
        const isSelected = selectedPath[level] === option.value;
        const isExpanded = expandedPath[level] === option.value;
        const hasChildren = option.children && option.children.length > 0;

        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => handleClick(option)}
            onMouseEnter={() => handleMouseEnter(option)}
            className={cn(
              'Bear-Cascader__option bear-w-full bear-flex bear-items-center bear-justify-between bear-px-3 bear-py-2 bear-text-sm bear-text-left bear-transition-colors',
              isSelected && 'Bear-Cascader__option--selected bear-bg-pink-500/20 bear-text-pink-600 dark:bear-text-pink-400',
              isExpanded && !isSelected && 'Bear-Cascader__option--expanded bear-bg-gray-100 dark:bear-bg-zinc-700',
              !isSelected && !isExpanded && 'bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700',
              option.disabled && 'Bear-Cascader__option--disabled bear-opacity-50 bear-cursor-not-allowed'
            )}
          >
            <span className="bear-flex bear-items-center bear-gap-2">
              {option.icon && <span className="Bear-Cascader__option-icon">{option.icon}</span>}
              <span className="Bear-Cascader__option-label">{option.label}</span>
            </span>
            {hasChildren && (
              <svg className="Bear-Cascader__arrow bear-w-4 bear-h-4 bear-text-gray-500 dark:bear-text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};

/**
 * Cascader - Hierarchical selection component
 *
 * @example
 * ```tsx
 * <Cascader
 *   options={[
 *     { value: 'electronics', label: 'Electronics', children: [...] }
 *   ]}
 *   value={['electronics', 'phones']}
 *   onChange={(value, options) => console.log(value, options)}
 * />
 * ```
 */
export const Cascader: FC<CascaderProps> = ({
  options,
  value = [],
  onChange,
  placeholder,
  label,
  helperText,
  error,
  disabled = false,
  loading = false,
  clearable = true,
  size = 'md',
  variant = 'default',
  expandTrigger = 'click',
  showFullPath = true,
  pathSeparator = CASCADER_PATH_SEPARATOR,
  changeOnSelect = false,
  className,
  testId,
  translations,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedPath, setExpandedPath] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const t = useMemo(() => ({
    ...CASCADER_DEFAULT_TRANSLATIONS,
    ...translations,
  }), [translations]);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      setDropdownPosition({
        top: rect.bottom + scrollTop + 8,
        left: rect.left + scrollLeft,
      });
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if ((target as Element).closest?.('[data-bear-cascader-dropdown]')) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize expanded path from value
  useEffect(() => {
    if (value.length > 0) {
      setExpandedPath(value.slice(0, -1));
    }
  }, [value]);

  // Find option by value in hierarchy
  const findOption = useCallback((opts: CascaderOption[], val: string): CascaderOption | undefined => {
    for (const opt of opts) {
      if (opt.value === val) return opt;
      if (opt.children) {
        const found = findOption(opt.children, val);
        if (found) return found;
      }
    }
    return undefined;
  }, []);

  // Get display label
  const displayLabel = useMemo(() => {
    if (value.length === 0) return '';
    const selectedOptions = value.map((v, i) => {
      let opts = options;
      for (let j = 0; j < i; j++) {
        const opt = opts.find((o) => o.value === value[j]);
        if (opt?.children) opts = opt.children;
      }
      return opts.find((o) => o.value === v);
    }).filter(Boolean) as CascaderOption[];

    if (showFullPath) {
      return selectedOptions.map((o) => o.label).join(pathSeparator);
    }
    return selectedOptions[selectedOptions.length - 1]?.label || '';
  }, [value, options, showFullPath, pathSeparator]);

  // Get options at each expanded level
  const panelOptions = useMemo(() => {
    const panels: CascaderOption[][] = [options];
    let currentOptions = options;

    for (const val of expandedPath) {
      const opt = currentOptions.find((o) => o.value === val);
      if (opt?.children) {
        panels.push(opt.children);
        currentOptions = opt.children;
      } else {
        break;
      }
    }

    return panels;
  }, [options, expandedPath]);

  const handleSelect = useCallback((option: CascaderOption, level: number) => {
    const newPath = [...expandedPath.slice(0, level), option.value];
    
    if (!option.children?.length || changeOnSelect) {
      // Find all selected options
      const selectedOptions: CascaderOption[] = [];
      let opts = options;
      for (const v of newPath) {
        const opt = opts.find((o) => o.value === v);
        if (opt) {
          selectedOptions.push(opt);
          if (opt.children) opts = opt.children;
        }
      }
      onChange?.(newPath, selectedOptions);
      
      if (!option.children?.length) {
        setIsOpen(false);
      }
    }
  }, [expandedPath, options, onChange, changeOnSelect]);

  const handleExpand = useCallback((option: CascaderOption, level: number) => {
    setExpandedPath((prev) => [...prev.slice(0, level), option.value]);
  }, []);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([], []);
    setExpandedPath([]);
  }, [onChange]);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-Cascader bear-relative', className)}
      data-testid={testId}
    >
      {label && (
        <label className="Bear-Cascader__label bear-block bear-text-sm bear-font-medium bear-text-zinc-700 dark:bear-text-zinc-300 bear-mb-1.5">
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'Bear-Cascader__trigger bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-text-left bear-transition-colors',
          CASCADER_SIZE_CLASSES[size],
          CASCADER_VARIANT_CLASSES[variant],
          error ? 'bear-border-red-500' : 'focus:bear-border-pink-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          displayLabel ? 'bear-text-gray-900 dark:bear-text-white' : 'bear-text-gray-500 dark:bear-text-zinc-500'
        )}
      >
        <span className="Bear-Cascader__value bear-truncate bear-flex-1">
          {loading ? t.loading : displayLabel || placeholder || t.placeholder}
        </span>
        <span className="Bear-Cascader__icons bear-flex bear-items-center bear-gap-1">
          {clearable && value.length > 0 && !disabled && (
            <span
              onClick={handleClear}
              className="Bear-Cascader__clear bear-p-0.5 bear-rounded hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700 bear-cursor-pointer"
            >
              <svg className="bear-w-4 bear-h-4 bear-text-gray-500 dark:bear-text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          )}
          {icon ?? (
            <svg
              className={cn(
                'Bear-Cascader__chevron bear-w-4 bear-h-4 bear-text-gray-500 dark:bear-text-zinc-400 bear-transition-transform',
                isOpen && 'bear-rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>

      {error && <p className="Bear-Cascader__error bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="Bear-Cascader__helper bear-mt-1 bear-text-xs bear-text-zinc-500 dark:bear-text-zinc-400">{helperText}</p>}

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-bear-cascader-dropdown
          className="Bear-Cascader__dropdown bear-fixed bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-flex bear-overflow-hidden"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: CASCADER_DROPDOWN_Z_INDEX }}
        >
          {panelOptions.map((opts, level) => (
            <CascaderPanel
              key={level}
              options={opts}
              selectedPath={value}
              expandedPath={expandedPath}
              onSelect={handleSelect}
              onExpand={handleExpand}
              expandTrigger={expandTrigger}
              level={level}
            />
          ))}
          {panelOptions.every((p) => p.length === 0) && (
            <div className="Bear-Cascader__empty bear-px-4 bear-py-3 bear-text-sm bear-text-gray-500 dark:bear-text-zinc-500">
              {t.noOptions}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
