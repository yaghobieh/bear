import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Dropdown from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Dropdown anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Dropdown {...args}>
      <Typography>Dropdown</Typography>
    </Dropdown>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Dropdown {...args}>
        <Typography>First</Typography>
      </Dropdown>
      <Dropdown>
        <Typography>Second</Typography>
      </Dropdown>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Dropdown anywhere below.</Typography>
        <Dropdown {...args}>
          <Typography>First use</Typography>
        </Dropdown>
        <Dropdown>
          <Typography>Second use</Typography>
        </Dropdown>
      </Flex>
    </BearProvider>
  ),
};
