import type { Meta, StoryObj } from '@storybook/react';
import { CardSkeleton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CardSkeleton> = {
  title: 'Components/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CardSkeleton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CardSkeleton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardSkeleton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <CardSkeleton {...args} />
      <CardSkeleton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CardSkeleton anywhere below.</Typography>
        <CardSkeleton {...args} />
        <CardSkeleton {...args} />
      </Flex>
    </BearProvider>
  ),
};
