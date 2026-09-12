import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Avatar & Identity from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Avatar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  args: {
    initials: 'AL',
    alt: 'Ada Lovelace',
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={2} align="center">
      <Avatar size="sm" initials="AL" />
      <Avatar size="md" initials="GH" />
      <Avatar size="lg" initials="AT" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Avatar initials="F" alt="First" />
        <Avatar initials="R" alt="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
