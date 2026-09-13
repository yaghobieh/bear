import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListItemIcon, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ListItemIcon> = {
  title: 'Components/List/ListItemIcon',
  component: ListItemIcon,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ListItemIcon from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    align: 'top',
  },
  argTypes: {
    align: { control: 'select', options: ['top', 'center'] },
  },
};

export default meta;

type Story = StoryObj<typeof ListItemIcon>;

export const Basic: Story = {
  render: (args) => (
    <List>
      <ListItemIcon {...args} />
    </List>
  ),
};
