import type { Meta, StoryObj } from '@storybook/react';
import { Result, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Result> = {
  title: 'Components/Result',
  component: Result,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Result from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Result anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Result>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Result {...args}>
      <Typography>Result</Typography>
    </Result>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Result {...args}>
        <Typography>First</Typography>
      </Result>
      <Result>
        <Typography>Second</Typography>
      </Result>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Result anywhere below.</Typography>
        <Result {...args}>
          <Typography>First use</Typography>
        </Result>
        <Result>
          <Typography>Second use</Typography>
        </Result>
      </Flex>
    </BearProvider>
  ),
};
