import type { Meta, StoryObj } from '@storybook/react';
import { ChipGroup, Chip, Avatar, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    max: 100,
    spacing: 'sm',
    overflowMenu: false,
  },
  argTypes: {
    spacing: { control: 'select', options: ['sm', 'md', 'lg'] },
    overflowMenu: { control: 'boolean' },
    onDeleteAll: { action: 'onDeleteAll' },
  },
};

export default meta;

type Story = StoryObj<typeof ChipGroup>;

export const Basic: Story = {
  render: (args) => (
    <ChipGroup {...args}>
      <Chip>React</Chip>
      <Chip>Vue</Chip>
      <Chip>Svelte</Chip>
    </ChipGroup>
  ),
};

export const WithMax: Story = {
  render: () => (
    <ChipGroup max={3}>
      <Chip avatar={<Avatar initials="A" size="xs" />}>Ada</Chip>
      <Chip avatar={<Avatar initials="B" size="xs" />}>Bea</Chip>
      <Chip avatar={<Avatar initials="C" size="xs" />}>Cam</Chip>
      <Chip avatar={<Avatar initials="D" size="xs" />}>Dee</Chip>
    </ChipGroup>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ChipGroup>
          <Chip>First</Chip>
          <Chip>Group</Chip>
        </ChipGroup>
        <ChipGroup>
          <Chip>Reuse</Chip>
          <Chip>Below</Chip>
        </ChipGroup>
      </Flex>
    </BearProvider>
  ),
};
