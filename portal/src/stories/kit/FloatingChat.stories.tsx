import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FloatingChat, BearProvider } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

const meta: Meta<typeof FloatingChat> = {
  title: 'Components/FloatingChat',
  component: FloatingChat,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FloatingChat from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FloatingChat anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isLoading: false,
    isStreaming: false,
    isTyping: false,
    title: 'Title',
    position: 'bottom-right',
    bottom: 0,
    side: 0,
    defaultOpen: false,
    open: false,
    badgeCount: 0,
    allowAttach: true,
  },
  argTypes: {
    onSend: { action: 'onSend' },
    onStop: { action: 'onStop' },
    onAttach: { action: 'onAttach' },
    isLoading: { control: 'boolean' },
    isStreaming: { control: 'boolean' },
    isTyping: { control: 'boolean' },
    position: { control: 'select', options: ['bottom-right', 'bottom-left'] },
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    allowAttach: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingChat>;

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', content: 'Hi! How can we help?', sender: 'bot' },
  { id: '2', content: 'I have a question about Bear.', sender: 'user', status: 'read' },
];

const LEFT_MESSAGES: ChatMessage[] = [
  { id: 'l1', content: 'Sales is online.', sender: 'system' },
  { id: 'l2', content: 'Can we schedule a demo?', sender: 'user' },
];

export const Basic: Story = {
  args: {
    messages: INITIAL_MESSAGES,
    defaultOpen: true,
    title: 'Support',
  },
  render: (args) => <FloatingChat {...args} />,
};

export const BottomLeft: Story = {
  render: () => (
    <FloatingChat
      messages={LEFT_MESSAGES}
      onSend={() => undefined}
      title="Sales"
      position="bottom-left"
      defaultOpen
      badgeCount={2}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <FloatingChat
        messages={INITIAL_MESSAGES}
        onSend={() => undefined}
        title="First"
        position="bottom-right"
        defaultOpen
      />
      <FloatingChat
        messages={LEFT_MESSAGES}
        onSend={() => undefined}
        title="Reuse"
        position="bottom-left"
        defaultOpen
      />
    </BearProvider>
  ),
};
