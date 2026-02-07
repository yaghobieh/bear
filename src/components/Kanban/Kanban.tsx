import { FC, useCallback } from 'react';
import { cn } from '@utils';
import { useDragDrop } from '@hooks';
import type { KanbanProps, KanbanColumn, KanbanCard } from './Kanban.types';

const DRAG_TYPE = 'bear-kanban';

export const Kanban: FC<KanbanProps> = ({
  columns,
  onColumnsChange,
  onCardMove,
  renderCard,
  renderColumnHeader,
  disabled = false,
  className,
}) => {
  const moveCard = useCallback(
    (sourceColId: string, targetColId: string, sourceIndex: number, insertAt: number, card: KanbanCard) => {
      const sourceCol = columns.find((c) => c.id === sourceColId);
      const targetCol = columns.find((c) => c.id === targetColId);
      if (!sourceCol || !targetCol) return;

      const newColumns = columns.map((col) => {
        if (col.id === sourceColId) {
          const newCards = col.cards.filter((_, i) => i !== sourceIndex);
          return { ...col, cards: newCards };
        }
        if (col.id === targetColId) {
          const adjIndex = sourceColId === targetColId && sourceIndex < insertAt ? insertAt - 1 : insertAt;
          const newCards = [...col.cards];
          newCards.splice(Math.max(0, adjIndex), 0, card);
          return { ...col, cards: newCards };
        }
        return col;
      });

      onColumnsChange?.(newColumns);
      onCardMove?.(card.id, sourceColId, targetColId, sourceIndex, insertAt);
    },
    [columns, onColumnsChange, onCardMove]
  );

  const { getDragProps, getDropProps, isDragging, draggedId, dragOverId } = useDragDrop<KanbanCard | KanbanColumn>({
    disabled,
    dragType: DRAG_TYPE,
    onDrop: (sourceId, targetId, _sourceIndex, _targetIndex, sourceItem) => {
      const src = String(sourceId);
      const tgt = String(targetId);
      const sourceColId = src.split('-')[0];
      const sourceIdx = parseInt(src.split('-')[1], 10) || 0;
      const targetColId = tgt.endsWith('-col') ? tgt.replace('-col', '') : tgt.split('-')[0];
      const insertAt = tgt.endsWith('-col')
        ? (columns.find((c) => c.id === targetColId)?.cards.length ?? 0)
        : parseInt(tgt.split('-')[1], 10);

      const card = sourceItem as KanbanCard;
      if (!card?.id) return;

      moveCard(sourceColId, targetColId, sourceIdx, insertAt, card);
    },
  });

  return (
    <div
      className={cn(
        'Bear-Kanban bear-flex bear-gap-4 bear-overflow-x-auto bear-pb-4',
        disabled && 'bear-opacity-50 bear-pointer-events-none',
        className
      )}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          {...getDropProps(`${col.id}-col`, col, 0)}
          className={cn(
            'Bear-Kanban__column bear-flex-shrink-0 bear-w-72 bear-flex bear-flex-col bear-rounded-lg bear-bg-gray-100 dark:bear-bg-zinc-800/80 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-transition-colors',
            dragOverId === `${col.id}-col` && 'bear-border-bear-500 bear-bg-bear-500/5'
          )}
        >
          <div className="bear-px-4 bear-py-3 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700">
            {renderColumnHeader ? (
              renderColumnHeader(col)
            ) : (
              <h3 className="bear-text-sm bear-font-semibold bear-text-gray-900 dark:bear-text-white">{col.title}</h3>
            )}
          </div>
          <div className="bear-flex-1 bear-flex bear-flex-col bear-gap-2 bear-p-3 bear-min-h-[120px]">
            {col.cards.map((card, i) => {
              const dropId = `${col.id}-${i}`;
              const isDraggingCard = isDragging && draggedId === dropId;
              return (
                <div
                  key={card.id}
                  {...getDropProps(dropId, card, i)}
                  {...getDragProps(dropId, card, i)}
                  className={cn(
                    'Bear-Kanban__card bear-rounded-lg bear-bg-white dark:bear-bg-zinc-700/80 bear-border bear-border-gray-200 dark:bear-border-zinc-600 bear-p-3 bear-cursor-grab active:bear-cursor-grabbing bear-transition-all bear-shadow-sm',
                    isDraggingCard && 'bear-opacity-50 bear-scale-95',
                    dragOverId === dropId && 'bear-border-bear-500 bear-bg-bear-500/10'
                  )}
                >
                  {renderCard ? (
                    renderCard(card, col.id)
                  ) : (
                    <>
                      <div className="bear-font-medium bear-text-gray-900 dark:bear-text-white">{card.title}</div>
                      {card.description && (
                        <div className="bear-text-sm bear-text-gray-600 dark:bear-text-zinc-400 bear-mt-1">
                          {card.description}
                        </div>
                      )}
                      {card.meta && (
                        <div className="bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500 bear-mt-2">{card.meta}</div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
