import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BottomSheet from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BottomSheet anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <BottomSheet {...args}>
      <Typography>BottomSheet</Typography>
    </BottomSheet>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <BottomSheet {...args}>
        <Typography>First</Typography>
      </BottomSheet>
      <BottomSheet>
        <Typography>Second</Typography>
      </BottomSheet>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse BottomSheet anywhere below.</Typography>
        <BottomSheet {...args}>
          <Typography>First use</Typography>
        </BottomSheet>
        <BottomSheet>
          <Typography>Second use</Typography>
        </BottomSheet>
      </Flex>
    </BearProvider>
  ),
};
