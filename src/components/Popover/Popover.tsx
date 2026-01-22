import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { PopoverProps } from './Popover.types';
import { cn } from '../../utils/cn';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = useCallback((value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  }, [onOpenChange]);

  useEffect(() => {
    if (!closeOnClickOutside) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
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

  const placementStyles: Record<string, string> = {
    'top': 'bear-bottom-full bear-left-1/2 -bear-translate-x-1/2 bear-mb-2',
    'top-start': 'bear-bottom-full bear-left-0 bear-mb-2',
    'top-end': 'bear-bottom-full bear-right-0 bear-mb-2',
    'bottom': 'bear-top-full bear-left-1/2 -bear-translate-x-1/2 bear-mt-2',
    'bottom-start': 'bear-top-full bear-left-0 bear-mt-2',
    'bottom-end': 'bear-top-full bear-right-0 bear-mt-2',
    'left': 'bear-right-full bear-top-1/2 -bear-translate-y-1/2 bear-mr-2',
    'left-start': 'bear-right-full bear-top-0 bear-mr-2',
    'left-end': 'bear-right-full bear-bottom-0 bear-mr-2',
    'right': 'bear-left-full bear-top-1/2 -bear-translate-y-1/2 bear-ml-2',
    'right-start': 'bear-left-full bear-top-0 bear-ml-2',
    'right-end': 'bear-left-full bear-bottom-0 bear-ml-2',
  };

  const arrowStyles: Record<string, string> = {
    'top': 'bear-top-full bear-left-1/2 -bear-translate-x-1/2 bear-border-t-zinc-700 bear-border-x-transparent bear-border-b-transparent',
    'bottom': 'bear-bottom-full bear-left-1/2 -bear-translate-x-1/2 bear-border-b-zinc-700 bear-border-x-transparent bear-border-t-transparent',
    'left': 'bear-left-full bear-top-1/2 -bear-translate-y-1/2 bear-border-l-zinc-700 bear-border-y-transparent bear-border-r-transparent',
    'right': 'bear-right-full bear-top-1/2 -bear-translate-y-1/2 bear-border-r-zinc-700 bear-border-y-transparent bear-border-l-transparent',
  };

  const arrowDirection = placement.split('-')[0];

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
      {isOpen && (
        <div
          ref={contentRef}
          className={cn(
            'bear-absolute bear-z-50 bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3',
            placementStyles[placement],
            contentClassName
          )}
          style={{ marginTop: placement.startsWith('bottom') ? offset : undefined, marginBottom: placement.startsWith('top') ? offset : undefined }}
        >
          {content}
          {arrow && (
            <div className={cn(
              'bear-absolute bear-w-0 bear-h-0 bear-border-8',
              arrowStyles[arrowDirection]
            )} />
          )}
        </div>
      )}
    </div>
  );
};

