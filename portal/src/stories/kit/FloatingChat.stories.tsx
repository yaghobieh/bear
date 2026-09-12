import type { Meta, StoryObj } from '@storybook/react';
import { FloatingChat, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof FloatingChat> = {
  title: 'Components/FloatingChat',
  component: FloatingChat,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FloatingChat from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FloatingChat anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingChat>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <FloatingChat {...args}>
      <Typography>FloatingChat</Typography>
    </FloatingChat>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <FloatingChat {...args}>
        <Typography>First</Typography>
      </FloatingChat>
      <FloatingChat>
        <Typography>Second</Typography>
      </FloatingChat>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse FloatingChat anywhere below.</Typography>
        <FloatingChat {...args}>
          <Typography>First use</Typography>
        </FloatingChat>
        <FloatingChat>
          <Typography>Second use</Typography>
        </FloatingChat>
      </Flex>
    </BearProvider>
  ),
};
