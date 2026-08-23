import type { PointerEvent as ReactPointerEvent } from 'react';

export interface PointerDragStart {
  clientX: number;
  clientY: number;
  pointerId: number;
}

export interface UsePointerDragOptions {
  enabled?: boolean;
  onMove: (event: PointerEvent, start: PointerDragStart) => void;
  onEnd?: () => void;
}

export interface UsePointerDragReturn {
  onPointerDown: (event: ReactPointerEvent) => void;
}
