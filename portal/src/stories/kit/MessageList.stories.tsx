import type { Meta, StoryObj } from '@storybook/react';
import { MessageList, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof MessageList> = {
  title: 'Components/MessageList',
  component: MessageList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MessageList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MessageList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MessageList>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <MessageList {...args}>
      <Typography>MessageList</Typography>
    </MessageList>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <MessageList {...args}>
        <Typography>First</Typography>
      </MessageList>
      <MessageList>
        <Typography>Second</Typography>
      </MessageList>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse MessageList anywhere below.</Typography>
        <MessageList {...args}>
          <Typography>First use</Typography>
        </MessageList>
        <MessageList>
          <Typography>Second use</Typography>
        </MessageList>
      </Flex>
    </BearProvider>
  ),
};
