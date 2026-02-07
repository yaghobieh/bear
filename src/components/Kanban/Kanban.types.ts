import type { ReactNode } from 'react';

export interface KanbanCard {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
}

export interface KanbanColumn {
  id: string;
  title: ReactNode;
  cards: KanbanCard[];
}

export interface KanbanProps {
  columns: KanbanColumn[];
  onColumnsChange?: (columns: KanbanColumn[]) => void;
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string, fromIndex: number, toIndex: number) => void;
  renderCard?: (card: KanbanCard, columnId: string) => ReactNode;
  renderColumnHeader?: (column: KanbanColumn) => ReactNode;
  disabled?: boolean;
  className?: string;
}
