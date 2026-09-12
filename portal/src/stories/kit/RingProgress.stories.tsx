import type { Meta, StoryObj } from '@storybook/react';
import { RingProgress, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof RingProgress> = {
  title: 'Components/RingProgress',
  component: RingProgress,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RingProgress from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RingProgress anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RingProgress>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <RingProgress {...args} />
      <RingProgress {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse RingProgress anywhere below.</Typography>
        <RingProgress {...args} />
        <RingProgress {...args} />
      </Flex>
    </BearProvider>
  ),
};
