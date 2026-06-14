import { FC } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import type { ComparisonRow } from './ComparisonSection.types';
import {
  COMPARISON_DATA,
  COMPARISON_GRID_TABLE_URL,
  COMPARISON_GRID_TABLE_LABEL,
  COMPARISON_FEATURE_COLUMN_WIDTH,
  COMPARISON_STATUS_COLUMN_WIDTH,
  COMPARISON_HEADER_BEAR_CLASSES,
} from './ComparisonSection.const';
import { renderComparisonStatus, getComparisonRowId } from './ComparisonSection.utils';

const COMPARISON_COLUMNS: ColumnDefinition<ComparisonRow>[] = [
  { id: 'feature', accessor: 'feature', header: 'Feature', width: COMPARISON_FEATURE_COLUMN_WIDTH },
  { id: 'bearUI', accessor: 'bearUI', header: 'Bear UI', align: 'center', width: COMPARISON_STATUS_COLUMN_WIDTH, render: renderComparisonStatus, headerClassName: COMPARISON_HEADER_BEAR_CLASSES },
  { id: 'others', accessor: 'others', header: 'Others', align: 'center', width: COMPARISON_STATUS_COLUMN_WIDTH, render: renderComparisonStatus },
];

export const ComparisonSection: FC = () => (
  <section className="mb-14 md:mb-20">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">How Bear UI compares</h2>
    <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
      Features that come built-in vs what you typically need to add yourself with other libraries.
    </p>
    <div className="max-w-2xl mx-auto grid-table-wrapper">
      <GridTable<ComparisonRow>
        data={COMPARISON_DATA}
        columns={COMPARISON_COLUMNS}
        getRowId={getComparisonRowId}
        showPagination={false}
      />
    </div>
    <p className="text-center text-xs text-gray-400 mt-3">
      Table powered by{' '}
      <a
        href={COMPARISON_GRID_TABLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:underline"
      >
        {COMPARISON_GRID_TABLE_LABEL}
      </a>
    </p>
  </section>
);

export default ComparisonSection;
