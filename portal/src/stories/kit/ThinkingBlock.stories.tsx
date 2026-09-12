import type { Meta, StoryObj } from '@storybook/react';
import { ThinkingBlock, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ThinkingBlock> = {
  title: 'Components/ThinkingBlock',
  component: ThinkingBlock,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ThinkingBlock from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ThinkingBlock anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThinkingBlock>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ThinkingBlock {...args}>
      <Typography>ThinkingBlock</Typography>
    </ThinkingBlock>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ThinkingBlock {...args}>
        <Typography>First</Typography>
      </ThinkingBlock>
      <ThinkingBlock>
        <Typography>Second</Typography>
      </ThinkingBlock>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ThinkingBlock anywhere below.</Typography>
        <ThinkingBlock {...args}>
          <Typography>First use</Typography>
        </ThinkingBlock>
        <ThinkingBlock>
          <Typography>Second use</Typography>
        </ThinkingBlock>
      </Flex>
    </BearProvider>
  ),
};
