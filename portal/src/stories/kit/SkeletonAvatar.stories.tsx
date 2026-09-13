import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Skeleton, SkeletonAvatar, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof SkeletonAvatar> = {
  title: 'Components/Skeleton/SkeletonAvatar',
  component: SkeletonAvatar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SkeletonAvatar from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    size: 'md',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonAvatar>;

export const Basic: Story = {
  render: (args) => <SkeletonAvatar {...args} />,
};
