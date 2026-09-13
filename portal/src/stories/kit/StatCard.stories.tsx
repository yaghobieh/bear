import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'StatCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse StatCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    color: '#EA0A8E',
  },
  argTypes: {
    color: { control: 'color' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Basic: Story = {
  render: (args) => <StatCard {...args} />,
};

export const Clickable: Story = {
  render: () => (
    <Flex gap={3} wrap="wrap">
      <StatCard title="Users" value="1.2k" />
      <StatCard title="Revenue" value="$48k" color="#8b5cf6" onClick={() => undefined} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <StatCard title="Users" value="1.2k" />
        <StatCard title="Sessions" value="8.4k" />
      </Flex>
    </BearProvider>
  ),
};
