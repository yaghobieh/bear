import type { Meta, StoryObj } from '@storybook/react';
import { Link, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Link {...args}>
      <Typography>Link</Typography>
    </Link>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Link {...args}>
        <Typography>First</Typography>
      </Link>
      <Link>
        <Typography>Second</Typography>
      </Link>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Link anywhere below.</Typography>
        <Link {...args}>
          <Typography>First use</Typography>
        </Link>
        <Link>
          <Typography>Second use</Typography>
        </Link>
      </Flex>
    </BearProvider>
  ),
};
