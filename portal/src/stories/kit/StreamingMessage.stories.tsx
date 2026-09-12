import type { Meta, StoryObj } from '@storybook/react';
import { StreamingMessage, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof StreamingMessage>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <StreamingMessage {...args}>
      <Typography>StreamingMessage</Typography>
    </StreamingMessage>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <StreamingMessage {...args}>
        <Typography>First</Typography>
      </StreamingMessage>
      <StreamingMessage>
        <Typography>Second</Typography>
      </StreamingMessage>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse StreamingMessage anywhere below.</Typography>
        <StreamingMessage {...args}>
          <Typography>First use</Typography>
        </StreamingMessage>
        <StreamingMessage>
          <Typography>Second use</Typography>
        </StreamingMessage>
      </Flex>
    </BearProvider>
  ),
};
