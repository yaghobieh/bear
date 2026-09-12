import type { Meta, StoryObj } from '@storybook/react';
import { ToolCall, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof ToolCall>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ToolCall {...args}>
      <Typography>ToolCall</Typography>
    </ToolCall>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ToolCall {...args}>
        <Typography>First</Typography>
      </ToolCall>
      <ToolCall>
        <Typography>Second</Typography>
      </ToolCall>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ToolCall anywhere below.</Typography>
        <ToolCall {...args}>
          <Typography>First use</Typography>
        </ToolCall>
        <ToolCall>
          <Typography>Second use</Typography>
        </ToolCall>
      </Flex>
    </BearProvider>
  ),
};
