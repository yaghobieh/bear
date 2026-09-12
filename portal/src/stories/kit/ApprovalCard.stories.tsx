import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalCard, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ApprovalCard> = {
  title: 'Components/ApprovalCard',
  component: ApprovalCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ApprovalCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ApprovalCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ApprovalCard>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ApprovalCard {...args}>
      <Typography>ApprovalCard</Typography>
    </ApprovalCard>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ApprovalCard {...args}>
        <Typography>First</Typography>
      </ApprovalCard>
      <ApprovalCard>
        <Typography>Second</Typography>
      </ApprovalCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ApprovalCard anywhere below.</Typography>
        <ApprovalCard {...args}>
          <Typography>First use</Typography>
        </ApprovalCard>
        <ApprovalCard>
          <Typography>Second use</Typography>
        </ApprovalCard>
      </Flex>
    </BearProvider>
  ),
};
