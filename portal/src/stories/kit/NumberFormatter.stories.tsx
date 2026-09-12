import type { Meta, StoryObj } from '@storybook/react';
import { NumberFormatter, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof NumberFormatter> = {
  title: 'Components/NumberFormatter',
  component: NumberFormatter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NumberFormatter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NumberFormatter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberFormatter>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <NumberFormatter {...args}>
      <Typography>NumberFormatter</Typography>
    </NumberFormatter>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <NumberFormatter {...args}>
        <Typography>First</Typography>
      </NumberFormatter>
      <NumberFormatter>
        <Typography>Second</Typography>
      </NumberFormatter>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse NumberFormatter anywhere below.</Typography>
        <NumberFormatter {...args}>
          <Typography>First use</Typography>
        </NumberFormatter>
        <NumberFormatter>
          <Typography>Second use</Typography>
        </NumberFormatter>
      </Flex>
    </BearProvider>
  ),
};
