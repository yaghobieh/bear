import { forwardRef, useMemo } from 'react';
import { cn } from '@utils';
import { HoverCard } from '../HoverCard';
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
  TIMELINE_DOT_TOP_WITH_ICON_PX,
  TIMELINE_DOT_TOP_DEFAULT_PX,
  TIMELINE_DOT_OFFSET_WITH_ICON_PX,
  TIMELINE_DOT_OFFSET_DEFAULT_PX,
  TIMELINE_DOT_ICON_EXTRA,
  TIMELINE_DOT_ACTIVE_RING,
  TIMELINE_DOT_INTERACTIVE,
  TIMELINE_DOT_HOVER_SCALE,
  TIMELINE_DOT_ACTIVE_SCALE,
  TIMELINE_HOVER_CARD_CONTENT,
  TIMELINE_HOVER_CARD_DATE,
  TIMELINE_ALTERNATE_EVEN_WRAPPER,
  TIMELINE_ALTERNATE_ODD_WRAPPER,
  TIMELINE_ALTERNATE_EVEN_CONTENT,
  TIMELINE_ALTERNATE_ODD_CONTENT,
  TIMELINE_TITLE_BASE,
  TIMELINE_TITLE_ACTIVE,
  TIMELINE_DESC_BASE,
  TIMELINE_EXTRA_CLASSES,
  TIMELINE_TIME_MARGIN,
  TIMELINE_PENDING_TITLE,
} from './Timeline.const';

const getDotPositionStyle = (
  position: TimelineProps['position'],
  hasIcon: boolean
): React.CSSProperties => {
  const top = hasIcon ? TIMELINE_DOT_TOP_WITH_ICON_PX : TIMELINE_DOT_TOP_DEFAULT_PX;
  const edgeOffset = hasIcon ? TIMELINE_DOT_OFFSET_WITH_ICON_PX : TIMELINE_DOT_OFFSET_DEFAULT_PX;

  if (position === 'alternate') {
    return { top, left: '50%', transform: 'translateX(-50%)' };
  }
  if (position === 'right') {
    return { top, right: edgeOffset };
  }
  return { top, left: edgeOffset };
};

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>((props, ref) => {
  const {
    items,
    position = 'left',
    size = 'md',
    showLine = true,
    pending,
    reverse = false,
    lineColor,
    testId,
    className,
    ...rest
  } = props;

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
        title: typeof pending === 'string' ? pending : TIMELINE_PENDING_TITLE,
        description: typeof pending === 'boolean' ? undefined : pending,
        color: 'gray',
      });
    }
    return result;
  }, [items, reverse, pending]);

  const renderDot = (item: TimelineItem, itemKey: string) => {
    const color = item.color || 'pink';
    const isActive = item.active;
    const hasIcon = !!item.icon;
    const hasDetail = !!(item.detail || item.date);
    const dotStyle = getDotPositionStyle(position, hasIcon);

    const dotNode = hasIcon ? (
      <div
        className={cn(
          TIMELINE_DOT_BASE,
          dotIconSize,
          TIMELINE_DOT_COLORS[color],
          TIMELINE_DOT_ICON_EXTRA,
          isActive && TIMELINE_DOT_ACTIVE_RING,
          hasDetail && TIMELINE_DOT_INTERACTIVE
        )}
        style={dotStyle}
        onClick={item.onDotClick}
        role={hasDetail ? 'button' : undefined}
        tabIndex={hasDetail ? 0 : undefined}
      >
        {item.icon}
      </div>
    ) : (
      <div
        className={cn(
          TIMELINE_DOT_BASE,
          dotSize,
          TIMELINE_DOT_COLORS[color],
          isActive && cn(TIMELINE_DOT_ACTIVE_RING, TIMELINE_DOT_ACTIVE_SCALE),
          hasDetail && cn(TIMELINE_DOT_INTERACTIVE, TIMELINE_DOT_HOVER_SCALE)
        )}
        style={dotStyle}
        onClick={item.onDotClick}
        role={hasDetail ? 'button' : undefined}
        tabIndex={hasDetail ? 0 : undefined}
      />
    );

    if (!hasDetail) return dotNode;

    return (
      <HoverCard
        key={itemKey}
        cardContent={
          <div className={TIMELINE_HOVER_CARD_CONTENT}>
            {item.date && <div className={TIMELINE_HOVER_CARD_DATE}>{item.date}</div>}
            {item.detail ?? item.description}
          </div>
        }
      >
        {dotNode}
      </HoverCard>
    );
  };

  const getAlternateStyles = (index: number) => {
    if (position !== 'alternate') return { wrapper: '', content: '' };

    const isEven = index % 2 === 0;
    return {
      wrapper: isEven ? TIMELINE_ALTERNATE_EVEN_WRAPPER : TIMELINE_ALTERNATE_ODD_WRAPPER,
      content: isEven ? TIMELINE_ALTERNATE_EVEN_CONTENT : TIMELINE_ALTERNATE_ODD_CONTENT,
    };
  };

  return (
    <div
      ref={ref}
      className={cn(TIMELINE_BASE_CLASSES, className)}
      data-testid={testId}
      {...rest}
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
        const itemKey = `${item.title}-${item.time ?? index}`;

        return (
          <div
            key={itemKey}
            className={cn(
              TIMELINE_ITEM_BASE,
              position !== 'alternate' && positionConfig.wrapper,
              alternateStyles.wrapper
            )}
          >
            {renderDot(item, `dot-${itemKey}`)}

            <div className={cn(TIMELINE_CONTENT_BASE, alternateStyles.content)}>
              {item.time && (
                <div className={cn(TIMELINE_TIME_CLASSES, TIMELINE_TIME_MARGIN)}>
                  {item.time}
                </div>
              )}

              <h4
                className={cn(
                  TIMELINE_TITLE_BASE,
                  titleSize,
                  item.active && TIMELINE_TITLE_ACTIVE
                )}
              >
                {item.title}
              </h4>

              {item.description && (
                <div className={cn(TIMELINE_DESC_BASE, descSize)}>
                  {item.description}
                </div>
              )}

              {item.extra && (
                <div className={TIMELINE_EXTRA_CLASSES}>
                  {item.extra}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

Timeline.displayName = 'Timeline';
