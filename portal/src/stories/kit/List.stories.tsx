import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@forgedevstack/bear';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'List from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse List anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { ListItem, ListSubheader, ListItemText, ListItemIcon, ListItemButton },
  args: {
    variant: 'default',
    hoverable: false,
    dense: false,
    disablePadding: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'divided', 'laminated'] },
    hoverable: { control: 'boolean' },
    dense: { control: 'boolean' },
    disablePadding: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Basic: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem primary="Inbox" secondary="You have 3 new messages" />
      <ListItem primary="Drafts" />
      <ListItem primary="Sent" secondary="Last sent: 2 days ago" />
    </List>
  ),
};

export const Divided: Story = {
  render: () => (
    <List variant="divided" hoverable>
      <ListItem leading={<span>📥</span>} primary="Inbox" clickable />
      <ListItem leading={<span>📤</span>} primary="Sent" clickable />
      <ListItem leading={<span>⚙️</span>} primary="Settings" clickable />
    </List>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <List variant="bordered">
          <ListItem primary="Inbox" />
          <ListItem primary="Drafts" />
        </List>
        <List variant="divided">
          <ListItem primary="Sent" />
          <ListItem primary="Archive" />
        </List>
      </Flex>
    </BearProvider>
  ),
};
