import { FC, useState, useCallback, useRef } from 'react';
import type { ResizablePanelProps } from './ResizablePanel.types';
import {
  DEFAULT_FIRST_SIZE,
  DEFAULT_DIRECTION,
  MIN_SIZE,
  MAX_SIZE,
  HANDLE_WIDTH,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
} from './ResizablePanel.const';
import { getResizePercentage, clampSize } from './ResizablePanel.utils';
import { cn } from '@utils';

/**
 * Two-pane resizable layout with a draggable divider.
 * Supports horizontal and vertical directions; respects min/max size and dark/light theme.
 *
 * @example
 * ```tsx
 * <ResizablePanel
 *   first={<Sidebar />}
 *   second={<Main />}
 *   direction="horizontal"
 *   defaultSize={30}
 * />
 * ```
 */
export const ResizablePanel: FC<ResizablePanelProps> = (props) => {
  const {
    first,
    second,
    direction = DEFAULT_DIRECTION,
    defaultSize = DEFAULT_FIRST_SIZE,
    minSize = MIN_SIZE,
    maxSize = MAX_SIZE,
    onResize,
    className,
    testId,
  } = props;

  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((n: number) => clampSize(n, minSize, maxSize), [minSize, maxSize]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      target.setPointerCapture?.(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = getResizePercentage(rect, direction, ev.clientX, ev.clientY);
        const clamped = clamp(pct);
        setSize(clamped);
        onResize?.(clamped);
      };

      const onUp = () => {
        target.releasePointerCapture?.(e.pointerId);
        window.removeEventListener(EVENT_POINTER_MOVE, onMove);
        window.removeEventListener(EVENT_POINTER_UP, onUp);
      };

      window.addEventListener(EVENT_POINTER_MOVE, onMove);
      window.addEventListener(EVENT_POINTER_UP, onUp);
    },
    [direction, clamp, onResize]
  );

  const isHorizontal = direction === 'horizontal';
  const firstStyle = isHorizontal
    ? { width: `${size}%`, minWidth: 0 }
    : { height: `${size}%`, minHeight: 0 };
  const secondStyle = isHorizontal
    ? { width: `${100 - size}%`, minWidth: 0 }
    : { height: `${100 - size}%`, minHeight: 0 };

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={cn(
        'Bear-ResizablePanel bear-flex bear-w-full bear-h-full bear-overflow-hidden',
        isHorizontal ? 'bear-flex-row' : 'bear-flex-col',
        className
      )}
    >
      <div className="bear-overflow-auto bear-shrink-0" style={firstStyle}>
        {first}
      </div>
      <div
        role="separator"
        aria-valuenow={size}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        className={cn(
          'Bear-ResizablePanel__handle bear-shrink-0 bear-bg-gray-200 dark:bear-bg-gray-700 hover:bear-bg-pink-500/30 bear-transition-colors bear-cursor-col-resize',
          isHorizontal ? 'bear-w-1.5' : 'bear-h-1.5 bear-w-full bear-cursor-row-resize'
        )}
        style={isHorizontal ? { width: HANDLE_WIDTH } : { height: HANDLE_WIDTH }}
      />
      <div className="bear-overflow-auto bear-shrink-0 bear-flex-1" style={secondStyle}>
        {second}
      </div>
    </div>
  );
};
