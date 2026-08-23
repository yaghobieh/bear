import type { ReactElement } from 'react';
import { useState, useCallback, useRef } from 'react';
import { ONE, ZERO } from '@const';
import { cn } from '@utils';
import { useResizeObserver } from '@hooks';
import type { VirtualListProps } from './VirtualList.types';
import { VIRTUAL_LIST_FALLBACK_HEIGHT, VIRTUAL_LIST_OVERSCAN } from './VirtualList.const';

export function VirtualList<T>(props: VirtualListProps<T>): ReactElement {
  const {
    items,
    itemHeight,
    overscan = VIRTUAL_LIST_OVERSCAN,
    height,
    renderItem,
    keyExtractor = (_, index) => index,
    className,
  } = props;
  const [scrollTop, setScrollTop] = useState(ZERO);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height: observedHeight } = useResizeObserver(containerRef, {
    enabled: typeof height === 'string',
  });

  const containerHeight =
    typeof height === 'number'
      ? height
      : observedHeight > ZERO
        ? observedHeight
        : VIRTUAL_LIST_FALLBACK_HEIGHT;

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(ZERO, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - ONE,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
  );
  const visibleItems = items.slice(startIndex, endIndex + ONE);
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-VirtualList bear-overflow-auto bear-bg-white dark:bear-bg-zinc-900 bear-rounded-lg', className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      onScroll={handleScroll}
    >
      <div className="bear-relative" style={{ height: `${totalHeight}px` }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, offset) => {
            const index = startIndex + offset;
            return (
              <div key={keyExtractor(item, index)} style={{ height: `${itemHeight}px` }}>
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
