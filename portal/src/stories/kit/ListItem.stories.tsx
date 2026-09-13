import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListItem, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ListItem> = {
  title: 'Components/List/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ListItem from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    primary: 'Inbox',
    secondary: '3 new messages',
    selected: false,
    disabled: false,
    clickable: false,
    divider: false,
    dense: false,
  },
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clickable: { control: 'boolean' },
    divider: { control: 'boolean' },
    dense: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Basic: Story = {
  render: (args) => (
    <List>
      <ListItem {...args} />
    </List>
  ),
};
