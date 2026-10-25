import type { BearGridColumn } from './BearGrid.types';

export const usesBearGridPro = <T>(columns: BearGridColumn<T>[], groupBy?: string, excelExport?: boolean): boolean =>
  Boolean(groupBy || excelExport || columns.some((column) => column.pinned));

export const orderColumns = <T>(columns: BearGridColumn<T>[]): BearGridColumn<T>[] => {
  const left = columns.filter((column) => column.pinned === 'left');
  const middle = columns.filter((column) => !column.pinned);
  const right = columns.filter((column) => column.pinned === 'right');
  return [...left, ...middle, ...right];
};

export const cellText = <T>(column: BearGridColumn<T>, row: T): string => {
  if (column.value) return String(column.value(row));
  const raw = row[column.key as keyof T];
  if (typeof raw === 'string' || typeof raw === 'number') return String(raw);
  return '';
};

export const toCsv = <T>(columns: BearGridColumn<T>[], rows: T[]): string => {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const header = columns.map((column) => escape(column.key)).join(',');
  const body = rows.map((row) => columns.map((column) => escape(cellText(column, row))).join(','));
  return [header, ...body].join('\n');
};

export const groupLabels = <T extends Record<string, unknown>>(rows: T[], groupBy: string): string[] => {
  const labels: string[] = [];
  rows.forEach((row) => {
    const label = String(row[groupBy] ?? '');
    if (!labels.includes(label)) labels.push(label);
  });
  return labels;
};

export const downloadCsv = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
