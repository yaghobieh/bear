import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteScroll, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Components/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'InfiniteScroll from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse InfiniteScroll anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfiniteScroll>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <InfiniteScroll {...args}>
      <Typography>InfiniteScroll</Typography>
    </InfiniteScroll>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <InfiniteScroll {...args}>
        <Typography>First</Typography>
      </InfiniteScroll>
      <InfiniteScroll>
        <Typography>Second</Typography>
      </InfiniteScroll>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse InfiniteScroll anywhere below.</Typography>
        <InfiniteScroll {...args}>
          <Typography>First use</Typography>
        </InfiniteScroll>
        <InfiniteScroll>
          <Typography>Second use</Typography>
        </InfiniteScroll>
      </Flex>
    </BearProvider>
  ),
};
