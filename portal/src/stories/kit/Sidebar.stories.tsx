import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Sidebar, SidebarGroup } from '@forgedevstack/bear';

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' },
  { id: 'about', label: 'About' },
];

const NESTED_ITEMS = [
  { id: 'home', label: 'Home' },
  {
    id: 'settings',
    label: 'Settings',
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
      { id: 'notifications', label: 'Notifications' },
    ],
  },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Sidebar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Sidebar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { SidebarGroup },
  args: {
    collapsed: false,
    width: 320,
    collapsedWidth: 320,
    showHeader: true,
    fullHeight: false,
  },
  argTypes: {
    collapsed: { control: 'boolean' },
    onCollapsedChange: { action: 'onCollapsedChange' },
    showHeader: { control: 'boolean' },
    onItemClick: { action: 'onItemClick' },
    fullHeight: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Basic: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => <Sidebar {...args} />,
};

export const Collapsed: Story = {
  render: () => <Sidebar items={NESTED_ITEMS} collapsed activeItemId="home" variant="bordered" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4}>
        <Sidebar items={ITEMS} activeItemId="home" />
        <Sidebar items={NESTED_ITEMS} activeItemId="profile" variant="floating" />
      </Flex>
    </BearProvider>
  ),
};
