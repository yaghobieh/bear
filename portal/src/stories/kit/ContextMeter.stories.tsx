import type { Meta, StoryObj } from '@storybook/react';
import { ContextMeter, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof ContextMeter>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ContextMeter {...args} />
      <ContextMeter {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ContextMeter anywhere below.</Typography>
        <ContextMeter {...args} />
        <ContextMeter {...args} />
      </Flex>
    </BearProvider>
  ),
};
