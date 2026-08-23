import { cn } from '@utils';
import {
  DIRECTION_HORIZONTAL,
  FIFTY,
  NINETY,
  PERCENT_ONE_HUNDRED,
  SIX,
  TEN,
} from '@const';
import type { ResizablePanelProps } from './ResizablePanel.types';
import { DEFAULT_DIRECTION } from './ResizablePanel.const';
import { getHandleStyle, getPaneStyle } from './ResizablePanel.utils';
import { useResizablePanel } from './useResizablePanel';

export const ResizablePanel = (props: ResizablePanelProps) => {
  const {
    first,
    second,
    direction = DEFAULT_DIRECTION,
    defaultSize = FIFTY,
    minSize = TEN,
    maxSize = NINETY,
    onResize,
    className,
    testId,
  } = props;

  const { size, containerRef, onPointerDown } = useResizablePanel({
    direction,
    defaultSize,
    minSize,
    maxSize,
    onResize,
  });

  const isHorizontal = direction === DIRECTION_HORIZONTAL;
  const firstStyle = getPaneStyle(isHorizontal, size);
  const secondStyle = getPaneStyle(isHorizontal, PERCENT_ONE_HUNDRED - size);
  const handleStyle = getHandleStyle(isHorizontal, SIX);

  let layoutClass = 'bear-flex-col';
  let handleClass = 'bear-h-1.5 bear-w-full bear-cursor-row-resize';
  if (isHorizontal) {
    layoutClass = 'bear-flex-row';
    handleClass = 'bear-w-1.5 bear-cursor-col-resize';
  }

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={cn(
        'Bear-ResizablePanel bear-flex bear-w-full bear-h-full bear-overflow-hidden',
        layoutClass,
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
        onPointerDown={onPointerDown}
        className={cn(
          'Bear-ResizablePanel__handle bear-shrink-0 bear-bg-gray-200 dark:bear-bg-gray-700 hover:bear-bg-primary-500/30 bear-transition-colors',
          handleClass
        )}
        style={handleStyle}
      />
      <div className="bear-overflow-auto bear-shrink-0 bear-flex-1" style={secondStyle}>
        {second}
      </div>
    </div>
  );
};
