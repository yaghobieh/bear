import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    children: 'Ship the smallest useful version.',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Basic: Story = {
  render: (args) => <Blockquote {...args} />,
};

export const Colored: Story = {
  render: () => (
    <Blockquote color="primary" cite="Design system">
      Pink is the only accent. Body and borders stay neutral.
    </Blockquote>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Blockquote anywhere below.</Typography>
        <Blockquote>First use</Blockquote>
        <Blockquote color="success">Reuse</Blockquote>
      </Flex>
    </BearProvider>
  ),
};
