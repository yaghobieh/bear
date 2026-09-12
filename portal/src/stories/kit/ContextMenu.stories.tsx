import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Context Menu from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ContextMenu anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ContextMenu {...args}>
      <Typography>ContextMenu</Typography>
    </ContextMenu>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ContextMenu {...args}>
        <Typography>First</Typography>
      </ContextMenu>
      <ContextMenu>
        <Typography>Second</Typography>
      </ContextMenu>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ContextMenu anywhere below.</Typography>
        <ContextMenu {...args}>
          <Typography>First use</Typography>
        </ContextMenu>
        <ContextMenu>
          <Typography>Second use</Typography>
        </ContextMenu>
      </Flex>
    </BearProvider>
  ),
};
