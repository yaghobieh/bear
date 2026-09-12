import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CodeBlock from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CodeBlock anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <CodeBlock {...args}>
      <Typography>CodeBlock</Typography>
    </CodeBlock>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <CodeBlock {...args}>
        <Typography>First</Typography>
      </CodeBlock>
      <CodeBlock>
        <Typography>Second</Typography>
      </CodeBlock>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CodeBlock anywhere below.</Typography>
        <CodeBlock {...args}>
          <Typography>First use</Typography>
        </CodeBlock>
        <CodeBlock>
          <Typography>Second use</Typography>
        </CodeBlock>
      </Flex>
    </BearProvider>
  ),
};
