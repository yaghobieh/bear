import type { Meta, StoryObj } from '@storybook/react';
import { DiffViewer, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof DiffViewer> = {
  title: 'Components/DiffViewer',
  component: DiffViewer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DiffViewer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DiffViewer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    showLineNumbers: true,
    syntaxHighlight: false,
    showStats: true,
    showLineHoverInfo: true,
  },
  argTypes: {
    showLineNumbers: { control: 'boolean' },
    syntaxHighlight: { control: 'boolean' },
    showStats: { control: 'boolean' },
    showLineHoverInfo: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof DiffViewer>;

const OLD_VALUE = `function greet(name) {
  console.log("Hello " + name);
  return true;
}`;

const NEW_VALUE = `function greet(name, greeting = "Hello") {
  console.log(greeting + " " + name);
  console.log("Welcome!");
  return true;
}`;

export const Basic: Story = {
  render: (args) => <DiffViewer {...args} />,
};

export const Unified: Story = {
  render: () => (
    <DiffViewer
      oldValue={OLD_VALUE}
      newValue={NEW_VALUE}
      viewMode="unified"
      showStats
      showLineNumbers
      oldTitle="Before"
      newTitle="After"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <DiffViewer oldValue={OLD_VALUE} newValue={NEW_VALUE} />
        <DiffViewer oldValue={OLD_VALUE} newValue={NEW_VALUE} viewMode="unified" />
      </Flex>
    </BearProvider>
  ),
};
