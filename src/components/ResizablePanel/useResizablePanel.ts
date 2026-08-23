import { useRef, useState } from 'react';
import { usePointerDrag } from '@hooks';
import { clamp } from '@utils';
import { FIFTY, NINETY, TEN } from '@const';
import { getResizePercentage } from './ResizablePanel.utils';
import type { ResizablePanelProps } from './ResizablePanel.types';

export const useResizablePanel = (options: {
  direction: NonNullable<ResizablePanelProps['direction']>;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (size: number) => void;
}) => {
  const {
    direction,
    defaultSize = FIFTY,
    minSize = TEN,
    maxSize = NINETY,
    onResize,
  } = options;

  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const { onPointerDown } = usePointerDrag({
    onMove: (event) => {
      if (!containerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const nextSize = clamp(
        getResizePercentage(rect, direction, event.clientX, event.clientY),
        minSize,
        maxSize
      );
      setSize(nextSize);
      onResize?.(nextSize);
    },
  });

  return { size, containerRef, onPointerDown };
};
