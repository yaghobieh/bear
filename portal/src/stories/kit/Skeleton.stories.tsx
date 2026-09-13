import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText } from '@forgedevstack/bear';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Skeleton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Skeleton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { SkeletonAvatar, SkeletonText, SkeletonCard },
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

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  render: (args) => <Skeleton {...args} />,
};

export const Circular: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Skeleton variant="circular" width={48} height={48} />
      <Flex direction="column" gap={2}>
        <Skeleton width={180} height={14} />
        <Skeleton width={120} height={12} />
      </Flex>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Skeleton width={220} height={16} />
        <Skeleton variant="rounded" width={220} height={72} />
      </Flex>
    </BearProvider>
  ),
};
