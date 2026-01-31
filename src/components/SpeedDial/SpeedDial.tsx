import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@utils';
import type { SpeedDialProps, SpeedDialAction } from './SpeedDial.types';
import {
  SPEED_DIAL_BASE,
  SPEED_DIAL_POSITIONS,
  SPEED_DIAL_MAIN_BUTTON,
  SPEED_DIAL_MAIN_SIZES,
  SPEED_DIAL_MAIN_COLORS,
  SPEED_DIAL_ACTION,
  SPEED_DIAL_ACTION_SIZES,
  SPEED_DIAL_ACTION_COLORS,
  SPEED_DIAL_ACTIONS_CONTAINER,
  SPEED_DIAL_LABEL,
} from './SpeedDial.const';

// Default icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * SpeedDial - Floating action button with expandable actions
 * 
 * @example
 * ```tsx
 * <SpeedDial
 *   actions={[
 *     { label: 'Copy', icon: <CopyIcon />, onClick: handleCopy },
 *     { label: 'Print', icon: <PrintIcon />, onClick: handlePrint },
 *     { label: 'Share', icon: <ShareIcon />, onClick: handleShare },
 *   ]}
 *   position="bottom-right"
 * />
 * ```
 */
export const SpeedDial = forwardRef<HTMLDivElement, SpeedDialProps>(
  (
    {
      actions,
      icon,
      openIcon,
      direction = 'up',
      size = 'md',
      position,
      fixed = true,
      openOnHover = false,
      open: controlledOpen,
      onOpenChange,
      showLabels = true,
      ariaLabel = 'Speed dial',
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const setIsOpen = useCallback((value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    }, [onOpenChange]);

    const toggle = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen, setIsOpen]);

    // Close on escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, setIsOpen]);

    const mainSize = SPEED_DIAL_MAIN_SIZES[size];
    const actionSize = SPEED_DIAL_ACTION_SIZES[size];

    const getActionsPosition = () => {
      switch (direction) {
        case 'up': return 'bottom-full left-1/2 -translate-x-1/2 pb-3 flex-col-reverse';
        case 'down': return 'top-full left-1/2 -translate-x-1/2 pt-3 flex-col';
        case 'left': return 'right-full top-1/2 -translate-y-1/2 pr-3 flex-row-reverse';
        case 'right': return 'left-full top-1/2 -translate-y-1/2 pl-3 flex-row';
        default: return '';
      }
    };

    const getLabelPosition = (action: SpeedDialAction) => {
      const pos = action.tooltipPosition || (direction === 'up' || direction === 'down' ? 'left' : 'top');
      switch (pos) {
        case 'left': return 'right-full mr-2';
        case 'right': return 'left-full ml-2';
        case 'top': return 'bottom-full mb-2';
        case 'bottom': return 'top-full mt-2';
        default: return 'right-full mr-2';
      }
    };

    const handleActionClick = (action: SpeedDialAction) => {
      if (!action.disabled) {
        action.onClick?.();
        setIsOpen(false);
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          SPEED_DIAL_BASE,
          fixed && position && SPEED_DIAL_POSITIONS[position],
          className
        )}
        data-testid={testId}
        onMouseEnter={openOnHover ? () => setIsOpen(true) : undefined}
        onMouseLeave={openOnHover ? () => setIsOpen(false) : undefined}
        {...props}
      >
        {isOpen && (
          <div className={cn(SPEED_DIAL_ACTIONS_CONTAINER, getActionsPosition())}>
            {actions.map((action, index) => (
              <div
                key={index}
                className="relative flex items-center"
                style={{
                  animation: `fadeInUp 150ms ease-out ${index * 50}ms forwards`,
                  opacity: 0,
                }}
              >
                {showLabels && (
                  <span className={cn(SPEED_DIAL_LABEL, getLabelPosition(action))}>
                    {action.label}
                  </span>
                )}
                <button
                  type="button"
                  className={cn(
                    SPEED_DIAL_ACTION,
                    actionSize,
                    action.disabled ? 'opacity-50 cursor-not-allowed' : SPEED_DIAL_ACTION_COLORS,
                    'flex items-center justify-center'
                  )}
                  style={action.color ? { backgroundColor: action.color, color: 'white' } : undefined}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  aria-label={action.label}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cn(
            SPEED_DIAL_MAIN_BUTTON,
            mainSize,
            SPEED_DIAL_MAIN_COLORS,
            'flex items-center justify-center',
            isOpen && 'rotate-45'
          )}
          onClick={toggle}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
        >
          {isOpen ? (openIcon || <CloseIcon />) : (icon || <PlusIcon />)}
        </button>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }
);

SpeedDial.displayName = 'SpeedDial';

export default SpeedDial;
