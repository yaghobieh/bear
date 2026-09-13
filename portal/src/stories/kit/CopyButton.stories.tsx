import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CopyButton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CopyButton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Copy',
    timeout: 0,
    size: 'sm',
    variant: 'default',
    showText: true,
  },
  argTypes: {
    onCopy: { action: 'onCopy' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'ghost', 'outline'] },
    showText: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Basic: Story = {
  render: (args) => <CopyButton {...args} />,
};

export const WithText: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <CopyButton value="npm install @forgedevstack/bear" showText />
      <CopyButton value="https://forgestack.dev" variant="outline" showText copyText="Copy URL" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <CopyButton value="First snippet" />
        <CopyButton value="Reuse below the same provider" variant="ghost" />
      </Flex>
    </BearProvider>
  ),
};
