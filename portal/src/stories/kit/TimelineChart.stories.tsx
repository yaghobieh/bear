import type { Meta, StoryObj } from '@storybook/react';
import { TimelineChart, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TimelineChart> = {
  title: 'Components/TimelineChart',
  component: TimelineChart,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TimelineChart from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TimelineChart anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimelineChart>;

export const Basic: Story = {
  args: {
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }],
  },
};

export const AnotherExample: Story = {
  args: {
    data: [{ label: 'Q1', value: 40 }, { label: 'Q2', value: 64 }],
  },
};

export const ReuseWithProvider: Story = {
  args: {
    data: [{ label: 'A', value: 22 }, { label: 'B', value: 44 }],
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TimelineChart {...args} />
        <TimelineChart data={[{ label: 'A', value: 18 }, { label: 'B', value: 36 }]} />
      </Flex>
    </BearProvider>
  ),
};
