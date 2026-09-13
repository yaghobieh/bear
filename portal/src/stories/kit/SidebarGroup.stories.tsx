import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Sidebar, SidebarGroup, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof SidebarGroup> = {
  title: 'Components/Sidebar/SidebarGroup',
  component: SidebarGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SidebarGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    title: 'Title',
    collapsible: false,
    defaultCollapsed: false,
  },
  argTypes: {
    collapsible: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarGroup>;

export const Basic: Story = {
  render: (args) => <SidebarGroup {...args} />,
};
