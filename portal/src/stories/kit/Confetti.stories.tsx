import type { Meta, StoryObj } from '@storybook/react';
import { Confetti, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Confetti> = {
  title: 'Components/Confetti',
  component: Confetti,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Confetti from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Confetti anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Confetti>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Confetti {...args}>
      <Typography>Confetti</Typography>
    </Confetti>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Confetti {...args}>
        <Typography>First</Typography>
      </Confetti>
      <Confetti>
        <Typography>Second</Typography>
      </Confetti>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Confetti anywhere below.</Typography>
        <Confetti {...args}>
          <Typography>First use</Typography>
        </Confetti>
        <Confetti>
          <Typography>Second use</Typography>
        </Confetti>
      </Flex>
    </BearProvider>
  ),
};
