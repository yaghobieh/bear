import { FC, useState, useRef, useCallback, useEffect, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '../../utils/cn';
import type { DropdownProps, DropdownItem } from './Dropdown.types';

const SIZE_CLASSES = {
  xs: 'bear-text-xs bear-py-1 bear-px-2',
  sm: 'bear-text-sm bear-py-1.5 bear-px-3',
  md: 'bear-text-sm bear-py-2 bear-px-3',
  lg: 'bear-text-base bear-py-2.5 bear-px-4',
  xl: 'bear-text-lg bear-py-3 bear-px-5',
} as const;

const PLACEMENT_CLASSES = {
  'bottom-start': 'bear-top-full bear-left-0 bear-mt-1',
  'bottom-end': 'bear-top-full bear-right-0 bear-mt-1',
  'bottom': 'bear-top-full bear-left-1/2 -bear-translate-x-1/2 bear-mt-1',
  'top-start': 'bear-bottom-full bear-left-0 bear-mb-1',
  'top-end': 'bear-bottom-full bear-right-0 bear-mb-1',
  'top': 'bear-bottom-full bear-left-1/2 -bear-translate-x-1/2 bear-mb-1',
  'left': 'bear-right-full bear-top-0 bear-mr-1',
  'right': 'bear-left-full bear-top-0 bear-ml-1',
} as const;

/**
 * Dropdown - Contextual menu that appears on trigger click
 * 
 * @example
 * ```tsx
 * <Dropdown
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { key: 'edit', label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
 *     { key: 'divider-1', divider: true },
 *     { key: 'delete', label: 'Delete', danger: true, onClick: handleDelete },
 *   ]}
 * />
 * ```
 */
export const Dropdown: FC<DropdownProps> = ({
  trigger,
  items,
  open: controlledOpen,
  defaultOpen = false,
  placement = 'bottom-start',
  offset = 4,
  matchWidth = false,
  minWidth = 150,
  maxHeight = 300,
  size = 'md',
  closeOnSelect = true,
  closeOnClickOutside = true,
  disabled = false,
  onOpenChange,
  className,
  testId,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  }, [isControlled, onOpenChange]);

  const toggle = useCallback(() => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  }, [disabled, isOpen, setOpen]);

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, [setOpen]);

  // Handle item click
  const handleItemClick = useCallback((item: DropdownItem) => {
    if (item.disabled || item.divider || item.header) return;
    
    item.onClick?.();
    
    if (closeOnSelect && !item.items) {
      close();
    }
  }, [closeOnSelect, close]);

  // Click outside handler
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, close]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const selectableItems = items.filter(item => !item.disabled && !item.divider && !item.header);

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            return next >= selectableItems.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1;
            return next < 0 ? selectableItems.length - 1 : next;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < selectableItems.length) {
            handleItemClick(selectableItems[focusedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items, focusedIndex, close, handleItemClick]);

  // Reset focus when closed
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const renderItem = (item: DropdownItem, index: number) => {
    if (item.divider) {
      return (
        <div
          key={item.key}
          className="bear-my-1 bear-mx-2 bear-h-px bear-bg-gray-200 dark:bear-bg-gray-700"
          role="separator"
        />
      );
    }

    if (item.header) {
      return (
        <div
          key={item.key}
          className="bear-px-3 bear-py-1.5 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-gray-500 dark:bear-text-gray-400"
        >
          {item.label}
        </div>
      );
    }

    const selectableIndex = items
      .slice(0, index)
      .filter(i => !i.disabled && !i.divider && !i.header).length;

    const isFocused = focusedIndex === selectableIndex;

    return (
      <button
        key={item.key}
        type="button"
        role="menuitem"
        disabled={item.disabled}
        onClick={() => handleItemClick(item)}
        onMouseEnter={() => setFocusedIndex(selectableIndex)}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-gap-2 bear-text-left bear-border-none bear-bg-transparent',
          SIZE_CLASSES[size],
          'bear-transition-colors bear-cursor-pointer',
          isFocused && 'bear-bg-gray-100 dark:bear-bg-gray-800',
          item.danger 
            ? 'bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-50 dark:hover:bear-bg-red-900/20'
            : 'bear-text-gray-700 dark:bear-text-gray-200 hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800',
          item.disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none'
        )}
      >
        {item.icon && (
          <span className="bear-flex-shrink-0 bear-w-5 bear-h-5 bear-flex bear-items-center bear-justify-center">
            {item.icon}
          </span>
        )}
        <span className="bear-flex-1">{item.label}</span>
        {item.trailing && (
          <span className="bear-flex-shrink-0 bear-text-gray-400">
            {item.trailing}
          </span>
        )}
        {item.items && (
          <svg className="bear-w-4 bear-h-4 bear-text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    );
  };

  // Clone trigger with click handler
  const triggerElement = isValidElement(trigger) 
    ? cloneElement(trigger as ReactElement<{ onClick?: () => void; ref?: React.Ref<HTMLElement>; 'aria-expanded'?: boolean; 'aria-haspopup'?: boolean }>, {
        onClick: toggle,
        ref: triggerRef,
        'aria-expanded': isOpen,
        'aria-haspopup': true,
      })
    : trigger;

  return (
    <div
      ref={containerRef}
      className={cn('bear-relative bear-inline-block', className)}
      data-testid={testId}
      {...props}
    >
      {triggerElement}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            'bear-absolute bear-z-50',
            'bear-bg-white dark:bear-bg-gray-900',
            'bear-border bear-border-gray-200 dark:bear-border-gray-700',
            'bear-rounded-lg bear-shadow-lg',
            'bear-py-1 bear-overflow-y-auto',
            'bear-animate-in bear-fade-in-0 bear-zoom-in-95 bear-duration-100',
            PLACEMENT_CLASSES[placement]
          )}
          style={{
            minWidth: matchWidth ? triggerRef.current?.offsetWidth : minWidth,
            maxHeight,
          }}
        >
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

