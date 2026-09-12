import type { Meta, StoryObj } from '@storybook/react';
import { Progress, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Progress from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Progress anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  args: {
    value: 48,
  },
};

export const Values: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Progress value={20} />
      <Progress value={70} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Progress value={32} />
        <Progress value={84} />
      </Flex>
    </BearProvider>
  ),
};
