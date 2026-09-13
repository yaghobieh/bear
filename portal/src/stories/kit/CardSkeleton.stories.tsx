import type { Meta, StoryObj } from '@storybook/react';
import { CardSkeleton, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    animation: 'pulse',
  },
  argTypes: {
    animation: { control: 'select', options: ['pulse', 'wave', 'none'] },
  },
};

export default meta;

type Story = StoryObj<typeof CardSkeleton>;

export const Basic: Story = {
  render: (args) => <CardSkeleton {...args} />,
};

export const Wave: Story = {
  render: () => <CardSkeleton animation="wave" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4} wrap="wrap">
        <CardSkeleton />
        <CardSkeleton animation="none" />
      </Flex>
    </BearProvider>
  ),
};
