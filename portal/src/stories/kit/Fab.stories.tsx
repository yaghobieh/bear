import type { Meta, StoryObj } from '@storybook/react';
import { Fab, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FAB from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Fab anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Fab>;

export const Basic: Story = {
  render: () => (
    <Fab position="relative" aria-label="Add">
      +
    </Fab>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap={3}>
      <Fab position="relative" variant="primary" aria-label="Primary">+</Fab>
      <Fab position="relative" variant="secondary" aria-label="Secondary">+</Fab>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Fab position="relative" aria-label="First">+</Fab>
        <Fab position="relative" variant="outline" aria-label="Reuse">+</Fab>
      </Flex>
    </BearProvider>
  ),
};
