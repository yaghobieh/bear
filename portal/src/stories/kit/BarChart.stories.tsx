import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, BearProvider, Chart, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BarChart from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    orientation: 'vertical',
    barRadius: 0,
    barGap: 2,
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }],
    height: 180,
    showLabels: true,
  },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Basic: Story = {
  render: (args) => <BarChart {...args} />,
};
