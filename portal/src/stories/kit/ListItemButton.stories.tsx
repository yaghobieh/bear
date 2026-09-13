import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListItemButton, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ListItemButton> = {
  title: 'Components/List/ListItemButton',
  component: ListItemButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ListItemButton from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    selected: false,
    disabled: false,
    dense: false,
  },
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dense: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof ListItemButton>;

export const Basic: Story = {
  render: (args) => (
    <List>
      <ListItemButton {...args} />
    </List>
  ),
};
