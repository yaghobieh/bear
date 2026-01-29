import { forwardRef, useMemo } from 'react';
import { cn } from '@utils';
import type { TimelineProps, TimelineItem } from './Timeline.types';
import {
  TIMELINE_BASE_CLASSES,
  TIMELINE_ITEM_BASE,
  TIMELINE_POSITIONS,
  TIMELINE_DOT_BASE,
  TIMELINE_DOT_SIZES,
  TIMELINE_DOT_ICON_SIZES,
  TIMELINE_DOT_COLORS,
  TIMELINE_LINE_BASE,
  TIMELINE_LINE_COLOR,
  TIMELINE_CONTENT_BASE,
  TIMELINE_TITLE_SIZES,
  TIMELINE_DESC_SIZES,
  TIMELINE_TIME_CLASSES,
} from './Timeline.const';

/**
 * Timeline - Vertical timeline for events
 * 
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     { title: 'Step 1', description: 'Description', time: '2024-01-01' },
 *     { title: 'Step 2', description: 'Description', time: '2024-01-02', active: true },
 *     { title: 'Step 3', description: 'Description', time: '2024-01-03' },
 *   ]}
 * />
 * ```
 */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      position = 'left',
      size = 'md',
      showLine = true,
      pending,
      reverse = false,
      lineColor,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const positionConfig = TIMELINE_POSITIONS[position];
    const dotSize = TIMELINE_DOT_SIZES[size];
    const dotIconSize = TIMELINE_DOT_ICON_SIZES[size];
    const titleSize = TIMELINE_TITLE_SIZES[size];
    const descSize = TIMELINE_DESC_SIZES[size];

    const processedItems = useMemo(() => {
      let result = [...items];
      if (reverse) {
        result = result.reverse();
      }
      if (pending) {
        result.push({
          title: typeof pending === 'string' ? pending : 'Loading...',
          description: typeof pending === 'boolean' ? undefined : pending,
          color: 'gray',
        });
      }
      return result;
    }, [items, reverse, pending]);

    const renderDot = (item: TimelineItem) => {
      const color = item.color || 'pink';
      const isActive = item.active;
      const hasIcon = !!item.icon;

      if (hasIcon) {
        return (
          <div
            className={cn(
              TIMELINE_DOT_BASE,
              dotIconSize,
              TIMELINE_DOT_COLORS[color],
              'flex items-center justify-center text-white',
              isActive && 'ring-4 ring-pink-500/30'
            )}
            style={{
              top: '2px',
              ...(position === 'left' ? { left: '-4px' } : {}),
              ...(position === 'right' ? { right: '-4px' } : {}),
              ...(position === 'alternate' ? { left: '50%', transform: 'translateX(-50%)' } : {}),
            }}
          >
            {item.icon}
          </div>
        );
      }

      return (
        <div
          className={cn(
            TIMELINE_DOT_BASE,
            dotSize,
            TIMELINE_DOT_COLORS[color],
            isActive && 'ring-4 ring-pink-500/30 scale-125'
          )}
          style={{
            top: '6px',
            ...(position === 'left' ? { left: '0' } : {}),
            ...(position === 'right' ? { right: '0' } : {}),
            ...(position === 'alternate' ? { left: '50%', transform: 'translateX(-50%)' } : {}),
          }}
        />
      );
    };

    const getAlternateStyles = (index: number) => {
      if (position !== 'alternate') return {};
      
      const isEven = index % 2 === 0;
      return {
        wrapper: isEven ? 'pr-8 text-right w-1/2' : 'pl-8 text-left w-1/2 ml-auto',
        content: isEven ? 'text-right' : 'text-left',
      };
    };

    return (
      <div
        ref={ref}
        className={cn(TIMELINE_BASE_CLASSES, className)}
        data-testid={testId}
        {...props}
      >
        {showLine && (
          <div
            className={cn(
              TIMELINE_LINE_BASE,
              positionConfig.line,
              lineColor ? '' : TIMELINE_LINE_COLOR
            )}
            style={lineColor ? { backgroundColor: lineColor } : undefined}
          />
        )}

        {processedItems.map((item, index) => {
          const alternateStyles = getAlternateStyles(index);

          return (
            <div
              key={index}
              className={cn(
                TIMELINE_ITEM_BASE,
                position !== 'alternate' && positionConfig.wrapper,
                alternateStyles.wrapper
              )}
            >
              {renderDot(item)}

              <div className={cn(TIMELINE_CONTENT_BASE, alternateStyles.content)}>
                {item.time && (
                  <div className={cn(TIMELINE_TIME_CLASSES, 'mb-1')}>
                    {item.time}
                  </div>
                )}

                <h4
                  className={cn(
                    'Bear-Timeline__title font-medium text-gray-900 dark:text-white',
                    titleSize,
                    item.active && 'text-pink-600 dark:text-pink-400'
                  )}
                >
                  {item.title}
                </h4>

                {item.description && (
                  <div
                    className={cn(
                      'Bear-Timeline__description text-gray-600 dark:text-gray-400 mt-1',
                      descSize
                    )}
                  >
                    {item.description}
                  </div>
                )}

                {item.extra && (
                  <div className="Bear-Timeline__extra mt-3">
                    {item.extra}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

export default Timeline;
