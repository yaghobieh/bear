import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof TreeSelect>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <TreeSelect {...args}>
      <Typography>TreeSelect</Typography>
    </TreeSelect>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <TreeSelect {...args}>
        <Typography>First</Typography>
      </TreeSelect>
      <TreeSelect>
        <Typography>Second</Typography>
      </TreeSelect>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TreeSelect anywhere below.</Typography>
        <TreeSelect {...args}>
          <Typography>First use</Typography>
        </TreeSelect>
        <TreeSelect>
          <Typography>Second use</Typography>
        </TreeSelect>
      </Flex>
    </BearProvider>
  ),
};
