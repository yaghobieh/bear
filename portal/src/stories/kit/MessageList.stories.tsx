import type { Meta, StoryObj } from '@storybook/react';
import { MessageList, BearProvider, Flex } from '@forgedevstack/bear';
import type { MessageListMessage } from '@forgedevstack/bear';

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
  args: {
    groupWindowMs: 0,
    showDaySeparators: true,
    showAvatars: true,
    showTimestamps: true,
    autoScroll: false,
    virtualized: false,
    overscan: 4,
    height: 240,
  },
  argTypes: {
    showDaySeparators: { control: 'boolean' },
    showAvatars: { control: 'boolean' },
    showTimestamps: { control: 'boolean' },
    autoScroll: { control: 'boolean' },
    virtualized: { control: 'boolean' },
    onNewMessagesClick: { action: 'onNewMessagesClick' },
  },
};

export default meta;

type Story = StoryObj<typeof MessageList>;

const NOW = Date.now();
const MINUTE = 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

const AUTHORS = {
  amelia: { id: 'amelia', name: 'Amelia Stone' },
  noah: { id: 'noah', name: 'Noah Reed' },
  me: { id: 'me', name: 'You' },
};

const DEMO_MESSAGES: MessageListMessage[] = [
  {
    id: 'm1',
    author: AUTHORS.amelia,
    content: 'Hey team, the 1.2.5 build is green.',
    timestamp: new Date(NOW - DAY - 8 * MINUTE),
  },
  {
    id: 'm2',
    author: AUTHORS.amelia,
    content: 'Portal docs are updated too.',
    timestamp: new Date(NOW - DAY - 7 * MINUTE),
  },
  {
    id: 'm3',
    author: AUTHORS.noah,
    content: 'Nice. Did the MessageList land?',
    timestamp: new Date(NOW - DAY - 5 * MINUTE),
  },
  {
    id: 'm4',
    author: AUTHORS.me,
    content: 'Yes — grouping, day separators, and auto-scroll.',
    timestamp: new Date(NOW - 9 * MINUTE),
  },
];

const SHORT_THREAD: MessageListMessage[] = [
  {
    id: 't1',
    author: AUTHORS.noah,
    content: 'Ready for review.',
    timestamp: new Date(NOW - 4 * MINUTE),
  },
  {
    id: 't2',
    author: AUTHORS.me,
    content: 'Looking now.',
    timestamp: new Date(NOW - MINUTE),
  },
];

export const Basic: Story = {
  args: {
    messages: DEMO_MESSAGES,
  },
  render: (args) => <MessageList {...args} />,
};

export const WithoutSeparators: Story = {
  render: () => (
    <MessageList
      messages={SHORT_THREAD}
      currentUserId="me"
      showDaySeparators={false}
      height={240}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <MessageList messages={DEMO_MESSAGES} currentUserId="me" height={240} />
        <MessageList messages={SHORT_THREAD} currentUserId="me" height={200} />
      </Flex>
    </BearProvider>
  ),
};
