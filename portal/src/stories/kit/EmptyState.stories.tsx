import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'EmptyState from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse EmptyState anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <EmptyState {...args}>
      <Typography>EmptyState</Typography>
    </EmptyState>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <EmptyState {...args}>
        <Typography>First</Typography>
      </EmptyState>
      <EmptyState>
        <Typography>Second</Typography>
      </EmptyState>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse EmptyState anywhere below.</Typography>
        <EmptyState {...args}>
          <Typography>First use</Typography>
        </EmptyState>
        <EmptyState>
          <Typography>Second use</Typography>
        </EmptyState>
      </Flex>
    </BearProvider>
  ),
};
