import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedCounter, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    value: 42,
    from: 0,
    duration: 0,
    decimals: 0,
    animateOnView: false,
  },
  argTypes: {
    animateOnView: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedCounter>;

export const Basic: Story = {
  render: (args) => <AnimatedCounter {...args} />,
};

export const Prefixed: Story = {
  render: () => (
    <Flex gap={4}>
      <AnimatedCounter value={45678} prefix="$" />
      <AnimatedCounter value={98} suffix="%" decimals={0} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4}>
        <AnimatedCounter value={10} />
        <AnimatedCounter value={20} />
      </Flex>
    </BearProvider>
  ),
};
