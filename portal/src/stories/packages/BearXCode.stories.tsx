import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor } from '@forgedevstack/bear-x-code';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const VALUE = `import { Button } from '@forgedevstack/bear';

export const Demo = () => <Button>Click me</Button>;
`;

const meta: Meta<typeof CodeEditor> = {
  title: 'Packages/Bear X Code/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'CodeEditor from @forgedevstack/bear-x-code. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/bear-x-code</Typography>
        <CodeEditor value={VALUE} language="tsx" theme="dark" showLineNumbers height={180} readOnly />
      </Flex>
    </BearProvider>
  ),
};
