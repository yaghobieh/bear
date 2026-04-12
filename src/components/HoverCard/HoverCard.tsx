import { forwardRef, useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { HoverCardProps } from './HoverCard.types';
import { Portal } from '../Portal';

const HOVER_CARD_Z = 11000;
const PANEL_W = 288;
const EST_HEIGHT = 200;

function computePosition(
  rect: DOMRect,
  side: HoverCardProps['side'],
  align: HoverCardProps['align']
): CSSProperties {
  const gap = 8;
  let top = 0;
  let left = 0;
  const halfW = PANEL_W / 2;

  if (side === 'bottom') {
    top = rect.bottom + gap;
    left = rect.left + rect.width / 2 - halfW;
    if (align === 'start') left = rect.left;
    if (align === 'end') left = rect.right - PANEL_W;
  } else if (side === 'top') {
    top = rect.top - EST_HEIGHT - gap;
    left = rect.left + rect.width / 2 - halfW;
    if (align === 'start') left = rect.left;
    if (align === 'end') left = rect.right - PANEL_W;
  } else if (side === 'right') {
    left = rect.right + gap;
    top = rect.top + rect.height / 2 - EST_HEIGHT / 2;
    if (align === 'start') top = rect.top;
    if (align === 'end') top = rect.bottom - EST_HEIGHT;
  } else {
    left = rect.left - PANEL_W - gap;
    top = rect.top + rect.height / 2 - EST_HEIGHT / 2;
    if (align === 'start') top = rect.top;
    if (align === 'end') top = rect.bottom - EST_HEIGHT;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - PANEL_W - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - EST_HEIGHT - 8));

  return {
    position: 'fixed',
    zIndex: HOVER_CARD_Z,
    top,
    left,
    width: PANEL_W,
  };
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(({
  children,
  cardContent,
  side = 'bottom',
  align = 'center',
  openDelay = 200,
  closeDelay = 300,
  arrow: _arrow = true,
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPanelStyle(computePosition(rect, side, align));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen, side, align]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => setIsOpen(true), openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };

  useEffect(() => () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`bear-hover-card bear-relative bear-inline-block ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div ref={triggerRef} className="bear-inline-block">
        {children}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            style={panelStyle}
            className={`
              bear-bg-white dark:bear-bg-gray-800 bear-rounded-lg bear-shadow-xl
              bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-p-4
              bear-transition-all bear-duration-200
              ${isOpen ? 'bear-opacity-100 bear-scale-100' : 'bear-opacity-0 bear-scale-95'}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {cardContent}
          </div>
        </Portal>
      )}
    </div>
  );
});

HoverCard.displayName = 'HoverCard';
