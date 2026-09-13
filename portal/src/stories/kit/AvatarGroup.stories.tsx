import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/Avatar/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AvatarGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    max: 100,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

export const Basic: Story = {
  render: (args) => <AvatarGroup {...args} />,
};
