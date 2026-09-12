import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CommandPalette from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CommandPalette anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommandPalette>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <CommandPalette {...args}>
      <Typography>CommandPalette</Typography>
    </CommandPalette>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <CommandPalette {...args}>
        <Typography>First</Typography>
      </CommandPalette>
      <CommandPalette>
        <Typography>Second</Typography>
      </CommandPalette>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CommandPalette anywhere below.</Typography>
        <CommandPalette {...args}>
          <Typography>First use</Typography>
        </CommandPalette>
        <CommandPalette>
          <Typography>Second use</Typography>
        </CommandPalette>
      </Flex>
    </BearProvider>
  ),
};
