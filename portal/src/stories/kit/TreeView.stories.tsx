import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <TreeView {...args}>
      <Typography>TreeView</Typography>
    </TreeView>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <TreeView {...args}>
        <Typography>First</Typography>
      </TreeView>
      <TreeView>
        <Typography>Second</Typography>
      </TreeView>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TreeView anywhere below.</Typography>
        <TreeView {...args}>
          <Typography>First use</Typography>
        </TreeView>
        <TreeView>
          <Typography>Second use</Typography>
        </TreeView>
      </Flex>
    </BearProvider>
  ),
};
