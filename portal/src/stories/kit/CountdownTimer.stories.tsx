import type { Meta, StoryObj } from '@storybook/react';
import { CountdownTimer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CountdownTimer> = {
  title: 'Components/CountdownTimer',
  component: CountdownTimer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CountdownTimer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CountdownTimer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CountdownTimer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <CountdownTimer {...args}>
      <Typography>CountdownTimer</Typography>
    </CountdownTimer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <CountdownTimer {...args}>
        <Typography>First</Typography>
      </CountdownTimer>
      <CountdownTimer>
        <Typography>Second</Typography>
      </CountdownTimer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CountdownTimer anywhere below.</Typography>
        <CountdownTimer {...args}>
          <Typography>First use</Typography>
        </CountdownTimer>
        <CountdownTimer>
          <Typography>Second use</Typography>
        </CountdownTimer>
      </Flex>
    </BearProvider>
  ),
};
