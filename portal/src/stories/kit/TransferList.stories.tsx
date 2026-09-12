import type { Meta, StoryObj } from '@storybook/react';
import { TransferList, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TransferList> = {
  title: 'Components/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TransferList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TransferList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransferList>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <TransferList {...args}>
      <Typography>TransferList</Typography>
    </TransferList>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <TransferList {...args}>
        <Typography>First</Typography>
      </TransferList>
      <TransferList>
        <Typography>Second</Typography>
      </TransferList>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TransferList anywhere below.</Typography>
        <TransferList {...args}>
          <Typography>First use</Typography>
        </TransferList>
        <TransferList>
          <Typography>Second use</Typography>
        </TransferList>
      </Flex>
    </BearProvider>
  ),
};
