import type { Meta, StoryObj } from '@storybook/react';
import { Gauge, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Gauge> = {
  title: 'Components/Gauge',
  component: Gauge,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Gauge from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Gauge anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Gauge>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Gauge {...args} />
      <Gauge {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Gauge anywhere below.</Typography>
        <Gauge {...args} />
        <Gauge {...args} />
      </Flex>
    </BearProvider>
  ),
};
