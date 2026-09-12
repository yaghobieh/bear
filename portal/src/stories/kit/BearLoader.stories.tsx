import type { Meta, StoryObj } from '@storybook/react';
import { BearLoader, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof BearLoader> = {
  title: 'Components/BearLoader',
  component: BearLoader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BearLoader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BearLoader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BearLoader>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <BearLoader {...args} />
      <BearLoader {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse BearLoader anywhere below.</Typography>
        <BearLoader {...args} />
        <BearLoader {...args} />
      </Flex>
    </BearProvider>
  ),
};
