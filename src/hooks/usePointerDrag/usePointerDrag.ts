import { useRef } from 'react';
import { BOOLEAN_TRUE, EVENT_POINTER_MOVE, EVENT_POINTER_UP, ZERO } from '@const';
import type { PointerDragStart, UsePointerDragOptions, UsePointerDragReturn } from './usePointerDrag.types';

export const usePointerDrag = (options: UsePointerDragOptions): UsePointerDragReturn => {
  const { enabled = BOOLEAN_TRUE, onMove, onEnd } = options;
  const startRef = useRef<PointerDragStart>({
    clientX: ZERO,
    clientY: ZERO,
    pointerId: ZERO,
  });

  const onPointerDown = (event: React.PointerEvent) => {
    if (!enabled) {
      return;
    }
    event.preventDefault();
    const target = event.target as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    startRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      pointerId: event.pointerId,
    };

    const handleMove = (pointerEvent: PointerEvent) => {
      onMove(pointerEvent, startRef.current);
    };

    const handleUp = () => {
      target.releasePointerCapture?.(event.pointerId);
      window.removeEventListener(EVENT_POINTER_MOVE, handleMove);
      window.removeEventListener(EVENT_POINTER_UP, handleUp);
      onEnd?.();
    };

    window.addEventListener(EVENT_POINTER_MOVE, handleMove);
    window.addEventListener(EVENT_POINTER_UP, handleUp);
  };

  return { onPointerDown };
};
