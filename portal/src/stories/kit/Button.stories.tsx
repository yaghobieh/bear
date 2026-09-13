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
  args: {
    loading: false,
    loadingText: 'Loading',
    fullWidth: false,
    iconPosition: 'left',
    spotlight: false,
    spotlightSize: 120,
    iconOnly: false,
    ripple: false,
    disableRipple: false,
    disableElevation: false,
    href: 'https://bearui.com',
    tooltip: 'Tooltip',
    compact: false,
    gradientDirection: 135,
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'Primary',
  },
  argTypes: {
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    spotlight: { control: 'boolean' },
    spotlightColor: { control: 'color' },
    iconOnly: { control: 'boolean' },
    ripple: { control: 'boolean' },
    disableRipple: { control: 'boolean' },
    disableElevation: { control: 'boolean' },
    compact: { control: 'boolean' },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'success', 'danger', 'warning', 'info'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  tags: ['smoke-test'],
  render: (args) => <Button {...args} />,
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
