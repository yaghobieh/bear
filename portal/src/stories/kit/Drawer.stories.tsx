import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Drawer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Drawer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Drawer {...args}>
      <Typography>Drawer</Typography>
    </Drawer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Drawer {...args}>
        <Typography>First</Typography>
      </Drawer>
      <Drawer>
        <Typography>Second</Typography>
      </Drawer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Drawer anywhere below.</Typography>
        <Drawer {...args}>
          <Typography>First use</Typography>
        </Drawer>
        <Drawer>
          <Typography>Second use</Typography>
        </Drawer>
      </Flex>
    </BearProvider>
  ),
};
