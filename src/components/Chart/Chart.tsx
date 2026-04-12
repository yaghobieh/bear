import { FC } from 'react';
import type { ChartProps } from './Chart.types';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { CHART, CHART_TYPES } from './Chart.const';

/**
 * Main Chart Component
 */
export const Chart: FC<ChartProps> = ({ type, ...props }) => {
  switch (type) {
    case CHART_TYPES.BAR:
      return <BarChart {...props} />;
    case CHART_TYPES.LINE:
    case CHART_TYPES.AREA:
      return <LineChart {...props} fill={type === CHART_TYPES.AREA} />;
    case CHART_TYPES.PIE:
      return <PieChart {...props} />;
    case CHART_TYPES.DONUT:
      return <PieChart {...props} innerRadius={CHART.DEFAULT_INNER_RADIUS} />;
    default:
      return <BarChart {...props} />;
  }
};

