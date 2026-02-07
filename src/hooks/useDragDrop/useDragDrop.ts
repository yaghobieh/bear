import { useState, useCallback, useRef } from 'react';
import type { UseDragDropOptions, UseDragDropReturn, DragDropId } from './useDragDrop.types';

const DEFAULT_DRAG_TYPE = 'bear-dnd';

/**
 * useDragDrop - Hook for HTML5 drag and drop
 *
 * @example
 * ```tsx
 * const { getDragProps, getDropProps, isDragging } = useDragDrop({
 *   onDrop: (sourceId, targetId) => reorder(sourceId, targetId),
 * });
 *
 * return (
 *   <div {...getDropProps('col-1', col, 0)}>
 *     {items.map((item, i) => (
 *       <div key={item.id} {...getDragProps(item.id, item, i)}>
 *         {item.label}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useDragDrop = <T = unknown>(
  options: UseDragDropOptions<T> = {}
): UseDragDropReturn<T> => {
  const {
    onDragStart,
    onDragEnd,
    onDrop,
    onDragOver,
    onDragLeave,
    disabled = false,
    dragType = DEFAULT_DRAG_TYPE,
  } = options;

  const [isDragging, setIsDragging] = useState(false);
  const [draggedId, setDraggedId] = useState<DragDropId | null>(null);
  const [dragOverId, setDragOverId] = useState<DragDropId | null>(null);

  const dragDataRef = useRef<{ id: DragDropId; item: T; index: number } | null>(null);

  const getDragProps = useCallback(
    (id: DragDropId, item: T, index: number) => ({
      draggable: !disabled,
      onDragStart: (e: React.DragEvent) => {
        if (disabled) return;
        e.dataTransfer.setData(dragType, String(id));
        e.dataTransfer.effectAllowed = 'move';
        dragDataRef.current = { id, item, index };
        setDraggedId(id);
        setIsDragging(true);
        onDragStart?.(id, item, index);
      },
      onDragEnd: (_e: React.DragEvent) => {
        if (disabled) return;
        dragDataRef.current = null;
        setDraggedId(null);
        setDragOverId(null);
        setIsDragging(false);
        onDragEnd?.(id, item, index);
      },
      'data-drag-id': id,
    }),
    [disabled, dragType, onDragStart, onDragEnd]
  );

  const getDropProps = useCallback(
    (id: DragDropId, item: T, index: number) => ({
      onDragOver: (e: React.DragEvent) => {
        if (disabled || !e.dataTransfer.types.includes(dragType)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const sourceId = dragDataRef.current?.id;
        if (sourceId != null && sourceId !== id) {
          setDragOverId(id);
          onDragOver?.(sourceId, id);
        }
      },
      onDragLeave: (e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragOverId(null);
          onDragLeave?.(id);
        }
      },
      onDrop: (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        setDragOverId(null);
        const data = dragDataRef.current;
        if (!data || data.id === id) return;
        onDrop?.(data.id, id, data.index, index, data.item, item);
      },
      'data-drop-id': id,
    }),
    [disabled, dragType, onDragOver, onDragLeave, onDrop]
  );

  return {
    isDragging,
    draggedId,
    dragOverId,
    getDragProps,
    getDropProps,
    dragDataRef,
  };
};
