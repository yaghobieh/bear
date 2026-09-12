import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CodeEditor from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CodeEditor anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <CodeEditor {...args}>
      <Typography>CodeEditor</Typography>
    </CodeEditor>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <CodeEditor {...args}>
        <Typography>First</Typography>
      </CodeEditor>
      <CodeEditor>
        <Typography>Second</Typography>
      </CodeEditor>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CodeEditor anywhere below.</Typography>
        <CodeEditor {...args}>
          <Typography>First use</Typography>
        </CodeEditor>
        <CodeEditor>
          <Typography>Second use</Typography>
        </CodeEditor>
      </Flex>
    </BearProvider>
  ),
};
