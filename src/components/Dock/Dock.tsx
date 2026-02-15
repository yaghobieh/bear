import { FC, useState, useCallback, useRef } from 'react';
import { cn } from '@utils';
import type { DockProps, DockItem } from './Dock.types';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_MAGNIFIED_SIZE,
  DEFAULT_MAGNIFICATION_DISTANCE,
  DOCK_PADDING,
  SPRING_DURATION,
  ICON_SCALE_RATIO,
  DOCK_POSITION_CLASSES,
  TOOLTIP_POSITION_CLASSES,
  DOCK_Z_INDEX,
} from './Dock.const';

const getScale = (
  index: number,
  hoverIndex: number,
  distance: number,
  baseSize: number,
  maxSize: number
): number => {
  if (hoverIndex < 0) return baseSize;
  const diff = Math.abs(index - hoverIndex);
  if (diff > distance) return baseSize;
  const ratio = 1 - diff / (distance + 1);
  return baseSize + (maxSize - baseSize) * ratio;
};

/**
 * Dock - macOS-style dock bar with magnification.
 * Supports badges, active state, positions, and theming via BearProvider.
 */
export const Dock: FC<DockProps> = (props) => {
  const {
    items,
    position = 'bottom',
    iconSize = DEFAULT_ICON_SIZE,
    magnifiedSize = DEFAULT_MAGNIFIED_SIZE,
    magnification = true,
    magnificationDistance = DEFAULT_MAGNIFICATION_DISTANCE,
    showLabels = true,
    className,
    style,
    testId,
  } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [tooltipLabel, setTooltipLabel] = useState('');
  const dockRef = useRef<HTMLDivElement>(null);

  const isVertical = position === 'left' || position === 'right';

  const handleMouseEnter = useCallback((index: number, item: DockItem) => {
    setHoverIndex(index);
    setTooltipLabel(item.label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(-1);
    setTooltipLabel('');
  }, []);

  return (
    <div
      ref={dockRef}
      className={cn(
        'Bear-Dock',
        'bear-flex bear-items-end bear-gap-1',
        'bear-rounded-2xl bear-px-2 bear-py-1.5',
        'bear-bg-white/80 dark:bear-bg-gray-900/80',
        'bear-backdrop-blur-xl',
        'bear-border bear-border-gray-200/50 dark:bear-border-gray-700/50',
        'bear-shadow-lg',
        DOCK_POSITION_CLASSES[position],
        isVertical && 'bear-items-center',
        className
      )}
      style={{
        padding: DOCK_PADDING,
        zIndex: DOCK_Z_INDEX,
        ...style,
      }}
      data-testid={testId}
      role="toolbar"
      aria-label="Dock"
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => {
        const size = magnification
          ? getScale(index, hoverIndex, magnificationDistance, iconSize, magnifiedSize)
          : iconSize;

        return (
          <div
            key={item.id}
            className="Bear-Dock__item bear-relative bear-flex bear-flex-col bear-items-center"
          >
            {/* Tooltip */}
            {showLabels && hoverIndex === index && tooltipLabel && (
              <div
                className={cn(
                  'Bear-Dock__tooltip',
                  'bear-absolute bear-whitespace-nowrap',
                  'bear-px-2 bear-py-1 bear-rounded-lg',
                  'bear-bg-gray-900 dark:bear-bg-gray-100',
                  'bear-text-white dark:bear-text-gray-900',
                  'bear-text-xs bear-font-medium',
                  'bear-shadow-md bear-pointer-events-none',
                  TOOLTIP_POSITION_CLASSES[position],
                )}
                role="tooltip"
              >
                {item.label}
              </div>
            )}

            {/* Icon button */}
            <button
              className={cn(
                'Bear-Dock__button',
                'bear-flex bear-items-center bear-justify-center bear-rounded-xl',
                'bear-transition-all bear-origin-bottom',
                'hover:bear-cursor-pointer',
                item.active && 'bear-ring-2 bear-ring-offset-1',
                item.disabled && 'bear-opacity-40 bear-cursor-not-allowed',
              )}
              style={{
                width: size,
                height: size,
                transitionDuration: `${SPRING_DURATION}ms`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
              onClick={item.disabled ? undefined : item.onClick}
              onMouseEnter={() => handleMouseEnter(index, item)}
              disabled={item.disabled}
              aria-label={item.label}
            >
              <span
                className={cn(
                  'Bear-Dock__icon',
                  'bear-flex bear-items-center bear-justify-center',
                  'bear-w-full bear-h-full bear-rounded-xl',
                  'bear-transition-transform',
                  item.active
                    ? 'bear-bg-[var(--bear-primary-500)] bear-text-white'
                    : 'bear-bg-gray-100 dark:bear-bg-gray-800',
                )}
                style={{ fontSize: size * ICON_SCALE_RATIO }}
              >
                {item.icon}
              </span>
            </button>

            {/* Badge */}
            {item.badge !== undefined && (
              <span className={cn(
                'Bear-Dock__badge',
                'bear-absolute bear--top-1 bear--right-1',
                'bear-min-w-[18px] bear-h-[18px]',
                'bear-flex bear-items-center bear-justify-center',
                'bear-rounded-full bear-text-[10px] bear-font-bold',
                'bear-text-white bear-leading-none bear-px-1',
                'bear-bg-[var(--bear-danger-500,#ef4444)]',
              )}>
                {item.badge}
              </span>
            )}

            {/* Active dot */}
            {item.active && position === 'bottom' && (
              <div
                className={cn(
                  'Bear-Dock__dot',
                  'bear-w-1 bear-h-1 bear-rounded-full bear-mt-0.5',
                  'bear-bg-[var(--bear-primary-500)]',
                )}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
