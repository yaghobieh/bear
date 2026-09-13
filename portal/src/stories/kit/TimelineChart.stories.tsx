import type { Meta, StoryObj } from '@storybook/react';
import { TimelineChart, BearProvider, Flex } from '@forgedevstack/bear';
import type { TimelineChartItem } from '@forgedevstack/bear';

const meta: Meta<typeof TimelineChart> = {
  title: 'Components/TimelineChart',
  component: TimelineChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TimelineChart from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TimelineChart anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    barHeight: 16,
    barGap: 2,
    showAxis: true,
    axisTicks: 0,
    variant: 'bars',
  },
  argTypes: {
    showAxis: { control: 'boolean' },
    onItemClick: { action: 'onItemClick' },
    variant: { control: 'select', options: ['bars', 'points'] },
  },
};

export default meta;

type Story = StoryObj<typeof TimelineChart>;

const ITEMS: TimelineChartItem[] = [
  { label: 'Research', start: 0, end: 28 },
  { label: 'Build', start: 20, end: 64 },
  { label: 'Ship', start: 56, end: 88 },
];

const POINTS: TimelineChartItem[] = [
  { label: 'Kickoff', start: 8, end: 16 },
  { label: 'Review', start: 40, end: 52 },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
    min: 0,
    max: 100,
    showAxis: true,
  },
  render: (args) => <TimelineChart {...args} />,
};

export const Points: Story = {
  render: () => <TimelineChart items={POINTS} min={0} max={80} variant="points" showAxis />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TimelineChart items={ITEMS} min={0} max={100} showAxis />
        <TimelineChart items={POINTS} min={0} max={80} variant="points" showAxis />
      </Flex>
    </BearProvider>
  ),
};
