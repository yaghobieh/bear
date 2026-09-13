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
  },
  argTypes: {
    showLabels: { control: 'boolean' },
    showValues: { control: 'boolean' },
    animated: { control: 'boolean' },
    color: { control: 'color' },
    showGrid: { control: 'boolean' },
    stepped: { control: 'boolean' },
    stacked: { control: 'boolean' },
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
  render: () => (
    <Chart type="line" data={[{ label: 'A', value: 20 }, { label: 'B', value: 48 }]} height={160} showLabels />
  ),
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
