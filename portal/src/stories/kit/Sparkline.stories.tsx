import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Sparkline from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Sparkline anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sparkline>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Sparkline {...args} />
      <Sparkline {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Sparkline anywhere below.</Typography>
        <Sparkline {...args} />
        <Sparkline {...args} />
      </Flex>
    </BearProvider>
  ),
};
