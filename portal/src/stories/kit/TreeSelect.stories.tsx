import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect, BearProvider, Flex } from '@forgedevstack/bear';
import type { TreeSelectNode } from '@forgedevstack/bear';

const meta: Meta<typeof TreeSelect> = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TreeSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TreeSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    multiple: false,
    label: 'Label',
    placeholder: 'Type here',
    disabled: false,
    clearable: false,
    searchable: false,
    expandAll: false,
    size: 'sm',
    helperText: 'Helper text',
    maxHeight: 240,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    searchable: { control: 'boolean' },
    expandAll: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof TreeSelect>;

const NODES: TreeSelectNode[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    children: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    children: [
      { id: 'node', label: 'Node.js' },
      { id: 'python', label: 'Python' },
      { id: 'go', label: 'Go' },
    ],
  },
];

export const Basic: Story = {
  args: {
    nodes: NODES,
  },
  render: (args) => <TreeSelect {...args} />,
};

export const Multiple: Story = {
  render: () => (
    <TreeSelect
      nodes={NODES}
      multiple
      value={['react', 'node']}
      label="Stack"
      searchable
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TreeSelect nodes={NODES} placeholder="Single" />
        <TreeSelect nodes={NODES} multiple placeholder="Multiple" />
      </Flex>
    </BearProvider>
  ),
};
