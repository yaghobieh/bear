import { FC, useState, useRef, useEffect } from 'react';
import { cn } from '@utils';
import { ChevronDownIcon, CheckIcon } from '../Icon';
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
  const selectRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(error);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={cn('bear-relative bear-flex bear-flex-col bear-gap-1.5', fullWidth && 'bear-w-full')}
    >
      {label && (
        <label className="bear-text-sm bear-font-medium bear-text-gray-300">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'bear-flex bear-items-center bear-justify-between bear-w-full',
          'bear-rounded-lg bear-border bear-bg-gray-800 bear-text-left',
          'bear-outline-none bear-transition-all bear-duration-200',
          'focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-gray-900',
          hasError
            ? 'bear-border-red-500 focus:bear-ring-red-500'
            : 'bear-border-gray-600 focus:bear-border-bear-500 focus:bear-ring-bear-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          sizeClasses[size],
          className
        )}
      >
        <span className={selectedOption ? 'bear-text-white' : 'bear-text-gray-500'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDownIcon
          className={cn(
            'bear-w-4 bear-h-4 bear-text-gray-400 bear-transition-transform',
            isOpen && 'bear-rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'bear-absolute bear-z-50 bear-w-full bear-mt-1',
            'bear-rounded-lg bear-border bear-border-gray-600 bear-bg-gray-800',
            'bear-shadow-lg bear-overflow-hidden',
            'bear-top-full'
          )}
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
                  option.disabled
                    ? 'bear-text-gray-500 bear-cursor-not-allowed'
                    : 'bear-text-gray-300 hover:bear-bg-gray-700 hover:bear-text-white',
                  option.value === value && 'bear-bg-bear-600/20 bear-text-bear-400'
                )}
              >
                {option.label}
                {option.value === value && (
                  <CheckIcon className="bear-w-4 bear-h-4 bear-text-bear-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="bear-text-sm bear-text-red-500">{error}</p>}
    </div>
  );
};

