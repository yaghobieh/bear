import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof VirtualList> = {
  title: 'Components/VirtualList',
  component: VirtualList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'VirtualList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse VirtualList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof VirtualList>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <VirtualList {...args}>
      <Typography>VirtualList</Typography>
    </VirtualList>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <VirtualList {...args}>
        <Typography>First</Typography>
      </VirtualList>
      <VirtualList>
        <Typography>Second</Typography>
      </VirtualList>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse VirtualList anywhere below.</Typography>
        <VirtualList {...args}>
          <Typography>First use</Typography>
        </VirtualList>
        <VirtualList>
          <Typography>Second use</Typography>
        </VirtualList>
      </Flex>
    </BearProvider>
  ),
};
