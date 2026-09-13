import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof JsonViewer> = {
  title: 'Components/JsonViewer',
  component: JsonViewer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'JsonViewer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse JsonViewer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    defaultExpandDepth: 0,
    expandAll: false,
    collapseAll: false,
    showDataTypes: true,
    showArrayIndices: true,
    showCopyButton: true,
    enableSearch: false,
  },
  argTypes: {
    expandAll: { control: 'boolean' },
    collapseAll: { control: 'boolean' },
    showDataTypes: { control: 'boolean' },
    showArrayIndices: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
    enableSearch: { control: 'boolean' },
    onValueClick: { action: 'onValueClick' },
    onCopy: { action: 'onCopy' },
  },
};

export default meta;

type Story = StoryObj<typeof JsonViewer>;

const DATA = {
  name: 'Bear UI',
  version: '1.0.9',
  features: ['TypeScript', 'Tailwind CSS', 'Dark Mode'],
  stats: {
    components: 80,
    hooks: 25,
  },
  isActive: true,
  lastUpdated: null,
};

export const Basic: Story = {
  args: {
    data: DATA,
  },
  render: (args) => <JsonViewer {...args} />,
};

export const WithTypes: Story = {
  render: () => (
    <JsonViewer data={DATA} showDataTypes showArrayIndices defaultExpandDepth={3} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <JsonViewer data={DATA} />
        <JsonViewer data={DATA} showDataTypes />
      </Flex>
    </BearProvider>
  ),
};
