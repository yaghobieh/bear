import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { CascaderProps, CascaderOption } from './Cascader.types';
import {
  CASCADER_DEFAULT_TRANSLATIONS,
  CASCADER_SIZE_CLASSES,
  CASCADER_VARIANT_CLASSES,
  CASCADER_DROPDOWN_Z_INDEX,
  CASCADER_PATH_SEPARATOR,
} from './Cascader.const';
import { CascaderPanel } from './components/CascaderPanel';

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

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const estW = Math.min(560, window.innerWidth - 16);
      let left = Math.max(8, Math.min(rect.left, window.innerWidth - estW - 8));
      setDropdownPosition({
        top: rect.bottom + 8,
        left,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
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
          className="Bear-Cascader__dropdown bear-fixed bear-max-w-[calc(100vw-16px)] bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-flex bear-flex-col sm:bear-flex-row bear-overflow-hidden"
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
