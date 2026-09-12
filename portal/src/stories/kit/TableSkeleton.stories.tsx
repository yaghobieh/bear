import type { Meta, StoryObj } from '@storybook/react';
import { TableSkeleton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TableSkeleton> = {
  title: 'Components/TableSkeleton',
  component: TableSkeleton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TableSkeleton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TableSkeleton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableSkeleton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <TableSkeleton {...args} />
      <TableSkeleton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TableSkeleton anywhere below.</Typography>
        <TableSkeleton {...args} />
        <TableSkeleton {...args} />
      </Flex>
    </BearProvider>
  ),
};
