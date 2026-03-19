import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PopoverProps } from './Popover.types';
import { cn } from '@utils';

const Z_INDEX = 10000;

function getPlacementStyles(placement: string, rect: DOMRect, offset: number): React.CSSProperties {
  const base: React.CSSProperties = { position: 'fixed' as const, zIndex: Z_INDEX };
  const vertical = placement.split('-')[0];
  const hasStart = placement.includes('start');
  const hasEnd = placement.includes('end');

  if (vertical === 'bottom') {
    base.top = rect.bottom + offset;
    if (hasStart) base.left = rect.left;
    else if (hasEnd) base.left = rect.right;
    else base.left = rect.left + rect.width / 2;
  } else if (vertical === 'top') {
    base.bottom = window.innerHeight - rect.top + offset;
    if (hasStart) base.left = rect.left;
    else if (hasEnd) base.left = rect.right;
    else base.left = rect.left + rect.width / 2;
  } else if (vertical === 'left') {
    base.right = window.innerWidth - rect.left + offset;
    if (hasStart) base.top = rect.top;
    else if (hasEnd) base.bottom = window.innerHeight - rect.bottom;
    else base.top = rect.top + rect.height / 2;
  } else {
    base.left = rect.right + offset;
    if (hasStart) base.top = rect.top;
    else if (hasEnd) base.bottom = window.innerHeight - rect.bottom;
    else base.top = rect.top + rect.height / 2;
  }

  if (vertical === 'bottom' || vertical === 'top') {
    if (!hasStart && !hasEnd) base.transform = 'translateX(-50%)';
    else if (hasEnd) base.transform = 'translateX(-100%)';
  } else {
    if (!hasStart && !hasEnd) base.transform = 'translateY(-50%)';
    else if (hasEnd) base.transform = 'translateY(-100%)';
  }
  return base;
}

export const Popover: FC<PopoverProps> = ({
  children,
  content,
  placement = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  arrow = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  offset = 8,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [position, setPosition] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = useCallback((value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  }, [onOpenChange]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition(getPlacementStyles(placement, rect, offset));
    }
  }, [isOpen, placement, offset]);

  useEffect(() => {
    if (!closeOnClickOutside) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (contentRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, setIsOpen]);

  useEffect(() => {
    if (!closeOnEscape) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, setIsOpen]);

  const handleTriggerClick = () => {
    if (trigger === 'click') setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setIsOpen(false);
  };

  const arrowStyles: Record<string, string> = {
    'top': 'bear-top-full bear-left-1/2 -bear-translate-x-1/2 bear-border-t-zinc-700 bear-border-x-transparent bear-border-b-transparent',
    'bottom': 'bear-bottom-full bear-left-1/2 -bear-translate-x-1/2 bear-border-b-zinc-700 bear-border-x-transparent bear-border-t-transparent',
    'left': 'bear-left-full bear-top-1/2 -bear-translate-y-1/2 bear-border-l-zinc-700 bear-border-y-transparent bear-border-r-transparent',
    'right': 'bear-right-full bear-top-1/2 -bear-translate-y-1/2 bear-border-r-zinc-700 bear-border-y-transparent bear-border-l-transparent',
  };

  const arrowDirection = placement.split('-')[0];

  const portalContent =
    isOpen &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={contentRef}
        data-bear-popover
        className={cn(
          'bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3',
          contentClassName
        )}
        style={position}
      >
        {content}
        {arrow && (
          <div className={cn('bear-absolute bear-w-0 bear-h-0 bear-border-8', arrowStyles[arrowDirection])} />
        )}
      </div>,
      document.body
    );

  return (
    <div
      ref={containerRef}
      className={cn('bear-relative bear-inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleTriggerClick} className="bear-cursor-pointer">
        {children}
      </div>
      {portalContent}
    </div>
  );
};
