import type { Meta, StoryObj } from '@storybook/react';
import { Chip, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Chip from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Chip anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Basic: Story = {
  render: () => <Chip>React</Chip>,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Chip variant="filled" color="primary">Filled</Chip>
      <Chip variant="outlined" color="primary">Outlined</Chip>
      <Chip variant="soft" color="success">Soft</Chip>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Chip color="primary">First</Chip>
        <Chip color="secondary">Reuse</Chip>
      </Flex>
    </BearProvider>
  ),
};
