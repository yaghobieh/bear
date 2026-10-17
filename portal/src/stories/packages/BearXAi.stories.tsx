import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from '@forgedevstack/bear-x-ai';
import type { ChatMessage } from '@forgedevstack/bear-x-ai';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const MESSAGES: ChatMessage[] = [
  { id: '1', content: 'Hello. How can I help?', sender: 'bot' },
  { id: '2', content: 'Show me the Bear X chat package.', sender: 'user', status: 'read' },
];

const meta: Meta<typeof Chat> = {
  title: 'Packages/Bear X AI/Chat',
  component: Chat,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chat from @forgedevstack/bear-x-ai. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/bear-x-ai</Typography>
        <Chat messages={MESSAGES} onSend={() => undefined} height={280} />
      </Flex>
    </BearProvider>
  ),
};
