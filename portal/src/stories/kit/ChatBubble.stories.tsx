import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ChatBubble from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ChatBubble anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ChatBubble {...args}>
      <Typography>ChatBubble</Typography>
    </ChatBubble>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ChatBubble {...args}>
        <Typography>First</Typography>
      </ChatBubble>
      <ChatBubble>
        <Typography>Second</Typography>
      </ChatBubble>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ChatBubble anywhere below.</Typography>
        <ChatBubble {...args}>
          <Typography>First use</Typography>
        </ChatBubble>
        <ChatBubble>
          <Typography>Second use</Typography>
        </ChatBubble>
      </Flex>
    </BearProvider>
  ),
};
