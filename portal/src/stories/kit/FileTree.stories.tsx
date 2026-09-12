import type { Meta, StoryObj } from '@storybook/react';
import { FileTree, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof FileTree> = {
  title: 'Components/FileTree',
  component: FileTree,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FileTree from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FileTree anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileTree>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <FileTree {...args}>
      <Typography>FileTree</Typography>
    </FileTree>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <FileTree {...args}>
        <Typography>First</Typography>
      </FileTree>
      <FileTree>
        <Typography>Second</Typography>
      </FileTree>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse FileTree anywhere below.</Typography>
        <FileTree {...args}>
          <Typography>First use</Typography>
        </FileTree>
        <FileTree>
          <Typography>Second use</Typography>
        </FileTree>
      </Flex>
    </BearProvider>
  ),
};
