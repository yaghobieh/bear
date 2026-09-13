import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Loading from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Spinner anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    color: '#EA0A8E',
    label: 'Label',
    size: 'md',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {
  render: (args) => <Spinner {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Spinner />
        <Spinner />
      </Flex>
    </BearProvider>
  ),
};
