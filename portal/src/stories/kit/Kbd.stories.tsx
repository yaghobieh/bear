import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Kbd from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Kbd anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: '⌘K',
    size: 'sm',
    variant: 'default',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outline', 'ghost'] },
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Basic: Story = {
  render: (args) => <Kbd {...args} />,
};

export const Shortcut: Story = {
  render: () => (
    <Flex gap={1} align="center">
      <Kbd keys={['⌘', 'K']}>K</Kbd>
      <Typography>Open command palette</Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
      </Flex>
    </BearProvider>
  ),
};
