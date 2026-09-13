import type { Meta, StoryObj } from '@storybook/react';
import { StreamingMessage, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof StreamingMessage> = {
  title: 'Components/StreamingMessage',
  component: StreamingMessage,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'StreamingMessage from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse StreamingMessage anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isStreaming: false,
    live: false,
  },
  argTypes: {
    isStreaming: { control: 'boolean' },
    live: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof StreamingMessage>;

export const Basic: Story = {
  render: (args) => <StreamingMessage {...args} />,
};

export const Streaming: Story = {
  render: () => (
    <StreamingMessage content="Streaming tokens land here." isStreaming sender="assistant" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <StreamingMessage content="First reply." />
        <StreamingMessage content="Reuse below the same provider." isStreaming />
      </Flex>
    </BearProvider>
  ),
};
