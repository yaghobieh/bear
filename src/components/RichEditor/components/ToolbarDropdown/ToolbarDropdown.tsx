import { useState, useRef, useEffect } from 'react';
import { cn } from '@utils';
import { ChevronDownIcon } from '../../../Icon';
import { TWELVE } from '@const';
import type { ToolbarDropdownProps, DropdownOption } from '../../RichEditor.types';

export const ToolbarDropdown = (props: ToolbarDropdownProps) => {
  const { options, value, onChange, title, disabled, icon } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="Bear-RichEditor__dropdown relative">
      <button
        type="button"
        title={title}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'Bear-RichEditor__dropdown-trigger p-1.5 rounded transition-colors',
          'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700',
          'flex items-center gap-1 min-w-[80px]',
          disabled && 'Bear-RichEditor__dropdown-trigger--disabled opacity-50 cursor-not-allowed'
        )}
      >
        {icon && <span className="Bear-RichEditor__dropdown-icon">{icon}</span>}
        <span className="Bear-RichEditor__dropdown-label text-xs truncate">
          {selectedOption?.label || 'Normal'}
        </span>
        <ChevronDownIcon size={TWELVE} />
      </button>

      {isOpen && (
        <div className="Bear-RichEditor__dropdown-menu absolute top-full left-0 mt-1 z-50 min-w-[140px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg py-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={cn(
                'Bear-RichEditor__dropdown-option',
                'w-full px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-gray-100 dark:hover:bg-zinc-700',
                option.value === value
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              {option.preview || option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolbarDropdown;
