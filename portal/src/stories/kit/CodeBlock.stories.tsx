import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    code: 'const x = 1',
    showLineNumbers: true,
    title: 'Title',
    copyable: false,
    maxHeight: 240,
    theme: 'auto',
  },
  argTypes: {
    showLineNumbers: { control: 'boolean' },
    copyable: { control: 'boolean' },
    theme: { control: 'select', options: ['auto', 'dark', 'light'] },
  },
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

const SNIPPET = `const greeting = 'Hello, World!';
console.log(greeting);`;

const APP_SNIPPET = `import { Button } from '@forgedevstack/bear';

function App() {
  return <Button>Click me</Button>;
}`;

export const Basic: Story = {
  render: (args) => <CodeBlock {...args} />,
};

export const WithTitle: Story = {
  render: () => (
    <CodeBlock code={APP_SNIPPET} language="tsx" title="App.tsx" showLineNumbers />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <CodeBlock code={SNIPPET} language="javascript" />
        <CodeBlock code="npm install @forgedevstack/bear" language="bash" showLineNumbers={false} />
      </Flex>
    </BearProvider>
  ),
};
