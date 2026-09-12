import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Sidebar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Sidebar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Sidebar {...args}>
      <Typography>Sidebar</Typography>
    </Sidebar>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Sidebar {...args}>
        <Typography>First</Typography>
      </Sidebar>
      <Sidebar>
        <Typography>Second</Typography>
      </Sidebar>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Sidebar anywhere below.</Typography>
        <Sidebar {...args}>
          <Typography>First use</Typography>
        </Sidebar>
        <Sidebar>
          <Typography>Second use</Typography>
        </Sidebar>
      </Flex>
    </BearProvider>
  ),
};
