import type { CSSProperties } from 'react';
import {
  DIRECTION_HORIZONTAL,
  PERCENT_ONE_HUNDRED,
  PERCENT_UNIT,
  ZERO,
} from '@const';
import type { ResizablePanelProps } from './ResizablePanel.types';

export const getResizePercentage = (
  rect: DOMRect,
  direction: NonNullable<ResizablePanelProps['direction']>,
  clientX: number,
  clientY: number
): number => {
  if (direction === DIRECTION_HORIZONTAL) {
    return ((clientX - rect.left) / rect.width) * PERCENT_ONE_HUNDRED;
  }
  return ((clientY - rect.top) / rect.height) * PERCENT_ONE_HUNDRED;
};

export const getPaneStyle = (isHorizontal: boolean, size: number): CSSProperties => {
  const paneSize = `${size}${PERCENT_UNIT}`;
  if (isHorizontal) {
    return { width: paneSize, minWidth: ZERO };
  }
  return { height: paneSize, minHeight: ZERO };
};

export const getHandleStyle = (isHorizontal: boolean, handleSize: number): CSSProperties => {
  if (isHorizontal) {
    return { width: handleSize };
  }
  return { height: handleSize };
};
