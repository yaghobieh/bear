import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Skeleton, SkeletonText, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SkeletonText from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    width: 320,
    height: 240,
    borderRadius: 0,
    count: 0,
    gap: 2,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SkeletonText>;

export const Basic: Story = {
  render: (args) => <SkeletonText {...args} />,
};
