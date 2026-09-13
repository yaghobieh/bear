import type { Meta, StoryObj } from '@storybook/react';
import { Statistic, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Statistic> = {
  title: 'Components/Statistic',
  component: Statistic,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Statistic from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Statistic anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    loading: false,
    precision: 0,
    size: 'sm',
    variant: 'default',
  },
  argTypes: {
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'card', 'minimal'] },
  },
};

export default meta;

type Story = StoryObj<typeof Statistic>;

export const Basic: Story = {
  render: (args) => <Statistic {...args} />,
};

export const WithTrend: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      <Statistic title="Revenue" value={45678} prefix="$" trend={{ value: 12, isUpward: true }} variant="card" />
      <Statistic title="Orders" value={892} trend={{ value: 4, isUpward: false }} variant="card" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4}>
        <Statistic title="First" value={10} />
        <Statistic title="Reuse" value={20} />
      </Flex>
    </BearProvider>
  ),
};
