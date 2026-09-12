import type { Meta, StoryObj } from '@storybook/react';
import { Menu, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Menu from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Menu anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Menu {...args}>
      <Typography>Menu</Typography>
    </Menu>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Menu {...args}>
        <Typography>First</Typography>
      </Menu>
      <Menu>
        <Typography>Second</Typography>
      </Menu>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Menu anywhere below.</Typography>
        <Menu {...args}>
          <Typography>First use</Typography>
        </Menu>
        <Menu>
          <Typography>Second use</Typography>
        </Menu>
      </Flex>
    </BearProvider>
  ),
};
