import { FC, useState, useRef, useCallback, useEffect, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '../../utils/cn';
import type { DropdownProps, DropdownItem } from './Dropdown.types';

const SIZE_CLASSES = {
  xs: 'ember-text-xs ember-py-1 ember-px-2',
  sm: 'ember-text-sm ember-py-1.5 ember-px-3',
  md: 'ember-text-sm ember-py-2 ember-px-3',
  lg: 'ember-text-base ember-py-2.5 ember-px-4',
  xl: 'ember-text-lg ember-py-3 ember-px-5',
} as const;

const PLACEMENT_CLASSES = {
  'bottom-start': 'ember-top-full ember-left-0 ember-mt-1',
  'bottom-end': 'ember-top-full ember-right-0 ember-mt-1',
  'bottom': 'ember-top-full ember-left-1/2 -ember-translate-x-1/2 ember-mt-1',
  'top-start': 'ember-bottom-full ember-left-0 ember-mb-1',
  'top-end': 'ember-bottom-full ember-right-0 ember-mb-1',
  'top': 'ember-bottom-full ember-left-1/2 -ember-translate-x-1/2 ember-mb-1',
  'left': 'ember-right-full ember-top-0 ember-mr-1',
  'right': 'ember-left-full ember-top-0 ember-ml-1',
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
          className="ember-my-1 ember-mx-2 ember-h-px ember-bg-gray-200 dark:ember-bg-gray-700"
          role="separator"
        />
      );
    }

    if (item.header) {
      return (
        <div
          key={item.key}
          className="ember-px-3 ember-py-1.5 ember-text-xs ember-font-semibold ember-uppercase ember-tracking-wider ember-text-gray-500 dark:ember-text-gray-400"
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
          'ember-w-full ember-flex ember-items-center ember-gap-2 ember-text-left ember-border-none ember-bg-transparent',
          SIZE_CLASSES[size],
          'ember-transition-colors ember-cursor-pointer',
          isFocused && 'ember-bg-gray-100 dark:ember-bg-gray-800',
          item.danger 
            ? 'ember-text-red-600 dark:ember-text-red-400 hover:ember-bg-red-50 dark:hover:ember-bg-red-900/20'
            : 'ember-text-gray-700 dark:ember-text-gray-200 hover:ember-bg-gray-100 dark:hover:ember-bg-gray-800',
          item.disabled && 'ember-opacity-50 ember-cursor-not-allowed ember-pointer-events-none'
        )}
      >
        {item.icon && (
          <span className="ember-flex-shrink-0 ember-w-5 ember-h-5 ember-flex ember-items-center ember-justify-center">
            {item.icon}
          </span>
        )}
        <span className="ember-flex-1">{item.label}</span>
        {item.trailing && (
          <span className="ember-flex-shrink-0 ember-text-gray-400">
            {item.trailing}
          </span>
        )}
        {item.items && (
          <svg className="ember-w-4 ember-h-4 ember-text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      className={cn('ember-relative ember-inline-block', className)}
      data-testid={testId}
      {...props}
    >
      {triggerElement}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            'ember-absolute ember-z-50',
            'ember-bg-white dark:ember-bg-gray-900',
            'ember-border ember-border-gray-200 dark:ember-border-gray-700',
            'ember-rounded-lg ember-shadow-lg',
            'ember-py-1 ember-overflow-y-auto',
            'ember-animate-in ember-fade-in-0 ember-zoom-in-95 ember-duration-100',
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

