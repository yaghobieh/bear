import type { Meta, StoryObj } from '@storybook/react';
import { Statistic, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Statistic> = {
  title: 'Components/Statistic',
  component: Statistic,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Statistic from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Statistic anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Statistic>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Statistic {...args}>
      <Typography>Statistic</Typography>
    </Statistic>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Statistic {...args}>
        <Typography>First</Typography>
      </Statistic>
      <Statistic>
        <Typography>Second</Typography>
      </Statistic>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Statistic anywhere below.</Typography>
        <Statistic {...args}>
          <Typography>First use</Typography>
        </Statistic>
        <Statistic>
          <Typography>Second use</Typography>
        </Statistic>
      </Flex>
    </BearProvider>
  ),
};
