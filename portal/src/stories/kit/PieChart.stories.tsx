import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Chart, Flex, PieChart, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof PieChart> = {
  title: 'Components/Chart/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PieChart from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    innerRadius: 0,
    startAngle: 0,
    padAngle: 0,
    showSliceTooltip: true,
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }],
    height: 180,
    showLabels: true,
  },
  argTypes: {
    onSliceClick: { action: 'onSliceClick' },
    onSliceHover: { action: 'onSliceHover' },
    showSliceTooltip: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PieChart>;

export const Basic: Story = {
  render: (args) => <PieChart {...args} />,
};
