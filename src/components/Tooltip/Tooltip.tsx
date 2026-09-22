import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { resolveOverlayEffects } from '@hooks/useFixedAnchorPosition';
import type { TooltipProps } from './Tooltip.types';
import {
  TOOLTIP_EFFECT_CLASS_MAP,
  TOOLTIP_DEFAULT_DELAY,
  TOOLTIP_SPACING,
  TOOLTIP_VIEWPORT_PADDING,
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
} from './Tooltip.const';
import { ZERO, TWO } from '@constants';

export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    content,
    children,
    position: positionProp,
    placement,
    delay = TOOLTIP_DEFAULT_DELAY,
    className,
    disabled = false,
    openEffect: openEffectProp,
    closeEffect: closeEffectProp,
    effect,
  } = props;

  // Support both position and placement props
  const position = placement || positionProp || TOOLTIP_POSITION_TOP;
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: ZERO, y: ZERO });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const centerX = triggerRect.left + (triggerRect.width - tooltipRect.width) / TWO;
    const centerY = triggerRect.top + (triggerRect.height - tooltipRect.height) / TWO;

    const coordsByPosition: Record<string, { x: number; y: number }> = {
      [TOOLTIP_POSITION_TOP]: { x: centerX, y: triggerRect.top - tooltipRect.height - TOOLTIP_SPACING },
      [TOOLTIP_POSITION_BOTTOM]: { x: centerX, y: triggerRect.bottom + TOOLTIP_SPACING },
      [TOOLTIP_POSITION_LEFT]: { x: triggerRect.left - tooltipRect.width - TOOLTIP_SPACING, y: centerY },
      [TOOLTIP_POSITION_RIGHT]: { x: triggerRect.right + TOOLTIP_SPACING, y: centerY },
    };

    const targetCoords = coordsByPosition[position] ?? coordsByPosition[TOOLTIP_POSITION_TOP];
    const x = Math.max(TOOLTIP_VIEWPORT_PADDING, Math.min(targetCoords.x, window.innerWidth - tooltipRect.width - TOOLTIP_VIEWPORT_PADDING));
    const y = Math.max(TOOLTIP_VIEWPORT_PADDING, Math.min(targetCoords.y, window.innerHeight - tooltipRect.height - TOOLTIP_VIEWPORT_PADDING));

    setCoords({ x, y });
  }, [position]);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    if (!isVisible) return;
    const schedule = () => {
      requestAnimationFrame(() => updatePosition());
    };
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    return () => {
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
    };
  }, [isVisible, updatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const { openEffect } = resolveOverlayEffects({ openEffect: openEffectProp, closeEffect: closeEffectProp, effect }, 'fade');
  const effectClass = TOOLTIP_EFFECT_CLASS_MAP[openEffect] ?? TOOLTIP_EFFECT_CLASS_MAP.fade;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="Bear-Tooltip__trigger bear-inline-block"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            style={{
              left: coords.x,
              top: coords.y,
            }}
            className={cn(
              'bear-fixed bear-z-[11000]',
              'Bear-Tooltip',
              `Bear-Tooltip--${position}`,
              'bear-px-3 bear-py-2 bear-rounded-lg',
              'bear-bg-gray-800 bear-text-white bear-text-sm',
              'bear-border bear-border-gray-700',
              'bear-shadow-lg',
              effectClass,
              className
            )}
          >
            <span className="Bear-Tooltip__content">{content}</span>
          </div>,
          document.body
        )}
    </>
  );
};
