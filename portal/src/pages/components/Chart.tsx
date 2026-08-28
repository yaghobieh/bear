import { Chart, Flex } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const SAMPLE_DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 48 },
  { label: 'Jun', value: 75 },
];

const PIE_DATA = [
  { label: 'Design', value: 32 },
  { label: 'Build', value: 28 },
  { label: 'Ship', value: 22 },
  { label: 'Review', value: 18 },
];

const STACKED_DATA = [
  { label: 'Q1', value: 40, stacks: [12, 16, 12] },
  { label: 'Q2', value: 55, stacks: [18, 20, 17] },
  { label: 'Q3', value: 48, stacks: [14, 19, 15] },
  { label: 'Q4', value: 62, stacks: [20, 22, 20] },
];

const RADAR_DATA = [
  { label: 'Speed', value: 80 },
  { label: 'Quality', value: 65 },
  { label: 'UX', value: 90 },
  { label: 'A11y', value: 70 },
  { label: 'Docs', value: 55 },
];

const FUNNEL_DATA = [
  { label: 'Visit', value: 100 },
  { label: 'Signup', value: 64 },
  { label: 'Activate', value: 38 },
  { label: 'Pay', value: 18 },
];

const ChartPage = () => (
  <DocPage title="Chart" description="Bar, line, area, pie, donut, radar, funnel, and stacked views." componentName="Chart">
    <ComponentPreview title="Bar" description="Vertical columns with labels and values." code={`<Chart type="bar" data={data} showLabels showValues />`}>
      <Chart type="bar" data={SAMPLE_DATA} height={200} showLabels showValues />
    </ComponentPreview>

    <ComponentPreview title="Stacked" description="Each category is a stack of segments." code={`<Chart type="stacked" data={data} />`}>
      <Chart type="stacked" data={STACKED_DATA} height={200} showLabels showValues />
    </ComponentPreview>

    <ComponentPreview title="Line and stepped" description="Smooth line or stepped path." code={`<Chart type="line" data={data} />
<Chart type="line" data={data} stepped />`}>
      <Flex direction="column" gap={4} className="w-full">
        <Chart type="line" data={SAMPLE_DATA} height={160} showLabels />
        <Chart type="line" data={SAMPLE_DATA} height={160} showLabels stepped />
      </Flex>
    </ComponentPreview>

    <ComponentPreview title="Area" description="Filled line chart." code={`<Chart type="area" data={data} />`}>
      <Chart type="area" data={SAMPLE_DATA} height={200} showLabels />
    </ComponentPreview>

    <ComponentPreview title="Pie, half, and rose" description="Full pie, half cake, exploded slice, and rose radii." code={`<Chart type="pie" data={data} />
<Chart type="pie" data={data} pieView="half" />
<Chart type="pie" data={data} pieView="rose" explodeIndex={0} />`}>
      <Flex gap={6} wrap="wrap" justify="center">
        <Chart type="pie" data={PIE_DATA} height={180} />
        <Chart type="pie" data={PIE_DATA} height={180} pieView="half" />
        <Chart type="pie" data={PIE_DATA} height={180} pieView="rose" explodeIndex={0} />
      </Flex>
    </ComponentPreview>

    <ComponentPreview title="Donut" description="Pie with an inner hole." code={`<Chart type="donut" data={data} />`}>
      <Chart type="donut" data={PIE_DATA} height={180} />
    </ComponentPreview>

    <ComponentPreview title="Radar" description="Polygon on equal axes." code={`<Chart type="radar" data={data} />`}>
      <Chart type="radar" data={RADAR_DATA} height={240} showLabels />
    </ComponentPreview>

    <ComponentPreview title="Funnel" description="Stage widths follow value." code={`<Chart type="funnel" data={data} />`}>
      <Chart type="funnel" data={FUNNEL_DATA} height={220} />
    </ComponentPreview>

    <PropsTable
      title="Props"
      rows={[
        { name: 'type', type: "'bar' | 'line' | 'area' | 'pie' | 'donut' | 'radar' | 'funnel' | 'stacked'", description: 'Chart view' },
        { name: 'data', type: 'ChartDataPoint[]', description: 'Points with label, value, optional color and stacks' },
        { name: 'pieView', type: "'full' | 'half' | 'rose'", default: 'full', description: 'Pie / cake layout' },
        { name: 'explodeIndex', type: 'number', description: 'Pull one pie slice out' },
        { name: 'legendPosition', type: "'right' | 'bottom' | 'none'", default: 'right', description: 'Pie legend' },
        { name: 'stepped', type: 'boolean', default: 'false', description: 'Step path on line charts' },
        { name: 'stacked', type: 'boolean', default: 'false', description: 'Stack bar segments' },
        { name: 'height', type: 'number', default: '200', description: 'Height in pixels' },
      ]}
    />
  </DocPage>
);

export default ChartPage;
