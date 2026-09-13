import type { Meta, StoryObj } from '@storybook/react';
import { ThinkingBlock, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof ThinkingBlock> = {
  title: 'Components/ThinkingBlock',
  component: ThinkingBlock,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ThinkingBlock from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ThinkingBlock anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'The model is considering the next step.',
    title: 'Title',
    defaultOpen: false,
    open: false,
    isStreaming: false,
  },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    isStreaming: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ThinkingBlock>;

export const Basic: Story = {
  render: (args) => <ThinkingBlock {...args} />,
};

export const Streaming: Story = {
  render: () => (
    <ThinkingBlock title="Reasoning" defaultOpen isStreaming>
      Comparing Chart and the component catalog.
    </ThinkingBlock>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ThinkingBlock defaultOpen>First thought.</ThinkingBlock>
        <ThinkingBlock title="Reuse" defaultOpen>
          Same provider
        </ThinkingBlock>
      </Flex>
    </BearProvider>
  ),
};
