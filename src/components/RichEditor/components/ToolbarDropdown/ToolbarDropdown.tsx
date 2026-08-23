import { useState, useRef } from 'react';
import type { RefObject } from 'react';
import { cn } from '@utils';
import { ChevronDownIcon } from '../../../Icon';
import { OverlayPortal } from '../../../OverlayPortal';
import { Tooltip } from '../../../Tooltip';
import {
  ANCHOR_DEFAULT_Z_INDEX,
  useClickOutsideMultiple,
  useFixedAnchorPosition,
} from '@hooks';
import { FOUR_HUNDRED, ONE_HUNDRED_FIFTY, TWELVE } from '@const';
import type { ToolbarDropdownProps, DropdownOption } from '../../RichEditor.types';

export const ToolbarDropdown = (props: ToolbarDropdownProps) => {
  const { options, value, onChange, title, disabled, icon } = props;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    minWidthPx: ONE_HUNDRED_FIFTY,
  });

  useClickOutsideMultiple(
    [triggerRef as RefObject<HTMLElement>, menuRef as RefObject<HTMLElement>],
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="Bear-RichEditor__dropdown relative">
      <Tooltip content={title} delay={FOUR_HUNDRED} position="top">
        <button
          ref={triggerRef}
          type="button"
          aria-label={title}
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
      </Tooltip>

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={style}
        zIndex={ANCHOR_DEFAULT_Z_INDEX}
        panelRef={menuRef}
        className="Bear-RichEditor__dropdown-menu min-w-[140px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg py-1"
      >
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
      </OverlayPortal>
    </div>
  );
};
