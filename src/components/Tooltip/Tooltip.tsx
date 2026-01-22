import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position: positionProp,
  placement,
  delay = 200,
  className,
  disabled = false,
}) => {
  // Support both position and placement props
  const position = placement || positionProp || 'top';
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top - tooltipRect.height - spacing;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + spacing;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        x = triggerRect.right + spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Keep tooltip within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="bear-inline-block"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            style={{
              position: 'fixed',
              left: coords.x,
              top: coords.y,
              zIndex: 9999,
            }}
            className={cn(
              'bear-px-3 bear-py-2 bear-rounded-lg',
              'bear-bg-gray-800 bear-text-white bear-text-sm',
              'bear-border bear-border-gray-700',
              'bear-shadow-lg',
              'bear-animate-in bear-fade-in bear-duration-150',
              className
            )}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

