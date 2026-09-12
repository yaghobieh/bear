import type { PropRow } from '@/components/PropsTable';
import type { ChartDataPoint } from '@forgedevstack/bear';

export const CHART_SAMPLE_DATA: ChartDataPoint[] = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 48 },
  { label: 'Jun', value: 75 },
];

export const CHART_PIE_DATA: ChartDataPoint[] = [
  { label: 'Design', value: 32 },
  { label: 'Build', value: 28 },
  { label: 'Ship', value: 22 },
  { label: 'Review', value: 18 },
];

export const CHART_STACKED_DATA: ChartDataPoint[] = [
  { label: 'Q1', value: 40, stacks: [12, 16, 12] },
  { label: 'Q2', value: 55, stacks: [18, 20, 17] },
  { label: 'Q3', value: 48, stacks: [14, 19, 15] },
  { label: 'Q4', value: 62, stacks: [20, 22, 20] },
];

export const CHART_RADAR_DATA: ChartDataPoint[] = [
  { label: 'Speed', value: 80 },
  { label: 'Quality', value: 65 },
  { label: 'UX', value: 90 },
  { label: 'A11y', value: 70 },
  { label: 'Docs', value: 55 },
];

export const CHART_FUNNEL_DATA: ChartDataPoint[] = [
  { label: 'Visit', value: 100 },
  { label: 'Signup', value: 64 },
  { label: 'Activate', value: 38 },
  { label: 'Pay', value: 18 },
];

export const CHART_BAR_HEIGHT = 200;
export const CHART_LINE_HEIGHT = 160;
export const CHART_PIE_HEIGHT = 180;
export const CHART_RADAR_HEIGHT = 240;
export const CHART_FUNNEL_HEIGHT = 220;

export const CHART_BAR_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

export default function App() {
  return <Chart type="bar" data={data} height={200} showLabels showValues />;
}
`;

export const CHART_STACKED_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Q1', value: 40, stacks: [12, 16, 12] },
  { label: 'Q2', value: 55, stacks: [18, 20, 17] },
];

export default function App() {
  return <Chart type="stacked" data={data} height={200} showLabels showValues />;
}
`;

export const CHART_LINE_CODE = `import { Chart, Flex } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Jun', value: 75 },
];

export default function App() {
  return (
    <Flex direction="column" gap={4}>
      <Chart type="line" data={data} height={160} showLabels />
      <Chart type="line" data={data} height={160} showLabels stepped />
    </Flex>
  );
}
`;

export const CHART_AREA_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Jun', value: 75 },
];

export default function App() {
  return <Chart type="area" data={data} height={200} showLabels />;
}
`;

export const CHART_PIE_CODE = `import { Chart, Flex } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Design', value: 32 },
  { label: 'Build', value: 28 },
  { label: 'Ship', value: 22 },
];

export default function App() {
  return (
    <Flex gap={6} wrap="wrap">
      <Chart type="pie" data={data} height={180} />
      <Chart type="pie" data={data} height={180} pieView="half" />
      <Chart type="pie" data={data} height={180} pieView="rose" explodeIndex={0} />
    </Flex>
  );
}
`;

export const CHART_DONUT_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Design', value: 32 },
  { label: 'Build', value: 28 },
];

export default function App() {
  return <Chart type="donut" data={data} height={180} />;
}
`;

export const CHART_RADAR_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Speed', value: 80 },
  { label: 'Quality', value: 65 },
  { label: 'UX', value: 90 },
];

export default function App() {
  return <Chart type="radar" data={data} height={240} showLabels />;
}
`;

export const CHART_FUNNEL_CODE = `import { Chart } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Visit', value: 100 },
  { label: 'Signup', value: 64 },
  { label: 'Pay', value: 18 },
];

export default function App() {
  return <Chart type="funnel" data={data} height={220} />;
}
`;

export const CHART_PROPS: PropRow[] = [
  { name: 'type', type: "'bar' | 'line' | 'area' | 'pie' | 'donut' | 'radar' | 'funnel' | 'stacked'", default: 'bar', description: 'Chart view' },
  { name: 'data', type: 'ChartDataPoint[]', description: 'Points with label, value, optional color and stacks' },
  { name: 'pieView', type: "'full' | 'half' | 'rose'", default: 'full', description: 'Pie / cake layout' },
  { name: 'explodeIndex', type: 'number', description: 'Pull one pie slice out' },
  { name: 'legendPosition', type: "'right' | 'bottom' | 'none'", default: 'right', description: 'Pie legend' },
  { name: 'stepped', type: 'boolean', default: 'false', description: 'Step path on line charts' },
  { name: 'stacked', type: 'boolean', default: 'false', description: 'Stack bar segments' },
  { name: 'height', type: 'number', default: '200', description: 'Height in pixels' },
];
