import { useEffect, useMemo, useState } from 'react';
import { hasBearPro, warnBearPro } from '../../../src/license';
import { BearProMark } from '../../../src/license/BearProMark';
import { resolveBearId } from '../../../src/utils/generateBearId.utils';
import { useBearId } from '../../../src/utils/useBearId';
import { BEAR_GRID_TEXT, CSV_FILENAME } from './BearGrid.const';
import type { BearGridColumn, BearGridProps } from './BearGrid.types';
import { cellText, downloadCsv, groupLabels, orderColumns, toCsv, usesBearGridPro } from './BearGrid.utils';

const alignClass = (align?: BearGridColumn<unknown>['align']): string => {
  if (align === 'center') return 'bear-text-center';
  if (align === 'right') return 'bear-text-right';
  return 'bear-text-left';
};

export const BearGrid = <T extends Record<string, unknown>>({
  id,
  testId,
  columns,
  data,
  rowKey,
  groupBy,
  excelExport = false,
  licenseKey,
  stickyHeader = true,
  compact = false,
  className,
  translations,
}: BearGridProps<T>) => {
  const generatedId = useBearId('BearGrid');
  const gridId = resolveBearId(id, generatedId);
  const text = { ...BEAR_GRID_TEXT, ...translations };
  const pro = hasBearPro({ licenseKey });
  const paid = usesBearGridPro(columns, groupBy, excelExport);
  const ordered = useMemo(() => orderColumns(columns), [columns]);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (paid && !pro) warnBearPro();
  }, [paid, pro]);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const column = ordered.find((item) => item.key === sortKey);
    if (!column) return data;
    const next = [...data].sort((left, right) => cellText(column, left).localeCompare(cellText(column, right)));
    return sortDirection === 'asc' ? next : next.reverse();
  }, [data, ordered, sortDirection, sortKey]);

  const labels = groupBy ? groupLabels(sorted, groupBy) : [];
  const pad = compact ? 'bear-px-3 bear-py-2' : 'bear-px-4 bear-py-3';

  const onHeader = (column: BearGridColumn<T>) => {
    if (!column.sortable) return;
    if (sortKey === column.key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(column.key);
    setSortDirection('asc');
  };

  const onExport = () => downloadCsv(toCsv(ordered, sorted), CSV_FILENAME);

  const renderRow = (row: T, index: number) => (
    <tr key={rowKey(row, index)} className="bear-border-b bear-border-gray-100 dark:bear-border-gray-800">
      {ordered.map((column) => (
        <td
          key={column.key}
          className={`${pad} bear-text-gray-900 dark:bear-text-white ${alignClass(column.align)}`}
          style={column.pinned ? { position: 'sticky', [column.pinned]: 0, background: 'inherit' } : { width: column.width }}
        >
          {column.cell ? column.cell(row, index) : column.accessor ? column.accessor(row) : cellText(column, row)}
        </td>
      ))}
    </tr>
  );

  return (
    <BearProMark active={paid && !pro} label={text.proLabel}>
      <div id={gridId} data-testid={testId} className={`Bear-BearGrid bear-w-full bear-overflow-hidden bear-rounded-lg bear-border bear-border-gray-200 dark:bear-border-gray-700 ${className ?? ''}`}>
        {excelExport ? (
          <div className="bear-flex bear-justify-end bear-p-2">
            <button type="button" className="Bear-BearGrid__export bear-text-sm bear-font-medium bear-text-pink-600" onClick={onExport}>
              {text.exportLabel}
            </button>
          </div>
        ) : null}
        <div className="bear-overflow-auto">
          <table className="bear-w-full bear-border-collapse bear-text-sm">
            <thead className={stickyHeader ? 'bear-sticky bear-top-0 bear-z-10 bear-bg-gray-50 dark:bear-bg-gray-800' : 'bear-bg-gray-50 dark:bear-bg-gray-800'}>
              <tr>
                {ordered.map((column) => (
                  <th
                    key={column.key}
                    className={`${pad} bear-font-semibold bear-text-gray-700 dark:bear-text-gray-200 bear-border-b bear-border-gray-200 dark:bear-border-gray-700 ${alignClass(column.align)} ${column.sortable ? 'bear-cursor-pointer' : ''}`}
                    style={column.pinned ? { position: 'sticky', [column.pinned]: 0 } : { width: column.width }}
                    onClick={() => onHeader(column)}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bear-bg-white dark:bear-bg-gray-900">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={ordered.length} className="bear-py-12 bear-text-center bear-text-gray-500">{text.empty}</td>
                </tr>
              ) : null}
              {labels.length === 0
                ? sorted.map(renderRow)
                : labels.flatMap((label) => [
                  <tr key={`group-${label}`}>
                    <td colSpan={ordered.length} className="bear-px-4 bear-py-2 bear-font-semibold bear-bg-gray-50 dark:bear-bg-gray-800">{label}</td>
                  </tr>,
                  ...sorted.filter((row) => String(row[groupBy as keyof T] ?? '') === label).map(renderRow),
                ])}
            </tbody>
          </table>
        </div>
      </div>
    </BearProMark>
  );
};
