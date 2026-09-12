import type { Meta, StoryObj } from '@storybook/react';
import { List, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'List from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse List anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <List {...args}>
      <Typography>List</Typography>
    </List>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <List {...args}>
        <Typography>First</Typography>
      </List>
      <List>
        <Typography>Second</Typography>
      </List>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse List anywhere below.</Typography>
        <List {...args}>
          <Typography>First use</Typography>
        </List>
        <List>
          <Typography>Second use</Typography>
        </List>
      </Flex>
    </BearProvider>
  ),
};
