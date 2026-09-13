import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Chart, Flex, LineChart, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'LineChart from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    fill: false,
    strokeWidth: 320,
    showDots: true,
    smooth: false,
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }],
    height: 180,
    showLabels: true,
  },
  argTypes: {
    fill: { control: 'boolean' },
    showDots: { control: 'boolean' },
    smooth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Basic: Story = {
  render: (args) => <LineChart {...args} />,
};
