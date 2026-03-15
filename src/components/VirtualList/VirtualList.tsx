import type { ReactElement } from 'react';
import { useState, useCallback, useRef } from 'react';
import { cn } from '@utils';
import { useResizeObserver } from '@hooks';
import type { VirtualListProps } from './VirtualList.types';

const FALLBACK_HEIGHT = 300;

export function VirtualList<T>({
  items,
  itemHeight,
  overscan = 3,
  height,
  renderItem,
  keyExtractor = (_, i) => i,
  className,
}: VirtualListProps<T>): ReactElement {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height: observedHeight } = useResizeObserver(containerRef, {
    enabled: typeof height === 'string',
  });

  const containerHeight =
    typeof height === 'number' ? height : (observedHeight > 0 ? observedHeight : FALLBACK_HEIGHT);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);
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
      <div
        className="bear-relative"
        style={{ height: `${totalHeight}px` }}
      >
        <div
          className="bear-absolute bear-inset-x-0 bear-top-0"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems.map((item, i) => {
            const index = startIndex + i;
            return (
              <div
                key={keyExtractor(item, index)}
                className="bear-absolute bear-inset-x-0 bear-top-0"
                style={{ height: `${itemHeight}px`, transform: `translateY(${i * itemHeight}px)` }}
              >
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
