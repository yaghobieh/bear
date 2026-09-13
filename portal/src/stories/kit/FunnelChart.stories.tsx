import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Chart, Flex, FunnelChart, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof FunnelChart> = {
  title: 'Components/Chart/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FunnelChart from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }], height: 180, showLabels: true,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FunnelChart>;

export const Basic: Story = {
  render: (args) => <FunnelChart {...args} />,
};
