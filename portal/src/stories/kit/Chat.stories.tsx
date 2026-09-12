import type { Meta, StoryObj } from '@storybook/react';
import { Chat, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Chat from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Chat anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Chat {...args}>
      <Typography>Chat</Typography>
    </Chat>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Chat {...args}>
        <Typography>First</Typography>
      </Chat>
      <Chat>
        <Typography>Second</Typography>
      </Chat>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Chat anywhere below.</Typography>
        <Chat {...args}>
          <Typography>First use</Typography>
        </Chat>
        <Chat>
          <Typography>Second use</Typography>
        </Chat>
      </Flex>
    </BearProvider>
  ),
};
