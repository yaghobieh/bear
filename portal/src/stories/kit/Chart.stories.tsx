import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, BearProvider, Chart, Flex, FunnelChart, LineChart, PieChart, RadarChart, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Chart from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Chart anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { BarChart, LineChart, PieChart, RadarChart, FunnelChart },
  args: {
    height: 240,
    showLabels: true,
    showValues: true,
    animated: true,
    color: '#EA0A8E',
    showGrid: true,
    explodeIndex: 0,
    stepped: false,
    stacked: false,
    type: 'bar',
    motion: 'grow',
    pieView: 'full',
    data: [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 45 },
      { label: 'Mar', value: 28 },
      { label: 'Apr', value: 60 },
    ],
  },
  argTypes: {
    showLabels: { control: 'boolean' },
    showValues: { control: 'boolean' },
    animated: { control: 'boolean' },
    color: { control: 'color' },
    showGrid: { control: 'boolean' },
    stepped: { control: 'boolean' },
    stacked: { control: 'boolean' },
    type: { control: 'select', options: ['bar', 'line', 'area', 'pie', 'donut', 'radar', 'funnel', 'stacked'] },
    motion: { control: 'select', options: ['grow', 'fade', 'scale', 'none'] },
    pieView: { control: 'select', options: ['full', 'half', 'rose'] },
    legendPosition: { control: 'select', options: ['right', 'bottom', 'none'] },
    height: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Chart>;

export const Basic: Story = {
  args: {
    type: 'bar',
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }],
    height: 180,
    showLabels: true,
  },
  render: (args) => <Chart {...args} />,
};

export const Line: Story = {
  args: { type: 'line', height: 160 },
  render: (args) => <Chart {...args} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Chart type="bar" data={[{ label: 'A', value: 22 }, { label: 'B', value: 44 }]} height={140} showLabels />
        <Chart type="line" data={[{ label: 'A', value: 18 }, { label: 'B', value: 36 }]} height={140} showLabels />
      </Flex>
    </BearProvider>
  ),
};
