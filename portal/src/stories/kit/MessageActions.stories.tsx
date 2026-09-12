import type { Meta, StoryObj } from '@storybook/react';
import { MessageActions, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof MessageActions> = {
  title: 'Components/MessageActions',
  component: MessageActions,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MessageActions from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MessageActions anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MessageActions>;

export const Basic: Story = {
  render: () => <MessageActions onCopy={() => undefined} onRetry={() => undefined} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <MessageActions onCopy={() => undefined} />
        <MessageActions onRetry={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
