import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Blockquote> = {
  title: 'Components/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Blockquote from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Blockquote anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Blockquote {...args}>
      <Typography>Blockquote</Typography>
    </Blockquote>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Blockquote {...args}>
        <Typography>First</Typography>
      </Blockquote>
      <Blockquote>
        <Typography>Second</Typography>
      </Blockquote>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Blockquote anywhere below.</Typography>
        <Blockquote {...args}>
          <Typography>First use</Typography>
        </Blockquote>
        <Blockquote>
          <Typography>Second use</Typography>
        </Blockquote>
      </Flex>
    </BearProvider>
  ),
};
