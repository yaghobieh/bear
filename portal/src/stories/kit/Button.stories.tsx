import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Button from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Button anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  tags: ['smoke-test'],
  args: {
    children: 'Primary',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Primary' })).toBeVisible();
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={2} align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2} wrap="wrap">
        <Button>First use</Button>
        <Button variant="outline">Reuse below the same provider</Button>
      </Flex>
    </BearProvider>
  ),
};
