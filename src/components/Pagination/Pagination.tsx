import { FC, useState, useMemo } from 'react';
import { cn } from '@utils';
import type { PaginationProps } from './Pagination.types';
import type { BearSize, BearVariant } from '../../types';

// Icons
const ChevronLeftIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FirstPageIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="11 18 5 12 11 6" />
    <line x1="19" y1="6" x2="19" y2="18" />
  </svg>
);

const LastPageIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="13 18 19 12 13 6" />
    <line x1="5" y1="6" x2="5" y2="18" />
  </svg>
);

const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-h-6 bear-min-w-6 bear-text-xs',
  sm: 'bear-h-8 bear-min-w-8 bear-text-sm',
  md: 'bear-h-10 bear-min-w-10 bear-text-base',
  lg: 'bear-h-12 bear-min-w-12 bear-text-lg',
  xl: 'bear-h-14 bear-min-w-14 bear-text-xl',
};

const VARIANT_CLASSES: Record<string, (color: BearVariant, isActive: boolean) => string> = {
  text: (color, isActive) => cn(
    'bear-bg-transparent',
    isActive && color === 'primary' && 'bear-text-bear-600 bear-bg-bear-50 dark:bear-bg-bear-900/20',
    isActive && color === 'secondary' && 'bear-text-gray-600 bear-bg-gray-100 dark:bear-bg-gray-800',
    !isActive && 'hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800'
  ),
  outlined: (color, isActive) => cn(
    'bear-border',
    isActive && color === 'primary' && 'bear-border-bear-500 bear-text-bear-600 bear-bg-bear-50 dark:bear-bg-bear-900/20',
    isActive && color === 'secondary' && 'bear-border-gray-400 bear-text-gray-600 bear-bg-gray-100',
    !isActive && 'bear-border-gray-300 dark:bear-border-gray-600 hover:bear-bg-gray-50 dark:hover:bear-bg-gray-800'
  ),
  contained: (color, isActive) => cn(
    isActive && color === 'primary' && 'bear-bg-bear-500 bear-text-white',
    isActive && color === 'secondary' && 'bear-bg-gray-600 bear-text-white',
    !isActive && 'bear-bg-gray-100 dark:bear-bg-gray-800 hover:bear-bg-gray-200 dark:hover:bear-bg-gray-700'
  ),
};

const usePagination = (
  count: number,
  page: number,
  boundaryCount: number,
  siblingCount: number
): (number | 'ellipsis')[] => {
  return useMemo(() => {
    const range = (start: number, end: number) => 
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    const items: (number | 'ellipsis')[] = [];

    // Start pages
    items.push(...startPages);

    // Start ellipsis
    if (siblingsStart > boundaryCount + 2) {
      items.push('ellipsis');
    } else if (boundaryCount + 1 < count - boundaryCount) {
      items.push(boundaryCount + 1);
    }

    // Sibling pages
    items.push(...range(siblingsStart, siblingsEnd));

    // End ellipsis
    if (siblingsEnd < count - boundaryCount - 1) {
      items.push('ellipsis');
    } else if (count - boundaryCount > boundaryCount) {
      items.push(count - boundaryCount);
    }

    // End pages
    items.push(...endPages);

    // Remove duplicates and sort
    return [...new Set(items)].sort((a, b) => {
      if (a === 'ellipsis') return 0;
      if (b === 'ellipsis') return 0;
      return a - b;
    });
  }, [count, page, boundaryCount, siblingCount]);
};

/**
 * Pagination component for navigating through pages
 * 
 * @example
 * ```tsx
 * <Pagination count={10} page={1} onChange={(page) => console.log(page)} />
 * <Pagination count={20} variant="outlined" showFirstLast />
 * ```
 */
export const Pagination: FC<PaginationProps> = ({
  count,
  page: controlledPage,
  defaultPage = 1,
  boundaryCount = 1,
  siblingCount = 1,
  size = 'md',
  variant = 'text',
  color = 'primary',
  shape = 'circular',
  showFirstLast = false,
  showPrevNext = true,
  disabled = false,
  onChange,
  className,
  testId,
  ...props
}) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = controlledPage ?? internalPage;
  const items = usePagination(count, page, boundaryCount, siblingCount);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > count || disabled) return;
    setInternalPage(newPage);
    onChange?.(newPage);
  };

  const buttonClasses = cn(
    'bear-inline-flex bear-items-center bear-justify-center bear-transition-colors',
    'bear-cursor-pointer bear-select-none',
    shape === 'circular' ? 'bear-rounded-full' : 'bear-rounded-lg',
    SIZE_CLASSES[size],
    disabled && 'bear-opacity-50 bear-cursor-not-allowed'
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn('bear-flex bear-items-center bear-gap-1', className)}
      data-testid={testId}
      {...props}
    >
      {showFirstLast && (
        <button
          type="button"
          onClick={() => handlePageChange(1)}
          disabled={page === 1 || disabled}
          className={cn(buttonClasses, 'bear-text-gray-600 dark:bear-text-gray-400')}
          aria-label="First page"
        >
          <FirstPageIcon />
        </button>
      )}

      {showPrevNext && (
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || disabled}
          className={cn(buttonClasses, 'bear-text-gray-600 dark:bear-text-gray-400')}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {items.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(buttonClasses, 'bear-cursor-default bear-text-gray-400')}
            >
              ...
            </span>
          );
        }

        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            disabled={disabled}
            className={cn(
              buttonClasses,
              VARIANT_CLASSES[variant](color, isActive),
              'bear-text-gray-700 dark:bear-text-gray-300'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item}
          </button>
        );
      })}

      {showPrevNext && (
        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === count || disabled}
          className={cn(buttonClasses, 'bear-text-gray-600 dark:bear-text-gray-400')}
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>
      )}

      {showFirstLast && (
        <button
          type="button"
          onClick={() => handlePageChange(count)}
          disabled={page === count || disabled}
          className={cn(buttonClasses, 'bear-text-gray-600 dark:bear-text-gray-400')}
          aria-label="Last page"
        >
          <LastPageIcon />
        </button>
      )}
    </nav>
  );
};

export default Pagination;

