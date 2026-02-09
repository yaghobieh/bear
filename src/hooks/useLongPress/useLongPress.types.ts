/**
 * useLongPress hook types
 */

import type { MouseEvent, TouchEvent } from 'react';

export interface UseLongPressOptions {
  /** Duration in ms to trigger long press (default: 400) */
  threshold?: number;
  /** Callback for long press */
  onLongPress?: (event: MouseEvent | TouchEvent) => void;
  /** Callback for regular click (if released before threshold) */
  onClick?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press starts */
  onStart?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press ends (regardless of long press) */
  onFinish?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press is cancelled (e.g., mouse leaves) */
  onCancel?: (event: MouseEvent | TouchEvent) => void;
  /** Filter function to determine if event should trigger */
  filterEvents?: (event: MouseEvent | TouchEvent) => boolean;
  /** Disable the long press */
  disabled?: boolean;
}

export interface UseLongPressReturn {
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}
