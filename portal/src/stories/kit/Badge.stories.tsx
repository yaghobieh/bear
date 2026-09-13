import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Badge from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Badge anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    pill: false,
    dot: false,
    variant: 'primary',
    size: 'md',
    children: 'Primary',
  },
  argTypes: {
    pill: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  render: (args) => <Badge {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Badge variant="primary">First</Badge>
        <Badge variant="secondary">Reuse</Badge>
      </Flex>
    </BearProvider>
  ),
};
