import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Skeleton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Skeleton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Skeleton {...args} />
      <Skeleton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Skeleton anywhere below.</Typography>
        <Skeleton {...args} />
        <Skeleton {...args} />
      </Flex>
    </BearProvider>
  ),
};
