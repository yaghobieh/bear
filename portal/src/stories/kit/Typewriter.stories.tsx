import type { Meta, StoryObj } from '@storybook/react';
import { Typewriter, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Typewriter> = {
  title: 'Components/Typewriter',
  component: Typewriter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Typewriter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Typewriter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typewriter>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Typewriter {...args}>
      <Typography>Typewriter</Typography>
    </Typewriter>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Typewriter {...args}>
        <Typography>First</Typography>
      </Typewriter>
      <Typewriter>
        <Typography>Second</Typography>
      </Typewriter>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Typewriter anywhere below.</Typography>
        <Typewriter {...args}>
          <Typography>First use</Typography>
        </Typewriter>
        <Typewriter>
          <Typography>Second use</Typography>
        </Typewriter>
      </Flex>
    </BearProvider>
  ),
};
