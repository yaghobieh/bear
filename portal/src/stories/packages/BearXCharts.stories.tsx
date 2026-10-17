import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from '@forgedevstack/bear-x-charts';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const CHART_DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

const meta: Meta<typeof BarChart> = {
  title: 'Packages/Bear X Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'BarChart from @forgedevstack/bear-x-charts. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/bear-x-charts</Typography>
        <BarChart data={CHART_DATA} height={180} showLabels />
      </Flex>
    </BearProvider>
  ),
};
