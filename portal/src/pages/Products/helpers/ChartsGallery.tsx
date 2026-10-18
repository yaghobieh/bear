import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, FunnelChart, LineChart, PieChart, RadarChart } from '@forgedevstack/bear-x-charts';
import { Flex, Typography, useBear } from '@forgedevstack/bear';

const DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

const STACKED = [
  { label: 'Jan', value: 30, stacks: [12, 18] },
  { label: 'Feb', value: 45, stacks: [20, 25] },
  { label: 'Mar', value: 28, stacks: [10, 18] },
];

const CHART_LINKS = [
  { path: '/components/bar-chart', title: 'Bar', node: <BarChart data={DATA} height={160} showLabels /> },
  { path: '/components/stacked-chart', title: 'Stacked', node: <BarChart data={STACKED} height={160} stacked showLabels /> },
  { path: '/components/line-chart', title: 'Line', node: <LineChart data={DATA} height={160} showDots smooth animated /> },
  { path: '/components/area-chart', title: 'Area', node: <LineChart data={DATA} height={160} fill animated /> },
  { path: '/components/pie-chart', title: 'Pie', node: <PieChart data={DATA} height={160} /> },
  { path: '/components/polar-chart', title: 'Polar area', node: <PieChart data={DATA} height={160} pieView="rose" /> },
  { path: '/components/donut-chart', title: 'Donut', node: <PieChart data={DATA} height={160} innerRadius={36} /> },
  { path: '/components/radar-chart', title: 'Radar', node: <RadarChart data={DATA} height={160} /> },
  { path: '/components/funnel-chart', title: 'Funnel', node: <FunnelChart data={DATA} height={160} /> },
];

export const ChartsGallery: FC = () => {
  const { mode } = useBear();

  return (
    <Flex direction="column" gap={4}>
      <Typography variant="body2">
        Theme mode from BearProvider: {mode}. Line color uses the primary token. Open a chart for its props, live effect, Storybook, and Sandbox.
      </Typography>
      <Flex wrap="wrap" gap={3}>
        {CHART_LINKS.map((chart) => (
          <Link
            key={chart.path}
            to={chart.path}
            className="min-w-[220px] flex-1 rounded-lg border border-gray-200 p-3 transition-colors duration-200 hover:border-pink-400 dark:border-gray-700"
          >
            <Typography variant="caption" className="mb-2 block font-semibold">{chart.title}</Typography>
            {chart.node}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
