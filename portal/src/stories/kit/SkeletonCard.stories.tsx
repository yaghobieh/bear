import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Skeleton, SkeletonCard, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof SkeletonCard> = {
  title: 'Components/Skeleton/SkeletonCard',
  component: SkeletonCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SkeletonCard from @forgedevstack/bear. All public props are in Controls.',
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

type Story = StoryObj<typeof SkeletonCard>;

export const Basic: Story = {
  render: (args) => <SkeletonCard {...args} />,
};
