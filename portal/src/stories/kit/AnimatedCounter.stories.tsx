import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedCounter, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'Components/AnimatedCounter',
  component: AnimatedCounter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AnimatedCounter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AnimatedCounter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedCounter>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <AnimatedCounter {...args}>
      <Typography>AnimatedCounter</Typography>
    </AnimatedCounter>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <AnimatedCounter {...args}>
        <Typography>First</Typography>
      </AnimatedCounter>
      <AnimatedCounter>
        <Typography>Second</Typography>
      </AnimatedCounter>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse AnimatedCounter anywhere below.</Typography>
        <AnimatedCounter {...args}>
          <Typography>First use</Typography>
        </AnimatedCounter>
        <AnimatedCounter>
          <Typography>Second use</Typography>
        </AnimatedCounter>
      </Flex>
    </BearProvider>
  ),
};
