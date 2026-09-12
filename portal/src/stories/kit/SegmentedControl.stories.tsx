import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SegmentedControl from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SegmentedControl anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <SegmentedControl {...args}>
      <Typography>SegmentedControl</Typography>
    </SegmentedControl>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <SegmentedControl {...args}>
        <Typography>First</Typography>
      </SegmentedControl>
      <SegmentedControl>
        <Typography>Second</Typography>
      </SegmentedControl>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SegmentedControl anywhere below.</Typography>
        <SegmentedControl {...args}>
          <Typography>First use</Typography>
        </SegmentedControl>
        <SegmentedControl>
          <Typography>Second use</Typography>
        </SegmentedControl>
      </Flex>
    </BearProvider>
  ),
};
