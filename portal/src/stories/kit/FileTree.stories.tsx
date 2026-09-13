import type { Meta, StoryObj } from '@storybook/react';
import { FileTree, BearProvider, Flex } from '@forgedevstack/bear';
import type { FileTreeNode } from '@forgedevstack/bear';

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
  args: {
    size: 'sm',
    showLines: true,
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onExpand: { action: 'onExpand' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLines: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof FileTree>;

const ITEMS: FileTreeNode[] = [
  {
    id: 'src',
    label: 'src',
    type: 'folder',
    children: [
      { id: 'src-app', label: 'App.tsx', type: 'file' },
      { id: 'src-index', label: 'index.tsx', type: 'file' },
      {
        id: 'src-components',
        label: 'components',
        type: 'folder',
        children: [
          { id: 'src-components-button', label: 'Button.tsx', type: 'file' },
          { id: 'src-components-input', label: 'Input.tsx', type: 'file' },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    type: 'folder',
    children: [{ id: 'public-index', label: 'index.html', type: 'file' }],
  },
  { id: 'package', label: 'package.json', type: 'file' },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => <FileTree {...args} />,
};

export const WithLines: Story = {
  render: () => (
    <FileTree items={ITEMS} defaultExpandedIds={['src']} showLines size="lg" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <FileTree items={ITEMS} defaultExpandedIds={['src']} />
        <FileTree items={ITEMS} defaultExpandedIds={['public']} showLines />
      </Flex>
    </BearProvider>
  ),
};
