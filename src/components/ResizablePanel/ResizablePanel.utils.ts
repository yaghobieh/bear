import type { ResizablePanelProps } from './ResizablePanel.types';
import { PERCENTAGE_SCALE } from './ResizablePanel.const';

/**
 * Compute first pane size as a percentage (0–100) from pointer position and container rect.
 * Used for both horizontal and vertical layouts.
 */
export function getResizePercentage(
  rect: DOMRect,
  direction: NonNullable<ResizablePanelProps['direction']>,
  clientX: number,
  clientY: number
): number {
  if (direction === 'horizontal') {
    return ((clientX - rect.left) / rect.width) * PERCENTAGE_SCALE;
  }
  return ((clientY - rect.top) / rect.height) * PERCENTAGE_SCALE;
}

/**
 * Clamp a value between min and max (inclusive).
 */
export function clampSize(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
