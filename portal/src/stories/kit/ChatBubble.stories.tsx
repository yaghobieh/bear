import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble, BearProvider, Flex } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

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
  args: {
    showTimestamp: true,
    showStatus: true,
    showAvatar: true,
  },
  argTypes: {
    showTimestamp: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    showAvatar: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

const BOT_MESSAGE: ChatMessage = {
  id: 'bot-1',
  content: 'Hello! How can I help you today?',
  sender: 'bot',
};

const USER_MESSAGE: ChatMessage = {
  id: 'user-1',
  content: 'Show me the Chart component.',
  sender: 'user',
  status: 'read',
};

export const Basic: Story = {
  args: {
    message: BOT_MESSAGE,
  },
  render: (args) => <ChatBubble {...args} />,
};

export const UserMessage: Story = {
  render: () => <ChatBubble message={USER_MESSAGE} showStatus showAvatar />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ChatBubble message={BOT_MESSAGE} />
        <ChatBubble message={USER_MESSAGE} showStatus />
      </Flex>
    </BearProvider>
  ),
};
