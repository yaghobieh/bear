import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Chart, Flex, RadarChart, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/Chart/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RadarChart from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }], height: 180, showLabels: true,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RadarChart>;

export const Basic: Story = {
  render: (args) => <RadarChart {...args} />,
};
