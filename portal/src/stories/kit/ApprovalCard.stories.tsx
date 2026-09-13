import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalCard, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    title: 'Title',
  },
  argTypes: {
    onApprove: { action: 'onApprove' },
    onReject: { action: 'onReject' },
  },
};

export default meta;

type Story = StoryObj<typeof ApprovalCard>;

export const Basic: Story = {
  render: (args) => <ApprovalCard {...args} />,
};

export const WithActions: Story = {
  render: () => (
    <ApprovalCard
      title="Publish the release notes"
      onApprove={() => undefined}
      onReject={() => undefined}
    >
      Merge Chart grow animation into the catalog.
    </ApprovalCard>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ApprovalCard title="First" onApprove={() => undefined} onReject={() => undefined}>
          Apply PromptComposer.
        </ApprovalCard>
        <ApprovalCard title="Reuse" onApprove={() => undefined} onReject={() => undefined}>
          Same provider
        </ApprovalCard>
      </Flex>
    </BearProvider>
  ),
};
