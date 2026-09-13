import type { Meta, StoryObj } from '@storybook/react';
import { TableSkeleton, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    rows: 0,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TableSkeleton>;

export const Basic: Story = {
  render: (args) => <TableSkeleton {...args} />,
};

export const Compact: Story = {
  render: () => <TableSkeleton rows={3} columns={3} animation="wave" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TableSkeleton rows={3} columns={4} />
        <TableSkeleton rows={2} columns={2} animation="none" />
      </Flex>
    </BearProvider>
  ),
};
