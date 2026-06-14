import { cn, resolveBearId, useBearId } from '@utils';
import { Skeleton } from '../Skeleton';
import type { TableSkeletonProps } from './TableSkeleton.types';
import {
  TABLE_SKELETON_CELL_GAP_PX,
  TABLE_SKELETON_DEFAULT_COLUMNS,
  TABLE_SKELETON_DEFAULT_ROWS,
  TABLE_SKELETON_HEADER_HEIGHT_PX,
  TABLE_SKELETON_ROOT_CLASS,
  TABLE_SKELETON_ROW_HEIGHT_PX,
} from './TableSkeleton.const';

export const TableSkeleton = ({
  rows = TABLE_SKELETON_DEFAULT_ROWS,
  columns = TABLE_SKELETON_DEFAULT_COLUMNS,
  animation = 'pulse',
  id,
  testId,
  className,
}: TableSkeletonProps) => {
  const generatedId = useBearId('TableSkeleton');
  const domId = resolveBearId(id, generatedId);

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn(
        TABLE_SKELETON_ROOT_CLASS,
        'bear-w-full bear-rounded-lg bear-border bear-border-[var(--bear-border-default)] bear-overflow-hidden',
        className
      )}
    >
      <div
        className="Bear-TableSkeleton__header bear-flex bear-gap-2 bear-px-4 bear-border-b bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)]"
        style={{ height: TABLE_SKELETON_HEADER_HEIGHT_PX, gap: TABLE_SKELETON_CELL_GAP_PX }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} animation={animation} height={16} className="bear-flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="Bear-TableSkeleton__row bear-flex bear-items-center bear-px-4 bear-border-b bear-border-[var(--bear-border-subtle)]"
          style={{ height: TABLE_SKELETON_ROW_HEIGHT_PX, gap: TABLE_SKELETON_CELL_GAP_PX }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} animation={animation} height={14} className="bear-flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};
