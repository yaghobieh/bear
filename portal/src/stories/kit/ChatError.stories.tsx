import type { Meta, StoryObj } from '@storybook/react';
import { ChatError, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ChatError> = {
  title: 'Components/ChatError',
  component: ChatError,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ChatError from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ChatError anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Request failed',
    title: 'Title',
  },
  argTypes: {
    onRetry: { action: 'onRetry' },
  },
};

export default meta;

type Story = StoryObj<typeof ChatError>;

export const Basic: Story = {
  render: (args) => <ChatError {...args} />,
};

export const WithRetry: Story = {
  render: () => (
    <ChatError title="Request failed" onRetry={() => undefined}>
      Try again
    </ChatError>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ChatError title="First">Timed out</ChatError>
        <ChatError title="Reuse">Same provider</ChatError>
      </Flex>
    </BearProvider>
  ),
};
