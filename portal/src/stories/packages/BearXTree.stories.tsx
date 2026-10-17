import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from '@forgedevstack/bear-x-tree';
import type { TreeNode } from '@forgedevstack/bear-x-tree';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const DATA: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Projects' },
      { id: '1-2', label: 'Reports' },
    ],
  },
  { id: '2', label: 'Downloads' },
];

const meta: Meta<typeof TreeView> = {
  title: 'Packages/Bear X Tree/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'TreeView from @forgedevstack/bear-x-tree. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/bear-x-tree</Typography>
        <TreeView data={DATA} showLines defaultExpandedIds={['1']} />
      </Flex>
    </BearProvider>
  ),
};
