import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, BearProvider, Flex } from '@forgedevstack/bear';
import type { TreeNode } from '@forgedevstack/bear';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TreeView from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TreeView anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    multiSelect: false,
    showCheckboxes: true,
    size: 'sm',
    showLines: true,
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onExpand: { action: 'onExpand' },
    multiSelect: { control: 'boolean' },
    showCheckboxes: { control: 'boolean' },
    onCheck: { action: 'onCheck' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLines: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView>;

const DATA: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      {
        id: '1-1',
        label: 'Projects',
        children: [
          { id: '1-1-1', label: 'Project A' },
          { id: '1-1-2', label: 'Project B' },
        ],
      },
      { id: '1-2', label: 'Reports' },
    ],
  },
  { id: '2', label: 'Downloads' },
  {
    id: '3',
    label: 'Pictures',
    children: [
      { id: '3-1', label: 'Vacation' },
      { id: '3-2', label: 'Family' },
    ],
  },
];

export const Basic: Story = {
  args: {
    data: DATA,
  },
  render: (args) => <TreeView {...args} />,
};

export const WithLines: Story = {
  render: () => (
    <TreeView data={DATA} defaultExpandedIds={['1', '3']} showLines showCheckboxes />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TreeView data={DATA} defaultExpandedIds={['1']} />
        <TreeView data={DATA} defaultExpandedIds={['3']} showLines />
      </Flex>
    </BearProvider>
  ),
};
