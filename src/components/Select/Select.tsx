import { FC, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@utils';
import { useClickOutsideMultiple } from '@hooks';
import { ChevronDownIcon, CheckIcon } from '../Icon';
import { Portal } from '../Portal';
import type { SelectProps } from './Select.types';

const sizeClasses = {
  sm: 'bear-h-8 bear-text-sm bear-px-3',
  md: 'bear-h-10 bear-text-base bear-px-4',
  lg: 'bear-h-12 bear-text-lg bear-px-5',
};

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  size = 'md',
  fullWidth = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(error);

  const selectedOption = options.find((opt) => opt.value === value);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  useClickOutsideMultiple([selectRef, menuRef], closeDropdown, { enabled: isOpen });

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const rect = selectRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPosition({
        top: rect.bottom + 4,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
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

  return (
    <div
      ref={selectRef}
      className={cn('bear-relative bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')}
    >
      {label && (
        <label className="bear-text-sm bear-font-medium" style={{ color: 'var(--bear-text-secondary)' }}>
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'bear-flex bear-items-center bear-justify-between bear-w-full',
          'bear-rounded-lg bear-border bear-text-left bear-outline-none bear-transition-all bear-duration-200',
          'focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-[var(--bear-bg-primary)]',
          hasError
            ? 'bear-border-red-500 focus:bear-ring-red-500'
            : 'focus:bear-border-bear-500 focus:bear-ring-bear-500 dark:focus:bear-border-bear-500 dark:focus:bear-ring-bear-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          sizeClasses[size],
          className
        )}
        style={{
          backgroundColor: 'var(--bear-bg-primary)',
          borderColor: hasError ? undefined : 'var(--bear-border-default)',
          color: selectedOption ? 'var(--bear-text-primary)' : 'var(--bear-text-muted)',
        }}
      >
        <span>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDownIcon
          className={cn('bear-w-4 bear-h-4 bear-shrink-0 bear-transition-transform', isOpen && 'bear-rotate-180')}
          style={{ color: 'var(--bear-text-muted)' }}
        />
      </button>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            className="bear-fixed bear-rounded-lg bear-border bear-shadow-lg bear-overflow-hidden"
            style={{
              backgroundColor: 'var(--bear-bg-primary)',
              borderColor: 'var(--bear-border-default)',
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              zIndex: 10000,
            }}
          >
            <div className="bear-max-h-60 bear-overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    'bear-flex bear-items-center bear-justify-between bear-w-full bear-px-4 bear-py-2',
                    'bear-text-left bear-transition-colors',
                    option.disabled && 'bear-cursor-not-allowed',
                    option.value === value && 'bear-bg-bear-100 bear-text-bear-700 dark:bear-bg-bear-600/20 dark:bear-text-bear-300',
                    !option.disabled && option.value !== value && 'hover:bear-bg-[var(--bear-bg-tertiary)]'
                  )}
                  style={
                    option.disabled
                      ? { color: 'var(--bear-text-muted)' }
                      : option.value === value
                        ? undefined
                        : { color: 'var(--bear-text-secondary)' }
                  }
                >
                  {option.label}
                  {option.value === value && (
                    <CheckIcon className="bear-w-4 bear-h-4 bear-shrink-0 bear-text-bear-600 dark:bear-text-bear-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}

      {error && <p className="bear-text-sm bear-text-red-500">{error}</p>}
    </div>
  );
};

