import type { ChartProps, ChartType } from './Chart.types';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { RadarChart } from './RadarChart';
import { FunnelChart } from './FunnelChart';
import { CHART, CHART_TYPES } from './Chart.const';

const CHART_RENDERERS: Record<ChartType, (props: Omit<ChartProps, 'type'>) => JSX.Element> = {
  [CHART_TYPES.BAR]: (chartProps) => <BarChart {...chartProps} />,
  [CHART_TYPES.STACKED]: (chartProps) => <BarChart {...chartProps} stacked />,
  [CHART_TYPES.LINE]: (chartProps) => <LineChart {...chartProps} />,
  [CHART_TYPES.AREA]: (chartProps) => <LineChart {...chartProps} fill />,
  [CHART_TYPES.PIE]: (chartProps) => <PieChart {...chartProps} />,
  [CHART_TYPES.DONUT]: (chartProps) => <PieChart {...chartProps} innerRadius={CHART.DEFAULT_INNER_RADIUS} />,
  [CHART_TYPES.RADAR]: (chartProps) => <RadarChart {...chartProps} />,
  [CHART_TYPES.FUNNEL]: (chartProps) => <FunnelChart {...chartProps} />,
};

export const Chart = (props: ChartProps) => {
  const { type, ...chartProps } = props;
  const render = CHART_RENDERERS[type] ?? CHART_RENDERERS[CHART_TYPES.BAR];
  return render(chartProps);
};
