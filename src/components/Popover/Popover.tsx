import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PopoverProps } from './Popover.types';
import { cn } from '@utils';
import { TWO } from '@constants';
import { resolveOverlayEffects } from '@hooks/useFixedAnchorPosition';
import {
  POPOVER_Z_INDEX,
  POPOVER_DEFAULT_OFFSET,
  POPOVER_EFFECT_CLASS_MAP,
  POPOVER_ARROW_STYLES,
  PLACEMENT_BOTTOM,
  PLACEMENT_TOP,
  PLACEMENT_LEFT,
  PLACEMENT_RIGHT,
  ALIGN_START,
  ALIGN_END,
  TRANSFORM_TRANSLATE_X_CENTER,
  TRANSFORM_TRANSLATE_X_END,
  TRANSFORM_TRANSLATE_Y_CENTER,
  TRANSFORM_TRANSLATE_Y_END,
} from './Popover.const';

function getPlacementStyles(placement: string, rect: DOMRect, offset: number): React.CSSProperties {
  const base: React.CSSProperties = { position: 'fixed', zIndex: POPOVER_Z_INDEX };
  const [direction] = placement.split('-');
  const hasStart = placement.includes(ALIGN_START);
  const hasEnd = placement.includes(ALIGN_END);
  const isVertical = direction === PLACEMENT_BOTTOM || direction === PLACEMENT_TOP;

  if (isVertical) {
    base.top = direction === PLACEMENT_BOTTOM ? rect.bottom + offset : undefined;
    base.bottom = direction === PLACEMENT_TOP ? window.innerHeight - rect.top + offset : undefined;
    base.left = hasStart ? rect.left : hasEnd ? rect.right : rect.left + rect.width / TWO;
    base.transform = !hasStart && !hasEnd ? TRANSFORM_TRANSLATE_X_CENTER : hasEnd ? TRANSFORM_TRANSLATE_X_END : undefined;
  } else {
    base.left = direction === PLACEMENT_RIGHT ? rect.right + offset : undefined;
    base.right = direction === PLACEMENT_LEFT ? window.innerWidth - rect.left + offset : undefined;
    base.bottom = hasEnd ? window.innerHeight - rect.bottom : undefined;
    base.top = !hasEnd ? (hasStart ? rect.top : rect.top + rect.height / TWO) : undefined;
    base.transform = !hasStart && !hasEnd ? TRANSFORM_TRANSLATE_Y_CENTER : hasEnd ? TRANSFORM_TRANSLATE_Y_END : undefined;
  }

  return base;
}

export const Popover: FC<PopoverProps> = ({
  children,
  content,
  placement = PLACEMENT_BOTTOM,
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  arrow = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  offset = POPOVER_DEFAULT_OFFSET,
  openEffect: openEffectProp,
  closeEffect: closeEffectProp,
  effect,
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

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;
    const triggerEl = containerRef.current.firstElementChild as HTMLElement;
    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    setPosition(getPlacementStyles(placement, triggerRect, offset));
  }, [placement, offset]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, setIsOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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

  const arrowDirection = placement.split('-')[0];
  const { openEffect } = resolveOverlayEffects({ openEffect: openEffectProp, closeEffect: closeEffectProp, effect }, 'fade');
  const effectClass = POPOVER_EFFECT_CLASS_MAP[openEffect] ?? POPOVER_EFFECT_CLASS_MAP.fade;

  const portalContent =
    isOpen &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={contentRef}
        data-bear-popover
        className={cn(
          'bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3',
          effectClass,
          contentClassName
        )}
        style={position}
      >
        {content}
        {arrow && (
          <div className={cn('bear-absolute bear-w-0 bear-h-0 bear-border-8', POPOVER_ARROW_STYLES[arrowDirection])} />
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
