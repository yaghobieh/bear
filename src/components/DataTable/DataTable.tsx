import { cn } from '../../utils/cn';
import type { DataTableColumn, DataTableProps } from './DataTable.types';

/**
 * DataTable - A flexible data table component
 * 
 * This is a wrapper that provides Bear styling. For more advanced features,
 * consider using @forgedevstack/grid-table directly.
 * 
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'name', header: 'Name', accessor: (row) => row.name },
 *     { key: 'email', header: 'Email', accessor: (row) => row.email },
 *     { key: 'status', header: 'Status', cell: (row) => <Badge>{row.status}</Badge> },
 *   ]}
 *   data={users}
 *   rowKey={(row) => row.id}
 * />
 * ```
 */
export const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  variant = 'simple',
  loading = false,
  emptyContent = 'No data available',
  onRowClick,
  clickable = false,
  sortColumn,
  sortDirection = 'asc',
  onSort,
  compact = false,
  stickyHeader = false,
  maxHeight,
  className,
  testId,
}: DataTableProps<T>) => {
  const handleSort = (columnKey: string) => {
    const column = columns.find((c) => c.key === columnKey);
    if (column?.sortable && onSort) {
      onSort(columnKey);
    }
  };

  const cellPadding = compact ? 'bear-px-3 bear-py-2' : 'bear-px-4 bear-py-3';
  const headerPadding = compact ? 'bear-px-3 bear-py-2' : 'bear-px-4 bear-py-3';

  return (
    <div
      className={cn(
        'bear-w-full bear-overflow-hidden bear-rounded-lg bear-border bear-border-gray-200 dark:bear-border-gray-700',
        className
      )}
      data-testid={testId}
    >
      <div
        className="bear-overflow-auto"
        style={{ maxHeight: maxHeight }}
      >
        <table className="bear-w-full bear-border-collapse bear-text-sm">
          <thead
            className={cn(
              'bear-bg-gray-50 dark:bear-bg-gray-800',
              stickyHeader && 'bear-sticky bear-top-0 bear-z-10'
            )}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    headerPadding,
                    'bear-text-left bear-font-semibold bear-text-gray-700 dark:bear-text-gray-200',
                    'bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
                    column.align === 'center' && 'bear-text-center',
                    column.align === 'right' && 'bear-text-right',
                    column.sortable && 'bear-cursor-pointer hover:bear-bg-gray-100 dark:hover:bear-bg-gray-700',
                    column.hideOnMobile && 'bear-hidden md:bear-table-cell'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="bear-flex bear-items-center bear-gap-1">
                    {column.header}
                    {column.sortable && sortColumn === column.key && (
                      <svg
                        className={cn(
                          'bear-w-4 bear-h-4 bear-transition-transform',
                          sortDirection === 'desc' && 'bear-rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bear-bg-white dark:bear-bg-gray-900">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="bear-py-12 bear-text-center">
                  <div className="bear-flex bear-justify-center">
                    <svg className="bear-animate-spin bear-w-6 bear-h-6 bear-text-amber-500" viewBox="0 0 24 24" fill="none">
                      <circle className="bear-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="bear-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="bear-py-12 bear-text-center bear-text-gray-500 dark:bear-text-gray-400">
                  {emptyContent}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={rowKey(row, index)}
                  onClick={() => (clickable || onRowClick) && onRowClick?.(row, index)}
                  className={cn(
                    variant === 'striped' && index % 2 === 1 && 'bear-bg-gray-50 dark:bear-bg-gray-800/50',
                    variant === 'bordered' && 'bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
                    (clickable || onRowClick) && 'bear-cursor-pointer hover:bear-bg-amber-50 dark:hover:bear-bg-amber-900/10',
                    variant !== 'bordered' && 'bear-border-b bear-border-gray-100 dark:bear-border-gray-800'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        cellPadding,
                        'bear-text-gray-900 dark:bear-text-white',
                        column.align === 'center' && 'bear-text-center',
                        column.align === 'right' && 'bear-text-right',
                        column.hideOnMobile && 'bear-hidden md:bear-table-cell'
                      )}
                    >
                      {column.cell
                        ? column.cell(row, index)
                        : column.accessor
                        ? column.accessor(row)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Type helper for creating columns
export const createColumns = <T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[]
): DataTableColumn<T>[] => columns;

