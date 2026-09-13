import type { Meta, StoryObj } from '@storybook/react';
import { ContextMeter, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof ContextMeter> = {
  title: 'Components/ContextMeter',
  component: ContextMeter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ContextMeter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ContextMeter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    used: 72,
    max: 100,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ContextMeter>;

export const Basic: Story = {
  args: {
    used: 72,
    max: 100,
  },
  render: (args) => <ContextMeter {...args} />,
};

export const HighUsage: Story = {
  render: () => <ContextMeter used={96} max={100} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ContextMeter used={18} max={100} />
        <ContextMeter used={72} max={100} />
      </Flex>
    </BearProvider>
  ),
};
