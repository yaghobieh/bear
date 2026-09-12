import type { Meta, StoryObj } from '@storybook/react';
import { DiffSquares, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof DiffSquares> = {
  title: 'Components/DiffSquares',
  component: DiffSquares,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DiffSquares from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DiffSquares anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiffSquares>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <DiffSquares {...args}>
      <Typography>DiffSquares</Typography>
    </DiffSquares>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <DiffSquares {...args}>
        <Typography>First</Typography>
      </DiffSquares>
      <DiffSquares>
        <Typography>Second</Typography>
      </DiffSquares>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse DiffSquares anywhere below.</Typography>
        <DiffSquares {...args}>
          <Typography>First use</Typography>
        </DiffSquares>
        <DiffSquares>
          <Typography>Second use</Typography>
        </DiffSquares>
      </Flex>
    </BearProvider>
  ),
};
