import type { Meta, StoryObj } from '@storybook/react';
import { ToolCall, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof ToolCall> = {
  title: 'Components/ToolCall',
  component: ToolCall,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ToolCall from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ToolCall anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    name: 'searchDocs',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ToolCall>;

export const Basic: Story = {
  render: (args) => <ToolCall {...args} />,
};

export const Running: Story = {
  render: () => <ToolCall name="editFile" kind="edit" status="running" input="composer.tsx" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ToolCall name="searchDocs" kind="search" status="success" output="Found Chart." />
        <ToolCall name="planSprint" kind="plan" status="pending" />
      </Flex>
    </BearProvider>
  ),
};
