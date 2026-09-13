import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListItemText, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ListItemText> = {
  title: 'Components/List/ListItemText',
  component: ListItemText,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ListItemText from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    primary: 'Inbox',
    secondary: '3 new messages',
    inset: false,
    dense: false,
  },
  argTypes: {
    inset: { control: 'boolean' },
    dense: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ListItemText>;

export const Basic: Story = {
  render: (args) => (
    <List>
      <ListItemText {...args} />
    </List>
  ),
};
