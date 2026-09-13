import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  subcomponents: { AvatarGroup },
  args: {
    src: '/bear.svg',
    alt: 'Bear demo',
    size: 'xs',
    variant: 'circle',
    status: 'online',
    bordered: false,
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    variant: { control: 'select', options: ['circle', 'rounded', 'square'] },
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy'] },
    bordered: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  render: (args) => <Avatar {...args} />,
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
