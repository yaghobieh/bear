import type { Meta, StoryObj } from '@storybook/react';
import { Link, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Link from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Link anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Open docs',
    underline: 'none',
    color: '#EA0A8E',
    external: false,
    showExternalIcon: true,
  },
  argTypes: {
    underline: { control: 'select', options: ['none', 'hover', 'always'] },
    color: { control: 'color' },
    external: { control: 'boolean' },
    showExternalIcon: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {
  render: (args) => <Link {...args} />,
};

export const External: Story = {
  render: () => (
    <Flex gap={3}>
      <Link href="https://forgestack.dev" underline="always">
        Always underlined
      </Link>
      <Link href="https://forgestack.dev" external showExternalIcon>
        External
      </Link>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Link href="https://forgestack.dev">First use</Link>
        <Link href="https://forgestack.dev" variant="secondary">
          Reuse
        </Link>
      </Flex>
    </BearProvider>
  ),
};
