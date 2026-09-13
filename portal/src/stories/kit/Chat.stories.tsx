import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Chat, BearProvider, Flex } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

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
  args: {
    isLoading: false,
    isStreaming: false,
    isTyping: false,
    placeholder: 'Type here',
    showTimestamps: true,
    showStatus: true,
    showAvatars: true,
    height: 240,
    disabled: false,
    allowAttach: true,
    errorMessage: 'Try again',
  },
  argTypes: {
    onSend: { action: 'onSend' },
    onStop: { action: 'onStop' },
    onAttach: { action: 'onAttach' },
    isLoading: { control: 'boolean' },
    isStreaming: { control: 'boolean' },
    isTyping: { control: 'boolean' },
    showTimestamps: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    showAvatars: { control: 'boolean' },
    disabled: { control: 'boolean' },
    allowAttach: { control: 'boolean' },
    onSuggestionSelect: { action: 'onSuggestionSelect' },
    onRetry: { action: 'onRetry' },
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', content: 'Hello! How can I help you today?', sender: 'bot' },
  { id: '2', content: 'Hi! I need help with the Chat component.', sender: 'user', status: 'read' },
  { id: '3', content: 'Of course! The Chat component provides a full-featured chat interface.', sender: 'bot' },
];

const SUPPORT_MESSAGES: ChatMessage[] = [
  { id: 's1', content: 'Welcome to support.', sender: 'system' },
  { id: 's2', content: 'I cannot sign in.', sender: 'user', status: 'delivered' },
  { id: 's3', content: 'Reset the password from the account page.', sender: 'bot' },
];

export const Basic: Story = {
  args: {
    messages: INITIAL_MESSAGES,
  },
  render: (args) => <Chat {...args} />,
};

export const Typing: Story = {
  render: () => (
    <Chat
      messages={SUPPORT_MESSAGES}
      onSend={() => undefined}
      isTyping
      showAvatars
      showStatus
      height={360}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Chat messages={INITIAL_MESSAGES} onSend={() => undefined} height={280} />
        <Chat messages={SUPPORT_MESSAGES} onSend={() => undefined} height={280} />
      </Flex>
    </BearProvider>
  ),
};
