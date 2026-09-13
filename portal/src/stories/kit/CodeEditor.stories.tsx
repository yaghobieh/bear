import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    theme: 'dark',
    placeholder: 'Type here',
    showLineNumbers: true,
    showGutter: true,
    highlightActiveLine: false,
    readOnly: false,
    fontSize: 0,
    tabSize: 0,
    autoIndent: false,
    autoCloseBrackets: false,
    wordWrap: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    theme: { control: 'select', options: ['dark', 'light'] },
    showLineNumbers: { control: 'boolean' },
    showGutter: { control: 'boolean' },
    highlightActiveLine: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    autoIndent: { control: 'boolean' },
    autoCloseBrackets: { control: 'boolean' },
    wordWrap: { control: 'boolean' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

const VALUE = `import { Button } from '@forgedevstack/bear';

export const Demo = () => {
  return <Button>Click me</Button>;
};
`;

export const Basic: Story = {
  render: (args) => <CodeEditor {...args} />,
};

export const Dark: Story = {
  render: () => (
    <CodeEditor
      value={VALUE}
      language="tsx"
      theme="dark"
      showLineNumbers
      highlightActiveLine
      height={220}
      readOnly
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <CodeEditor value={VALUE} language="tsx" height={180} />
        <CodeEditor value={VALUE} language="tsx" theme="dark" height={180} />
      </Flex>
    </BearProvider>
  ),
};
