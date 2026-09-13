import type { Meta, StoryObj } from '@storybook/react';
import { Heatmap, BearProvider, Flex } from '@forgedevstack/bear';
import type { HeatmapCell } from '@forgedevstack/bear';

const meta: Meta<typeof Heatmap> = {
  title: 'Components/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Heatmap from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Heatmap anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    cellSize: 12,
    cellGap: 2,
    showDayLabels: true,
    showMonthLabels: true,
    cellShape: 'square',
  },
  argTypes: {
    colorScale: { control: 'color' },
    showDayLabels: { control: 'boolean' },
    showMonthLabels: { control: 'boolean' },
    emptyColor: { control: 'color' },
    onCellClick: { action: 'onCellClick' },
    cellShape: { control: 'select', options: ['square', 'circle'] },
  },
};

export default meta;

type Story = StoryObj<typeof Heatmap>;

const DATA: HeatmapCell[] = [
  { date: '2026-08-01', value: 1 },
  { date: '2026-08-05', value: 4 },
  { date: '2026-08-12', value: 8 },
  { date: '2026-08-20', value: 2 },
  { date: '2026-08-28', value: 6 },
  { date: '2026-09-02', value: 3 },
  { date: '2026-09-08', value: 9 },
  { date: '2026-09-12', value: 5 },
];

export const Basic: Story = {
  args: {
    data: DATA,
  },
  render: (args) => <Heatmap {...args} />,
};

export const Circles: Story = {
  render: () => (
    <Heatmap
      data={DATA}
      startDate="2026-08-01"
      endDate="2026-09-12"
      cellShape="circle"
      colorScale={['#fef2f2', '#fca5a5', '#ef4444', '#b91c1c', '#7f1d1d']}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Heatmap data={DATA} startDate="2026-08-01" endDate="2026-09-12" />
        <Heatmap data={DATA} startDate="2026-08-01" endDate="2026-09-12" cellShape="circle" />
      </Flex>
    </BearProvider>
  ),
};
