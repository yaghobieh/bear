import { FC, useState, useRef, useCallback, useEffect, cloneElement, isValidElement, ReactElement, useMemo } from 'react';
import { cn } from '@utils';
import { useClickOutsideMultiple, useFixedAnchorPosition } from '@hooks';
import { OVERLAY_OPEN_EFFECT_DEFAULT } from '../../hooks/useFixedAnchorPosition';
import type { OverlayPlacement } from '../../hooks/useFixedAnchorPosition';
import { OverlayPortal } from '../OverlayPortal';
import type { DropdownProps, DropdownItem } from './Dropdown.types';
import {
  DROPDOWN_DEFAULT_MAX_HEIGHT_PX,
  DROPDOWN_DEFAULT_MIN_WIDTH_PX,
  DROPDOWN_DEFAULT_OFFSET_PX,
  DROPDOWN_Z_INDEX,
  SIZE_CLASSES,
} from './Dropdown.const';

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
  offset = DROPDOWN_DEFAULT_OFFSET_PX,
  matchWidth = false,
  minWidth = DROPDOWN_DEFAULT_MIN_WIDTH_PX,
  maxHeight = DROPDOWN_DEFAULT_MAX_HEIGHT_PX,
  size = 'md',
  closeOnSelect = true,
  closeOnClickOutside = true,
  disabled = false,
  onOpenChange,
  className,
  testId,
  openEffect = OVERLAY_OPEN_EFFECT_DEFAULT,
  ...props
}) => {

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const overlayPlacement: OverlayPlacement =
    placement === 'left' || placement === 'right' ? 'bottom-start' : placement;
  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    offsetPx: offset,
    placement: overlayPlacement,
    matchWidth,
    minWidthPx: minWidth,
  });

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

  const handleClickOutside = useCallback(() => {
    if (isOpen && closeOnClickOutside) close();
  }, [isOpen, closeOnClickOutside, close]);

  useClickOutsideMultiple([containerRef, menuRef], handleClickOutside, {
    enabled: isOpen && closeOnClickOutside,
  });

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

  const selectableIndices = useMemo(
    () => items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled && !item.divider && !item.header),
    [items]
  );

  const renderItem = (item: DropdownItem, index: number) => {
    if (item.divider) {
      return (
        <div
          key={item.key}
          className="bear-my-1 bear-mx-2 bear-h-px"
          style={{ backgroundColor: 'var(--bear-border-default)' }}
          role="separator"
        />
      );
    }

    if (item.header) {
      return (
        <div
          key={item.key}
          className="bear-px-3 bear-py-1.5 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider"
          style={{ color: 'var(--bear-text-muted)' }}
        >
          {item.label}
        </div>
      );
    }

    const selectableIndex = selectableIndices.findIndex((entry) => entry.index === index);

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
          item.selected && !item.danger && 'bear-bg-[var(--bear-bg-tertiary)] bear-text-[var(--bear-text-primary)]',
          isFocused && !item.danger && 'bear-bg-[var(--bear-bg-tertiary)]',
          item.danger && 'bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-50 dark:hover:bear-bg-red-900/20',
          !item.danger && !item.disabled && 'hover:bear-bg-[var(--bear-bg-tertiary)]',
          item.disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none'
        )}
        style={
          item.disabled
            ? { color: 'var(--bear-text-muted)' }
            : item.danger
              ? undefined
              : { color: 'var(--bear-text-secondary)' }
        }
      >
        {item.icon && (
          <span className="bear-flex-shrink-0 bear-w-5 bear-h-5 bear-flex bear-items-center bear-justify-center">
            {item.icon}
          </span>
        )}
        <span className="bear-flex-1">{item.label}</span>
        {item.trailing && (
          <span className="bear-flex-shrink-0" style={{ color: 'var(--bear-text-muted)' }}>
            {item.trailing}
          </span>
        )}
        {item.items && (
          <svg className="bear-w-4 bear-h-4 bear-flex-shrink-0" style={{ color: 'var(--bear-text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      className={cn('bear-relative bear-inline-block', className)} data-testid={testId}
      {...props}
    >
      {triggerElement}

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={{
          ...overlayStyle,
          backgroundColor: 'var(--bear-bg-primary)',
          borderColor: 'var(--bear-border-default)',
          maxHeight,
        }}
        zIndex={DROPDOWN_Z_INDEX}
        openEffect={openEffect}
        panelRef={menuRef}
        className="bear-border bear-rounded-lg bear-shadow-lg bear-py-1 bear-overflow-y-auto"
        attributes={{ role: 'menu' }}
      >
        {items.map((item, index) => renderItem(item, index))}
      </OverlayPortal>
    </div>
  );
};

