import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, List, ListSubheader, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ListSubheader> = {
  title: 'Components/List/ListSubheader',
  component: ListSubheader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ListSubheader from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    sticky: false,
    inset: false,
  },
  argTypes: {
    sticky: { control: 'boolean' },
    inset: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ListSubheader>;

export const Basic: Story = {
  render: (args) => (
    <List>
      <ListSubheader {...args} />
    </List>
  ),
};
