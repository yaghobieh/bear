import type { Meta, StoryObj } from '@storybook/react';
import { Rating, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Rating from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Rating anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Rating {...args} />
      <Rating {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Rating anywhere below.</Typography>
        <Rating {...args} />
        <Rating {...args} />
      </Flex>
    </BearProvider>
  ),
};
