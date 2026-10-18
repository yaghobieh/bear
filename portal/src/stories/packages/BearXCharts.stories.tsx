import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, BearProvider, LineChart, PieChart } from '@forgedevstack/bear-x-charts';
import { Flex, Typography } from '@forgedevstack/bear';

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
    controls: { expanded: true },
    docs: {
      description: {
        component: 'BarChart and BearProvider from @forgedevstack/bear-x-charts. Styles come from @forgedevstack/bear/styles.css. Controls change the live props.',
      },
    },
  },
  args: {
    data: CHART_DATA,
    height: 180,
    showLabels: true,
    showValues: false,
    animated: true,
    stacked: false,
    motion: 'grow',
  },
  argTypes: {
    showLabels: { control: 'boolean' },
    showValues: { control: 'boolean' },
    animated: { control: 'boolean' },
    stacked: { control: 'boolean' },
    height: { control: 'number' },
    motion: { control: 'select', options: ['grow', 'fade', 'scale', 'none'] },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const FromPackage: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Typography variant="h5">@forgedevstack/bear-x-charts</Typography>
      <BarChart {...args} />
    </Flex>
  ),
};

export const WithThemeProvider: Story = {
  render: () => (
    <BearProvider defaultMode="dark">
      <BarChart data={CHART_DATA} height={180} showLabels motion="fade" />
    </BearProvider>
  ),
};

export const PolarArea: Story = {
  render: () => <PieChart data={CHART_DATA} height={180} pieView="rose" />,
};

export const AnimatedLine: Story = {
  render: () => <LineChart data={CHART_DATA} height={180} smooth showDots animated motion="grow" />,
};
