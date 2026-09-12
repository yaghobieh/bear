import type { Meta, StoryObj } from '@storybook/react';
import { ChipGroup, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ChipGroup> = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ChipGroup from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ChipGroup anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChipGroup>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ChipGroup {...args}>
      <Typography>ChipGroup</Typography>
    </ChipGroup>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ChipGroup {...args}>
        <Typography>First</Typography>
      </ChipGroup>
      <ChipGroup>
        <Typography>Second</Typography>
      </ChipGroup>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ChipGroup anywhere below.</Typography>
        <ChipGroup {...args}>
          <Typography>First use</Typography>
        </ChipGroup>
        <ChipGroup>
          <Typography>Second use</Typography>
        </ChipGroup>
      </Flex>
    </BearProvider>
  ),
};
