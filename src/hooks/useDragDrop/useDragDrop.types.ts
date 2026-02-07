import type { MutableRefObject } from 'react';

/**
 * Drag and drop item identifier
 */
export type DragDropId = string | number;

/**
 * UseDragDrop options
 */
export interface UseDragDropOptions<T = unknown> {
  /** Callback when drag starts */
  onDragStart?: (id: DragDropId, item: T, index: number) => void;
  /** Callback when drag ends */
  onDragEnd?: (id: DragDropId, item: T, index: number) => void;
  /** Callback when item is dropped on target */
  onDrop?: (sourceId: DragDropId, targetId: DragDropId, sourceIndex: number, targetIndex: number, sourceItem: T, targetItem: T) => void;
  /** Callback when hovering over drop target */
  onDragOver?: (sourceId: DragDropId, targetId: DragDropId) => void;
  /** Callback when leaving drop target */
  onDragLeave?: (targetId: DragDropId) => void;
  /** Whether dragging is disabled */
  disabled?: boolean;
  /** HTML5 drag type (default: 'bear-dnd') */
  dragType?: string;
}

/**
 * UseDragDrop return value
 */
export interface UseDragDropReturn<T = unknown> {
  /** Whether an item is currently being dragged */
  isDragging: boolean;
  /** ID of the item being dragged */
  draggedId: DragDropId | null;
  /** ID of the current drop target hovered */
  dragOverId: DragDropId | null;
  /** Props to spread on draggable element */
  getDragProps: (id: DragDropId, item: T, index: number) => {
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
    'data-drag-id': DragDropId;
  };
  /** Props to spread on drop target element */
  getDropProps: (id: DragDropId, item: T, index: number) => {
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    'data-drop-id': DragDropId;
  };
  /** Ref to store dragged item data (for cross-component) */
  dragDataRef: MutableRefObject<{ id: DragDropId; item: T; index: number } | null>;
}
