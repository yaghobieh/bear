import { FC, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import type { SpeedDialProps, SpeedDialAction } from './SpeedDial.types';

const POSITION_CLASSES = {
  'bottom-right': 'bear-bottom-4 bear-right-4',
  'bottom-left': 'bear-bottom-4 bear-left-4',
  'top-right': 'bear-top-4 bear-right-4',
  'top-left': 'bear-top-4 bear-left-4',
} as const;

const DIRECTION_CLASSES = {
  up: 'bear-flex-col-reverse bear-pb-2',
  down: 'bear-flex-col bear-pt-2',
  left: 'bear-flex-row-reverse bear-pr-2',
  right: 'bear-flex-row bear-pl-2',
} as const;

const DEFAULT_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CLOSE_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * SpeedDial - Floating action button that reveals related actions
 * 
 * @example
 * ```tsx
 * <SpeedDial
 *   actions={[
 *     { key: 'copy', icon: <CopyIcon />, label: 'Copy', onClick: handleCopy },
 *     { key: 'print', icon: <PrintIcon />, label: 'Print', onClick: handlePrint },
 *     { key: 'share', icon: <ShareIcon />, label: 'Share', onClick: handleShare },
 *   ]}
 *   position="bottom-right"
 *   direction="up"
 * />
 * ```
 */
export const SpeedDial: FC<SpeedDialProps> = ({
  actions,
  icon = DEFAULT_ICON,
  openIcon = CLOSE_ICON,
  open: controlledOpen,
  defaultOpen = false,
  direction = 'up',
  variant = 'primary',
  size = 'lg',
  showTooltips = true,
  tooltipPlacement = 'auto',
  closeOnAction = true,
  position = 'bottom-right',
  fixed = true,
  ariaLabel = 'SpeedDial',
  onOpenChange,
  className,
  testId,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const newValue = !isOpen;
    if (!isControlled) {
      setInternalOpen(newValue);
    }
    onOpenChange?.(newValue);
  }, [isOpen, isControlled, onOpenChange]);

  const handleActionClick = useCallback((action: SpeedDialAction) => {
    action.onClick?.();
    if (closeOnAction) {
      if (!isControlled) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    }
  }, [closeOnAction, isControlled, onOpenChange]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          if (!isControlled) {
            setInternalOpen(false);
          }
          onOpenChange?.(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isControlled, onOpenChange]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (!isControlled) {
          setInternalOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isControlled, onOpenChange]);

  const getTooltipPlacement = () => {
    if (tooltipPlacement !== 'auto') return tooltipPlacement;
    
    switch (direction) {
      case 'up':
      case 'down':
        return position.includes('right') ? 'left' : 'right';
      case 'left':
      case 'right':
        return 'top';
    }
  };

  const renderAction = (action: SpeedDialAction, index: number) => {
    const button = (
      <Button
        key={action.key}
        variant="secondary"
        size="md"
        onClick={() => handleActionClick(action)}
        disabled={action.disabled}
        className={cn(
          'bear-rounded-full bear-shadow-lg bear-transition-all bear-duration-200',
          'bear-w-12 bear-h-12 bear-p-0 bear-flex bear-items-center bear-justify-center',
          isOpen 
            ? 'bear-opacity-100 bear-scale-100' 
            : 'bear-opacity-0 bear-scale-75 bear-pointer-events-none'
        )}
        style={{
          transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
        }}
        aria-label={action.label}
      >
        {action.icon}
      </Button>
    );

    if (showTooltips) {
      return (
        <Tooltip 
          key={action.key} 
          content={action.label} 
          placement={getTooltipPlacement()}
        >
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'bear-inline-flex bear-items-center',
        DIRECTION_CLASSES[direction],
        fixed && 'bear-fixed bear-z-50',
        fixed && POSITION_CLASSES[position],
        className
      )}
      data-testid={testId}
      {...props}
    >
      <div
        className={cn(
          'bear-flex bear-gap-3',
          DIRECTION_CLASSES[direction]
        )}
        role="menu"
        aria-orientation={direction === 'up' || direction === 'down' ? 'vertical' : 'horizontal'}
      >
        {actions.map((action, index) => renderAction(action, index))}
      </div>

      <Button
        variant={variant}
        size={size}
        onClick={handleToggle}
        className={cn(
          'bear-rounded-full bear-shadow-xl bear-transition-transform bear-duration-300',
          'bear-w-14 bear-h-14 bear-p-0 bear-flex bear-items-center bear-justify-center',
          isOpen && 'bear-rotate-45'
        )}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {isOpen ? openIcon : icon}
      </Button>
    </div>
  );
};

export default SpeedDial;

