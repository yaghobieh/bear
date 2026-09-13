import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter, BearProvider, Flex } from '@forgedevstack/bear';
import type { NotificationItem } from '@forgedevstack/bear';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NotificationCenter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NotificationCenter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    maxVisible: 100,
    groupByCategory: false,
    open: false,
  },
  argTypes: {
    onNotificationClick: { action: 'onNotificationClick' },
    onMarkAsRead: { action: 'onMarkAsRead' },
    onMarkAllAsRead: { action: 'onMarkAllAsRead' },
    onDismiss: { action: 'onDismiss' },
    onClearAll: { action: 'onClearAll' },
    groupByCategory: { control: 'boolean' },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationCenter>;

const STAMP = new Date('2026-09-12T12:00:00.000Z');

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Success',
    description: 'Your action was completed.',
    timestamp: STAMP,
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Warning',
    description: 'Please check your settings.',
    timestamp: STAMP,
    read: true,
  },
  {
    id: '3',
    type: 'error',
    title: 'Error',
    description: 'Something went wrong.',
    timestamp: STAMP,
    read: false,
  },
];

export const Basic: Story = {
  args: {
    notifications: NOTIFICATIONS,
  },
  render: (args) => <NotificationCenter {...args} />,
};

export const Grouped: Story = {
  render: () => (
    <NotificationCenter
      notifications={[
        { ...NOTIFICATIONS[0], category: 'System' },
        { ...NOTIFICATIONS[1], category: 'Billing' },
        { ...NOTIFICATIONS[2], category: 'System' },
      ]}
      groupByCategory
      open
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <NotificationCenter notifications={NOTIFICATIONS} />
        <NotificationCenter notifications={NOTIFICATIONS} position="bottom-left" />
      </Flex>
    </BearProvider>
  ),
};
