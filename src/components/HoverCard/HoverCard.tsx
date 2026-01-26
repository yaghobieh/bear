import { forwardRef, useState, useRef, useEffect } from 'react';
import { HoverCardProps } from './HoverCard.types';
import { getSideClasses, getArrowClasses } from './HoverCard.utils';

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(({
  children,
  cardContent,
  side = 'bottom',
  align = 'center',
  openDelay = 200,
  closeDelay = 300,
  arrow = true,
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout>();
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`bear-hover-card relative inline-block ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}

      <div
        className={`
          absolute z-50 w-72
          ${getSideClasses(side, align)}
          transition-all duration-200
          ${isOpen 
            ? 'opacity-100 visible scale-100' 
            : 'opacity-0 invisible scale-95 pointer-events-none'
          }
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
          {arrow && (
            <div
              className={`absolute w-3 h-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${getArrowClasses(side)}`}
              style={{
                borderWidth: side === 'top' || side === 'left' ? '0 1px 1px 0' : '1px 0 0 1px',
              }}
            />
          )}
          {cardContent}
        </div>
      </div>
    </div>
  );
});

HoverCard.displayName = 'HoverCard';

